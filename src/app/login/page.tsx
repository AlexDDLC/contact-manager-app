'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error de autenticación');
      }

      const { token } = await res.json();
      Cookies.set('token', token, { expires: 1 / 24 }); // Expira en 1 hora
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className='bg-gray-50'>
      <div className='mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0'>
        <div className='text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10'>
          <Image src="/contacts-book.png" alt='Logo' width={100} height={100} />
          <span className='self-center text-2xl font-bold whitespace-nowrap'>Contact Manager</span>
        </div>

        {/* Card */}
        <div className='bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0'>
          <div className='p-6 sm:p-8 lg:p-16 space-y-8'>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Login
            </h2>
            <form className='mt-8 space-y-6' action="">
              <div>
                <label className='text-sm font-medium text-gray-900 block mb-2' htmlFor="email">Correo</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' placeholder="mail@mail.com" type="email" name="email" id="" />
              </div>
              <div>
                <label className='text-sm font-medium text-gray-900 block mb-2' htmlFor="password">Contraseña</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' placeholder="**************" type="password" name="password" id="" />
              </div>
              <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
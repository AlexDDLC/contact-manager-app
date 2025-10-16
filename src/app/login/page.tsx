'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setError('');
    setIsLoading(true);

    try {
      const request = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (request?.error) {
        setError(request.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  })

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

            {/* Show error alert */}
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative'>
                <span className='block sm:inline'>{error}</span>
                <button className='absolute top-0 bottom-0 right-0 px-4 py-3'
                  onClick={() => setError('')}>
                  <span className='text-2xl'>&times;</span>
                </button>
              </div>
            )}

            <form className='mt-8 space-y-6' onSubmit={onSubmit}>
              <div>
                <label className='text-sm font-medium text-gray-900 block mb-2' htmlFor="email">
                  Correo
                </label>
                <input
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                  placeholder="mail@mail.com"
                  type="email"
                  disabled={isLoading}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El correo es obligatorio"
                    },
                  })}
                />
                {errors.email && (
                  <span className='text-red-500 text-xs'>
                    {String(errors.email.message)}
                  </span>
                )}
              </div>

              <div>
                <label className='text-sm font-medium text-gray-900 block mb-2' htmlFor="password">
                  Contraseña
                </label>
                <div className='relative'>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                    placeholder="**************"
                    type={showPassword ? "text" : "password"}
                    disabled={isLoading}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "La contraseña es obligatoria"
                      },
                    })}
                  />
                  <button type="button"
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className='text-red-500 text-xs'>
                    {String(errors.password.message)}
                  </span>
                )}
              </div>

              <button type="submit" disabled={isLoading}
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed" >
                {isLoading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
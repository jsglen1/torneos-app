import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Signin() {
    return (
        <main>

            {/* view responsive */}
            <div className='flex w-full h-screen'>

                <div className='w-full flex flex-col justify-center items-center lg:w-1/2'>

                    <div className='bg-slate-50 w-2/3 m-3 p-5 shadow-lg rounded-xl'>

                        <h1 className='mb-1 text-xl font-bold'>Bienvenido de nuevo!</h1>
                        <p className='mb-10 text-xs'>Ingresa tus credenciales para acceder a tu cuenta</p>

                        <div className='  flex flex-col'>
                            <label htmlFor='email' className='text-sm font-bold mb-1' >Correo</label>
                            <input type='text' id='email' placeholder='email@gmail.com' className='rounded-md border-2 border-slate-100 p-1 '></input>
                        </div>


                        <div className='  flex flex-col mt-5'>
                            <label htmlFor='password' className='text-sm font-bold mb-1'>Contraseña</label>
                            <input type='password' id='password' placeholder='******' className='rounded-md border-2 border-slate-100 p-1 '></input>
                        </div>

                        <button className='bg-green-500 w-full rounded-lg mt-6 border-green-600 border-2 text-white mb-10 p-1'> <Link href={'/dashboard'} > <p className='w-full'>Ingresar</p></Link> </button>

                        <div className="flex items-center mb-10">
                            <div className="flex-grow border-b-2"></div>
                            <div className="mx-4 text-sm">Ó</div>
                            <div className="flex-grow border-b-2"></div>
                        </div>

                        <button className='rounded-lg border-slate-200 border-2 w-full '>
                            <div className='flex justify-center gap-3 p-1'>
                                <Image src={'/google.png'} alt='google' width={25} height={25} />
                                <p>Ingresar con Google</p>
                            </div>
                        </button>

                        <p className='text-center mt-5 text-xs font-bold'>No estas registrado? <span className='text-slate-500'> <Link href={'/signup'}>Registrate</Link> </span></p>
                    </div>
                </div>

                <div className='w-1/2 hidden lg:flex'>
                    <Image
                        src={'/tenisFondo.jpg'}
                        alt='fondo-tenis'
                        width={1800}
                        layout='responsive'
                        height={900}
                        className='w-full h-full bg-blue-500 border-l-2 border-l-slate-300 rounded-l-3xl'
                    />
                </div>

            </div>


        </main>
    )
}

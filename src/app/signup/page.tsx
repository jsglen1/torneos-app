'use client'
import { TypeDefineRolUser, TypeFormUserSignup } from '@/types/formUserSignup';
import { alertValidateError } from '@/utils/alerts/alertValidateError';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'

export default function SignupPage() {

    const router = useRouter()

    const [formValues, setFormValues] = useState<TypeFormUserSignup>({
        name: '',
        email: '',
        password: '',
        role: TypeDefineRolUser.user
    });


    // GetDataForm
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSignup = async () => {

        const requestOptionsPostTournament = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${accessToken}`
                // Añade el encabezado de autorización si es necesario
            },
            // Incluye el cuerpo en una solicitud POST si es necesario
            body: JSON.stringify(formValues),
        };

        fetch(`/api/auth/register`, requestOptionsPostTournament)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(dataUser=> {
                // Aquí puedes procesar la dataTournament como desees
                // Por ejemplo, actualizar el estado con el nuevo torneo creado
                //setTournaments([...tournaments, dataTournament]);
                router.push('/')
            })
            .catch(error => {
                alertValidateError('Crear Usuario fallo', 'Usuario')
            });
    }

    




    return (
        <main>

            {/* view responsive */}
            <div className='flex w-full h-screen'>

                <div className='w-full flex flex-col justify-center items-center lg:w-1/2'>

                    <div className='bg-slate-50 w-2/3 m-3 p-5 shadow-lg rounded-xl'>

                        <h1 className='mb-1 text-xl font-bold'>Comienza ahora!</h1>
                        <p className='mb-10 text-xs'>Ingresa tus credenciales para registrar tu cuenta</p>

                        <div className='  flex flex-col'>
                            <label htmlFor='name' className='text-sm font-bold mb-1' >Nombre</label>
                            <input type='text' id='name' name='name' onChange={handleInputChange} placeholder='jesus glen' className='rounded-md border-2 border-slate-100 p-1 '></input>
                        </div>


                        <div className='  flex flex-col mt-5'>
                            <label htmlFor='email' className='text-sm font-bold mb-1' >Correo</label>
                            <input type='text' id='email' name='email' onChange={handleInputChange} placeholder='email@gmail.com' className='rounded-md border-2 border-slate-100 p-1 '></input>
                        </div>


                        <div className='  flex flex-col mt-5'>
                            <label htmlFor='password' className='text-sm font-bold mb-1'>Contraseña</label>
                            <input type='password' id='password' name='password' onChange={handleInputChange} placeholder='******' className='rounded-md border-2 border-slate-100 p-1 '></input>
                        </div>

                        <button onClick={() => { handleSignup() }} className='bg-green-500 w-full rounded-lg mt-6 border-green-600 border-2 text-white mb-10 p-1'>Registrate</button>

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

                        <p className='text-center mt-5 text-xs font-bold'>Ya tienes cuenta? <span className='text-slate-500'> <Link href={'/'}>Ingresa</Link> </span></p>
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

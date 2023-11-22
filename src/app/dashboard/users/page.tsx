'use client'
import { alertFormUser } from '@/utils/alerts/alertFormUser'
import { alertValidateError } from '@/utils/alerts/alertValidateError'
import { validateAlertFormUser } from '@/utils/validate/validateAlertFormUser'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import tournamentsData from '@/data_fake/Tournaments.json'
import { TypeUserResponse } from '@/types/userReponse'
import Swal from 'sweetalert2'
import { alertValidateSuccess } from '@/utils/alerts/alertValidateSucces'
import { TypeUserUpdate } from '@/types/userUpdate'

export default function Events() {

    const [users, setUsers] = useState<TypeUserResponse[]>([])

    const handleCreate = async () => {
        const formData = await alertFormUser()
        if (validateAlertFormUser(formData)) { // Not valid
            alertValidateError('No valido', 'Usuario')
        } else { // valid

            const requestOptionsPostUser = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}`
                    // Añade el encabezado de autorización si es necesario
                },
                // Incluye el cuerpo en una solicitud POST si es necesario
                body: JSON.stringify(formData),
            };

            fetch(`/api/user`, requestOptionsPostUser)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(dataUser => {
                    // Aquí puedes procesar la dataUser como desees
                    // Por ejemplo, actualizar el estado con el nuevo usuario creado
                    setUsers([...users, dataUser]);
                })
                .catch(error => {
                    alertValidateError('Crear usuario fallo', 'Torneos')
                });
        }
    }



    const handleUpdate = async (user: TypeUserResponse) => {
        const formData = await alertFormUser(user)
        if (validateAlertFormUser(formData)) { // Not valid
            alertValidateError('No valido', 'Usuario')
        } else { // valid

            const setFormData: TypeUserUpdate = {
                ...formData,
                id_user: user.id_user // Agregar el campo id_user al objeto setFormData
            };

            const requestOptionsPostUser = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}`
                    // Añade el encabezado de autorización si es necesario
                },
                // Incluye el cuerpo en una solicitud POST si es necesario
                body: JSON.stringify(setFormData),
            };

            fetch(`/api/user`, requestOptionsPostUser)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(dataUser => {
                    // Aquí puedes procesar la dataUser como desees
                    // Por ejemplo, actualizar el estado con el nuevo usuario creado
                    setUsers(prevTournaments => [
                        ...prevTournaments.filter(t => t.id_user !== user.id_user),
                        dataUser
                    ]);
                })
                .catch(error => {
                    alertValidateError('Actulizar usuario fallo', 'Torneos')
                });
        }
    }



    const handleDelete = async (user: TypeUserResponse) => {
        Swal.fire({
            title: "Cancelar la participacion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            customClass: 'alert-form',
            cancelButtonColor: "#d33",
            confirmButtonText: "si, Cancelar!"
        }).then((result) => {


            if (result.isConfirmed) {
                const requestOptionsDeleteUser = {
                    method: 'DELETE',

                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${accessToken}`
                        // Añade el encabezado de autorización si es necesario
                    },
                    // Incluye el cuerpo en una solicitud POST si es necesario
                    body: JSON.stringify({
                        id_user: user.id_user
                    }),
                };

                fetch(`/api/user`, requestOptionsDeleteUser)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }

                        // Filtra los usuarios para excluir el usuario eliminado
                        const updatedUsers = users.filter((t) => t.id_user !== user.id_user);
                        setUsers(updatedUsers);

                    })
                    .catch(error => {
                        alertValidateError('Eliminar usuarios fallo', 'usuarios')
                    });
            }



        });
    }




    useEffect(() => {

        const requestOptionsGetTournaments = {
            method: 'GET',
            /*
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            */
            // No incluyas el cuerpo en una solicitud GET
        };

        fetch(`/api/user`, requestOptionsGetTournaments)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(dataUsers => {

                // Aquí puedes procesar la dataUsers como desees
                setUsers(dataUsers)
            })
            .catch(error => {
                alertValidateSuccess('Obtener Usurios Fallo', 'Usuarios')
            });



    }, [])

    return (
        <>
            {/*  desktop */}
            <div className='text-white h-full  w-full flex-fol mx-auto px-28 hidden lg:block'>

                <div className='flex justify-between mx-auto items-center '>
                    <div>
                        <p className='text-lg font-bold p-1'>Usuarios</p>
                        <p className='text-sm'>edita y administra cada detalle de los usuarios</p>
                    </div>


                    <div className='flex gap-2'>

                        <button className='rounded-full border p-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center' onClick={() => { handleCreate() }}>
                            <Image src={'/mas-positivo-suma-simbolo-matematico.png'} alt='suma' height={16} width={16} className='p-1 ' />
                            <p className='mr-2'>Crear usuario</p>
                        </button>
                    </div>

                </div>


                <div className='p-2 flex  w-full'>

                    <div className='flex my-2 ml-auto rounded-full border-slate-500 border p-1' style={{ background: '#15151A' }}>
                        <Image src={'/buscar.png'} alt='buscar' width={30} height={30} className='mx-1  rounded-full p-1' />
                        <input type='text' placeholder='Buscar' className='flex flex-1 rounded-full p-1 w-full' style={{ background: '#15151A' }}></input>
                    </div>

                </div>


                <div className='overflow-y-auto h-[50vh] border-md border border-slate-500'>
                    <table className='w-full border-slate-500 border'>
                        <thead className='text-center '>
                            <tr className='text-center items-center border-b-slate-500 border-b rounded-t-2xl'>
                                <th className='p-3'>Nombre</th>
                                <th className='p-3'>Correo</th>
                                <th className='p-3'>Rol</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((item) => (
                                <tr key={item.id_user} className={`text-center items-center justify-center ${item.id_user % 2 === 0 ? 'color-navbar' : ''}`}>
                                    <td> <span className=''>{item.name}</span></td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td className='flex items-center p-3 justify-center gap-4 h-full '>
                                        <Image src={'/boligrafo.png'} alt='boligrafo' className='  rounded cursor-pointer' width={20} height={20} onClick={() => { handleUpdate(item) }} />
                                        <Image src={'/cancelar.png'} alt='candelar' className='  rounded cursor-pointer' width={20} height={20} onClick={() => { handleDelete(item) }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>


            </div>

            {/* Mobile */}
            <div className='text-white  w-full flex-fol mx-auto px-10 pb-10 py-10  lg:hidden'>

                <div className='flex-col space-y-2'>
                    <p className='text-lg font-bold p-1'>Usuarios</p>
                    <p className='text-sm'>edita y administra cada detalle de los usuarios </p>


                    <button className='rounded-full border w-full p-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center' onClick={() => { handleCreate() }}>
                        <Image src={'/mas-positivo-suma-simbolo-matematico.png'} alt='suma' height={16} width={16} className='p-1 ' />
                        <p className='mr-2'>Crear usuario</p>
                    </button>



                    <div className='flex my-2 ml-auto rounded-full border-slate-500 border p-1' style={{ background: '#15151A' }}>
                        <Image src={'/buscar.png'} alt='buscar' width={30} height={30} className='mx-1  rounded-full p-1' />
                        <input type='text' placeholder='Buscar' className='flex flex-1 rounded-full p-1 w-full' style={{ background: '#15151A' }}></input>
                    </div>



                    <div className='overflow-y-auto h-[40vh] border-md border border-slate-500'>
                        <table className='w-full border-slate-500 border'>
                            <thead className='text-center '>
                                <tr className='text-center items-center border-b-slate-500 border-b rounded-t-2xl'>
                                    <th className='p-3'>Nombre</th>
                                    <th className='p-3'>Email</th>
                                    <th className='p-3'>Rol</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((item) => (
                                    <tr key={item.id_user} className={`text-center items-center justify-center ${item.id_user % 2 === 0 ? 'color-navbar' : ''}`}>
                                        <td> <span className=''>{item.name}</span></td>
                                        <td>{item.email}</td>
                                        <td>jugadores {item.role}</td>
                                        <td className='flex items-center p-3 justify-center gap-4 h-full '>
                                            <Image src={'/boligrafo.png'} alt='boligrafo' className='  rounded cursor-pointer' width={20} height={20} onClick={() => { handleUpdate(item) }} />
                                            <Image src={'/cancelar.png'} alt='candelar' className='  rounded cursor-pointer' width={20} height={20} onClick={() => { handleDelete(item) }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

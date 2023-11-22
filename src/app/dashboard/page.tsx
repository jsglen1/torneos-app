'use client'
import { alertFormTournament } from '@/utils/alerts/alertFormTournament'
import { alertValidateError } from '@/utils/alerts/alertValidateError'
import { validateAlertFormTournament } from '@/utils/validate/validateAlertFormTournament'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import tournamentsData from '@/data_fake/Tournaments.json'
import { TypeTournamentResponse } from '@/types/tournamentReponse'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'
import { TypeFormRegistration } from '@/types/formRegistration'

export default function DashboardPage() {

    const [tournaments, setTournaments] = useState<TypeTournamentResponse[]>([])

    const { data: session } = useSession()

    useEffect(() => {
        if (session?.user?.id) {
            const id_user = session.user.id

            const requestOptionsPostTournament = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}`
                    // Añade el encabezado de autorización si es necesario
                },
                // Incluye el cuerpo en una solicitud POST si es necesario
                body: JSON.stringify({ id_user }),
            };

            fetch(`/api/tournament/user`, requestOptionsPostTournament)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(dataTournament => {
                    // Aquí puedes procesar la dataTournament como desees
                    // Por ejemplo, actualizar el estado con el nuevo torneo creado
                    setTournaments(dataTournament);

                })
                .catch(error => {
                    alertValidateError('Crear torneo fallo', 'Torneos')
                });


        }
    }, [session])


    const handleDelete = async (tournament: TypeTournamentResponse) => {
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

                const formData: TypeFormRegistration = {
                    id_user: session?.user.id!!,
                    id_tournament: tournament.id_tournament
                }

                const requestOptionsDeleteTournament = {
                    method: 'DELETE',

                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${accessToken}`
                        // Añade el encabezado de autorización si es necesario
                    },
                    // Incluye el cuerpo en una solicitud POST si es necesario
                    body: JSON.stringify(formData),
                };

                fetch(`/api/tournament/user`, requestOptionsDeleteTournament)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }

                        // Filtra los torneos para excluir el torneo eliminado
                        const updatedTournaments = tournaments.filter((t) => t.id_tournament !== tournament.id_tournament);
                        setTournaments(updatedTournaments);

                    })
                    .catch(error => {
                        alertValidateError('Eliminar Registro fallo', 'Registro')
                    });

            }
        });
    }


    return (
        <>
            {/*  desktop */}
            <div className='text-white h-full  w-full flex-fol mx-auto px-28 hidden lg:block'>

                <div className='flex justify-between mx-auto items-center '>
                    <div>
                        <p className='text-lg font-bold p-1'>Historial de Inscripciones</p>
                        <p className='text-sm'>Verifica cada detalle de los torn<span className='text-green-500'>eos.</span> en los que participas</p>
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
                                <th className='p-3'>Fecha</th>
                                <th className='p-3'>Participantes</th>

                            </tr>
                        </thead>
                        <tbody>
                            {tournaments?.map((item) => (
                                <tr key={item.id_tournament} className={`text-center items-center justify-center ${item.id_tournament % 2 === 0 ? 'color-navbar' : ''}`}>
                                    <td> <span className=''>{item.name}</span></td>
                                    <td>{item.date}</td>
                                    <td>{item.max_participants}</td>
                                    <td className='flex items-center p-3 justify-center gap-4 h-full '>
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
                    <p className='text-lg font-bold p-1'>Historial de Inscripciones</p>
                    <p className='text-sm'>Verifica cada detalle de los torn<span className='text-green-500'>eos.</span> en los que participas </p>




                    <div className='flex my-2 ml-auto rounded-full border-slate-500 border p-1' style={{ background: '#15151A' }}>
                        <Image src={'/buscar.png'} alt='buscar' width={30} height={30} className='mx-1  rounded-full p-1' />
                        <input type='text' placeholder='Buscar' className='flex flex-1 rounded-full p-1 w-full' style={{ background: '#15151A' }}></input>
                    </div>



                    <div className='overflow-y-auto h-[40vh] border-md border border-slate-500'>
                        <table className='w-full border-slate-500 border'>
                            <thead className='text-center '>
                                <tr className='text-center items-center border-b-slate-500 border-b rounded-t-2xl'>
                                    <th className='p-3'>Nombre</th>
                                    <th className='p-3'>Fecha</th>
                                    <th className='p-3'>Participantes</th>

                                </tr>
                            </thead>
                            <tbody>
                                {tournaments?.map((item) => (
                                    <tr key={item.id_tournament} className={`text-center items-center justify-center ${item.id_tournament % 2 === 0 ? 'color-navbar' : ''}`}>
                                        <td> <span className=''>{item.name}</span></td>
                                        <td>{item.date}</td>
                                        <td>{item.max_participants}</td>
                                        <td className='flex items-center p-3 justify-center gap-4 h-full '>
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

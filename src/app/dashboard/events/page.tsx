'use client'
import { alertFormTournament } from '@/utils/alerts/alertFormTournament'
import { alertValidateError } from '@/utils/alerts/alertValidateError'
import { validateAlertFormTournament } from '@/utils/validate/validateAlertFormTournament'
import Image from 'next/image'
import React from 'react'
import tournamentsData from '@/data_fake/Tournaments.json'
import { TypeTournamentResponse } from '@/types/tournamentReponse'
import Swal from 'sweetalert2'

export default function Events() {

    const handleCreate = async () => {
        const formData = await alertFormTournament()
        if (validateAlertFormTournament(formData)) { // Not valid
            alertValidateError('Torneo', 'No valido')
        } else { // valid
            /*
            CreateProduct(token, formData)
                .then(datosProduct => { dispatch(addProduct(datosProduct)) }) // refresh Ui create
                .catch(error => { });
            */
        }
    }

    const handleUpdate = async (tournament: TypeTournamentResponse) => {
        const formData = await alertFormTournament(tournament)

    }

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
         
          });
    }

    return (
        <>
            {/*  desktop */}
            <div className='text-white h-full  w-full flex-fol mx-auto px-28 hidden lg:block'>

                <div className='flex justify-between mx-auto items-center '>
                    <div>
                        <p className='text-lg font-bold p-1'>Eventos</p>
                        <p className='text-sm'>Crea, edita y administra cada detalle de los torn<span className='text-green-500'>eos.</span> </p>
                    </div>

                    <div className='flex gap-2'>

                        <button className='rounded-full border p-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center' onClick={() => { handleCreate() }}>
                            <Image src={'/mas-positivo-suma-simbolo-matematico.png'} alt='suma' height={16} width={16} className='p-1 ' />
                            <p className='mr-2'>Crear evento</p>
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
                                <th className='p-3'>Fecha</th>
                                <th className='p-3'>Participantes</th>

                            </tr>
                        </thead>
                        <tbody>
                            {tournamentsData.map((item) => (
                                <tr key={item.id} className={`text-center items-center justify-center ${item.id % 2 === 0 ? 'color-navbar' : ''}`}>
                                    <td> <span className=''>{item.name}</span></td>
                                    <td>{item.date}</td>
                                    <td>jugadores {item.players}</td>
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
                    <p className='text-lg font-bold p-1'>Eventos</p>
                    <p className='text-sm'>Crea, edita y administra cada detalle de los torn<span className='text-green-500'>eos.</span> </p>

                    <button className='rounded-full border w-full p-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center' onClick={() => { handleCreate() }}>
                        <Image src={'/mas-positivo-suma-simbolo-matematico.png'} alt='suma' height={16} width={16} className='p-1 ' />
                        <p className='mr-2'>Crear evento</p>
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
                                    <th className='p-3'>Fecha</th>
                                    <th className='p-3'>Participantes</th>

                                </tr>
                            </thead>
                            <tbody>
                                {tournamentsData.map((item) => (
                                    <tr key={item.id} className={`text-center items-center justify-center ${item.id % 2 === 0 ? 'color-navbar' : ''}`}>
                                        <td> <span className=''>{item.name}</span></td>
                                        <td>{item.date}</td>
                                        <td>jugadores {item.players}</td>
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

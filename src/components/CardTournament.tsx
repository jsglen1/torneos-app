'use client'
import Image from 'next/image'
import React from 'react'
import dataTournaments from '@/data_fake/Tournaments.json'
import { TypeTournamentResponse } from '@/types/tournamentReponse'
import Swal from 'sweetalert2'

export default function CardTournament() {

    const handleJoin = (tournament: TypeTournamentResponse) => {
        Swal.fire({
            title: "Confirma la participacion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            customClass: 'alert-form',
            cancelButtonColor: "#d33",
            confirmButtonText: "si, unirme!"
          }).then((result) => {
         
          });
    }

    return (
        <div className='p-6 gap-6 flex flex-wrap w-full justify-center overflow-y-auto'>
            {dataTournaments.map((item) => (
                <div key={item.id} className='border-slate-500 border rounded-3xl w-60 h-56 flex flex-col justify-start overflow-hidden text-xs'>
                    <Image src={'/Rectangle.png'} alt='pug' width={288} height={80} />
                    <p className='overflow-hidden overflow-ellipsis whitespace-normal ml-3 mt-1'>{item.name}</p>
                    <span className=' text-slate-500 overflow-hidden overflow-ellipsis whitespace-normal ml-3'>Fecha {item.date}</span>
                    <div className='flex justify-between items-center mt-2 '>
                        <p className='overflow-hidden overflow-ellipsis whitespace-normal ml-3'>Participantes {item.players}</p>
                        <button className='mr-3 rounded-md  p-1' style={{ background: '#292932' }} onClick={() => { handleJoin(item) }}>
                            <p className='ml-2 mr-2'>Unirse</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

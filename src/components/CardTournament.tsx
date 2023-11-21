'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dataTournaments from '@/data_fake/Tournaments.json'
import { TypeTournamentResponse } from '@/types/tournamentReponse'
import Swal from 'sweetalert2'
import { alertValidateError } from '@/utils/alerts/alertValidateError'

export default function CardTournament() {

    const [tournaments, setTournaments] = useState<TypeTournamentResponse[]>([])

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

        fetch(`/api/tournament`, requestOptionsGetTournaments)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(dataTournaments => {

                // Aquí puedes procesar la dataTournaments como desees
                setTournaments(dataTournaments)
            })
            .catch(error => {
                alert(error)
                alertValidateError('Obtener torneos fallo', 'torneos')
            });



    }, [])

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
            {tournaments?.map((item) => (
                <div key={item.id_tournament} className='border-slate-500 border rounded-3xl w-60 h-56 flex flex-col justify-start overflow-hidden text-xs'>
                    <Image src={'/Rectangle.png'} alt='pug' width={288} height={80} />
                    <p className='overflow-hidden overflow-ellipsis whitespace-normal ml-3 mt-1'>{item.name}</p>
                    <span className=' text-slate-500 overflow-hidden overflow-ellipsis whitespace-normal ml-3'>Fecha {item.date}</span>
                    <div className='flex justify-between items-center mt-2 '>
                        <p className='overflow-hidden overflow-ellipsis whitespace-normal ml-3'>Participantes {item.max_participants}</p>
                        <button className='mr-3 rounded-md  p-1' style={{ background: '#292932' }} onClick={() => { handleJoin(item) }}>
                            <p className='ml-2 mr-2'>Unirse</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

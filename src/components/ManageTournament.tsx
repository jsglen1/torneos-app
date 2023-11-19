import React from 'react'
import { dataProducts } from './CardTournament'
import Image from 'next/image'
import FormTournament from './FormTournament'

export default function ManageTournament() {
    return (
        <div className='py-16 px-5 gap-y-5 flex justify-start justify-items-center  flex-col w-full h-screen'>
            <h1 className='flex text-lg'>Filtrar por Torn<span className='text-green-500 '>eos</span></h1>
            <div className='flex rounded-full border-slate-500 border p-1' style={{ background: '#15151A' }}>
                <Image src={'/buscar.png'} alt='buscar' width={30} height={30} className='mx-1  rounded-full p-1' />
                <input type='text' placeholder='Buscar' className='flex flex-1 rounded-full p-1 w-full' style={{ background: '#15151A' }}></input>
            </div>

            <h1 className='flex text-lg'>Tipos de Parti<span className='text-green-500 '>dos </span></h1>

            <div className='flex flex-col overflow-y-auto text-slate-500'>


              
                <div className='my-2'>
                    <h2 className='text-xl font-bold mb-2'>Partidos Individuales (1 vs. 1):</h2>
                    <p>- Cada jugador tiene la oportunidad de servir en juegos alternos.</p>
                    <p>- El servicio alterna entre los lados de la cancha y se cambia después de cada juego.</p>
                </div>

                <div className='my-2'>
                    <h2 className='text-xl font-bold mb-2'>Partidos de Dobles (2 vs. 2):</h2>
                    <p>- En los partidos de dobles, cada jugador del equipo sirve por turnos.</p>
                    <p>- Los jugadores de un equipo deben alternar el golpe de la pelota, no pueden golpear la pelota dos veces consecutivas.</p>
                </div>

               


            </div>


            {/*  para admin
            <h1 className='flex text-lg'>Crear</h1>
            <FormTournament />
            */}

        </div>
    )
}

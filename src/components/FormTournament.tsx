import React from 'react'

export default function FormTournament() {
    return (
        <form className='w-10/12 space-y-3 flex flex-col overflow-hidden '>

            <div className='flex flex-col '>
                <label htmlFor='nombre' className=' mb-1'>Nombre del torneo</label>
                <input type='input' id='nombre' placeholder='Rodadero park' className='rounded-full border border-slate-500 p-1 color-navbar'></input>
            </div>

            <div className='flex flex-col mt-5'>
                <label htmlFor='fecha' className=' mb-1'>Fecha del torneo</label>
                <input type='date' id='fecha' placeholder='default' className='rounded-full border border-slate-500 p-1 color-navbar'></input>
            </div>

            <div className='flex flex-col mt-5'>
                <label htmlFor='fecha' className=' mb-1'>Participantes</label>
                <select  id='fecha' placeholder='default' className='rounded-full border border-slate-500 p-1 color-navbar'>
                    <option className='color-navbar'>
                        1 vs 1
                    </option>
                    <option>
                        2 vs 2
                    </option>
                </select>
            </div>

            <button type='button' className='bg-green-500 w-full rounded-lg mt-6 border-green-600 border-2 text-white mb-10 p-1'>Crear</button>


        </form>
    )
}

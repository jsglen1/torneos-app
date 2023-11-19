import Image from 'next/image'
import React from 'react'

interface productUi {
    name: string
    price: number
    stock: number
}

export const dataProducts: productUi[] = [
    { name: 'computadora1', price: 1000, stock: 5 },
    { name: 'acetaminofen amoxalifinaitico', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 },
    { name: 'ok', price: 1, stock: 2 }
]

export default function CardTournament() {
    return (
        <div className='p-6 gap-6 flex flex-wrap w-full justify-center overflow-y-auto'>
            {dataProducts.map((item, index) => (
                <div key={index} className='border-slate-500 border rounded-3xl w-60 h-56 flex flex-col justify-start overflow-hidden text-xs'>
                    <Image src={'/Rectangle.png'} alt='pug' width={288} height={80} />
                    <p className='overflow-hidden overflow-ellipsis whitespace-normal ml-3 mt-1'>{item.name}</p>
                    <span className=' text-slate-500 overflow-hidden overflow-ellipsis whitespace-normal ml-3'>inv {item.stock}</span>
                    <div className='flex justify-between items-center mt-2 '>
                        <p className='overflow-hidden overflow-ellipsis whitespace-normal ml-3'>Participantes {item.price}</p>
                        <button className='mr-3 rounded-md  p-1' style={{background:'#292932'}} >
                            <p className='ml-2 mr-2'>Unirse</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

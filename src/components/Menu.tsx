'use client'
import { handleMenuDrawer } from '@/redux/dashboardSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation';
import clsx from 'clsx'

interface MenuProps {
    children: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const pathname = usePathname();

    return (
        <>
            <header>
                <nav className='flex p-2 h-[8vh] px-5' style={{ background: '#15151A' }}>
                    <ul className='flex text-white gap-2 justify-between w-full items-center'>

                        <div className='flex gap-3 items-center'>
                            <li>
                                <Image src={'/barra-de-menus.png'} alt='agregar-usuario' width={35} height={35} className='p-1 bg-white rounded-full border-slate-500 border hover:cursor-pointer' onClick={() => { dispatch(handleMenuDrawer()) }} />
                            </li>

                            <li className='text-xl'>Torn<span className='text-green-500 '>eos</span></li>
                        </div>

                        <div className='flex gap-3'>
                            <li>
                                <Image src={'/agregar-usuario.png'} alt='agregar-usuario' width={35} height={35} className='p-1 bg-white rounded-full border-slate-500  border' />
                            </li>
                            <li>
                                <Image src={'/notificacion.png'} alt='agregar-usuario' width={35} height={35} className='p-1 bg-white rounded-full border-slate-500  border' />

                            </li>
                            <li>
                                <Image src={'/hablar.png'} alt='agregar-usuario' width={35} height={35} className='p-1 bg-white rounded-full border-slate-500  border' />

                            </li>
                            <li>
                                <Image src={'/usuario.png'} alt='agregar-usuario' width={35} height={35} className='p-1 bg-white rounded-full border-slate-500  border hover:cursor-pointer' onClick={() => { router.push('/') }} />
                            </li>

                        </div>
                    </ul>
                </nav>
            </header>

            <div className='h-[92vh] w-full flex' style={{ background: '#1C1C24' }}>
                <aside className='w-2/12   justify-start py-16 hidden md:flex'>
                    <ul className='flex flex-col gap-5 text-white w-full mx-5 text-sm overflow-hidden'>
                        <li className={clsx('flex gap-1 justify-start items-center p-1', { 'bg-green-500 rounded-full': pathname === '/dashboard' })}>
                            <Image src={'/hogar.png'} alt='copa' width={35} height={35} className='p-1 rounded-full border-slate-500 border bg-white' />
                            <Link href={'/dashboard'}>Inicio</Link>
                        </li>
                        <li className={clsx('flex gap-1 justify-start items-center p-1', { 'bg-green-500 rounded-full': pathname === '/dashboard/tournaments' })}>
                            <Image src={'/copa-de-trofeo-silueta.png'} alt='copa' width={35} height={35} className='p-1 rounded-full border-slate-500 border bg-white' />
                            <Link href={'/dashboard/tournaments'}>Torneos</Link>
                        </li>
                        <li className={clsx('flex gap-1 justify-start items-center p-1', { 'bg-green-500 rounded-full': pathname === '/dashboard/setting' })}>
                            <Image src={'/configuraciones.png'} alt='configuraciones' width={35} height={35} className='p-1 rounded-full border-slate-500 border bg-white' />
                            <Link href={'/dashboard/setting'}>Configuracion</Link>
                        </li>
                        <li className='justify-items-end'>
                        </li>
                    </ul>

                </aside>
                <main className=' w-full md:w-10/12'>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Menu;
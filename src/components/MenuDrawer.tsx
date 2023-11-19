import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { closeMenuDrawer, openMenuDrawer, handleMenuDrawer } from '@/redux/dashboardSlice';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function MenuDrawer() {

    const { openMenuDrawer } = useSelector((state: RootState) => state.dashboard)
    const dispatch = useDispatch()

    const drawerStyle = openMenuDrawer
        ? 'w-52 transition-width ease-in-out duration-300 rounded-r-2xl color-navbar fixed left-0 h-[92vh] overflow-y-auto overflow-hidden' // Muestra desde el lado izquierdo (cambio a 'right-0' si deseas que aparezca desde la derecha)
        : 'w-0 transition-width ease-in-out duration-300 hidden';

    const [mostrarOpcionesVentas, setMostrarOpcionesVentas] = useState(false);

    const toggleOpcionesVentas = () => {
        setMostrarOpcionesVentas(!mostrarOpcionesVentas);
    };

    const [mostrarOpcionesTurnos, setMostrarOpcionesTurnos] = useState(false);

    const toggleOpcionesTurnos = () => {
        setMostrarOpcionesTurnos(!mostrarOpcionesTurnos);
    };

    const [mostrarOpcionesInventario, setMostrarOpcionesInventario] = useState(false);

    const toggleOpcionesInventario = () => {
        setMostrarOpcionesInventario(!mostrarOpcionesInventario);
    };

    const pathname = usePathname();

    const handleMouseLeave = () => {
        dispatch(closeMenuDrawer());
    };


    return (
        <div className={drawerStyle} onMouseLeave={handleMouseLeave}>
            <ul className='flex flex-col gap-5 text-white w-full mx-3 text-sm overflow-hidden py-5'>
                <li className={clsx('flex gap-1 justify-start items-center p-1', { 'bg-green-500 rounded-full': pathname === '/dashboard' })}>
                    <Image src={'/hogar.png'} alt='copa' width={35} height={35} className='p-1 rounded-full border-slate-500 border bg-white' />
                    <Link href={'/dashboard'}>Inicio</Link>
                </li>
                <li className={clsx('flex gap-1 justify-start items-center p-1', { 'bg-green-500 rounded-full': pathname === '/dashboard/tournaments' })}>
                    <Image src={'/copa-de-trofeo-silueta.png'} alt='copa' width={35} height={35} className='p-1 rounded-full border-slate-500 border bg-white' />
                    <Link href={'/dashboard/tournaments'}>Torneos</Link>
                </li>
                {/* para admin*/}
                <li className={clsx('flex gap-1 justify-start items-center p-1', { 'bg-green-500 rounded-full': pathname === '/dashboard/events' })}>
                    <Image src={'/eventos.png'} alt='copa' width={35} height={35} className='p-1 rounded-full border-slate-500 border bg-white' />
                    <Link href={'/dashboard/events'}>Eventos</Link>
                </li>
                <li className={clsx('flex gap-1 justify-start items-center p-1', { 'bg-green-500 rounded-full': pathname === '/dashboard/setting' })}>
                    <Image src={'/configuraciones.png'} alt='configuraciones' width={35} height={35} className='p-1 rounded-full border-slate-500 border bg-white' />
                    <Link href={'/dashboard/setting'}>Configuracion</Link>
                </li>
                <li className='justify-items-end'>
                </li>
            </ul>
        </div>
    )
}

'use client'
import CardTournament from '@/components/CardTournament'
import ManageTournament from '@/components/ManageTournament'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Tournaments() {

  return (
    <div className='h-full flex text-white text-sm overflow-hidden' >
      <div className='w-full md:w-8/12 flex flex-col'>
        <CardTournament />
      </div>
      <div className='hidden md:block w-4/12'>
        <ManageTournament />
      </div>
    </div>
  )
}

import CardTournament from '@/components/CardTournament'
import ManageTournament from '@/components/ManageTournament'
import React from 'react'

export default function Tournaments() {
  return (
    <div className='h-full flex text-white text-sm overflow-hidden' >
      <div className='w-8/12  flex flex-col'>
        <CardTournament />
      </div>
      <div className='w-4/12 '>
        <ManageTournament />
      </div>
    </div>
  )
}

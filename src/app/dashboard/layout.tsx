//mport type { Metadata } from 'next'
import Menu from '@/components/Menu'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Menu children={children} />
  )
}

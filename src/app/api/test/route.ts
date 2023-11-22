
import { prisma } from '@/libs/prisma' // Ajusta la ruta según tu estructura de carpetas
import { TypeFormTournament } from '@/types/formTournament';
import { TypeTournamentResponse } from '@/types/tournamentReponse';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth"
import { getSession } from 'next-auth/react';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'inspector';
import { getToken } from 'next-auth/jwt';


export async function GET(req: NextRequest, res: NextResponse) {
    try {

        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json(
                {
                    message: 'no autorizado',
                    status: 500
                }
            )
        }

        console.log('token :' + JSON.stringify(token))

        const tournaments = await prisma.tournament.findMany();
        return NextResponse.json(tournaments)

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                    status: 500
                }
            )
        }
    }
}





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
          message: 'Not authorized',
          status: 403
        }
      )
    }


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

export async function POST(req: NextRequest, res: NextResponse) {
  try {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        {
          message: 'Not authorized',
          status: 403
        }
      )
    }


    const body: TypeFormTournament = await req.json();
    const newTournament = await prisma.tournament.create({
      data: {
        name: body.name,
        date: body.date,
        max_participants: body.max_participants
      }
    })
    return NextResponse.json(newTournament)

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500
        }
      )
    }
  }
}



export async function PUT(req: NextRequest, res: NextResponse) {
  try {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        {
          message: 'Not authorized',
          status: 403
        }
      )
    }


    const body: TypeTournamentResponse = await req.json();
    const updatedTournament = await prisma.tournament.update(
      {
        where: {
          id_tournament: body.id_tournament
        },
        data: {
          name: body.name,
          date: body.date,
          max_participants: body.max_participants
        }

      })
    return NextResponse.json(updatedTournament)

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500
        }
      )
    }
  }
}




export async function DELETE(req: NextRequest, res: NextResponse) {
  try {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        {
          message: 'Not authorized',
          status: 403
        }
      )
    }


    const body: { id_tournament: number } = await req.json();

    const deleteTournament = await prisma.tournament.delete(
      {
        where: {
          id_tournament: body.id_tournament
        }
      }
    )

    if (!deleteTournament) {
      return NextResponse.json({ message: 'tournament not deleted' }, { status: 404 })
    }

    return NextResponse.json(deleteTournament)

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500
        }
      )
    }
  }
}





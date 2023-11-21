
import { prisma } from '@/libs/prisma' // Ajusta la ruta según tu estructura de carpetas
import { TypeFormTournament } from '@/types/formTournament';
import { TypeTournamentResponse } from '@/types/tournamentReponse';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth"
import { handler } from '../auth/[...nextauth]/route';

export async function GET(req: Request, res: Response) {
  try {

    // protected route
    const session = await getServerSession(handler)
    if (!session) {
      return NextResponse.json(
        {
          message: 'no autenticado'
        }, {
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
        }, {
        status: 500
      }
      )
    }
  }
}

export async function POST(req: Request, res: Response) {
  try {

     // protected route
     const session = await getServerSession(handler)
     if (!session) {
       return NextResponse.json(
         {
           message: 'no autenticado'
         }, {
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



export async function PUT(req: Request, res: Response) {
  try {

     // protected route
     const session = await getServerSession(handler)
     if (!session) {
       return NextResponse.json(
         {
           message: 'no autenticado'
         }, {
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




export async function DELETE(req: Request, res: Response) {
  try {

     // protected route
     const session = await getServerSession(handler)
     if (!session) {
       return NextResponse.json(
         {
           message: 'no autenticado'
         }, {
         status: 403
       }
       )
     }

    const body: { id_tournament: number } = await req.json();

    console.log('llego fue ' + JSON.stringify(body))

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





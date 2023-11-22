
import { prisma } from '@/libs/prisma' // Ajusta la ruta según tu estructura de carpetas
import { TypeFormTournament } from '@/types/formTournament';
import { TypeTournamentResponse } from '@/types/tournamentReponse';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth"
import { getSession } from 'next-auth/react';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'inspector';
import { TypeUserResponse } from '@/types/userReponse';
import { TypeFormRegistration } from '@/types/formRegistration';


// list joins user with tournament
export async function POST(req: Request, res: Response) {
  try {

    const body: TypeUserResponse = await req.json();

    const userId = body.id_user

    const userTournaments = await prisma.registration
      .findMany({
        where: {
          id_user: userId,
        },
        select: {
          tournament: true,
        },
      })
      .then(registrations => registrations.map(registration => registration.tournament));



    return NextResponse.json(userTournaments)

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





// delete joined user tournament
export async function DELETE(req: Request, res: Response) {
  try {

    const body: TypeFormRegistration = await req.json();

    const findRegistration = await prisma.registration.findFirst(
      {
        where: {
          id_user: body.id_user,
          id_tournament: body.id_tournament
        }
      }
    )

    if (!findRegistration) {
      return NextResponse.json(
        { message: 'not found' }, { status: 404 }
      )
    }

    const deleteRegistration = await prisma.registration.delete(
      {
        where: {
          id_registration: findRegistration.id_registration
        }
      }
    )
    return NextResponse.json(deleteRegistration)

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
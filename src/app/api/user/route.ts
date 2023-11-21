
import { prisma } from '@/libs/prisma' // Ajusta la ruta según tu estructura de carpetas
import { TypeFormUser } from '@/types/formUser';
import { TypeUserResponse } from '@/types/userReponse';
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

        const tournaments = await prisma.user.findMany();

        // Excluir la contraseña del objeto que se enviará al cliente
        const dataClient = tournaments.map(({ password, ...rest }) => rest);

        return NextResponse.json(dataClient)

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

/*
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

    const body: TypeFormUser = await req.json();
    const newTournament = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role
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
*/



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

        const body: TypeUserResponse = await req.json();
        const updatedTournament = await prisma.user.update(
            {
                where: {
                    id_user: body.id_user
                },
                data: {
                    name: body.name,
                    email: body.email,
                    role: body.role
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

        const body: { id_user: number } = await req.json();

        const deleteTournament = await prisma.user.delete(
            {
                where: {
                    id_user: body.id_user
                }
            }
        )

        if (!deleteTournament) {
            return NextResponse.json({ message: 'user not deleted' }, { status: 404 })
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






import { prisma } from '@/libs/prisma' // Ajusta la ruta según tu estructura de carpetas
import { TypeFormUser } from '@/types/formUser';
import { TypeUserResponse } from '@/types/userReponse';
import { NextResponse,NextRequest } from 'next/server';
import { getServerSession } from "next-auth"
import { TypeUserUpdate } from '@/types/userUpdate';
import bcrypt from 'bcrypt';
import { getToken } from 'next-auth/jwt';
//import { handler } from '../auth/[...nextauth]/route';

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

// register for user , admin 
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

    const body: TypeFormUser = await req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newTournament = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password : hashedPassword,
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

        const body: TypeUserUpdate = await req.json();
 
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const updatedTournament = await prisma.user.update(
            {
                where: {
                    id_user: body.id_user
                },
                data: {
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
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





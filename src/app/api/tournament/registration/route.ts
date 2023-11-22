
import { prisma } from '@/libs/prisma' // Ajusta la ruta según tu estructura de carpetas
import { TypeFormUser } from '@/types/formUser';
import { TypeUserResponse } from '@/types/userReponse';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth"
import { TypeUserUpdate } from '@/types/userUpdate';
import bcrypt from 'bcrypt';
import { TypeFormRegistration, TypeRegistration } from '@/types/formRegistration';
//import { handler } from '../auth/[...nextauth]/route';


// join tournament
export async function POST(req: Request, res: Response) {
    try {

        const body: TypeRegistration = await req.json();


        // Verificar si el usuario ya está registrado en el torneo
        const existingRegistrationCount = await prisma.registration.count({
            where: {
                id_user: body.id_user,
                id_tournament: body.id_tournament
            }
        });

      

        if (existingRegistrationCount > 0) {
            return NextResponse.json({ message: 'El usuario ya está registrado en este torneo' }, { status: 409 });
        }

       

        // validar si existe cupo en el torneo
        const searchRegistrationTorunament = await prisma.registration.count(
            {
                where: {
                    id_tournament: body.id_tournament
                }
            }
        )

        if (searchRegistrationTorunament >= body.max_participants) {
            return NextResponse.json({ message: 'limit playes' }, { status: 439 })
        }

        const newRegistration = await prisma.registration.create({
            data: {
                id_user: body.id_user,
                id_tournament: body.id_tournament
            }
        })
        return NextResponse.json(newRegistration)

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

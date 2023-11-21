/*
  Warnings:

  - You are about to drop the `Inscripcion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Torneo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_id_torneo_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_id_usuario_fkey";

-- DropTable
DROP TABLE "Inscripcion";

-- DropTable
DROP TABLE "Torneo";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id_tournament" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "max_participants" INTEGER NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id_tournament")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id_registration" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_tournament" INTEGER NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id_registration")
);

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_id_tournament_fkey" FOREIGN KEY ("id_tournament") REFERENCES "Tournament"("id_tournament") ON DELETE RESTRICT ON UPDATE CASCADE;

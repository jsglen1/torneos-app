-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Torneo" (
    "id_torneo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "max_participantes" INTEGER NOT NULL,

    CONSTRAINT "Torneo_pkey" PRIMARY KEY ("id_torneo")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id_inscripcion" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_torneo" INTEGER NOT NULL,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id_inscripcion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_id_torneo_fkey" FOREIGN KEY ("id_torneo") REFERENCES "Torneo"("id_torneo") ON DELETE RESTRICT ON UPDATE CASCADE;

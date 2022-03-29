-- CreateTable
CREATE TABLE "Coffee" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the `CoffeshopPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoffeshopPhoto" DROP CONSTRAINT "CoffeshopPhoto_coffeeShopId_fkey";

-- DropTable
DROP TABLE "CoffeshopPhoto";

-- CreateTable
CREATE TABLE "CoffeShopPhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "coffeeShopId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoffeShopPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoffeShopPhoto" ADD CONSTRAINT "CoffeShopPhoto_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

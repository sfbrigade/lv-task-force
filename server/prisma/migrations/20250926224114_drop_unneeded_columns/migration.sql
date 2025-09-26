/*
  Warnings:

  - You are about to drop the column `firstAnalysisNeighborhood` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `firstLocation` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `firstLocationLatitude` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `firstLocationLongitude` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `firstLocationRaw` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `firstPoliceDistrict` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `firstSupervisorDistrict` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleColor` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleMake` on the `LargeVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleModel` on the `LargeVehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."LargeVehicle" DROP COLUMN "firstAnalysisNeighborhood",
DROP COLUMN "firstLocation",
DROP COLUMN "firstLocationLatitude",
DROP COLUMN "firstLocationLongitude",
DROP COLUMN "firstLocationRaw",
DROP COLUMN "firstPoliceDistrict",
DROP COLUMN "firstSupervisorDistrict",
DROP COLUMN "vehicleColor",
DROP COLUMN "vehicleMake",
DROP COLUMN "vehicleModel";

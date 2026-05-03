-- CreateTable
CREATE TABLE "meal_plans" (
    "id" TEXT NOT NULL,
    "householdId" TEXT NOT NULL,
    "name" TEXT,
    "plannedDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_plan_items" (
    "id" TEXT NOT NULL,
    "mealPlanId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "householdId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meal_plan_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "meal_plans_householdId_plannedDate_idx" ON "meal_plans"("householdId", "plannedDate");

-- CreateIndex
CREATE UNIQUE INDEX "meal_plan_items_mealPlanId_itemId_key" ON "meal_plan_items"("mealPlanId", "itemId");

-- AddForeignKey
ALTER TABLE "meal_plans" ADD CONSTRAINT "meal_plans_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plan_items" ADD CONSTRAINT "meal_plan_items_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "meal_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plan_items" ADD CONSTRAINT "meal_plan_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "FreezerItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plan_items" ADD CONSTRAINT "meal_plan_items_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE CASCADE ON UPDATE CASCADE;

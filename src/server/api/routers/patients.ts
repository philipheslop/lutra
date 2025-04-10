import { db } from "@lutra/server/db";
import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";

export const patientsRouter = {
  patientsList: publicProcedure.query(async () => {
    const patients = await db.query.patients.findMany();
    return patients;
  }),
} satisfies TRPCRouterRecord;

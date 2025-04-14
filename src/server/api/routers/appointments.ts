import { db } from "@lutra/server/db";
import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { appointments } from "@lutra/server/db/schema";

export const appointmentsRouter = {
  appointmentsList: publicProcedure.query(async () => {
    const appointments = await db.query.appointments.findMany();
    return appointments;
  }),
  appointmentsByPatient: publicProcedure
    .input(
      z
        .object({
          patientId: z.number(),
        })
        .nullish()
    )
    .query(async (opts) => {
      const appointments = await db.query.appointments.findMany({
        where: (appointments, { eq }) =>
          eq(appointments.patientId, opts.input?.patientId ?? -1),
      });
      return appointments;
    }),
  /*createAppointment: publicProcedure
    .input(
      z.object({
        patientId: z.number(),
        scheduledFor: z.date(),
        status: z.any(),
        reason: z.string(),
        notes: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      db.insert(appointments).values(input);
    }),*/
} satisfies TRPCRouterRecord;

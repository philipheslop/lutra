"use client";

import type { AppointmentData } from "./appointmentData";
import type { PatientData } from "./patientData";
//import { db } from "@lutra/server/db";
//import * as schema from "@lutra/server/db/schema"
//import type { AppointmentData } from "./appointmentData";

interface patientProps {
    patient: PatientData;
}
export function PatientInfo({ patient }: patientProps) {

    /* const getAppointmentsByPatient = async (patientId: number) => {
           return await db.query.appointments.findMany({
               where: (appointments, { eq }) =>
                   eq(appointments.patientId, patientId),
           });
       }
   
       const createAppointment = async (appointment: AppointmentData) => {
           const { id, ...app } = appointment;
           return await db.insert(schema.appointments).values(app)
       };*/

    //MOCK Appointments
    const getAppointmentsByPatient = (patientId: number) => {
        return mockAppointments.filter((appointment) => appointment.patientId == patientId);
    }

    const createAppointment = (appointment: AppointmentData) => {
        mockAppointments.push(appointment);
    };

    const mockAppointments: AppointmentData[] = [{ reason: "headache", patientId: 0, id: 0, status: "SCHEDULED", scheduledFor: new Date(), createdAt: new Date, updatedAt: null, notes: "No Notes" }];

    return (<>
        <span className="font-bold">{patient.firstName}, {patient.lastName}</span><br />
        {patient.dateOfBirth}
        {getAppointmentsByPatient(patient.id).map((appointment: AppointmentData) => {
            return (
                <div>
                    <ul>
                        <li key={"reason" + appointment.id}>Reason: {appointment.reason}</li>
                        <li key={"when" + appointment.id}>When: {appointment.scheduledFor.toDateString()}</li>
                        <li key={"status" + appointment.id}>Status: {appointment.status}</li>
                        <li key={"notes" + appointment.id}>Notes: {appointment.notes}</li>
                    </ul>
                </div>
            );
        })}
    </>)
}

"use client";

import { useRef, useState } from "react";
import type { AppointmentData } from "./appointmentData";
import type { PatientData } from "./patientData";
import { z } from "zod";
//import { db } from "@lutra/server/db";
//import * as schema from "@lutra/server/db/schema"
//import type { AppointmentData } from "./appointmentData";

interface patientProps {
    patient: PatientData;
}
export function PatientInfo({ patient }: patientProps) {

    const dialogRef = useRef<HTMLDialogElement>(null);

    const [mockAppointments, setMockAppointments] = useState<AppointmentData[]>([]);

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
        setMockAppointments([
            ...mockAppointments,
            appointment
        ]);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        const formValuesSchema = z.object({
            datetime: z.string(),
            status: z.string(),
            reason: z.string(),
            notes: z.string()
        });

        const formValues = formValuesSchema.parse(formJson);

        console.log(formValues);

        const appointment: AppointmentData = {
            id: mockAppointments.length,
            createdAt: new Date(),
            updatedAt: new Date(),
            patientId: patient.id,
            scheduledFor: new Date(formValues.datetime),
            status: formValues.status,
            reason: formValues.reason,
            notes: formValues.notes
        }

        createAppointment(appointment);
        dialogRef.current?.close();
    }

    return (<>
        <div className="patientInfo">
            <span className="font-bold">{patient.firstName}, {patient.lastName}</span>
            <button
                className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => dialogRef.current?.showModal()} >
                New Appointment
            </button>
        </div>
        <dialog className="modal" ref={dialogRef}
            onCancel={() => dialogRef.current?.close()}>
            <h3 className="font-semibold">Make Appointment for {patient.firstName} {patient.lastName}</h3>
            <hr />
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    When: <input aria-label="Date and time" name="datetime" type="datetime-local" defaultValue="2025-04-15T19:30" />
                </label>
                <hr />
                <label>
                    Reason: <input name="reason" defaultValue="" />
                </label>
                <hr />
                <p>
                    Status:<br />
                    <label><input type="radio" name="status" value="SCHEDULED" /> SCHEDULED </label><br />
                    <label><input type="radio" name="status" value="CONFIRMED" defaultChecked={true} /> CONFIRMED </label><br />
                    <label><input type="radio" name="status" value="COMPLETED" /> COMPLETED </label><br />
                    <label><input type="radio" name="status" value="CANCELLED" /> CANCELLED </label><br />
                </p>
                <hr />
                <label>
                    Notes: <input name="notes" defaultValue="" />
                </label>
                <hr />
                <br />
                <button
                    type="reset"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800-1"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800-1"
                >
                    Submit
                </button>
                <button
                    onClick={() => dialogRef.current?.close()}
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800-1"
                >
                    <span>Cancel</span>
                </button>
            </form>
        </dialog>
        {
            getAppointmentsByPatient(patient.id).map((appointment: AppointmentData) => {
                return (
                    <div key={"appointment-" + appointment.id}>
                        <ul>
                            <li key={"reason" + appointment.id}>Reason: {appointment.reason}</li>
                            <li key={"when" + appointment.id}>When: {appointment.scheduledFor.toDateString()}</li>
                            <li key={"status" + appointment.id}>Status: {appointment.status}</li>
                            <li key={"notes" + appointment.id}>Notes: {appointment.notes}</li>
                        </ul>
                        <hr />
                    </div>
                );
            })
        }
    </>)
}

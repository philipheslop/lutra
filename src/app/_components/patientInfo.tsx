"use client";

import { useState } from "react";
import type { AppointmentData } from "./appointmentData";
import type { PatientData } from "./patientData";
//import { db } from "@lutra/server/db";
//import * as schema from "@lutra/server/db/schema"
//import type { AppointmentData } from "./appointmentData";

interface patientProps {
    patient: PatientData;
}
export function PatientInfo({ patient }: patientProps) {

    const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
    const handleNewAppointmentOpen = () => {
        setNewAppointmentOpen(true)
    }
    const handleNewAppointmentClosed = () => {
        setNewAppointmentOpen(false)
    }


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
        {patient.dateOfBirth}<br />
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setNewAppointmentOpen(true)} >
            New Appointment
        </button>
        <dialog open={newAppointmentOpen}>
            <h1>Its a simple dialog.</h1>
            <p>
                Dialog Text
            </p>
            <footer>
                <button
                    color="red"
                    onClick={() => setNewAppointmentOpen(false)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800-1"
                >
                    <span>Cancel</span>
                </button>
                <button color="green"
                    onClick={() => setNewAppointmentOpen(false)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span>Confirm</span>
                </button>
            </footer>
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
                    </div>
                );
            })
        }
    </>)
}

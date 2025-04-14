"use client";

import { useState } from "react";
import type { PatientData } from "./patientData";

interface patientProps {
    patientsList: PatientData[];
}

export function PatientsTable({ patientsList }: patientProps) {
    const coloumns = [
        { label: "First Name", coloumnId: "firstname" },
        { label: "Last Name", coloumnId: "lastname" },
        { label: "Email", coloumnId: "email" },
        { label: "Date of Birth", coloumnId: "dob" },
        { label: "Current Status", coloumnId: "status" },
    ];

    const [currentPatient, setCurrentPatient] = useState<PatientData | null>(null);

    return (
        <><div>
            <table className="table min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                        {coloumns.map(({ label, coloumnId }) => {
                            return (
                                <th key={coloumnId}>
                                    {label}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {patientsList.map((patient: PatientData) => {
                        return (
                            <tr
                                key={"patient-row-id-" + patient.id}
                                className={"table-item border-b border-neutral-200 dark:border-white/10 focus:outline-none " + (patient == currentPatient ? 'selected-row' : '')}
                                onClick={() => setCurrentPatient(patient)}
                            >
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.email}</td>
                                <td>{patient.dateOfBirth}</td>
                                <td>{patient.isActive ? "active" : "not active"}</td>

                            </tr>

                        );
                    })}
                </tbody>
            </table>
            {currentPatient ? currentPatient.firstName : "none selected"}
        </div>
        </>
    )
}
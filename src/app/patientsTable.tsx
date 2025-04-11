import type { patientData } from "./patientData";

interface patientProps {
    patientsList: patientData[];
}

export function PatientsTable({ patientsList }: patientProps) {
    const coloumns = [
        { label: "First Name", coloumnId: "firstname" },
        { label: "Last Name", coloumnId: "lastname" },
        { label: "Email", coloumnId: "email" },
        { label: "Date of Birth", coloumnId: "dob" },
        { label: "Current Status", coloumnId: "status" },
    ];

    return (
        <><div>
            <table className="table min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                        {coloumns.map(({ label, coloumnId }) => {
                            return (
                                <th
                                    className="table-item"
                                    key={coloumnId}
                                //onClick={() => handleTableDataChange(coloumnId)}
                                >
                                    {label}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {patientsList.map((patient: patientData) => {
                        return (
                            <tr
                                key={patient.id}
                                className="table-item border-b border-neutral-200 dark:border-white/10"
                            //onClick={() => setCurrentUser(user)}
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
        </div>
        </>
    )
}
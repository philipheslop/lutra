import { HydrateClient, api } from "@lutra/trpc/server";
import { InstructionBanner } from "./_components/instruction-banner";
import type { PatientData } from "./_components/patientData";
import { PatientsTable } from "./_components/patientsTable";
import type { AppointmentData } from "./_components/appointmentData";


export default async function Home() {
	//const greeting = await api.hello.greeting();
	const patientsList: PatientData[] | null = await api.patients.patientsList();
	/*const appointmetsList: AppointmentData[] | null = await api.appointments.appointmentsList();
	const appointsmentByPatient: AppointmentData[] | null = await api.appointments.appointmentsByPatient({ patientId: 1 })

	const getAppointmentsByPatient = async (patientId: number) => {
		return await api.appointments.appointmentsByPatient({ patientId: patientId })
	}

	const createAppointment = async (appointment: AppointmentData) => {
		const { id, ...app } = appointment;
		return await api.appointments.
	};*/

	return (
		<HydrateClient>
			<div className="space-y-4 p-4 sm:p-6 lg:p-8">
				<InstructionBanner />
				<header>
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-lg">Patients</h3>
					</div>
				</header>
				<main>
					<div className="mt-6">
						<div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
							{[0].map((item) => (
								<div
									key={item}
									className="group relative rounded border border-gray-200 bg-white p-2"
								>
									{
										patientsList ? (<><PatientsTable patientsList={patientsList} /></>) : (<span>No Patients...</span>)
									}
								</div>
							))}
						</div>
					</div>
				</main>
			</div>
		</HydrateClient>
	);
}

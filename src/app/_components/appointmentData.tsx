export interface AppointmentData {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    patientId: number;
    scheduledFor: Date;
    status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | string;
    reason: string;
    notes: string | null;
}
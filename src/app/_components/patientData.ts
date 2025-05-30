export interface PatientData {
  firstName: string;
  id: number;
  lastName: string;
  dateOfBirth: string;
  email: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

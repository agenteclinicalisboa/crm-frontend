import type { IProfessional } from '@/app/private/modules/admin/professionals/types/professionals';
import type { IProcedure, IProcedureCategory } from '@/app/private/modules/admin/procedures/types/procedures';
import type { IPatient } from '@/app/private/modules/admin/patients/types/patients';

export interface IBookingCreate {
  patient: IPatient;
  date: string;
  time: string;
  category: IProcedureCategory;
  service: IProcedure;
  subService: IProcedure;
  professional: IProfessional;
}

export interface IBookingAvailability {
  procedure_id: number;
  patient_id: number;
  date: string;
  time_start: string;
}

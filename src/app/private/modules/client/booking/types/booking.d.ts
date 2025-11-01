import type { IProfessional } from '@/app/private/modules/admin/professionals/types/professionals';
import type { IProcedure, IProcedureCategory } from '@/app/private/modules/admin/procedures/types/procedures';

export interface IBookingCreate {
  phone: string;
  date: string;
  time: string;
  category: IProcedureCategory;
  service: IProcedure;
  subService: IProcedure;
  professional: IProfessional;
}

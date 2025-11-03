import { getError } from '@/app/core/shared/utils';

import { RestService } from '@/app/core/services/rest.service';

import type { IPatient, IPatientCreate } from '@/app/private/modules/admin/patients/types/patients';

export class PatientsService {
  private restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  verify = async (number: string) => {
    try {
      const url = `/patients/${number}/verify`;
      const { data } = await this.restService.get<IPatient>(url);

      return { data };
    } catch (error) {
      return { error: getError(error) };
    }
  };

  create = async (body: IPatientCreate) => {
    try {
      const url = `/patients`;
      const { data } = await this.restService.post<IPatientCreate, IPatient>(url, body);

      return { data };
    } catch (error) {
      return { error: getError(error) };
    }
  };
}

import { getError } from '@/app/core/shared/utils';

import { RestService } from '@/app/core/services/rest.service';

import type { IListProfessional } from '@/app/private/modules/admin/professionals/types/professionals';

export class ProfessionalsService {
  private restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  list = async () => {
    try {
      const url = `/professionals`
      const { data } = await this.restService.get<IListProfessional[]>(url);

      return { data };
    } catch (error) {
      return { error: getError(error) };
    }
  };
}

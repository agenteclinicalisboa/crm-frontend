import { getError } from '@/app/core/shared/utils';

import { RestService } from '@/app/core/services/rest.service';

import type { IListProcedureCategory } from '@/app/private/modules/admin/procedures/types/procedures';

export class ProceduresService {
  private restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  categoriesList = async () => {
    try {
      const url = `/procedures/categories`
      const { data } = await this.restService.get<IListProcedureCategory[]>(url);

      return { data };
    } catch (error) {
      return { error: getError(error) };
    }
  };
}

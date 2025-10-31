import { getError } from '@/app/core/shared/utils';

import { RestService } from '@/app/core/services/rest.service';

import type { IListBusinessHour } from '@/app/private/modules/admin/settings/types/settings';

export class SettingsService {
  private restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  businessHoursList = async () => {
    try {
      const url = `/settings/business-hours`
      const { data } = await this.restService.get<IListBusinessHour[]>(url);

      return { data };
    } catch (error) {
      return { error: getError(error) };
    }
  };
}

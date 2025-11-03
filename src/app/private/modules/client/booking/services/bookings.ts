import { getError } from '@/app/core/shared/utils';

import { RestService } from '@/app/core/services/rest.service';

import type { IBookingAvailability } from '@/app/private/modules/client/booking/types/booking';

export class BookingService {
  private restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  availability = async (professional_id: number, body: IBookingAvailability) => {
    try {
      const url = `/professionals/${String(professional_id)}/availability`;
      const { data } = await this.restService.post<IBookingAvailability, boolean>(url, body);

      return { data };
    } catch (error) {
      return { error: getError(error) };
    }
  };
}

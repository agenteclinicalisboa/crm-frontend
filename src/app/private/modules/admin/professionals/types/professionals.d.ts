export interface IListProfessional {
  id: number;
  name: string;
  profession: string;
  biography: string;
  image_url: string;
}

export interface IListProfessionalFreeDays {
  value: string;
  label: string;
  times: {
    available: boolean;
    time: string;
  }[];
}

export type IProfessional = IListProfessional;

export interface IListProfessional {
  id: number;
  name: string;
  profession: string;
  biography: string;
  image_url: string;
}

export interface IListProfessionalFreeDays {
  label: string;
  value: string;
}

export type IProfessional = IListProfessional;

export interface IPaginate {
  q?: string;
  page: number;
  pageSize: number;
}

export interface IItem {
  value: string;
  label: string;
}

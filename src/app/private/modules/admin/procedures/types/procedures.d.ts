export interface IListProcedureCategory {
  id: string;
  name: string;
  description: string;
}

export interface IListProcedure {
  id: number;
  category: string;
  name: string;
  description: string;
  duration: number;
  value: number;
}

export interface IProfessionalsProcedure {
  id: number;
  professionals: number[];
}

export type IProcedure = IListProcedure;
export type IProcedureCategory = IListProcedureCategory;

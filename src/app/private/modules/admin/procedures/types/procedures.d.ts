export interface IListProcedureCategory {
  id: string;
  name: string;
  description: string;
}

export interface IListProcedure {
  id: string;
  category: string;
  name: string;
  description: string;
  professional: string[];
  duration: number;
  value: number;
}

export type IProcedure = IListProcedure;
export type IProcedureCategory = IListProcedureCategory;

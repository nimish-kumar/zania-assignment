import { JSX } from "react";
import { TableActionsTypes } from "./constants";

export interface IHeaders {
  [key: string]: {
    label: string | null;
    style?: React.CSSProperties;
  };
}

export type TableStateType = {
  availableItemsCount: number;
  selectedAvailableItemsCount: number;
};

export interface TableContextProps {
  state: TableStateType;
  dispatch: React.Dispatch<TableActions>;
}

type AvailableCountType = keyof typeof TableActionsTypes;

export type TableActions = {
  type: AvailableCountType;
  payload: number;
};

export type PossibleJsonDataType = string | number | boolean;

export type IData<T extends Record<keyof ISampleData, PossibleJsonDataType>> = {
  [K in keyof T]: {
    renderData?: (props: { value: T[K] | null }) => JSX.Element;
    value: T[K] | null;
  } | null;
};

interface ISampleData {
  name: string;
  device: string;
  path: string;
  status: string;
}

export interface IDataGridRowProps extends Pick<IProps, "hasSelectRow"> {
  rowData: IData<ISampleData>;
}

export interface IProps {
  headers: IHeaders;
  data: IData<ISampleData>[];
  hasSelectRow?: boolean;
}

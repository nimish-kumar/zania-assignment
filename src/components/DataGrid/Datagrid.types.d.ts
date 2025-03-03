import { JSX } from "react";
import { Status, TableActionsTypes } from "./constants";

export interface IHeaders {
  [key: string]: {
    label: string | null;
    style?: React.CSSProperties;
  };
}

export type TableStateType = {
  availableItemsCount: number;
  selectedAvailableItemsCount: number;
  itemsCount: number;
  selectedItemsCount: number;
  allSelected: boolean | null;
};

export interface TableContextProps {
  state: TableStateType;
  dispatch: React.Dispatch<TableActions>;
}

type AvailableCountType = keyof typeof TableActionsTypes;

export type TableActions =
  | {
      type: (typeof TableActionsTypes)["SET_AVAILABLE_COUNT"];
      payload: number;
    }
  | {
      type: (typeof TableActionsTypes)["SET_COUNT"];
      payload: number;
    }
  | {
      type: (typeof TableActionsTypes)["INC_SELECTED_COUNT"];
      payload: StatusType;
    }
  | {
      type: (typeof TableActionsTypes)["DEC_SELECTED_COUNT"];
      payload: StatusType;
    }
  | {
      type: (typeof TableActionsTypes)["ALL_SELECTED"];
      payload: boolean | null;
    };

export type PossibleJsonDataType = string | number | boolean;

export type IData<T extends Record<keyof ISampleData, PossibleJsonDataType>> = {
  [K in keyof T]: {
    renderData: ((props: { value: T[K] | null }) => JSX.Element | null) | null;
    value: T[K];
  } | null;
};

export type StatusType = keyof typeof Status;

interface ISampleData {
  checkbox: string;
  name: string;
  device: string;
  path: string;
  status: string;
}

export interface IDataGridRowProps extends Pick<IProps, "hasSelectRow"> {
  rowData: IData<ISampleData>;
  styles: Record<string, React.CSSProperties | undefined>;
  headers: string[];
}

export interface IProps {
  headers: IHeaders;
  data: IData<ISampleData>[];
  hasSelectRow?: boolean;
  availableItemsCount: number;
  itemsCount: number;
}

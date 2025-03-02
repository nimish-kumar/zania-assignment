import { IData, ISampleData } from "./components/DataGrid/Datagrid.types";
import data from "./data.json";

export const SAMPLE_DATA = data as ISampleData[];

export const TRANSFORMED_DATA = SAMPLE_DATA.map((d) => {
  const row: IData<ISampleData> = {
    checkbox: null,
    device: null,
    name: null,
    path: null,
    status: null,
  };

  Object.entries(d).forEach(([key, value]) => {
    const v = value;
    row[key as keyof ISampleData] = {
      value: v,
    };
  });
  return row;
});

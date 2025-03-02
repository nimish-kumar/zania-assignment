import { IData, ISampleData } from "./components/DataGrid/Datagrid.types";
import data from "./data.json";

const SAMPLE_DATA = data as ISampleData[];

export const TRANSFORMED_DATA = SAMPLE_DATA.map((d) => {
  const row: IData<ISampleData> = {
    device: null,
    name: null,
    path: null,
    status: null,
  };

  Object.entries(d).forEach(([key, value]) => {
    const v = value as string | null;
    row[key as keyof ISampleData] = {
      value: v,
    };
  });
  return row;
});


export default SAMPLE_DATA;

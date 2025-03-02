import { Table } from "./components/DataGrid/Datagrid";
import { TRANSFORMED_DATA } from "./data";
function App() {
  return (
    <>
      <Table
        hasSelectRow
        headers={{
          checked: {
            label: null,
          },
          name: { label: "Name" },
          device: { label: "Device" },
          path: { label: "Path" },
          status: { label: "Status" },
        }}
        data={TRANSFORMED_DATA}
      />
    </>
  );
}

export default App;

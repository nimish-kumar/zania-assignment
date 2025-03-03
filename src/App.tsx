import { Table } from "./components/DataGrid";
import { SAMPLE_DATA, TRANSFORMED_DATA } from "./data";

function App() {
  return (
    <>
      <Table
        hasSelectRow
        headers={{
          name: { label: "Name" },
          device: { label: "Device" },
          path: {
            label: "Path",
            style: {
              maxWidth: "10rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          },
          status: { label: "Status" },
        }}
        data={TRANSFORMED_DATA}
        availableItemsCount={
          SAMPLE_DATA.filter((d) => d.status === "available").length
        }
        itemsCount={SAMPLE_DATA.length}
      />
    </>
  );
}

export default App;

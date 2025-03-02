import { createContext, memo, useMemo, useReducer } from "react";
import DownloadIcon from "../../../assets/download.svg";
import { Checkbox, CheckboxStatus } from "../Checkbox";
import styles from "./Datagrid.module.css";
import {
  IDataGridRowProps,
  IProps,
  TableActions,
  TableContextProps,
  TableStateType,
} from "./Datagrid.types";
import { TableActionsTypes } from "./constants";

function DataGridRow({ rowData, hasSelectRow }: IDataGridRowProps) {
  const memoizedRowData = useMemo(() => rowData, [rowData]);
  return (
    <tr>
      {hasSelectRow && (
        <td>
          <Checkbox />
        </td>
      )}
      {Object.entries(memoizedRowData)
        .sort(([k1], [k2]) => k1.localeCompare(k2))
        .map(([key, d]) => (
          <td key={key}>
            {d?.renderData ? d?.renderData({ value: d.value }) : d?.value}
          </td>
        ))}
    </tr>
  );
}

const MemoizedDataRow = memo(DataGridRow);

export function DataGrid({ data, headers, hasSelectRow }: IProps) {
  const headersWithKeys = useMemo(
    () =>
      Object.entries(headers)
        .sort(([k1], [k2]) => k1.localeCompare(k2))
        .map(([key, { label, style }]) => ({
          key,
          label,
          style,
        })),
    [headers]
  );
  return (
    <table className={styles.datagrid}>
      {/* {headersWithKeys.map((header) => (
        <col style={header.style} key={header.key} />
      ))} */}
      <thead>
        <tr key="headers">
          {headersWithKeys.map((header) => (
            <th scope="col" style={header.style} key={header.key}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <MemoizedDataRow
            rowData={row}
            hasSelectRow={hasSelectRow}
            key={idx}
          />
        ))}
      </tbody>
    </table>
  );
}

const initialState: TableStateType = {
  availableItemsCount: 3,
  selectedAvailableItemsCount: 3,
};

const TableContext = createContext<TableContextProps | undefined>(undefined);

function tableReducer(
  state: TableStateType,
  action: TableActions
): TableStateType {
  switch (action.type) {
    case TableActionsTypes.SET_AVAILABLE_COUNT:
      return {
        ...state,
        availableItemsCount: action.payload,
      };
    case TableActionsTypes.SET_SELECTED_AVAILABLE_COUNT:
      return {
        ...state,
        availableItemsCount: action.payload,
      };
    default:
      return state;
  }
}

function SelectAllRow({
  availableItemsCount,
  selectedAvailableItemsCount,
}: {
  selectedAvailableItemsCount: number;
  availableItemsCount: number;
}) {
  function getselectedAvailableItemsCountLabel() {
    if (selectedAvailableItemsCount == 0)
      return { label: "None Selected", status: CheckboxStatus.UNCHECKED };
    if (
      selectedAvailableItemsCount > 0 &&
      selectedAvailableItemsCount === availableItemsCount
    )
      return { label: "All Selected", status: CheckboxStatus.CHECKED };
    return { label: "Some Selected", status: CheckboxStatus.INTERMEDIATE };
  }

  const { status, label } = getselectedAvailableItemsCountLabel();
  return (
    <div className={styles.selectAllRow}>
      <div className={styles.checkboxContainer}>
        <Checkbox status={status} />
        <span>{label}</span>
      </div>
      <button
        disabled={!(status === CheckboxStatus.CHECKED)}
        className={styles.downloadBtn}
      >
        <img src={DownloadIcon} alt="Download Icon" height={20} width={20} />
        <span>Download Selected</span>
      </button>
    </div>
  );
}

export function Table({ headers, data, hasSelectRow }: IProps) {
  const [state, dispatch] = useReducer(tableReducer, initialState);
  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {hasSelectRow && (
        <SelectAllRow
          availableItemsCount={state.availableItemsCount}
          selectedAvailableItemsCount={state.selectedAvailableItemsCount}
        />
      )}
      <DataGrid headers={headers} data={data} hasSelectRow={hasSelectRow} />
    </TableContext.Provider>
  );
}

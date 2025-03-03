import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import DownloadIcon from "../../../assets/download.svg";
import { Checkbox } from "../Checkbox";
import styles from "./Datagrid.module.css";
import {
  IDataGridRowProps,
  IProps,
  StatusType,
  TableContextProps,
} from "./Datagrid.types";

import { SAMPLE_DATA } from "../../data";
import { Status, TableActionsTypes } from "./constants";
import { tableReducer } from "./reducer";
import { store } from "./store";

function DataGridRow({
  rowData,
  hasSelectRow,
  styles,
  headers,
  rowIdx,
}: IDataGridRowProps) {
  const { dispatch, state } = useContext(TableContext);
  const [checkboxState, setCheckboxState] = useState<boolean>(false);

  useEffect(() => {
    if (state.allSelected) {
      setCheckboxState(true);
    } else if (state.allSelected === false) {
      setCheckboxState(false);
    }
  }, [state.allSelected]);

  const checkboxChangeHandler = useCallback(
    (state: boolean | null, value: string | null) => {
      setCheckboxState(Boolean(state));
      if (
        [Status.available, Status.scheduled].findIndex((d) => d === value) > -1
      ) {
        if (state) {
          return dispatch({
            type: "INC_SELECTED_COUNT",
            payload: {
              status: value as StatusType,
              idx: value === "available" ? rowIdx : null,
            },
          });
        }
        return dispatch({
          type: "DEC_SELECTED_COUNT",
          payload: {
            status: value as StatusType,
            idx: value === "available" ? rowIdx : null,
          },
        });
      }
    },
    [dispatch, rowIdx]
  );

  const memoizedRowData = useMemo(() => {
    const row = { ...rowData };
    if (hasSelectRow) {
      row["checkbox"] = {
        value: rowData.status?.value ?? "scheduled",
        renderData: ({ value }) => (
          <Checkbox
            checked={checkboxState}
            handleChange={(state) => {
              checkboxChangeHandler(Boolean(state), value);
            }}
          />
        ),
      };
    }
    const rowMapping = Object.entries(row);

    const rTemp = headers.map((h) => ({
      key: h,
      ...(rowMapping.find(([k]) => k === h)?.[1] ?? {
        value: null,
        renderData: () => null,
      }),
    }));
    return rTemp;
  }, [checkboxChangeHandler, checkboxState, hasSelectRow, headers, rowData]);

  return (
    <tr>
      {memoizedRowData.map(({ key, value, renderData }) => {
        return (
          <td key={key} style={styles[key]}>
            {renderData ? renderData({ value }) : value}
          </td>
        );
      })}
    </tr>
  );
}

export function DataGrid({
  data,
  headers,
  hasSelectRow,
}: Omit<IProps, "availableItemsCount" | "itemsCount">) {
  const headersWithKeys = useMemo(() => {
    let hTemp;
    if (hasSelectRow)
      hTemp = [
        { key: "checkbox", label: null, style: undefined },
        ...Object.entries(headers).map(([key, value]) => ({ key, ...value })),
      ];
    return hTemp as {
      label: string | null;
      style?: React.CSSProperties;
      key: string;
    }[];
  }, [hasSelectRow, headers]);

  const stylesObj: Record<string, React.CSSProperties> = {};
  headersWithKeys.forEach((d) => {
    stylesObj[d.key] = d.style ?? {};
  });

  const headerKeys = useMemo(
    () => headersWithKeys.map((d) => d.key),
    [headersWithKeys]
  );

  return (
    <table className={styles.datagrid}>
      <thead>
        <tr key="headers">
          {headersWithKeys.map((header) => (
            <th scope="col" key={header.key} style={header.style}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <DataGridRow
            rowIdx={idx}
            headers={headerKeys}
            rowData={row}
            hasSelectRow={hasSelectRow}
            key={idx}
            styles={stylesObj}
          />
        ))}
      </tbody>
    </table>
  );
}

const TableContext = createContext<TableContextProps>({
  state: store,
  dispatch: () => null,
});

function HeadRow() {
  const {
    state: {
      selectedAvailableItemsCount,
      availableItemsCount,
      itemsCount,
      selectedItemsCount,
      allSelected,
      selectedAvailableItemsIdx,
    },
    dispatch,
  } = useContext(TableContext);

  const isDownloadButtonEnabled = useMemo(
    () =>
      selectedAvailableItemsCount > 0 &&
      selectedAvailableItemsCount <= availableItemsCount &&
      selectedItemsCount === selectedAvailableItemsCount,
    [availableItemsCount, selectedAvailableItemsCount, selectedItemsCount]
  );

  const label = useMemo(() => {
    if (allSelected) return "All Selected";
    if (allSelected === null) return "Some Selected";
    return "None Selected";
  }, [allSelected]);

  useEffect(() => {
    if (selectedItemsCount > 0 && selectedItemsCount === itemsCount) {
      dispatch({ type: TableActionsTypes.ALL_SELECTED, payload: true });
    } else if (selectedItemsCount === 0) {
      dispatch({ type: TableActionsTypes.ALL_SELECTED, payload: false });
    } else dispatch({ type: TableActionsTypes.ALL_SELECTED, payload: null });
  }, [dispatch, itemsCount, selectedItemsCount]);

  return (
    <div className={styles.selectAllRow}>
      <div className={styles.checkboxContainer}>
        <Checkbox
          checked={allSelected}
          handleChange={(state) => {
            dispatch({
              type: TableActionsTypes.ALL_SELECTED,
              payload: state,
            });
          }}
        />
        <span>{label}</span>
      </div>
      <button
        disabled={!isDownloadButtonEnabled}
        className={styles.downloadBtn}
        onClick={() => {
          const idxList = [...selectedAvailableItemsIdx].filter(
            (d) => d !== null
          );
          const messages = SAMPLE_DATA.filter(
            (_, idx) => idxList.findIndex((d) => d === idx) > -1
          )
            .map((d) =>
              Object.entries(d)
                .map(([k, v]) => `${k} : ${v}`)
                .join(", ")
            )
            .join("\n");
          alert(["Dowloaded Items", messages].join("\n\n"));
        }}
      >
        <img src={DownloadIcon} alt="Download Icon" height={20} width={20} />
        <span>Download Selected</span>
      </button>
    </div>
  );
}

export function Table({
  headers,
  data,
  hasSelectRow,
  availableItemsCount,
  itemsCount,
}: IProps) {
  const [state, dispatch] = useReducer(tableReducer, store);

  useEffect(() => {
    dispatch({
      type: TableActionsTypes.SET_AVAILABLE_COUNT,
      payload: availableItemsCount,
    });
  }, [availableItemsCount]);

  useEffect(() => {
    dispatch({
      type: TableActionsTypes.SET_COUNT,
      payload: itemsCount,
    });
  }, [itemsCount]);

  const contextValues = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );
  return (
    <TableContext.Provider value={contextValues}>
      {hasSelectRow && <HeadRow />}
      <DataGrid headers={headers} data={data} hasSelectRow={hasSelectRow} />
    </TableContext.Provider>
  );
}

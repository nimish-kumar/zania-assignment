import { SAMPLE_DATA } from "../../data";
import { TableActionsTypes } from "./constants";
import { TableActions, TableStateType } from "./Datagrid.types";

export function tableReducer(
  state: TableStateType,
  action: TableActions
): TableStateType {
  const updatedIdxSet = new Set(state.selectedAvailableItemsIdx);
  switch (action.type) {
    case TableActionsTypes.SET_AVAILABLE_COUNT:
      return {
        ...state,
        availableItemsCount: action.payload,
      };
    case TableActionsTypes.SET_COUNT:
      return {
        ...state,
        itemsCount: action.payload,
      };
    case TableActionsTypes.INC_SELECTED_COUNT:
      updatedIdxSet.add(action.payload.idx);
      return {
        ...state,
        selectedItemsCount: state.selectedItemsCount + 1,
        selectedAvailableItemsCount:
          action.payload.status === "available"
            ? state.selectedAvailableItemsCount + 1 >= state.availableItemsCount
              ? state.availableItemsCount
              : state.selectedAvailableItemsCount + 1
            : state.selectedAvailableItemsCount,
        selectedAvailableItemsIdx: new Set([...updatedIdxSet]),
      };
    case TableActionsTypes.DEC_SELECTED_COUNT:
      updatedIdxSet.delete(action.payload.idx);
      return {
        ...state,
        selectedItemsCount: state.selectedItemsCount - 1,
        selectedAvailableItemsCount:
          action.payload.status === "available"
            ? state.selectedAvailableItemsCount - 1 <= 0
              ? 0
              : state.selectedAvailableItemsCount - 1
            : state.selectedAvailableItemsCount,
        selectedAvailableItemsIdx: new Set([...updatedIdxSet]),
      };
    case TableActionsTypes.ALL_SELECTED:
      if (action.payload)
        return {
          ...state,
          selectedAvailableItemsCount: state.availableItemsCount,
          selectedItemsCount: state.itemsCount,
          allSelected: true,
          selectedAvailableItemsIdx: new Set(
            SAMPLE_DATA.map((d, idx) => {
              if (d.status === "available") return idx;
              return null;
            }).filter((d) => d !== null)
          ),
        };
      if (action.payload === false)
        return {
          ...state,
          selectedAvailableItemsCount: 0,
          selectedItemsCount: 0,
          allSelected: false,
          selectedAvailableItemsIdx: new Set(),
        };
      return {
        ...state,
        allSelected: null,
      };
    default:
      return state;
  }
}

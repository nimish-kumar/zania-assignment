import { TableActionsTypes } from "./constants";
import { TableActions, TableStateType } from "./Datagrid.types";

export function tableReducer(
  state: TableStateType,
  action: TableActions
): TableStateType {
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
      return {
        ...state,
        selectedItemsCount: state.selectedItemsCount + 1,
        selectedAvailableItemsCount:
          action.payload === "available"
            ? state.selectedAvailableItemsCount + 1 >= state.availableItemsCount
              ? state.availableItemsCount
              : state.selectedAvailableItemsCount + 1
            : state.selectedAvailableItemsCount,
      };
    case TableActionsTypes.DEC_SELECTED_COUNT:
      return {
        ...state,
        selectedItemsCount: state.selectedItemsCount - 1,
        selectedAvailableItemsCount:
          action.payload === "available"
            ? state.selectedAvailableItemsCount - 1 <= 0
              ? 0
              : state.selectedAvailableItemsCount - 1
            : state.selectedAvailableItemsCount,
      };
    case TableActionsTypes.ALL_SELECTED:
      if (action.payload)
        return {
          ...state,
          selectedAvailableItemsCount: state.availableItemsCount,
          selectedItemsCount: state.itemsCount,
          allSelected: true,
        };
      if (action.payload === false)
        return {
          ...state,
          selectedAvailableItemsCount: 0,
          selectedItemsCount: 0,
          allSelected: false,
        };
      return {
        ...state,
        allSelected: null,
      };
    default:
      return state;
  }
}

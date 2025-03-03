export const TableActionsTypes = {
  SET_AVAILABLE_COUNT: "SET_AVAILABLE_COUNT",
  SET_COUNT: "SET_COUNT",
  INC_SELECTED_COUNT: "INC_SELECTED_COUNT",
  DEC_SELECTED_COUNT: "DEC_SELECTED_COUNT",
  ALL_SELECTED: "IS_ALL_SELECTED",
} as const;

export const Status = {
  available: "available",
  scheduled: "scheduled",
} as const;

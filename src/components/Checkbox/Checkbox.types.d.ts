import { CheckboxState } from "./constants";

export type CheckboxStateTypes = keyof typeof CheckboxState;

export interface HTMLCheckboxElement extends HTMLInputElement {
  type: "checkbox";
}

export interface IProps {
  handleChange?: (status: boolean | null) => void;
  checked: boolean | null;
}

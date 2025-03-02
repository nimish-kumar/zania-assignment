export type CheckboxStatusTypes = keyof typeof CheckboxStatus;

export interface IProps {
  status?: CheckboxStatusTypes;
}

export interface HTMLCheckboxElement extends HTMLInputElement {
  type: "checkbox";
}

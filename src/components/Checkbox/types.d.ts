type CheckboxStatusTypes = keyof typeof CheckboxStatus;

interface IProps {
  status?: CheckboxStatusTypes;
}

interface HTMLCheckboxElement extends HTMLInputElement {
  type: "checkbox";
}

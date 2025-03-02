import { useEffect, useRef } from "react";
import styles from "./Checkbox.module.css";
import { HTMLCheckboxElement, IProps } from "./Checkbox.types";

export function Checkbox({ handleChange, checked }: IProps) {
  const checkboxRef = useRef<HTMLCheckboxElement>(null);
  useEffect(() => {
    if (checkboxRef.current)
      checkboxRef.current.indeterminate = checked === null;
  }, [checked]);

  return (
    <input
      type="checkbox"
      ref={checkboxRef}
      checked={Boolean(checked)}
      onChange={(e) => {
        if (handleChange) {
          handleChange(e.target.checked);
        }
      }}
      className={styles.checkbox}
    />
  );
}

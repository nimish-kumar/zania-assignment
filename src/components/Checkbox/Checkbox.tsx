import { useEffect, useRef, useState } from "react";

import { CheckboxStatus } from "./constants";
import { CheckboxStatusTypes, HTMLCheckboxElement, IProps } from "./Checkbox.types";

export function Checkbox({ status }: IProps) {
  const checkboxRef = useRef<HTMLCheckboxElement>(null);

  useEffect(() => {
    if (checkboxRef.current)
      checkboxRef.current.indeterminate =
        status === CheckboxStatus.INTERMEDIATE;
  }, [status]);

  const [checkboxStatus, setCheckboxStatus] = useState<CheckboxStatusTypes>(
    status ?? CheckboxStatus.UNCHECKED
  );

  return (
    <input
      type="checkbox"
      ref={checkboxRef}
      checked={checkboxStatus === CheckboxStatus.CHECKED}
      onChange={(e) =>
        setCheckboxStatus(
          e.target.checked ? CheckboxStatus.CHECKED : CheckboxStatus.UNCHECKED
        )
      }
    />
  );
}

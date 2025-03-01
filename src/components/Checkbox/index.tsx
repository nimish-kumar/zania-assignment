import { useEffect, useRef, useState } from "react";
import { CheckboxStatus } from "./constants";

export default function Checkbox({ status }: IProps) {
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

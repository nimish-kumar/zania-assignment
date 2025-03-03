import styles from "./StatusCell.module.css";

export function StatusCell({ value }: { value: string | null | undefined }) {
  if (value)
    return (
      <div className={styles.container}>
        {value === "available" && (
          <span className={styles.available}>&nbsp;</span>
        )}
        <span className={styles.label}>{value}</span>
      </div>
    );
  return null;
}

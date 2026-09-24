import styles from "./Logo.module.css";

export function Logo() {
  return (
    <span className={styles.logo}>
      <span className={styles.mark} aria-hidden="true" />
      Medically Explained
    </span>
  );
}

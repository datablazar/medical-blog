import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container stack">
        <p className={styles.name}>Medically Explained</p>
        <p className="t-small muted measure">
          This is general information, not a substitute for advice from your GP or pharmacist.
        </p>
        <p className="t-small muted">© {new Date().getFullYear()} Medically Explained</p>
      </div>
    </footer>
  );
}

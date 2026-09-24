import Link from "next/link";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          Medically Explained
        </Link>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

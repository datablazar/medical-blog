import Link from "next/link";
import { Logo } from "./Logo";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={`container ${styles.header}`}>
      <Link href="/" className={styles.home} aria-label="Medically Explained, home">
        <Logo />
      </Link>
      <nav aria-label="Main">
        <ul className={styles.nav}>
          <li><Link href="/#conditions">Conditions</Link></li>
          <li><Link href="/articles">Explainers</Link></li>
          <li><Link href="/about">My story</Link></li>
          <li><Link href="/#latest" className={styles.cta}>Latest articles</Link></li>
        </ul>
      </nav>
    </header>
  );
}

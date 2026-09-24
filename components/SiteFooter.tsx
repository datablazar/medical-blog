import { disclaimer } from "@/lib/site-content";
import { Logo } from "./Logo";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={`container rule-top ${styles.footer}`}>
      <Logo />
      <p>{disclaimer}</p>
    </footer>
  );
}

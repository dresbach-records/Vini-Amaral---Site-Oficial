import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>Vini Amaral</div>
      <div className={styles.footerCopy}>© 2026 Vini Amaral · Nobody Knows · All rights reserved</div>
    </footer>
  );
};

export default Footer;

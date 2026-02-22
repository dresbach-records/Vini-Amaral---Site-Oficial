'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <Link href="/">Vini Amaral</Link>
      </div>
      <div className={`${styles.navLinksContainer} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.navLinks}>
          <li><Link href="/#about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link href="/#album" onClick={() => setIsOpen(false)}>Album</Link></li>
          <li><Link href="/#lyrics" onClick={() => setIsOpen(false)}>Lyrics</Link></li>
          <li><Link href="/#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      </div>
      <button className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </button>
    </nav>
  );
};

export default Navigation;

import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <div className="nav-logo">Vini Amaral</div>
      <ul className="nav-links">
        <li><Link href="/#about">About</Link></li>
        <li><Link href="/#album">Album</Link></li>
        <li><Link href="/#lyrics">Lyrics</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;

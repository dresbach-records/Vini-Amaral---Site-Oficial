import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <p className={styles.heroEyebrow}>Melodic Rock · Nostalgia · 80s</p>
        <h1 className={styles.heroTitle}>
          Vini<br />
          <span className={styles.heroTitleItalic}>Amaral</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Songs that say what you feel<br />
          but never knew how to say.
        </p>
        <div className={styles.heroCta}>
          <a href="https://soundcloud.com/vini-amaral-748220502?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>▶ Listen on SoundCloud</a>
          <a href="https://www.facebook.com/share/g/1CGhmNgKGi/" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>Join on Facebook</a>
        </div>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine}></div>
          <span className={styles.scrollText}>Scroll Down</span>
        </div>
      </div>
      <div className={styles.heroRight}>
        <Image 
          src="/fotos/CAPA LP.jpg" 
          alt="Vini Amaral" 
          className={styles.heroImg} 
          fill={true}
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className={styles.heroImgOverlay}></div>
        <div className={styles.heroNumber}>VA</div>
      </div>
    </section>
  );
};

export default Hero;

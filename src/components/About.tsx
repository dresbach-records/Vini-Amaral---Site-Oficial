import Image from 'next/image';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutImgWrap}>
        <Image 
          src="/fotos/eu-poli.JPG" 
          alt="Vini Amaral" 
          className={styles.aboutImg}
          width={400}
          height={520}
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className={styles.aboutImgBorder}></div>
      </div>
      <div>
        <p className={styles.aboutTag}>About the Artist</p>
        <h2 className={styles.aboutTitle}>A voice that <em>carries</em> what the heart can&apos;t bear</h2>
        <p className={styles.aboutText}>
          Vini Amaral is a Brazilian singer, songwriter, and writer who grew up listening to the melodic rock of the 80s — that era when songs had soul, pianos bled emotion, and voices didn&apos;t have to be perfect to break your heart.
        </p>
        <p className={styles.aboutText}>
          With influences from Kayt West, Eros Ramazzotti, and Bryan Adams, Vini has created a repertoire that speaks to what everyone feels but few can say: the absence of someone who left and left everything exactly as it was.
        </p>
        <p className={styles.aboutText}>
          At the piano, in a suit, with a white handkerchief in his pocket — he doesn&apos;t perform pain. He lives it in front of you.
        </p>
      </div>
    </section>
  );
};

export default About;

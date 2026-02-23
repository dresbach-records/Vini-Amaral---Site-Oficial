import styles from './Contact.module.css';
import { NewsletterForm } from './NewsletterForm';

const Contact = () => {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactContent}>
        <p className={styles.sectionTag}>Contact</p>
        <h2 className={styles.contactTitle}>Let&apos;s <em>talk</em></h2>
        <p className={styles.contactText}>Shows, partnerships, press, or just to say a song touched your heart — I&apos;m here.</p>
        <div className={styles.socialLinks}>
          <a href="https://www.instagram.com/vini_amaral_oficial/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
          <a href="https://www.facebook.com/ViniAmaralMusic" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Facebook</a>
          <a href="https://www.youtube.com/channel/UCfKazgnWyOs5jUI3Y8kAfLw" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>YouTube</a>
          <a href="https://www.tiktok.com/@vini_amaral_oficial" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>TikTok</a>
          <a href="mailto:contato@viniamaral.click" className={styles.socialLink}>Email</a>
          <a href="https://soundcloud.com/vini-amaral-748220502?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank" rel="noopener noreferrer" className={styles.socialLink} style={{color:'var(--gold)'}}>✦ SoundCloud</a>
        </div>
        <a href="https://soundcloud.com/vini-amaral-748220502?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank" rel="noopener noreferrer" className={styles.listenBtn}>▶ Listen Now on SoundCloud</a>
      </div>
      <NewsletterForm />
    </section>
  );
};

export default Contact;

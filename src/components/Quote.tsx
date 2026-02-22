import styles from './Quote.module.css';

const Quote = () => {
  return (
    <section className={styles.quoteSection}>
      <p className={styles.quoteText}>
        &ldquo;The right music comes <em>before</em> the words.<br />
        It already knows what you can&apos;t say yet.&rdquo;
      </p>
      <span className={styles.quoteAttr}>— Vini Amaral</span>
    </section>
  );
};

export default Quote;

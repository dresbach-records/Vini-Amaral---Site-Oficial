import styles from './Stats.module.css';

const Stats = () => {
  return (
    <div className={styles.statsBar}>
      <div>
        <span className={styles.statNum}>6</span>
        <span className={styles.statLabel}>Original Songs</span>
      </div>
      <div>
        <span className={styles.statNum}>01</span>
        <span className={styles.statLabel}>Album — Nobody Knows</span>
      </div>
      <div>
        <span className={styles.statNum}>80s</span>
        <span className={styles.statLabel}>Style & Era</span>
      </div>
      <div>
        <span className={styles.statNum}>∞</span>
        <span className={styles.statLabel}>Hearts Touched</span>
      </div>
    </div>
  );
};

export default Stats;

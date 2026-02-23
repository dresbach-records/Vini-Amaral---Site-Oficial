'use client'
import { useState } from 'react';
import styles from './Player.module.css';
import heroStyles from './Hero.module.css'; // Import Hero styles for buttons

const tracks = [
    { num: "01", name: "Somebody Like A Ghost", key: "Am", bpm: "68", duration: "4:20",
      url: "https://soundcloud.com/vini-amaral-748220502/somebody-like-a-ghost-5?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=699b4ef6d933431089c1fa44b0daae18" },
    { num: "02", name: "Paper Hearts", key: "Em", bpm: "64", duration: "4:05",
      url: "https://soundcloud.com/vini-amaral-748220502/2-paper-hearts-1?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=ada81cb422fe44409f07f9bb53a53541" },
    { num: "03", name: "The Last Slow Dance", key: "Dm", bpm: "72", duration: "4:35",
      url: "https://soundcloud.com/vini-amaral-748220502/3-the-last-slow-dance-2?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=34aabb3912374f3ea01443ee38bcfb40" },
    { num: "04", name: "Old Photographs", key: "C", bpm: "60", duration: "4:15",
      url: "https://soundcloud.com/vini-amaral-748220502/4-old-photographs-3?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=7c30629fcf744ff5bdf49dd3c8e60351" },
    { num: "05", name: "November Rain (For Her)", key: "Gm", bpm: "66", duration: "5:10",
      url: "https://soundcloud.com/vini-amaral-748220502/5-november-rain-for-her-4?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=a536c971673f42d38f3b89ecbc4d0544" },
    { num: "06", name: "The Road Back Home", key: "G", bpm: "70", duration: "4:45",
      url: "https://soundcloud.com/vini-amaral-748220502" },
  ];

const seededRandom = (seed: number): number => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const Player = () => {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [scEmbedUrl, setScEmbedUrl] = useState("https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/vini-amaral-748220502&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false");

  const buildWave = (seed: number, isActive: boolean, playedPct: number = 0) => {
    const bars = 48;
    let html = '';
    for (let i = 0; i < bars; i++) {
      const h = 20 + Math.abs(Math.sin((i + seed) * 0.7)) * 80;
      const played = i / bars < playedPct;
      const cls = isActive ? (played ? `${styles.wave_bar} ${styles.played}` : styles.wave_bar) : styles.wave_bar;
      
      const randomDuration = 0.4 + seededRandom(seed + i) * 0.8;
      const randomDelay = seededRandom(seed - i) * 0.5;

      const anim = isActive
        ? `style="height:${h}%;animation:barPulse ${randomDuration}s ${randomDelay}s ease-in-out infinite alternate;"`
        : `style="height:${h}%"`;

      html += `<div class="${cls}" ${anim}></div>`;
    }
    return { __html: html };
  };

  const selectTrack = (idx: number) => {
    const t = tracks[idx];

    if (activeIdx === idx) {
      setActiveIdx(-1);
      setScEmbedUrl("https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/vini-amaral-748220502&color=%23C9A84C&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false");
      return;
    }

    setActiveIdx(idx);
    const encodedUrl = encodeURIComponent(t.url);
    setScEmbedUrl(`https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23C9A84C&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`);
  };

  return (
    <div className={styles.body}>
      <div className={styles.section_eyebrow}>Nobody Knows · Vini Amaral</div>
      <h2 className={styles.section_title}>Ouça o <em>Álbum</em></h2>
      <div className={styles.section_sub}>6 músicas · Streaming via SoundCloud</div>

      <div className={styles.player_block}>
        <div className={styles.vinyl_deco}></div>
        <div className={styles.player_card}>
          <div className={styles.card_gold_line}></div>
          <div className={styles.card_header}>
            <div className={styles.header_left}>
              <div className={styles.sc_logo}>
                <span className={styles.sc_icon}>☁</span> SoundCloud
              </div>
              <div className={styles.header_sep}></div>
              <div className={styles.header_title}>Nobody Knows · Álbum Completo</div>
            </div>
            <div className={styles.header_dot}></div>
          </div>

          <div className={styles.tracklist}>
            {tracks.map((t, i) => (
              <div className={`${styles.track_item} ${i === activeIdx ? styles.active : ''}`} onClick={() => selectTrack(i)} data-idx={i} key={i}>
                <div className={styles.track_num}>{t.num}</div>
                <div className={styles.track_play}>{i === activeIdx ? '❚❚' : '▶'}</div>
                <div className={styles.track_wave} dangerouslySetInnerHTML={buildWave(i * 7, i === activeIdx)}></div>
                <div className={styles.track_info}>
                  <div className={styles.track_name}>{t.name}</div>
                  <div className={styles.track_meta}>{t.key} · {t.bpm} BPM</div>
                </div>
                <div className={styles.track_duration}>{t.duration}</div>
              </div>
            ))}
          </div>

          <div className={`${styles.now_playing_bar} ${activeIdx !==-1 ? styles.show : ''}`}>
              <div className={styles.np_label}><div className={styles.np_dot}></div>Reproduzindo</div>
              <div className={styles.np_track}>{activeIdx !== -1 ? `${tracks[activeIdx].num} · ${tracks[activeIdx].name} · ${tracks[activeIdx].duration}` : '-'}</div>
          </div>

          <div className={styles.embed_area}>
            <div className={styles.embed_label}>Player SoundCloud</div>
            <iframe id="sc-embed"
              src={scEmbedUrl}
              scrolling="no"
              allow="autoplay">
            </iframe>
          </div>

          <div className={styles.card_footer}>
            <div className={styles.footer_artist}>
              <span>Vini Amaral</span> — Nobody Knows
            </div>
            <div className={styles.footer_actions}>
              <a href="https://soundcloud.com/vini-amaral-748220502" target="_blank" rel="noopener noreferrer" className={`${heroStyles.btn} ${styles.btn_sc_primary}`}>
                ☁ Abrir no SoundCloud
              </a>
              <a href="https://elasticstage.com/soundcloud/releases/vini-amaral-nobody-knows-album" target="_blank" rel="noopener noreferrer" className={`${heroStyles.btn} ${heroStyles.btnSecondary}`}>
                ✦ Comprar Álbum
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;

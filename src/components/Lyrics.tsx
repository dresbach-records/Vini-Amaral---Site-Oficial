'use client';

import { useState } from 'react';
import styles from './Lyrics.module.css';

const Lyrics = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const lyricsData = [
    {
      title: 'Somebody Like A Ghost',
      story: 'He loved her for years. She left on a rainy night without explanation. Now he walks the same places, touches the same things she touched — and realizes that she is in everything, but he has nothing left.',
      lyrics: `[Verse 1]
Her coat still hangs beside the door
The cup she touched I have not moved
Somebody used to breathe in here
Now nobody sleeps and nobody moves

[Chorus]
Somebody hold the pieces of me tonight
Anybody — God just make this feel right
Everybody sees a man who is standing strong
But nobody knows I have been gone so long

Nobody knows... nobody knows...
She was somebody
And now there is nobody home

[Bridge]
If anybody finds her tell her this
Somebody still keeps every note she kissed
Everybody moves on yes I know that is true
But nobody moves on when the somebody was you`,
      phonetic: `Her coat still hangs beside the door
The cup she touched I have not moved
Somebody used to breathe in here
Now nobody sleeps and nobody moves

Somebody hold the pieces of me tonight
Anybody — God just make this feel right
Everybody sees a man who is standing strong
But nobody knows I have been gone so long

Nobody knows... nobody knows...
She was somebody
And now there is nobody home`,
    },
    {
      title: 'Paper Hearts',
      story: 'He keeps all the little notes she wrote. Every folded piece of paper, every word in her handwriting. Today he opens the box and realizes the paper has yellowed — but the pain is still fresh.',
      lyrics: `[Verse 1]
There is a box beneath my bed
Full of paper, full of words she said
Every letter, every folded line
Every moment frozen back in time

Somebody wrote my name in red
Nobody writes like that when love is dead
Anybody else would throw this all away
But everybody knows I made her stay

[Chorus]
Paper hearts do not burn
Paper hearts just fade
Somebody teach me what
Nobody else has said
Everybody leaves a mark
Anybody feels the scar
But nobody — nobody
Keeps paper hearts like ours`,
      phonetic: `There is a box beneath my bed
Full of paper, full of words she said
Every letter, every folded line
Every moment frozen back in time

Somebody wrote my name in red
Nobody writes like that when love is dead
Anybody else would throw this all away
But everybody knows I made her stay

Paper hearts do not burn
Paper hearts just fade
Somebody teach me what
Nobody else has said`,
    },
    {
        title: 'Last Slow Dance',
        story: 'At a party years ago, they danced the last song together without knowing it was the last. Now every time he hears a slow song, he stops everything — because he feels she is still there, with her head on his shoulder.',
        lyrics: `[Verse 1]
The lights were low the room was warm
Somebody played our song before the storm
Everybody swayed and held someone near
Nobody knew that night would disappear

She put her head against my chest
Anybody watching knew that we were blessed

[Chorus]
The last slow dance
Somebody hold me like she did that night
The last slow dance
Nobody warned me that the song would die
Everybody in the room had somebody
But nobody had what we had in that light
The last slow dance
Was the last time I held somebody right`,
        phonetic: `The lights were low the room was warm
Somebody played our song before the storm
Everybody swayed and held someone near
Nobody knew that night would disappear

She put her head against my chest
Anybody watching knew that we were blessed

The last slow dance
Somebody hold me like she did that night
The last slow dance
Nobody warned me that the song would die`,
      },
      {
        title: 'Old Photographs',
        story: 'He finds a box of old photos while moving. In every photo, she is smiling, he is smiling — and neither of them knew what was to come. That smile in the photo hurts more than any tear.',
        lyrics: `[Verse 1]
I found a box inside a closet door
Somebody left these photographs before
Everybody smiling — frozen 1983
Nobody knew what time was going to be

[Chorus]
Old photographs
Somebody smiling does not know the end
Old photographs
Nobody told us love could break and bend
Everybody in these pictures looks so sure
But nobody — nobody
Looks like that anymore

[Outro]
She is still smiling...
Nobody fades...
Nobody...`,
        phonetic: `I found a box inside a closet door
Somebody left these photographs before
Everybody smiling — frozen 1983
Nobody knew what time was going to be

Old photographs
Somebody smiling does not know the end
Old photographs
Nobody told us love could break and bend
Everybody in these pictures looks so sure
But nobody — nobody
Looks like that anymore`,
      },
      {
        title: 'November Rain',
        story: "They broke up on a rainy day in November. Every year when November comes and the rain hits the window — he feels like it is that day all over again. Time has passed, but November does not forgive.",
        lyrics: `[Verse 1]
Every year when skies turn grey
Somebody takes my breath away
Nobody has to say the date — I know
Everybody leaves when cold winds blow

[Chorus]
November rain
Somebody bring the summer back again
November rain
Nobody told me cold could cause this pain
Everybody has a season they can not face
But nobody — nobody
Has a November like this place

Nobody has a November like her face`,
        phonetic: `Every year when skies turn grey
Somebody takes my breath away
Nobody has to say the date — I know
Everybody leaves when cold winds blow

November rain
Somebody bring the summer back again
November rain
Nobody told me cold could cause this pain
Everybody has a season they can not face
But nobody — nobody
Has a November like this place`,
      },
      {
        title: 'Road Back Home',
        story: "After everything — the pain, the songs, the photos, the November rains — he decides to go to the town where she lived. When he arrives, her house has become another place. And finally — he can breathe.",
        lyrics: `[Verse 1]
I drove three hours just to see the street
Somebody told me closure is what you need
Everybody said the past stays in the past
But nobody heals without going back at last

[Chorus]
The road back home
Somebody finally found the way through pain
The road back home
Nobody walks it twice — not just the same
Everybody has a place they have to leave behind
But nobody — nobody
Leaves the love behind

[Outro]
The road back home...
Somebody...
Home...`,
        phonetic: `I drove three hours just to see the street
Somebody told me closure is what you need
Everybody said the past stays in the past
But nobody heals without going back at last

The road back home
Somebody finally found the way through pain
The road back home
Nobody walks it twice — not just the same
Everybody has a place they have to leave behind
But nobody — nobody
Leaves the love behind`,
      },
  ];

  return (
    <section className={styles.lyricsSection} id="lyrics">
      <p className={`${styles.sectionTag} ${styles.textAlign}`}>
        Lyrics
      </p>
      <h2 className={`${styles.sectionTitle} ${styles.textAlign}`} style={{ marginBottom: '16px' }}>
        The <em>Words</em>
      </h2>
      <p className={`${styles.sectionSubtitle} ${styles.textAlign}`} style={{ marginBottom: '48px' }}>
        Each line was written to touch any heart
      </p>

      <div className={styles.lyricsTabs}>
        {lyricsData.map((lyric, index) => (
          <button 
            key={index}
            className={`${styles.lyricsTab} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {lyric.title}
          </button>
        ))}
      </div>

      {lyricsData.map((lyric, index) => (
        <div key={index} className={`${styles.lyricsPanel} ${activeIndex === index ? styles.active : ''}`}>
          <div className={styles.lyricsStory}>
            <div className={styles.lyricsStoryLabel}>The Story</div>
            <div className={styles.lyricsStoryText}>{lyric.story}</div>
          </div>
          <div>
            <div className={styles.lyricsText} dangerouslySetInnerHTML={{ __html: lyric.lyrics.replace(/\n/g, '<br />') }}></div>
          </div>
          <div>
            <div className={styles.lyricsPhonetic} dangerouslySetInnerHTML={{ __html: lyric.phonetic.replace(/\n/g, '<br />') }}></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Lyrics;

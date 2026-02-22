'use client'
import styles from './Plataformas.module.css';

interface Platform {
  name: string;
  cls: string;
  icon: string;
  flag?: string;
}

const platforms: Platform[] = [
  {
    name: "Spotify",
    cls: "icon_spotify",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
  },
  {
    name: "Apple Music",
    cls: "icon_apple",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A9.407 9.407 0 00.05 5.08C.01 5.466 0 5.853 0 6.24v11.52c.01.189.02.378.04.566.05.586.19 1.15.43 1.69.56 1.282 1.484 2.175 2.766 2.695.59.239 1.2.37 1.83.43.41.04.822.056 1.23.057h11.39c.43 0 .855-.015 1.28-.065.595-.064 1.175-.197 1.73-.428 1.31-.54 2.22-1.445 2.765-2.745.24-.54.38-1.1.435-1.683.04-.404.05-.81.05-1.215V6.124zm-8.917 4.88L12.6 12.52l-5.39-4.59c-.15-.13-.15-.34-.01-.48l3.11-3.09 2.16 3.11 2.587-3.1c.14-.14.36-.13.49.01l3.24 3.05c.15.14.14.36-.01.49l-5.7 3.086z"/></svg>`,
  },
  {
    name: "YouTube Music",
    cls: "icon_youtube",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
  },
  {
    name: "Amazon Music",
    cls: "icon_amazon",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705a.66.66 0 01-.753.074c-1.058-.88-1.245-1.286-1.826-2.126-1.748 1.783-2.987 2.316-5.255 2.316-2.683 0-4.773-1.656-4.773-4.972 0-2.587 1.402-4.346 3.399-5.204 1.731-.761 4.149-.895 5.993-1.105V6.4c0-.739.057-1.609-.374-2.247-.376-.571-1.098-.808-1.733-.808-1.178 0-2.228.604-2.486 1.856-.053.282-.258.56-.54.574l-3.018-.327c-.255-.057-.537-.263-.463-.653C6.556 2.128 9.585 1.2 12.28 1.2c1.376 0 3.175.365 4.258 1.408 1.376 1.284 1.244 2.999 1.244 4.866v4.407c0 1.327.549 1.907 1.065 2.623.18.253.22.556-.011.741-.578.48-1.606 1.371-2.17 1.871l-.522-.321z"/></svg>`,
  },
  {
    name: "TikTok",
    cls: "icon_tiktok",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="url(#tiktok-grad)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  },
  {
    name: "Deezer",
    cls: "icon_deezer",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M18.944 16.2h4.01v1.6h-4.01zm0-3.2h4.01v1.6h-4.01zm0-3.2h4.01v1.6h-4.01zM13.5 16.2h4.01v1.6H13.5zm0-3.2h4.01v1.6H13.5zm0-3.2h4.01v1.6H13.5zm0-3.2h4.01V8.2H13.5zM8.056 16.2h4.01v1.6h-4.01zm0-3.2h4.01v1.6h-4.01zM2.61 16.2h4.01v1.6H2.61zm0-3.2h4.01v1.6H2.61z"/></svg>`,
  },
  {
    name: "Tidal",
    cls: "icon_tidal",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004zM8.008 16.004l4.004-4.004 4.004 4.004 4.004-4.004-4.004-4.004-4.004 4.004-4.004-4.004-4.004 4.004z"/></svg>`,
  },
  {
    name: "Pandora",
    cls: "icon_pandora",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M0 0h6.612c4.53 0 8.182 3.773 8.182 8.05 0 4.243-3.652 7.6-8.182 7.6H4.36V24H0V0zm4.36 11.798h2.252c2.09 0 3.822-1.638 3.822-3.748 0-2.142-1.732-3.84-3.822-3.84H4.36v7.588z"/></svg>`,
  },
  {
    name: "iHeartRadio",
    cls: "icon_iheart",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm0 2.25a5.25 5.25 0 100 10.5A5.25 5.25 0 0012 6.75zm0 2.25a3 3 0 110 6 3 3 0 010-6zm0 1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg>`,
  },
  {
    name: "Napster",
    cls: "icon_napster",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.25 9.75c0 2.9-2.35 5.25-5.25 5.25S6.75 12.65 6.75 9.75 9.1 4.5 12 4.5s5.25 2.35 5.25 5.25zm-5.25 6.75c1.9 0 3.6-.75 4.85-2h.15c1.1 0 2 .9 2 2v1.5h-14V16.5c0-1.1.9-2 2-2h.15c1.25 1.25 2.95 2 4.85 2z"/></svg>`,
  },
  {
    name: "Shazam",
    cls: "icon_shazam",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12.004 0C5.372 0 0 5.372 0 12.003 0 18.63 5.372 24 12.004 24c6.628 0 11.999-5.37 11.999-11.997C24.003 5.372 18.632 0 12.004 0zm5.248 11.185c-1.363 0-1.963-.768-3.093-.768-1.15 0-1.542.576-2.918.576-1.146 0-1.92-.535-1.92-1.385 0-1.346 1.397-2.044 3.09-2.044.787 0 1.502.192 2.073.526.217-.374.504-.724.85-1.003a4.43 4.43 0 00-2.923-1.073c-2.444 0-4.42 1.575-4.42 4.08 0 2.2 1.573 3.564 4.154 3.564 2.12 0 3.756-1.214 3.756-2.752 0-.862-.416-1.534-1.078-2.112-.218.375-.504.722-.85 1.003.258.28.396.58.396.917 0 .76-.691 1.471-2.155 1.471z"/></svg>`,
  },
  {
    name: "Facebook / Instagram",
    cls: "icon_meta",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="url(#meta-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  },
  {
    name: "VK",
    cls: "icon_vk",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.440 0 .61.203.78.677.847 2.457 2.27 4.614 2.863 4.614.220 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.745c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.220 0 .407-.136.813-.542 1.27-1.422 2.17-3.607 2.17-3.607.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.220 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/></svg>`,
  },
  {
    name: "Yandex Music",
    cls: "icon_yandex",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M13.535 22H10.38V9.19L5.6 22H2l6.31-16.69C9.32 2.77 10.88 2 12.89 2c3.17 0 5.11 2 5.11 5.22 0 3-1.57 4.8-4.47 5.47z"/></svg>`,
  },
  {
    name: "Qobuz",
    cls: "icon_qobuz",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#4A90D9" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 2a4 4 0 110 8 4 4 0 010-8z"/></svg>`,
  },
  {
    name: "Boomplay",
    cls: "icon_boomplay",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#FF5722" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16.5v-9l7 4.5-7 4.5z"/></svg>`,
    flag: "🇳🇬",
  },
  {
    name: "Anghami",
    cls: "icon_anghami",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#FF3248" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 6c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm0 2a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
    flag: "🇱🇧",
  },
  {
    name: "Saavn",
    cls: "icon_saavn",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#52C41A" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 6h2v6h-2V6zm-4 2h2v8H9V8zm8 1h2v5h-2V9zm-12 2h2v3H5v-3z"/></svg>`,
    flag: "🇮🇳",
  },
  {
    name: "KKBox",
    cls: "icon_kkbox",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#00B294" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 7h2v4l4-4h2.5l-4.5 4.5 4.5 5.5H16l-4-4.8V17h-2V7z"/></svg>`,
    flag: "🇹🇼",
  },
  {
    name: "Melon Plus",
    cls: "icon_melon",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#00BA38" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 6l1.5 2.5L18 7l-2 3 2 3-1.5-1.5L15 14l-1-4-2 4-1-4-2 4-1.5-1.5L5 14l2-3-2-3 1.5 1.5L8 7l1.5 2.5 2.5-4 2.5 4L16 7z"/></svg>`,
    flag: "🇰🇷",
  },
  {
    name: "NetEase Music",
    cls: "icon_netease",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#C51422" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8a7.2 7.2 0 110 14.4A7.2 7.2 0 0112 4.8zm0 2.4a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 2.4a2.4 2.4 0 110 4.8 2.4 2.4 0 010-4.8z"/></svg>`,
    flag: "🇨🇳",
  },
  {
    name: "Tencent Music",
    cls: "icon_tencent",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#00A3EE" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4 7v10l-8-5 8-5z"/></svg>`,
    flag: "🇨🇳",
  },
  {
    name: "JOOX",
    cls: "icon_joox",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#00C569" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1 6h2v8a2 2 0 01-4 0V8h2v6a.5.5 0 001 0V6zm4 0h2v9a3 3 0 01-3 3v-2a1 1 0 001-1V6z"/></svg>`,
  },
  {
    name: "7digital",
    cls: "icon_7digital",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#E6007E" d="M4 4h10l-5 7h5v9H4v-9h5L4 4z"/></svg>`,
  },
  {
    name: "Sound Exchange",
    cls: "icon_soundex",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#C9A84C" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>`,
  },
  {
    name: "Peloton",
    cls: "icon_peloton",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#FF3232" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm0 2a5 5 0 100 10A5 5 0 0012 7zm0 2a3 3 0 110 6 3 3 0 010-6z"/></svg>`,
  },
  {
    name: "Claro Música",
    cls: "icon_claro",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#DC0032" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7zm-1.5 3v8l6-4-6-4z"/></svg>`,
  },
  {
    name: "MediaNet",
    cls: "icon_medianet",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#0078D7" d="M3 5h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z"/></svg>`,
  },
  {
    name: "AMI Entertainment",
    cls: "icon_ami",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#C9A84C" d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>`,
  },
  {
    name: "Jaxsta",
    cls: "icon_jaxsta",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#AAAACC" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2V8l-3 1.5V7.5L12 6l3 1.5V9l-2-1v8z"/></svg>`,
  },
];

const PlatformChip = ({ platform }: { platform: Platform }) => (
  <div className={styles.platform_chip}>
    <div 
      className={`${styles.chip_icon} ${styles[platform.cls]}`} 
      dangerouslySetInnerHTML={{ __html: platform.icon }}
    />
    <div className={styles.chip_info}>
      <div className={styles.chip_name}>{platform.name}</div>
      {platform.flag && <div className={styles.chip_flag}>{platform.flag}</div>}
    </div>
  </div>
);


const Plataformas = () => {
  const mid = Math.ceil(platforms.length / 2);
  const row1 = platforms.slice(0, mid);
  const row2 = platforms.slice(mid);

  return (
    <div>
      <div className={styles.section_eyebrow}>Nobody Knows · 2026</div>
      <h2 className={styles.section_title}>Ouça em todas as <em>plataformas</em></h2>
      <div className={styles.section_sub}>Disponível em 29 serviços de streaming · Todo o mundo</div>

      <div className={styles.platforms_card}>
        <div className={styles.card_topline}></div>

        <div className={styles.card_header}>
          <div className={styles.card_header_left}>
            <div className={styles.card_dot}></div>
            <div className={styles.card_header_title}>Disponível agora em</div>
          </div>
          <div className={styles.card_count}>29 plataformas</div>
        </div>

        <div className={styles.ticker_wrap} style={{ borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
          <div className={styles.ticker_track}>
            {row1.map((p, i) => <PlatformChip key={`r1-${i}`} platform={p} />)}
            {row1.map((p, i) => <PlatformChip key={`r1-dup-${i}`} platform={p} />)}
          </div>
        </div>

        <div className={styles.ticker_wrap}>
          <div className={styles.ticker_track} style={{ animationDuration: "70s", animationDirection: "reverse" }}>
            {row2.map((p, i) => <PlatformChip key={`r2-${i}`} platform={p} />)}
            {row2.map((p, i) => <PlatformChip key={`r2-dup-${i}`} platform={p} />)}
          </div>
        </div>

        <div className={styles.card_footer}>
          <div className={styles.footer_text}>Vini Amaral · Nobody Knows · 2025</div>
          <div className={styles.footer_badge}><div className={styles.footer_dot}></div>Streaming worldwide</div>
        </div>
      </div>

      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient id="meta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#833AB4" }} />
            <stop offset="50%" style={{ stopColor: "#FD1D1D" }} />
            <stop offset="100%" style={{ stopColor: "#FCB045" }} />
          </linearGradient>
          <linearGradient id="tiktok-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#69C9D0" }} />
            <stop offset="100%" style={{ stopColor: "#EE1D52" }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Plataformas;

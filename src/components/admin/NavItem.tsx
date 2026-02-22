import styles from './NavItem.module.css';

type Panel = 'dashboard' | 'site' | 'musicas' | 'letras' | 'midia' | 'membros' | 'loja' | 'pedidos' | 'email' | 'redes' | 'config' | 'agentes';

interface NavItemProps {
  panel: Panel;
  icon: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  activePanel: Panel;
  setActivePanel: (panel: Panel) => void;
}

const NavItem = ({ panel, icon, label, badge, badgeColor, activePanel, setActivePanel }: NavItemProps) => (
  <button className={`${styles.navItem} ${activePanel === panel ? styles.active : ''}`} onClick={() => setActivePanel(panel)}>
    <span className={styles.navIcon}>{icon}</span> {label}
    {badge && <span className={`${styles.navBadge} ${badgeColor ? styles[badgeColor] : ''}`}>{badge}</span>}
  </button>
);

export default NavItem;

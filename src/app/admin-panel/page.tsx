"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavItem from '@/components/admin/NavItem';
import './admin-panel.css';

// TODO: Move Google Fonts link to layout.tsx
// <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Oswald:wght@200;300;400;500&display=swap" rel="stylesheet" />

type Panel = 'dashboard' | 'site' | 'musicas' | 'letras' | 'midia' | 'membros' | 'loja' | 'pedidos' | 'email' | 'redes' | 'config' | 'agentes';

const AdminPanelPage = () => {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState<Panel>('dashboard');
  const [time, setTime] = useState('--:--:--');
  const [toast, setToast] = useState({ show: false, message: '' });

  // Dashboard chart data
  const songs = [
      { label: 'Ghost', val: 88, color: 'gold' },
      { label: 'Paper', val: 62, color: '' },
      { label: 'Dance', val: 74, color: 'blue' },
      { label: 'Photo', val: 55, color: '' },
      { label: 'Nov', val: 81, color: 'green' },
      { label: 'Road', val: 49, color: '' },
  ];
  
  // Site panel states
  const [heroSubtitle, setHeroSubtitle] = useState('Músicas que falam o que você sente mas nunca soube dizer.');
  const [artistQuote, setArtistQuote] = useState('"A música certa chega antes das palavras. Ela já sabe o que você ainda não consegue dizer.');
  const [bioText, setBioText] = useState('Vini Amaral é um cantor brasileiro que nasceu ouvindo o rock melódico dos anos 80 — aquela era em que as músicas tinham alma.');
  const [soundcloudUrl, setSoundcloudUrl] = useState('https://soundcloud.com/vini-amaral-748220502');
  const [isSitePublic, setIsSitePublic] = useState(true);
  const [isFanClubActive, setIsFanClubActive] = useState(true);
  const [isStoreActive, setIsStoreActive] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    document.title = "Painel Admin · Vini Amaral";

    const clockInterval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR'));
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePanel('dashboard');
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(clockInterval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
  };

  return (
    <>
      <div className="app">
        <header className="topbar">
          <div className="topbar-logo">VA</div>
          <div className="topbar-sep"></div>
          <div className="topbar-title">Painel de Administração</div>
          <div className="topbar-right">
            <div className="topbar-status"><div className="status-dot"></div>Site Online</div>
            <div className="topbar-time">{time}</div>
            <div className="topbar-user">AGENTE</div>
            <button className="btn-logout" onClick={() => router.push('/admin-login')}>Sair</button>
          </div>
        </header>

        <aside className="sidebar">
            <div className="nav-section">
                <span className="nav-section-label">Principal</span>
                <NavItem panel="dashboard" icon="◈" label="Dashboard" activePanel={activePanel} setActivePanel={setActivePanel} />
                <NavItem panel="site" icon="◉" label="Site Principal" activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>
            <div className="nav-divider"></div>
            <div className="nav-section">
                <span className="nav-section-label">Conteúdo</span>
                <NavItem panel="musicas" icon="♪" label="Músicas" activePanel={activePanel} setActivePanel={setActivePanel} />
                <NavItem panel="letras" icon="≡" label="Letras" activePanel={activePanel} setActivePanel={setActivePanel} />
                <NavItem panel="midia" icon="◎" label="Mídia & Fotos" activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>
            <div className="nav-divider"></div>
            <div className="nav-section">
                <span className="nav-section-label">Fan Club</span>
                <NavItem panel="membros" icon="◷" label="Membros" badge="247" activePanel={activePanel} setActivePanel={setActivePanel} />
                <NavItem panel="loja" icon="◈" label="Loja & Produtos" activePanel={activePanel} setActivePanel={setActivePanel} />
                <NavItem panel="pedidos" icon="◻" label="Pedidos" badge="3" badgeColor="red" activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>
            <div className="nav-divider"></div>
            <div className="nav-section">
                <span className="nav-section-label">Marketing</span>
                <NavItem panel="email" icon="◌" label="E-mail Marketing" activePanel={activePanel} setActivePanel={setActivePanel} />
                <NavItem panel="redes" icon="◈" label="Redes Sociais" activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>
            <div className="nav-divider"></div>
            <div className="nav-section">
                <span className="nav-section-label">Sistema</span>
                <NavItem panel="config" icon="◎" label="Configurações" activePanel={activePanel} setActivePanel={setActivePanel} />
                <NavItem panel="agentes" icon="◷" label="Agentes & Acesso" activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>
        </aside>

        <main className="main">
          <div className={`panel ${activePanel === 'dashboard' ? 'active' : ''}`} id="panel-dashboard">
            <div className="panel-header">
              <div>
                <h1 className="panel-title"><em>Dashboard</em></h1>
                <div className="panel-sub">Visão geral · Nobody Knows · 2025</div>
              </div>
              <button className="btn-action" onClick={() => showToast('Relatório exportado!')}>Exportar Relatório</button>
            </div>
            <div className="stats-grid">
              <div className="stat-card gold">
                <div className="stat-label">♪ Membros Fan Club</div>
                <div className="stat-num">247</div>
                <div className="stat-delta">↑ +18 essa semana</div>
              </div>
              <div className="stat-card green">
                <div className="stat-label">◈ Vendas Totais</div>
                <div className="stat-num">R$4.280</div>
                <div className="stat-delta">↑ +23% este mês</div>
              </div>
              <div className="stat-card blue">
                <div className="stat-label">◉ Visitas ao Site</div>
                <div className="stat-num">3.841</div>
                <div className="stat-delta">↑ +12% esta semana</div>
              </div>
              <div className="stat-card red">
                <div className="stat-label">◻ Pedidos Pendentes</div>
                <div className="stat-num">3</div>
                <div className="stat-delta down">↓ Requer atenção</div>
              </div>
            </div>
            <div className="grid-2">
                <div className="card">
                    <div className="card-title">Plays por Música — SoundCloud</div>
                    <div className="chart-bars">
                        {songs.map(song => (
                             <div className="bar-wrap" key={song.label}>
                                <div className={`bar ${song.color}`} style={{height: `${song.val}%`}}></div>
                                <div className="bar-label">{song.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Atividade Recente</div>
                    {/* Activity items here - static for now */}
                    <div className="activity-item">
                        <div className="activity-icon ai-gold">✦</div>
                        <div className="activity-info">
                            <div className="activity-text">Novo membro — Maria S. · São Paulo</div>
                            <div className="activity-time">Há 12 minutos</div>
                        </div>
                    </div>
                    <div className="activity-item">
            <div className="activity-icon ai-green">◈</div>
            <div className="activity-info">
              <div className="activity-text">Venda — CD Deluxe Nobody Knows</div>
              <div className="activity-time">Há 34 minutos</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon ai-blue">◉</div>
            <div className="activity-info">
              <div className="activity-text">1.200 plays — Somebody Like A Ghost</div>
              <div className="activity-time">Há 1 hora</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon ai-gold">✦</div>
            <div className="activity-info">
              <div className="activity-text">Novo membro — João P. · Porto Alegre</div>
              <div className="activity-time">Há 2 horas</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon ai-green">◈</div>
            <div className="activity-info">
              <div className="activity-text">Venda — LP Vinil Gold · Pré-venda</div>
              <div className="activity-time">Há 3 horas</div>
            </div>
          </div>
                </div>
            </div>
          </div>

          <div className={`panel ${activePanel === 'site' ? 'active' : ''}`} id="panel-site">
             <div className="panel-header">
                <div><h1 className="panel-title">Site <em>Principal</em></h1><div className="panel-sub">Editar conteúdo do site viniamarel.com</div></div>
                <button className="btn-action" onClick={() => showToast('Alterações salvas e publicadas!')}>Publicar Alterações</button>
            </div>
            <div className="grid-2">
                <div className="card">
                    <div className="card-title">Seção Hero — Texto Principal</div>
                    <div className="form-group" style={{marginBottom:'16px'}}>
                        <label className="form-label">Subtítulo do Hero</label>
                        <input className="form-input" value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} />
                    </div>
                    <div className="form-group" style={{marginBottom:'16px'}}>
                        <label className="form-label">Citação do Artista</label>
                        <textarea className="form-textarea" style={{minHeight:'70px'}} value={artistQuote} onChange={e => setArtistQuote(e.target.value)}></textarea>
                    </div>
                    <button className="btn-action btn-secondary" onClick={() => showToast('Hero atualizado!')}>Salvar Hero</button>
                </div>
                <div className="card">
                    <div className="card-title">Seção Sobre o Artista</div>
                    <div className="form-group" style={{marginBottom:'16px'}}>
                        <label className="form-label">Texto Bio (Parágrafo 1)</label>
                        <textarea className="form-textarea" style={{minHeight:'90px'}} value={bioText} onChange={e => setBioText(e.target.value)}></textarea>
                    </div>
                    <button className="btn-action btn-secondary" onClick={() => showToast('Bio atualizada!')}>Salvar Bio</button>
                </div>
                <div className="card">
                    <div className="card-title">Link SoundCloud</div>
                    <div className="form-group" style={{marginBottom:'16px'}}>
                        <label className="form-label">URL do Perfil</label>
                        <input className="form-input" value={soundcloudUrl} onChange={e => setSoundcloudUrl(e.target.value)} />
                    </div>
                    <button className="btn-action btn-secondary" onClick={() => showToast('Link atualizado!')}>Salvar Link</button>
                </div>
                <div className="card">
                    <div className="card-title">Status do Site</div>
                    <div className="toggle-wrap">
                        <div className={`toggle ${isSitePublic ? 'on' : ''}`} onClick={() => setIsSitePublic(!isSitePublic)}></div>
                        <span className={`toggle-label ${isSitePublic ? 'on' : ''}`}>Site Público</span>
                    </div>
                    <div className="toggle-wrap">
                        <div className={`toggle ${isFanClubActive ? 'on' : ''}`} onClick={() => setIsFanClubActive(!isFanClubActive)}></div>
                        <span className={`toggle-label ${isFanClubActive ? 'on' : ''}`}>Fan Club Ativo</span>
                    </div>
                    <div className="toggle-wrap">
                        <div className={`toggle ${isStoreActive ? 'on' : ''}`} onClick={() => setIsStoreActive(!isStoreActive)}></div>
                        <span className={`toggle-label ${isStoreActive ? 'on' : ''}`}>Loja Ativa</span>
                    </div>
                     <div className="toggle-wrap">
                        <div className={`toggle ${isMaintenanceMode ? 'on' : ''}`} onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}></div>
                        <span className={`toggle-label ${isMaintenanceMode ? 'on' : ''}`}>Modo Manutenção</span>
                    </div>
                </div>
            </div>
          </div>

          <div className={`panel ${activePanel === 'musicas' ? 'active' : ''}`} id="panel-musicas">
             <div className="panel-header">
                <div><h1 className="panel-title"><em>Músicas</em></h1><div className="panel-sub">Álbum Nobody Knows · 6 faixas</div></div>
                <button className="btn-action" onClick={() => showToast('Nova música criada!')}>+ Nova Música</button>
            </div>
            <div className="card">
                <div className="card-title">Faixas do Álbum</div>
                <table className="data-table">
                    <thead><tr><th>#</th><th>Título</th><th>Tom</th><th>BPM</th><th>Duração</th><th>Status</th><th>Ações</th></tr></thead>
                    <tbody>
                        {/* Static data for now */}
                        <tr><td className="td-gold">01</td><td className="td-name">Somebody Like A Ghost</td><td>Am</td><td>68</td><td>4:20</td><td><span className="badge badge-active">Publicada</span></td><td><button className="btn-mini" onClick={() => showToast('Editando...')}>Editar</button></td></tr>
                        <tr><td className="td-gold">02</td><td className="td-name">Paper Hearts</td><td>Em</td><td>64</td><td>4:05</td><td><span className="badge badge-active">Publicada</span></td><td><button className="btn-mini" onClick={() => showToast('Editando...')}>Editar</button></td></tr>
                        <tr><td className="td-gold">03</td><td className="td-name">The Last Slow Dance</td><td>Dm</td><td>72</td><td>4:35</td><td><span className="badge badge-active">Publicada</span></td><td><button className="btn-mini" onClick={() => showToast('Editando...')}>Editar</button></td></tr>
                        <tr><td className="td-gold">04</td><td className="td-name">Old Photographs</td><td>C</td><td>60</td><td>4:15</td><td><span className="badge badge-active">Publicada</span></td><td><button className="btn-mini" onClick={() => showToast('Editando...')}>Editar</button></td></tr>
                        <tr><td className="td-gold">05</td><td className="td-name">November Rain (For Her)</td><td>Gm</td><td>66</td><td>5:10</td><td><span className="badge badge-active">Publicada</span></td><td><button className="btn-mini" onClick={() => showToast('Editando...')}>Editar</button></td></tr>
                        <tr><td className="td-gold">06</td><td className="td-name">The Road Back Home</td><td>G</td><td>70</td><td>4:45</td><td><span className="badge badge-active">Publicada</span></td><td><button className="btn-mini" onClick={() => showToast('Editando...')}>Editar</button></td></tr>
                    </tbody>
                </table>
            </div>
          </div>

          {/* Other panels would be defined here... */}

        </main>
      </div>
      <div id="toast" className={toast.show ? 'show' : ''}>
        <span>✦</span><span>{toast.message}</span>
      </div>
    </>
  );
};

export default AdminPanelPage;

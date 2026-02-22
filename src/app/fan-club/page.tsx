'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

// --- TYPE DEFINITIONS ---
type Tab = 'login' | 'register';

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

// --- COMPONENT: RainEffect ---
const RainEffect = () => {
  useEffect(() => {
    const canvas = document.getElementById('rain') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    let drops: Drop[];

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 4 + Math.random() * 6,
        length: 15 + Math.random() * 25,
        opacity: 0.1 + Math.random() * 0.35,
      }));
    };

    let animationFrameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length);
        ctx.strokeStyle = `rgba(150, 180, 220, ${d.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        d.y += d.speed;
        if (d.y > canvas.height) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const handleResize = () => setup();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="rain" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></canvas>;
};

// --- COMPONENT: FanClubPage ---
const FanClubPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('login');
  const [showWelcome, setShowWelcome] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState({ loginEmail: '', loginPass: '', regName: '', regEmail: '', regCity: '', regPass: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setAlert({ show: false, message: '' });
    setShowPassword(false);
  };

  const validateAndProceed = useCallback((action: Tab) => {
    if (action === 'login') {
      if (!formData.loginEmail.includes('@')) return setAlert({ show: true, message: 'Por favor, informe um e-mail válido.' });
      if (!formData.loginPass) return setAlert({ show: true, message: 'Por favor, informe sua senha.' });
    } else {
      if (!formData.regName) return setAlert({ show: true, message: 'Por favor, informe seu nome.' });
      if (!formData.regEmail.includes('@')) return setAlert({ show: true, message: 'E-mail inválido.' });
      if (formData.regPass.length < 6) return setAlert({ show: true, message: 'A senha deve ter pelo menos 6 caracteres.' });
    }
    setAlert({ show: false, message: '' });
    setShowWelcome(true);
  }, [formData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') validateAndProceed(activeTab);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, validateAndProceed]);
  
  return (
    <>
      <RainEffect />
      <div className={styles.page}>
        <div className={styles.artistPanel}>
          <Image src="/fotos/eu-poli.JPG" alt="Vini Amaral" layout="fill" objectFit="cover" objectPosition="center top" />
          <div className={styles.artistOverlay}></div>
          <div className={styles.neonLine}></div>
          <div className={styles.artistContent}>
            <div className={styles.artistBadge}><div className={styles.badgeDot}></div><span className={styles.badgeText}>Fan Club Exclusivo</span></div>
            <h1 className={styles.artistName}>Vini<br /><em>Amaral</em></h1>
            <p className={styles.artistTagline}>&ldquo;Nobody knows o que você carrega.<br />Mas a música sabe.&rdquo;</p>
          </div>
        </div>

        <div className={styles.loginPanel}>
          <div className={styles.loginInner}>
            <div className={styles.loginLogo}><span className={styles.logoSymbol}>✦</span><span className={styles.logoTitle}>Nobody Knows · Fan Club</span></div>
            
            {showWelcome ? (
              <div className={`${styles.welcomeScreen} ${styles.show}`}>
                <div className={styles.welcomeIcon}>🤍</div>
                <h2 className={styles.welcomeTitle}>Bem-vindo ao <em>Fan Club</em></h2>
                <p className={styles.welcomeSub}>Você agora faz parte do círculo mais próximo de Vini Amaral.<br />Acesso exclusivo liberado.</p>
                <button className={styles.btnSubmit} onClick={() => router.push('/fan-club-store')}>✦ &nbsp; Entrar na Loja Exclusiva</button>
              </div>
            ) : (
              <>
                <div className={styles.tabs}>
                  <button className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`} onClick={() => switchTab('login')}>Entrar</button>
                  <button className={`${styles.tab} ${activeTab === 'register' ? styles.active : ''}`} onClick={() => switchTab('register')}>Cadastrar</button>
                </div>

                {alert.show && <div className={`${styles.alert} ${styles.show}`}><span className={styles.alertText}>{alert.message}</span></div>}
                
                <div className={`${styles.formPanel} ${activeTab === 'login' ? styles.active : ''}`}>
                    <div className={styles.formGroup}><label className={styles.formLabel}>E-mail</label><input type="email" id="loginEmail" value={formData.loginEmail} onChange={handleInputChange} className={styles.formInput} placeholder="seu@email.com" /></div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Senha</label>
                        <div className={styles.passWrap}>
                            <input type={showPassword ? 'text' : 'password'} id="loginPass" value={formData.loginPass} onChange={handleInputChange} className={styles.formInput} placeholder="••••••••" />
                            <button className={styles.passToggle} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Ocultar' : 'Ver'}</button>
                        </div>
                    </div>
                    <button className={styles.btnSubmit} onClick={() => validateAndProceed('login')}>✦ &nbsp; Entrar no Fan Club</button>
                </div>

                <div className={`${styles.formPanel} ${activeTab === 'register' ? styles.active : ''}`}>
                    <div className={styles.formGroup}><label className={styles.formLabel}>Nome Completo</label><input type="text" id="regName" value={formData.regName} onChange={handleInputChange} className={styles.formInput} placeholder="Seu nome" /></div>
                    <div className={styles.formGroup}><label className={styles.formLabel}>E-mail</label><input type="email" id="regEmail" value={formData.regEmail} onChange={handleInputChange} className={styles.formInput} placeholder="seu@email.com" /></div>
                    <div className={styles.formGroup}><label className={styles.formLabel}>Cidade</label><input type="text" id="regCity" value={formData.regCity} onChange={handleInputChange} className={styles.formInput} placeholder="Sua cidade" /></div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Senha</label>
                        <div className={styles.passWrap}>
                           <input type={showPassword ? 'text' : 'password'} id="regPass" value={formData.regPass} onChange={handleInputChange} className={styles.formInput} placeholder="Mínimo 6 caracteres" />
                           <button className={styles.passToggle} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Ocultar' : 'Ver'}</button>
                        </div>
                    </div>
                    <button className={styles.btnSubmit} onClick={() => validateAndProceed('register')}>✦ &nbsp; Entrar para o Fan Club</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FanClubPage;

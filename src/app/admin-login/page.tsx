'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
  const router = useRouter();
  const [agentName, setAgentName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded validation
    if ((agentName.toLowerCase() === 'vini' || agentName.toLowerCase() === 'agente') && password === '1234') {
      setError('');
      router.push('/admin-panel');
    } else {
      setError('Credenciais inválidas. Verifique seus dados.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>VA</div>
        <h1 className={styles.title}>Painel de <em>Administração</em></h1>
        <p className={styles.subtitle}>Acesso restrito para Agentes e Administradores</p>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="agentName">Nome do Agente</label>
            <input
              type="text"
              id="agentName"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder='ex: vini'
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha Secreta</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••'
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.loginButton}>Entrar ✦</button>
        </form>
        <p className={styles.footerNote}>Vini Amaral · Plataforma de Artista  esclusiva</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;

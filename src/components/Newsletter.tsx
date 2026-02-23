'use client'
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { saveEmail } from '@/app/actions';
import styles from './Newsletter.module.css';

const initialState = {
  message: '',
  errors: null,
  reset: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={`${styles.submitButton} ${pending ? styles.pending : ''}`} aria-disabled={pending}>
      {pending ? 'Enviando...' : 'Inscrever-se'}
    </button>
  );
}

const Newsletter = () => {
  const [state, formAction] = useFormState(saveEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.reset) {
      formRef.current?.reset();
    }
  }, [state.reset]);

  return (
    <section className={styles.newsletterSection}>
        <div className={styles.contentWrapper}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>Junte-se à <em>Comunidade</em></h2>
                <p className={styles.subtitle}>Seja o primeiro a saber sobre novos lançamentos, shows e bastidores. Sem spam, apenas rock.</p>
            </div>
            <form ref={formRef} action={formAction} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Seu melhor email" 
                        className={styles.input}
                        required 
                    />
                    <SubmitButton />
                </div>
                <div className={styles.messageArea} aria-live="polite">
                    {state?.errors?.email && 
                        <p className={styles.errorMessage}>{state.errors.email[0]}</p>}
                    {state?.message && !state.errors && 
                        <p className={styles.successMessage}>{state.message}</p>}
                </div>
            </form>
        </div>
    </section>
  );
};

export default Newsletter;

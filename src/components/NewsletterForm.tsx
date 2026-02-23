"use client";

import { useFormState, useFormStatus } from "react-dom";
import { saveEmail } from "@/app/actions";
import styles from "./NewsletterForm.module.css";
import { useEffect, useRef } from "react";

const initialState = {
  message: null,
  errors: null,
  reset: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className={styles.submitButton}>
      {pending ? "Enviando..." : "Quero Receber"}
    </button>
  );
}

export function NewsletterForm() {
  const [state, formAction] = useFormState(saveEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.reset) {
      formRef.current?.reset();
    }
  }, [state.reset]);


  return (
    <div className={styles.newsletterSection}>
      <h3 className={styles.newsletterTitle}>Receba novidades por email</h3>
      <p className={styles.newsletterText}>
        Cadastre-se para receber em primeira mão as últimas notícias, lançamentos e datas de shows.
      </p>
      <form action={formAction} ref={formRef} className={styles.newsletterForm}>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Seu melhor email"
            className={styles.emailInput}
          />
          <SubmitButton />
        </div>
        {state.errors?.email && (
          <p className={styles.errorText}>{state.errors.email[0]}</p>
        )}
        {state.message && !state.errors &&(
          <p className={styles.successText}>{state.message}</p>
        )}
      </form>
    </div>
  );
}

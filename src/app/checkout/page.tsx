'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutStep from '@/components/CheckoutStep';

// --- TYPE DEFINITIONS ---
type PayMethod = 'card' | 'pix' | 'boleto';
type ShippingMethod = { label: string; price: number; days: string };

interface CheckoutState {
  currentPhase: number;
  shipping: ShippingMethod;
  payMethod: PayMethod;
  installment: string;
  subtotal: number;
  discount: number;
  couponApplied: boolean;
  formData: { [key: string]: string };
  errors: { [key: string]: boolean };
  pixProof: File | null;
}

// --- CONSTANTS (BRAZILIAN) ---
const BRL_INITIAL_SUBTOTAL = 49.90;
const BRL_SHIPPING_OPTIONS: ShippingMethod[] = [
  { label: 'Frete Grátis · Fan Club', price: 0, days: '8 a 15 dias úteis · PAC' },
  { label: 'Sedex · Expresso', price: 18.90, days: '3 a 5 dias úteis' },
  { label: 'Motoboy · Capitais', price: 39.90, days: 'Até 24 horas' },
];
const BRL_INITIAL_INSTALLMENT = `1x de R$ ${BRL_INITIAL_SUBTOTAL.toFixed(2).replace('.', ',')}`;

// --- CONSTANTS (INTERNATIONAL) ---
const USD_INITIAL_SUBTOTAL = 9.99;
const USD_SHIPPING_OPTIONS: ShippingMethod[] = [
    { label: 'Free Shipping · Fan Club', price: 0, days: '10-20 business days' },
    { label: 'Express Shipping', price: 25.00, days: '5-7 business days' },
];
const USD_INITIAL_INSTALLMENT = `1x of $${USD_INITIAL_SUBTOTAL.toFixed(2)}`;

const CheckoutPage = () => {
  const router = useRouter();
  const [isBrazilian, setIsBrazilian] = useState(false);

  // --- STATE MANAGEMENT ---
  const [state, setState] = useState<CheckoutState>({
    currentPhase: 1,
    shipping: USD_SHIPPING_OPTIONS[0],
    payMethod: 'card',
    installment: USD_INITIAL_INSTALLMENT,
    subtotal: USD_INITIAL_SUBTOTAL,
    discount: 0,
    couponApplied: false,
    formData: { // Initialize all form fields
        fname: '', lname: '', email: '', phone: '', country: '', state: '', city: '', zip: '',
        address: '', complement: '', number: '', neighborhood: '', cep: '',
        cardnum: '', cardname: '', cardexp: '', cardcvv: '', couponInput: '',
    },
    errors: {},
    pixProof: null,
  });

  const [toast, setToast] = useState({ show: false, message: '' });
  const [orderNumber, setOrderNumber] = useState('');
  
  // Switch to Brazilian Checkout
  const switchToBrazilian = () => {
      setIsBrazilian(true);
      setState(prev => ({
          ...prev,
          shipping: BRL_SHIPPING_OPTIONS[0],
          subtotal: BRL_INITIAL_SUBTOTAL,
          installment: BRL_INITIAL_INSTALLMENT,
          payMethod: 'card', // Reset payment method
      }));
  };

  // Switch to International Checkout
  const switchToInternational = () => {
      setIsBrazilian(false);
      setState(prev => ({
          ...prev,
          shipping: USD_SHIPPING_OPTIONS[0],
          subtotal: USD_INITIAL_SUBTOTAL,
          installment: USD_INITIAL_INSTALLMENT,
          payMethod: 'card',
      }));
  };

  // --- MEMOIZED CALCULATIONS ---
  const total = useMemo(() => {
    return state.subtotal + state.shipping.price - state.discount;
  }, [state.subtotal, state.shipping.price, state.discount]);

  const installmentOptions = useMemo(() => {
    const a = state.subtotal + state.shipping.price - state.discount;
    if (isBrazilian) {
        return [
            { n: 1, label: `1x de R$ ${a.toFixed(2).replace('.', ',')}`, note: 'Sem juros' },
            { n: 2, label: `2x de R$ ${(a / 2).toFixed(2).replace('.', ',')}`, note: 'Sem juros' },
            { n: 3, label: `3x de R$ ${(a / 3).toFixed(2).replace('.', ',')}`, note: 'Sem juros' },
            { n: 6, label: `6x de R$ ${(a * 1.0199 / 6).toFixed(2).replace('.', ',')}`, note: `Total R$ ${(a*1.0199).toFixed(2)}` },
            { n: 12, label: `12x de R$ ${(a * 1.0499 / 12).toFixed(2).replace('.', ',')}`, note: `Total R$ ${(a*1.0499).toFixed(2)}` },
        ];
    } else {
        return [
            { n: 1, label: `1x of $${a.toFixed(2)}`, note: 'Interest-free' },
            { n: 2, label: `2x of $${(a / 2).toFixed(2)}`, note: 'Interest-free' },
            { n: 3, label: `3x of $${(a / 3).toFixed(2)}`, note: 'Interest-free' },
        ];
    }
  }, [state.subtotal, state.shipping.price, state.discount, isBrazilian]);

  // --- HANDLERS & LOGIC ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let maskedValue = value;

    if (isBrazilian) {
        if (id === 'phone') maskedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 15);
        if (id === 'cep') maskedValue = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9);
    }
    if (id === 'cardnum') maskedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
    if (id === 'cardexp') maskedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1 / $2').substring(0, 7);
    if (id === 'cardname') maskedValue = value.toUpperCase();

    setState(prev => ({ ...prev, formData: { ...prev.formData, [id]: maskedValue } }));
  };

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3200);
  }, []);

  const goToStep = (step: number) => {
    if (step > state.currentPhase + 1 && step !== 4) return;
    setState(prev => ({ ...prev, currentPhase: step }));
    window.scrollTo(0, 0);
  };

  const applyCoupon = useCallback((code: string) => {
    if (state.couponApplied) {
      showToast(isBrazilian ? 'Cupom já aplicado!' : 'Coupon already applied!');
      return;
    }
    const upperCode = code.toUpperCase();
    if (upperCode === 'FANCLUB10' || upperCode === 'NOBODY10') {
      setState(prev => ({
        ...prev,
        discount: prev.subtotal * 0.1,
        couponApplied: true,
      }));
      showToast(isBrazilian ? '✓ Cupom aplicado! 10% de desconto.' : '✓ Coupon applied! 10% off.');
    } else {
      showToast(isBrazilian ? 'Cupom inválido. Tente FANCLUB10' : 'Invalid coupon. Try FANCLUB10');
    }
  }, [state.couponApplied, showToast, isBrazilian]);

  const fetchCEP = useCallback(async () => {
    if (!isBrazilian) return;
    const cep = state.formData.cep?.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setState(prev => ({ ...prev, formData: {
            ...prev.formData, 
            address: data.logradouro || '', neighborhood: data.bairro || '',
            city: data.localidade || '', state: data.uf || '',
          }}));
        }
      } catch (error) { console.error("Failed to fetch CEP", error); }
    }
  }, [state.formData.cep, isBrazilian]);

  const validateAndProceed = (from: number) => {
      const t = isBrazilian ? { name: 'Informe seu nome', email: 'E-mail inválido', address: 'Informe seu endereço', cardnum: 'Número do cartão inválido', cardname: 'Informe o nome no cartão', cardexp: 'Validade inválida', cardcvv: 'CVV inválido', country: 'Informe o país' } : { name: 'Enter your name', email: 'Invalid email', address: 'Enter your address', cardnum: 'Invalid card number', cardname: 'Enter the name on the card', cardexp: 'Invalid expiration date', cardcvv: 'Invalid CVV', country: 'Enter your country' };
      if (from === 1) {
        if (!state.formData.fname) return showToast(t.name);
        if (!state.formData.email || !state.formData.email.includes('@')) return showToast(t.email);
        if (!isBrazilian && !state.formData.country) return showToast(t.country);
        if (!state.formData.address) return showToast(t.address);
      }
      if (from === 2 && state.payMethod === 'card') {
        if (!state.formData.cardnum || state.formData.cardnum.replace(/\s/g, '').length < 13) return showToast(t.cardnum);
        if (!state.formData.cardname) return showToast(t.cardname);
        if (!state.formData.cardexp || state.formData.cardexp.length < 7) return showToast(t.cardexp);
        if (!state.formData.cardcvv || state.formData.cardcvv.length < 3) return showToast(t.cardcvv);
    }
    goToStep(from + 1);
  };

  const confirmOrder = () => {
    const newOrderNumber = '#' + String(Math.floor(Math.random() * 9000) + 1000);
    setOrderNumber(newOrderNumber);
    setTimeout(() => goToStep(4), 2000);
  };

  // --- RENDER ---
  return (
    <>
      <header className="checkout-header">
        <a onClick={() => router.back()} className="header-back" style={{cursor: 'pointer'}}>← {isBrazilian ? 'Voltar' : 'Back'}</a>
        <div className="header-logo">Vini Amaral</div>
        <div className="header-secure"><span className="lock-icon">🔒</span>{isBrazilian ? 'Checkout Seguro' : 'Secure Checkout'}</div>
      </header>

      <div className="checkout-layout">
        <div className="checkout-left">
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', gap: '10px'}}>
                {!isBrazilian && <button onClick={switchToBrazilian} className="btn-back" style={{fontSize: '0.6rem', padding: '8px 12px'}}>Sou Brasileiro</button>}
                {isBrazilian && <button onClick={switchToInternational} className="btn-back" style={{fontSize: '0.6rem', padding: '8px 12px'}}>Switch to International</button>}
            </div>

          <div className="steps">
            <CheckoutStep num={1} label={isBrazilian ? "Entrega" : "Delivery"} active={state.currentPhase === 1} done={state.currentPhase > 1} onClick={() => goToStep(1)} />
            <div className="step-line"><div className="step-line-fill" style={{width: state.currentPhase > 1 ? '100%' : '0%'}}></div></div>
            <CheckoutStep num={2} label={isBrazilian ? "Pagamento" : "Payment"} active={state.currentPhase === 2} done={state.currentPhase > 2} onClick={() => goToStep(2)} />
            <div className="step-line"><div className="step-line-fill" style={{width: state.currentPhase > 2 ? '100%' : '0%'}}></div></div>
            <CheckoutStep num={3} label={isBrazilian ? "Revisão" : "Review"} active={state.currentPhase === 3} done={state.currentPhase > 3} />
          </div>
          
          {state.currentPhase === 1 && (
            <div className="phase active">
                <h1 className="phase-title">{isBrazilian ? <>Endereço de <em>Entrega</em></> : <>Shipping <em>Address</em></>}</h1>
                <div className="phase-sub">{isBrazilian ? 'Fase 1 de 3 · Onde enviamos seu pedido' : 'Step 1 of 3 · Where we ship your order'}</div>
                
                <div className="form-row">
                    <div className="form-group"><label className="form-label">{isBrazilian ? 'Nome' : 'First Name'}</label><input type="text" className="form-input" id="fname" placeholder={isBrazilian ? 'Seu nome' : 'Your first name'} value={state.formData.fname} onChange={handleInputChange}/></div>
                    <div className="form-group"><label className="form-label">{isBrazilian ? 'Sobrenome' : 'Last Name'}</label><input type="text" className="form-input" id="lname" placeholder={isBrazilian ? 'Sobrenome' : 'Your last name'} value={state.formData.lname} onChange={handleInputChange}/></div>
                </div>
                <div className="form-group"><label className="form-label">E-mail</label><input type="email" className="form-input" id="email" placeholder="your@email.com" value={state.formData.email} onChange={handleInputChange}/><div className="field-note">{isBrazilian ? 'Confirmação do pedido será enviada aqui' : 'Order confirmation will be sent here'}</div></div>
                <div className="form-group"><label className="form-label">{isBrazilian ? 'Telefone' : 'Phone'}</label><input type="tel" className="form-input" id="phone" placeholder={isBrazilian ? '(00) 00000-0000' : 'Your phone number'} value={state.formData.phone} onChange={handleInputChange}/></div>
                
                {isBrazilian ? (
                    <>
                        <div className="form-row">
                            <div className="form-group"><label className="form-label">CEP</label><input type="text" className="form-input" id="cep" placeholder="00000-000" value={state.formData.cep} onChange={handleInputChange} onBlur={fetchCEP}/></div>
                            <div className="form-group"><label className="form-label">Estado</label><select className="form-select" id="state" value={state.formData.state} onChange={handleInputChange}><option value="">Selecione</option><option>AC</option><option>AL</option><option>AP</option><option>AM</option><option>BA</option><option>CE</option><option>DF</option><option>ES</option><option>GO</option><option>MA</option><option>MT</option><option>MS</option><option>MG</option><option>PA</option><option>PB</option><option>PR</option><option>PE</option><option>PI</option><option>RJ</option><option>RN</option><option>RS</option><option>RO</option><option>RR</option><option>SC</option><option>SP</option><option>SE</option><option>TO</option></select></div>
                        </div>
                        <div className="form-group"><label className="form-label">Endereço</label><input type="text" className="form-input" id="address" placeholder="Rua, Avenida..." value={state.formData.address} onChange={handleInputChange}/></div>
                        <div className="form-row three">
                            <div className="form-group"><label className="form-label">Complemento</label><input type="text" className="form-input" id="complement" placeholder="Apto, Sala..." value={state.formData.complement} onChange={handleInputChange}/></div>
                            <div className="form-group"><label className="form-label">Número</label><input type="text" className="form-input" id="number" placeholder="Nº" value={state.formData.number} onChange={handleInputChange}/></div>
                            <div className="form-group"><label className="form-label">Bairro</label><input type="text" className="form-input" id="neighborhood" placeholder="Bairro" value={state.formData.neighborhood} onChange={handleInputChange}/></div>
                        </div>
                        <div className="form-group"><label className="form-label">Cidade</label><input type="text" className="form-input" id="city" placeholder="Sua cidade" value={state.formData.city} onChange={handleInputChange}/></div>
                    </> 
                ) : (
                    <>
                        <div className="form-group"><label className="form-label">Country</label><input type="text" className="form-input" id="country" placeholder="Your Country" value={state.formData.country} onChange={handleInputChange}/></div>
                        <div className="form-group"><label className="form-label">Address</label><input type="text" className="form-input" id="address" placeholder="Street Address" value={state.formData.address} onChange={handleInputChange}/></div>
                        <div className="form-row">
                           <div className="form-group"><label className="form-label">City</label><input type="text" className="form-input" id="city" placeholder="Your City" value={state.formData.city} onChange={handleInputChange}/></div>
                           <div className="form-group"><label className="form-label">State/Province</label><input type="text" className="form-input" id="state" placeholder="State / Province" value={state.formData.state} onChange={handleInputChange}/></div>
                           <div className="form-group"><label className="form-label">ZIP/Postal Code</label><input type="text" className="form-input" id="zip" placeholder="ZIP / Postal Code" value={state.formData.zip} onChange={handleInputChange}/></div>
                        </div>
                   </>
                )}
                
                <div style={{margin: '24px 0 8px'}}><label className="form-label">{isBrazilian ? 'Modalidade de Envio' : 'Shipping Method'}</label></div>
                <div className="shipping-opts">
                  {(isBrazilian ? BRL_SHIPPING_OPTIONS : USD_SHIPPING_OPTIONS).map(opt => (
                    <div key={opt.label} className={`shipping-opt ${state.shipping.label === opt.label ? 'selected' : ''}`} onClick={() => setState(prev => ({...prev, shipping: opt}))}>
                      <div className="radio-custom"><div className="radio-dot"></div></div>
                      <div className="shipping-info">
                          <div className="shipping-name">{opt.label}</div>
                          <div className="shipping-days">{opt.days}</div>
                      </div>
                      <div className={opt.price > 0 ? "shipping-price" : "shipping-free"}>{opt.price > 0 ? (isBrazilian ? `R$ ${opt.price.toFixed(2).replace('.', ',')}` : `$${opt.price.toFixed(2)}`) : (isBrazilian ? 'GRÁTIS' : 'FREE')}</div>
                    </div>
                  ))}
                </div>

                <div className="nav-btns">
                    <button className="btn-next" onClick={() => validateAndProceed(1)}>{isBrazilian ? 'Continuar para Pagamento →' : 'Continue to Payment →'}</button>
                </div>
            </div>
          )}

          {state.currentPhase === 2 && (
            <div className="phase active">
                <h1 className="phase-title">{isBrazilian ? <>Forma de <em>Pagamento</em></> : <>Payment <em>Method</em></>}</h1>
                <div className="phase-sub">{isBrazilian ? 'Fase 2 de 3 · Seus dados estão protegidos' : 'Step 2 of 3 · Your data is protected'}</div>
                <div className="secure-badge"><span>🔒</span><span className="secure-badge-text">{isBrazilian ? 'Pagamento processado com segurança via Stripe' : 'Payment processed securely via Stripe'} · SSL 256-bit Encryption</span></div>
                
                <div className="pay-methods">
                     <div className={`pay-method ${state.payMethod === 'card' ? 'active' : ''}`} onClick={() => setState(prev => ({...prev, payMethod: 'card'}))}><span className="pay-method-icon">💳</span> Card</div>
                    {isBrazilian && <>
                        <div className={`pay-method ${state.payMethod === 'pix' ? 'active' : ''}`} onClick={() => setState(prev => ({...prev, payMethod: 'pix'}))}><span className="pay-method-icon">⚡</span> PIX</div>
                        <div className={`pay-method ${state.payMethod === 'boleto' ? 'active' : ''}`} onClick={() => setState(prev => ({...prev, payMethod: 'boleto'}))}><span className="pay-method-icon">🏦</span> Boleto</div>
                    </>}
                </div>

                {state.payMethod === 'card' && (
                  <div id="pay-card">
                    <div className="form-group"><label className="form-label">{isBrazilian ? 'Número do Cartão' : 'Card Number'}</label><div className="card-field-wrap"><input type="text" className="form-input" id="cardnum" placeholder="0000 0000 0000 0000" value={state.formData.cardnum} onChange={handleInputChange} maxLength={19}/><div className="card-icons"><span className="card-brand brand-visa">VISA</span><span className="card-brand brand-mc">MC</span></div></div></div>
                    <div className="form-group"><label className="form-label">{isBrazilian ? 'Nome no Cartão' : 'Name on Card'}</label><input type="text" className="form-input" id="cardname" placeholder={isBrazilian ? 'Como está escrito no cartão' : 'As it appears on the card'} value={state.formData.cardname} onChange={handleInputChange} style={{textTransform:'uppercase'}}/></div>
                    <div className="form-row">
                      <div className="form-group"><label className="form-label">{isBrazilian ? 'Validade' : 'Expiration'}</label><input type="text" className="form-input" id="cardexp" placeholder="MM / YY" value={state.formData.cardexp} onChange={handleInputChange} maxLength={7}/></div>
                      <div className="form-group"><label className="form-label">CVV</label><input type="text" className="form-input" id="cardcvv" placeholder="000" value={state.formData.cardcvv} onChange={handleInputChange} maxLength={4}/><div className="field-note">{isBrazilian ? '3 dígitos no verso · 4 no Amex' : '3 digits on back · 4 on Amex'}</div></div>
                    </div>
                    <label className="form-label" style={{ marginBottom: '10px' }}>{isBrazilian ? 'Parcelamento' : 'Installments'}</label>
                    <div className="installments">
                      {installmentOptions.map(opt => (
                          <div key={opt.n} className={`installment-opt ${state.installment === opt.label ? 'selected' : ''}`} onClick={() => setState(prev => ({...prev, installment: opt.label}))}>
                              <div className="inst-radio"><div className="inst-dot"></div></div>
                              <div className="inst-label">{opt.label}</div>
                              <div className="inst-total">{opt.note}</div>
                          </div>
                      ))}
                    </div>
                  </div>
                )}
                {isBrazilian && state.payMethod === 'pix' && (
                  <div className="pix-box">
                    <div style={{ fontWeight: 200, fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--gray2)', marginBottom: '16px' }}>ESCANEIE O QR CODE</div>
                    <div className="pix-qr"><div className="pix-qr-inner"></div></div>
                    <div style={{ fontWeight: 200, fontSize: '0.6rem', letterSpacing: '2px', color: 'var(--gray2)', margin: '16px 0 8px' }}>OU USE A CHAVE PIX</div>
                    <div className="pix-key">vini@viniamarel.com</div><br />
                    <button className="pix-copy" onClick={() => {navigator.clipboard.writeText('vini@viniamarel.com'); showToast('Chave PIX copiada!');}}>Copiar Chave PIX</button>
                    <div style={{ marginTop: '24px' }}>
                        <label className="form-label">Anexar Comprovante (Opcional)</label>
                        <input type="file" onChange={(e) => setState(prev => ({...prev, pixProof: e.target.files ? e.target.files[0] : null}))} className="form-input" />
                        {state.pixProof && <div className="field-note">Arquivo: {state.pixProof.name}</div>}
                    </div>
                  </div>
                )}
                 {isBrazilian && state.payMethod === 'boleto' && (
                   <div className="pix-box" style={{textAlign:'left'}}>
                    <div style={{fontSize:'1.5rem',marginBottom:'12px'}}>🏦</div>
                    <div style={{fontWeight:400,fontSize:'0.75rem',letterSpacing:'2px',color:'var(--white)',marginBottom:'8px'}}>Boleto Bancário</div>
                    <div style={{fontWeight:200,fontSize:'0.65rem',letterSpacing:'1px',color:'var(--gray2)',lineHeight:1.8,marginBottom:'16px'}}>
                      · Gerado após confirmação<br/>· Vencimento em 3 dias úteis<br/>· Aprovação em até 2 dias úteis após pagamento
                    </div>
                   </div>
                )}
                <div style={{margin: '24px 0 0px'}}><label className="form-label">{isBrazilian ? 'Cupom de Desconto' : 'Discount Coupon'}</label><div className="coupon-wrap"><input type="text" className="coupon-input" id="couponInput" placeholder="FANCLUB10" value={state.formData.couponInput} onChange={handleInputChange}/><button className="coupon-btn" onClick={() => applyCoupon(state.formData.couponInput)}>{isBrazilian ? 'Aplicar' : 'Apply'}</button></div></div>
                <div className="nav-btns">
                    <button className="btn-back" onClick={() => goToStep(1)}>← {isBrazilian ? 'Voltar' : 'Back'}</button>
                    <button className="btn-next" onClick={() => validateAndProceed(2)}>{isBrazilian ? 'Revisar Pedido →' : 'Review Order →'}</button>
                </div>
            </div>
          )}
          
          {state.currentPhase === 3 && (
             <div className="phase active">
                <h1 className="phase-title">{isBrazilian ? <>Revise seu <em>Pedido</em></> : <>Review your <em>Order</em></>}</h1>
                <div className="phase-sub">{isBrazilian ? 'Fase 3 de 3 · Confirme antes de finalizar' : 'Step 3 of 3 · Confirm before finalizing'}</div>
                <div className="review-section">
                  <div className="review-section-title">{isBrazilian ? 'Endereço de Entrega' : 'Shipping Address'}</div>
                  <div className="review-row"><span className="review-label">{isBrazilian ? 'Nome' : 'Name'}</span><span className="review-value">{state.formData.fname} {state.formData.lname}</span></div>
                  <div className="review-row"><span className="review-label">E-mail</span><span className="review-value">{state.formData.email}</span></div>
                  <div className="review-row"><span className="review-label">{isBrazilian ? 'Endereço' : 'Address'}</span><span className="review-value">{isBrazilian ? `${state.formData.address}, ${state.formData.number} · ${state.formData.city} - ${state.formData.state}` : `${state.formData.address}, ${state.formData.city}, ${state.formData.state}, ${state.formData.country}`}</span></div>
                  <div className="review-row"><span className="review-label">{isBrazilian ? 'Envio' : 'Shipping'}</span><span className="review-value">{state.shipping.label}</span></div>
                  <button className="review-edit" onClick={() => goToStep(1)}>{isBrazilian ? 'Editar' : 'Edit'}</button>
                </div>
                <div className="review-section">
                  <div className="review-section-title">{isBrazilian ? 'Pagamento' : 'Payment'}</div>
                  <div className="review-row"><span className="review-label">{isBrazilian ? 'Método' : 'Method'}</span><span className="review-value">{state.payMethod === 'card' ? (isBrazilian ? '💳 Cartão' : '💳 Card') : state.payMethod === 'pix' ? '⚡ PIX' : '🏦 Boleto'}</span></div>
                  <div className="review-row"><span className="review-label">{isBrazilian ? 'Detalhes' : 'Details'}</span><span className="review-value">{state.payMethod === 'card' ? state.installment : (isBrazilian ? 'Pagamento à vista' : 'One-time payment')}</span></div>
                  <button className="review-edit" onClick={() => goToStep(2)}>{isBrazilian ? 'Editar' : 'Edit'}</button>
                </div>
                <div style={{padding:'16px',background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.12)',marginBottom:'28px', fontSize:'0.6rem',letterSpacing:'2px',lineHeight:1.9,color:'var(--gray2)'}}>{isBrazilian ? 'Ao confirmar você concorda com nossa Política de Privacidade e Termos de Compra.' : 'By confirming you agree to our Privacy Policy and Terms of Purchase.'}</div>
                <div className="nav-btns">
                    <button className="btn-back" onClick={() => goToStep(2)}>← {isBrazilian ? 'Voltar' : 'Back'}</button>
                    <button className="btn-next" id="btnConfirm" onClick={confirmOrder} style={{background:'var(--green)', color:'var(--dark)'}}>✦ &nbsp; {isBrazilian ? 'Confirmar e Pagar' : 'Confirm and Pay'}</button>
                </div>
            </div>
          )}
          
          {state.currentPhase === 4 && (
            <div className="phase active">
                <div className="success-screen">
                  <div className="success-icon">🎉</div>
                  <h1 className="success-title">{isBrazilian ? <>Pedido <em>Confirmado!</em></> : <>Order <em>Confirmed!</em></>}</h1>
                  <p className="success-sub">{isBrazilian ? <>Obrigado por fazer parte do Fan Club de Vini Amaral.<br/>Seu pedido foi recebido e está sendo processado.</> : <>Thank you for being part of the Vini Amaral Fan Club.<br/>Your order has been received and is being processed.</>}</p>
                  <div className="success-order">
                    <div className="success-order-num" id="orderNum">{orderNumber}</div>
                    <div className="success-order-info">{isBrazilian ? 'Confirmação enviada para' : 'Confirmation sent to'} {state.formData.email}</div>
                  </div>
                  <div className="success-next">
                    <button className="btn-next" onClick={() => router.push('/fan-club-store')}>← {isBrazilian ? 'Continuar Comprando' : 'Continue Shopping'}</button>
                    <button className="btn-next" onClick={() => router.push('/')} style={{background:'var(--dark2)',border:'1px solid rgba(201,168,76,0.3)',color:'var(--gold)'}}>{isBrazilian ? 'Ir para o Site ✦' : 'Go to Website ✦'}</button>
                  </div>
                </div>
            </div>
          )}
        </div>

        <div className="checkout-right">
            <div className="summary-title">{isBrazilian ? <>Seu <em>Pedido</em></> : <>Your <em>Order</em></>}</div>
            <div className="summary-item"><div className="item-badge"><div className="item-img">💿</div><div className="item-qty">1</div></div><div className="item-details"><div className="item-name">CD — Nobody Knows</div><div className="item-variant">{isBrazilian ? 'Álbum Completo · Assinado' : 'Full Album · Signed'}</div></div><div className="item-price">{isBrazilian ? `R$ ${BRL_INITIAL_SUBTOTAL.toFixed(2).replace('.', ',')}` : `$${USD_INITIAL_SUBTOTAL.toFixed(2)}`}</div></div>
            <div className="summary-divider"></div>
            <div className="summary-line"><span className="sum-label">Subtotal</span><span className="sum-value">{isBrazilian ? `R$ ${state.subtotal.toFixed(2).replace('.', ',')}` : `$${state.subtotal.toFixed(2)}`}</span></div>
            <div className="summary-line"><span className="sum-label">{isBrazilian ? 'Frete' : 'Shipping'}</span><span className="sum-value green">{state.shipping.price === 0 ? (isBrazilian ? 'GRÁTIS' : 'FREE') : (isBrazilian ? `R$ ${state.shipping.price.toFixed(2).replace('.', ',')}` : `$${state.shipping.price.toFixed(2)}`)}</span></div>
            {state.discount > 0 && <div className="summary-line" id="discountLine"><span className="sum-label">{isBrazilian ? 'Desconto' : 'Discount'}</span><span className="sum-value green">— {isBrazilian ? `R$ ${state.discount.toFixed(2).replace('.', ',')}` : `$${state.discount.toFixed(2)}`}</span></div>}
            <div className="summary-total"><span className="total-label">Total</span><span className="total-value">{isBrazilian ? `R$ ${total.toFixed(2).replace('.', ',')}` : `$${total.toFixed(2)}`}</span></div>
            <div className="summary-divider"></div>
            <div className="summary-badges">
                <div className="trust-badge">🔒 {isBrazilian ? 'Compra Segura' : 'Secure Purchase'}</div>
                <div className="trust-badge">↩ {isBrazilian ? 'Devolução Garantida' : 'Guaranteed Return'}</div>
                <div className="trust-badge">📦 {isBrazilian ? 'Rastreamento Incluso' : 'Tracking Included'}</div>
            </div>
        </div>
      </div>
       <div id="globalToast" style={{position:'fixed',bottom:'24px',left:'50%',transform: toast.show ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(80px)',background:'var(--dark3)',border:'1px solid rgba(201,168,76,0.3)',padding:'14px 24px',fontFamily:'Oswald,sans-serif',fontWeight:300,fontSize:'0.7rem',letterSpacing:'2px',color:'var(--gold)',zIndex:999,transition:'transform 0.3s',whiteSpace:'nowrap'}}>{toast.show && `✦ ${toast.message}`}</div>
    </>
  );
};

export default CheckoutPage;

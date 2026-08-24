import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { createRenoveraLandingUi } from "@renovera/landing-ui";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import BadgeCheck from "lucide-react/dist/esm/icons/badge-check.js";
import Building2 from "lucide-react/dist/esm/icons/building-2.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import ClipboardCheck from "lucide-react/dist/esm/icons/clipboard-check.js";
import Factory from "lucide-react/dist/esm/icons/factory.js";
import FileSearch from "lucide-react/dist/esm/icons/file-search.js";
import Home from "lucide-react/dist/esm/icons/house.js";
import Mail from "lucide-react/dist/esm/icons/mail.js";
import Menu from "lucide-react/dist/esm/icons/menu.js";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";
import PanelsTopLeft from "lucide-react/dist/esm/icons/panels-top-left.js";
import ReceiptText from "lucide-react/dist/esm/icons/receipt-text.js";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check.js";
import UploadCloud from "lucide-react/dist/esm/icons/upload-cloud.js";
import X from "lucide-react/dist/esm/icons/x.js";
import { analyticsEvents, siteConfig } from "./config/siteConfig";
const { FloatingWhatsApp, HeroArtworkFrame, PageProgress, ProductHeader, ScrollToTop, SectionImage, SiteFooter } = createRenoveraLandingUi({ createElement, useEffect, useState });

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Para quem é", href: "#para-quem" },
  { label: "Analisar conta", href: "#analise" }
];

const benefits = [
  {
    icon: PanelsTopLeft,
    title: "Sem instalação",
    text: "Não é necessário realizar obras ou instalar equipamentos fotovoltaicos no imóvel."
  },
  {
    icon: Factory,
    title: "Sem compra do sistema",
    text: "Você não precisa comprar módulos, inversores ou financiar uma usina própria."
  },
  {
    icon: ClipboardCheck,
    title: "Processo acompanhado",
    text: "A Renovera acompanha cadastro, compensação, faturas e eventuais inconsistências."
  },
  {
    icon: ReceiptText,
    title: "Análise individual",
    text: "As condições são avaliadas pela conta, região, distribuidora e consumo."
  }
];

const steps = [
  {
    title: "Envie sua conta",
    text: "Analisamos consumo, região, distribuidora, titularidade e características da unidade."
  },
  {
    title: "Receba as condições",
    text: "Apresentamos funcionamento, prazos, valores e estimativa aplicável ao seu caso."
  },
  {
    title: "Inicie a compensação",
    text: "Após adesão e cadastro, a distribuidora poderá registrar os créditos na unidade participante."
  }
];

const audiences = [
  {
    title: "Empresas",
    icon: Building2,
    text: "Uma alternativa para negócios que desejam reduzir custos sem imobilizar capital em uma instalação própria.",
    benefits: ["sem obra no estabelecimento", "análise de várias unidades", "acompanhamento das faturas", "atendimento especializado"],
    cta: "Analisar conta da empresa",
    event: analyticsEvents.businessAnalysisClick
  },
  {
    title: "Residências",
    icon: Home,
    text: "Para casas, apartamentos e imóveis alugados sem condições ou interesse em instalar um sistema próprio.",
    benefits: ["sem alteração do imóvel", "sem financiamento", "processo simplificado", "acompanhamento da Renovera"],
    cta: "Analisar conta residencial",
    event: analyticsEvents.residentialAnalysisClick
  }
];

const faqItems = [
  {
    question: "Preciso instalar placas?",
    answer: "Não. A usina fica em outro local e a distribuidora registra a compensação na unidade participante."
  },
  {
    question: "Preciso comprar equipamentos?",
    answer: "Não é necessário adquirir módulos, inversores ou uma usina própria para participar."
  },
  {
    question: "Continuarei recebendo a conta da distribuidora?",
    answer: "Sim. O fornecimento continua sendo realizado pela distribuidora e a fatura continuará sendo emitida."
  },
  {
    question: "Existe outra cobrança?",
    answer: "Conforme o modelo contratado, poderá existir uma cobrança separada relacionada à participação na geração compartilhada."
  },
  {
    question: "A economia é garantida?",
    answer: "Não. A estimativa depende de consumo, geração, tarifas, tributos, distribuidora e condições disponíveis."
  },
  {
    question: "Toda conta pode participar?",
    answer: "Não necessariamente. A unidade precisa passar por análise de região, distribuidora, consumo e titularidade."
  }
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  profile: "",
  distributor: "",
  billValue: "",
  unitType: "",
  interest: "",
  consent: false
};

const requiredFields = {
  name: "Informe seu nome.",
  phone: "Informe seu telefone ou WhatsApp.",
  email: "Informe um e-mail válido.",
  city: "Informe sua cidade.",
  state: "Informe o estado.",
  profile: "Selecione o perfil.",
  distributor: "Informe a distribuidora.",
  billValue: "Informe o valor médio da conta.",
  unitType: "Selecione o tipo de unidade.",
  interest: "Selecione o principal interesse."
};

const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

function getAttribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(attributionKeys.flatMap((key) => params.get(key) ? [[key, params.get(key)]] : []));
}

function track(eventName, context = {}) {
  if (typeof window === "undefined") return;
  const payload = { event: eventName, product: "compartilha", ...context, ...getAttribution() };
  window.dispatchEvent(new CustomEvent("renovera:event", { detail: payload }));
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
}

function scrollToAnalysis() {
  document.getElementById("analise")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getWhatsappHref(messageType = "residential", customMessage = "") {
  const message = customMessage || siteConfig.whatsappMessages[messageType] || siteConfig.whatsappMessages.residential;
  if (!siteConfig.whatsapp) return "#analise";
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  const campaign = Object.entries(getAttribution()).map(([key, value]) => `${key}: ${value}`).join(" | ");
  const suffix = campaign ? `\n\nOrigem da visita: ${campaign}` : "";
  return `https://wa.me/${number}?text=${encodeURIComponent(`${message}${suffix}`)}`;
}

function WhatsAppIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.4-8.3Zm-8.4 18.2h-.1c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C1.9 6.4 6.4 2 12 2c2.7 0 5.1 1 7 2.9a9.9 9.9 0 0 1 2.9 7c0 5.5-4.4 9.9-9.8 9.9Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 .9 4.1.8.7-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3-.1-.2-.3-.3-.6-.4Z" /></svg>;
}

function ButtonLink({ children, href = "#analise", variant = "primary", icon: Icon = ArrowRight, eventName, className = "", onClick }) {
  return (
    <a
      className={`btn btn-${variant} ${className}`}
      href={href}
      onClick={(event) => {
        if (eventName) track(eventName);
        if (onClick) onClick(event);
      }}
    >
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", open);
    if (!open) return undefined;
    drawerRef.current?.querySelector("a, button")?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!drawerRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.classList.remove("menu-locked");
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="renovera-product-header site-header">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <nav className="container nav" aria-label="Navegação principal">
        <a className="renovera-product-brand" href={siteConfig.institutionalUrl} aria-label="Ir para a Renovera">
          <img src="./renovera-logo.png" width="178" height="43" alt="Renovera" />
          <span>RENÔ COMPARTILHA</span>
        </a>
        <div className="nav-links" aria-label="Menu principal">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
        <ButtonLink className="nav-cta" href="#analise" variant="gold" icon={FileSearch}>
          Analisar minha conta
        </ButtonLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          ref={toggleRef}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <div className={`mobile-backdrop ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu" id="mobile-menu" ref={drawerRef}>
          <div className="mobile-menu-top">
            <strong>Renô Compartilha</strong>
            <button type="button" aria-label="Fechar menu" onClick={closeMenu}>
              <X aria-hidden="true" />
            </button>
          </div>
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <ButtonLink href="#analise" variant="gold" icon={FileSearch} className="mobile-cta">
            Analisar minha conta
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Energia solar sem instalação no imóvel</p>
          <h1>Economize com energia solar sem instalar placas</h1>
          <p className="lead">
            Envie sua conta e descubra se sua empresa ou residência pode participar da geração solar compartilhada.
          </p>
          <p className="support">
            A energia é gerada em uma usina remota, a distribuidora registra a compensação e a Renovera acompanha o processo.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#analise" eventName={analyticsEvents.heroAnalysisClick} icon={FileSearch}>
              Analisar minha conta
            </ButtonLink>
            <ButtonLink href={getWhatsappHref("residential")} variant="outline" eventName={analyticsEvents.heroWhatsappClick} icon={MessageCircle}>
              Falar pelo WhatsApp
            </ButtonLink>
          </div>
          <p className="microcopy">
            Análise inicial sem compromisso, sujeita à região, à distribuidora, ao perfil de consumo e à disponibilidade.
          </p>
          <ul className="quick-list" aria-label="Benefícios rápidos">
            <li><Check aria-hidden="true" /> sem obra no imóvel</li>
            <li><Check aria-hidden="true" /> sem compra de equipamentos</li>
            <li><Check aria-hidden="true" /> acompanhamento da Renovera</li>
          </ul>
        </div>
        <HeroArtworkFrame className="hero-media" label="Fluxo de energia compartilhada">
          <div className="sharing-flow" aria-label="Exemplo de operação de energia compartilhada">
            <strong>USINA SOLAR</strong>
            <span>Distribuidora</span>
            <div className="sharing-flow__customers">
              <span>Residência<br /><small>Créditos</small></span>
              <span>Empresa<br /><small>Créditos</small></span>
              <span>Comércio<br /><small>Créditos</small></span>
            </div>
            <div className="sharing-flow__facts">
              <span>Créditos alocados</span>
              <span>Economia acompanhada</span>
              <span>Sem instalação no imóvel</span>
            </div>
          </div>
        </HeroArtworkFrame>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    ["sem instalação no imóvel", PanelsTopLeft],
    ["análise individual da conta", FileSearch],
    ["atendimento especializado", ShieldCheck],
    ["acompanhamento mensal", ClipboardCheck]
  ];

  return (
    <section className="trust-bar" aria-label="Pontos de confiança">
      <div className="container trust-grid">
        {items.map(([label, Icon]) => (
          <div className="trust-item" key={label}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Qualifier({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ profile: "", billValue: "", state: "", distributor: "" });
  const resultRef = useRef(null);

  const setValue = (name, value) => {
    setData((current) => ({ ...current, [name]: value }));
    track(analyticsEvents.qualifierStart);
  };

  const canContinue = step === 0 ? data.profile : step === 1 ? data.billValue : data.state.trim();

  const next = () => {
    if (!canContinue) return;
    if (step < 2) {
      setStep((current) => current + 1);
      return;
    }
    onComplete(data, false);
    track(analyticsEvents.qualifierComplete);
    window.setTimeout(() => resultRef.current?.focus(), 50);
  };

  const sendToForm = () => onComplete(data, true);
  const whatsappType = data.profile === "Empresa" ? "business" : "residential";

  return (
    <section id="qualificador" className="section qualifier-section">
      <div className="container qualifier-layout">
        <div className="section-heading left">
          <p className="eyebrow">Qualificador</p>
          <h2>Descubra se sua conta pode ser analisada</h2>
          <p>Responda três passos rápidos. O resultado não é aprovação automática: ele encaminha sua conta para análise individual.</p>
        </div>
        <div className="qualifier-card">
          <div
            className="progress-row"
            role="progressbar"
            aria-label={`Passo ${step + 1} de 3`}
            aria-valuemin="1"
            aria-valuemax="3"
            aria-valuenow={step + 1}
          >
            {[0, 1, 2].map((item) => (
              <span key={item} className={item <= step ? "is-active" : ""} />
            ))}
          </div>

          {step === 0 ? (
            <fieldset>
              <legend>Para quem é a conta?</legend>
              <div className="choice-grid">
                {["Empresa", "Residência"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={data.profile === option ? "choice is-selected" : "choice"}
                    onClick={() => setValue("profile", option)}
                  >
                    {option === "Empresa" ? <Building2 aria-hidden="true" /> : <Home aria-hidden="true" />}
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset>
              <legend>Qual é o valor médio mensal?</legend>
              <div className="range-grid">
                {siteConfig.billRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={data.billValue === range ? "choice is-selected" : "choice"}
                    onClick={() => setValue("billValue", range)}
                  >
                    <span>{range}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset>
              <legend>Em qual região está a unidade?</legend>
              <div className="qualifier-fields">
                <label>
                  Estado
                  <input
                    value={data.state}
                    onChange={(event) => setValue("state", event.target.value.toUpperCase().slice(0, 2))}
                    maxLength="2"
                    autoComplete="address-level1"
                    aria-label="Estado da unidade consumidora"
                  />
                </label>
                <label>
                  Distribuidora, se conhecida
                  <input
                    value={data.distributor}
                    onChange={(event) => setValue("distributor", event.target.value)}
                    autoComplete="organization"
                  />
                </label>
              </div>
            </fieldset>
          ) : null}

          <div className="qualifier-actions">
            <button className="btn btn-outline" type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>
              Voltar
            </button>
            <button className="btn btn-primary" type="button" onClick={next} disabled={!canContinue}>
              {step === 2 ? "Ver resultado" : "Continuar"} <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>

          {data.profile && data.billValue && data.state ? (
            <div className="qualifier-result" tabIndex="-1" ref={resultRef}>
              <h3>Sua conta pode seguir para uma análise individual</h3>
              <p>A elegibilidade depende da distribuidora, do consumo, da região, da titularidade e das condições disponíveis.</p>
              <div className="hero-actions compact">
                <button className="btn btn-gold" type="button" onClick={sendToForm}>
                  Analisar minha conta <FileSearch aria-hidden="true" size={18} />
                </button>
                <ButtonLink href={getWhatsappHref(whatsappType)} variant="outline" icon={MessageCircle} eventName={analyticsEvents.whatsappClick}>
                  Falar pelo WhatsApp
                </ButtonLink>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="beneficios" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Benefícios</p>
          <h2>Energia solar de um jeito mais simples</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="card benefit-card" key={title}>
              <div className="card-icon"><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="como-funciona" className="section section-soft">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Como funciona</p>
          <h2>Como funciona</h2>
        </div>
        <div className="steps">
          {steps.map((item, index) => (
            <article className="step" key={item.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="note">O prazo depende da documentação, da distribuidora e do ciclo de faturamento.</p>
      </div>
    </section>
  );
}

function Audience({ onAudienceClick }) {
  return (
    <section id="para-quem" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Empresas e residências</p>
          <h2>Para quem não quer ou não pode instalar placas</h2>
        </div>
        <div className="audience-grid">
          {audiences.map(({ title, icon: Icon, text, benefits: audienceBenefits, cta, event }) => (
            <article className="card audience-card" key={title}>
              <div className="audience-title">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
              </div>
              <p>{text}</p>
              <ul className="check-list">
                {audienceBenefits.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
              </ul>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  track(event);
                  onAudienceClick(title);
                }}
              >
                {cta} <FileSearch aria-hidden="true" size={18} />
              </button>
            </article>
          ))}
        </div>
        <p className="center-note">Também analisamos condomínios, propriedades rurais e grupos com múltiplas unidades.</p>
      </div>
    </section>
  );
}

function BillSection() {
  return (
    <section id="conta" className="section bill-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Na conta</p>
          <h2>O que muda depois da adesão?</h2>
        </div>
        <div className="bill-grid">
          <article className="card">
            <div className="card-icon"><ReceiptText aria-hidden="true" /></div>
            <h3>Fatura da distribuidora</h3>
            <p>O fornecimento continua sendo realizado pela distribuidora. A conta poderá apresentar a compensação e os demais valores aplicáveis à unidade.</p>
          </article>
          <article className="card">
            <div className="card-icon"><BadgeCheck aria-hidden="true" /></div>
            <h3>Participação na geração compartilhada</h3>
            <p>Conforme as condições contratadas, poderá existir uma cobrança separada relacionada à participação na operação.</p>
          </article>
        </div>
        <p className="warning">Os valores podem variar conforme consumo, geração, tarifas, tributos e regras da distribuidora.</p>
      </div>
    </section>
  );
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function validateForm(values) {
  const errors = {};
  Object.entries(requiredFields).forEach(([field, message]) => {
    if (!String(values[field] ?? "").trim()) errors[field] = message;
  });
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Informe um e-mail válido.";
  if (values.phone && values.phone.replace(/\D/g, "").length < 10) errors.phone = "Informe um telefone com DDD.";
  if (!values.consent) errors.consent = "Você precisa autorizar o uso dos dados para contato e análise.";
  return errors;
}

function AnalysisForm({ values, setValues }) {
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState("editing");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const startedRef = useRef(false);

  const profileOptions = ["Empresa", "Residência", "Condomínio", "Propriedade rural", "Múltiplas unidades", "Outro"];
  const unitOptions = ["Imóvel próprio", "Imóvel alugado", "Apartamento", "Estabelecimento comercial", "Unidade rural", "Condomínio", "Outro"];
  const interestOptions = ["Reduzir custos", "Utilizar energia solar sem placas", "Analisar várias unidades", "Entender o funcionamento", "Comparar com sistema próprio", "Outro"];
  const whatsappType = values.profile === "Empresa" || values.profile === "Múltiplas unidades" ? "business" : "residential";

  const updateValue = (event) => {
    const { name, type, checked, value } = event.target;
    if (!startedRef.current) {
      track(analyticsEvents.formStart);
      startedRef.current = true;
    }
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : name === "phone" ? formatPhone(value) : value
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleReview = (event) => {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setStage("review");
      setStatus("");
    }
  };

  const confirmSubmit = async () => {
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStage("editing");
      return;
    }

    setSubmitting(true);
    setStatus("");
    track(analyticsEvents.formSubmit);

    const leadMessage = [
      "Olá, quero solicitar uma análise para participar da Renô Compartilha.",
      "",
      ...summaryRows.map(([label, value]) => `${label}: ${value}`),
      "",
      "Autorizo o uso destes dados para contato e análise da solicitação."
    ].join("\n");

    if (!siteConfig.formEndpoint) {
      track(analyticsEvents.whatsappClick, { placement: "form_fallback", profile: values.profile });
      window.open(getWhatsappHref(whatsappType, leadMessage), "_blank", "noopener,noreferrer");
      setSubmitting(false);
      setStage("sent");
      setStatus("Seus dados foram organizados e o WhatsApp foi aberto para concluir o envio à equipe Renovera.");
      return;
    }

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error("Falha no envio");
      setStage("sent");
      setStatus("Solicitação enviada. A equipe da Renovera entrará em contato com os próximos passos.");
    } catch {
      setStatus("Não foi possível enviar agora. Seus dados foram mantidos para correção ou tentativa posterior.");
      setStage("review");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (name) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  const errorProps = (name) => ({
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `${name}-error` : undefined
  });

  const summaryRows = useMemo(() => [
    ["Nome", values.name],
    ["Telefone/WhatsApp", values.phone],
    ["E-mail", values.email],
    ["Cidade/UF", `${values.city}/${values.state}`],
    ["Perfil", values.profile],
    ["Distribuidora", values.distributor],
    ["Valor médio", values.billValue],
    ["Tipo de unidade", values.unitType],
    ["Interesse", values.interest]
  ], [values]);

  return (
    <section id="analise" className="section form-section">
      <div className="container form-layout">
        <div className="form-aside">
          <p className="eyebrow">Análise da conta</p>
          <h2>Envie sua conta para análise</h2>
          <p>Preencha as informações principais. A Renovera verificará a região, a distribuidora e o perfil de consumo antes de apresentar os próximos passos.</p>
          <div className="next-steps">
            <h3>Depois do envio</h3>
            <ol>
              <li>conferência dos dados</li>
              <li>análise da região</li>
              <li>avaliação do consumo</li>
              <li>contato da equipe</li>
              <li>apresentação das condições</li>
            </ol>
          </div>
          <div className="contact-box">
            <a href={getWhatsappHref(whatsappType)} onClick={() => track(analyticsEvents.whatsappClick)}>
              <MessageCircle aria-hidden="true" /> WhatsApp Renovera
            </a>
            <a href={`mailto:${siteConfig.email}`} onClick={() => track(analyticsEvents.footerContactClick)}>
              <Mail aria-hidden="true" /> {siteConfig.email}
            </a>
            <span><ShieldCheck aria-hidden="true" /> Análise individual por unidade</span>
          </div>
        </div>

        <div className="form-card">
          {stage === "review" ? (
            <div className="review-panel">
              <h3>Confira os dados antes de enviar</h3>
              <dl>
                {summaryRows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              {status ? <p className="field-error status-error" role="alert">{status}</p> : null}
              <div className="form-actions">
                <button className="btn btn-outline" type="button" onClick={() => setStage("editing")} disabled={submitting}>
                  Corrigir dados
                </button>
                <button className="btn btn-primary" type="button" onClick={confirmSubmit} disabled={submitting}>
                  {submitting ? "Enviando..." : "Confirmar análise"} <ArrowRight aria-hidden="true" size={18} />
                </button>
              </div>
            </div>
          ) : stage === "sent" ? (
            <div className="success-panel" role="status">
              <div className="success-icon"><Check aria-hidden="true" /></div>
              <h3>Solicitação preparada</h3>
              <p>{status}</p>
              <div className="form-actions">
                <ButtonLink href={getWhatsappHref(whatsappType)} variant="gold" icon={MessageCircle} eventName={analyticsEvents.whatsappClick}>
                  Falar pelo WhatsApp
                </ButtonLink>
                <a className="btn btn-outline" href={`mailto:${siteConfig.email}`}>Enviar por e-mail</a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReview} noValidate>
              <div className="form-grid">
                <label>
                  Nome *
                  <input name="name" value={values.name} onChange={updateValue} autoComplete="name" {...errorProps("name")} />
                  {fieldError("name")}
                </label>
                <label>
                  Telefone/WhatsApp *
                  <input name="phone" value={values.phone} onChange={updateValue} autoComplete="tel" inputMode="tel" {...errorProps("phone")} />
                  {fieldError("phone")}
                </label>
                <label>
                  E-mail *
                  <input name="email" type="email" value={values.email} onChange={updateValue} autoComplete="email" {...errorProps("email")} />
                  {fieldError("email")}
                </label>
                <label>
                  Cidade *
                  <input name="city" value={values.city} onChange={updateValue} autoComplete="address-level2" {...errorProps("city")} />
                  {fieldError("city")}
                </label>
                <label>
                  Estado *
                  <input name="state" value={values.state} onChange={updateValue} maxLength="2" autoComplete="address-level1" {...errorProps("state")} />
                  {fieldError("state")}
                </label>
                <label>
                  Perfil *
                  <select name="profile" value={values.profile} onChange={updateValue} {...errorProps("profile")}>
                    <option value="">Selecione</option>
                    {profileOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  {fieldError("profile")}
                </label>
                <label>
                  Distribuidora *
                  <input name="distributor" value={values.distributor} onChange={updateValue} autoComplete="organization" {...errorProps("distributor")} />
                  {fieldError("distributor")}
                </label>
                <label>
                  Valor médio da conta *
                  <input name="billValue" value={values.billValue} onChange={updateValue} inputMode="decimal" placeholder="Ex.: R$ 801 a R$ 2.000" {...errorProps("billValue")} />
                  {fieldError("billValue")}
                </label>
                <label>
                  Tipo de unidade *
                  <select name="unitType" value={values.unitType} onChange={updateValue} {...errorProps("unitType")}>
                    <option value="">Selecione</option>
                    {unitOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  {fieldError("unitType")}
                </label>
                <label className="full-field">
                  Principal interesse *
                  <select name="interest" value={values.interest} onChange={updateValue} {...errorProps("interest")}>
                    <option value="">Selecione</option>
                    {interestOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  {fieldError("interest")}
                </label>
              </div>
              <div className="upload-note">
                <UploadCloud aria-hidden="true" />
                <span>A fatura poderá ser enviada pelo WhatsApp. Não há upload ativo sem backend seguro.</span>
              </div>
              <label className="consent">
                <input name="consent" type="checkbox" checked={values.consent} onChange={updateValue} {...errorProps("consent")} />
                <span>Concordo com o uso dos meus dados para contato e análise, conforme a <a href={siteConfig.privacyUrl}>Política de Privacidade</a>.</span>
              </label>
              {fieldError("consent")}
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                  Analisar minha conta <ArrowRight aria-hidden="true" size={18} />
                </button>
              </div>
              <p className="microcopy">Seus dados serão utilizados somente para atendimento e análise da solicitação.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="section">
      <div className="container faq-layout">
        <div className="section-heading left">
          <p className="eyebrow">FAQ</p>
          <h2>Perguntas frequentes</h2>
          <p>Respostas curtas antes da análise da conta.</p>
        </div>
        <div className="accordion">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <article className="faq-item" key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    setOpenIndex(isOpen ? -1 : index);
                    track(analyticsEvents.faqOpen);
                  }}
                >
                  <span>{item.question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
                <div id={panelId} className="faq-panel" hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div>
          <p className="eyebrow">Próximo passo</p>
          <h2>Descubra se sua conta pode participar</h2>
          <p>Envie as informações da sua unidade e receba uma análise inicial da Renovera.</p>
        </div>
        <div className="cta-actions">
          <ButtonLink href="#analise" icon={FileSearch}>Analisar minha conta</ButtonLink>
          <ButtonLink href={getWhatsappHref("residential")} variant="outline-light" icon={MessageCircle} eventName={analyticsEvents.whatsappClick}>
            Falar pelo WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <SiteFooter logoSrc="./renovera-logo.png" whatsappHref={getWhatsappHref("residential")} privacyHref={siteConfig.privacyUrl} termsHref={siteConfig.termsUrl} onWhatsappClick={() => track(analyticsEvents.whatsappClick, { placement: "footer" })} />;
}

export default function App() {
  useEffect(() => {
    const sections = [...document.querySelectorAll("main > section")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sections.forEach((section) => section.classList.add("reveal"));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const [formValues, setFormValues] = useState(initialForm);

  const applyQualifier = (data, shouldScroll) => {
    setFormValues((current) => ({
      ...current,
      profile: data.profile || current.profile,
      billValue: data.billValue || current.billValue,
      state: data.state || current.state,
      distributor: data.distributor || current.distributor,
      interest: current.interest || "Utilizar energia solar sem placas",
      unitType: current.unitType || (data.profile === "Empresa" ? "Estabelecimento comercial" : "Imóvel próprio")
    }));
    if (shouldScroll) window.setTimeout(scrollToAnalysis, 80);
  };

  const applyAudience = (profile) => {
    setFormValues((current) => ({
      ...current,
      profile,
      interest: current.interest || (profile === "Empresa" ? "Reduzir custos" : "Utilizar energia solar sem placas"),
      unitType: current.unitType || (profile === "Empresa" ? "Estabelecimento comercial" : "Imóvel próprio")
    }));
    window.setTimeout(scrollToAnalysis, 80);
  };

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <section className="visual-proof compartilha-proof" aria-labelledby="compartilha-proof-title">
          <div className="container visual-proof-grid">
            <div className="visual-proof-copy">
              <p className="eyebrow">Geração compartilhada</p>
              <h2 id="compartilha-proof-title">Uma usina remota, uma experiência simples para quem participa.</h2>
              <p>A imagem principal continua mostrando a conexão entre geração, rede e consumo, sem transformar a oferta em promessa além da análise da conta.</p>
              <div className="visual-proof-points"><span>Sem obra no imóvel</span><span>Análise individual</span><span>Acompanhamento</span></div>
            </div>
            <div className="visual-proof-media visual-proof-single">
              <SectionImage
                src="./images/official/compartilha/compartilha-solar-sunset.webp"
                srcSet="./images/official/compartilha/compartilha-solar-sunset-960.webp 960w, ./images/official/compartilha/compartilha-solar-sunset.webp 1600w"
                sizes="(max-width: 760px) calc(100vw - 32px), 50vw"
                alt="Usina solar remota conectada à cidade ao pôr do sol"
                width="1600"
                height="900"
              />
            </div>
          </div>
        </section>

        <section className="renovera-image-gallery-section" aria-labelledby="compartilha-context-title">
          <div className="container">
            <div className="renovera-image-gallery-section__heading">
              <p className="eyebrow">Energia no cotidiano</p>
              <h2 id="compartilha-context-title">A geração remota se conecta à conta e à rotina de quem participa.</h2>
            </div>
            <div className="renovera-image-gallery">
              <SectionImage src="./images/official/compartilha/compartilha-home-energy.webp" srcSet="./images/official/compartilha/compartilha-home-energy-960.webp 960w, ./images/official/compartilha/compartilha-home-energy.webp 1448w" sizes="(max-width: 760px) calc(100vw - 32px), 50vw" alt="Consumidora acompanhando a economia de energia em casa" width="1448" height="1086" />
              <SectionImage src="./images/official/compartilha/compartilha-energy-network.webp" srcSet="./images/official/compartilha/compartilha-energy-network-960.webp 960w, ./images/official/compartilha/compartilha-energy-network.webp 1448w" sizes="(max-width: 760px) calc(100vw - 32px), 50vw" alt="Rede de energia conectando uma comunidade residencial" width="1448" height="1086" />
            </div>
          </div>
        </section>
        <TrustBar />
        <Qualifier onComplete={applyQualifier} />
        <Benefits />
        <HowItWorks />
        <Audience onAudienceClick={applyAudience} />
        <BillSection />
        <AnalysisForm values={formValues} setValues={setFormValues} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp href={getWhatsappHref("residential")} onClick={() => track(analyticsEvents.whatsappClick, { placement: "floating" })} />
      <PageProgress />
      <ScrollToTop />
    </>
  );
}

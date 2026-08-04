import { useEffect, useMemo, useRef, useState } from "react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import BadgeCheck from "lucide-react/dist/esm/icons/badge-check.js";
import Building2 from "lucide-react/dist/esm/icons/building-2.js";
import Calculator from "lucide-react/dist/esm/icons/calculator.js";
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
import PlugZap from "lucide-react/dist/esm/icons/plug-zap.js";
import ReceiptText from "lucide-react/dist/esm/icons/receipt-text.js";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check.js";
import SunMedium from "lucide-react/dist/esm/icons/sun-medium.js";
import UploadCloud from "lucide-react/dist/esm/icons/upload-cloud.js";
import X from "lucide-react/dist/esm/icons/x.js";
import { analyticsEvents, siteConfig } from "./config/siteConfig";

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
    kicker: "Sem obra",
    title: "Não precisa instalar placas",
    text: "A participação não exige obra, alteração do telhado ou instalação de equipamentos fotovoltaicos no imóvel."
  },
  {
    icon: Factory,
    kicker: "Sem compra do sistema",
    title: "Não precisa comprar uma usina",
    text: "O consumidor não precisa adquirir módulos, inversores ou financiar uma instalação própria."
  },
  {
    icon: ClipboardCheck,
    kicker: "Acompanhamento",
    title: "Gestão feita pela Renovera",
    text: "A Renovera acompanha cadastro, compensação, faturas, atendimento e eventuais inconsistências."
  },
  {
    icon: ReceiptText,
    kicker: "Economia projetada",
    title: "Redução analisada pela sua conta",
    text: "A estimativa considera consumo, tarifa, distribuidora e condições disponíveis."
  }
];

const steps = [
  {
    title: "Envie sua conta",
    text: "Verificamos consumo, titularidade, distribuidora, região e características da unidade consumidora."
  },
  {
    title: "Receba a análise",
    text: "Apresentamos estimativa de economia, condições, valores, prazos e funcionamento da operação."
  },
  {
    title: "Comece a compensar",
    text: "Após adesão e cadastro, a distribuidora passa a considerar os créditos na unidade participante."
  }
];

const audiences = [
  {
    title: "Empresas",
    icon: Building2,
    text: "Para comércios e empresas que desejam reduzir custos sem imobilizar capital em uma instalação própria.",
    examples: ["lojas", "mercados", "escritórios", "clínicas", "academias", "restaurantes", "hotéis", "pequenas indústrias", "múltiplas unidades"],
    benefits: ["ausência de obra", "análise de várias unidades", "acompanhamento das faturas", "previsibilidade contratual"],
    cta: "Analisar conta da empresa",
    event: analyticsEvents.businessAnalysisClick
  },
  {
    title: "Residências",
    icon: Home,
    text: "Para consumidores que moram em apartamentos, imóveis alugados ou locais sem condições adequadas para instalar um sistema próprio.",
    examples: ["apartamentos", "imóveis alugados", "casas sem telhado adequado", "famílias que buscam simplicidade"],
    benefits: ["sem alteração do imóvel", "sem financiamento do sistema", "processo de adesão simplificado", "acompanhamento da Renovera"],
    cta: "Analisar conta residencial",
    event: analyticsEvents.residentialAnalysisClick
  }
];

const eligibilityItems = [
  "distribuidora",
  "cidade e estado",
  "titularidade",
  "classe de consumo",
  "histórico de consumo",
  "valor médio",
  "quantidade de unidades",
  "modalidade tarifária",
  "benefícios existentes",
  "disponibilidade"
];

const faqItems = [
  {
    question: "Preciso instalar placas no meu imóvel?",
    answer: "Não. Na geração compartilhada, a usina fica em outro local e a distribuidora registra a compensação na unidade participante."
  },
  {
    question: "Preciso comprar equipamentos?",
    answer: "Não é necessário adquirir módulos, inversores ou uma usina própria para participar da operação."
  },
  {
    question: "Vou continuar recebendo a conta da distribuidora?",
    answer: "Sim. O fornecimento continua sendo realizado pela distribuidora e a fatura continuará sendo emitida."
  },
  {
    question: "Existe outra cobrança?",
    answer: "Conforme o modelo contratado, poderá existir uma cobrança separada relacionada à participação na geração compartilhada. As condições serão apresentadas antes da adesão."
  },
  {
    question: "A economia é garantida?",
    answer: "Não. A estimativa depende do consumo, da geração, das tarifas, dos tributos, da distribuidora e das condições da operação."
  },
  {
    question: "Quanto tempo demora para começar?",
    answer: "O prazo depende da documentação, do cadastro, da distribuidora e do ciclo de faturamento."
  },
  {
    question: "Toda conta pode participar?",
    answer: "Não necessariamente. A unidade precisa passar por análise de região, distribuidora, consumo, titularidade e demais condições aplicáveis."
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
  profile: "Selecione o perfil do consumidor.",
  distributor: "Informe a distribuidora.",
  billValue: "Informe o valor médio da conta.",
  unitType: "Selecione o tipo de unidade.",
  interest: "Selecione o principal interesse."
};

function track(eventName) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: eventName });
  }
}

function getWhatsappHref(messageType = "residential") {
  const message = siteConfig.whatsappMessages[messageType] ?? siteConfig.whatsappMessages.residential;
  if (!siteConfig.whatsapp) {
    return "#analise";
  }
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function ButtonLink({ children, href = "#analise", variant = "primary", icon: Icon = ArrowRight, eventName, className = "" }) {
  return (
    <a
      className={`btn btn-${variant} ${className}`}
      href={href}
      onClick={() => {
        if (eventName) track(eventName);
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

    const firstLink = drawerRef.current?.querySelector("a, button");
    firstLink?.focus();

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
    <header className="site-header">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <nav className="container nav" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="Renovera, Renô Compartilha">
          <img src="./renovera-logo.png" width="178" height="43" alt="Renovera" />
          <span>Renô Compartilha</span>
        </a>

        <div className="nav-links" aria-label="Menu principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
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
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
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
            Envie sua conta de energia e descubra se sua empresa ou residência pode participar de uma operação de geração compartilhada.
          </p>
          <p className="support">
            A energia é produzida em uma usina remota, os créditos são compensados pela distribuidora e a Renovera acompanha todo o processo.
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
            Análise inicial sem compromisso. Sujeita à região, distribuidora, perfil de consumo e disponibilidade.
          </p>
          <ul className="quick-list" aria-label="Benefícios rápidos">
            <li><Check aria-hidden="true" /> sem obra no imóvel</li>
            <li><Check aria-hidden="true" /> sem compra de equipamentos</li>
            <li><Check aria-hidden="true" /> acompanhamento da Renovera</li>
          </ul>
        </div>
        <div className="hero-media" aria-label="Usina solar remota conectada a casas e empresas">
          <img
            src="./reno-compartilha-hero-1280.webp"
            srcSet="./reno-compartilha-hero-960.webp 960w, ./reno-compartilha-hero-1280.webp 1280w, ./reno-compartilha-hero.webp 1680w"
            sizes="(max-width: 1080px) 100vw, 54vw"
            alt="Usina solar remota conectada à rede elétrica próxima a imóveis residenciais e comerciais"
            width="1680"
            height="960"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    ["sem instalação no imóvel", PanelsTopLeft],
    ["análise da sua fatura", FileSearch],
    ["acompanhamento mensal", ClipboardCheck],
    ["suporte especializado", ShieldCheck]
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

function Benefits() {
  return (
    <section id="beneficios" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Benefícios</p>
          <h2>Energia solar de um jeito mais simples</h2>
          <p>
            A geração compartilhada permite aproveitar a energia produzida em uma usina remota, sem precisar comprar ou instalar um sistema fotovoltaico no seu imóvel.
          </p>
        </div>
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, kicker, title, text }) => (
            <article className="card benefit-card" key={title}>
              <div className="card-icon"><Icon aria-hidden="true" /></div>
              <p className="card-kicker">{kicker}</p>
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
          <h2>Como funciona a energia solar compartilhada</h2>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <article className="step" key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <p className="note">O prazo de ativação depende do cadastro, da distribuidora e do ciclo de faturamento.</p>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section id="para-quem" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Para quem é</p>
          <h2>Uma alternativa para quem não quer ou não pode instalar placas</h2>
        </div>
        <div className="audience-grid">
          {audiences.map(({ title, icon: Icon, text, examples, benefits: audienceBenefits, cta, event }) => (
            <article className="card audience-card" key={title}>
              <div className="audience-title">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
              </div>
              <p>{text}</p>
              <div className="pill-list" aria-label={`Exemplos para ${title}`}>
                {examples.map((example) => <span key={example}>{example}</span>)}
              </div>
              <ul className="check-list">
                {audienceBenefits.map((item) => (
                  <li key={item}><Check aria-hidden="true" /> {item}</li>
                ))}
              </ul>
              <ButtonLink href="#analise" eventName={event} icon={FileSearch}>{cta}</ButtonLink>
            </article>
          ))}
        </div>
        <p className="center-note">Também analisamos condomínios, propriedades rurais e grupos com múltiplas unidades consumidoras.</p>
      </div>
    </section>
  );
}

function NoPanelsBand() {
  return (
    <section className="solar-flow">
      <div className="container flow-grid">
        <div>
          <p className="eyebrow">Sem placas no seu endereço</p>
          <h2>Seu imóvel não precisa ter placas para utilizar energia solar</h2>
          <p>
            A usina pode estar localizada em outro endereço dentro da área de atendimento da distribuidora. A compensação é registrada na conta da unidade participante.
          </p>
        </div>
        <div className="flow-illustration" aria-label="Fluxo entre usina remota, distribuidora, empresa e residência">
          <div className="flow-node"><SunMedium aria-hidden="true" /><span>Usina remota</span></div>
          <div className="flow-line" aria-hidden="true" />
          <div className="flow-node"><PlugZap aria-hidden="true" /><span>Distribuidora</span></div>
          <div className="flow-line" aria-hidden="true" />
          <div className="flow-stack">
            <div className="flow-node"><Building2 aria-hidden="true" /><span>Empresa</span></div>
            <div className="flow-node"><Home aria-hidden="true" /><span>Residência</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BillSection() {
  return (
    <section id="conta" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Na fatura</p>
          <h2>O que muda depois da adesão?</h2>
        </div>
        <div className="bill-grid">
          <article className="card">
            <div className="card-icon"><ReceiptText aria-hidden="true" /></div>
            <h3>Fatura da distribuidora</h3>
            <p>
              O fornecimento continua sendo realizado normalmente pela distribuidora. A fatura poderá apresentar a compensação dos créditos e os demais valores que continuam sendo cobrados.
            </p>
            <ul className="plain-list">
              <li>consumo e créditos compensados</li>
              <li>custo de disponibilidade ou demanda</li>
              <li>iluminação pública, tributos e parcelas aplicáveis</li>
            </ul>
          </article>
          <article className="card">
            <div className="card-icon"><BadgeCheck aria-hidden="true" /></div>
            <h3>Cobrança da participação</h3>
            <p>
              Conforme as condições contratadas, o participante poderá receber uma cobrança separada relacionada à sua participação na operação de geração compartilhada.
            </p>
            <p className="note-inline">
              A proposta deverá apresentar de forma clara a composição estimada do custo total e da economia.
            </p>
          </article>
        </div>
        <p className="warning">Os valores e a economia podem variar conforme consumo, geração, tarifas, tributos e regras da distribuidora.</p>
      </div>
    </section>
  );
}

function EligibilityCalculator() {
  const [values, setValues] = useState({
    consumerType: "",
    billAverage: "",
    calcState: "",
    calcDistributor: "",
    calcConsumption: ""
  });
  const [result, setResult] = useState("");

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    track(analyticsEvents.calculatorStart);
  };

  const handleEstimate = (event) => {
    event.preventDefault();
    const amount = Number(values.billAverage.replace(/\D/g, "")) / 100;
    if (!values.consumerType || !values.billAverage || !values.calcState) {
      setResult("Preencha tipo de consumidor, valor médio da conta e estado para fazer a triagem inicial.");
      return;
    }
    track(analyticsEvents.calculatorComplete);
    if (amount > 0) {
      setResult("Sua conta pode ser elegível para uma análise de geração compartilhada. Envie a fatura para validação da região, distribuidora e perfil de consumo.");
      return;
    }
    setResult("Sua conta precisa ser analisada pela equipe Renovera para verificar elegibilidade e disponibilidade.");
  };

  return (
    <form className="calculator" onSubmit={handleEstimate} aria-labelledby="calculator-title">
      <div className="calculator-title">
        <Calculator aria-hidden="true" />
        <h3 id="calculator-title">Faça uma estimativa inicial</h3>
      </div>
      <div className="calc-grid">
        <label>
          Tipo de consumidor
          <select name="consumerType" value={values.consumerType} onChange={update}>
            <option value="">Selecione</option>
            <option>Empresa</option>
            <option>Residência</option>
            <option>Condomínio</option>
            <option>Propriedade rural</option>
            <option>Múltiplas unidades</option>
          </select>
        </label>
        <label>
          Valor médio da conta
          <input name="billAverage" value={values.billAverage} onChange={update} inputMode="decimal" placeholder="R$ 0,00" />
        </label>
        <label>
          Estado
          <input name="calcState" value={values.calcState} onChange={update} maxLength="2" autoComplete="address-level1" />
        </label>
        <label>
          Distribuidora, se conhecida
          <input name="calcDistributor" value={values.calcDistributor} onChange={update} autoComplete="organization" />
        </label>
        <label>
          Consumo médio em kWh
          <input name="calcConsumption" value={values.calcConsumption} onChange={update} inputMode="numeric" />
        </label>
      </div>
      <button className="btn btn-primary" type="submit">Verificar elegibilidade <ArrowRight aria-hidden="true" size={18} /></button>
      {result ? <p className="calc-result" role="status">{result}</p> : null}
      <p className="microcopy">Resultado ilustrativo. A estimativa final depende da análise das faturas, tarifas aplicáveis e condições disponíveis.</p>
    </form>
  );
}

function Eligibility() {
  return (
    <section id="elegibilidade" className="section section-soft">
      <div className="container eligibility-layout">
        <div>
          <p className="eyebrow">Análise de elegibilidade</p>
          <h2>O que analisamos na sua conta</h2>
          <div className="eligibility-list">
            {eligibilityItems.map((item) => <span key={item}><Check aria-hidden="true" /> {item}</span>)}
          </div>
          <p className="warning light">
            A análise é necessária porque nem todas as unidades possuem as mesmas condições tarifárias, cadastrais ou regulatórias.
          </p>
        </div>
        <EligibilityCalculator />
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
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Informe um e-mail válido.";
  }
  if (values.phone && values.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Informe um telefone com DDD.";
  }
  if (!values.consent) {
    errors.consent = "Você precisa autorizar o uso dos dados para contato e análise.";
  }
  return errors;
}

function AnalysisForm() {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState("editing");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const startedRef = useRef(false);

  const profileOptions = ["Empresa", "Residência", "Condomínio", "Propriedade rural", "Múltiplas unidades", "Outro"];
  const unitOptions = ["Imóvel próprio", "Imóvel alugado", "Apartamento", "Estabelecimento comercial", "Unidade rural", "Condomínio", "Outro"];
  const interestOptions = [
    "reduzir os custos de energia",
    "utilizar energia solar sem instalar placas",
    "analisar várias unidades",
    "entender como funciona",
    "comparar com instalação própria",
    "outro"
  ];

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

    if (!siteConfig.formEndpoint) {
      window.setTimeout(() => {
        setSubmitting(false);
        setStage("sent");
        setStatus("Recebemos sua solicitação nesta página. Como o endpoint ainda não está configurado, use WhatsApp ou e-mail para concluir o envio da fatura.");
      }, 450);
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
          <p>
            Preencha as informações principais. A equipe da Renovera verificará a elegibilidade e entrará em contato para apresentar os próximos passos.
          </p>
          <div className="next-steps">
            <h3>O que acontece depois do envio?</h3>
            <ol>
              <li>conferimos os dados básicos</li>
              <li>analisamos a região e a distribuidora</li>
              <li>verificamos o perfil de consumo</li>
              <li>entramos em contato</li>
              <li>apresentamos as condições disponíveis</li>
            </ol>
          </div>
          <div className="contact-box">
            <a href={getWhatsappHref(whatsappType)} onClick={() => track(analyticsEvents.whatsappClick)}>
              <MessageCircle aria-hidden="true" /> {siteConfig.whatsapp ? "WhatsApp Renovera" : "WhatsApp a configurar"}
            </a>
            <a href={`mailto:${siteConfig.email}`} onClick={() => track(analyticsEvents.footerContactClick)}>
              <Mail aria-hidden="true" /> {siteConfig.email}
            </a>
            <span><ShieldCheck aria-hidden="true" /> {siteConfig.businessHours}</span>
          </div>
          <p className="microcopy">
            A conta poderá ser enviada durante o atendimento. Este formulário não armazena faturas porque ainda não há backend seguro configurado.
          </p>
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
                  Perfil do consumidor *
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
                  <input name="billValue" value={values.billValue} onChange={updateValue} inputMode="decimal" placeholder="R$ 0,00" {...errorProps("billValue")} />
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
                <span>A fatura poderá ser enviada pelo atendimento. Não há upload ativo sem backend seguro.</span>
              </div>

              <label className="consent">
                <input name="consent" type="checkbox" checked={values.consent} onChange={updateValue} {...errorProps("consent")} />
                <span>
                  Concordo com o uso dos meus dados para contato e análise de elegibilidade, conforme a <a href={siteConfig.privacyUrl}>Política de Privacidade</a>.
                </span>
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
          <p>Respostas simples para entender o básico antes da análise da sua conta.</p>
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
          <p>Envie sua fatura e receba uma análise inicial da equipe Renovera.</p>
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
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="./renovera-logo.png" width="170" height="41" alt="Renovera" />
          <h2>Renô Compartilha</h2>
          <p>Energia solar compartilhada para consumidores finais que desejam simplicidade, clareza e acompanhamento.</p>
          <p className="footer-warning">
            A elegibilidade, os valores e a estimativa de economia dependem da análise individual da unidade consumidora, das tarifas, da distribuidora e das condições disponíveis.
          </p>
        </div>
        <div>
          <h3>Menu</h3>
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
        <div>
          <h3>Soluções</h3>
          {siteConfig.services.map((service) => <a key={service.label} href={service.href}>{service.label}</a>)}
        </div>
        <div>
          <h3>Contato</h3>
          <a href={getWhatsappHref("residential")} onClick={() => track(analyticsEvents.whatsappClick)}>WhatsApp configurável</a>
          <a href={`mailto:${siteConfig.email}`} onClick={() => track(analyticsEvents.footerContactClick)}>{siteConfig.email}</a>
          <span>{siteConfig.businessHours}</span>
          <a href={siteConfig.privacyUrl}>Política de Privacidade</a>
          {siteConfig.termsUrl ? <a href={siteConfig.termsUrl}>Termos de Uso</a> : <span>Termos de Uso a configurar</span>}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} Renovera. Todos os direitos reservados.</span>
        <span>Renô Compartilha</span>
      </div>
    </footer>
  );
}

function FloatingWhatsapp() {
  return (
    <a
      className="floating-whatsapp"
      href={getWhatsappHref("residential")}
      aria-label="Falar pelo WhatsApp"
      onClick={() => track(analyticsEvents.whatsappClick)}
    >
      <MessageCircle aria-hidden="true" />
    </a>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustBar />
        <Benefits />
        <HowItWorks />
        <Audience />
        <NoPanelsBand />
        <BillSection />
        <Eligibility />
        <AnalysisForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}

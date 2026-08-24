export const siteConfig = {
  brand: "Renô Compartilha",
  company: "Renovera",
  tagline: "Energia solar compartilhada para sua empresa ou residência",
  siteUrl: "https://renovera.com.br/compartilha/",
  institutionalUrl: "https://renovera.com.br/",
  whatsapp: "5519996514827",
  email: "contato@renovera.com.br",
  privacyUrl: "https://renovera.com.br/lgpd.html",
  termsUrl: "",
  formEndpoint: "",
  approvedSavingsRange: null,
  billRanges: [
    "Até R$ 300",
    "R$ 301 a R$ 800",
    "R$ 801 a R$ 2.000",
    "R$ 2.001 a R$ 5.000",
    "Acima de R$ 5.000"
  ],
  businessHours: "Atendimento: Segunda a Sexta",
  services: [
    {
      label: "Consultoria Regulatória",
      href: "https://renovera.com.br/consultoria/"
    },
    {
      label: "Design e Projetos Elétricos",
      href: "https://renovera.com.br/design/"
    },
    {
      label: "Energia Solar",
      href: "https://renovera.com.br/solar/"
    },
    {
      label: "Eletroposto",
      href: "https://renovera.com.br/eletroposto/"
    },
    {
      label: "Renô Gestão",
      href: "https://renovera.com.br/gestao/"
    }
  ],
  whatsappMessages: {
    business:
      "Olá, Renovera. Gostaria de analisar a conta de energia da minha empresa para verificar a possibilidade de participar da Renô Compartilha.\n\nNome:\nEmpresa:\nCidade/UF:\nDistribuidora:\nValor médio da conta:\nQuantidade de unidades:\n\nGostaria de receber uma análise inicial.",
    residential:
      "Olá, Renovera. Gostaria de analisar minha conta residencial para verificar a possibilidade de participar da Renô Compartilha.\n\nNome:\nCidade/UF:\nDistribuidora:\nValor médio da conta:\nTipo de imóvel:\n\nGostaria de receber uma análise inicial."
  }
};

export const analyticsEvents = {
  heroAnalysisClick: "hero_analysis_click",
  heroWhatsappClick: "hero_whatsapp_click",
  businessAnalysisClick: "business_analysis_click",
  residentialAnalysisClick: "residential_analysis_click",
  qualifierStart: "qualifier_start",
  qualifierComplete: "qualifier_complete",
  formStart: "form_start",
  formSubmit: "form_submit",
  whatsappClick: "whatsapp_click",
  faqOpen: "faq_open",
  footerContactClick: "footer_contact_click"
};

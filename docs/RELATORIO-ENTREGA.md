# Relatório de entrega - Renô Compartilha

## Identidade visual encontrada

A página segue a família visual Renovera observada no site institucional e na landing Renô Gestão: verde institucional escuro, verde de apoio, detalhe dourado solar, cards limpos, botões em pílula, raio de borda de 8px, header claro e footer institucional.

## Decisões de design

- Direção mais leve que Renô Gestão, com fundo branco/off-white e menos densidade corporativa.
- Hero direto para cliente final, com CTA principal "Analisar minha conta".
- Imagem própria em WebP mostrando usina remota, rede e imóveis, reforçando que não há instalação no imóvel.
- Copy sem promessa de economia garantida, sem venda de energia, sem preço por kWh e sem depoimentos fictícios.

## Estrutura final

1. Header
2. Hero
3. Faixa de confiança
4. Benefícios
5. Como funciona
6. Para quem é
7. Faixa "sem placas"
8. Como aparece na conta
9. Análise de elegibilidade
10. Formulário principal
11. FAQ
12. CTA final
13. Footer

## Stack

- React
- Vite
- CSS estático
- Lucide React para ícones
- Build estático para GitHub Pages

## Arquivos criados

- `index.html`
- `vite.config.js`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `.gitignore`
- `.github/workflows/deploy.yml`
- `src/App.jsx`
- `src/main.jsx`
- `src/styles.css`
- `src/config/siteConfig.js`
- `public/favicon.svg`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/.nojekyll`
- `public/404.html`
- `public/renovera-logo.png`
- `public/reno-compartilha-hero.webp`
- `public/reno-compartilha-hero-1280.webp`
- `public/reno-compartilha-hero-960.webp`
- `README.md`

## Formulário

O formulário valida campos obrigatórios, telefone, e-mail e consentimento. Antes do envio, mostra um resumo para conferência e permite correção. O endpoint fica centralizado em `src/config/siteConfig.js`.

Como ainda não há endpoint real configurado, o envio apresenta fallback claro para WhatsApp/e-mail sem apagar os dados e sem registrar dados pessoais no console.

## Envio de fatura

Não foi criado upload falso. A página informa que a fatura poderá ser enviada durante o atendimento, até existir backend seguro e documentado.

## WhatsApp

O número fica centralizado em `src/config/siteConfig.js`. Como o WhatsApp definitivo não foi fornecido, os CTAs de WhatsApp não usam número fictício.

## Calculadora

A estimativa inicial funciona como qualificação. Ela não exibe percentuais ou valores de economia sem faixa comercial validada.

## GitHub Pages

O projeto usa `base: "./"` e workflow de GitHub Pages por Actions. A URL esperada é:

```text
https://luscaarmstrong1.github.io/reno-compartilha/
```

Se o repositório for transferido para outro usuário ou organização, atualizar `siteUrl`, canonical, sitemap e metadados em `src/config/siteConfig.js`, `index.html` e `public/sitemap.xml`.

## Testes realizados

- Build Vite: aprovado.
- QA Playwright: menu mobile, Escape, links internos, FAQ, validação do formulário, revisão/confirmação e overflow horizontal em 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 e 1920 px.
- Lighthouse local: Performance 94, Accessibility 96, Best Practices 100, SEO 100.
- Métricas Lighthouse: LCP 2.7s, TBT 0ms, CLS 0, Speed Index 2.1s.

## Limitações

- WhatsApp definitivo não informado.
- Endpoint do formulário não informado.
- Termos de Uso não encontrados no site institucional.
- Estados, distribuidoras, perfis aceitos e condições comerciais ainda precisam de validação da Renovera.
- Não há depoimentos reais autorizados específicos para Renô Compartilha.

## Dados pendentes da Renovera

- WhatsApp definitivo
- E-mail definitivo, se diferente de `contato@renovera.com.br`
- Endpoint do formulário
- Política de Privacidade definitiva
- Termos de Uso
- Estados atendidos
- Distribuidoras atendidas
- Perfis aceitos
- Valor mínimo de conta
- Prazo de adesão
- Condições comerciais
- Faixa de economia autorizada
- Regras de fidelidade
- Taxas
- Documentos exigidos
- Depoimentos reais
- Imagens autorizadas adicionais

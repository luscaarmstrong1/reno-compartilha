# Renovera | Landing Page Regulatória

Projeto recuperado da conversa "Landing Page Design" e aprimorado sem recriar a landing do zero.

## Como abrir

O projeto é Vite + React + TypeScript.

```bash
npm install
npm run dev -- --port 5401
```

Nesta sessão, o runtime local não expôs `npm` no PATH; por isso a validação foi feita com o Node empacotado do Codex e `pnpm` para instalar as tipagens ausentes. O servidor ativo está em:

```bash
http://127.0.0.1:5401/
```

## Como editar pela própria página

Acesse:

```bash
http://127.0.0.1:5401/editor
```

Clique em `Editar textos`, altere títulos, parágrafos e botões direto na página e depois clique em `Salvar no navegador`. Também há opção de exportar JSON e restaurar os textos originais.

## Como editar no VS Code

Abra o arquivo `renovera-regulatoria.code-workspace` no Visual Studio Code.

Arquivos principais:

- `src/App.tsx`: estrutura, textos, triagem, CTAs e WhatsApp.
- `src/LiveEditor.tsx`: editor visual em tempo real.
- `src/index.css`: identidade visual, responsividade, foco acessível e editor local.
- `public/logo-renovera.png` e `public/logo.png`: logo usada na página.
- `index.html`: SEO, Open Graph e dados estruturados.

## Scripts

- `npm run dev`: abre servidor de desenvolvimento.
- `npm run typecheck`: valida TypeScript.
- `npm run build`: gera a versão final em `dist`.
- `npm run preview`: pré-visualiza a versão de produção.

# Renovera Charge Landing Page

Landing page editável em React + Vite para a Renovera Charge, com calculadora de viabilidade para eletropostos, botão flutuante de WhatsApp e editor visual de textos no navegador.

## Rodar localmente

```powershell
npm install
npm run dev
```

Depois abra o endereço mostrado pelo Vite, normalmente:

```txt
http://127.0.0.1:5173/
```

## Editor visual

Abra:

```txt
http://127.0.0.1:5173/editor
```

Clique em **Editar textos**, altere títulos/parágrafos/botões direto na página e use **Salvar no navegador**. As alterações ficam no `localStorage` do navegador. Também é possível exportar JSON e restaurar o conteúdo original.

## Editar no VS Code

Abra esta pasta no VS Code:

```powershell
code .
```

Arquivos principais:

- `src/App.tsx`: textos, seções, calculadora, links e dados da página.
- `src/LiveEditor.tsx`: editor visual de textos em `/editor`.
- `src/index.css`: visual, responsividade, foco acessível e identidade.
- `public/logo-renovera.png` e `public/logo.png`: marca usada no topo, rodapé, favicon e manifest.
- `public/_headers`: headers de segurança para hospedagens estáticas compatíveis.
- `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest`: SEO técnico e metadados de instalação.

## Publicar

Gere a versao de producao:

```powershell
npm run build
```

Os arquivos finais ficam em `dist`.

## Observações

- Troque o número do WhatsApp em `src/App.tsx` antes de publicar.
- Se a hospedagem não reconhecer `public/_headers`, configure os mesmos headers no painel ou servidor da infraestrutura.

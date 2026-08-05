# Renô Compartilha

Landing page estática para GitHub Pages do serviço Renô Compartilha, voltada a consumidores finais interessados em energia solar compartilhada sem instalação de placas no imóvel.

A versão atual possui um qualificador interativo em três passos que preenche o formulário de análise automaticamente.

## Stack

- React
- Vite
- CSS estático
- Lucide React para ícones

## Desenvolvimento

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build
```

O projeto usa `base: "./"` para compatibilidade com GitHub Project Pages em:

```text
https://luscaarmstrong1.github.io/reno-compartilha/
```

## Configuração

Os dados comerciais ficam centralizados em `src/config/siteConfig.js`.

Itens pendentes antes da publicação final:

- WhatsApp definitivo
- endpoint do formulário, se houver
- política de privacidade definitiva
- termos de uso definitivos
- estados e distribuidoras atendidos
- condições comerciais autorizadas

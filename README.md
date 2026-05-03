# open-weather

Aplicacao web de previsao do tempo com Next.js 16 (App Router), React 19, TypeScript, Emotion e OpenWeatherMap.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Emotion (styled)
- NextAuth (Google e GitHub)
- OpenWeatherMap API

## Funcionalidades

- Login obrigatorio com NextAuth (Google e GitHub)
- Guards de autenticacao por rota (server-side)
- Integracao com OpenWeather para clima atual e previsao 5 dias/3h
- Busca por cidade com sugestoes
- Botao de geolocalizacao
- Persistencia da ultima cidade pesquisada no navegador (localStorage)
- Home com resumo rapido, ciclo solar, proximas horas e semana
- Paginas de alertas e insights com foco em leitura pratica

## Requisitos

- Node.js 20+
- npm 10+
- Chave da API OpenWeatherMap
- Credenciais OAuth Google e GitHub

## Variaveis de ambiente

Copie [.env.example](.env.example) para `.env.local` e preencha:

- `NEXT_PUBLIC_WEATHER_API_KEY`
- `AUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

Exemplo:

```bash
cp .env.example .env.local
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

## Rodando localmente

```bash
npm install
npm run dev
```

Aplicacao: http://localhost:3000

## Scripts

- `npm run dev`: modo desenvolvimento
- `npm run build`: build de producao
- `npm run start`: sobe a aplicacao compilada
- `npm run lint`: validacao de lint

## Deploy (GitHub Actions + Vercel)

O projeto possui workflow em [.github/workflows/deploy.yml](.github/workflows/deploy.yml), executado em push para `main`.

Fluxo:

1. Roda lint
2. Faz pull das variaveis no Vercel
3. Build de producao
4. Deploy para producao

Configure os secrets no GitHub (Settings > Secrets and variables > Actions):

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Tambem configure as variaveis de runtime no painel do Vercel (Production), com os mesmos valores do `.env.local` que forem necessarios em servidor e cliente.

## Observacoes de configuracao

- `next.config.ts` foi ajustado com:
- `reactStrictMode` para detectar problemas de renderizacao cedo
- `compiler.emotion` para melhor suporte a Emotion
- `optimizePackageImports` para reduzir custo de imports de icones
- headers basicos de seguranca (`nosniff`, `Referrer-Policy`, `X-Frame-Options`)

## Troubleshooting

- Porta 3000 ocupada:

```powershell
taskkill /F /IM node.exe
```

- Se OAuth falhar em ambiente local, confirme se `NEXTAUTH_URL` esta em `http://localhost:3000`.
- Se variaveis mudarem, reinicie o servidor (`npm run dev`).

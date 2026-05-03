# open-weather

Aplicacao web de previsao do tempo com Next.js 16 (App Router), React 19, TypeScript, Emotion e OpenWeatherMap.

## Requisitos

- Node.js 20+
- Chaves da API OpenWeatherMap
- Credenciais OAuth Google e GitHub

## Configuracao

1. Copie [.env.example](.env.example) para .env.local.
2. Preencha as variaveis:
	- NEXT_PUBLIC_WEATHER_API_KEY
	- AUTH_SECRET
	- NEXTAUTH_URL
	- GOOGLE_CLIENT_ID
	- GOOGLE_CLIENT_SECRET
	- GITHUB_CLIENT_ID
	- GITHUB_CLIENT_SECRET

## Rodando localmente

```bash
npm install
npm run dev
```

## O que ja foi implementado

- Login obrigatorio com NextAuth (Google e GitHub)
- Guards de autenticacao por rota (HOC server-side)
- Integracao com OpenWeather para clima atual e previsao 5 dias/3h
- Busca por cidade com sugestoes
- Botao de geolocalizacao
- Persistencia da ultima cidade pesquisada no navegador
- Layout responsivo com glassmorphism e animacoes suaves

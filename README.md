# PinhalTour

Aplicativo de turismo de Espírito Santo do Pinhal (SP): rotas, eventos e pontos turísticos da cidade na palma da mão, com leitura de QR codes nos locais históricos. Projeto de 2025, feito em trio com Gabriel e Nicolas.

<p align="center">
  <img src="https://raw.githubusercontent.com/yRizer/Portifolio/main/public/images/pinhaltour/inicio.webp" width="180" alt="Tela inicial com rotas, categorias e eventos" />
  <img src="https://raw.githubusercontent.com/yRizer/Portifolio/main/public/images/pinhaltour/mapa.webp" width="180" alt="Mapa com os pontos por categoria" />
  <img src="https://raw.githubusercontent.com/yRizer/Portifolio/main/public/images/pinhaltour/igreja.webp" width="180" alt="Página de um ponto turístico" />
  <img src="https://raw.githubusercontent.com/yRizer/Portifolio/main/public/images/pinhaltour/eventos.webp" width="180" alt="Calendário de eventos da cidade" />
</p>

## Funcionalidades

- **Início:** rotas sugeridas, categorias de lugares e próximos eventos.
- **Mapa:** pontos turísticos por categoria e rota até o local.
- **QR Code:** leitura com a câmera do QR code de cada ponto histórico, que abre a descrição do lugar.
- **Eventos:** calendário de eventos da cidade.
- **Favoritos:** lugares salvos pelo usuário.

## Stack

- React Native 0.81 com Expo 54 e Expo Router (navegação por abas com tab bar própria)
- TypeScript
- expo-camera para leitura de QR codes
- API em Node.js + MySQL compartilhada com o app da Vinícola ([yRizer/TestesTccVinicola](https://github.com/yRizer/TestesTccVinicola))

## Como rodar

```bash
npm install
npx expo start
```

Para usar a API (QR codes), suba o [TestesTccVinicola](https://github.com/yRizer/TestesTccVinicola) com `docker compose up -d` e crie um `.env` a partir do `.env.example`, com o IP do seu computador:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.10:3333
```

Abra no Expo Go (Android ou iOS) lendo o QR code do terminal, ou pressione `w` para a versão web.

## Estrutura

```
src/
  app/          telas (Expo Router), dados e serviço da API
  components/   tab bar, carrossel, bottom sheets, modais, botões
  styles/       cores e estilos globais
  utils/        validação de QR codes
```

---

Mais projetos no meu portfólio: [yrizer.github.io/Portifolio](https://yrizer.github.io/Portifolio/)

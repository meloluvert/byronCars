# byronCars

[![Expo](https://img.shields.io/badge/Expo-54.0.0-black?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-v4-green?logo=tailwindcss)](https://www.nativewind.dev/)

## Sobre o Projeto

**byronCars** é um aplicativo mobile completo desenvolvido com **React Native** e **Expo** para gerenciamento de carros disponíveis para aluguel, como parte da finalização da capacitação de back-end pela [byron.solutions](https://www.byronsolutions.com/). O app permite que usuários se cadastrem, façam login e gerenciem uma frota de carros com operações **CRUD completas** (Criar, Ler, Atualizar, Deletar), incluindo upload de imagens, busca por nome e interface moderna e responsiva.

Esse app se conecta a uma **API REST** backend (não incluída) para autenticação e operações de carros. É ideal para locadoras de veículos ou apps de compartilhamento de carros.


##  Como Executar

### Pré-requisitos
- Node.js 20+
- Expo CLI: `npm install -g expo-cli` (ou use `npx`)
- **Backend API rodando** (ex: Node/Express em `API_URL` do `api/config.ts`):
  - Endpoints: `/auth/login|register|me|logout|profile`, `/cars`, `/car*` (CRUD com auth).
  - Suporte a FormData para upload de imagens.
- Expo Go app no celular (Android/iOS) ou emulador.

### Instalação & Execução
```bash
# Clone o repositório
git clone https://github.com/meloluvert/byronCars
cd byronCars

# Instale dependências
npm install

# Inicie o dev server
npx expo start

# Escaneie QR code no Expo Go ou:
# npx expo start:android  # ou :ios
```

###  Execute o back-end
[Repositório do Backend](https://github.com/thaleraaa/byronCars), feito pelo Thales Lemos

###  Funcionalidades Principais
-  **Autenticação Completa**: Login, Registro, Logout, Perfil e atualização de dados do usuário.
-  **CRUD de Carros**:
  - Listagem de todos os carros com cards visuais.
  - Busca por nome em tempo real.
  - Criação de novo carro com foto (upload via FormData).
  - Edição de detalhes (placa, cor, ano, marca, preço/dia, disponibilidade).
  - Exclusão com modal de confirmação.
- . **Telas**:
  | Tela | Descrição |
  |------|-----------|
  | **Home** (`screens/home.tsx`) | Lista de carros, busca, CRUD buttons. Saudação personalizada. |
  | **Profile** (`screens/profile.tsx`) | Visualiza/edita perfil do usuário. |
  | **Logout** (`screens/logout.tsx`) | Confirmação de logout. |
  | **Login** (`screens/auth/login.tsx`) | Formulário de login. |
  | **Register** (`screens/auth/register.tsx`) | Cadastro de novo usuário. |
- . **Navegação**:
  | Navegador | Telas Incluídas |
  |-----------|-----------------|
  | **AuthNavigator** (`navigation/AuthNavigator.tsx`) | Login e Register (não autenticado). |
  | **MainNavigator** (`navigation/MainNavigator.tsx`) | Home, Profile, Logout (autenticado). |
- . **Contextos (Gerenciamento de Estado)**:
  | Context | Responsabilidades |
  |---------|-------------------|
  | **AuthContext** (`contexts/AuthContext.tsx`) | Estado do usuário, loading, signIn/signUp/signOut/updateUser. Persiste token com SecureStore. |

## Tecnologias & Bibliotecas

| Categoria | Tecnologias |
|-----------|-------------|
| **Framework** | Expo SDK 54, React Native 0.81, React 19 |
| **Estilização** | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS para RN), `global.css` |
| **Navegação** | React Navigation 7 (NativeStack, BottomTabs, Stack) |
| **Animações/Gestures** | React Native Reanimated 4, Gesture Handler 2.28 |
| **UI/Icons** | Lucide React Native, Expo Vector Icons, SVG Transformer |
| **Autenticação/Armazenamento** | Expo SecureStore (tokens), API REST com fetch/FormData |
| **Mídia** | Expo Camera, Image Picker (upload de fotos de carros) |
| **Desenvolvimento** | TypeScript 5.9, ESLint 9 + Prettier, Metro/Babel config |
| **Outros** | NativeWind-env, Tailwind Config, React Native Screens/SafeAreaContext |

**Estrutura de Pastas**:
```
byron.cars/
├── api/              # Clientes API (auth.ts, cars.ts, config.ts)
├── assets/           # Imagens e ícones
├── components/       # UI reutilizáveis (CarCard, CRUD modals)
│   └── crud_cars/    # Modais específicos (New/Edit/Delete)
├── contexts/         # AuthContext
├── navigation/       # Auth/MainNavigator
├── screens/          # Telas principais + auth/
├── App.tsx           # Entry point com AuthProvider + Navigator
├── global.css        # Estilos Tailwin
├── tailwind.config.js # Config NativeWind
└── ...configs (tsconfig, eslint, etc.)
```




# Vini Amaral - Site Oficial

Bem-vindo ao repositório do site oficial de Vini Amaral, um cantor e compositor brasileiro de rock melódico. Este projeto é uma aplicação de página única (SPA) moderna e elegante, projetada para apresentar sua música, biografia e letras de forma imersiva e acessível.



![Captura de tela do site Vini Amaral](/home/user/vini-amaral/public/fotos/CAPA LP.jpg)
*(Nota: Adicione uma captura de tela do projeto a `public/fotos/screenshot.png` para que ela seja exibida aqui.)*

## ✨ Recursos

- **Design Sofisticado:** Uma identidade visual única com uma paleta de cores escura, acentos em dourado, tipografia elegante e um layout visualmente equilibrado.
- **Hero Section Dinâmica:** Uma seção de boas-vindas impactante com animações sutis no texto, imagem e botões para uma experiência de usuário mais polida.
- **Player de Música Integrado:** Links diretos para o SoundCloud para ouvir as músicas.
- **Seção "Sobre o Artista":** Uma biografia que conecta o ouvinte à jornada e influências do artista.
- **Visualizador de Letras:** Uma seção interativa com abas para navegar facilmente entre as letras das músicas do álbum.
- **Design Responsivo:** Totalmente adaptado para uma experiência de usuário perfeita em desktops, tablets e dispositivos móveis.
- **Efeitos Visuais Modernos:** Uso de texturas, sombras e gradientes para criar uma sensação de profundidade e um visual premium.

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** CSS Padrão com Variáveis Globais
- **Hospedagem:** [Firebase](https://firebase.google.com/) (ou outra plataforma de sua escolha)
- **Controle de Versão:** [Git](https://git-scm.com/) & [GitHub](https://github.com/)

## 🏁 Como Começar

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/dresbach-hosting/viniamaral.git
    cd viniamaral
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```

Agora, abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver o projeto em ação.

## 📦 Publicação (Deploy)

O projeto está configurado para ser facilmente publicado em qualquer plataforma que suporte aplicações Next.js, como Vercel ou Firebase.

Para construir a versão de produção do site, execute:
```sh
npm run build
```
Depois, siga as instruções de sua plataforma de hospedagem para fazer o deploy dos arquivos gerados na pasta `.next`.

## 📜 Histórico do Projeto

### Refatoração Completa e Modernização

O projeto passou por uma extensa refatoração para modernizar a base de código, resolver erros de lint e otimizar o desempenho. As seguintes páginas foram completamente reestruturadas para seguir as melhores práticas do React, utilizando Hooks para gerenciamento de estado e melhorando a organização dos componentes:

- `admin-login`
- `admin-panel`
- `checkout`
- `fan-club-store`
- `fan-club`

A página `login-adm`, que era um duplicata de `admin-login`, foi removida para eliminar a redundância.

### Integração de Pagamento com PayPal

Foi implementado um sistema de checkout com PayPal, adicionando as seguintes funcionalidades:

- **Rotas de API:** Foram criadas duas novas rotas para lidar com as transações do PayPal:
  - `src/app/api/orders/route.ts`: para criar novos pedidos.
  - `src/app/api/orders/[orderID]/capture/route.ts`: para capturar os pagamentos.
- **SDK do PayPal:** O pacote `@paypal/checkout-server-sdk` foi adicionado ao projeto para gerenciar as operações do lado do servidor.
- **Botão de Pagamento:** O botão do PayPal foi integrado à página de `checkout`, permitindo que os usuários finalizem suas compras de forma segura.
- **Configuração do Firebase:** O arquivo `.idx/mcp.json` foi atualizado para garantir a integração correta com os servidores do Firebase.

### Correção de Erros

Diversos erros foram corrigidos para garantir a estabilidade e a performance da aplicação:

- **Criação de Componentes Durante o Render:** Erros que ocorriam devido à criação de componentes dentro de outros foram resolvidos movendo os componentes para fora do escopo do componente pai.
- **Uso Incorreto do `useEffect`:** Avisos de renderização em cascata foram corrigidos, garantindo que o `useEffect` seja usado corretamente para sincronizar o estado.
- **Erros de Lint:** Todos os erros de lint, incluindo `quotes` não escapadas e variáveis não utilizadas, foram corrigidos, resultando em um código mais limpo e consistente.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

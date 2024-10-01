# Projeto Full-Stack: Aplicação com React e Node.js

Este repositório contém um projeto full-stack, que combina uma interface frontend desenvolvida em React com um backend em Node.js (puro). O projeto visa demonstrar a integração entre essas tecnologias, além de utilizar um sistema simples de banco de dados físico, armazenado em um arquivo de texto. Para a construção e otimização do frontend, o Vite foi utilizado como bundler, juntamente com CSS Modules para a estilização modular e escopada.

# Run Project

| Etapa             | Comando                |
| ----------------- | ---------------------- |
| **Clone Project** | `git clone <repo-url>` |

## Backend

| Etapa             | Comando           |
| ----------------- | ----------------- |
| Entrar no backend | `cd todo-backend` |
| Rodar o servidor  | `npm run dev`     |

## Front-end

| Etapa               | Comando             |
| ------------------- | ------------------- |
| Entrar no front-end | `cd todo-front-end` |
| Rodar o servidor    | `npm run dev`       |

## Tecnologias utilizadas:

### Frontend:

React: Biblioteca JavaScript para construção de interfaces de usuário (UI).
Vite: Ferramenta de build rápida para projetos frontend, otimizada para desenvolvimento em React.

CSS Modules: Estilização escopada para garantir o encapsulamento de classes e evitar conflitos de estilos.

### Backend:

Node.js: Plataforma para construir o servidor e a lógica do backend usando JavaScript puro, sem frameworks adicionais.
Banco de dados em arquivo de texto: Sistema simples de persistência de dados em que os registros são armazenados e manipulados em um arquivo local, simulando um banco de dados
físico.

## Funcionalidades:

Gerenciamento de Dados: O backend permite a leitura e gravação de dados em um arquivo de texto, simulando operações CRUD básicas (Create, Read, Update, Delete).
Integração Frontend-Backend: O frontend consome os dados do backend utilizando requisições HTTP para exibir e manipular informações na interface do usuário.
CSS Modules: Estilização de componentes React de maneira modular, garantindo o escopo de cada estilo.


# Fila Fácil

Fila Fácil é o trabalho de conclusão de curso de Pedro Luiz Ferreira Pires, estudante do período noturno da Universidade Paulista no campus Paraíso.

O projeto se trata de um sistema com um painel administrativo, um painel para clientes e um servidor de integração que permite a atualização em tempo real do status de um pedido.

## Variáveis de Ambiente

Para rodar esse projeto, você pode seguir o arquivo `.env.example`.


## Inicialização do projeto
Antes de realizar a primeira inicialização do sistema, é necessário instalar suas dependências utilizando o comando
```bash
    npm install
```
Para inicializar todos os módulos do Fila Fácil, basta utilizar o comando
```bash
    npm run dev
```

Para inicilizar um módulo de forma isolada, é necessário utilizar o comando `npm run nome-do-projeto:dev`

```bash
    npm run admin:dev
    npm run server:dev
    npm run client:dev
```
### URLs padrão:

- Admin: http://localhost:9000
- Client: http://localhost:9001
- Server: http://localhost:3000
## Stack utilizada

**Admin:** Quasar.js, TypeScript

**Client:** Quasar.js, TypeScript

**Server:** Node, Express.js, Socket.io, TypeScript

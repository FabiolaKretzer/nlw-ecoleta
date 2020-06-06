# Next Level Week
 
## Entidades da aplicação

```
- points (Pontos de coleta)
    - image
    - name
    - email
    - whatsapp
    - latitude
    - longitude
    - city
    - uf
    - Roupas
 - items (Itens para coleta)
    - image
    - title
- point_items (Relacionamento do itens do ponto de coleta)
    - points_id
    - items_id
```

## Funcionalidades da aplicação

```
- Cadastro de ponto de coleta
- Listar os itens de coleta
- Listar pontos (filtro por estado/cidade/items)
- Listar um ponto de coleta específico
```

## Instalação e pacotes utilizados

Inicializa o package.json
```
npm init -y
```

Gerenciador de rotas
```
npm install express
```

Gerenciador de rotas com tipagem com dependência de desenvolvimento
```
npm install @types/express -D
```

Dependência de desenvolvimento utilizada para inicializar o servidor
```
npm install ts-node -D
```

Instalação do typescript
```
npm install typescript -D
```

O npx executa pacotes, e se não existir o cria

Criação do arquivo de configuração tsconfig.json
```
npx tsc --init
```

Comando para inicializar o servidor
```
npx ts-node src/server.ts
```

Dependência de desenvolvimento utilizada para inicializar o servidor parecido com o nodemon
```
npm install ts-node-dev -D
```

Comando para inicializar o servidor
```
npx ts-node-dev src/server.ts
```

Comando para inicializar o servidor
```
npm run start
```

Instala a ferramenta que auxilia a escrita de querys para o banco de dados om sintaxe de javascript
```
npm install knex
```

Instala o banco de dados
```
npm install sqlite3
```

Executa os migrations
`npx knex --knexfile knexfile.ts migrate:latest` ou `npm run knex:migrate`

Executa os seeds (servem para popular o banco de dados com informações pré-definidas)
```
npm run knex:seed
```

Instação do CORS
```
npm install cors
npm install @types/cors -D
```
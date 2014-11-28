# championship

Gerenciador de campeonatos de futebol para o navegador. Cadastra times,
jogadores, partidas e diferentes formatos de competição (pontos corridos,
mata-mata, grupos + mata-mata). Acompanha partidas em andamento e mantém o
histórico para consulta posterior.

Aplicação 100% front-end. Estado persistido em `localStorage` do próprio
navegador. Pronta para hospedagem em GitHub Pages.

## Rotas

Públicas:

- `#/` — página inicial com atalhos
- `#/times` — lista de times
- `#/campeonatos` — lista de campeonatos
- `#/campeonatos/:id` — classificação e resumo de um campeonato
- `#/partidas/:id` — detalhe de uma partida (em construção)
- `#/importar` — importadores prontos (em construção)

Área admin:

- `#/admin` — painel
- `#/admin/times/novo` — cadastrar time
- `#/admin/times/:id` — editar time existente
- `#/admin/campeonatos/novo` — cadastrar campeonato e gerar calendário
- `#/admin/partidas/:id/scoreboard` — placar ao vivo (em construção)

## Formatos suportados

- **Pontos corridos** (`league`)
- **Pontos corridos com ida e volta** (`double-round-robin`) — Brasileirão Série A
- **Grupos + mata-mata** (`groups-knockout`) — Copa do Mundo
- **Mata-mata puro** (`knockout`)

## Como rodar

Dependências (Node + Bower):

```
npm install
bower install   # opcional, apenas para abrir o index.html direto sem bundle
```

Tarefas Grunt:

```
grunt           # lint + testes unitários
grunt test      # apenas testes unitários
grunt build    # gera dist/ com bundle.js
grunt verify    # hygiene + lint + testes + build + smoke do navegador
grunt deploy    # publica dist/ em gh-pages
```

A suíte de smoke (`test/smoke/`) carrega `dist/bundle.js` em jsdom e verifica
que o aplicativo de fato boota no navegador. Faz parte do `verify` rodado no
pre-push, de forma que push só acontece quando o site funciona.

## Estrutura

```
src/
  app/           runtime, router, controller e wire_routes
  classification/ cálculo de tabela e critérios de desempate
  collections/   coleções Backbone com persistência local
  models/        modelos Backbone para Team, Player, Championship, Match...
  persistence/   adaptadores de storage (memória e localStorage)
  scheduling/    geradores de round-robin, grupos, mata-mata e calendário
  views/         views Marionette + widgets reutilizáveis
  main.js        bootstrap do navegador
test/
  spec/          testes unitários (mocha + chai + sinon)
  smoke/         testes de fumaça do bundle em jsdom
  helpers/       infra de testes (dom + chai globals)
```

## Licença

MIT — veja `LICENSE`.

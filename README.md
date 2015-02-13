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
- `#/campeonatos/:id` — classificação, artilheiros e resumo do campeonato
- `#/partidas` — lista geral de partidas
- `#/partidas/:id` — detalhe da partida com tabs Linha do Tempo / Estatísticas
- `#/importar` — importadores prontos (em construção)

Área admin:

- `#/admin` — painel
- `#/admin/times/novo` — cadastrar time
- `#/admin/times/:id` — editar time existente
- `#/admin/campeonatos/novo` — cadastrar campeonato e gerar calendário
- `#/admin/partidas/:id/scoreboard` — placar ao vivo com botões de gol,
  cartão, substituição e comentário. Mudanças se propagam para outras abas
  via evento `storage` do navegador.

## Formatos suportados

- **Pontos corridos** (`league`)
- **Pontos corridos com ida e volta** (`double-round-robin`) — Brasileirão Série A
- **Grupos + mata-mata** (`groups-knockout`) — Copa do Mundo
- **Mata-mata puro** (`knockout`)

## Acompanhamento ao vivo

- Abra `#/admin/partidas/:id/scoreboard` em uma aba para operar como scorer.
- Abra `#/partidas/:id` em outra aba para acompanhar como torcedor.
- Gols, cartões, substituições e comentários registrados no scorer aparecem
  na linha do tempo da outra aba sem precisar atualizar.
- Para partidas finalizadas, os botões "Reviver (4×)" e "Reviver (16×)" no
  detalhe da partida reproduzem todos os eventos no ritmo original do jogo.

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

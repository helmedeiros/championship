# championship

Gerenciador de campeonatos de futebol para o navegador. Cadastra times,
jogadores, partidas e diferentes formatos de competição (pontos corridos,
mata-mata, grupos + mata-mata). Acompanha partidas em andamento e mantém o
histórico para consulta posterior.

Aplicação 100% front-end. Estado persistido em `localStorage` do próprio
navegador. Pronta para hospedagem em GitHub Pages.

## Rotas

Públicas:

- `#/` — página inicial com atalhos e últimos resultados
- `#/times` — lista de times
- `#/times/:id` — perfil do time com carreira, sparkline de últimos jogos e
  campeonatos disputados
- `#/campeonatos` — lista de campeonatos
- `#/campeonatos/:id` — classificação (com troféu para o líder, zonas de
  Libertadores e rebaixamento, sparkline de últimos jogos), artilheiros,
  ranking disciplinar e resumo do campeonato
- `#/partidas` — lista geral de partidas
- `#/partidas/:id` — detalhe da partida com tabs Linha do Tempo /
  Estatísticas e atalho para histórico de confrontos
- `#/h2h/:teamA/:teamB` — head-to-head entre dois times com resumo e lista
  de confrontos finalizados
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

## Estatísticas e histórico

- **Classificação**: tabela completa P / J / V / E / D / GP / GC / SG / % com
  sparkline SVG de últimos 5 jogos e zonas coloridas (Libertadores, rebaixamento).
- **Artilheiros** (`stats/top_scorers`): ranking por gols, suporta `limit`.
- **Disciplina** (`stats/cards_leaderboard`): ranking por cartões com vermelho
  contando como 2 na pontuação.
- **Head-to-head** (`stats/head_to_head`): vitórias/empates/derrotas e lista de
  confrontos entre dois times em qualquer mando.
- **Carreira de time** (`stats/team_record`): pontos, saldo e participações
  por campeonato somando todas as edições.

## Importadores prontos

A rota `#/importar` traz dois conjuntos pré-embutidos para popular a
aplicação em poucos cliques:

- **Copa do Mundo FIFA 2014** — 32 seleções, 64 partidas (48 de grupos + 16
  do mata-mata) com placares reais e narração completa de Brasil 1×7
  Alemanha e da final Alemanha 1×0 Argentina.
- **Brasileirão Série A 2014** — 20 clubes com seus estádios, e uma seleção
  de 15 partidas marcantes (rodada 38 completa + clássicos do ano).
- **Copa América 2015** — 12 seleções, 26 partidas cobrindo toda a fase de
  grupos (18 jogos) mais quartas, semis, disputa de 3º e a final entre
  Chile e Argentina, decidida nos pênaltis com o Chile campeão.

Cada importador traz **gols com autor, cartões e linha do tempo** anexados
às partidas (~470 eventos no total). Depois de importar, a tela do
campeonato mostra artilharia real (James Rodríguez 6 gols na Copa 2014;
Vargas e Guerrero empatados em 4 na Copa América 2015) e o ranking
disciplinar inclui os cartões marcantes (Pepe, Suárez, Cavani). A
linha do tempo de cada partida é populada com os gols, cartões e
comentários. Os arquivos `src/data/*_events.js` mantêm os eventos
separados do schedule para facilitar a manutenção.

Cada fixture é validado contra um JSON Schema (`src/importer/schema.js`)
via Ajv 0.6 antes de tocar o `localStorage`. A reimportação do mesmo
campeonato é bloqueada por padrão — o botão **Reimportar (substituir)**
aparece para forçar o overwrite. O cartão **Limpar tudo** apaga todo o
estado do navegador.

### Atualização silenciosa

Cada fixture carrega um campo `version` (integer). Toda vez que o app
inicia, `src/importer/auto_update.js` compara a `version` salva no
`localStorage` com a do código: se o cache local estiver atrasado, o
campeonato é apagado em cascata (championship + matches + match_events)
e reimportado silenciosamente, sem pedir ação ao usuário. O mesmo vale
para o campeonato demo seedado (`DEMO_VERSION` em `wire_routes.js`).

Quando o conteúdo de uma fixture mudar (gols adicionados, escala
corrigida, novo evento), basta incrementar o `version`. Na próxima
visita o cliente já vê os dados atualizados, sem precisar limpar
`localStorage` na mão.

Para adicionar um novo fixture: crie `src/data/seu_campeonato.js` exportando
o objeto `{championship, teams, matches}`, registre em
`src/importer/registry.js` e adicione um spec em
`test/spec/data/fixtures_spec.js` que rode o validator.

## Acompanhamento ao vivo

- Abra `#/admin/partidas/:id/scoreboard` em uma aba para operar como scorer.
- Abra `#/partidas/:id` em outra aba para acompanhar como torcedor.
- Gols, cartões, substituições e comentários registrados no scorer aparecem
  na linha do tempo da outra aba sem precisar atualizar.

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

## Compartilhar partida por link

Na página `#/partidas/:id` o botão **Copiar link** gera um endereço auto-
contido com o snapshot da partida e seus eventos codificados em base64
url-safe no próprio hash. O link tem o formato
`#/partidas/compartilhada/<token>` e abre normalmente em qualquer outro
navegador — não depende do `localStorage` da pessoa que recebe. Útil para
mandar um placar histórico ou um replay para alguém ver no celular.

A codificação acontece em `src/share/encode.js` (sem dependências externas).
O decoder é o mesmo módulo, usado pelo controller `matchShared` em
`src/app/wire_routes.js`.

## Bookmarklet "abrir scoreboard"

Para narradores que querem virar admin com 1 clique enquanto estão na
página da partida, há um bookmarklet em `src/share/bookmarklet.js`. Crie um
favorito com a URL devolvida por `bookmarklet.url()` e, estando em
`#/partidas/:id` (ou `compartilhada/:token`), clique no favorito: ele
marca `championship:role = 'admin'` e leva para o scoreboard da partida.

## Acessibilidade e idiomas

A interface tem suporte básico para leitores de tela e navegação por teclado:

- `role="main"`, `role="alert"` e `aria-live="polite"` nos containers principais
- `aria-label` em botões de ação do scorer e do modo admin
- Skip link "Pular para o conteúdo" oculto até receber foco
- Empty states com `role="status"` para anúncio automático
- Folha de estilo `@media print` esconde controles e prioriza tabelas

O seletor de idioma na home alterna entre **pt-br** (padrão) e **en**. A escolha
é persistida em `localStorage` na chave `championship:locale`. Novas chaves
podem ser adicionadas em `src/i18n/messages_pt_br.js` e
`src/i18n/messages_en.js`.

## Licença

MIT — veja `LICENSE`.

module.exports = (function () {
  'use strict';

  // Eventos da Copa do Mundo 2014 organizados por chave da partida.
  // Chave = HOME-AWAY-YYYY-MM-DD (data ISO do dia em UTC).
  // O fixture principal (world_cup_2014.js) anexa esses eventos a cada
  // match na hora da exportação, mantendo o arquivo de matches enxuto.

  return {

    // ===== Grupo A =====
    'BRA-CRO-2014-06-12': [
      { type: 'goal',   half: 1, minute: 11, player: 'Marcelo (CT)',
        text: '0x1 — gol contra de Marcelo abre a Copa' },
      { type: 'yellow', half: 1, minute: 27, player: 'Neymar' },
      { type: 'goal',   half: 1, minute: 29, player: 'Neymar',
        text: '1x1 Brasil' },
      { type: 'goal',   half: 2, minute: 26, player: 'Neymar',
        text: '2x1 Brasil — pênalti' },
      { type: 'goal',   half: 2, minute: 46, player: 'Oscar',
        text: '3x1 Brasil — fecha o placar' }
    ],
    'MEX-CMR-2014-06-13': [
      { type: 'yellow', half: 1, minute: 36, player: 'Assou-Ekotto' },
      { type: 'goal',   half: 2, minute: 16, player: 'Peralta',
        text: '1x0 México' }
    ],
    'BRA-MEX-2014-06-17': [
      { type: 'yellow', half: 1, minute: 25, player: 'Rafael Márquez' },
      { type: 'yellow', half: 2, minute: 25, player: 'Hulk' },
      { type: 'comment', half: 2, minute: 35,
        text: 'Ochoa faz defesas espetaculares e garante o empate' }
    ],
    'CMR-CRO-2014-06-18': [
      { type: 'goal',   half: 1, minute: 11, player: 'Olić',
        text: '0x1 Croácia' },
      { type: 'red',    half: 1, minute: 40, player: 'Alex Song',
        text: 'Cotovelada em Mandžukić' },
      { type: 'goal',   half: 2, minute:  3, player: 'Perišić',
        text: '0x2 Croácia' },
      { type: 'goal',   half: 2, minute: 16, player: 'Mandžukić',
        text: '0x3 Croácia' },
      { type: 'goal',   half: 2, minute: 28, player: 'Mandžukić',
        text: '0x4 Croácia' }
    ],
    'CMR-BRA-2014-06-23': [
      { type: 'goal',   half: 1, minute: 17, player: 'Neymar',
        text: '0x1 Brasil' },
      { type: 'goal',   half: 1, minute: 26, player: 'Matip',
        text: '1x1 Camarões' },
      { type: 'goal',   half: 1, minute: 35, player: 'Neymar',
        text: '1x2 Brasil' },
      { type: 'goal',   half: 2, minute:  4, player: 'Fred',
        text: '1x3 Brasil' },
      { type: 'goal',   half: 2, minute: 39, player: 'Fernandinho',
        text: '1x4 Brasil' }
    ],
    'CRO-MEX-2014-06-23': [
      { type: 'goal',   half: 2, minute: 27, player: 'Rafael Márquez',
        text: '0x1 México' },
      { type: 'goal',   half: 2, minute: 30, player: 'Guardado',
        text: '0x2 México' },
      { type: 'goal',   half: 2, minute: 37, player: 'Hernández',
        text: '0x3 México' },
      { type: 'goal',   half: 2, minute: 42, player: 'Perišić',
        text: '1x3 Croácia' }
    ],

    // ===== Grupo B =====
    'ESP-NED-2014-06-13': [
      { type: 'goal',   half: 1, minute: 27, player: 'Xabi Alonso',
        text: '1x0 Espanha — pênalti' },
      { type: 'goal',   half: 1, minute: 44, player: 'Van Persie',
        text: '1x1 Holanda — voadora histórica' },
      { type: 'goal',   half: 2, minute:  8, player: 'Robben',
        text: '1x2 Holanda' },
      { type: 'goal',   half: 2, minute: 19, player: 'De Vrij',
        text: '1x3 Holanda' },
      { type: 'goal',   half: 2, minute: 27, player: 'Van Persie',
        text: '1x4 Holanda' },
      { type: 'goal',   half: 2, minute: 35, player: 'Robben',
        text: '1x5 Holanda — humilhação dos atuais campeões' }
    ],
    'CHI-AUS-2014-06-13': [
      { type: 'goal',   half: 1, minute: 12, player: 'Sánchez',
        text: '1x0 Chile' },
      { type: 'goal',   half: 1, minute: 14, player: 'Valdivia',
        text: '2x0 Chile' },
      { type: 'goal',   half: 1, minute: 35, player: 'Cahill',
        text: '2x1 Austrália' },
      { type: 'goal',   half: 2, minute: 47, player: 'Beausejour',
        text: '3x1 Chile' }
    ],
    'AUS-NED-2014-06-18': [
      { type: 'goal',   half: 1, minute: 20, player: 'Robben',
        text: '0x1 Holanda' },
      { type: 'goal',   half: 1, minute: 21, player: 'Cahill',
        text: '1x1 Austrália — pintura' },
      { type: 'goal',   half: 2, minute:  9, player: 'Jedinak',
        text: '2x1 Austrália — pênalti' },
      { type: 'goal',   half: 2, minute: 13, player: 'Van Persie',
        text: '2x2 Holanda' },
      { type: 'goal',   half: 2, minute: 23, player: 'Depay',
        text: '2x3 Holanda' }
    ],
    'ESP-CHI-2014-06-18': [
      { type: 'goal',   half: 1, minute: 20, player: 'Vargas',
        text: '0x1 Chile' },
      { type: 'goal',   half: 1, minute: 43, player: 'Aránguiz',
        text: '0x2 Chile — Espanha eliminada' }
    ],
    'AUS-ESP-2014-06-23': [
      { type: 'goal',   half: 1, minute: 36, player: 'Villa',
        text: '0x1 Espanha' },
      { type: 'goal',   half: 2, minute: 24, player: 'Torres',
        text: '0x2 Espanha' },
      { type: 'goal',   half: 2, minute: 37, player: 'Mata',
        text: '0x3 Espanha' }
    ],
    'NED-CHI-2014-06-23': [
      { type: 'goal',   half: 2, minute: 32, player: 'Fer',
        text: '1x0 Holanda' },
      { type: 'goal',   half: 2, minute: 47, player: 'Depay',
        text: '2x0 Holanda' }
    ],

    // ===== Grupo C =====
    'COL-GRE-2014-06-14': [
      { type: 'goal',   half: 1, minute:  5, player: 'Armero',
        text: '1x0 Colômbia' },
      { type: 'goal',   half: 2, minute: 13, player: 'Gutiérrez',
        text: '2x0 Colômbia' },
      { type: 'goal',   half: 2, minute: 48, player: 'James Rodríguez',
        text: '3x0 Colômbia' }
    ],
    'CIV-JPN-2014-06-14': [
      { type: 'goal',   half: 1, minute: 16, player: 'Honda',
        text: '0x1 Japão' },
      { type: 'goal',   half: 2, minute: 19, player: 'Bony',
        text: '1x1 Costa do Marfim' },
      { type: 'goal',   half: 2, minute: 21, player: 'Gervinho',
        text: '2x1 Costa do Marfim' }
    ],
    'COL-CIV-2014-06-19': [
      { type: 'goal',   half: 2, minute: 19, player: 'James Rodríguez',
        text: '1x0 Colômbia' },
      { type: 'goal',   half: 2, minute: 25, player: 'Quintero',
        text: '2x0 Colômbia' },
      { type: 'goal',   half: 2, minute: 28, player: 'Gervinho',
        text: '2x1 Costa do Marfim' }
    ],
    'JPN-GRE-2014-06-19': [
      { type: 'red',    half: 1, minute: 38, player: 'Katsouranis',
        text: '2º amarelo' },
      { type: 'comment', half: 2, minute: 20,
        text: 'Japão pressiona com 11x10 mas Grécia se fecha' }
    ],
    'COL-JPN-2014-06-24': [
      { type: 'goal',   half: 1, minute: 17, player: 'James Rodríguez',
        text: '1x0 Colômbia' },
      { type: 'goal',   half: 1, minute: 45, player: 'Okazaki',
        text: '1x1 Japão' },
      { type: 'goal',   half: 2, minute: 10, player: 'Jackson Martínez',
        text: '2x1 Colômbia' },
      { type: 'goal',   half: 2, minute: 37, player: 'James Rodríguez',
        text: '3x1 Colômbia' },
      { type: 'goal',   half: 2, minute: 45, player: 'Jackson Martínez',
        text: '4x1 Colômbia' }
    ],
    'GRE-CIV-2014-06-24': [
      { type: 'goal',   half: 1, minute: 42, player: 'Samaras',
        text: '1x0 Grécia' },
      { type: 'goal',   half: 2, minute: 29, player: 'Bony',
        text: '1x1 Costa do Marfim' },
      { type: 'goal',   half: 2, minute: 48, player: 'Samaras',
        text: '2x1 Grécia — pênalti no fim, classifica' }
    ],

    // ===== Grupo D =====
    'URU-CRC-2014-06-14': [
      { type: 'goal',   half: 1, minute: 24, player: 'Cavani',
        text: '1x0 Uruguai — pênalti' },
      { type: 'goal',   half: 2, minute:  9, player: 'Joel Campbell',
        text: '1x1 Costa Rica' },
      { type: 'goal',   half: 2, minute: 12, player: 'Duarte',
        text: '1x2 Costa Rica' },
      { type: 'goal',   half: 2, minute: 39, player: 'Ureña',
        text: '1x3 Costa Rica — virada histórica' }
    ],
    'ENG-ITA-2014-06-14': [
      { type: 'goal',   half: 1, minute: 35, player: 'Marchisio',
        text: '0x1 Itália' },
      { type: 'goal',   half: 1, minute: 37, player: 'Sturridge',
        text: '1x1 Inglaterra' },
      { type: 'goal',   half: 2, minute:  5, player: 'Balotelli',
        text: '1x2 Itália' }
    ],
    'URU-ENG-2014-06-19': [
      { type: 'goal',   half: 1, minute: 39, player: 'Suárez',
        text: '1x0 Uruguai' },
      { type: 'goal',   half: 2, minute: 30, player: 'Rooney',
        text: '1x1 Inglaterra' },
      { type: 'goal',   half: 2, minute: 40, player: 'Suárez',
        text: '2x1 Uruguai' }
    ],
    'ITA-CRC-2014-06-20': [
      { type: 'goal',   half: 1, minute: 44, player: 'Bryan Ruiz',
        text: '0x1 Costa Rica — vitória dos ticos sobre o vice 2010' }
    ],
    'ITA-URU-2014-06-24': [
      { type: 'red',    half: 1, minute: 59, player: 'Marchisio' },
      { type: 'comment', half: 2, minute: 34,
        text: 'Suárez morde Chiellini — mordida que rendeu suspensão de 9 jogos' },
      { type: 'goal',   half: 2, minute: 36, player: 'Godín',
        text: '0x1 Uruguai — Itália eliminada' }
    ],
    'CRC-ENG-2014-06-24': [
      { type: 'yellow', half: 2, minute: 38, player: 'Lallana' },
      { type: 'comment', half: 2, minute: 47,
        text: 'Inglaterra termina sem vitórias; Costa Rica passa em 1º' }
    ],

    // ===== Grupo E =====
    'SUI-ECU-2014-06-15': [
      { type: 'goal',   half: 1, minute: 22, player: 'Enner Valencia',
        text: '0x1 Equador' },
      { type: 'goal',   half: 2, minute:  3, player: 'Mehmedi',
        text: '1x1 Suíça' },
      { type: 'goal',   half: 2, minute: 48, player: 'Seferović',
        text: '2x1 Suíça — no último lance' }
    ],
    'FRA-HON-2014-06-15': [
      { type: 'red',    half: 1, minute: 43, player: 'Palacios' },
      { type: 'goal',   half: 1, minute: 45, player: 'Benzema',
        text: '1x0 França — pênalti' },
      { type: 'goal',   half: 2, minute:  3, player: 'Valladares (CT)',
        text: '2x0 França' },
      { type: 'goal',   half: 2, minute: 27, player: 'Benzema',
        text: '3x0 França' }
    ],
    'SUI-FRA-2014-06-20': [
      { type: 'goal',   half: 1, minute: 17, player: 'Giroud',
        text: '0x1 França' },
      { type: 'goal',   half: 1, minute: 18, player: 'Matuidi',
        text: '0x2 França' },
      { type: 'goal',   half: 1, minute: 40, player: 'Valbuena',
        text: '0x3 França' },
      { type: 'goal',   half: 2, minute: 22, player: 'Sissoko',
        text: '0x4 França' },
      { type: 'goal',   half: 2, minute: 36, player: 'Džemaili',
        text: '1x4 Suíça' },
      { type: 'goal',   half: 2, minute: 39, player: 'Benzema',
        text: '1x5 França' },
      { type: 'goal',   half: 2, minute: 42, player: 'Xhaka',
        text: '2x5 Suíça' }
    ],
    'HON-ECU-2014-06-20': [
      { type: 'goal',   half: 1, minute: 31, player: 'Costly',
        text: '1x0 Honduras' },
      { type: 'goal',   half: 1, minute: 34, player: 'Enner Valencia',
        text: '1x1 Equador' },
      { type: 'goal',   half: 2, minute: 20, player: 'Enner Valencia',
        text: '1x2 Equador' }
    ],
    'HON-SUI-2014-06-25': [
      { type: 'goal',   half: 1, minute:  6, player: 'Shaqiri',
        text: '0x1 Suíça' },
      { type: 'goal',   half: 1, minute: 31, player: 'Shaqiri',
        text: '0x2 Suíça' },
      { type: 'goal',   half: 2, minute: 26, player: 'Shaqiri',
        text: '0x3 Suíça — hat-trick e classificação' }
    ],
    'ECU-FRA-2014-06-25': [
      { type: 'red',    half: 1, minute: 50, player: 'Antonio Valencia' },
      { type: 'comment', half: 2, minute: 47,
        text: 'França passa em 1º; Equador eliminado' }
    ],

    // ===== Grupo F =====
    'ARG-BIH-2014-06-15': [
      { type: 'goal',   half: 1, minute:  3, player: 'Kolasinac (CT)',
        text: '1x0 Argentina — gol contra cedo' },
      { type: 'goal',   half: 2, minute: 20, player: 'Messi',
        text: '2x0 Argentina — golaço' },
      { type: 'goal',   half: 2, minute: 40, player: 'Ibišević',
        text: '2x1 Bósnia' }
    ],
    'IRN-NGA-2014-06-16': [
      { type: 'yellow', half: 1, minute: 27, player: 'Pouladi' },
      { type: 'comment', half: 2, minute: 47,
        text: 'Jogo travado; primeiro 0x0 da Copa' }
    ],
    'ARG-IRN-2014-06-21': [
      { type: 'goal',   half: 2, minute: 46, player: 'Messi',
        text: '1x0 Argentina — pintura no apagar das luzes' }
    ],
    'NGA-BIH-2014-06-21': [
      { type: 'goal',   half: 1, minute: 29, player: 'Odemwingie',
        text: '1x0 Nigéria' }
    ],
    'NGA-ARG-2014-06-25': [
      { type: 'goal',   half: 1, minute:  3, player: 'Messi',
        text: '0x1 Argentina' },
      { type: 'goal',   half: 1, minute:  4, player: 'Musa',
        text: '1x1 Nigéria' },
      { type: 'goal',   half: 1, minute: 46, player: 'Messi',
        text: '1x2 Argentina' },
      { type: 'goal',   half: 2, minute:  2, player: 'Musa',
        text: '2x2 Nigéria' },
      { type: 'goal',   half: 2, minute:  5, player: 'Rojo',
        text: '2x3 Argentina' }
    ],
    'BIH-IRN-2014-06-25': [
      { type: 'goal',   half: 1, minute: 23, player: 'Džeko',
        text: '1x0 Bósnia' },
      { type: 'goal',   half: 2, minute: 14, player: 'Pjanić',
        text: '2x0 Bósnia' },
      { type: 'goal',   half: 2, minute: 37, player: 'Ghoochannejhad',
        text: '2x1 Irã' },
      { type: 'goal',   half: 2, minute: 38, player: 'Vršajević',
        text: '3x1 Bósnia — única vitória bósnia em Copas' }
    ],

    // ===== Grupo G =====
    'GER-POR-2014-06-16': [
      { type: 'goal',   half: 1, minute: 12, player: 'Müller',
        text: '1x0 Alemanha — pênalti' },
      { type: 'goal',   half: 1, minute: 32, player: 'Hummels',
        text: '2x0 Alemanha' },
      { type: 'red',    half: 1, minute: 37, player: 'Pepe',
        text: 'Cabeçada em Müller' },
      { type: 'goal',   half: 1, minute: 46, player: 'Müller',
        text: '3x0 Alemanha' },
      { type: 'goal',   half: 2, minute: 33, player: 'Müller',
        text: '4x0 Alemanha — hat-trick' }
    ],
    'GHA-USA-2014-06-16': [
      { type: 'goal',   half: 1, minute:  1, player: 'Dempsey',
        text: '0x1 EUA' },
      { type: 'goal',   half: 2, minute: 37, player: 'André Ayew',
        text: '1x1 Gana' },
      { type: 'goal',   half: 2, minute: 41, player: 'Brooks',
        text: '1x2 EUA' }
    ],
    'GER-GHA-2014-06-21': [
      { type: 'goal',   half: 2, minute:  6, player: 'Götze',
        text: '1x0 Alemanha' },
      { type: 'goal',   half: 2, minute:  9, player: 'André Ayew',
        text: '1x1 Gana' },
      { type: 'goal',   half: 2, minute: 18, player: 'Asamoah Gyan',
        text: '1x2 Gana' },
      { type: 'goal',   half: 2, minute: 26, player: 'Klose',
        text: '2x2 Alemanha — Klose iguala Ronaldo' }
    ],
    'USA-POR-2014-06-22': [
      { type: 'goal',   half: 1, minute:  5, player: 'Nani',
        text: '0x1 Portugal' },
      { type: 'goal',   half: 2, minute: 19, player: 'Jermaine Jones',
        text: '1x1 EUA' },
      { type: 'goal',   half: 2, minute: 36, player: 'Dempsey',
        text: '2x1 EUA' },
      { type: 'goal',   half: 2, minute: 50, player: 'Varela',
        text: '2x2 Portugal — empate no apagar das luzes' }
    ],
    'USA-GER-2014-06-26': [
      { type: 'goal',   half: 2, minute: 10, player: 'Müller',
        text: '0x1 Alemanha' }
    ],
    'POR-GHA-2014-06-26': [
      { type: 'goal',   half: 1, minute: 31, player: 'John Boye (CT)',
        text: '1x0 Portugal — gol contra' },
      { type: 'goal',   half: 2, minute: 12, player: 'Asamoah Gyan',
        text: '1x1 Gana' },
      { type: 'goal',   half: 2, minute: 35, player: 'Cristiano Ronaldo',
        text: '2x1 Portugal — único gol de CR7 na Copa' }
    ],

    // ===== Grupo H =====
    'BEL-ALG-2014-06-17': [
      { type: 'goal',   half: 1, minute: 24, player: 'Feghouli',
        text: '0x1 Argélia — pênalti' },
      { type: 'goal',   half: 2, minute: 25, player: 'Fellaini',
        text: '1x1 Bélgica' },
      { type: 'goal',   half: 2, minute: 35, player: 'Mertens',
        text: '2x1 Bélgica' }
    ],
    'RUS-KOR-2014-06-17': [
      { type: 'goal',   half: 2, minute: 23, player: 'Lee Keun-Ho',
        text: '0x1 Coreia do Sul' },
      { type: 'goal',   half: 2, minute: 29, player: 'Kerzhakov',
        text: '1x1 Rússia' }
    ],
    'BEL-RUS-2014-06-22': [
      { type: 'goal',   half: 2, minute: 43, player: 'Origi',
        text: '1x0 Bélgica — no fim, classifica' }
    ],
    'KOR-ALG-2014-06-22': [
      { type: 'goal',   half: 1, minute: 26, player: 'Slimani',
        text: '0x1 Argélia' },
      { type: 'goal',   half: 1, minute: 28, player: 'Halliche',
        text: '0x2 Argélia' },
      { type: 'goal',   half: 1, minute: 38, player: 'Djabou',
        text: '0x3 Argélia' },
      { type: 'goal',   half: 2, minute:  5, player: 'Son Heung-min',
        text: '1x3 Coreia' },
      { type: 'goal',   half: 2, minute: 17, player: 'Yacine Brahimi',
        text: '1x4 Argélia' },
      { type: 'goal',   half: 2, minute: 27, player: 'Koo Ja-cheol',
        text: '2x4 Coreia' }
    ],
    'KOR-BEL-2014-06-26': [
      { type: 'red',    half: 1, minute: 46, player: 'Steven Defour' },
      { type: 'goal',   half: 2, minute: 33, player: 'Vertonghen',
        text: '0x1 Bélgica — 100% de aproveitamento' }
    ],
    'ALG-RUS-2014-06-26': [
      { type: 'goal',   half: 1, minute:  6, player: 'Kokorin',
        text: '0x1 Rússia' },
      { type: 'goal',   half: 2, minute: 15, player: 'Slimani',
        text: '1x1 Argélia — passa à segunda fase' }
    ],

    // ===== Oitavas de Final =====
    'BRA-CHI-2014-06-28': [
      { type: 'goal',   half: 1, minute: 18, player: 'David Luiz',
        text: '1x0 Brasil' },
      { type: 'goal',   half: 1, minute: 32, player: 'Sánchez',
        text: '1x1 Chile' },
      { type: 'comment', half: 4, minute: 30,
        text: 'Pinilla bate na trave; Brasil vence nos pênaltis 3x2' }
    ],
    'COL-URU-2014-06-28': [
      { type: 'goal',   half: 1, minute: 28, player: 'James Rodríguez',
        text: '1x0 Colômbia — voleio histórico' },
      { type: 'goal',   half: 2, minute:  5, player: 'James Rodríguez',
        text: '2x0 Colômbia' }
    ],
    'NED-MEX-2014-06-29': [
      { type: 'goal',   half: 2, minute:  3, player: 'Giovani dos Santos',
        text: '0x1 México' },
      { type: 'goal',   half: 2, minute: 43, player: 'Sneijder',
        text: '1x1 Holanda' },
      { type: 'goal',   half: 2, minute: 49, player: 'Huntelaar',
        text: '2x1 Holanda — pênalti polêmico no fim' }
    ],
    'CRC-GRE-2014-06-29': [
      { type: 'goal',   half: 2, minute:  7, player: 'Bryan Ruiz',
        text: '1x0 Costa Rica' },
      { type: 'red',    half: 2, minute: 21, player: 'Óscar Duarte' },
      { type: 'goal',   half: 2, minute: 46, player: 'Papastathopoulos',
        text: '1x1 Grécia — empate no apagar das luzes' },
      { type: 'comment', half: 4, minute: 30,
        text: 'Navas pega pênalti; Costa Rica vence 5x3 e vai às quartas' }
    ],
    'FRA-NGA-2014-06-30': [
      { type: 'goal',   half: 2, minute: 34, player: 'Pogba',
        text: '1x0 França' },
      { type: 'goal',   half: 2, minute: 47, player: 'Yobo (CT)',
        text: '2x0 França — gol contra' }
    ],
    'GER-ALG-2014-06-30': [
      { type: 'goal',   half: 3, minute:  2, player: 'Schürrle',
        text: '1x0 Alemanha — gol na prorrogação' },
      { type: 'goal',   half: 4, minute: 30, player: 'Özil',
        text: '2x0 Alemanha' },
      { type: 'goal',   half: 4, minute: 31, player: 'Djabou',
        text: '2x1 Argélia — no apagar das luzes' }
    ],
    'ARG-SUI-2014-07-01': [
      { type: 'goal',   half: 3, minute: 28, player: 'Di María',
        text: '1x0 Argentina — gol decisivo perto do fim da prorrogação' }
    ],
    'BEL-USA-2014-07-01': [
      { type: 'comment', half: 2, minute: 45,
        text: 'Tim Howard faz 16 defesas — recorde da Copa' },
      { type: 'goal',   half: 3, minute:  3, player: 'De Bruyne',
        text: '1x0 Bélgica' },
      { type: 'goal',   half: 3, minute: 15, player: 'Lukaku',
        text: '2x0 Bélgica' },
      { type: 'goal',   half: 4, minute: 17, player: 'Julian Green',
        text: '2x1 EUA' }
    ],

    // ===== Semifinal — Brasil 1×7 Alemanha =====
    'BRA-GER-2014-07-08': [
      { type: 'kickoff',   half: 1, minute:  0, text: 'Início da partida' },
      { type: 'goal',      half: 1, minute: 11, player: 'Müller',
        text: '0x1 Alemanha' },
      { type: 'goal',      half: 1, minute: 23, player: 'Klose',
        text: '0x2 Alemanha — Klose maior artilheiro de copas' },
      { type: 'goal',      half: 1, minute: 24, player: 'Kroos',
        text: '0x3 Alemanha' },
      { type: 'goal',      half: 1, minute: 26, player: 'Kroos',
        text: '0x4 Alemanha' },
      { type: 'goal',      half: 1, minute: 29, player: 'Khedira',
        text: '0x5 Alemanha' },
      { type: 'half_time', half: 1, minute: 47, text: 'Intervalo' },
      { type: 'goal',      half: 2, minute: 24, player: 'Schürrle',
        text: '0x6 Alemanha' },
      { type: 'goal',      half: 2, minute: 34, player: 'Schürrle',
        text: '0x7 Alemanha' },
      { type: 'goal',      half: 2, minute: 45, player: 'Oscar',
        text: '1x7 Brasil — gol de honra' },
      { type: 'full_time', half: 2, minute: 47, text: 'Fim de jogo' }
    ],

    // ===== Final — Alemanha 1×0 Argentina =====
    'GER-ARG-2014-07-13': [
      { type: 'kickoff',   half: 1, minute:  0, text: 'Início da final' },
      { type: 'half_time', half: 1, minute: 47, text: 'Intervalo' },
      { type: 'goal',      half: 3, minute: 23, player: 'Götze',
        text: 'Götze marca aos 113 — Alemanha campeã' },
      { type: 'full_time', half: 4, minute: 30, text: 'Alemanha tetracampeã!' }
    ]

  };
}());

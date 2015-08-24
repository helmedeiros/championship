module.exports = (function () {
  'use strict';

  // JSON Schema (draft-04) para fixtures importáveis.

  return {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    title: 'championship-fixture',
    type: 'object',
    required: ['championship', 'teams', 'matches'],
    properties: {
      championship: {
        type: 'object',
        required: ['id', 'name', 'season', 'format'],
        properties: {
          id:          { type: 'string', minLength: 1 },
          name:        { type: 'string', minLength: 1 },
          season:      { type: 'integer', minimum: 1900, maximum: 2100 },
          country:     { type: 'string' },
          version:     { type: 'integer', minimum: 1 },
          format: {
            type: 'string',
            'enum': ['league', 'double-round-robin', 'groups-knockout', 'knockout']
          },
          tiebreakers: { type: 'array', items: { type: 'string' } }
        }
      },
      teams: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id:        { type: 'string', minLength: 1 },
            name:      { type: 'string', minLength: 1 },
            'short':   { type: 'string' },
            city:      { type: 'string' },
            stadium:   { type: 'string' },
            foundedAt: { type: 'integer' },
            colors:    { type: 'array', items: { type: 'string' } }
          }
        }
      },
      matches: {
        type: 'array',
        items: {
          type: 'object',
          required: ['home', 'away'],
          properties: {
            id:        { type: 'string' },
            home:      { type: 'string', minLength: 1 },
            away:      { type: 'string', minLength: 1 },
            kickoff:   { type: 'string' },
            stadium:   { type: 'string' },
            round:     { type: 'integer' },
            group:     { type: ['string', 'null'] },
            status: {
              type: 'string',
              'enum': ['scheduled', 'live', 'half', 'finished', 'postponed']
            },
            homeScore: { type: 'integer', minimum: 0 },
            awayScore: { type: 'integer', minimum: 0 },
            events: {
              type: 'array',
              items: {
                type: 'object',
                required: ['type'],
                properties: {
                  type: {
                    type: 'string',
                    'enum': [
                      'kickoff', 'goal', 'own_goal', 'yellow', 'red',
                      'sub', 'var', 'comment', 'half_time', 'full_time'
                    ]
                  },
                  half:   { type: 'integer', minimum: 1, maximum: 4 },
                  minute: { type: 'integer', minimum: 0, maximum: 120 },
                  player: { type: ['string', 'null'] },
                  text:   { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  };
}());

import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {
  @ApiProperty({ example: 1, description: 'Pokemon unique ID' })
  id: number;

  @ApiProperty({
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
    description: 'Pokemon image URL',
  })
  img: string;

  @ApiProperty({ example: 'bulbasaur', description: 'Pokemon name' })
  name: string;

  @ApiProperty({
    type: 'array',
    description: 'Pokemon stats array',
    example: [
      {
        stat: { url: 'https://pokeapi.co/api/v2/stat/1/', name: 'hp' },
        effort: 0,
        base_stat: 45,
      },
      {
        stat: { url: 'https://pokeapi.co/api/v2/stat/6/', name: 'speed' },
        effort: 0,
        base_stat: 45,
      },
      {
        stat: { url: 'https://pokeapi.co/api/v2/stat/2/', name: 'attack' },
        effort: 0,
        base_stat: 49,
      },
      {
        stat: { url: 'https://pokeapi.co/api/v2/stat/3/', name: 'defense' },
        effort: 0,
        base_stat: 49,
      },
      {
        stat: {
          url: 'https://pokeapi.co/api/v2/stat/4/',
          name: 'special-attack',
        },
        effort: 1,
        base_stat: 65,
      },
      {
        stat: {
          url: 'https://pokeapi.co/api/v2/stat/5/',
          name: 'special-defense',
        },
        effort: 0,
        base_stat: 65,
      },
      {
        stat: { url: '', name: 'height' },
        effort: 0,
        base_stat: 7,
      },
      {
        stat: { url: '', name: 'weight' },
        effort: 0,
        base_stat: 69,
      },
    ],
    items: {
      type: 'object',
      properties: {
        base_stat: { type: 'number', example: 45 },
        effort: { type: 'number', example: 0 },
        stat: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'hp' },
            url: {
              type: 'string',
              example: 'https://pokeapi.co/api/v2/stat/1/',
            },
          },
        },
      },
    },
  })
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];

  @ApiProperty({
    type: 'array',
    description: 'Pokemon types array',
    example: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      },
      {
        slot: 2,
        type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      },
    ],
    items: {
      type: 'object',
      properties: {
        slot: { type: 'number', example: 1 },
        type: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'grass' },
            url: {
              type: 'string',
              example: 'https://pokeapi.co/api/v2/type/12/',
            },
          },
        },
      },
    },
  })
  types: { slot: number; type: { name: string; url: string } }[];
}

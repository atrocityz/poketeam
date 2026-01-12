import { ApiProperty } from '@nestjs/swagger';
import { PokemonDto } from './pokemon.dto';

export class TeamDto {
  @ApiProperty({
    type: [PokemonDto],
    description: 'Array of Pokémon objects in the team',
    example: [
      {
        id: 1,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
        name: 'bulbasaur',
        stats: [
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
          { stat: { url: '', name: 'height' }, effort: 0, base_stat: 7 },
          { stat: { url: '', name: 'weight' }, effort: 0, base_stat: 69 },
        ],
        types: [
          {
            slot: 1,
            type: { url: 'https://pokeapi.co/api/v2/type/12/', name: 'grass' },
          },
          {
            slot: 2,
            type: { url: 'https://pokeapi.co/api/v2/type/4/', name: 'poison' },
          },
        ],
      },
    ],
  })
  pokemons: PokemonDto[];
}

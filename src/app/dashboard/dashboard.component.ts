import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Pokedex } from '../pokedex';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  pokemons: Pokedex;
 
  constructor(private pokemonService: PokemonService) { }
 
  ngOnInit() {
    this.getPokemons();
  }
 
  getPokemons(): void {
    this.pokemonService.cachedDex
      .subscribe((response) => {
        this.pokemons = response;
        this.pokemons.pokemon_entries = this.pokemons.pokemon_entries.slice(0, 4);
        console.log('got pokedex', this.pokemons);
      })
  }
}
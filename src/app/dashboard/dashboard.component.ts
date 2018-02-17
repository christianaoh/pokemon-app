import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Pokedex, PokemonEntry } from '../pokedex';
import { MessageService } from '../message.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  pokedex: Pokedex;
  top: PokemonEntry[];
  displayEntries: Pokemon[] = [];
 
  constructor(private pokemonService: PokemonService, private messageService: MessageService) { }
 
  ngOnInit() {
    this.getTopPokemon();
  }

  setModuleClass(type) {
    let classes = {
      normal: type == 'normal',
      fire: type == 'fire',
      fighting: type == 'fighting',
      water: type == 'water',
      flying: type == 'flying',
      grass: type == 'grass',
      poison: type == 'poison',
      electric: type == 'electric',
      ground: type == 'ground',
      psychic: type == 'psychic',
      rock: type == 'rock',
      ice: type == 'ice',
      bug: type == 'bug',
      dragon: type == 'dragon',
      ghost: type == 'ghost',
      dark: type == 'dark',
      steel: type == 'steel',
      fairy: type == 'fairy',
    }
    return classes;
  }
 
  getTopPokemon(): void {
    this.pokemonService.getPokedex()
      .subscribe((response) => {
        this.pokedex = response;
        this.top = Object.assign([], this.pokedex.pokemon_entries);
        this.top = this.top.slice(0, 4);
        console.log('top pokemon', this.top);
        console.log('got pokedex', this.pokedex);
        for (var i = 0; i < this.top.length; i++) {
          this.pokemonService.getPokemon(this.top[i].entry_number).subscribe(response => {
            this.displayEntries.push(response);
          });
        }
        this.messageService.add('Created display entries array');
        console.log('display entries', this.displayEntries);
      });
  }
}
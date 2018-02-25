import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Pokedex, PokemonEntry } from '../pokedex';
import { MessageService } from '../message.service';
import {Observable} from 'rxjs/Rx';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  pokedex: Pokedex;
  top: PokemonEntry[];
  displayEntries: Pokemon[] = [];
  loading: boolean = false;
 
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
    this.loading = true;
    this.pokemonService.getPokedex()
      .subscribe((response) => {
        this.pokedex = response;
        this.top = Object.assign([], this.pokedex.pokemon_entries);
        this.top = this.top.slice(0, 4);
        let obs = [];
        console.log('top pokemon', this.top);
        console.log('got pokedex', this.pokedex);
        for (var i = 0; i < this.top.length; i++) {
          obs.push(this.pokemonService.getPokemon(this.top[i].entry_number));
        }
        Observable.forkJoin(obs).subscribe((response:Pokemon[]) => {
          this.displayEntries = response;
          this.displayEntries.sort((a,b) => {return a.id - b.id;}); //sort by id because api returns each call at a random time :(
          this.loading = false;
        })
        this.messageService.add('Created display entries array');
        console.log('display entries', this.displayEntries);
      });
  }
}
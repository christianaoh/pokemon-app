import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Pokedex } from '../pokedex';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokedex: Pokedex;
  loading: boolean = true;
  gens = [1,2,3,4,5,6, 'all'];
  selected;
  minEntry: number;
  maxEntry: number;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.minEntry = 0;
    this.maxEntry = 150;
    this.selected = 1;
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokedex().subscribe(response => {
      this.pokedex = response;
      this.loading = false;
    });
  }

  updateGen(selected) {
    switch(selected) {
      case '1':
        this.minEntry = 0;
        this.maxEntry = 151;
        break;
      case '2':
        this.minEntry = 152;
        this.maxEntry = 251;
        break;
      case '3':
        this.minEntry = 252;
        this.maxEntry = 386;
        break;
      case '4':
        this.minEntry = 387;
        this.maxEntry = 494;
        break;
      case '5':
        this.minEntry = 495;
        this.maxEntry = 649;
        break;
      case '6':
        this.minEntry = 650;
        this.maxEntry = 720;
        break;
      case 'all':
        this.minEntry = 0;
        this.maxEntry = 720;
        break;
      default:
    }
  }

}

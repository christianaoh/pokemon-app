import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemon';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokedex } from './pokedex';

@Injectable()
export class PokemonService {

  public cachedDex: Observable<Pokedex>;

  getPokemon(id: number): Observable<Pokemon> {
    this.messageService.add(`PokemonService: fetched pokemon number=${id}`);
    return of(POKEMONS.find(pokemon  => pokemon.id === id));
  }

  //get pokemon from server
  // getPokemons(): Observable<Pokedex> {
  //   this.messageService.add('PokemonService: fetched pokemon');
  //   if (this.cachedPokedex == undefined) {
  //     this.cachedPokedex = this.http.get<Pokedex>(this.pokemonUrl);
  //   }
  //   return this.cachedPokedex;
  // }

  private pokemonUrl = 'https://pokeapi.co/api/v2/pokedex/1/'
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { 
    console.log('what the fuck');
    if (this.cachedDex) {
      return;
    } else {
      this.cachedDex = this.http.get<Pokedex>(this.pokemonUrl);
    }
    //this.cachedPokedex = this.http.get<Pokedex>(this.pokemonUrl);
  }

}


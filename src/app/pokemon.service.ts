import { Injectable } from '@angular/core';
import { Pokemon, Type } from './pokemon';
import { POKEMONS } from './mock-pokemon';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokedex, PokemonEntry } from './pokedex';

@Injectable()
export class PokemonService {

  public dex: Pokedex;
  public obs: Observable<Pokedex>;
  public entry : PokemonEntry;
  public pokemon: Observable<Pokemon>;
  public entries: Pokemon[];
  public top: PokemonEntry[];

  getPokemon(id: number): Observable<Pokemon> {
    this.messageService.add('getting data from api for pokemon #' + id + '...');
    this.pokemon = this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}/`).do(response => {
      this.sortTypes(response);
      console.log('got pokemon ' + response.name, response);
      this.messageService.add('got data!');
    })
    return this.pokemon;
  }

  sortTypes(poke): void {
    if (poke.types.length > 1) {
      poke.types.sort((a: Type, b: Type) => {return a.slot - b.slot});
      //sorting for types data that returns in a random order
    }
  }

  //get pokemon from server
  getPokedex(): Observable<Pokedex> {
    if (this.dex) {
      return Observable.of(this.dex);
    } else if (this.obs) {
      return this.obs;
    } else {
      this.messageService.add('no dex found. getting dex...');
      this.obs = this.http.get<Pokedex>(this.pokemonUrl);
      this.obs.subscribe(response => {
        this.messageService.add('cached dex!');
        this.dex = response;
      });
      return this.obs;
    };
  };

  getDisplayEntries(): Observable<Pokemon[]> {
    return new Observable<Pokemon[]>((observer)=>{
      if(this.entries) {
        observer.next(this.entries);
      } else {
        this.messageService.add('no top pokemon found. getting top pokemon...');
        this.top = Object.assign([], this.dex.pokemon_entries);
        this.top = this.top.slice(0,4);
        let obs = [];
        console.log('top pokemon', this.top);
        this.messageService.add('got top pokemon!');
        for (var i = 0; i < this.top.length; i++) {
          obs.push(this.getPokemon(this.top[i].entry_number));
        }
        forkJoin(obs).subscribe((response:Pokemon[]) => {
          this.entries = response;
          this.messageService.add('cached top pokemon!');
          this.entries.sort((a,b) => {return a.id - b.id;}); //sort by id
          this.messageService.add('Created display entries array');
          console.log('display entries', this.entries);
          observer.next(this.entries);
        })
      }
    })
  }

  private pokemonUrl = 'https://pokeapi.co/api/v2/pokedex/1/'
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { 
    console.log('hello');
  }

}


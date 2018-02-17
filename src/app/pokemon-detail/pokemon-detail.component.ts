import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { PokemonEntry } from '../pokedex';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon: Pokemon;
  
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon(): void {
    const num = +this.route.snapshot.paramMap.get('entry_number');
    this.pokemonService.getPokemon(num).subscribe(response => {
      this.pokemon = response;
      // if (this.pokemon.types.length > 1) {
      //   this.pokemon.types.sort((a: Type, b: Type) => {return a.slot - b.slot});
      //   //sorting for data that returns in a random order
      // }
    });
  }

  goBack(): void {
    this.location.back();
  }

}

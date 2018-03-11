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
  loading: boolean = true;
  
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
      this.loading = false;
    });
  }

  goBack(): void {
    this.location.back();
  }

}

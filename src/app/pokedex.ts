export class Language {
    url: string;
    name: string;
}

export class Description {
    description: string;
    language: Language;
}

export class PokemonSpecies {
    url: string;
    name: string;
}

export class PokemonEntry {
    entry_number: number;
    pokemon_species: PokemonSpecies;
}

export class Language2 {
    url: string;
    name: string;
}

export class Name {
    name: string;
    language: Language2;
}

export class Pokedex {
    name: string;
    region?: any;
    version_groups: any[];
    is_main_series: boolean;
    descriptions: Description[];
    pokemon_entries: PokemonEntry[];
    id: number;
    names: Name[];
}
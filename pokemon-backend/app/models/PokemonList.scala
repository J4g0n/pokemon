package models

import play.api.libs.json._

/**
  * Created by sandman on 9/4/16.
  */
case class PokemonList(nbPokemons: Int, pokemons: List[PokemonNameAndId])

object PokemonList {

  //implicit val pokemonListFormat = Json.format[PokemonList]

}


case class PokemonNameAndId(name: String, id: String)

object PokemonNameAndId {
  implicit val pokemonNameAndIdWrites = new Writes[PokemonNameAndId] {
    def writes(pokemonNameAndId: PokemonNameAndId) = Json.obj(
      "name" -> pokemonNameAndId.name,
      "id" -> pokemonNameAndId.id
    )
  }
}


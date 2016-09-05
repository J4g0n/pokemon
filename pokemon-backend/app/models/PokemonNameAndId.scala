package models

import play.api.libs.json._


case class PokemonNameAndId(name: String, id: String)

object PokemonNameAndId {
  implicit val pokemonNameAndIdWrites = new Writes[PokemonNameAndId] {
    def writes(pokemonNameAndId: PokemonNameAndId) = Json.obj(
      "name" -> pokemonNameAndId.name,
      "id" -> pokemonNameAndId.id
    )
  }
}


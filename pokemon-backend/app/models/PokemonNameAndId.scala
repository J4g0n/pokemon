package models

import play.api.libs.json._


case class PokemonNameAndId(name: String, id: String)

object PokemonNameAndId {
  implicit val pokemonTypeFormat = Json.format[PokemonNameAndId]
}


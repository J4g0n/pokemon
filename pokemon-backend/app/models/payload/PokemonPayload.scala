package models.payload

import play.api.libs.json._

// todo this is bad to use imgurl without fetching it locally because we are polling pokeapi for no reason
case class PokemonPayload(id: Long, name: String, imgurl: String, stats: List[PokemonStatPayload], types: List[PokemonTypePayload])

// todo add field to retrieve averageStats for pokemon type
case class PokemonTypePayload(id: Int, name: String, stats: List[PokemonStatPayload] = Nil)

case class PokemonStatPayload(id: Int, name: String, value: Int)


object PokemonPayload {
  implicit val pokemonStatPayloadFormat = Json.format[PokemonStatPayload]
  implicit val pokemonTypePayloadFormat = Json.format[PokemonTypePayload]
  implicit val pokemonFormat = Json.format[PokemonPayload]
}

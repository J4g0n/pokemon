package models.payload

import play.api.libs.json._
import play.api.libs.functional.syntax._


case class TypePayload(id: Long, name: String, pokemons: List[PokemonPreviewPayload])

// todo add field to retrieve averageStats for pokemon type
//case class PokemonTypePayload(id: Int, name: String, stats: List[PokemonStatPayload] = Nil)

//case class PokemonStatPayload(id: Int, name: String, value: Int)


object TypePayload {
  //implicit val pokemonStatPayloadFormat = Json.format[PokemonStatPayload]
  //implicit val pokemonTypePayloadFormat = Json.format[PokemonTypePayload]
  implicit val typeFormat = Json.format[TypePayload]
}

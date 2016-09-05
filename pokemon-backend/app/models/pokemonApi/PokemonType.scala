package models.pokemonApi


import play.api.libs.json.{JsPath, Json, Reads}
import play.api.libs.functional.syntax._

case class PokemonType(`type`: Type, slot: Int)

sealed case class Type(url: String, name: String)

object PokemonType {
  implicit val typeFormat = Json.format[Type]
  implicit val pokemonTypeFormat = Json.format[PokemonType]
}



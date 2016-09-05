package models.pokemonApi

import play.api.libs.json.{JsPath, Json, Reads}
import play.api.libs.functional.syntax._

case class PokemonNameAndUrl(name: String, url: String)

object PokemonNameAndUrl {
  implicit val pokemonTypeFormat = Json.format[PokemonNameAndUrl]
}


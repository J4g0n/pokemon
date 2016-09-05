package models.pokemonApi

import play.api.libs.json.{JsPath, Json, Reads}
import play.api.libs.functional.syntax._

case class PokemonApiPreview(name: String, url: String)

object PokemonApiPreview {
  implicit val pokemonTypeFormat = Json.format[PokemonApiPreview]
}


package models.pokemonApi

import play.api.libs.json.{JsPath, Json, Reads}
import play.api.libs.functional.syntax._

case class PokemonNameAndUrl(name: String, url: String)

object PokemonNameAndUrl {
  implicit val pokemonNameAndUrlReads: Reads[PokemonNameAndUrl] = (
      (JsPath \ "name").read[String] and
      (JsPath \ "url").read[String]
    )(PokemonNameAndUrl.apply _)
}


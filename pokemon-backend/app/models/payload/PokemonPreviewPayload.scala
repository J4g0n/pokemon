package models.payload

import play.api.libs.json._


case class PokemonPreviewPayload(name: String, id: String)

object PokemonPreviewPayload {
  implicit val pokemonTypeFormat = Json.format[PokemonPreviewPayload]
}


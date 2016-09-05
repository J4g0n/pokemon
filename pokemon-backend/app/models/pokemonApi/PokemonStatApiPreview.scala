package models.pokemonApi

import models.payload.PokemonStatPayload
import play.api.libs.json.{JsPath, Json, Reads}
import play.api.libs.functional.syntax._
import com.netaporter.uri.dsl._


case class PokemonStatApiPreview(stat: StatApiPreview, effort: Int, base_stat: Int) {
  def toPayload = PokemonStatPayload(id = stat.url.pathParts(3).part.toInt, name = stat.name, value = base_stat)
}

sealed case class StatApiPreview(url: String, name: String)

object PokemonStatApiPreview {
  implicit val statApiFormat = Json.format[StatApiPreview]
  implicit val pokemonStatApiFormat = Json.format[PokemonStatApiPreview]
}



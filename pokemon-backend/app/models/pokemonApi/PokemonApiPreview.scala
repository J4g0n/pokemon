package models.pokemonApi

import models.payload.PokemonPreviewPayload
import play.api.libs.json.{JsPath, Json, Reads}
import com.netaporter.uri.dsl._


case class PokemonApiPreview(name: String, url: String){
  def toPayload = PokemonPreviewPayload(id = url.pathParts(3).part.toInt, name = name)
}

object PokemonApiPreview {
  implicit val pokemonTypeFormat = Json.format[PokemonApiPreview]
}


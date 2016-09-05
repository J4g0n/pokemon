package models.pokemonApi


import play.api.libs.json.{JsPath, Json, Reads}
import play.api.libs.functional.syntax._
import com.netaporter.uri.dsl._
import models.payload.PokemonTypePayload


case class PokemonTypeApiPreview(`type`: TypeApiPreview, slot: Int) {
  def toPayload = PokemonTypePayload(id = `type`.url.pathParts(3).part.toInt, name = `type`.name)
}

sealed case class TypeApiPreview(url: String, name: String)

object PokemonTypeApiPreview {
  implicit val typeApiFormat = Json.format[TypeApiPreview]
  implicit val pokemonTypeApiFormat = Json.format[PokemonTypeApiPreview]
}



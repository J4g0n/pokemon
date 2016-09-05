package models.pokemonApi


import play.api.libs.json.{JsPath, Json, Reads}
import play.api.libs.functional.syntax._
import com.netaporter.uri.dsl._
import models.payload.PokemonTypePayload


case class PokemonTypeApi(`type`: TypeApi, slot: Int) {
  def toPayload = PokemonTypePayload(id = `type`.url.pathParts(3).part.toInt, name = `type`.name)
}

sealed case class TypeApi(url: String, name: String)

object PokemonTypeApi {
  implicit val typeApiFormat = Json.format[TypeApi]
  implicit val pokemonTypeApiFormat = Json.format[PokemonTypeApi]
}



package models

import play.api.libs.json._

// todo this is bad to use imgurl without fetching it locally because we are polling pokeapi for no reason
case class Pokemon(id: Long, name: String, imgurl: Option[String] = None)

object Pokemon {
  implicit val pokemonFormat = Json.format[Pokemon]
}

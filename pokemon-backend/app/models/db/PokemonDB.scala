package models.db

import play.api.libs.json._

// todo this is bad to use imgurl without fetching it locally because we are polling pokeapi for no reason
case class PokemonDB(id: Long, name: String, imgurl: Option[String] = None)

object PokemonDB {
  implicit val pokemonFormat = Json.format[PokemonDB]
}

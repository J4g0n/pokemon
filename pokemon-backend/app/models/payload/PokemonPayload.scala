package models.payload

import play.api.libs.json._
import play.api.libs.functional.syntax._


// todo this is bad to use imgurl without fetching it locally because we are polling pokeapi for no reason
case class PokemonPayload(id: Long, name: String, imgurl: String, stats: List[PokemonStatPayload], types: List[PokemonTypePayload])

case class PokemonStatPayload(id: Int, name: String, value: Int)


object PokemonPayload {
  implicit val pokemonStatPayloadFormat = Json.format[PokemonStatPayload]
  implicit val pokemonTypePayloadFormat = Json.format[PokemonTypePayload]
  implicit val pokemonFormat = Json.format[PokemonPayload]
  // todo i'll try to make this work later
  /*
  implicit val pokemonPayloadReads: Reads[PokemonPayload] = (
      (JsPath \ "id").read[Long] and
      (JsPath \ "name").read[String] and
      (JsPath \ "sprites" \ "front_default").read[String] and
      (JsPath \ "types").read[Seq[PokemonTypePayload]] and
      (JsPath \ "stats").read[Seq[PokemonStatPayload]]
    )(PokemonPayload.apply _)
   */
}



// todo add field to retrieve averageStats for pokemon type
case class PokemonTypePayload(id: Int, name: String, stats: List[PokemonStatPayload] = Nil)

object PokemonTypePayload {
  implicit val pokemonStatPayloadFormat = Json.format[PokemonStatPayload]
  implicit val pokemonTypePayloadFormat = Json.format[PokemonTypePayload]
}
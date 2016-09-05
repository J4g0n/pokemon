package models

import play.api.libs.json._

/**
  * Created by sandman on 9/4/16.
  */
case class Pokemon(id: Int, name: String)

object Pokemon {

  implicit val pokemonFormat = Json.format[Pokemon]

}

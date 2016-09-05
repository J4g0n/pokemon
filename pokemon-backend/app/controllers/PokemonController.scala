package controllers

import play.api._
import play.api.mvc._
import play.api.i18n._
import play.api.libs.ws._
import play.api.data.validation.Constraints._
import play.api.libs.json.{Json, Reads}
import models._
import dal._
import com.netaporter.uri.dsl._

import scala.concurrent.{ExecutionContext, Future}
import javax.inject._

import models.pokemonApi.{PokemonNameAndUrl, PokemonType}


class PokemonController @Inject() (ws: WSClient, val messagesApi: MessagesApi)
                                 (implicit ec: ExecutionContext) extends Controller with I18nSupport{
  val baseUrl = "http://pokeapi.co" / "api" / "v2"
  val pokemonUrl = baseUrl / "pokemon"

  def getPokemons = Action.async {
    implicit request => {
      ws.url(pokemonUrl ? ("limit" -> "1000"))
        .get
        .map { response =>
          // todo check this response is valid if you wanna avoid losing hours of dumb debugging
          Logger.info(s"Get pokemons list response $response")
          val results = (response.json \ "results").as[List[PokemonNameAndUrl]]
          val pokemons = results.map(result =>
            PokemonNameAndId(name = result.name, id = result.url.pathParts(3).part)
          )
          val pokemonsJson = Json.toJson(pokemons)

          Ok(pokemonsJson)
        }
    }
  }

  def getPokemon(pokemonId: Int) = Action.async { implicit request =>
    // todo check if pokemon is in db before fetching it again ans using ws as a fallback
    ws.url(pokemonUrl / pokemonId.toString)
      .get
      .map { response =>
        // todo add some processing here
        // 1. write to db // optional atm
        // 2. we could try also to retrieve and compute stats here
        // 3. normalize payload to Pokemon case class
        Logger.info(s"Get pokemon response: $response \nfor pokemon: $pokemonId")
        val responseJson = response.json
        val id = (responseJson \ "id").as[Int]
        val name = (responseJson \ "name").as[String]
        val imgurl = (responseJson \ "sprites" \ "front_default").as[String]
        val types = (responseJson \ "types").as[List[PokemonType]]
        Logger.info(s"Get pokemon types: $types")
        val pokemon = Pokemon(id, name, Some(imgurl))

        Ok(Json.toJson(pokemon))
      }
  }
}
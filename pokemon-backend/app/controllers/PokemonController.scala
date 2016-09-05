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

import models.pokemonApi.PokemonNameAndUrl


class PokemonController @Inject() (ws: WSClient, val messagesApi: MessagesApi)
                                 (implicit ec: ExecutionContext) extends Controller with I18nSupport{
  val baseUrl = "http://pokeapi.co" / "api" / "v2"
  val pokemonUrl = baseUrl / "pokemon"

  def getPokemons = Action.async {
    implicit request => {
      ws.url(pokemonUrl ? ("limit" -> "1000"))
        .get
        .map { response =>
          // todo check this response is valid to avoid losing hours of dumb debugging
          Logger.info("Get pokemons list response! " + response)
          val results = (response.json \ "results").as[List[PokemonNameAndUrl]]
          val pokemons = results.map(result =>
            PokemonNameAndId(name = result.name, id = result.url.pathParts(3).part)
          )
          val pokemonsJson = Json.toJson(pokemons)

          Ok(pokemonsJson)
        }
    }
  }

  def getPokemon(id: Int) = Action.async { implicit request =>
    // todo check if pokemon is in db before fetching it again ans using ws as a fallback
    ws.url(pokemonUrl / id.toString)
      .get
      .map(response =>
        // todo add some processing here
        // 1. write to db
        // 2. we could try also to retrieve and compute stats here
        // 3. normalize payload to Pokemon case class
        Ok(response.json)
      )
  }
}
package controllers

import play.api._
import play.api.mvc._
import play.api.i18n._
import play.api.libs.ws._
import play.api.data.validation.Constraints._
import play.api.libs.json.{JsValue, Json, Reads}
import models._
import dal._
import com.netaporter.uri.dsl._

import scala.concurrent.{ExecutionContext, Future}
import javax.inject._

import models.db.PokemonDB
import models.payload._
import models.pokemonApi.{PokemonApiPreview, PokemonStatApiPreview, PokemonTypeApiPreview}


class PokemonController @Inject() (ws: WSClient, val messagesApi: MessagesApi)
                                 (implicit ec: ExecutionContext) extends Controller with I18nSupport{
  val baseUrl = "http://pokeapi.co" / "api" / "v2"
  val pokemonUrl = baseUrl / "pokemon"
  val typeUrl = baseUrl / "type"

  def getPokemons = Action.async {
    implicit request => {
      ws.url(pokemonUrl ? ("limit" -> "1000"))
        .get
        .map { response =>
          // todo check this response is valid if you wanna avoid losing hours of dumb debugging
          Logger.info(s"Get pokemons list response $response")
          val results = (response.json \ "results").as[List[PokemonApiPreview]]
          val pokemons = results.map(result =>
            PokemonPreviewPayload(name = result.name, id = result.url.pathParts(3).part.toInt)
          )
          val pokemonsJson = Json.toJson(pokemons)

          Ok(pokemonsJson)
        }
    }
  }

  def getPokemon(pokemonId: Int) = Action.async { implicit request =>
    // todo check if pokemon is in db before fetching it again and use ws as a fallback
    for {
      pokemon <- getPokemonPayload(pokemonId)
      typesStats <- getTypeWithStats(pokemon.types.head.id)
    } yield {
      Logger.info(s"\n\nType stats: $typesStats")
      //val pokemonWithStats = pokemon.copy(types = typesWithStats)
      Ok(Json.toJson(pokemon))
    }
  }

  def getType(typeId: Int) = Action.async { implicit request =>
    // todo check if pokemon is in db before fetching it again and use ws as a fallback
    getTypePayload(typeId).map(payload => {
      Logger.info(s"\n\nGet type payload: $payload")
      Ok(Json.toJson(payload))
    })
  }






  private def getPayload[T](url: String)(f: JsValue => T) = {
    ws.url(url)
      .get
      .map(response => {
        Logger.info(s"Get response: $response")
        val responseJson = response.json
        f(responseJson)
      })
  }

  private def getPokemonPayload(pokemonId: Int): Future[PokemonPayload] = {
    getPayload[PokemonPayload](pokemonUrl / pokemonId.toString)(
      jsValue => {
        // todo maybe there must be a smarter way to do this with some implicit Reads
        val id = (jsValue \ "id").as[Int]
        val name = (jsValue \ "name").as[String]
        val imgurl = (jsValue \ "sprites" \ "front_default").as[String]
        val pokemonTypes = (jsValue \ "types").as[List[PokemonTypeApiPreview]]
        val pokemonStats = (jsValue \ "stats").as[List[PokemonStatApiPreview]]
        PokemonPayload(id, name, imgurl, pokemonStats.map(_.toPayload), pokemonTypes.map(_.toPayload))
      }
    )
  }

  private def getPokemonStats(pokemonId: Int): Future[List[PokemonStatApiPreview]] = {
    getPayload[List[PokemonStatApiPreview]](pokemonUrl / pokemonId.toString)(
      jsValue => (jsValue \ "stats").as[List[PokemonStatApiPreview]]
    )
  }




  private def getTypeWithStats(typeId: Int): Future[PokemonTypePayload] = {
    // todo check if pokemon is in db before fetching it again and use ws as a fallback
    for {
      typePayload <- getTypePayload(typeId)
      pokemonTypeStats <- Future.sequence(typePayload.pokemons.map(pokemon => getPokemonStats(pokemon.id)))
    } yield {
      val pokemonTypeStatsProcessed = processTypeStats(pokemonTypeStats.flatten.map(_.toPayload))
      Logger.info(s"\n\nall stats $typeId:\n$pokemonTypeStats")
      // these are the stats of all pokemons with specific typeId
      // todo next step id grouping by stat specific type and compute average value using reduce
      PokemonTypePayload(typePayload.id.toInt, typePayload.name, pokemonTypeStatsProcessed)
    }
  }

  private def processTypeStats(typeStats: List[PokemonStatPayload]) = {
    typeStats.groupBy(_.id).map(pokemonGroupedStats => {
      val groupedStats = pokemonGroupedStats._2
      val id = groupedStats.head.id
      val name = groupedStats.head.name
      val averageStat = groupedStats.foldRight(0)((stats, acc) => stats.value + acc) / groupedStats.length
      PokemonStatPayload(id, name, averageStat)
    }).toList
  }

  private def getTypePayload(typeId: Int): Future[TypePayload]= {
    getPayload[TypePayload](typeUrl / typeId.toString)(
      jsValue => {
        // todo maybe there must be a smarter way to do this with some implicit Reads
        val id = (jsValue \ "id").as[Int]
        val name = (jsValue \ "name").as[String]
        val pokemons = (jsValue \ "pokemon" \\ "pokemon").map(_.as[PokemonApiPreview].toPayload)
        Logger.info(s"Get pokemon types: $pokemons")
        TypePayload(id, name, pokemons.toList)
      }
    )
  }
}
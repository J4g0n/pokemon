package dal

import javax.inject.{Inject, Singleton}

import models.Pokemon
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

/**
 * A repository for people.
 *
 * @param dbConfigProvider The Play db config provider. Play will inject this for you.
 */
@Singleton
class PokemonRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import driver.api._

  /**
   * Here we define the table. It will have a name of people
   */
  private class PokemonsTable(tag: Tag) extends Table[Pokemon](tag, "pokemons") {

    /** The ID column, which is the primary key, and auto incremented */
    def id = column[Long]("id", O.PrimaryKey)

    /** The name column */
    def name = column[String]("name")

    /** The age column */
    def imgurl = column[String]("imgurl")

    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (id, name, imgurl.?) <> ((Pokemon.apply _).tupled, Pokemon.unapply)
  }

  /**
   * The starting point for all queries on the people table.
   */
  private val pokemons = TableQuery[PokemonsTable]

  /**
   * Create a person with the given name and age.
   *
   * This is an asynchronous operation, it will return a future of the created person, which can be used to obtain the
   * id for that person.
   */
  def create(id: Int, name: String): Future[Pokemon] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the id column
    (pokemons.map(p => (p.id, p.name))
      // Now define it to return the id, because we want to know what id was generated for the person
      returning pokemons.map(_.id)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned id
      into ((nameAndImgurl, id) => Pokemon(id = id, name = nameAndImgurl._2))
    // And finally, insert the person into the database
    ) += (id, name)
  }

  /**
   * List all the people in the database.
   */
  def list(): Future[Seq[Pokemon]] = db.run {
    pokemons.result
  }
}

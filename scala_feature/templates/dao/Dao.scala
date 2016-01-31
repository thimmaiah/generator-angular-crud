package <%= packageName %>.<%= camelizedSingularName %>.dao

import akka.actor.Actor
import com.typesafe.scalalogging.LazyLogging
import slick.driver.JdbcProfile
import <%= packageName %>.utils.{ DbModule }
import scala.concurrent.Future
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>Table
import slick.driver.MySQLDriver.api._
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>
import <%= packageName %>.utils.DB._
import scala.concurrent.ExecutionContext.Implicits.global
import org.joda.time.DateTime

object <%= featureName %>Dao extends TableQuery(new <%= featureName %>Table(_)) {

  import com.lot.utils.CustomDBColMappers._
  
  /**
   * Saves the <%= featureName %> to the DB
   * @return The Id of the saved entity
   */
  
  val insertQuery = this returning this.map(_.id) into ((<%= camelizedSingularName %>, id) => <%= camelizedSingularName %>.copy(id = Some(id)))
  
  def save(<%= camelizedSingularName %>: <%= featureName %>) : Future[<%= featureName %>] = {
    /*
     * Ensure the timestamps are updated
     */
    val now = new DateTime()
    val o: <%= featureName %> = <%= camelizedSingularName %>.copy(created_at = Some(now), updated_at = Some(now))   
 
    val action = insertQuery += o
    db.run(action)
  }
  
  /**
   * Returns the <%= featureName %> 
   * @id The id of the <%= featureName %> in the DB
   */
  def get(id: Long) = {
    db.run(this.filter(_.id === id).result.headOption)
  }
  
  /**
   * Updates the <%= featureName %>
   * @<%= camelizedSingularName %> The new fields will be updated in the DB
   */
  def update(<%= camelizedSingularName %>: <%= featureName %>) = {
    // update the updated_at timestamp
    val now = new DateTime();
    val new_<%= camelizedSingularName %>: <%=featureName%> = <%= camelizedSingularName %>.copy(updated_at = Some(now))
    
    db.run(this.filter(_.id === <%= camelizedSingularName %>.id).update(new_<%= camelizedSingularName %>))
  }
  
   /**
   * Updates the Position
   * @position The new fields will be updated in the DB but only if 
   * the updated_at in the DB is the same as the one in the position param 
   */
  def updateWithOptimisticLocking( <%= camelizedSingularName %>:  <%= featureName %>) = {
    // update the updated_at timestamp
    val now = new DateTime();
    val new_<%= camelizedSingularName %>:<%= featureName %> =  <%= camelizedSingularName %>.copy(updated_at = Some(now))
    
    db.run(this.filter(p=>p.id === <%= camelizedSingularName %>.id && p.updated_at === <%= camelizedSingularName %>.updated_at).update(new_<%= camelizedSingularName %>))
  }
  
  /**
   * Deletes the <%= camelizedSingularName %> from the DB. Warning this is permanent and irreversable
   * @<%= camelizedSingularName %> This has the id which will be removed from the DB
   */
  def delete(<%= camelizedSingularName %>: <%= featureName %>) = {
    db.run(this.filter(_.id === <%= camelizedSingularName %>.id).delete)
  }
  
  /**
   * Deletes the <%= camelizedSingularName %>
   * @id The id of the <%= camelizedSingularName %> to be deleted
   */
  def delete(delete_id: Long) = {
    db.run(this.filter(_.id === delete_id).delete)
  }

  /**
   * Creates the tables
   * Warning - do not call this in production
   */
  def createTables(): Future[Unit] = {
    db.run(DBIO.seq(this.schema.create))
  }

  /**
   * Returns all the <%= camelizedSingularName %> in the DB
   */
  def list = {
    val all<%= featureName %>s = for (o <- this) yield o
    db.run(all<%= featureName %>s.result)
  }

  /**
   * Used only for testing to clean the DB after each test
   */
  def truncate = {
    db.run(sqlu"TRUNCATE TABLE <%= camelizedPluralName %>;")
  }

}

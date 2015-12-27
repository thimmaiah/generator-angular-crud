package <%= packageName %>.<%= camelizedSingularName %>.dao

import akka.actor.Actor
import com.typesafe.scalalogging.LazyLogging
import persistence.entities.{ Suppliers, Supplier }
import slick.driver.JdbcProfile
import utils.{ DbModule }
import scala.concurrent.Future
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>Table
import slick.driver.MySQLDriver.api._
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>
import utils.DB._
import scala.concurrent.ExecutionContext.Implicits.global

object <%= featureName %>Dao extends TableQuery(new <%= featureName %>Table(_)) {

  def save(<%= camelizedSingularName %>: <%= featureName %>): Future[Int] = { db.run(this += <%= camelizedSingularName %>).mapTo[Int] }

  def get(id: Long) = {
    db.run(this.filter(_.id === id).result.headOption)
  }
  
  def update(<%= camelizedSingularName %>: <%= featureName %>) = {
    db.run(this.filter(_.id === <%= camelizedSingularName %>.id).update(<%= camelizedSingularName %>))
  }
  def delete(<%= camelizedSingularName %>: <%= featureName %>) = {
    db.run(this.filter(_.id === <%= camelizedSingularName %>.id).delete)
  }
  
  def delete(delete_id: Long) = {
    db.run(this.filter(_.id === delete_id).delete)
  }

  def createTables(): Future[Unit] = {
    db.run(DBIO.seq(this.schema.create))
  }

  def list = {
    val all<%= featureName %>s = for (o <- this) yield o
    db.run(all<%= featureName %>s.result)
  }

}

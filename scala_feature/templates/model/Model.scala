package <%= packageName %>.<%= camelizedSingularName %>manager.model

import java.sql.Date
import slick.driver.MySQLDriver.api._
import com.github.tototoshi.slick.H2JodaSupport._
import spray.json.DefaultJsonProtocol
import spray.json.RootJsonFormat
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormatter
import spray.json.JsString
import spray.json.JsValue
import spray.json.DeserializationException
import org.joda.time.format.ISODateTimeFormat
import java.sql.Timestamp


case class <%= featureName %>(id: Option[Int])

class <%= featureName %>Table(tag: Tag) extends Table[<%= featureName %>](tag, "ORDERS") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def created_at = column[DateTime]("created_at")
  def updated_at = column[DateTime]("updated_at")
  def * = (id.?, created_at, updated_at) <> (<%= featureName %>.tupled, <%= featureName %>.unapply)
}

object <%= featureName %>JsonProtocol extends DefaultJsonProtocol {
  implicit val <%= camelizedSingularName %>Format = jsonFormat1(<%= featureName %>)
}


package <%= packageName %>.<%= camelizedSingularName %>.model

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
import <%= packageName %>.utils.CustomJson

/**
 * The model class
 */
case class <%= featureName %>(id: Option[Long],
   <% var fieldLength = 0; for (var f in fieldMap) { %> <%= f %>: <%= fieldMap[f] %>, <% fieldLength = fieldLength + 1;} %>
    created_at: Option[DateTime], 
    updated_at: Option[DateTime])

/**
 * The DB schema
 */
class <%= featureName %>Table(tag: Tag) extends Table[<%= featureName %>](tag, "<%= underscoreName %>") {
  /*
   * Auto inc primary key
   */
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  /*
   * Updated automatically by the DAO on save
   */
  def created_at = column[Option[DateTime]]("created_at", O.Nullable)
  /*
   * Updated automatically by the DAO on update
   */
  def updated_at = column[Option[DateTime]]("updated_at", O.Nullable)
  /*
   * The rest of the domain specific fields
   */
 <% for (var f in fieldMap) { %> def <%= f %> = column[<%= fieldMap[f] %>]("<%=f%>", O.Nullable) 
 <% } %>
 /*
  * Projection betw the DB and the model
  */
  def * = (id.?, <% for (var f in fieldMap) { %> <%= f %>, <% } %> created_at, updated_at) <> (<%= featureName %>.tupled, <%= featureName %>.unapply)
}

/**
 * The JSON protocol
 */
object <%= featureName %>JsonProtocol extends CustomJson {
  implicit val <%= camelizedSingularName %>Format = jsonFormat<%= fieldLength + 3 %>(<%= featureName %>)
}


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

case class <%= featureName %>(id: Option[Long],
   <% var fieldLength = 0; for (var f in fieldMap) { %> <%= f %>: <%= fieldMap[f] %>, <% fieldLength = fieldLength + 1;} %>
    created_at: Option[DateTime], 
    updated_at: Option[DateTime])

class <%= featureName %>Table(tag: Tag) extends Table[<%= featureName %>](tag, "ORDERS") {
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def created_at = column[DateTime]("created_at")
  def updated_at = column[DateTime]("updated_at")
 <% for (var f in fieldMap) { %> def <%= f %> = column[<%= fieldMap[f] %>]("<%=f%>") 
 <% } %>
  def * = (id.?, <% for (var f in fieldMap) { %> <%= f %>, <% } %> created_at.?, updated_at.?) <> (<%= featureName %>.tupled, <%= featureName %>.unapply)
}

object <%= featureName %>JsonProtocol extends DefaultJsonProtocol {
  import <%= packageName %>.utils.CustomJson._
  implicit val <%= camelizedSingularName %>Format = jsonFormat<%= fieldLength + 3 %>(<%= featureName %>)
}


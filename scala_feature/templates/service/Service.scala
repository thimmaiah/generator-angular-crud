package <%= packageName %>.<%= camelizedSingularName %>.service

import <%= packageName %>.BaseService
import <%= packageName %>.<%= camelizedSingularName %>.dao.<%= featureName %>Dao
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>JsonProtocol
import scala.concurrent.ExecutionContext.Implicits.global
import utils.CORSSupport

object <%= featureName %>Service extends BaseService with CORSSupport {

  import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>JsonProtocol._
  import <%= packageName %>.Json4sProtocol._

  val dao = <%= featureName %>Dao

  val list = getJson {
    path("<%= camelizedSingularName %>s") {
      complete(dao.list)
    }
  }

  val details = getJson {
    path("<%= camelizedSingularName %>s" / IntNumber) { id =>
      {
        complete(dao.get(id))
      }
    }
  }

  val create = postJson {
    path("<%= camelizedSingularName %>s") {
      entity(as[<%= featureName %>]) { <%= camelizedSingularName %> =>
        {
          complete(dao.save(<%= camelizedSingularName %>))
        }
      }
    }
  }
  val update = putJson {
    path("<%= camelizedSingularName %>s" / IntNumber) { id =>
      entity(as[<%= featureName %>]) { <%= camelizedSingularName %> =>
        {
          complete(dao.update(<%= camelizedSingularName %>))
        }
      }
    }
  }
  val destroy = deleteJson {
    path("<%= camelizedSingularName %>s" / IntNumber) { id =>

      complete(dao.delete(id))

    }
  }

  val endpoints =
    list ~ details ~ create ~ update ~ destroy

}
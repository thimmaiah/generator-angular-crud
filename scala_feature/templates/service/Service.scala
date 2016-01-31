package <%= packageName %>.<%= camelizedSingularName %>.service

import <%= packageName %>.BaseService
import <%= packageName %>.<%= camelizedSingularName %>.dao.<%= featureName %>Dao
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>JsonProtocol
import scala.concurrent.ExecutionContext.Implicits.global

/**
 * The service that provides the REST interface for <%= featureName %> 
 */
object <%= featureName %>Service extends BaseService {
  
  /**
   * For JSON serialization/deserialization
   */
  import <%= packageName %>.Json4sProtocol._

  /**
   * The DAO for DB access to <%= featureName %>
   */
  val dao = <%= featureName %>Dao

  /**
   * Returns the list of <%= camelizedPluralName %>
   */
  val list = getJson {
    path("<%= camelizedPluralName %>") {
      complete(dao.list)
    }
  }

  /**
   * Returns a specific <%= camelizedSingularName %> identified by the id
   */
  val details = getJson {
    path("<%= camelizedPluralName %>" / IntNumber) { id =>
      {
        complete(dao.get(id))
      }
    }
  }

  /**
   * Creates a new <%= camelizedSingularName %>
   */
  val create = postJson {
    path("<%= camelizedPluralName %>") {
      entity(as[<%= featureName %>]) { <%= camelizedSingularName %> =>
        {
          complete(dao.save(<%= camelizedSingularName %>))
        }
      }
    }
  }
  
  /**
   * Updates an existing <%= camelizedSingularName %> identified by the id
   */
  val update = putJson {
    path("<%= camelizedPluralName %>" / IntNumber) { id =>
      entity(as[<%= featureName %>]) { <%= camelizedSingularName %> =>
        {
          complete(dao.update(<%= camelizedSingularName %>))
        }
      }
    }
  }
  
  /**
   * Deletes the <%= camelizedSingularName %> identified by the id
   */
  val destroy = deleteJson {
    path("<%= camelizedPluralName %>" / IntNumber) { id =>

      complete(dao.delete(id))

    }
  }

  /**
   * The list of methods which are exposed as the endpoint for this service
   */
  val endpoints =
    list ~ details ~ create ~ update ~ destroy

}
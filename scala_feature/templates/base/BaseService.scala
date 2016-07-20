package <%= packageName %>

import spray.routing.SimpleRoutingApp
import spray.routing.Route
import spray.http.MediaTypes
import spray.httpx.Json4sSupport
import org.json4s.DefaultFormats
import org.json4s.Formats
import <%= packageName %>.user.model.User
import scala.concurrent.ExecutionContext.Implicits.global
import spray.routing.Directive
import <%= packageName %>.user.dao.UserDao
import scala.concurrent.{ ExecutionContext, Future }
import spray.routing._
import Directives._
import spray.routing.authentication.{ Authentication, ContextAuthenticator }
import scala.concurrent.Await
import java.sql.Timestamp
import utils.CORSSupport

object Json4sProtocol extends Json4sSupport {
  implicit def json4sFormats: Formats = DefaultFormats.lossless ++ org.json4s.ext.JodaTimeSerializers.all
}

trait BaseService extends SimpleRoutingApp with CORSSupport {
  
  val authenticator = TokenAuthenticator[User]() { (token, uid) =>
      println(s"authenticator $token $uid")
      UserDao.findByEmail(uid)
    }

  def auth: Directive1[User] = authenticate(authenticator)


  def getJson(route: Route) = get {
    respondWithMediaType(MediaTypes.`application/json`) {
      route
    }
  }

  def postJson(route: Route) = post {
    respondWithMediaType(MediaTypes.`application/json`) {
      route
    }
  }

  def putJson(route: Route) = put {
    respondWithMediaType(MediaTypes.`application/json`) {
      route
    }
  }

  def deleteJson(route: Route) = delete {
    respondWithMediaType(MediaTypes.`application/json`) {
      route
    }
  }

}
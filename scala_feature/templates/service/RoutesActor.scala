package <%= packageName %>.<%= camelizedSingularName %>.service

import scala.concurrent.duration.DurationInt
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>JsonProtocol
import akka.actor.Actor
import akka.util.Timeout
import spray.routing.HttpService
import <%= packageName %>.utils.Configuration
import <%= packageName %>.StaticService
import <%= packageName %>.utils.CORSSupport
import com.typesafe.config.ConfigFactory
import akka.actor.ActorLogging

/**
 * The Actor which is used to run the routes associated with this service
 */
class <%= featureName %>RoutesActor(modules: Configuration) extends Actor with 
  HttpService with StaticService with CORSSupport with ActorLogging {

  import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>JsonProtocol._

  def actorRefFactory = context

  implicit val timeout = Timeout(5.seconds)

  /**
   * Runs the routes in the service, defined by the <%= featureName %>Service.endpoints
   */
  def receive = runRoute(
        respondWithCORS(conf.getString("origin.domain")) { <%= featureName %>Service.endpoints })
}



 
package <%= packageName %>.<%= camelizedSingularName %>.service

import scala.concurrent.duration.DurationInt
import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>JsonProtocol
import akka.actor.Actor
import akka.util.Timeout
import spray.routing.HttpService
import <%= packageName %>.utils.Configuration
import <%= packageName %>.utils.PersistenceModule
import <%= packageName %>.StaticService
import <%= packageName %>.utils.CORSSupport
import com.typesafe.config.ConfigFactory
import akka.actor.ActorLogging

class <%= featureName %>RoutesActor(modules: Configuration with PersistenceModule) extends Actor with 
  HttpService with StaticService with CORSSupport with ActorLogging {

  import <%= packageName %>.<%= camelizedSingularName %>.model.<%= featureName %>JsonProtocol._

  def actorRefFactory = context

  implicit val timeout = Timeout(5.seconds)

  def receive = runRoute(
        respondWithCORS(conf.getString("origin.domain")) { <%= featureName %>Service.endpoints })
}



 
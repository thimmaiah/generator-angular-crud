package <%= packageName %>.<%= camelizedSingularName %>manager.service

import scala.concurrent.duration.DurationInt
import <%= packageName %>.<%= camelizedSingularName %>manager.model.<%= featureName %>JsonProtocol
import <%= packageName %>.<%= camelizedSingularName %>.service.<%= featureName %>Service
import com.typesafe.scalalogging.LazyLogging
import akka.actor.Actor
import akka.util.Timeout
import spray.routing.HttpService
import utils.Configuration
import utils.PersistenceModule
import <%= packageName %>.StaticService
import utils.CORSSupport
import com.typesafe.config.ConfigFactory

class <%= featureName %>RoutesActor(modules: Configuration with PersistenceModule) extends Actor with 
  HttpService with StaticService with CORSSupport with LazyLogging {

  import <%= packageName %>.<%= camelizedSingularName %>manager.model.<%= featureName %>JsonProtocol._

  def actorRefFactory = context

  implicit val timeout = Timeout(5.seconds)

  def receive = runRoute(
        respondWithCORS(conf.getString("origin.domain")) { <%= featureName %>Service.endpoints })
}



 
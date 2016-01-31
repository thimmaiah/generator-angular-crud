package <%=packageName %>.utils

import slick.backend.DatabaseConfig
import slick.driver.JdbcProfile

object DB {
  
  // use an alternative database configuration ex:
	// private val dbConfig : DatabaseConfig[JdbcProfile]  = DatabaseConfig.forConfig("pgdb")
	private val dbConfig : DatabaseConfig[JdbcProfile]  = DatabaseConfig.forConfig("loat_dev")

	implicit val profile: JdbcProfile = dbConfig.driver
	implicit val db: JdbcProfile#Backend#Database = dbConfig.db
}

object CustomDBColMappers {

  implicit def dateTimeMapper = MappedColumnType.base[DateTime, Timestamp] (
    { dateTime => new Timestamp(dateTime.getMillis) },
    { date => new DateTime(date) }
  )

}
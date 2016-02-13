package package <%= packageName %>.<%= camelizedSingularName %>.test

import com.lot.BaseTest
import com.lot.<%= camelizedSingularName %>.model.<%= featureName %>
import com.lot.<%= camelizedSingularName %>.dao.<%= featureName %>Dao
import scala.collection.mutable.ListBuffer
import com.lot.generators.<%= featureName %>Factory

class <%= featureName %>DaoTest extends BaseTest {

  "<%= featureName %>Dao" should "save <%= featureName %> correctly" in {

    /*
     * Create an entity
     */
    val <%= camelizedSingularName %> = <%= featureName %>Factory.generate()
    /*
     * Save it
     */
    val fSaved = <%= featureName %>Dao.save(<%= camelizedSingularName %>)
    val saved = wait(fSaved)
    /*
     * Get it back from the DB
     */
    val db<%= featureName %> = wait(<%= featureName %>Dao.get(saved.id.get)).get
    /*
     * They should be the same
     */
    assert(saved == db<%= featureName %>)

  }

  "<%= featureName %>Dao" should "list <%= featureName %>s correctly" in {

    /*
     * Create some entities and save
     */
    val <%= camelizedSingularName %>List = new ListBuffer[<%= featureName %>]
    for (i <- 1 to 10) {
      val b = <%= featureName %>Factory.generate()
      <%= camelizedSingularName %>List += wait(<%= featureName %>Dao.save(b))
    }

    //println(<%= camelizedSingularName %>List)
    
    /*
     * Get it back from the DB
     */
    val dbList = wait(<%= featureName %>Dao.list)
    
    // println(dbList)
    
    /*
     * They should be the same
     */
    assert(dbList.length == <%= camelizedSingularName %>List.length)
    val mixed = <%= camelizedSingularName %>List zip dbList
    for {
      (<%= camelizedSingularName %>, db<%= featureName %>) <- mixed
      x = println(s"comparing <%= camelizedSingularName %> = $<%= camelizedSingularName %> with db<%= featureName %> = $db<%= featureName %>")
    } yield (assert(<%= camelizedSingularName %> == db<%= featureName %>))

  }

  "<%= featureName %>Dao" should "update <%= featureName %> correctly" in {

    /*
     * Create an entity
     */
    val <%= camelizedSingularName %> = <%= featureName %>Factory.generate()
    /*
     * Save it
     */
    val fSaved = <%= featureName %>Dao.save(<%= camelizedSingularName %>)
    val saved = wait(fSaved)

    val modified = <%= featureName %>Factory.generate().copy(id=saved.id, created_at=saved.created_at, updated_at=saved.updated_at)
    wait(<%= featureName %>Dao.update(modified))
    /*
     * Get it back from the DB
     */
    val db<%= featureName %> = wait(<%= featureName %>Dao.get(saved.id.get)).get
    /*
     * They should be the same. We need to copy the updated_at
     */
    assert(modified.copy(updated_at = db<%= featureName %>.updated_at) == db<%= featureName %>)

  }

  "<%= featureName %>Dao" should "updateWithOptimisticLocking <%= featureName %> correctly" in {

    /*
     * Create an entity
     */
    val <%= camelizedSingularName %> = <%= featureName %>Factory.generate()
    /*
     * Save it
     */
    val fSaved = <%= featureName %>Dao.save(<%= camelizedSingularName %>)
    val saved = wait(fSaved)

    val modified1 = <%= featureName %>Factory.generate().copy(id=saved.id, created_at=saved.created_at, updated_at=saved.updated_at)    
    val modified2 = <%= featureName %>Factory.generate().copy(id=saved.id, created_at=saved.created_at, updated_at=saved.updated_at)
    val rowCount1 = wait(<%= featureName %>Dao.updateWithOptimisticLocking(modified1))
    val rowCount2 = wait(<%= featureName %>Dao.updateWithOptimisticLocking(modified1))
    
    assert(rowCount1 == 1)
    assert(rowCount2 == 0)

  }

  "<%= featureName %>Dao" should "delete <%= featureName %> correctly" in {

    /*
     * Create an entity
     */
    val <%= camelizedSingularName %> = <%= featureName %>Factory.generate()
    /*
     * Save it
     */
    val fSaved = <%= featureName %>Dao.save(<%= camelizedSingularName %>)
    val saved = wait(fSaved)
    /*
     * Delete it
     */
    wait(<%= featureName %>Dao.delete(saved.id.get))
    /*
     * Get it back from the DB
     */
    val db<%= featureName %> = wait(<%= featureName %>Dao.get(saved.id.get))
    /*
     * They should be None
     */
    assert(db<%= featureName %> == None)

  }
}
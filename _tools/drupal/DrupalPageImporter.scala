import collection.mutable
import java.io.PrintWriter
import java.text.SimpleDateFormat
import slick.driver.PostgresDriver.simple._
import Database.threadLocalSession

/**
 * Convert the www.lunatech-research.com Drupal MySQL database to Github Pages files.
 */

val TargetDirectory = "/Users/pedro/Documents/code/lunatech/lunatech-labs.github.com/pages"
val DatabaseUrl = "jdbc:postgresql://localhost/lunatech-research-drupal?user=drupal&password=drupal"
val DateFormat = new SimpleDateFormat("yyyy-MM-dd")
val Published = 1


// Drupal nodes - identifiers for page content, without the actual content
object Nodes extends Table[(Int, Int, String, String)]("node") {
  def id = column[Int]("nid", O.PrimaryKey)
  def versionId = column[Int]("vid")
  def status = column[Int]("status")
  def language = column[String]("language")
  def nodeType = column[String]("type")
  def title = column[String]("title")
  def userId = column[Int]("uid")
  def * = id ~ status ~ nodeType ~ title
}

// Drupal URL aliases for node URLs, e.g. /node/33 maps to an article's SEO URL
object UrlAliases extends Table[(String, String)]("url_alias") {
  def source = column[String]("src")
  def destination = column[String]("dst")
  def * = source ~ destination
}

// Drupal content revisions - there may be many revisions for a given node
object Revisions extends Table[(Int, String, String, String)]("node_revisions") {
  def nodeId = column[Int]("nid")
  def versionId = column[Int]("vid")
  def title = column[String]("title")
  def body = column[String]("body")
  def teaser = column[String]("teaser")
  def * = nodeId ~ title ~ body ~ teaser
  def node = foreignKey("nid_fk", nodeId, Nodes)(_.id)
}

val BaseUrl = "http://www.lunatech-research.com/"
val warnings = new StringBuilder()

def write(out: PrintWriter, data: String) {
  println("  " + data)
  out.println(data)
}

Database.forURL(DatabaseUrl, driver = "org.postgresql.Driver") withSession {

  val pages = for {
    revision <- Revisions
    node <- revision.node if (
      node.versionId === revision.versionId &&
      (node.nodeType === "page" || node.nodeType === "profile") &&
      node.status === Published &&
      node.language =!= "nl" && node.language =!= "fr")
    url <- UrlAliases if (url.source === ConstColumn("node/") ++ node.id.asColumnOf[String])
  } yield (node.id, url.destination, revision.title, revision.teaser, revision.body)

  pages foreach {
    case (nodeId, url, title, summaryHtml, body) =>

      val fileName = url.replaceAll("^content/?", "").replaceAll("/", "-") + "-" + nodeId + ".html"

      val summary = summaryHtml.trim.
        replaceAll( """\*""", """\\*""").
        replaceAll(" (style|class|rel)=\"[^\"]+\"", "").
        replaceAll("</?p[^>]*>", "").
        replaceAll("</?span>", "").
        replaceAll("(</?code>|</?tt>)", "`").
        replaceAll("(</?strong>|</?b>)", "**").
        replaceAll("</?em>", "*").
        replaceAll("<a href=\"([^\"]+)\" title=\"([^\"]+)\">([^<]+)</a>", "[$3]($1 \"$2\")").
        replaceAll("<a href=\"([^\"]+)\" ?>([^<]+)</a>", "[$2]($1)").
        replaceAll("\\\"", """\\\"""")

      // Generate
      println(fileName)
      import java.io.File
      val outputFile = new File(TargetDirectory, fileName)
      val out = new java.io.PrintWriter(outputFile)

      write(out, "---")
      write(out, "layout: page")
      write(out, "title: \"%s\"" format title.replaceAll("\\\"", """\\\""""))
      write(out, "summary: \"%s\"" format summary)
      write(out, "---")
      write(out, "")
      out.println(body.replaceAll( """\r\n""", "\n"))
      out.close()
  }

  println("%d pages" format Query(pages.length).first)
  println()
//  println(warnings.toString)
}


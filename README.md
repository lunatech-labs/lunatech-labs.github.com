# lunatech-labs.github.com - GitHub pages prototype

## Basics

* Generated files can be viewed locally with working CSS and JavaScripts.
* Generated files contain links with absolute URLs that only work online.
* Files and directories whose names don’t start with an underscore are copied to the generated site.
* Files that start with a [YAML Front-Matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) section are processed by the [Liquid templating system](https://github.com/shopify/liquid/wiki/liquid-for-designers) and have [Jekyll template data](https://github.com/mojombo/jekyll/wiki/template-data) available.
* Processed files can specify their target URL with a `permalink` variable.
* Markdown files are rendered as HTML.
* Generated files have `.html` extensions, but the site (and its links) uses URLs without an extension (which presumably works because of the Github Pages web server configuration).

## Files

See also: [Jekyll usage - basic structure](https://github.com/mojombo/jekyll/wiki/usage).

`_config.yml` - [Jekyll configuration](https://github.com/mojombo/jekyll/wiki/configuration)

`_includes/` - files included with the `include` tag - see [Liquid Extensions](https://github.com/mojombo/jekyll/wiki/liquid-extensions)

`_layouts/` - page layout templates specified by the [front-matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) `layout` variable

`_site` - the generated static web site

`archives/` - static files (attachments) for editorials, in the generated URL structure

`editorials/_posts` - articles in Markdown format

`editorials/index.html` - index page that includes a list of articles

`editorials/tags/` - browse-by-tag pages - these could generated from the `tags` variables in the articles front-matter sections

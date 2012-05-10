# lunatech-labs.github.com - GitHub pages prototype

## Jekyll basics

* To generate the site locally, install and Jekyll with `sudo gem install jekyll` and `jekyll --pygments --safe`
* Generated files can be viewed locally with working CSS and JavaScripts.
* Generated files contain links with absolute URLs that only work online.
* Files and directories whose names don’t start with an underscore are copied to the generated site.
* Files that start with a [YAML Front-Matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) section are processed by the [Liquid templating system](https://github.com/shopify/liquid/wiki/liquid-for-designers) and have [Jekyll template data](https://github.com/mojombo/jekyll/wiki/template-data) available.
* `_posts` files specify their target URL with a `permalink` variable.
* `_posts` file names must have the format `yyyy-MM-dd-title.html`
* Other generated pages URLs are determined by the `permalink` variable in `_config.yml`.
* A post’s categories are the names of its parent directories (e.g. ‘services’)
* Markdown files are rendered as HTML.

## Site set-up

* Editorials don’t have any categories.
* Generated files have `.html` extensions, but the site (and its links) uses URLs without an extension (which presumably works because of the Github Pages web server configuration).

## Files

See also: [Jekyll usage - basic structure](https://github.com/mojombo/jekyll/wiki/usage).

`_config.yml` - [Jekyll configuration](https://github.com/mojombo/jekyll/wiki/configuration)

`_includes/` - files included with the `include` tag - see [Liquid Extensions](https://github.com/mojombo/jekyll/wiki/liquid-extensions)

`_layouts/` - page layout templates specified by the [front-matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) `layout` variable

`_posts` - articles in Markdown format

`_site` - the generated static web site

`404.html` - page served with an HTTP 404 Not Found response

`archives/` - static files (attachments) for editorials, in the generated URL structure

`editorials/tags/_posts/` - Browse-by-tag pages - these could generated from the `tags` variables in the articles front-matter sections. These need to be in a `_posts` directory, so that they have the category `tags` from the parent directory, used to generate site tags lists.

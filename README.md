# www.lunatech-research.com GitHub Pages migration

This repository is the [GitHub Pages](http://pages.github.com) site for /. GitHub Pages is based on Jekyll, a site generator written in Ruby.

## Jekyll basics

* To generate the site locally, install and run Jekyll with `sudo gem install jekyll` and `jekyll --pygments --safe`
* Generated files can be viewed locally with working CSS and JavaScripts.
* Generated files contain links with absolute URLs (without the `.html` suffix) that only work on-line.
* Files and directories whose names don’t start with an underscore are copied to the generated site.
* Files that start with a [YAML Front-Matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) section are processed by the [Liquid templating system](https://github.com/shopify/liquid/wiki/liquid-for-designers) and have [Jekyll template data](https://github.com/mojombo/jekyll/wiki/template-data) available.
* `_posts` files may specify their target URL with a `permalink` variable.
* `_posts` file names must have the format `yyyy-MM-dd-title.html`
* Other generated pages’ URLs are determined by the `permalink` variable in `_config.yml`, which may use categories.
* A post’s categories are the names of its parent directories (e.g. ‘services’)
* Markdown files are rendered as HTML.

## Site set-up

* Generated files have `.html` extensions, but the site (and its links) uses URLs without an extension (which presumably works because of the Github Pages web server configuration).
* Editorials at `/archives/` are a separate GitHub Pages site at [lunatech-labs/archives](https://github.com/lunatech-labs/archives).

## Files

See also: [Jekyll usage - basic structure](https://github.com/mojombo/jekyll/wiki/usage).

`_config.yml` - [Jekyll configuration](https://github.com/mojombo/jekyll/wiki/configuration)

`_includes/` - files included with the `include` tag - see [Liquid Extensions](https://github.com/mojombo/jekyll/wiki/liquid-extensions)

`_layouts/` - page layout templates specified by the [front-matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) `layout` variable

`_site` - the generated static web site

`404.html` - page served with an HTTP 404 Not Found response

## To do

* Document the static page publishing process.

## Development environment

To set-up your development environment:

1. Make a local clone of this repository from [GitHub](https://github.com/lunatech-labs/lunatech-labs.github.com/) and one for [the archives](https://github.com/lunatech-labs/archives)
2. Install Jekyll as described [above](#jekyll-basics)
3. Put the following contents in `/etc/apache2/users/<your username>.conf`, replacing `<location_of_your_clone>` with the actual location of your clones:

        DocumentRoot "<location_of_your_clone>/lunatech-labs.github.com/_site"
        
        <Directory "<location_of_your_clone>/lunatech-labs.github.com/_site">
            Options Indexes FollowSymLinks MultiViews
            Order allow,deny
            Allow from all
        </Directory>
        
        Alias /archives <location_of_your_clone>/archives/_site
        
        <Directory "<location_of_your_clone>/archives/_site">
            Options Indexes FollowSymLinks MultiViews
            Order allow,deny
            Allow from all
        </Directory>

4. Restart Apache: `sudo apachectl restart`

Every time you want to see changes, regenerate the sites (in the top-level directory of the repo you want to see): 
* $ `jekyll --safe --no-lsi --pygments --no-server --no-auto`

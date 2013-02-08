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

These instructions tell you how to set up your OSX machine to serve your own version of lunatech.com and blog.lunatech.com. If you’re using any other OS, adapt as necessary.

To set-up your development environment:

1. Make a local clone of this repository from [GitHub](https://github.com/lunatech-labs/lunatech-labs.github.com/) and one for [the archives](https://github.com/lunatech-labs/archives) or your own forks
2. Install Jekyll as described [above](#jekyll-basics)
3. Put the following contents in `/etc/apache2/users/<your username>.conf`, replacing `<location_of_your_clone>` with the actual location of your clones:
        ServerName localhost
        
        DocumentRoot "<location_of_your_clone>/lunatech-labs.github.com/_site"
        
        <Directory "<location_of_your_clone>/lunatech-labs.github.com/_site">
            Options Indexes FollowSymLinks MultiViews
            Order allow,deny
            Allow from all
        </Directory>
        
        <VirtualHost blog.lunatest.com>
            ServerName blog.lunatest.com
        
            DocumentRoot "<location_of_your_clone>/archives/_site"
        
            <Directory "<location_of_your_clone>/archives/_site">
                Options Indexes FollowSymLinks MultiViews
                Order allow,deny
                Allow from all
            </Directory>
        </VirtualHost>

4. Edit `/etc/hosts` and append `blog.lunatest.com` to the line starting with `127.0.0.1`
5. Restart Apache: `sudo apachectl restart`
6. Point your browser to [localhost](https://localhost/) or [blog.lunatest.com](http://blog.lunatest.com/) to see the sites.

If you’d rather use something that doesn’t look like a real website’s hostname, you can replace blog.lunatest.com with whatever you like (in the hosts file and Apache config) but note that Chrome forces you to type `http://` in front of it, otherwise it thinks you want to search.

Every time you want to see changes, regenerate the sites (in the top-level directory of the repo you want to see): 
* $ `jekyll --safe --no-lsi --pygments --no-server --no-auto`

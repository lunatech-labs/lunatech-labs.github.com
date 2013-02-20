---
layout: page
path_prefix: ../
title: Training courses
categories: training
---

Although Lunatech’s focus is on development projects and consultancy, we occasionally offer training. Lunatech technical training courses share our expertise with new technologies and our practical experience of applying these technologies on commercial software development projects for our industry customers.

Our courses are fast-paced and aimed at software developers who are smart but busy. Attendees will not be challenged, not bored.

{% for article in site.categories.training reversed %}
## <a href="/{{ article.url | replace:'.html','' }}">{{ article.title }}</a>

{{ article.summary }}
{% endfor %}

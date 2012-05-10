---
layout: article
permalink: archives/2012/04/11/play-framework-20-productivity-tips.html
title: Play Framework 2.0 productivity tips
tags: playframework scala
author: Ludovico Fischer
signature: Ludovico Fischer is a junior software developmer at Lunatech Research
summary: Curious about [Play 2.0](http://www.playframework.org/documentation/2.0/Philosophy) but not sure where to start? Here are some tips to make the most of your experience developing with Play 2.0.
---

## Use continuous compilation mode

In development mode, Play 2.0 automatically checks if the code has been modified and recompiles it if needed with each new request. For an even greater productivity, try typing ~compile at the Play 2.0 console. Now there is not even the need to make an HTTP request: Play will do a recompile each time you save.
But wait, there’s more! For even greater productivity, try typing ~test at the console. Now Play automatically runs your tests each time you change a file! If you want to visit the application you are developing, just press enter and type run to start the server again.

## Use play.api.http.StandardValues

Play supplies constants for header names and content types in the play.api.http.StandardValues. Using these prevents accidental misspellings and keeps your usage consistent. As a bonus, if you use the Content Type constants, Play automatically adds the correct character encoding to the content type based on what is configured for the application.

## Save your controller Results for later

In Play 2.0, controllers return Result objects. Did you know that you can define these results separately and reuse them in multiple methods? For instance, if you are redirecting to the same page from many different parts of your application, you can create the redirect once and then return it from wherever it is needed. This makes for consistency and allows you to make the navigation structure of your application explicit.

## Don’t be afraid of Scala

Play 2.0 core is written in Scala, but you do not need to know any Scala to use the Java API. On the other hand, Scala is a very good way to get acquainted with more recent concepts in programming language design. If you already know the Play Java API, Play 2.0 offers a great way to get your feet wet with Scala while remaining in familiar territory.

You do not need a PhD in category theory, but getting acquainted with other functional languages such as [OCaml](http://caml.inria.fr/ocaml/index.en.html), [Haskell](http://www.haskell.org/haskellwiki/Haskell) or even Microsoft’s [F#](http://www.tryfsharp.org/) is more efficient than trying to grasp Scala in terms of Java features. I particularly recommend [this excellent tutorial](http://learnyouahaskell.com/), which will guide you through all the relevant concepts in a couple of weeks.

Whatever your choice of language, you will find that Play 2.0 is an elegant framework with lots of well thought-out features. Since the framework has only been officially released last month, the community is not as large as for Play 1.2, but if you do not mind being a bit more on the bleeding edge, Play 2.0 is one of the most capable tools for web development on the JVM.

---
layout: article
permalink: archives/2012/05/07/review-drools-developer-cookbook.html
title: Review - Drools Developer’s Cookbook
tags: drools
author: Peter Hilton
signature: Peter Hilton is a senior software developer at Lunatech Research, committer on the Play open-source project and co-author of the book [Play for Scala](http://bit.ly/playforscala).
summary: This article is a review of [Drools Developer’s Cookbook](http://www.packtpub.com/drools-developers-using-jboss-cookbook/book), a new book from Pack Publishing’s Open Source brand by [Lucas Amador](http://lucazamador.wordpress.com/), based on Drools 5.2.0-Final.
---

**Despite issues with the cookbook format, this is a useful book full of rich technical content: recommended for any Java developer working on a JBoss Rules implementation project.**

## Introduction

This book is the latest in a handful of books about the JBoss Rules (a.k.a. Drools) rules engine. Unlike some of the previous Drools books, this is a book for programmers that contains lots of code and promises to demonstrate a selection of practical techniques.

This is a marked difference to Packt’s previous Drools books: [JBoss Drools Business Rules](http://www.packtpub.com/jboss-drools-business-rules/book) is a much less technical book for business analysts (that don’t write code) and [Drools JBoss Rules 5.0 Developer's Guide](http://www.packtpub.com/drools-jboss-rules-50-developers-guide/book) is a shallow overview of the various components of Drools 5.0, which was a significant change from previous versions.

This Drools Developer’s Cookbook sets expectations for what kind of book it is on the cover: apart from the title, the cover describes the book as ‘Quick answers to common problems’ and ‘Over 40 recipes for creating a robust business rules implementation by using JBoss Drools rules’. I’ll return to these expectations later, but the short version of this review is that although this is a good and useful book that is worth having, it does not deliver on these initial promises.

## Overview

This book is structured into nine chapters, each of which contain five or six fairly high-level ‘recipes’.

1. Expert: The Rule Engine
1. Expert: Behind The Rules
1. Guvnor: Centralized Knowledge Management
1. Guvnor: Advanced Features and Configuration
1. Fusion: Processing Complex Events
1. Executing Rules Remotely
1. Integration: How to Connect Drools
1. Planner: Optimizing Your Automated Planning
1. jBPM5: Managing Business Processes

It turns out that all of these chapters are about using the various Drools components’ Java APIs; this is not a book about writing the actual rules using Drools Rule Language (DRL). What is also clear from the table of contents is that there are chapters on all of Drools high-level components - Expert, Guvnor, Fusion, Planner and jBPM5 - which means that however you are using Drools, there is something here for you. But not much.

This is where the book’s weakness starts to become apparent: it covers useful and interesting topics but its scope is very broad and because it (fortunately) is not a long book, at just under 300 pages, there is not much material on any given topic. This is perhaps the trade-off between on-line publishing, where search engines reward niche content, and book publishing aims for a broad audience. Even so, a book-length version of any one of the chapters would probably be a better book, provided its the chapter I'm interested in, of course.

## Contents - overall

As the title suggests, this book is in ‘cookbook’ format, in which each recipe has a standard structure of introduction, ‘how to do it’, ‘how it works’, and ‘there’s more’ spread over several pages. These recipes are useful and well-presented, in general. Many recipes also turn out to be a useful set-up for a deeper explanation of how Drools works. Despite the cookbook format, there is frequent explanation of Drools concepts and broader teaching material than just how to solve a particular problem.

However, too many recipes are really just ‘using feature X‘ - which makes them less useful than more specific recipes that start with a statement of an actual problem. There is little sign of the ‘solutions to common problems’ promised on the cover.

The problem with 'cookbook' recipes of the form 'using feature X' is as follows. A tool designer (the Drools team) tries to define and describe features that clearly solve a specific class of problems. The whole point of a cookbook is for someone else (the author) to present a collection of non-obvious mappings from problems to features. Otherwise, the only value is in adding detail to the manual, in which case the title should be 'missing manual' instead of 'cookbook’.

That would actually be entirely appropriate in this case: the Drools documentation can be hard to use and incomplete, and this book provides a lot of good additional material. It adds explanatory text between examples that is missing from the Drools documentation, which makes this easier to follow and more useful.

Packt should take a leaf out of O’Reilly’s, er… book, and either tighten up the cookbook format so that recipes have a clear problem statement and work independently of each other, or recognise when what they have on their hands is a good book, like this one, that just isn’t a cookbook.
One of the problems with the format in this book is that there is too much repetition between the ‘How to do it’ and ‘How it works’ sections. It’s reasonable to show a code listing (e.g. a whole class) in the first section and then break it down into snippets in the next section, but repeating seven or more lines of Maven dependency XML configuration twice per recipe is ridiculous, especially since after the first recipe, each dependency could just be stated as group, artifact and version on a single line. At various places in the book this reaches the ridiculous level of more than a page of Maven dependency XML in a six-page recipe. Perhaps I should at least be glad that a book cannot download the Internet as well.

## Chapters

Chapter 1 - Drools Expert - starts well, with a basic first recipe followed by several useful techniques. However, the chapter seems to end early. This doesn’t really matter, because chapter 2 continues the topic of recipes that use the Drools Expert API. The key weakness of these two chapters is that their twelve recipes are collectively a fairly random selection of Drools Expert features that seem to lack a common theme or goal. This is not a serious issue, because if you have a specific problem, there is a good chance that you have enough of an idea about what the technical solution is to recognise which recipe to use.

Chapter 2 continues with more advanced recipes, which is great, but this does make the lack of clear problem statements more problematic, resulting in unanswered questions. For example, the Marshalling knowledge sessions recipe doesn’t make it clear would you use this, and why would you want a different marshalling strategy. Similarly, the Using persistence to store knowledge recipe is missing a discussion about why you would do this and what the implications are. Working memory facts are usually stored in, well… memory, so putting them in a database is a relatively big step. The most problematic recipe in this chapter is Using a custom classloader in a knowledge agent: the explanation of what the technique is for does not make sense, and you would have to be pretty far towards solving any particular problem to decide that what you need is a custom classloader. Other recipes are easier to follow, though: Verifying the quality of rules and Monitoring with JMX both make the benefits clear.

Chapter 3 - Drools Guvnor - is a weak chapter, with recipes that just reproduce the Drools Guvnor documentation, with minimal additions. The first few recipes show basic features for defining models and enumerations, but without any discussion about the trade-offs when using them, or which problems they specifically relate to. These recipes are followed by manual sections for new Guvnor features, which are at least slightly more useful in that they have a little more detail than the corresponding Drools Guvnor documentation, perhaps only because the features are new.

Chapter 4 is largely the same story as chapter 3, with more of the Drools Guvnor documentation. Perhaps the best recipe is the otherwise undocumented tip on how to change the user-interface language Spanish, French, Japanese, Brazillian Portuguese or Chinese.

Chapter 5 - Drools Fusion - consists of more manual sections with relatively little statement of the problem at hand. However, there is a running example, which takes the recipes in the direction of identifying specific problems. This chapter is a clear example of how this is a good book, with well-written examples, that just doesn’t work very well in the cookbook format. In particular, this chapter’s running example works well.

Chapter 6 is a very useful chapter about web services integration, which can cost a lot of time to configure correction in an enterprise environment, especially when using SOAP. This is an important topic, because using Drools as a rules service in a service-oriented architecture is a common use case.

Chapter 7 is another useful integration chapter, this time focusing on Apache Camel and ActiveMQ, both with Spring Framework configuration. This gives a glimpse of how Drools can be related to various enterprise integration patterns. As with the previous chapter, this chapter involves a lot of configuration and therefore has the potential to save the reader a lot of time on a project.

Chapters 8 and 9 finish the book with ‘getting started’ tutorial material for Drools Planner and jBPM5.

## Conclusion

My criticisms about the last Packt book I read ([Play Framework Cookbook](http://www.lunatech-research.com/archives/2011/09/19/playframework-cookbook-review)) apply here too: more typos than I’m used to in a print book, bad typography and code sample formatting, and difficulties with the cookbook format. None of these are critical problems, and in fact they’re a moot point if other publishers have not managed to publish Drools books at all. Packt seem to cut a few corners, but they must be doing something right if they are first to market with a book, like this one, that’s worth having.

What matters most in this book is the content, which well-written and demonstrates the author’s knowledge of the topic, resulting in a useful book. This book passes the test of any cookbook, which is that it contains recipes that you are likely to need as a Java developer on a Drools implementation project. For this reason, I recommend this book.

There is still room for more books about Drools. The biggest gap is that there still isn’t a book that teaches you how to write the actual rules themselves, using Drools Rule Language (DRL). That’s a topic that needs a book, because declarative rules programming is very different to the object-oriented or procedural approaches that most commercial software developers use every day.

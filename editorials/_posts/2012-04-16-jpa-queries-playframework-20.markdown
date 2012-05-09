---
layout: article
permalink: archives/2012/04/16/jpa-queries-playframework-20.html
title: Syntactically correct and type-safe JPA queries in Play 2.0
tags: playframework jpa
author: Leonard Punt
signature: Leonard Punt is a software development intern at Lunatech Research
summary: When writing a Play 2.0 Java web application it is likely you’re not only persisting data, you also want to retrieve your persisted data. One of the options is using the Java Persistence API (JPA), version 2. When using JPA, there are several ways to read data from your database. In this article we’ll explain three different approaches, and we’ll discuss the syntax correctness and type-safety of the approaches.
---

For all three approaches we’ll use the same use case: find a `User` object by its ‘username’ property.

### Java Persistence API query language

An easy way to read data from our database is by creating a ‘dynamic query’ with use of the Java Persistance API (JPA) query language, a string-based query language. To find a `User` by username we would write something like:

{% highlight java %}
try {
    return JPA.em()
        .createQuery("from User where username = :username", User.class)
        .setParameter("username", "foo").getSingleResult();
} catch (NoResultException nre) {
    return null;
} catch (NonUniqueResultException nure) {
    return null;
}
{% endhighlight %}

The problem with this example is syntax checking. The query language is not checked at compile time, so if we write `from Uzer` instead of `from User` no compile-time errors will occur. However, because the query is incorrect, we <em>will</em> get a runtime error. To prevent these kind of runtime errors we need a way to create syntactically checked queries. This is where the JPA Criteria API comes in.

### JPA Criteria API

The Criteria API is an alternative to the query language. It allows us to define object-based queries instead of the string-based approach of the query language. The advantage is that these object-based queries are more syntactically checked.

If we want to find the `User` with help of the Criteria API it becomes this piece of code:

{% highlight java %}
try {
    CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
    CriteriaQuery&lt;User&gt; query = cb.createQuery(User.class);
    Root&lt;User&gt; user = query.from(User.class);
    query.where(cb.equal(user.get("username"), "foo"));
    return JPA.em().createQuery(query).getSingleResult();
} catch (NoResultException nre) {
    return null;
} catch (NonUniqueResultException nure) {
    return null;
}
{% endhighlight %}

Here the compiler will give us an error if we write `Uzer.class` instead of `User.class`. So more syntax checking. But as you probably already noticed, `user.get("username")` is still not checked for correct syntax. Our code will successfully compile if we replace `username` with `uzrname`. This is because the compiler doesn’t know if `uzrname` is a property of the `User` class. So we need more syntax checking to prevent these kind of errors. With the help of Java Persistence Metamodel API we can create fully syntactically checked queries.

### JPA 2.0 Metamodels

A metamodel class is a class that represents the datastructure of the corresponding model class. For example, this model class:

{% highlight java %}
@Entity
public class User {
    public Long id;
    public String username;
}
{% endhighlight %}

Would have the following metamodel class:

{% highlight java %}
@StaticMetamodel(User.class)
public abstract class User_ {
    public static volatile SingularAttribute&lt;User, String&gt; username;
}
{% endhighlight %}
Now we are able to create a type-safe query:

{% highlight java %}
try {
    CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
    CriteriaQuery&lt;User&gt; query = cb.createQuery(User.class);
    Root&lt;User&gt; user = query.from(User.class);
    query.where(cb.equal(user.get(User_.username), "foo"));
    return JPA.em().createQuery(query).getSingleResult();
} catch (NoResultException nre) {
    return null;
} catch (NonUniqueResultException nure) {
    return null;
}
{% endhighlight %}

These metamodels are pretty useful because our queries are syntactically correct and type-safe&#33; Syntactically correct because all the syntax is checked. We will get an error is we replace `username` by `uzername`. So if we, for example, rename a variable, the compiler will tell us which queries we forgot to update. We won’t get a runtime error.

The query is also type-safe. Type safety means that the compiler will validate types while compiling. If a wrong type is assigned to a variable an exception is thrown at compile time. As you probably know Play 2.0 is [focused on type safety](http://www.playframework.org/documentation/2.0/Philosophy).

Because of the metamodels, the compiler knows the type of the variables. So you can’t for example do:

{% highlight java %}
try {
    CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
    CriteriaQuery&lt;User&gt; query = cb.createQuery(User.class);
    Root&lt;User&gt; user = query.from(User.class);
    query.like(cb.like(user.get(User_.id), "1"));
    return JPA.em().createQuery(query).getSingleResult();
} catch (NoResultException nre) {
    return null;
} catch (NonUniqueResultException nure) {
    return null;
}
{% endhighlight %}

This query won’t compile because the `like` method needs a `Expression&lt;String&gt;` as first parameter and `id` is a `Expression&lt;Long&gt;`.

Because it takes some time to write these metamodels by hand, it would be nicer to generate them. The next paragraph will explain how to generate metamodels in Play 2.0.

### JPA 2.0 Metamodel genaration in Play 2.0

A way to generate our metamodels is by using the `org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor`. The processor will automatically run if the hibernate-jpamodelgen.jar is added to the classpath and when you are using JDK 6. So we add a project dependecy to our Build.scala:

{% highlight scala %}
val appDependencies = Seq(
    "org.hibernate" % "hibernate-jpamodelgen" % "1.2.0.Final"
)
{% endhighlight %}

And specify a folder where the generated source files are placed. This is done by passing an argument to the Java compiler. Passing an argument is also done in Build.scala:

{% highlight scala %}
val main = PlayProject(appName, appVersion, appDependencies, mainLang = JAVA).settings(
    javacOptions ++= Seq("-s", "metamodel")
)
{% endhighlight %}

Note that the provided folder must exist, the Java compiler won’t generate it for you. So it is probably not a good idea to put the metamodels in our target folder, because its contents are deleted when the the `play clean` command is run.

Eclipse users can add the metamodel folder to their ‘source folders’ (Project → Properties → Java Build Path → Source → Add Folder) for autocompletion etc.

### Conclusion

Using the Criteria API with metamodels gives us the opportunity to write syntactically correct and type-safe queries. It is also quite easy to generate these metamodels. So with a bit of effort we can get nice object-based, syntactically correct and type-safe queries that cause fewer runtime errors.

### Sources

[JSR-317 - Java Persistence 2.0](http://jcp.org/aboutJava/communityprocess/final/jsr317/)

[Hibernate JPA 2 Metamodel Generator](http://docs.jboss.org/hibernate/jpamodelgen/1.0/reference/en-US/html_single)

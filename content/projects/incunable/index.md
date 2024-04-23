# Incunable

Incunable is a templating engine, which operates on [Markdown/CommonMark documents](https://commonmark.org) and turns them into for example webpages. In the Markdown, you can use pre-defined templates, on which variable substitution will be performed.

The engine is made up of a series of awk scripts, along with some Bash and Python thrown in to manage the scripts.

{{github |repo=incunable}}

## Template example
As an example, consider the template `{{leftcurlybracket}}{{leftcurlybracket}}imgframe |file=bees.jpg |title=Bees entering their hive |ref=beeimage{{rightcurlybracket}}{{rightcurlybracket}}`. Since the engine has a template called `imgframe`, it will be read and the content of the parameters will be inserted into the template. This is the content of the `imgframe` template:

```
<figure class="imageframe">
<img src="${file}" alt="${title}" />
<figcaption>Figure ${num}: ${title}</figcaption>
</figure>
```

We provided three parameters to the template: `file`, `title` and `ref`. In `imgframe` above there are three variables to substitute: `file`, `title` and `num`. The reason for the difference is that the original template that the user inputs is transformed during the pre-processing step of the engine.

Some templates have pre-processing scripts associated with them, and before performing the substitution, a pre-processing run will execute these scripts as needed. They do different things for different templates, and tend to have side-effects. The pre-processing script for `imgframe` will do a few different things:
* It will adjust the `file`-parameter so that it is relative to the right path.
* It will increment a counter for each `imgframe` that it encounters, and write this number associated with the `ref` parameter to a temporary file. This allows the `ref` template to later fetch this number and from the text refer to the figure.
* It will insert the `num` variable into the `imgframe` reference.

In other words, for this template the pre-processing step will **modify** the `file`-parameter, **insert** a new parameter `num`, and it will **write** an association between the `ref` parameter and the `num` to a temporary file.

## Pre-processing transformations
Some templates will as output write **other** templates; for example `{{leftcurlybracket}}{{leftcurlybracket}}math |eq=\Delta{{rightcurlybracket}}{{rightcurlybracket}}` will be turned into `{{leftcurlybracket}}{{leftcurlybracket}}beginmath{{rightcurlybracket}}{{rightcurlybracket}}\Delta{{leftcurlybracket}}{{leftcurlybracket}}endmath{{rightcurlybracket}}{{rightcurlybracket}}`, and this LaTeX-code will be made into an SVG and the template turned into `{{leftcurlybracket}}{{leftcurlybracket}}img |file=eq_0.svg |title=\Delta{{rightcurlybracket}}{{rightcurlybracket}}`. Thus, `math` produces `beginmath` and `endmath`, and `beginmath` produces `img`.

The engine takes care of creating a tree of the order in which the pre-processing scripts will be run, so that one can take over from another.


## Algorithm
For each input file, the following operations will be performed:
1. The pre-processing scripts will be run, in the right order.
2. Template substitution is performed.
3. The document is turned into HTML with [cmark-gfm](https://github.com/github/cmark-gfm) (i.e. the GitHub fork of cmark).


## Project name
Wikipedia says that "an incunable is a book, pamphlet, or broadside that was printed in the earliest stages of printing in Europe, up to the year 1500". In other words, a primitive form of automated printing. The likeliness is that this engine is a rudimentary template substitution engine, less performant and less versatile than more complex alternatives, but it is rather by design primitive.

{{github |repo=incunable}}

{{thumbnail |title=Incunable logo: |small=incunable_small.png |large=incunable.png}}

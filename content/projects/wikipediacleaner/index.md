# Wikipedia Bot

As the name suggests, this project is a bot for doing automated changes to articles in Wikipedia, an online encyclopedia that anyone is free to improve. I wanted to learn how to create extensions to the Firefox browser, so I implemented the bot as an extension. It is mostly used for changing the so called templates of articles. A good example of a template is the information boxes that are present in many articles. The author of the article just enters a few parameters in a template, and the information is displayed by the template in some way.

As Wikipedia grows, many old templates become deprecated or obsolete, and new ones take their place. Most of the work the bot has done is about extracting information from the old templates, and inserting them into new ones. The extraction process is not straight forward, as templates can be nested inside templates, so the code must be context aware.

As a side project to this, I also constructed a template cleaner, which will format the template data in a consistent and human friendly way, thus helping inexperienced Wikipedia editors to find the relevant information in the templates.

The bot has made over 400 changes to the Swedish Wikipedia. It is started with the click of a button inside Firefox and has no GUI of its own.

{{thumbnails |text=Below is a screenshot that shows what a somewhat typical template might look like, in this case the template "Infobox video game".}}
{{thumbnail |title=A screenshot that shows what a somewhat typical template might look like, in this case the template "Infobox video game" |small=wikipediacleaner_small.png |large=wikipediacleaner.png}}

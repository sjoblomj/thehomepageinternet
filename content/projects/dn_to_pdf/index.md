# dn_to_pdf

This is a parser for taking articles from the Swedish newspaper Dagens Nyheter, and turning them into PDFs for easy and convenient reading offline.

Given a URL to an author on dn.se, all their articles will be downloaded. The downloaded HTML will be parsed into [Markdown](https://en.wikipedia.org/wiki/Markdown), and all images associated with the article will be downloaded and shrunk down. The Markdown will be turned into Latex. Finally, the script will loop over all years, assembling all articles from a given year into a PDF.


## Cookie
To use the script, you must have a subscription to Dagens Nyheter. Your login information is stored in a cookie and sent by the browser to the site, which is how it can identify that you have access to the pages behind the paywall. You need to provide this cookie to the script. How to obtain the cookie depends on your browser.

## Tools
The following tools are needed to run the script:

* Unix tools
* [cmark-gfm](https://github.com/github/cmark-gfm)
* curl
* ImageMagick
* xelatex


The parser is written in awk and the script to download and assemble the articles is implemented in Bash. {{github |repo=dn_to_pdf}}

{{thumbnails |text=Below is the icon of the project.}}
{{thumbnail |title=The icon of the project |small=dn_to_pdf_small.png |large=dn_to_pdf.png}}

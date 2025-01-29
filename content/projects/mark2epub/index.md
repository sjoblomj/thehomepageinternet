# mark2epub

mark2epub is a simple Python program that converts Markdown files to ePub books. It supports images and styling using CSS-files.

Markdown has a few unofficial extensions, one of them being footnotes. Footnotes were previously not supported by mark2epub, but the underlying markdown library that it utilises does support footnotes through extensions.

In order to make mark2epub more useful, I went through the code, found where it enables extensions and added footnotes to that list.

The Pull Request can be found [here](https://github.com/AlexPof/mark2epub/pull/3).


{{thumbnail |title=ePub logo: |small=mark2epub_small.png |large=mark2epub.png}}

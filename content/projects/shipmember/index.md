# shipmember

A program for sending information to members of groups, associations etc. The program will read a csv file with membership information, parse it and create personal messages for every recipient in the file. The program has the following features:

* Can send HTML formatted emails (over smtp) with support for template driven personal greetings.
* Can create PDF files with personal greetings using LaTeX.
* Can notify only those who are flagged as having not paid.
* Can notify only those who have (or lack) email addresses.
* Can notify only a given subset of members.
* Can treat several members as part of a single household (see below).

Several members (i.e. a family, normally) may make up a single household. Information sent out by the program will only be sent to a household once. In other words, a family consisting of several persons will receive information only once. When notifying by email, the first household member that has an email, is the one that will be used.

The program is written in Kotlin. It was created using strict test driven development, and has been mutation tested using [pitest](https://pitest.org/). {{github |repo=shipmember}}


{{thumbnail |title=Example of a generated PDF invitation (with bogus personal details): |small=shipmember_small.png |large=shipmember.png}}

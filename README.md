# thehomepageinternet
Content for the website thehomepageinternet.org

The repo contains Markdown files that are processed to static HTML using [incunable](https://github.com/sjoblomj/incunable).


## Building

To download incunable and this repo, and create static HTML, run the following:

```
git clone https://github.com/sjoblomj/incunable.git incunable
git clone https://github.com/sjoblomj/thehomepageinternet.git thi
cd incunable
./html/compile.sh ../thi/content thi_output ../thi/resources ../thi/templates
```

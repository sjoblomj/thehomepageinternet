# thehomepageinternet
Content for the website thehomepageinternet.org

The repo contains Markdown files that are processed to static HTML using [incunable](https://github.com/sjoblomj/incunable).


## Setting up

To download incunable and this repo, and setting up fly.io:

```
git clone https://github.com/sjoblomj/incunable.git incunable
git clone https://github.com/sjoblomj/thehomepageinternet.git thi
cd thi
flyctl launch
```

Creating static HTML:
```
cd incunable
./html/compile.sh ../thi/content thi_output ../thi/resources ../thi/templates
cd ..
```

Deploying to fly.io:
```
rm -rf thi/public
cp -r incunable/thi_output thi/public
cd thi
flyctl deploy
```

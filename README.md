# thehomepageinternet
Content for the website thehomepageinternet.org

The repo contains Markdown files that are processed to static HTML using [incunable](https://github.com/sjoblomj/incunable).

On every push to the `main` branch, the site will be automatically built and deployed to fly.io.


## Feeds

There is a script that allows automatic updates to the RSS files on each commit. Copy the `commit-msg` file to the `.git/hooks` directory:

```
cp commit-msg .git/hooks
```


## Setting up

To download incunable and this repo, and setting up fly.io:

```
git clone https://github.com/sjoblomj/incunable.git incunable
git clone https://github.com/sjoblomj/thehomepageinternet.git thi
```

Creating static HTML:
```
cd incunable
./html/compile.sh ../thi/content thi_output ../thi/resources ../thi/templates
cd ..
```

### Deploying

Setting up fly.io for the first time:
```
cd thi
flyctl launch
cd ..
```

Deploying to fly.io (this is done automatically on every push to the `main` branch):
```
rm -rf thi/public
cp -r incunable/thi_output thi/public
cd thi
flyctl deploy
```

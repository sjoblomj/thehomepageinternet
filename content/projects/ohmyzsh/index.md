# oh-my-zsh

Oh-my-zsh is a very popular open-source community driven framework for managing zsh configurations. With over 177000 stars on GitHub, and over 2400 contributors, it is one of the go-to tools for users of zsh.

Oh-my-zsh comes with a vast set of plugins that the user can enable. One of them, bgnotify, will alert the user of when long-running tasks finish. That means that a user can run a command, start working on something else, and then get a system notification when the command finishes.

I added support for providing custom icons to these notifications. Using this, one could for example display one icon for commands finishing successfully, and one for commands failing.

In addition, I made some minor fixes to the code of the bgnotify plugin, and wrote some fallback awk code to fetch appid's for users of Sway who don't have jq installed.


A list of Pull Requests opened by me can be found [here](https://github.com/ohmyzsh/ohmyzsh/pulls?q=is%3Apr+author%3Asjoblomj).


{{thumbnails |text=oh-my-zsh logo, and notification messages with different icons:}}
{{thumbnail |title=oh-my-zsh logo: |small=ohmyzsh_small.png |large=ohmyzsh.png}}
{{thumbnail |title=Notification messages with icons: |small=bgnotify_small.png |large=bgnotify.png}}

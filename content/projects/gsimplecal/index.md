# gsimplecal

[gsimplecal](http://dmedvinsky.github.io/gsimplecal) is a light-weight calendar widget used in a few Linux distributions. It is written in C++ using GTK. It was made for use with tint2 panel in the openbox environment to be launched upon clicking on the clock, but it can be started in other ways. When it is started it first shows up, and when run again it closes the running instance. In that way it is very easy to integrate anywhere, without any need to write some wrapper scripts. It can be configured to not only show the calendar, but also display multiple clocks for different world time zones.

I spent some time porting the code from GTK2 to GTK3, updating the deprecated parts of the code.

{{github |repo=gsimplecal}} It has since been merged upstream. Packages for the program are available on Arch Linux, Gentoo, Fedora and Debian.

{{thumbnail |title=Screenshot of the program: |small=gsimplecal_small.png |large=gsimplecal.png}}

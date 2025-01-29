# C-Trees

c-trees is a project intended to be useful as a library. Given a directory it will find all files of a certain type within it and (optionally) recursively find all files in sub-directories. The files and folders are put in an n-ary tree structure, namely the [GNode](https://developer.gnome.org/glib/stable/glib-N-ary-Trees.html) structure of glib.

It is possible to traverse the structure and only move between files without moving to directories, making it appropriate and straight forward to use in for example an image viewing program.

There is support for file and directory monitoring, which allows the program to automatically detect when files are added or removed from directories being monitored. When that happens, there is support for having callbacks so that the user of the library is notified upon relevant file system changes and may take action based on them.

There are unit tests for all functionality, as well as a file watcher that runs the tests each time a source code file is saved.

The program was implemented in C. {{github |repo=c-trees}}


{{thumbnails |text=Below is the icon of the project, a rendered file tree as well as the unit tests.}}
{{thumbnail |title=Project icon |small=c-trees_icon_small.png |large=c-trees_icon.png}} {{comment |text=Source: https://commons.wikimedia.org/wiki/File:Laudtee_Meenikunnos.jpg}}
{{thumbnail |title=Rendered tree hierarchy of files |small=c-trees_program0_small.png |large=c-trees_program0.png}}
{{thumbnail |title=Unit tests passing and failing |small=c-trees_program1_small.png |large=c-trees_program1.png}}

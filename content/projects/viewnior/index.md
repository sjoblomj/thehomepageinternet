# Viewnior

[Viewnior](http://siyanpanayotov.com/project/viewnior/) is a light-weight image viewer, written in C. It is the standard image viewing tool of a few Linux distributions. A missing feature that has been wished by many users is to be able to recursively open a directory; in other words open all files in the directory as well as all sub-directories. I added such functionality, as well as the placement of file monitors on the opened files. This allowed the program to automatically be notified if images were added, moved or deleted from the opened directories, and thus update its internal list of images. This feature had been long wished for by users as well as the program author.

The code required extensive rewriting of the way the program handled files and built its list of images to be opened. Extensive unit tests in C were written, that can be parallelised despite testing advanced functionality such as file adding and removing.

{{github |repo=Viewnior}}


{{thumbnail |title=Screenshot of the program: |small=viewnior_small.png |large=viewnior.png}}

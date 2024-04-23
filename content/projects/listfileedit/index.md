# ListfileEdit

This program was written to manage listfiles for MPQ files for Blizzard's games. It gives the user powerful options to manage a set of different listfiles. The program has support for finding differences between listfiles, merge them, finding the unique files in different listfiles, sorting them, etc. The program can add both suffixes and prefixes to each line in a listfile and can search in a listfile for a string, which will output all lines that match.

MPQ files are archive files used in all of Blizzard Entertainments games from Diablo I and newer. They can be compared with zip-files; in other words, one MPQ file contains many files with game data in it. The MPQ archives don't contain any names of the files inside, however. In order to see the name of the files inside the MPQs, a listfile is needed. These are simply a long text file containing the names of the files inside the MPQs. In (most?) newer games from Blizzard, there is a listfile inside the MPQ archive which is more or less complete. For older games and for those files with incomplete listfiles, however, external listfiles are still needed. The editing, merging and management of those listfiles become a lot easier with this program.

The program was implemented in C++. {{github |repo=ListfileEdit}}

{{thumbnails |text=Below is a screenshot of the program, as well as the icon:}}
{{thumbnail |title=Screenshot of the program |small=listfileedit_program_small.png |large=listfileedit_program.png}}
{{thumbnail |title=Icon of the program |small=listfileedit_icon_small.png |large=listfileedit_icon.png}}

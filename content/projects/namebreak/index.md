# Namebreak

The Namebreaking project is aimed towards finding the name of a file in a data archive from the game StarCraft. The archives don't contain the names of the files inside. Instead, files are stored by the hash value of their names. The project is about testing all combinations and brute force the plain text name.

The project consists of a client and a server. The client is written in C++, and it will search in a given range. The server is a PHP-script with a MySQL database for storing data.

A through explanation of the project can be found [here](/namebreak). {{github |repo=namebreak}}


{{thumbnail |title=Screenshot of the program: |small=namebreak_small.png |large=namebreak.png}}

# Saddle

During my second summer internship working for RUAG Space, I wrote a program called Saddle in the language TCL. It generated electronic schematic symbols for printed circuit board (PCB) design. The program allowed the user to describe a symbol in a very concise manner, and drew a graphical representation.

The program exported the symbols into software by Mentor Graphics. The format used by them was proprietary and documentation of it was next to non-existent. Quite some time had to be spent trying to decipher it. The input data can be easily diffed, so that changes between versions of the symbols created can be spotted immediately. The program also has SVN support, and prints the SVN version of a file into the symbol created, to minimise any version mismatch errors.

The program saved large amounts of time for RUAG, and increased their efficiency.


{{thumbnail |title=Screenshot of the program: |small=saddle_small.png |large=saddle.png}}

# DSAhs

This program implements the signing and verification parts of the [DSA algorithm](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm) specified in the Digital Signature Standard. The program was created as a submission of an assignment at Chalmers University of Technology. The assignment was a somewhat simplified version of the DSA specification, with focus on the signing and verification parts, as well as checking the validity of the given parameters.

Given a parameter triple, a key pair and a message, the program can cryptographically sign the message. Given a parameter triple, the public key of the signer, a message and a signature, the program can check whether the signature cryptographically holds or should be discarded. It can also perform mathematical operations on the parameter triple and make sure that they are valid (i.e. whether primes are of the right length and correctly related to each other).

The program was implemented in Haskell, by me and Magnus de Laval. {{github |repo=DSAhs}}

{{thumbnails |text=Below is the icon of the project.}}
{{thumbnail |title=The icon of the project |small=dsahs_icon_small.png |large=dsahs_icon.jpg}} {{comment |text=Source: https://commons.wikimedia.org/wiki/File:Old_Town_Hall,_Wilmington.jpg}} 

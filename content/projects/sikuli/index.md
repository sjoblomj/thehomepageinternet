# Sikuli

Sikuli is a tool for desktop automation, originally developed by MIT, but now maintained by an open source community. It can be used for automation and testing of graphical user interfaces, and uses image recognition algorithms to navigate in the software under test. A user may create a script to be run, which could for example interact with the software under test by including screenshots of buttons and widgets that are to be clicked. Sikuli runs the script, finds the buttons and widgets visually and interacts with them. A presentation about test automation involving Sikuli can be found [here](http://prezi.com/arubpcolpmzv/test-automation-using-sikuli-cucumber-and-jenkins/).

A useful feature, especially during script development, is to highlight areas on the screen. This is done using a built in feature in Sikuli that draws a coloured rectangle on the screen. During debugging, one may want to display different areas in different colours, which was not previously possible. I added the option to specify colour. I also added the ability to clear the built-in message log in Sikuli using a right-click menu.

While the changes were not major, the code base is quite large and unorganised. The features were directly accepted. {{github |repo=SikuliX-2014}}

{{thumbnail |title=Screenshot of the program: |small=sikuli_small.png |large=sikuli.png}}

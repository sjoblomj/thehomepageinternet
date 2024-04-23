# NAV

Johan joined NAV as the team he was part of was formed, and they were handed a number of critical legacy systems almost without any handover. The systems were part of the Norwegian government's welfare programs, and handed citizens requests for social security. Downtime or malfunction of the systems ment that people would be without income, which in the long run would have political consequences. The software was therefore referred to as critical to society.

While stable, the systems were in dire need of attention. The tasks they performed were relatively simple, but legacy solutions and unmaintained libraries were sprinkled all over the systems. Business logic was mixed with logic for integrating with the old libraries and frameworks.

The team realized that large parts of the systems could be deprecated and had to be rewritten. Johan acted as the architect for designing and implementing a Kafka based replacement. By basing the system on Kafka, reliability and robustness could be built into the infrastructure. The system was Event Sourced, meaning that the state could always be recreated by replaying the Kafka stream. Much care was taken into the fault tolerance and reliability of the system, making sure it would run automatically, with many replicas yet leaderless, and handle error scenarios.

Thorough care was put into making extensive automatic end-to-end tests, load tests, continuous integration and state of the art solutions.

The non-legacy systems that Johan worked on are open source and can be found here:
* [Soknadsarkiverer](http://github.com/navikt/soknadsarkiverer)
* [Soknadsmottaker](http://github.com/navikt/soknadsmottaker)
* [Soknadsfillager](http://github.com/navikt/soknadsfillager)
* [Archiving infrastructure](http://github.com/navikt/archiving-infrastructure)
* [Sendsoknad](http://github.com/navikt/sendsoknad-boot)
* [Arkiv-mock](http://github.com/navikt/arkiv-mock)

{{thumbnail |title=The logo of NAV: |small=nav_small.png |large=nav.png}}

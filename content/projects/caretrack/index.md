# Caretrack

Caretrack is a telematics system from Wireless Car, a subsidiary of Volvo. It is a large Java monolith system running on JBoss, developed for more than ten years. The different kinds of Volvo heavy duty vehicles, such as excavators, graders and articulated haulers, all send data to the Caretrack system. Several measurements and metrics are sent, such as fuel consumption, operating hours and vehicle position. Using this data, Volvo can provide customers with such services as subscriptions of reports, setting geo-fences on vehicles, fleet management, automatic alarms and much more.

Johan spent quite a bit of time with maintenance and refactoring. Some initial steps were taken to move towards a micro-service architecture, and Johan was involved and took responsibility for the development of all components that were created during his time there. When production issues arose, Johan often was the first person to be entrusted to take action.

Technologies used: Java, Spring Boot, JBoss, AMQ, WMQ, JAXB, Liquibase, log4j, EJBs, JPA.

{{thumbnails |text=Screenshots of the program:}}
{{thumbnail |title=Screenshot from within the application |small=caretrack_program0_small.png |large=caretrack_program0.png}}
{{thumbnail |title=Login page |small=caretrack_program1_small.png |large=caretrack_program1.png}}

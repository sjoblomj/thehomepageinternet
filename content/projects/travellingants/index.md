# Travelling Ant Colony

This is an [ant colony optimisation algorithm](https://en.wikipedia.org/wiki/Ant_colony_optimization_algorithms) for quickly finding a good solution to the [travelling salesman problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem). Rather than finding the best solution (which is NP-hard; in other words, we know of no solution in polynomial time), it will very quickly find a good solution, using inspiration from how an ant colony behaves when foraging. Ants are remarkable in the sence that they are extremely efficient in what they do, despite being almost blind, have no means of direct communication and lack leaders.

Ants deposit volatile pheromones as they move, and these will evaporate in time. A trail with a higher level of pheromones will attract more ants, meaning that good trails will be picked over bad ones. In the Travelling Ant Colony program, artificial ants will move along the edges in the travelling salesman graph, and deposit artificial pheromones as they move. Each edge {{math |eq=e_{ij}\,}} is associated with a pheromone level {{math |eq=\tau_{ij}\,}}. The outline of the algorithm is as follows, if there are {{math |eq=n}} nodes and {{math |eq=N}} artificial ants:

1. Initialize the pheromone levels.{{linebreak}}
   {{beginmath}}
   \tau_{ij} = \frac{N}{D^{\textrm{nn} } }, \:\:\: \forall i,j \in [1,n]
   {{endmath}}{{linebreak}}
   where {{math |eq=D^{\textrm{nn} }\,}} is the length of the nearest neighbour path, i.e. the path one gets when always going to the nearest unvisted city. Performing this step will set the pheromone levels of all edges to the same value, thus creating an equal likelihood of the ants taking any path.

2. Let {{math |eq=L_T}} denote the so called tabu list, which contain the nodes already visited. This list is used to make sure the same node is not visited multiple times. For each ant {{math |eq=k}}, select a random start node, and add it to the initially empty tabu list. The next step is to build the tour {{math |eq=S}}. In each step of the tour, select the move from node {{math |eq=j}} to node {{math |eq=i}} probabilistically based on the pheromone levels and the distance between the nodes, according to:{{linebreak}}
   {{beginmath}}
   p(e_{ij} | S) = \frac{\tau_{ij}^\alpha \eta_{ij}^\beta}{\sum\limits_{v_l \notin L_T(S)} \tau_{lj}^\alpha \eta_{lj}^\beta}\,
   {{endmath}}{{linebreak}}
   In the equation, {{math |eq=\eta_{ij}\,}} is the visibility of node {{math |eq=i}} from node {{math |eq=j}}, and here has the value {{math |eq=\eta_{ij} = {}^1\!/_{d_{ij} }\,}}, where {{math |eq=d_{ij}\,}} is the euclidean distance betwen node {{math |eq=i}} and node {{math |eq=j}}. The constants {{math |eq=\alpha}} and {{math |eq=\beta}} determine the relative importance of the pheromone trails and the distance between the nodes. They have the values 1.0 and 4.0 respectively.{{linebreak}}
   In each step of the movement, the node that the ant is currently visiting is added to {{math |eq=L_T}}. When all cities have been visited in this manner, return to the first city again.

3. Update the pheromone levels. Let {{math |eq=D_k}} denote the length of {{math |eq=S}}. In other words, {{math |eq=D_k}} is the length of the entire tour for ant {{math |eq=k}}.
    1. For each ant {{math |eq=k}} (out of the total of {{math |eq=N}} ants), compute{{linebreak}}{{beginmath}}\Delta \tau_{ij}^{[k]} = \begin{cases} {}^1\!/_{D_k} & \textrm{if ant $k$ traversed $e_{ij}$} \\ 0 & \textrm{otherwise}\end{cases}\,{{endmath}}

    2. For each edge {{math |eq=\tau_{ij}\,}}, calculate the total increase of the pheromone level that the ants have deposited:{{linebreak}}{{beginmath}}\Delta \tau_{ij} = \sum_{k=1}^N \Delta \tau_{ij}^{[k]}\,{{endmath}}

    3. As the previous step would lead to an indefinate increase of the pheromone levels, the concept of evaporation is used. Thus, {{math |eq=\tau_{ij}\,}} is modified as follows:{{linebreak}}{{beginmath}}\tau_{ij} \leftarrow (1 - \rho)\tau_{ij} + \Delta \tau_{ij}\,{{endmath}}.{{linebreak}}
    Here, {{math |eq=\rho}} is the evaporation rate, and is a constant with a value between 0 and 1. If no ant has traversed an edge {{math |eq=e_{ij}\,}}, then the pheromone update for that edge consist only of evaporation.

4. Repeat steps 2 to 3 until a solution that is deemed good enough is found.


{{github |repo=TravellingAntColonyMatlab}}


{{thumbnail |small=travellingants_small.png |large=travellingants.png |title=Screenshot of Matlab running the program:}}

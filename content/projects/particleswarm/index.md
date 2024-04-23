# Particle Swarm Minimiser

This is an implementation of a [particle swarm optimisation algorithm](https://en.wikipedia.org/wiki/Particle_swarm_optimization), which will find the minimum of two functions as well as report the corresponding input values. The two functions to minimise were

{{beginmath}}
f(x, y) = 1 \,+ \,&(-13 + x - y^3 + 4y^2 - 2y)^2 \,+ \\
                  &(-29 + x + y^3 + y^2 - 14y)^2
{{endmath}}

and

{{beginmath}}
f=- &\begin{bmatrix}15 & 27 & 36 & 18 & 12\end{bmatrix} \mathbf{x} \, +\\
     \mathbf{x} ^ \top{}
    &\begin{bmatrix*}[r]
     35 & -20 & -10 &  32 & -10\\
    -20 &  40 &  -6 & -31 &  32\\
    -10 &  -6 &  11 &  -6 & -10\\
     32 & -31 &  -6 &  38 & -20\\
    -10 &  32 & -10 & -20 & 31
    \end{bmatrix*}
    \mathbf{x}\,
{{endmath}}

The algorithm is inspired by how for example bird flocks or fish schools behave. They are an interesting study, as there are no apparent leaders that the other members follow, yet the swarm behaves coherent.

In particle swarm optimisation, a common model is the Boids model (the name "Boids" is taken from "bird-like objects"), which is the model that was implemented in this program. In it, we let {{math |eq=\mathbf{S}\,}} denote a swarm of {{math |eq=N}} boids, hereafter called particles:

{{beginmath}}
\mathbf{S} = \{p_i | i = 1, ..., N \}\,
{{endmath}}.

In the model, each particle {{math |eq=p_i}} only has a limited visual range, and is unable to perceive swarm mates that are far away. The so called visibility sphere {{math |eq=\mathbf{V}_i}} of particle {{math |eq=i}} is introduced as

{{beginmath}}
\mathbf{V}_i = \{ p_j : || \mathbf{x}_j - \mathbf{x}_i || < r, \:\: j \neq i \}\,
{{endmath}},

where {{math |eq=r}} is a constant. Each particle {{math |eq=p_i}} has a position {{math |eq=\mathbf{x}_i}}, a velocity {{math |eq=\mathbf{v}_i}} and an accelleration {{math |eq=\mathbf{a}_i}}, and in each iteration of the algorithm, they are updated using standard Euler integration:

{{beginmath}}
\mathbf{v}_i &\leftarrow \mathbf{v}_i + \mathbf{a}_i \Delta t\\
\mathbf{x}_i &\leftarrow \mathbf{x}_i + \mathbf{v}_i \Delta t
{{endmath}},

where {{math |eq=\Delta t}} is the time step (here set to 1). Each particle is influenced by three movement tendencies that together determine its acceleration. These tendencies are cohersion, alignment and separation.

1. **Cohersion**{{linebreak}}
   This is the tendency of a particle to stay near the center of the swarm. Let {{math |eq=\rho_i}} denote the center of density of the visibility sphere of particle {{math |eq=i}}. If there are {{math |eq=k_i}} particles in {{math |eq=\mathbf{V}_i}}, then {{linebreak}}
   {{beginmath}}
   \rho_i = \frac{1}{k_i} \sum_{p_j \in \mathbf{V}_i} \mathbf{x}_i
   {{endmath}}{{linebreak}}
   The steering vector representing cohersion is defined as {{linebreak}}
   {{beginmath}}
   \mathbf{c}_i = \frac{1}{T^2}\left( \rho_i - \mathbf{x}_i \right)
   {{endmath}}{{linebreak}}
   where {{math |eq=T}} is a time constant. If there are no particles in {{math |eq=\mathbf{V}_i}}, then {{math |eq=\mathbf{c}_i = \mathbf{0}\,}}

2. **Alignment**{{linebreak}}
   This is the tendency of particles to align their velocities with those of their nearby swarm mates. It is defined as {{linebreak}}
   {{beginmath}}
   \mathbf{l}_i = \frac{1}{Tk_i} \sum_{p_j \in \mathbf{V}_i} \mathbf{v}_j
   {{endmath}}{{linebreak}}
   where {{math |eq=T}} is a time constant and {{math |eq=k_i}} are the number of particles in {{math |eq=\mathbf{V}_i}}. If there are no particles in {{math |eq=\mathbf{V}_i}}, then {{math |eq=\mathbf{l}_i = \mathbf{0}\,}}.

3. **Separation**{{linebreak}}
   Separation is needed in order to avoid collition with nearby swarm mates, and is defined as {{linebreak}}
   {{beginmath}}
   \mathbf{s}_i = \frac{1}{T^2} \sum_{p_j \in \mathbf{V}_i} (\mathbf{x}_i - \mathbf{x}_j)
   {{endmath}}{{linebreak}}
   where once again {{math |eq=T}} is a time constant. If there are no particles in {{math |eq=\mathbf{V}_i}}, then {{math |eq=\mathbf{s}_i = \mathbf{0}\,}}.


The acceleration of particle {{math |eq=i}} is obtained by combining these steering vectors, by the following equation:{{linebreak}}
{{beginmath}}
\mathbf{a}_i = C_c\mathbf{c}_i + C_l\mathbf{l}_i + C_s\mathbf{s}_i
{{endmath}},{{linebreak}}
where {{math |eq=C_c}}, {{math |eq=C_l}} and {{math |eq=C_s}} are constants between 0 and 1 that control the relative impact of the steering vectors.


The algorithm works as follows:
1. **Initialization**{{linebreak}}
   Initialize the positions and velocities of each particle. Let {{math |eq=N}} denote the swarm size and {{math |eq=n}} the number of variables in the problem to solve. The positions are randomly initialized, using uniform sampling in the range between {{math |eq=x_{\textrm{min} }\,}} and {{math |eq=x_{\textrm{max} }\,}}.{{linebreak}}
   {{linebreak}}
   Initialize positions of all the particles as follows:{{linebreak}}
   {{beginmath}}
   x_{ij} = x_{\textrm{min} } + r(x_{\textrm{max} } - x_{\textrm{min} })
   {{endmath}}{{linebreak}}
   where {{math |eq=x_{ij}\,}} denotes component {{math |eq=j}} of the position of particle {{math |eq=p_i}} and {{math |eq=r}} is a random number in the range 0 to 1.{{linebreak}}
   {{linebreak}}
   Initialize the velocities of all the particles as follows:{{linebreak}}
   {{beginmath}}
   v_{ij} = \frac{\alpha}{\Delta t} \left ( - \frac{x_{\textrm{max} } - x_{\textrm{min} } }{2} + r \left ( x_{\textrm{max} } - x_{\textrm{min} } \right ) \right )
   {{endmath}}{{linebreak}}
   where {{math |eq=v_{ij}\,}} denotes component {{math |eq=j}} of the velocity of particle {{math |eq=p_i}}, {{math |eq=r}} is a random number between 0 and 1, {{math |eq=\alpha}} is a constant between 0 and 1, and {{math |eq=\Delta t}} is the time step length. In the implementation, {{math |eq=\alpha}} and {{math |eq=\Delta t}} are both set to 1.

2. **Evaluation**{{linebreak}}
   The evaluation part consists of computing the objective function value for each {{math |eq=\mathbf{x}_i}}. In other words, input {{math |eq=\mathbf{x}_i}} into the objective function, in this case either{{linebreak}}
   {{beginmath}}
   f(x, y) = 1 \,+ \,&(-13 + x - y^3 + 4y^2 - 2y)^2 \,+ \\
                     &(-29 + x + y^3 + y^2 - 14y)^2
   {{endmath}}{{linebreak}}
   or {{linebreak}}
   {{beginmath}}
   f=- &\begin{bmatrix}15 & 27 & 36 & 18 & 12\end{bmatrix} \mathbf{x} \, +\\
        \mathbf{x} ^ \top{}
       &\begin{bmatrix*}[r]
        35 & -20 & -10 &  32 & -10\\
       -20 &  40 &  -6 & -31 &  32\\
       -10 &  -6 &  11 &  -6 & -10\\
        32 & -31 &  -6 &  38 & -20\\
       -10 &  32 & -10 & -20 & 31
       \end{bmatrix*}
       \mathbf{x}\,
   {{endmath}}{{linebreak}}

3. **Update the best positions**{{linebreak}}
   The objective of the algorithm is to reach optimal values of the objective function. Thus, the algorithm must keep track of the particles' performance. Both the best position {{math |eq=\mathbf{x}_{i}^{\textrm{pb} }\,}} of particle {{math |eq=i}}, and the best performance {{math |eq=\textbf{x}_{\textrm{sb} }\,}} of any particle in the swarm is stored. The former means comparing the position of particle {{math |eq=i}} in the current iteration to how well it has previously performed, and updating the record if needed. The latter can be carried out in different ways, but in this implementation, {{math |eq=\textbf{x}_{\textrm{sb} }\,}} is the best-ever position of the whole swarm. The following equations capture this:{{linebreak}}
   {{beginmath}}
   \textrm{if}\:\: & f(\mathbf{x}_i) < f(\mathbf{x}_{i}^{\textrm{pb} }) \:\: \textrm{then} \:\: \mathbf{x}_{i}^{\textrm{pb} }  \leftarrow \mathbf{x}_i\\
   \textrm{if}\:\: & f(\mathbf{x}_i) < f(\mathbf{x}^    {\textrm{sb} })\,\:\:\textrm{then} \:\: \mathbf{x}    ^{\textrm{sb} }\,\leftarrow \mathbf{x}_i
   {{endmath}}{{linebreak}}

4. **Update particle velocities and positions**{{linebreak}}
   Update the velocity of particle {{math |eq=i}} as follows, where {{math |eq=j}} goes from 1 to {{math |eq=n}}:{{linebreak}}
   {{beginmath}}
   v_{ij} \leftarrow wv_{ij} + c_1 q \left ( \frac {x_{ij}^\textrm{pb} - x_{ij} }{\Delta t} \right ) + c_2 r \left ( \frac {x_{j}^\textrm{sb} - x_{ij} }{\Delta t} \right )
   {{endmath}}{{linebreak}}
   where {{math |eq=q}} and {{math |eq=r}} are uniform random numbers between 0 and 1, {{math |eq=w}} is the so called inertia weight and {{math |eq=c_1}} and {{math |eq=c_2}} are positive constants. The {{math |eq=c_1}}-term is somtimes called the cognitive component, and measures the degree of self-confidence of a particle, i.e. how much it trusts its own previous performance in order to get a better result. The {{math |eq=c_2}}-term is sometimes called the social component, and measures how much a particle trusts others to find better candidate solutions.{{linebreak}}
   {{linebreak}}
   The inertia weight {{math |eq=w}} handles the trade off between exploration ({{math |eq=w > 1}}) and exploitation ({{math |eq=w < 1}}). Initially, {{math |eq=w=1.4}}, and after each iteration, {{math |eq=w}} is modified as follows:{{linebreak}}
   {{beginmath}}
   w \leftarrow \beta w
   {{endmath}},{{linebreak}}
   where {{math |eq=\beta}} is 0.99. For every iteration, {{math |eq=w}} is decreased in this manner, until it reaches a minimum value of 0.35, where it will be kept fixed. This procedure makes the algorithm explorative in the early stages, and later on turns more and more into exploitation.{{linebreak}}
   {{linebreak}}
   If the velocities are allowed to grow with no boundary, the swarm will cease to be coherent and will expand indefinately. Therefore, a maximal velocity {{math |eq=v_{\textrm{max} }\,}} is introduced, restricting velocities by{{linebreak}}
   {{beginmath}}
   v_{ij} = \begin{cases}
     v_{ij} & \text{if $|v_{ij}| < v_{\textrm{max} }$}\\
     \textrm{sign}(v_{ij})v_{\textrm{max} } & \text{otherwise}
   \end{cases}\,
   {{endmath}}{{linebreak}}
   where the sign-function is used to maintain the direction, and is defined as{{linebreak}}
   {{beginmath}}
   \textrm{sign}(a) = \begin{cases}
     -1 & \textrm{if}\:\: a < 0\\
     0  & \textrm{if}\:\: a = 0\\
     1  & \textrm{if}\:\: a > 0
   \end{cases}\,
   {{endmath}}{{linebreak}}
   The position of particle {{math |eq=i}} is then updated as follows, where {{math |eq=j}} goes from 1 to {{math |eq=n}}:{{linebreak}}
   {{beginmath}}
   x_{ij} \leftarrow x_{ij} + v_{ij} \Delta t
   {{endmath}}{{linebreak}}

5. **Repeat**{{linebreak}}
   Repeat from step 2, until the termination criterion has been reached.


{{github |repo=ParticleSwarmMinimiser}}

{{thumbnail |small=particleswarm_small.png |large=particleswarm.png |title=Screenshot of Matlab running the program:}}

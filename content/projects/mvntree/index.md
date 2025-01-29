# mvntree

When developing Java applications with [Apache Maven](https://en.wikipedia.org/wiki/Apache_Maven), you eventually find yourself dealing with dependency problems. You may have multiple dependencies that bring in incompatible versions of libraries that cause problems. A nice way to see the dependencies in a project is to generate a Maven dependency tree by running `mvn dependency:tree`. The output is not very pretty though.

This is a small awk script to prettify the Maven dependency tree. It will turn the ASCII tree from the crude form that Maven outputs into something a little prettier. The different columns in the dependencies will have nice colours applied to them. Also, the superfluous `[INFO]` at the start of each line is removed to save space.

The script is written in awk. {{github |repo=mvntree}}


{{thumbnail |title=Before and after: |small=mvntree_small.png |large=mvntree.png}}

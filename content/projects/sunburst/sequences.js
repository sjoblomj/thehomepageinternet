const width  = document.getElementById("chart").offsetWidth;
const height = document.getElementById("chart").offsetHeight;
const radius = (Math.min(width, height) / 2) - 1;


const prependAmountText = "";
const appendAmountText = " kr";
const legendTotalText = "Total:";
const inputfile = "indata.tsv";


var totalSegmentSize = 0; // Total size of all segments; we set this later, after loading the data.

const colour = d3.scaleOrdinal(d3.schemePaired);

const vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
      .attr("id", "container")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const partition = d3.partition()
    .size([2 * Math.PI, radius * radius]);

const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(d => Math.sqrt(d.y1));

// Use d3.text and d3.tsvParseRows so that we do not need to have a header
// row, and can receive the tsv as an array of arrays.
d3.text(inputfile).then(text => {
  const tsv = d3.tsvParseRows(text);
  const json = buildHierarchy(tsv);
  createLegend(json);
  createVisualization(json);
  broadcastSetupComplete();
});

function broadcastSetupComplete() {
  // Broadcast that setup of the controls is finished, to whomever might care
  window.postMessage("finished sunburst setup", "*");
}


function createLegend(json) {

  // Turn the data into a d3 hierarchy and calculate the sums.
  const root = d3.hierarchy(json).sum(d => d.size);

  const tableContent = [];
  root.data.children.forEach(child => index = buildLegendData(tableContent, child, 1));

  const table = document.getElementById("legendtablebody");

  const insertCell = (row, content, className, style = "") => {
    const cell = row.insertCell(-1);
    cell.innerHTML = content;
    cell.className = className;
    cell.style = style;
  };

  tableContent.forEach(rowData => {
    const row = table.insertRow(-1);

    insertCell(row, rowData.index, "legendcolour", "background: " + rowData.colour);
    insertCell(row, rowData.name, (rowData.amount == "" ? "legendheader" : "legendtext"), "padding-left: " + rowData.depth + "em");
    insertCell(row, rowData.amount, "legendamount");
  });

  const row = table.insertRow(-1);
  row.className = "legendheaderfooter";

  insertCell(row, "&nbsp;", "legendfooter")
  insertCell(row, legendTotalText, "legendfooter legendtotal")
  insertCell(row, root.value, "legendfooter legendamount")
}

function buildLegendData(resultList, json, depth) {

  const amount = json.size != null ? json.size : "";
  resultList.push({ "colour": colour(json.name), "index": json.index, "depth": depth, "name": json.name, "amount": amount });

  if (json.children != null) {
    json.children.forEach(child => buildLegendData(resultList, child, depth + 1));
  }
}

// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // Turn the data into a d3 hierarchy and calculate the sums.
  const root = d3.hierarchy(json)
      .sum(d => d.size)
      .sort((a, b) => b.value - a.value);

  // For efficiency, filter nodes to keep only those large enough to see.
  const nodes = partition(root).descendants()
      .filter(d => d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees

  refitExplanationDiv(nodes[0].y1);

  const path = vis.data([json]).selectAll("path")
      .data(nodes).enter()
        .append("svg:path")
          .attr("class", "segment")
          .attr("id", (d, i) => "path" + i)
          .attr("display", d => d.depth ? null : "none")
          .attr("d", arc)
          .attr("fill-rule", "evenodd")
          .style("fill", d => colour(d.data.name))
          .style("opacity", 1)
          .on("mouseover", (_, d) => mouseover(d));

  vis.selectAll("arcTexts")
    .data(nodes).enter()
        .append("text")
          .attr("class", "segmentlabel")
          .attr("transform", d => "translate(" + arc.centroid(d) + ")")
          .text(d => d.data.index > 0 ? d.data.index : "");

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container")
    .on("mouseleave", (_, d) => mouseleave(d));

  // Get total size of the tree = value of root node from partition.
  totalSegmentSize = path.datum().value;
}

function refitExplanationDiv(innerRadius) {
  // Refit the div with explanation texts inside the circles
  // to be between 30 degrees and 150 degrees.
  // See coordinates for trigonometric constants on the Unit Circle.
  const innermostRadius = Math.sqrt(innerRadius);   // Radius to innermost circle
  const xOffset = innermostRadius * Math.sqrt(3)/2; // 150 degrees, x coordinate
  const yOffset = innermostRadius * 1/2;            // 150 degrees, y coordinate

  const newX = radius - xOffset;
  const newY = radius - yOffset;
  const newWidth = xOffset * 2; // Element spans between 150 and 30 degrees.

  const elem = document.getElementById("explanation");
  elem.style.left  = newX + "px";
  elem.style.top   = newY + "px";
  elem.style.width = newWidth + "px";
}


// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {
  if (d.value == null) {
    return;
  }

  const percentage = (100 * d.value / totalSegmentSize).toPrecision(3);
  const percentageString = percentage < 0.1 ? "< 0.1%" : percentage + "%";

  createExplanationText(d.data.name, d.value, percentageString);

  const sequenceArray = d.ancestors().reverse();
  sequenceArray.shift(); // remove root node from the array
  updateBreadcrumbs(sequenceArray.map(d => d.data.name), percentageString);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);
  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(node => sequenceArray.indexOf(node) >= 0)
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {
  // Hide the breadcrumb trail
  d3.select("#breadcrumbs")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  const setMouseover = fnk => { if (fnk) d3.selectAll("path").on("mouseover", (_, d) => fnk(d)) };
  setMouseover(null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(350)
      .style("opacity", 1)
      .on("end", () => setMouseover(mouseover));

  d3.select("#explanation")
      .style("visibility", "hidden");
}

function createExplanationText(name, value, percentageString) {

  d3.selectAll(".explanation-text")
      .remove();

  d3.select("#explanation")
      .append('span')
        .attr("class", "explanation-text explanation-name")
        .text(name)
      .append('span')
        .attr("class", "explanation-text explanation-value")
        .text(prependAmountText + value + appendAmountText)
      .append('span')
        .attr("class", "explanation-text explanation-percentage")
        .text(percentageString);

  d3.select("#explanation")
      .style("visibility", "");
}



// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(names, percentageString) {

  // Hide the breadcrumb trail and delete old elements
  d3.select("#breadcrumbs")
      .style("visibility", "");
  d3.selectAll(".breadcrumb")
      .remove();


  const breadcrumbCreator = (name, colour) => {
    const bc = document.createElement("div");
    bc.className = "breadcrumb";
    bc.style.background = colour;
    bc.style.borderColor = colour;
    bc.innerHTML = name;

    document.getElementById("breadcrumbs").appendChild(bc);
  }

  names.forEach(name => breadcrumbCreator(name, colour(name)));
  breadcrumbCreator(percentageString, "transparent");
}



// Take a 2-column TSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by semicolons. The second column is a count of how
// often that sequence occurred.
function buildHierarchy(tsv) {
  var index = 0
  var root = {"name": "root", "index": index++, "children": []};
  for (var i = 0; i < tsv.length; i++) {
    var sequence = tsv[i][0];
    var size = +tsv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split(";");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        var foundChild = false;
        for (var k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = {"name": nodeName, "index": index++, "children": []};
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = {"name": nodeName, "index": index++, "size": size};
        children.push(childNode);
      }
    }
  }
  return root;
}

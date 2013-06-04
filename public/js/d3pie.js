function makePie(element, labels,color) {
        var d = [];
        for(var i=0; i<labels.length; i++) d.push(1);        
        data = {pct:d};

    var w = 245,                       // width and height, natch
        h = 245,
        r = Math.min(w, h) / 2,        // arc radius
        dur = 750,                     // duration, in milliseconds
//        color = d3.scale.category10(),
        donut = d3.layout.pie().sort(null),
        arc = d3.svg.arc().innerRadius(0).outerRadius(r - 10);

        // var color = d3.scale.linear()
        //     .domain([0, 7 - 1])
        //     .range(["#2d8fc1", "#206B92"]);

    // ---------------------------------------------------------------------
    var svg = d3.select("#" + element).append("svg:svg")
        .attr("width", w).attr("height", h);

    var arc_grp = svg.append("svg:g")
        .attr("class", "arcGrp")
        .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

    var label_group = svg.append("svg:g")
        .attr("class", "lblGroup")
        .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");


    // DRAW ARC PATHS
    var arcs = arc_grp.selectAll("path")
        .data(donut(data.pct));
    arcs.enter().append("svg:path")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("fill", function(d, i) {return color(labels[i]);})
        .attr("d", arc)
        .each(function(d) {this._current = d});

    // DRAW SLICE LABELS
    var sliceLabel = label_group.selectAll("text")
        .data(donut(data.pct));
    sliceLabel.enter().append("svg:text")
        .attr("class", "arcLabel")
        .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
        .attr("text-anchor", "middle")
        .text(function(d, i) {return labels[i]; });

    // --------- "PAY NO ATTENTION TO THE MAN BEHIND THE CURTAIN" ---------

    // Store the currently-displayed angles in this._current.
    // Then, interpolate from this._current to the new angles.
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }

    // update chart
    this.updateChart = function(data) {
       // data = eval(model); // which model?
       // var data = {};
       // // tool1Count = 40;
       // // both = 10;
       // // tool2Count = 20;
       // data['pct'] = [tool1Count - both, tool2Count - both, both];

        arcs.data(donut(data)); // recompute angles, rebind data
        arcs.transition().ease("linear").duration(dur).attrTween("d", arcTween);

        sliceLabel.data(donut(data));
        sliceLabel.transition().ease("linear").duration(dur)
            .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
            .style("fill-opacity", function(d) {return d.value==0 ? 1e-6 : 1;});
    }
    return this;
}
function makeMultiStack(elem, data, n, m, w, h, rb,color) {
    var stack = d3.layout.stack();
    //var data = d3.range(n).map(function() { return bumpLayer(m, .1); });
    var layers = stack(data);
    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
        yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var margin = {top: 20, right: 90, bottom: 20, left: 90},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeRoundBands([0, width], rb);

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    // var color = d3.scale.linear()
    //     .domain([0, n - 1])
    //     .range(["#2d8fc1", "#206B92"]);
    

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(4)
        .orient("left");

    var svg = d3.select("#" + elem).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

    var layer = svg.selectAll(".layer")
        .data(layers)
      .enter().append("g")
        .attr("class", "layer")
    
    
    var text = layer.selectAll("text")
            .data(function(d) { return d; })
        .enter().append("svg:text")
            .attr("x",  function(d, i) { 
                if ( i > 0  || m == 1) return x(d.x) + x.rangeBand()+5; 
                else return x(d.x) - 85;
            })
            .attr("y", height)
            .text(function(d) { return d.name;} );
            
    text.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y/2); })
            
    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", height)
        .attr("width", x.rangeBand())
        .attr("height", 0)
        .style("fill", function(d, i) { 
            if (d.type == "other") return "none"
            return color(d.type); 
        })
        .style("stroke", function(d, i) { 
            // if (d.type == "other") return "none"
            return color(d.totalName); 
        });
        

    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });
        
        var totalText = layer.selectAll(".totalText")
                .data(function(d) { return d; })
            .enter().append("svg:text")
                .attr("y", function(d) {      
                    if (d.type == 'other') return y(d.y + d.y0) - 5;
                    else return height; 
                })
                .attr("x", function(d) { return x(d.x) + x.rangeBand()/2 })
                .attr("text-anchor", "middle")
                // .attr("transform", "rotate(90)")
                // .style("fill", function(d) { if (d.type != 'other') return "white";})
                // .text(function(d) { if (d.type == 'other') return 'hi' });
    

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate("+ parseInt(width/2+13) + ",0)")
        .call(yAxis);

    
    this.update = function(data) {
        var layers = stack(data);
        layer.data(layers);
        yStackMax = d3.max(layers, function(layer1) { return d3.max(layer1, function(d) { return d.y0 + d.y; }); });
        y.domain([0, yStackMax])
        yAxis.scale(y);
        svg.select(".axis").transition()
            .duration(500)
            .call(yAxis);
        
        
        rect.data(function(d) { return d; }).transition()
            .duration(500)
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });
            
        // text.data(function(d) { return d; }).transition()
        //     .duration(500)
        //     .attr("y", function(d) { return y(d.y0 + d.y/2); })

        var textData = totalText.data(function(d) { return d; }).transition()
            .duration(500)
            .attr("y", function(d) { 
                if (d.type == 'other') return y(d.y + d.y0) - 5;
                else return height; 
            })
            .text(function(d) { 
                if (d.type == 'other') return parseInt(d.total - d.y) + "/" + d.total 
 //               else return d.type
            });
       
    }
    
}
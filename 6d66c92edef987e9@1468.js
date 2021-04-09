export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["History_filtered.csv",new URL("./files/1bd9e548cc0801a36f1ee8ce0ec2ee78b2a5ab1fd2eac705cbeb1a5ecd43dcca5b9200e18f79c6767886d41f2936f1e932e1773a0bb4784b9d5068e6f73c44af",import.meta.url)],["allcountriesfinal_edited_bio_shortened.csv",new URL("./files/2e068157607a29ee05e87c77b797c06668f8ef0afa696cd8a8518850cea39c74cd750641eaee46dec00ba5e7f0bbec84bfc365f1690b21ab8562956a123bee94",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
//   main.variable(observer()).define(["md"], function(md){return(
// md`# A5 Foreign Minister DataSet`
// )});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("allcountriesfinal_edited_bio_shortened.csv").csv()
)});
  main.variable(observer("historydata")).define("historydata", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("History_filtered.csv").csv()
)});
  main.variable(observer("countries")).define("countries", function(){return(
[
  {"name": "America", "image": "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png"},
  {"name": "Italy", "image": "https://cdn.countryflags.com/thumbs/italy/flag-400.png"},
  {"name": "UK", "image": "https://cdn.countryflags.com/thumbs/united-kingdom/flag-400.png"},
  {"name": "Netherlands", "image": "https://cdn.countryflags.com/thumbs/netherlands/flag-400.png"},
  {"name": "France", "image": "https://cdn.countryflags.com/thumbs/france/flag-400.png"}, 
  {"name": "Spain", "image": "https://cdn.countryflags.com/thumbs/spain/flag-400.png"}, 
  {"name": "Prussia/Germany", "image": "https://cdn.countryflags.com/thumbs/germany/flag-400.png"}, 
  {"name": "Austria", "image": "https://cdn.countryflags.com/thumbs/austria/flag-400.png"}, 
  {"name": "Russia/USSR","image": "https://cdn.countryflags.com/thumbs/russia/flag-400.png"}, 
  {"name": "Sweden","image": "https://cdn.countryflags.com/thumbs/sweden/flag-400.png"}, 
  {"name": "Ottoman_Empire/Turkey","image": "https://cdn.countryflags.com/thumbs/turkey/flag-400.png"}, 
  {"name": "China","image": "https://cdn.countryflags.com/thumbs/china/flag-400.png"}, 
  {"name": "Japan", "image": "https://cdn.countryflags.com/thumbs/japan/flag-400.png"}]
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 100, right: 200, bottom: 20, left: 70}
)});
  main.variable(observer("width")).define("width", function(){return(
1000
)});
  main.variable(observer("height")).define("height", function(){return(
1000
)});
  main.variable(observer("xScale")).define("xScale", ["d3","margin","width"], function(d3,margin,width){return(
d3.scaleBand()
    .domain(d3.range(13))
    .rangeRound([margin.left + 50, width - margin.right])
    .padding(0.1)
)});
  main.variable(observer("datesShown")).define("datesShown", function(){return(
[1850, 1880]
)});
  main.variable(observer("datesShown_array")).define("datesShown_array", ["datesShown"], function(datesShown){return(
Array.from({length: datesShown[1] - datesShown[0] + 1}, (_, i) => i + datesShown[0])
)});
  main.define("initial currHoverYear", function(){return(
null
)});
  main.variable(observer("mutable currHoverYear")).define("mutable currHoverYear", ["Mutable", "initial currHoverYear"], (M, _) => new M(_));
  main.variable(observer("currHoverYear")).define("currHoverYear", ["mutable currHoverYear"], _ => _.generator);
  main.define("initial hoveredMinister", function(){return(
null
)});
  main.variable(observer("mutable hoveredMinister")).define("mutable hoveredMinister", ["Mutable", "initial hoveredMinister"], (M, _) => new M(_));
  main.variable(observer("hoveredMinister")).define("hoveredMinister", ["mutable hoveredMinister"], _ => _.generator);
  main.variable(observer("minYear")).define("minYear", ["d3","data"], function(d3,data){return(
d3.min(Array.from(new Set(data.map(d => d.fminyear))), d => +d)
)});
  main.variable(observer("maxYear")).define("maxYear", ["d3","data"], function(d3,data){return(
d3.max(Array.from(new Set(data.map(d => d.fmoutyear))), d => +d > 2030 ? 0 : +d)
)});
  main.variable(observer("ministersByYear")).define("ministersByYear", ["maxYear","minYear","countries","data","countryToIndex"], function(maxYear,minYear,countries,data,countryToIndex)
{
  
  //contains years and each array inside contains countries
  var minEachYear = Array.from({length: maxYear - minYear + 1}, d => countries.map(x=>[]));
  // console.log(minEachYear[1855 - 1700][0]);
  // return minEachYear;
  
  
  data.forEach(function(d, i) {
    var country = countryToIndex(d.country_name);
    var year = +(d.fminyear);
    console.log(year - minYear + " " + country);
    while ( year <= +(d.fmoutyear) && year <= maxYear) {
      minEachYear[year - minYear][country].push(d);
      year ++;
    }
  });
  
  return minEachYear;
  
}
);
  main.variable(observer("yScale")).define("yScale", ["d3","datesShown","height"], function(d3,datesShown,height){return(
d3.scaleLinear()
    .domain(datesShown)
    .range([100, height])
)});
  main.variable(observer("xMargin")).define("xMargin", ["xScale","margin","width"], function(xScale,margin,width){return(
xScale.copy().range([margin.left, width - margin.right])
)});
  main.variable(observer("yMargin")).define("yMargin", ["yScale","margin","height"], function(yScale,margin,height){return(
yScale.copy().range([margin.top, height - margin.bottom])
)});
  main.variable(observer("countryToIndex")).define("countryToIndex", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal()
  .domain([...new Set(d3.map(data, d=>d.country_name))])
  .range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
)});
  main.variable(observer("mannerOuts")).define("mannerOuts", ["d3","data"], function(d3,data){return(
[... new Set(d3.map(data, d => d.Manner_out))].concat(["INACTIVE"])
)});
  main.variable(observer("mannerOutColorScale")).define("mannerOutColorScale", ["d3","mannerOuts"], function(d3,mannerOuts){return(
d3.scaleOrdinal()
.domain(mannerOuts).range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#bc80bd","#dfdfdf","#ccebc5","#ffed6f"])
  .unknown("UNKNOWN")
)});
  main.variable(observer()).define(["mannerOuts","d3","svg","name","html"], function(mannerOuts,d3,svg,name,html)
{
  const colors = mannerOuts;
  const n = colors.length;
  const dark = d3.lab(colors[0]).l < 50;;
  const canvas = svg`<svg viewBox="0 0 ${n} 5" style="display:block;width:${n * 33}px;height:165px;margin:0 -14px;cursor:pointer;">${colors.map((c, i) => svg`<rect x=${i} width=1 height=5 fill=url(#gradient-${c}>`)}`;
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  return html`${canvas}${label}`;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Foreign Minister Experience Filter`
)});
  main.variable(observer("viewof expFilter")).define("viewof expFilter", ["html"], function(html)
{
  const select = html`
  <select>
    <option selected value=None>Select Experience
    <option value=Diplomant>Diplomat
    <option value=Mili_edu>Military Education
    <option value=Mili_service>Military Service
    <option value=Farmer>Farmer
    <option value=Businessman>Businessman
    <option value=Worker>Blue-Collar
    <option value=Cleric>Cleric
    <option value=Politics>Politics
    <option value=Law>Law
    <option value=Whitecollar>White-Collar
    <option value=Int_org>International Organization
  </select>`;
  return select;
}
);
  main.variable(observer("expFilter")).define("expFilter", ["Generators", "viewof expFilter"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Reason the Foreign Minister Left the Post Filter`
)});
  main.variable(observer("viewof mannerOutFilter")).define("viewof mannerOutFilter", ["html"], function(html)
{
  const select = html`
  <select>
    <option selected value=None>Select Reason
    <option value=1.0>Regular Procedures
    <option value=2.0>Death by Natural Causes
    <option value=3.0>Retired due to Ill Health
    <option value=4.0>Suicide
    <option value=5.0>Irregular Procedures
    <option value=6.0>Deposition by a Foreign State
  </select>`;
  return select;
}
);
  main.variable(observer("mannerOutFilter")).define("mannerOutFilter", ["Generators", "viewof mannerOutFilter"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","xScale","mannerOuts","mannerOutColorScale","yScale","margin","datesShown","currHoverYear","data","countryToIndex","expFilter","mannerOutFilter","hoveredMinister","datesShown_array","mutable currHoverYear","mutable hoveredMinister","ministersByYear","minYear","wrap","countries"], function(d3,DOM,width,height,xScale,mannerOuts,mannerOutColorScale,yScale,margin,datesShown,currHoverYear,data,countryToIndex,expFilter,mannerOutFilter,hoveredMinister,datesShown_array,$0,$1,ministersByYear,minYear,wrap,countries)
{
  
//   currHoverYear;
  
  const svg = d3.select(DOM.svg(width, height));
  
  var nodeRadius = xScale.bandwidth()/2;
  var headRadius = nodeRadius * 0.7;
  var circleRadius = nodeRadius * 0.2;
  
  var flagRowY = 50;

  // Create Gradients //
  for(const m of mannerOuts){
    var gradient = svg.append("linearGradient")
            .attr("id", "gradient-" + m)
            .attr("x1", "0%")
            .attr("y1", "80%")
            .attr("x2", "0%")
            .attr("y2", "40%");
  
        gradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", mannerOutColorScale(m))
            .attr("stop-opacity", 0.4);
  
        gradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", mannerOutColorScale(m))
            .attr("stop-opacity", 0.9);
  }
  //==================================================================
  //====== Create the y axis scale ===================================
  //==================================================================
  
  var h = (yScale(1851) - yScale(1850) ) /2;
  
  var yaxis = svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale).tickSize(0).ticks(datesShown[1] - datesShown[0]));
    
    yaxis.selectAll("text")
      .attr("transform", "translate(0,"+h+")")
      .style("text-anchor", "end")
      .style("font-size", function(d) {
        if(d == currHoverYear) return 24;
        return 14;
      })
      .style("fill", "#666666");
  
    yaxis.selectAll("path")
      .style("stroke", "white");
  
  //==================================================================
  //====== Create the rectangles =====================================
  //==================================================================
  
  var rects = svg.selectAll("g")
    .data(data)
    .enter().append("rect")
    .attr("width", function(d) {
      if(+d.fminyear > currHoverYear || +d.fmoutyear < currHoverYear) 
        return headRadius / 5;
      
      return headRadius;
    })
    .attr("height", function(d) {
      if(+d.fminyear < datesShown[0] || +d.fminyear > datesShown[1]) 
        return 0;
      
      // if(countryToIndex(d.country_name) == 0)
      //   console.log(d);
      
      return yScale(+d.fmoutyear+(d.fmoutmonth)/12) - yScale(+d.fminyear+(d.fminmonth-1)/12);
    })
    .attr("x", function(d) {
        return xScale(countryToIndex(d.country_name)) + 10 - headRadius / 2})
    .attr("y", function(d) {
      if(+d.fminyear < datesShown[0] || +d.fminyear > datesShown[1]) 
        return -100;
      return yScale(+d.fminyear+(d.fminmonth-1)/12);
    })
    .attr("fill", function(d){
      
      if(+d.fminyear > currHoverYear || +d.fmoutyear < currHoverYear) {
        if((expFilter != "None" && +d[expFilter] == 1) || (mannerOutFilter != "None" && d.Manner_out != mannerOutFilter))
          return "url(#gradient-INACTIVE)";
        else
          return "url(#gradient-" + d.Manner_out + ")";
      } else {
          if((expFilter != "None" && +d[expFilter] == 1) || (mannerOutFilter != "None" && d.Manner_out != mannerOutFilter))
            return mannerOutColorScale("INACTIVE");
          else
            return mannerOutColorScale(d.Manner_out); 
      }
    })
    .attr("opacity", function(d) {
      if(+d.fminyear > currHoverYear || +d.fmoutyear < currHoverYear)
          return 1;
      if(hoveredMinister == null)
        return 1;
      if(d == hoveredMinister)
        return 1;
      return 0.3;
    });
  

  //==================================================================
  // add invisible horizontal rectangles for hovering purpose //
  //==================================================================
  
  var rects_invisible = svg.append("g")
    .selectAll("g.node")
    .data(datesShown_array)
    .enter().append("rect")
    .attr("width", width - margin.right)
    .attr("height", function(d) {
      return yScale(1861) - yScale(1860);
    })
    .attr("x", margin.left)
    .attr("y", function(d) {
      return yScale(+d);
    })
    .attr("fill", "grey")
    .attr("fill-opacity", function(d) {
      if(currHoverYear < d || currHoverYear > d)
        return 0; 
      return 0.1;
    })
    .on('mouseover', function(d) {
       d3.select(this)
        .attr("stroke", "white")
        .attr("stroke-width", "0.5px");
        if(currHoverYear == d3.select(this).data())
          return;
        $0.value = d3.select(this).data();
       $1.value = null;
       })
     .on('mouseout', function() {
       d3.select(this)
        .attr("stroke-width", "0px");
       $0.value = null;
       $1.value = null;
       });
  
  //==================================================================
  //====== Add circles of foreign ministers  =========================
  //==================================================================
  var heads = svg.append("g")
  
  var headNode = heads.selectAll("g.node")
    .data(data);
  
  var nodeEnter = headNode.enter()
    .append("svg:g")
    .attr("class", "node");
  
  nodeEnter.append("svg:circle")
      .attr("cx", (d, i) => xScale(countryToIndex(d.country_name))-10)
      .attr("cy", function(d) {
          if(+d.fminyear < datesShown[0] || +d.fminyear > datesShown[1]) 
            return -100;
    
          return yScale(+d.fminyear + (d.fminmonth-1)/12);
      })  
      .attr("fill",function(d, i) { 
          if((expFilter != "None" && +d[expFilter] == 1) || (mannerOutFilter != "None" && d.Manner_out != mannerOutFilter))
            return mannerOutColorScale("INACTIVE");
          else
            return mannerOutColorScale(d.Manner_out); 
      })
      .attr("stroke", function(d) {
        if((expFilter != "None" && +d[expFilter] == 1) || (mannerOutFilter != "None" && d.Manner_out != mannerOutFilter))
          return mannerOutColorScale("INACTIVE");
        else
          return mannerOutColorScale(d.Manner_out);
      })
      .attr("stroke-opacity", function(d) {
        return 0.7;
      })
      .attr("stroke-width", 3)
      .attr("r", function(d) {
        if(currHoverYear != null && ministersByYear[currHoverYear - minYear].flat().indexOf(d) >= 0)
          return 0;
        return circleRadius;          
       });

  //==================================================================
  //====== Add images of highlighted foreign ministers =========================
  //==================================================================
  
  if(currHoverYear != null) {
  var imageHeads = svg.append("g")
  
    var imageNodes = imageHeads.selectAll("g.node")
      .data(ministersByYear[currHoverYear - minYear].flat());
    
    var imageNodeEnter = imageNodes.enter()
    .append("svg:g")
    .attr("class", "node");
    
    var defs = imageNodeEnter.append("defs");
    defs.append('pattern')
      .attr("id", function(d, i) { return "image"+ d.foreignminister.replace(/\s/g, '').replace(/\W/g, '');}  )
      .attr("width", 1)
      .attr("height", 1)
      .append("svg:image")
      .attr("xlink:href", function(d) { return d.img_links;})
      .attr("width", function(d) {
        return headRadius * 2;
      });
    
    var defsBig = imageNodeEnter.append("defs");
    defsBig.append('pattern')
      .attr("id", function(d, i) { return "imageBig"+ d.foreignminister.replace(/\s/g, '').replace(/\W/g, '');}  )
      .attr("width", 1)
      .attr("height", 1)
      .append("svg:image")
      .attr("xlink:href", function(d) { return d.img_links;})
      .attr("width", headRadius * 2 * 1.5);
      
    imageNodeEnter.append("svg:circle")
        .attr("cx", (d, i) => xScale(countryToIndex(d.country_name))-10)
        .attr("cy", function(d) {
              var minToDisplay = ministersByYear[currHoverYear - minYear][countryToIndex(d.country_name)];
              return yScale(currHoverYear) + minToDisplay.indexOf(d) * headRadius * 2.0;
        })  
        .attr("fill",function(d, i) { 
          if(d.img_links == "")
            return "#d9d9d9";
      
          if(hoveredMinister == d)
            return "url(#imageBig"+ d.foreignminister.replace(/\s/g, '').replace(/\W/g, '') +")";
          return "url(#image"+ d.foreignminister.replace(/\s/g, '').replace(/\W/g, '') +")"; 
        })
        .attr("stroke", function(d) {
          if((expFilter != "None" && +d[expFilter] == 1) || (mannerOutFilter != "None" && d.Manner_out != mannerOutFilter))
            return mannerOutColorScale("INACTIVE");
          else
            return mannerOutColorScale(d.Manner_out); 
        })
        .attr("stroke-opacity", function(d) {
          if(hoveredMinister != null) {
            if(hoveredMinister == d) return 1;
            return 0.5;
          }
          return 1;
        })
        .attr("stroke-width", 3)
        .attr("r", function(d) {
          if(d == hoveredMinister) return 1.5 * headRadius;
          return headRadius;          
         })
        .on('mouseover', function(d) {
            d3.select(this)
            .attr("r", headRadius*1.5);
            if(hoveredMinister == d3.select(this).data()[0])
              return;
            $1.value = d3.select(this).data()[0];
            d3.select(this).raise();
           })
         .on('mouseout', function() {
           console.log("OUT");
           d3.select(this)
            // .attr("stroke-width", 1)
            .attr("r", headRadius);
            $1.value = null;
           })
          .on('click', function(d) {
            console.log(d3.select(this).data()[0]['bios']);
            var xpos = parseFloat(d3.select(this).attr("cx")) + xScale.bandwidth() / 2;
            var ypos = parseFloat(d3.select(this).attr("cy"));
            var tgrp = svg.append("g")
              .attr("id", "tooltip")
              .attr("transform", (d, i) => `translate(${xpos},${ypos})`);
            tgrp.append("rect")
              .attr("width", "210px")
              .attr("height", "100%")
              .attr("fill", "rgba(240,240,240,0.8)")
            tgrp.append("text")
              .attr("x", 5)
              .attr("y", 14)
              .attr("dy", 1)
              .attr("text-anchor", "left")
              .attr("font-family", "sans-serif")
              .attr("font-size", "11px")
              .attr("fill", "black")
              .text(d3.select(this).data()[0]['bios'])
              .call(wrap, 185);
          });

      // add circle on top of ones not hovered on for contrast
    imageNodeEnter.append("svg:circle")
        .attr("cx", (d, i) => xScale(countryToIndex(d.country_name))-10)
        .attr("cy", function(d) {
              var minToDisplay = ministersByYear[currHoverYear - minYear][countryToIndex(d.country_name)];
              return yScale(currHoverYear) + minToDisplay.indexOf(d) * headRadius * 2.0;
        })  
        .attr("fill", "white")
        .attr("opacity", d => d == hoveredMinister ? 0 : 0.7)
        .attr("r", function(d) {
          if(hoveredMinister == null || d == hoveredMinister) return 0;
          return headRadius;          
         })
        .on('mouseover', function(d) {
            if(hoveredMinister == d3.select(this).data()[0])
              return;
            $1.value = d3.select(this).data()[0];
           })
         .on('mouseout', function() {
            $1.value = null;
           });
  }
  
  //==================================================================
  //====== Create the row of flags ===================================
  //==================================================================
  var flags = svg.append("g")
  
  var flagNode = flags.selectAll("g.node")
    .data(countries);
  
  var nodeEnter = flagNode.enter()
    .append("svg:g")
    .attr("class", "node");
  
  var flagHeight = (xScale(1) - xScale(0)) / 3 * 2;
  var flagWidth = (xScale(1) - xScale(0)) * 0.9;
  
  var defs = nodeEnter.append("defs");
  // debugger;
  defs.append('pattern')
  .attr("id", function(d, i) { return "image"+ d.name;}  )
  .attr("width", 1)
  .attr("height", 1)
  .append("svg:image")
  .attr("xlink:href", function(d) { return d.image;})
  // .attr("width", flagWidth);
  .attr("height", flagHeight);
  
  nodeEnter.append("svg:rect")
    .attr("x", (d, i) => xScale(i) - flagWidth / 2)
    .attr("y", flagRowY - flagHeight / 2)
    .attr("fill", function(d) { return "url(#image"+ d.name +")"; }  )
    .attr("width", flagWidth)
    .attr("height", flagHeight)
    .attr("stroke", "#666666")
    .attr("stroke-width", 1)
    .on('mouseover', function(d) {
       d3.select(this)
        .attr("stroke-width", 5);
    
      // Remove the tooltip
			  d3.select("#flagtooltip").remove();
    
      var xpos = parseFloat(d3.select(this).attr("x")) + flagWidth / 2;
      var ypos = parseFloat(d3.select(this).attr("y")) + flagHeight;
    
      // Create the tooltip label as an SVG group `tgrp` with a text and a rect inside
      var tgrp = nodeEnter.append("g")
        .attr("id", "flagtooltip")
        .attr("transform", (d, i) => `translate(${xpos},${ypos})`);
      tgrp.append("rect")
        .attr("width", "100px")
        .attr("height", "22px")
        .attr("fill", "white")
      tgrp.append("text")
        .attr("x", 5)
        .attr("y", 14)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "#666666")
        .text(d3.select(this).data()[0].name);
    
    })
    .on('mouseout', function() {
       d3.select(this)
          .attr("stroke-width", 1);
    
      // Remove the tooltip
			  d3.select("#flagtooltip").remove();
    });

  return svg.node();
}
);
  main.variable(observer("wrap")).define("wrap", ["d3"], function(d3){return(
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 15).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 15).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
)});
  return main;
}

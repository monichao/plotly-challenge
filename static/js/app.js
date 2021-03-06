// Creating function for Data plotting (Bar, gauge, bubble)
function getPlot(id) {
    //json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
       
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  

        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
  
        var labels = samples.otu_labels.slice(0, 10);
  

        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'rgb(91,114,195)'},
            type:"bar",
            orientation: "h",
        };
  
    //making data trace
        var data = [trace];
  
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // creating bar plot with plotly
        Plotly.newPlot("bar", data, layout);
  
      
        // bubble plot
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };

        var layout_bubble = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        // data trace
        var data1 = [trace1];
  
        // creating bubble plot with plotly
        Plotly.newPlot("bubble", data1, layout_bubble); 
  
      });
  }  
// create the function to get the necessary data
function getInfo(id) {
    // read the json file to get data
    d3.json("data/samples.json").then((data)=> {
        
        var metadata = data.metadata;

        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demographicInfo = d3.select("#sample-metadata");
        
        demographicInfo.html("");

        //append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

//change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

function init() {
    // dropdown menu 
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// function that populates the meta data
function buildMetaData(sample)
{
    //console.log(sample)

    // use d3.json inorder to get the data    
    d3.json(url).then((data) => {
        // grab all of the metadata
        let metaData = data.metadata;
        //console.log(metaData);

        let result = metaData.filter(sampleResults => sampleResults.id == sample);

        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // clear the metadata out
        d3.select("#sample-metadata").html("");

        // use Object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) =>{
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        })

    });
}

// function that builds the bar chart
function buildBarChart(sample)
{
  
    // use d3.json inorder to get the data    
    d3.json(url).then((data) => {
        // grab all of the sample data
        let sampleData = data.samples;
        //console.log(sampleData);

        let result = sampleData.filter(sampleResults => sampleResults.id == sample);

        //console.log(result)

        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);
        //console.log(textLabels);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);

    });

}

//function that builds the bubble chart
function buildBubbleChart(sample)
{
    // use d3.json inorder to get the data    
    d3.json(url).then((data) => {
        // grab all of the sample data
        let sampleData = data.samples;
        //console.log(sampleData);

        let result = sampleData.filter(sampleResults => sampleResults.id == sample);

        //console.log(result)

        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
    });
}


// function that initializes the dashboard
function init(){
    
    // access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");
    
    // use d3.json inorder to get the data    
    let data = d3.json(url).then((data) => {
        let sampleNames = data.names;
        //console.log(sampleNames);

        // use a foreach in order to create options for each sample in the selector
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
            
        });
            // when initialize, pass in the infomration for the first sample
            let firstSample = sampleNames[0];

            // call the funciton to build the metadata
            buildMetaData(firstSample);
            // call 
            buildBarChart(firstSample);
            // call bubble
            buildBubbleChart(firstSample);

    });

}

// function that updates the dashboard
function optionChanged(item)
{
    // call the update to the metadata
    buildMetaData(item);
    buildBarChart(item);
    buildBubbleChart(item);
}



init();
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
//console.log("Data Promise: ", dataPromise);


function buildmetadata(sample){
  d3.json(url).then((data)=>{
    //console.log(data)
    var metadata = data.metadata
    var resultarray = metadata.filter(obj => obj.id == sample)
    var result = resultarray[0]
    console.log("buildmetadata")
    console.log(result)
  });
}

//load the initial data
function init(){
  d3.json(url).then((data)=>{
    var samples = data.names
    var firstsample = samples[0]
    buildmetadata(firstsample)
    //console.log("init")
    //console.log(firstsample)
    //console.log(samples)
  });
  }

init();

//build out the dropdown
var select = d3.select("#selDataset")

//foreach - selector - append options from each objection

/*// Fetch the JSON data and console log it
let dataAll = d3.json(url).then(function(data) {
    console.log(data)
    data.map(datas => datas)
    return dataAll
  });


//console.log(names)
console.log(samples)

console.log(names)


//console.log(data);
//console.log(bigArray)
// Call the custom function with filter()
//et subjectNames = bigArray.filter(a);*/


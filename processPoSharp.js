
var csv_export = require('csv-export');


// Processing the poSharp
var fs = require('fs');
var data = JSON.parse(fs.readFileSync("data/poSharp.json", 'utf8'));


var totalData = [];


var processPoSharp = function(){

    data.forEach(function(d){

        var dims = d.details.dimensions;
        dims = dims.replace("\r\n", "");
    
        var indexOfMm = dims.indexOf("mm");
        if(indexOfMm !== -1){
            dims = dims.slice(0, indexOfMm);
        }
    
        dims = dims.trim();
    
        var splittedDims = dims.split(" × ");
                                        
        var H = splittedDims[0];
        var W = splittedDims[1];
        var T = splittedDims[2];
        
        var Eff = d.details.efficiency;
        Eff = Eff.replace("\r\n", "");
        Eff = Eff.replace("%", "");
        Eff = Eff.trim();
        var cleanedEff = Eff;
    
        var nameOfSolarPanel = d.model;
        nameOfSolarPanel = nameOfSolarPanel.replace("\r\n", "");
        nameOfSolarPanel = nameOfSolarPanel.trim();
    
        // console.log("H: " + H + "\tW: " + W + "\tT: " + T + "\tEff: " + Eff);
    
        // console.log(dims);
    
        // console.log(modelName);
    
    
    
        //Add on the new solar panel data
        totalData[totalData.length] = {};
    
        totalData[totalData.length-1] = {};
        totalData[totalData.length-1]["Height"] = H;
        totalData[totalData.length-1]["Width"] = W;
        totalData[totalData.length-1]["Thickness"] = T;
        totalData[totalData.length-1]["Efficiency"] = Eff;
        totalData[totalData.length-1]["Cleaned Efficiency"] = cleanedEff;
        totalData[totalData.length-1]["Model name"] = nameOfSolarPanel;
    
    });
    
    
    //Export the data:
    var fs = require('fs');
    
    csv_export.export(totalData,function(buffer){
    
        //this module returns a buffer for the csv files already compressed into a single zip.
        //save the zip or force file download via express or other server
        fs.writeFileSync('./data.zip',buffer);
    });
    
    
    // console.log(totalData);

}




module.exports = processPoSharp;
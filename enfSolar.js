const rp = require("request-promise");
const $ = require('cheerio');

var csv_export = require('csv-export');

var baseUrl = "https://www.enfsolar.com/pv/panel/";

const url = 'https://www.enfsolar.com/pv/panel/542';
var urls = [
    "https://www.enfsolar.com/pv/panel/541",
    "https://www.enfsolar.com/pv/panel/542"
]

var minPage = 1;
// var maxPage = 3;
var maxPage = 543;

var totalData = [];


// Need an async function because have to wait for each
// page to load and process one at a time.
var mainFunction = async function(){

    for(var pageNum = minPage; pageNum <= maxPage; pageNum++){

        console.log("Grabbing data from: " + baseUrl + pageNum);

        await rp(baseUrl + pageNum)
        .then(function(html) {
            // console.log(html);

            var data = $('.enf-pd-list-main-li', html);

            for(var i = 0; i < data.length; i++){

                //****************************************************
                // Get dimensions and efficiency:
                //****************************************************
                
                var dataOne = $(data[i]).find(".enf-blue").text();

                // console.log(dataOne);
                // console.log("^^");

                var splitted = dataOne.split("\n");

                // console.log(splitted);


                for(var j = 0; j < splitted.length; j++){
                    if(splitted[j].includes("mm")){
                        var dim = splitted[j].replace("mm", "");
                        dim = dim.trim();
            
                        var splittedDims = dim.split("x");
            
                        var H = splittedDims[0];
                        var W = splittedDims[1];
                        var T = splittedDims[2];
            
            
                        // Eff stands for efficiency
                        var Eff = splitted[j-9].trim();
                        // Clean up the efficiency string because sometimes it comes in ranges                
                        var cleanedEff = Eff;
                        // console.log("Before: " + Eff);
                        
                        // Clean up the range of the efficiency, grab the large value of the range
                        var indexOfTilde = Eff.indexOf("~");
                        if(indexOfTilde !== -1){
                            cleanedEff = Eff.slice(indexOfTilde+1, Eff.length);
                        }

                        // Clean up the percent sign
                        var indexOfPercent = cleanedEff.indexOf("%");
                        if(indexOfPercent !== -1){
                            cleanedEff = cleanedEff.slice(0, indexOfPercent - 1);
                        }

                        // Clean up the white spaces before and after the remaining number
                        cleanedEff = cleanedEff.trim();
                        
                        // console.log("After: " + cleanedEff);
                        // console.log("H: " + H + "\tW: " + W + "\tT: " + T + "\tEff: " + Eff);
                    }
                }
                
                //****************************************************
                // Get name of the solar panel
                //****************************************************
                var dataName = $(data[i]).find(".enf-product-name").text();
                // console.log(dataName);

                dataNameInputs = dataName.split("\n");
                var count = 0;
                var nameOfSolarPanel;
                
                for(var j = 0; j < dataNameInputs.length; j++){
                    name = dataNameInputs[j];

                    name = name.trim();
                    name = name.replace("\n", "");
                    
                    if(name !== "Series:" && name !== ""){
                        nameOfSolarPanel = name;
                    }
                    // console.log("hi");
                }


                //Add on the new solar panel data
                totalData[totalData.length] = {};

                totalData[totalData.length-1] = {};
                totalData[totalData.length-1]["Height"] = H;
                totalData[totalData.length-1]["Width"] = W;
                totalData[totalData.length-1]["Thickness"] = T;
                totalData[totalData.length-1]["Efficiency"] = Eff;
                totalData[totalData.length-1]["Cleaned Efficiency"] = cleanedEff;
                totalData[totalData.length-1]["Model name"] = nameOfSolarPanel;


                    
            }

            

            console.log("Just finished page: " + pageNum);
            console.log();
            

        })
        .catch(function(err) {
            //handle error
        });

    }


    //Export the data:
    var fs = require('fs');

    csv_export.export(totalData,function(buffer){

        //this module returns a buffer for the csv files already compressed into a single zip.
        //save the zip or force file download via express or other server
        fs.writeFileSync('./data.zip',buffer);
    
    });


    // console.log("*-*-*-*-*-*-*");

    // console.log(totalData);

    console.log("DONE!");

}


module.exports = mainFunction;
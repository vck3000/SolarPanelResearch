 

var Xray = require('x-ray')
var x = new Xray().throttle(2, 1000);

// 4 mins to do 20 pages with 30 each


// 4 mins to do 600 entries
// 4 mins is 240 seconds for 600 entries

// that is 2.5 entries per second being processed

// For 619 pages of 30 entries each
// 18570 entries

// This will take 2.6 hours at 2 entries processed per min

var baseUrl = "http://www.posharp.com/photovoltaic/database.aspx?pg=1";


var poSharp = async function(){

    x(baseUrl, '.rowstyle, .altrowstyle', [{
        link: 'td:nth-child(2) a@href',
        model: 'td:nth-child(2) a',
        details: x('td:nth-child(2) a@href', {
            efficiency: 'td:contains("Panel Efficiency") + td',
            dimensions: 'td:contains("Dimensions") + td'
        })

        }])
        .paginate('a:contains("Next")@href')
        // .limit(619)
        .limit(619)
        // ((err, obj) => {
        //     callback(err, obj);
        // })
        // .stream();

        .write('results.json')
}




 
var callback = function(err, obj){
    if(err){
        console.log(err);
    }
    else{
        console.log(obj);
    }

}

module.exports = poSharp;


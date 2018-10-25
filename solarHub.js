 

var Xray = require('x-ray')
var x = new Xray()


var baseUrl = "http://www.solarhub.com/product-catalog/pv-modules?page=1";


var solarHub = async function(){


    x(baseUrl, '#product_list .content', [{
        link: 'a@href',
        model: 'a',
        details: x('a@href', {
            test: 'h2'
        })

    }])
    // .stream();

    .write('results.json')


// var fs = require('fs');
// const file = fs.createWriteStream('./test.txt');

// stream.pipe(file);


}




 
var callback = function(err, obj){
    if(err){
        console.log(err);
    }
    else{
        console.log(obj);
    }

}

module.exports = solarHub;


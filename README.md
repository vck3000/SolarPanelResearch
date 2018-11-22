# SolarPanelResearch
A simple webcrawler on two databases with post processing.

Prerequisites:
* NodeJS

The first part of the program is a NodeJS program. To install required packages run:
```
npm install
```

To run the program:
```
node app.js
```

See app.js and comment/uncomment required sections.
This program will crawl and process two large solar panel databases from posharp and enfsolar.

The second part of the program is a Matlab script to do some post-processing. It does the required calculations, sorts and outputs the final results. You can see the final results in MatlabProcessing/BestSolarPanels.csv. The processing done in the Matlab script can easily be done in NodeJS, however was done in Matlab for use in an engineering assignment (easier for markers to understand it since Matlab is widely used in engineering).


Feel free to make an issue to contact me if you need help.

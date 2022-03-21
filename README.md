# The Great Field parkrun results - HTML to CSV processing

A small node script than turns saved parkrun results pages into a single CSV file ready for some basic anaylsis/data viz.

1. Clone this repo
2. Create a folder called in the 'results_html'.
3. Save copies of parkrun event results as HTML into 'results_html'

4. run...
   node app.js

this will generate a single csv of the results into './output.csv'

## To-do list

- pull in specific finish position for men and women - done
- do some processing and create additonal output file for volunteers
- maybe add a json output option
- maybe look to do something clever with athlete data.

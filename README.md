# The Great Field parkrun results - HTML to CSV processing

A small node script than turns saved parkrun results pages into a single CSV file ready for some basic anaylsis/data viz.

1. Clone this repo
2. Create a folder called '.results_html/.
3. Save copies of parkrun event results as HTML into './results_html/'.

4. run...
   node app.js

this will generate a single csv of the results into './output.csv'

## To-do list

- pull in GenderPos - done
- maybe add a json output option
- look to add volunteers into another file
- maybe look to do something clever with athlete data.

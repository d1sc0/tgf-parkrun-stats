const cheerio = require('cheerio');
const fs = require('fs');

//process results
const processResults2CSV = function () {
  eventResults = []; //initialise results array
  const outputPath = './output.csv'; //set output file name
  // add column headers to array
  result = [
    'eventNumber',
    'eventDate',
    'finishPos',
    'finishTime',
    'athleteName',
    'athleteID',
    'eventAchievement',
    'genderFinishPos',
    'club',
    'ageGroup',
    'gender',
    'numRuns',
    'numVol',
    'ageGrade',
    'athleteURL',
  ];
  eventResults.push(result.join(','));

  try {
    //recurrsively process files in results directory
    const arrayOfFiles = fs.readdirSync('./results_html');
    //process each file in turn through the file array
    arrayOfFiles.forEach(eventFile => {
      const $ = cheerio.load(fs.readFileSync(`./results_html/${eventFile}`));
      const $eventHTML = $('body');
      const $rows = $eventHTML.find('table tr');
      const eventDate = $eventHTML.find('.Results-header .format-date').text();
      const eventNum = $eventHTML.find('.Results-header h3 span:eq(2)').text();
      const eventNumber = eventNum.replace(/\D+/g, '');

      //loop through each html table row
      $rows.each(function (i, item) {
        runnerFinishPos = $(item).attr('data-position');
        runnerName = $(item).attr('data-name');
        runnerTime = $(item).find('.Results-table-td--time .compact').text();
        runnerClub = $(item).attr('data-club') || 'null';
        runnerClub = runnerClub.replace(/,/g, '');
        runnerAgeGroup = $(item).attr('data-agegroup');
        runnerGender = $(item).attr('data-gender');
        runnerNoRuns = $(item).attr('data-runs');
        runnerNoVols = $(item).attr('data-vols');
        runnerAgeGrade = $(item).attr('data-agegrade');
        runnerAchievement = $(item).attr('data-achievement') || 'null';
        $runnerLink = $(item).find('.Results-table-td--name div a');
        runnerURL = $runnerLink.attr('href') || 'null';

        //set runnerID by removing everything but digits, also handle unknowns
        if (typeof runnerURL !== 'null') {
          runnerID = runnerURL.replace(/\D+/, '');
        }

        //null values for unknowns
        if (runnerName == 'Unknown') {
          runnerTime = 'null';
          runnerGender = 'null';
          runnerAgeGroup = 'null';
          runnerNoRuns = 'null';
          runnerNoVols = 'null';
          runnerAgeGrade = 'null';
          runnerID = 'null';
          runnerURL = 'null';
          runnderGenderPos = 'null';
        } else {
          // gender position
          runnerGenderPos = $(item)
            .find('.Results-table-td--gender :not(.compact)')
            .text();
          runnerGenderPos = runnerGenderPos.replace(/\D+/, '');
        }

        //add data to a csv row
        result = [
          eventNumber,
          eventDate,
          runnerFinishPos,
          runnerTime,
          runnerName,
          runnerID,
          runnerAchievement,
          runnerGenderPos,
          runnerClub,
          runnerAgeGroup,
          runnerGender,
          runnerNoRuns,
          runnerNoVols,
          runnerAgeGrade,
          runnerURL,
        ];

        if (i >= 1) {
          eventResults.push(result.join(','));
        }
      });
      // end row loop
    });

    //console.log(eventResults);

    // write the file output
    fs.writeFile(outputPath, eventResults.join('\r\n'), err => {
      console.log(
        err || eventResults.length + ' results processed to ' + outputPath
      );
    });
  } catch (e) {
    console.log(e);
  }
};

processResults2CSV();

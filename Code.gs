function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Prayer Requests')
      .addItem('Generate Prayer Requests', 'showDatePicker')
      .addToUi();
}

function showDatePicker() {
  Logger.log("Showing date picker dialog");
  var html = HtmlService.createHtmlOutputFromFile('DatePicker')
      .setWidth(400)
      .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Select Date');
}

function processDate(selectedDate) {
  // Open the existing Google Document
  var docId = 'Google_doc_ID'; // Use only the ID
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();

  // Add a page break
  body.appendPageBreak();

  // Format the date for the heading
  var formattedDate = formatDate(selectedDate);

  // Fetch the prayer requests for the selected date
  var prayerRequests = getPrayerRequests(selectedDate); // Call the logic to fetch requests

  // Format and append prayer requests
  body.appendParagraph(formattedDate).setHeading(DocumentApp.ParagraphHeading.HEADING1);

  if (prayerRequests.length > 0) {
    prayerRequests.forEach(function(request) {
      body.appendParagraph(request);
    });
    body.appendParagraph('---'); // Optional: Add a separator line
  } else {
    body.appendParagraph('No prayer requests found for ' + formattedDate);
  }

  // Save and close the document
  doc.saveAndClose();
}

function formatDate(dateString) {
  var dateParts = dateString.split('-'); // Assumes input is in YYYY-MM-DD format
  var year = dateParts[0];
  var month = parseInt(dateParts[1], 10);
  var day = parseInt(dateParts[2], 10);

  // Format the day with suffix
  var suffix = (day % 10 === 1 && day !== 11) ? 'st' :
               (day % 10 === 2 && day !== 12) ? 'nd' :
               (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
  var dayWithSuffix = day + suffix;

  // Array of month names
  var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Return formatted date
  return dayWithSuffix + ' ' + monthNames[month - 1] + ' ' + year;
}

function getPrayerRequests(selectedDate) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  Logger.log("Data from Sheet: " + JSON.stringify(data)); // Log all data

  var filteredRequests = [];

  // Convert the selected date to a Date object
  var targetDate = new Date(selectedDate);
  Logger.log("Target Date: " + targetDate.toDateString()); // Log target date

  // Iterate over the data and filter by date
  for (var i = 1; i < data.length; i++) { // Skip header row
    var rowDate = new Date(data[i][0]); // Assuming the date is in the first column
    Logger.log("Row Date: " + rowDate.toDateString()); // Log each row date
    if (rowDate.toDateString() === targetDate.toDateString()) {
      filteredRequests.push(data[i][1] + ': ' + data[i][2]); // Assuming name in 2nd column, request in 3rd
    }
  }
  
  Logger.log("Filtered Requests: " + JSON.stringify(filteredRequests)); // Log the filtered requests
  return filteredRequests; // Return filtered requests for the selected date
}

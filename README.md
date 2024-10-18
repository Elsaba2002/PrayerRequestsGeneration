📖 Prayer Requests Generation
A Google Apps Script project to streamline prayer request management for our church. This project integrates with Google Sheets, Google Forms and Google Docs, allowing users to select a date and automatically generate a formatted document with prayer requests for that specific day.

🚀 Features
Date Picker: Users can pick a specific date to generate prayer requests.
Google Sheets Integration: Prayer requests are stored in a Google Sheet and filtered by the selected date.
Google Docs Integration: A new section is added to a Google Doc, listing all prayer requests for the selected date.
Automatic Formatting: Includes headings and separators for better readability.

📂 Project Structure

Code.gs              # Main Google Apps Script logic
DatePicker.html      # HTML interface for the date picker

🛠️ How It Works
Fill Out the Google Form: Church members submit their prayer requests using a Google Form.
Generate Prayer Requests Document:
Click the Prayer Requests menu in the Google Sheet.
Select "Generate Prayer Requests" to open the date picker.
Pick a date to generate a new section in the linked Google Doc.
Output: A formatted document containing all prayer requests for the selected day is saved and updated automatically.

# jobsearcher

Recent Job Searcher is a web application designed using NodeJS + Express to help users find the latest job listings. It features an intuitive interface for job searching, with functionalities for filtering job postings by various criteria. The app provides users with up-to-date job opportunities, making the job search process efficient and straightforward.

Job Search API
This is a Node.js application that allows users to search for job openings based on specified criteria such as country, region, and job category. It includes endpoints for rendering pages and handling job search queries.

Features
Home, About, and Contributors pages.
Job search functionality that fetches job listings from an external API.
Renders search results on a results page.
Prerequisites
Node.js (version 14 or higher recommended)
npm (Node Package Manager)
An external API key (e.g., from api.exa.ai)
Installation
Clone the repository

bash
Copy code
git clone https://github.com/Chakilamchandana/jobsearcher
cd job-search-api
Install dependencies

bash
Copy code
npm install
Set up environment variables

Create a .env file in the root directory and add your API key and other necessary configuration:

env
Copy code
API_URL=https://api.exa.ai/search
API_KEY=a591ac39-8984-42f5-9abd-24fcc250cf07
PORT=8000
Running the Application
Start the server

bash
Copy code
npm start
Access the application

Open your web browser and navigate to http://localhost:8000.

API Endpoints
Homepage
GET /

Renders the homepage.
About Page
GET /about

Renders the about page.
Contributors Page
GET /contributors

Renders the contributors page.
Job Search
POST /get-jobs

Handles job search queries.
Request Body

json
Copy code
{
"countryInput": "USA",
"regionInput": "California",
"categoryInput": "Software Engineer"
}
Response

Renders results.ejs with job search results.
Example Usage
Here's a basic example of how to use the API:

javascript
Copy code
const axios = require("axios");

async function searchJobs() {
const response = await axios.post("http://localhost:8000/get-jobs", {
countryInput: "USA",
regionInput: "California",
categoryInput: "Software Engineer"
});

console.log(response.data);
}
searchJobs();

Acknowledgements
Thanks to the creators of the [exa.ai API](https://dashboard.exa.ai/playground/search) for providing the job search API.

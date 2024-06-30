# jobsearcher

Recent Job Searcher is a web application designed using NodeJS + Express to help users find the latest job listings. It features an intuitive interface for job searching, with functionalities for filtering job postings by various criteria. The app provides users with up-to-date job opportunities, making the job search process efficient and straightforward.

**Job Search API**
This is a Node.js application that allows users to search for job openings based on specified criteria such as country, region, and job category. It includes endpoints for rendering pages and handling job search queries.

**Features**
Home, About, and Contributors pages.  
Job search functionality that fetches job listings from an external API.  
Renders search results on a results page.    

**Prerequisites**    

1. Node.js (version 14 or higher recommended)  
2. npm (Node Package Manager)  
3. An external API key (e.g., from api.exa.ai)
4. Installation
5. Clone the repository

**bash**
1. git clone https://github.com/Chakilamchandana/jobsearcher  
2. cd job-search-api  
3. Install dependencies using npm i  

**Set up environment variables**
Create a .env file in the root directory and add your API key and other necessary configuration:  

1. API_URL=https://api.exa.ai/search  
2. API_KEY=*yourAPIKey*  
3. PORT=8000
4. Running the Application

**Start the server**  
1. npm start  

**Access the application**  
1. Open your web browser and navigate to http://localhost:8000.

**API Endpoints**  
1. Homepage  
GET /
Renders the homepage.    

2. About Page  
GET /about  
Renders the about page.

3. Contributors Page  
GET /contributors  
Renders the contributors page.

4. Job Search  
POST /get-jobs  
Handles job search queries.    


**Acknowledgement**  
Thanks to the creators of the [exa.ai API](https://dashboard.exa.ai/playground/search) for providing the job search API.

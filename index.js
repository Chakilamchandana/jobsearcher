import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

const port = 8000;

/**
 * The URL for the API endpoint used for job searches.
 * @type {string}
 */
const API_URL = "https://api.exa.ai/search";

/**
 * The API key required for accessing the job search API.
 * @type {string}
 */
const apiKey = "a591ac39-8984-42f5-9abd-24fcc250cf07";

app.use(express.static("public")); // Serve static files from the 'public' directory.
// Parse URL-encoded and JSON bodies for incoming requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This is crucial for parsing JSON bodies

app.set("view engine", "ejs");

/**
 * Route serving the homepage.
 * @name get/
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/", (req, res) => {
  res.render("index.ejs");
});

/**
 * Route serving the about page.
 * @name get/about
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

/**
 * Route serving the contributors page.
 * @name get/contributors
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/contributors", (req, res) => {
  res.render("contributors.ejs");
});

/**
 * Route handling job search queries.
 * @name post/get-jobs
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @throws {Error} Throws an error if required fields are missing or if the API call fails.
 */
app.post("/get-jobs", async (req, res) => {
  try {
    const { countryInput, regionInput, categoryInput } = req.body;

    console.log("Request Body:", req.body);
    console.log("countryInput:", countryInput);
    console.log("regionInput:", regionInput);
    console.log("categoryInput:", categoryInput);

    //Validate inputs
    if (!countryInput || !regionInput || !categoryInput) {
      throw new Error("Missing required fields");
    }

    const regionString = Array.isArray(regionInput)
      ? regionInput.join(", ")
      : regionInput;
    const query = `here are some leads for open positions in the role ${categoryInput} in ${regionInput}, ${countryInput}`;

    const options = {
      method: "POST",
      url: API_URL,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      data: {
        query: query,
        numResults: 7,
        type: "neural",
        startPublishedDate: "2023-01-01",
        excludeDomains: ["https://jsremote.jobs/"],
      },
    };

    console.log("Sending query:", query);

    const response = await axios.request(options);
    const apiData = response.data;

    console.log("API Response:", apiData);

    res.render("results.ejs", { apiData });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res
      .status(500)
      .send("Sorry, there has been an error with the server. Try again later.");
  }
});

/**
 * Starts the Express server.
 * @name listen
 * @function
 * @memberof module:app
 * @inner
 * @param {number} port - The port on which the server will listen.
 * @param {function} callback - Callback function to run once the server starts.
 */
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

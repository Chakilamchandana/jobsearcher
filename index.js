// import express from "express";
// import axios from "axios";
// import bodyParser from "body-parser";

// const app = express();
// const port = 8000;
// const API_URL = "https://api.exa.ai/search";

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

// // const apiKey = 'dac8ef6b-81d5-4725-b42c-322854e77b7f';
// const apiKey = "a591ac39-8984-42f5-9abd-24fcc250cf07";
// const config = {
//   headers: {
//     "x-api-key": apiKey,
//   },
// };

// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

// app.get("/about", (req, res) => {
//   res.render("about.ejs");
// });

// app.get("/contributors", (req, res) => {
//   res.render("contributors.ejs");
// });

// app.post("/get-jobs", async (req, res) => {
//   try {
//     const { countryInput, regionInput, cityInput, categoryInput } = req.body;

//     // console.log(req.body);
//     console.log(regionInput, countryInput);

//     const query = `Some leads for open positions in the role ${categoryInput} in ${cityInput}, ${regionInput}, ${countryInput}`;

//     const options = {
//       method: "POST",
//       url: API_URL,
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         "x-api-key": apiKey,
//       },
//       //   data: {
//       //     query: query,
//       //     numResults: 10,
//       //     type: "neural",
//       //     startPublishedDate: "2023-06-01",
//       //   },
//       body: JSON.stringify({
//         query: query,
//         useAutoprompt: true,
//         type: "string",
//         numResults: 10,
//         startPublishedDate: "2024-01-01T00:00:00.000Z",
//         endPublishedDate: "2024-06-20T00:00:00.000Z",
//         contents: {
//           text: { maxCharacters: 0, includeHtmlTags: true },
//           highlights: { numSentences: 0, highlightsPerUrl: 0, query: "string" },
//         },
//       }),
//     };

//     console.log(query);

//     const response = await axios.request(options);
//     const apiData = response.data;
//     res.render("results.ejs", { apiData });
//   } catch {
//     console.error(error);
//     res.status(500).send("Error occurred");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server started on ${port}`);
// });
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 8000;
const API_URL = "https://api.exa.ai/search";
const apiKey = "a591ac39-8984-42f5-9abd-24fcc250cf07";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This is crucial for parsing JSON bodies
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contributors", (req, res) => {
  res.render("contributors.ejs");
});

app.post("/get-jobs", async (req, res) => {
  try {
    // const { countryInput, regionInput, cityInput, categoryInput } = req.body;
    const { countryInput, regionInput, categoryInput } = req.body;

    console.log("Request Body:", req.body);
    console.log("countryInput:", countryInput);
    console.log("regionInput:", regionInput);
    // console.log("cityInput:", cityInput);
    console.log("categoryInput:", categoryInput);

    if (!countryInput || !regionInput || !categoryInput) {
      throw new Error("Missing required fields");
    }

    const regionString = Array.isArray(regionInput)
      ? regionInput.join(", ")
      : regionInput;
    // const query = ` Some leads for open positions in the role ${categoryInput} in ${cityInput}, ${regionInput}, ${countryInput}`;
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
        // includeDomains: [
        //   "https://www.linkedin.com/feed/",
        //   "https://www.governmentjobs.com/",
        //   "https://www.glassdoor.com/",
        // ],
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
    res.status(500).send("Error occurred");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

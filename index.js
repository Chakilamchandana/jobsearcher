import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const app = express();
const port = 8000;
const API_URL = "https://api.metaphor.systems/search/";


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

const apiKey = 'dac8ef6b-81d5-4725-b42c-322854e77b7f';
const config = {
    headers: {
        'x-api-key': apiKey
    }
};

app.get('/', (req,res)=>{
    res.render('index.ejs');
});

app.get('/about', (req,res)=>{
    res.render('about.ejs');
});

app.get('/contributors', (req,res)=>{
    res.render('contributors.ejs');
})

app.post('/get-jobs', async(req,res) =>{
    try{
        const countryInput = req.body.countryInput;
        const regionInput = req.body.regionInput;
        const cityInput = req.body.cityInput;
        const categoryInput = req.body.categoryInput;

        console.log(req.body);
        console.log(regionInput, countryInput);

        const query = `here are some leads for open positions in the role ${categoryInput} in ${cityInput}, ${regionInput}, ${countryInput}`

        const options = {
            method: 'POST',
            url: API_URL,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'x-api-key': apiKey
            },
            data: {
                query: query,
                numResults: 10, 
                type: 'neural', 
                startPublishedDate: '2023-06-01'
            },
        };

        console.log(query);

        const response = await axios.request(options);
        const apiData = response.data;
        res.render('results.ejs', {apiData});

    }catch{
        console.error(error);
        res.status(500).send('Error occurred'); 
    }
});

app.listen(port,() =>{
    console.log(`Server started on ${port}`);
})


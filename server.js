const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const package = require('package');

const port = process.env.port || process.env.PORT || 5000;
const apiRoot = '/api'  

const app = express();

//database
const db = {
    'car1': {
        'carVIN': 'VN284839S929A',
        'carB': 'car brand',
        'carM': 'car model',
        'carE': 'car engine ',
        'carC': 'colour',
        'carY': 'year'
    }
}

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: /http:\/\/localhost/ }));
app.options('*', cors());

const router = express.Router();
router.get('/', (req, res) => {
    res.send(`${package.description} - v${package.version}`);
});

router.get('/accounts/:carVIN', (req, res) => {
    // const carVIN = req.parems.carVIN;
    console.log("request: ", req.params.carVIN);
    const carVIN = req.params.carVIN;

    const accounts = db[carVIN];

    if (!accounts) {
        return res
            .status(404)
            .json({error: 'Car doesnt exist'});
    }
    return res.json(accounts);
});

app.use(apiRoot, router);

app.listen(port, () => {
    console.log('severs up!');
});


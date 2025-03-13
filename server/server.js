const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const cafeRoute = require('./routes/cafeRoute');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: [process.env.CORS_ORIGIN, "http://localhost:5173"].filter(Boolean),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", cafeRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  try {
    return res.status(200).json({message: "Backend is running..."});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
})

const FastSpeedtest = require("fast-speedtest-api");
 
let speedtest = new FastSpeedtest({
    token: process.env.SPEEDTEST_TOKEN, // required
    verbose: true, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps // default: Bps
});
 
speedtest.getSpeed().then(s => {
    console.log(`Speed: ${s} Mbps`);
}).catch(e => {
    console.error(e.message);
});



app.listen(PORT, async() => {
  try {
    await connectDB();
    console.log(`Server is listening on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Server failed to start!", err.message);
  }
  
});

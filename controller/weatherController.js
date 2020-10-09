const { get } = require("../routes");
require("dotenv").config();
const weatherController = {};
const apikey = process.env.OPEN_WEATHER_KEY;
const axios = require("axios");
weatherController.getWeatherData = async (req, res, next) => {
	try {
		console.log("what is req", req.query.q);
		const city = req.query.q;
		let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
		let response = await axios.get(url);
		// console.log("response??", response);
		let lat = response.data.coord.lat;
		let lon = response.data.coord.lon;
		let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=${apikey}`;
		let response2 = await axios.get(url2);
		res.send({ status: "success", data: response2.data });
	} catch (error) {
		res.send({ status: "fail", data: error.message });
	}

	//   res.send({ status: data });
};
module.exports = weatherController;

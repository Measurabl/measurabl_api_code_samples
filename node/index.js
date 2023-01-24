const axios = require('axios');
const express = require('express');
const Promise = require("bluebird");

// Headers 
// - all endpoints follow the http://jsonapi.org/ specification and requires a
//    content type of 'application/vnd.api+json'
// - all endpoint calls to Core api must me authenticated with your token
const headers = {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "Bearer [your token here]"
}

const endpoints = [
    // Portfolios
    // The 'root' object of your portfolio. All buildings and/or funds will 
    //     be a child of a portfolio
    {
        name: "Portfolios",
        description: "Get a list of portfolios for a logged in user",
        url: "https://api.measurabl.com/core/v0/portfolios",
        response: {}
    },
    // Buildings
    // Buildings are children of portfolios/funds and are a parent to things like meters
    //     waste meters, and certifications
    {
        name: "Buildings",
        description: "Get a list of buildings for a given portfolio",
        url: "https://api.measurabl.com/core/v0/portfolios/[portfolioId]/buildings",
        response: {}
    },
    // Meters
    // Meters are children of buildings and are a parent to things like meter-readings
    {
        name: "Meters",
        description: "Get a list of meters for a given portfolio",
        url: "https://api.measurabl.com/core/v0/portfolios/[portfolioId]/buildings/[buildingId]/meters",
        response: {}
    },

]

// This is a simple program you can run to ensure you can 
//    properly hit our endpoints. Please refer to the readme 
//    for instructions on running this program

const app = express()
const port = 3001
const path = require('path');
const public = path.join(__dirname, 'public')

app.get('/', (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});
app.get('/endpoints', async (req, res) => {
    let portfolioObject = {
        portfolio: '', 
        building: '',
        meter: ''
    }

    headers.Authorization = headers.Authorization.replace('[your token here]', req.headers.token);

    Promise.each(endpoints, (endpoint) => {
        endpoint = constructUrl(endpoint, portfolioObject);
        return axios.get(endpoint.url, {'headers': headers}).then((res) => {
            endpoint.response = res.data;
            if (res.data.data.length > 0) {
                portfolioObject = updatePortfolioObj(res.data.data[0].id, endpoint.name, portfolioObject);
            } else {
                endpoint.response = res.data;
            }
            return endpoint;
         }).catch(e => {
            console.error(e);
            endpoint.response = e.message;
         });
    }).then(result => {
        res.json(result);
    });
});
app.use('/', express.static(public));
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


function constructUrl(endpoint, portfolioObject) {
    switch (endpoint.name) {
        case "Portfolios":
            break;
        case "Buildings":
            endpoint.url = endpoint.url.replace('[portfolioId]', portfolioObject.portfolio);
            break;
        case "Meters":
            endpoint.url = endpoint.url.replace('[portfolioId]', portfolioObject.portfolio).replace('[buildingId]', portfolioObject.building);
            break;
    }

    return endpoint;
}

function updatePortfolioObj(id, type, obj) {
    obj[type.toLowerCase().substring(0, type.length -1)] = id;
    return obj;
}
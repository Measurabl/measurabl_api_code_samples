from flask import Flask
from flask import request
import requests

# Headers 
# - all endpoints follow the http://jsonapi.org/ specification and requires a
#    content type of 'application/vnd.api+json'
# - all endpoint calls to Core api must me authenticated with your token
headers = {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "Bearer [your token here]"
}

endpoints = [
    # Portfolios
    # The 'root' object of your portfolio. All buildings and/or funds will 
    #     be a child of a portfolio
   {
        'name': "Portfolios",
        'description': "Get a list of portfolios for a logged in user",
        'url': "https://api.measurabl.com/core/v0/portfolios",
        'response': {}
    },
    # Buildings
    # Buildings are children of portfolios/funds and are a parent to things like meters
    #     waste meters, and certifications
    {
        'name': "Buildings",
        'description': "Get a list of buildings for a given portfolio",
        'url': "https://api.measurabl.com/core/v0/portfolios/[portfolioId]/buildings",
        'response': {}
    },
    # Meters
    # Meters are children of buildings and are a parent to things like meter-readings
    {
        'name': "Meters",
        'description': "Get a list of meters for a given portfolio",
        'url': "https://api.measurabl.com/core/v0/portfolios/[portfolioId]/buildings/[buildingId]/meters",
        'response': {}
    },

]

# This is a simple program you can run to ensure you can 
#    properly hit our endpoints. Please refer to the readme 
#    for instructions on running this program

app = Flask(__name__)

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/endpoints')
def getEndpoints():
    portfolioDict = {
        'portfolio': '', 
        'building': '',
        'meter': ''
    }

    headers['Authorization'] = headers['Authorization'].replace('[your token here]', request.headers['token'])

    try:
        for index in range(len(endpoints)):
            endpoints[index] = constructUrl(endpoints[index], portfolioDict)
            response = requests.get(endpoints[index]['url'], headers = headers)
            if not response.json().get('errors') and len(response.json()['data']) > 0:
                portfolioDict = updatePortfolioDict(response.json()['data'][0]['id'], endpoints[index]['name'], portfolioDict)
            endpoints[index]['response'] = response.json()
    except requests.exceptions.RequestException as e: 
        return e, 400

    return endpoints

def constructUrl(endpoint, portfolioDict):
    match endpoint['name']:
        case 'Portfolios':
            return endpoint
        case 'Buildings':
            endpoint['url'] = endpoint['url'].replace('[portfolioId]', portfolioDict['portfolio'])
            return endpoint
        case 'Meters':
            endpoint['url'] = endpoint['url'].replace('[portfolioId]', portfolioDict['portfolio']).replace('[buildingId]', portfolioDict['building'])
            return endpoint

def updatePortfolioDict(id, type, dict):
    dict[type.lower()[0:len(type) -1]] = id
    return dict
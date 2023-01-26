<img src="logo.png" />


# <span style="color: #24324f">Core API Code Examples</span>

## Using This Repo
This is a little collection of example projects we've put together to help you get started with accessing the Measurabl Core API. You can also view our [swagger docs](https://api.measurabl.com/api-docs/index.html?urls.primaryName=Measurabl%20Core%20API%20Docs).

These examples are available in the following languages:

[NodeJS](#node)
[Python](#python)

## Generating an Authentication Token {#credentials}

In order to fully take advantage of these examples, you must be authenticated. 

You can receive an authentication token by hitting our `/token` endpoint with your user and password. 

`curl -X POST -u [username]:[password] https://api.measurabl.com/token` 

This responds with a token, along with its expiration 

```
{
    "access_token": "[your token]",
    "expires_at": "2023-01-25T18:16:10.285Z",
    "expires_in": 86340
}
```

You may use this token to authenticate all calls to the core api until its expiration.

# Node {#node}

## Installing NodeJS

To run the Node example you’ll need to have its run-time installed on your local development computer. If you’ve never installed NodeJS please refer to the [Node Foundation](https://nodejs.org/en/download/) to find an installer most appropriate for your O/S.

## Installing Project Dependencies

Once you’ve installed NodeJS, and pulled down a copy of the source code, you’ll need to install the app’s open-source dependencies. That’s accomplished by running this command in the local copy of the source code:

`cd node && npm install`

## Encoding Credentials

You can generate your authentication token by [following these instructions](#credentials).

You can then add your authentication token to this block of code
```
const headers = {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "Bearer [your token here]"
}
```
You can also enter your token into the UI later.

## Running the Sample App

The sample app is ready to run after setup. Enter this command in the local copy of the source code to run the sample app:

`npm start` 

# Python {#python}

## Installing Python

You can download the latest version of Python [here](https://wiki.python.org/moin/BeginnersGuide/Download).

## Encoding Credentials

You can generate your credentials by [following these instructions](#credentials).

You can then add your credentials to this block of code
```
headers = {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "Bearer [your token here]"
}
```
You can also enter your token into the UI later.


## Running the Sample App

The sample app is ready to run after setup. Enter this command in the local copy of the source code to run the sample app:

`cd python && python3 -m flask --app index run` 


## License

Copyright (c) 2023 Measurabl Licensed under the MIT license.

## Disclaimer of Warranty and Limitation of Liability

This software and any compiled programs created using this software are furnished “as is” without warranty of any kind, including but not limited to the implied warranties of merchantability and fitness for a particular purpose. No oral or written information or advice given by Measurabl, its agents or employees shall create a warranty or in any way increase the scope of this warranty, and you may not rely on any such information or advice.
Measurabl does not warrant, guarantee, or make any representations regarding the use, or the results of the use, of this software, compiled programs created using this software, or written materials in terms of correctness, accuracy, reliability, currentness, or otherwise. The entire risk as to the results and performance of this software and any compiled applications created using this software is assumed by you. Neither Measurabl nor anyone else who has been involved in the creation, production or delivery of this software shall be liable for any direct, indirect, consequential, or incidental damages (including damages for loss of business profits, business interruption, loss of business information, and the like) arising out of the use of or inability to use such product even if Measurabl has been advised of the possibility of such damages.

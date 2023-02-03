const url = '/endpoints'



document.addEventListener("DOMContentLoaded", function() {
    let endpoints = []; 

    let getEndpointsButton = document.getElementsByClassName('go_button')[0];
    let stagingArea = document.getElementById('endpoint_staging_area');

    fetch('/headers')
    .then(response => response.json())
    .then((data) => {
        if (data.Authorization && data.Authorization !== "Bearer [your token here]")  document.getElementById("token_field").value = data.Authorization;
    });


    getEndpointsButton.addEventListener("click", function(e) {
        const token = document.getElementById('token_field').value; 

        stagingArea.innerHTML = '<div style="display: flex; justify-content: center"><img src="/spinner.gif"/></div>';

        fetch(url, {
            method: 'GET',
            headers: {
                'token': token
            }
        }).then(response => response.json())
        .then((data) => {
            endpoints = data;
            stagingArea.innerHTML = '';
            printEndpoints(data);
        })
        .catch((err) =>  {
            console.log('Fetch Error :-S', err);
            });
    }, false);

    function printEndpoints(arr) {
        console.log("Endpoints: \n");
        arr.forEach((endpoint) => {
            console.log(`${endpoint.name}: \n`);
            console.log(`${endpoint.description} \n`);
            console.log("response:");
            console.log(endpoint.response);
            stagingArea.innerHTML = stagingArea.innerHTML + createEndpointHtml(endpoint); 
        });
    }

    function createEndpointHtml(endpoint) {
        return `
        <div class="endpoint-container">
            <h3>${endpoint.name}</h3>
            <div class="content-section">
                <div class="content-container">
                    <p class="content-text">${endpoint.description}</p>
                </div>
                <div class="content-container">
                    <span class="response-title">url</span>
                    <pre class="prettyprint"  style="color: #fff">${endpoint.url}</pre>
                </div>
                <div class="content-container">
                    <span class="response-title">response</span>
                    <pre  class="prettyprint" style="color: #fff">${JSON.stringify(endpoint.response, null, "  ")}</pre>
                </div>  
            </div>
        </div>
        `
    }

});
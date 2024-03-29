'use strict'

function displayResults(responseJson) {
    $('.results').empty();
    if (responseJson.length === 0 ) {
        $('.js-error-message').append('No results found. Try expanding your miles radius!');
        return;
    }
    const listItems = []
    for (let i = 0; i<responseJson.length; i++) {
        listItems.push(`
        <ul>
        <li><a href="${responseJson[i].ProfileUrl}" target="_blank"><h3>Hello, my name is ${responseJson[i].Name}</h3></a></li>
        <li><img src="${responseJson[i].PrimaryPhotoUrl}" alt="photoofadoptablepet"></li>
        <li>Adoption Deadline: ${responseJson[i].AdoptionDeadline}</li>
        <li>Breed: ${responseJson[i].BreedsForDisplay}</li>
        <li>Gender: ${responseJson[i].Gender}</li>
        <li>Spayed/Neutered: ${responseJson[i].SpayedNeutered}</li>
        <li>Size: ${responseJson[i].Size}</li>
        <li>I am ${responseJson[i].AgeYears} years and ${responseJson[i].AgeMonths} months</li>
        <li>My activity level is ${responseJson[i].ActivityLevel}</li>
        <li>I get along great with ${responseJson[i].GoodWith}</li>
        <li>Location: ${responseJson[i].City}, ${responseJson[i].State}, ${responseJson[i].ZipCode}</li>
        </ul>`);
    }
    $('<h3 class="results-hdr">Let me introduce you to...</h3>').insertBefore('.results');
    $('.results').append(listItems);
}

function getYourPet(pet, zip, miles) {

    const data = {
        "PetType": pet,
        "ZipCode": zip,
        "SearchRadiusInMiles": miles,
        "PageNumber": 1,
    }

    const apikey = 'E6A0D4A3-086C-4D68-A16A-FD7F2D5D0DC3';
    /*const apiUrl = 'https://cors-anywhere.herokuapp.com/https://getyourpet.com/api/partnerpetsearch';*/
    const apiUrl = 'https://corsanywhere.herokuapp.com/https://getyourpet.com/api/partnerpetsearch';
    


    let h = new Headers();
    h.append('Content-Type', 'application/json');
    h.append('api-key', apikey);

    let req = new Request(apiUrl, {
        method:  'POST',
        mode: 'cors',
        headers: h,
        body: JSON.stringify(data),
    });

    fetch(req)
    .then(console.log(req))
    .then(response => {
        if (response.ok) {
            console.log(response.json);
            return response.json();
         } 
        throw new Error (response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => $('.js-error-message').text(`Something went wrong...${error.message}! Please search by Cat or Dog.`));
};

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        const bypet = $('#bypet').val();
        const zipcode = $('#zipcode').val();
        const miles = $('#miles').val();
        getYourPet(bypet, zipcode, miles);
    });
}

formSubmit();

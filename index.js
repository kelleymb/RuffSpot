'use strict'

function displayResults(responseJson) {
    console.log(responseJson);
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
        <li><img src="${responseJson[i].PrimaryPhotoUrl}"></li>
        <li><em>Adoption Deadline:</em> ${responseJson[i].AdoptionDeadline}</li>
        <li><em>Breed:</em> ${responseJson[i].BreedsForDisplay}</li>
        <li><em>Gender:</em> ${responseJson[i].Gender}</li>
        <li><em>Spayed/Neutered:</em> ${responseJson[i].SpayedNeutered}</li>
        <li><em>Size:</em> ${responseJson[i].Size}</li>
        <li><em>I am ${responseJson[i].AgeYears} years and ${responseJson[i].AgeMonths} months</em></li>
        <li><em>My activity level is ${responseJson[i].ActivityLevel}</li>
        <li><em>I get along great with ${responseJson[i].GoodWith}</li>
        <li><em>Location:</em> ${responseJson[i].City}, ${responseJson[i].State}, ${responseJson[i].ZipCode}</li>
        <br></ul>`);
    }
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
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://getyourpet.com/api/partnerpetsearch';


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
    .then(response => {
        if (response.ok) {
            return response.json()
         } 
        throw new Error (response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        console.log('error', error);
        $('.js-error-message').text(`Oops! Something went wrong: ${error.message}`)
    });

    console.log(apiUrl);
};

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        console.log('Submit action is working.');
        const bypet = $('#bypet').val();
        const zipcode = $('#zipcode').val();
        const miles = $('#miles').val();
        console.log(bypet);
        console.log(zipcode);
        console.log(miles);
        getYourPet(bypet, zipcode, miles);
    });
}

formSubmit();

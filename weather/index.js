const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "bc70a3652933d6cdcb716b3f8d31096e";

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();

    const cityName = cityInput.value;
    if(cityName){
        try{
            const weatherData = await getData(cityName);
            displayInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else displayError("Please enter a city");
});

async function getData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok) throw new Error("cannon fecth data");
    return await response.json();
}

function displayInfo(data){
    const {name: city,
           main: {temp, humidity}, 
           weather: [{description, icon}]} = data;
    card.textContent= "";
    card.style.display = "flex";

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const emojiDisplay = document.createElement('img');
    
    cityDisplay.textContent = city;
    card.appendChild(cityDisplay);

    tempDisplay.textContent = getTemp(temp);
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    card.appendChild(descDisplay);

    getEmoji(icon).then(emojiUrl => {
        emojiDisplay.src = emojiUrl;  // Set the src of the image element
        emojiDisplay.alt = description;  // Optionally set alt text for accessibility
        card.appendChild(emojiDisplay);
    });
}

async function getEmoji(icon){
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return iconUrl;
}

function displayError(msg){
    const errDisplay = document.createElement('p');
    errDisplay.textContent = msg;
    errDisplay.classList.add("errorDisplay");
    card.textContent = " ";
    card.style.display = "flex";
    card.appendChild(errDisplay);
}

function getTemp(degree){
    let degreeVal = document.getElementById("degree").value;
    if(degreeVal==="celcius"){
        const temp = (degree - 273.15).toFixed(1);
        return `${temp}°C`;
    }
    if(degreeVal==="fahrenheit"){
        const temp = ((degree - 273.15) * 1.8 + 32 ).toFixed(1);
        return `${temp}°F`;
    }
    if(degreeVal==="kelvin"){
        return `${degree.toFixed(1)}°K`;
    }
}

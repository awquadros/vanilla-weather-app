window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/3fe03eebdbfd511012149bb7d2905a1f/${latitude},${longitude}`

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    temperatureDescription.textContent = summary;
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;

                    // Set Icon
                    setIcon(document.querySelector(".icon"), icon);
                    // Change temperature unit
                    temperatureSection.addEventListener('click', () => {
                        temperatureSpan.textContent = temperatureSpan.textContent === 'F'
                            ? 'C'
                            : 'F';
                    });
                });
        });
    }
});

function setIcon(canvas, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = translateIconName(iconID);

    skycons.play();

    skycons.set(canvas, Skycons[currentIcon]);
};

function translateIconName(iconName) {
    let icon = typeof iconName === 'undefined' || iconName === null
        ? ''
        : iconName;
    return icon.replace(/-/g,'_').toUpperCase();
};

function toCelsius(value) {
    return Math.floor((value - 32) * (5 / 9));
};
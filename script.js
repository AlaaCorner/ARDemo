// getting places from APIs
function loadPlaces(position) {
    return [
        {
            name: 'Garden',  
            location: {
                lat: 26.284524793279008, 
                lng: 50.19734019982354
            },
        },
        {
                name: 'Villa 143',  
            location: {
                lat: 26.28433388883504, 
                lng: 50.198192257859596
            },
        }
    ];
};

window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        let places = loadPlaces(position.coords)
            places.forEach((place) => {
                const latitude = place.location.lat;
                const longitude = place.location.lng;

                //alert(place.name);

                // add place name
                const placeText = document.createElement('a-link');
                placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                placeText.setAttribute('title', place.name);
                placeText.setAttribute('scale', '3 3 3');
                
                placeText.addEventListener('loaded', () => {
                    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                });

                scene.appendChild(placeText);
            });
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
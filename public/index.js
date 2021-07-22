//Initializing MAP instance with leafletjs.com
let map = L.map('map');
//default place before searching for any address - Hyderabad,INDIA
map.setView([17.387140,78.491684], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([17.387140,78.491684]).addTo(map)
    .bindPopup(`default<br /><b>Hyderabad</b>`)
    .openPopup();
//to fetch the data from Geo-loocation API
function fetchAddress(){
    let query = document.getElementById('search').value;
    if(query.length > 0){
        let regEx = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/;
        if(regEx.test(query)){
            let IP_VAL = document.querySelector('#ip-value');
            let LOC_VAL = document.querySelector('#loc-value');
            let TIME_VAL = document.querySelector('#time-value');
            let ISP_VAL = document.querySelector('#isp-value');
            //fetching Geo Location
            fetch(`https://geo.ipify.org/api/v1?apiKey=at_TS463r2RkWX4LzJ8UeTtaL5BOpbqL&ipAddress=${query}`)
            .then(response => response.json())
            .then(result => {
                //variables
                IP_VAL.innerText = result.ip;
                LOC_VAL.innerText = `${result.location.city},${result.location.country}`;
                TIME_VAL.innerText = `UTC ${result.location.timezone}`;
                ISP_VAL.innerText = result.isp;
                //Arranging Map
                map.setView([`${result.location.lat}`, `${result.location.lng}`], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                var myIcon = L.icon({
                    iconUrl: './images/icon-location.svg',
                    iconSize: [46, 56],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                });

                L.marker([`${result.location.lat}`, `${result.location.lng}`],{icon: myIcon}).addTo(map)
                    .bindPopup(`${result.isp}<br />${result.location.city}, ${result.location.region}, ${result.location.country}`)
                    .openPopup();

            })

        }
        else if(/[^@ \t\r\n]+[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(query)){
            let IP_VAL = document.querySelector('#ip-value');
            let LOC_VAL = document.querySelector('#loc-value');
            let TIME_VAL = document.querySelector('#time-value');
            let ISP_VAL = document.querySelector('#isp-value');
            //fetching Geo Location
            fetch(`https://geo.ipify.org/api/v1?apiKey=at_TS463r2RkWX4LzJ8UeTtaL5BOpbqL&domain=${query}`)
            .then(err => window.alert(`${err.statusText} \nEnter correct domain name. \n(Don't include https:// or '/')`))
            .then(response => response.json())
            .then(result => {
                //variables
                IP_VAL.innerText = result.ip;
                LOC_VAL.innerText = `${result.location.city},${result.location.country}`;
                TIME_VAL.innerText = `UTC ${result.location.timezone}`;
                ISP_VAL.innerText = result.isp;
                //Arranging map
                map.setView([`${result.location.lat}`, `${result.location.lng}`], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                var myIcon = L.icon({
                    iconUrl: './images/icon-location.svg',
                    iconSize: [46, 56],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                });

                L.marker([`${result.location.lat}`, `${result.location.lng}`],{icon:myIcon}).addTo(map)
                    .bindPopup(`${result.isp}<br />${result.location.city}, ${result.location.region}, ${result.location.country}`)
                    .openPopup();

            })    
        }
        else{
            window.alert("Please provide correct IP address/Domain Name.");
            document.getElementById("search").value = '';
        }
    }
    else{
        window.alert("Enter something");
    }
}
(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let AmPm_text = "AM";

            if (h < 10) {
                h = "0" + h;
            }
            if (h > 12) {
                h-=12;
                AmPm_text = "PM";
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + AmPm_text;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        let first_name = document.getElementById("first-name").children[1];
        let last_name = document.getElementById("last-name").children[1];
        let text_fields = [first_name, last_name]
        let bad_input = false
        for (let index = 0; index < text_fields.length; index++) {
            const element = text_fields[index];
            if (element.value === ""){
                alert("Tekstiväljad peavad olema täidetud")
                index = text_fields.length;
                bad_input = true
            }

            let regex=/[0-9]+/;
            if (element.value.match(regex)){
                alert("Tekstiväljadel ei tohi olla numbreid");
                index = text_fields.length;
                bad_input = true
            }
        }
        let radio_button1 = document.getElementById("tarne1")
        let radio_button2 = document.getElementById("tarne2")

        if (radio_button1.checked === radio_button2.checked){
            bad_input = true
            alert("Vali kas kiire või aeglane tarne")
        }

        if (bad_input){
            return
        }

        let linn = document.getElementById("linn");
        let price_city = {
            tln: 0,
            trt: 2.5,
            nrv: 2.5,
            prn: 3

        };
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        }
        
        
        e.innerHTML = price_city[linn.value].toString()+" &euro;";
                  
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let ut = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let parim_koht = new Microsoft.Maps.Location(
        58.8814812, 25.5490265
        );
    let kesk_punkt = new Microsoft.Maps.Location(
        58.5814812, 25.6290265
        );
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: kesk_punkt,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    }); 
    let pushpin = new Microsoft.Maps.Pushpin(ut);
    let pushpin2 = new Microsoft.Maps.Pushpin(parim_koht);
    pushpin.metadata = {
        title: "Tartu Ülikool"
    }
    pushpin2.metadata = {
        title: "Paide"
    }
    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);
    let pins = [pushpin,pushpin2]

    for (let index = 0; index < pins.length; index++) {
        const pin = pins[index];
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
        map.entities.push(pin);
        
    }
    function pushpinClicked(e) {
        console.log(e.target.metadata)
        if (e.target.metadata) {
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                //description: e.target.metadata.description,
                visible: true
            });
        }
    }

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE


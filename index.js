// docs https://developers.meethue.com/develop/get-started-2/
const axios = require('axios');

// const lightNumber = '1';
const lights = [1,2,3,4,5];

const phillips_hue_username = '';
const local_bridge_ip = '192.168.86.68';

let brightness = 250; // 0-254
const saturation = 254; // 0-254

const one_second_bpm = 60;

// j balvin songs
const rojo_bpm = 172;
const verde_bpm = 95;
const amarillo_bpm = 123;
const negro_bpm = 93; //banger btw

// bad bunny songs
const bb_25_8_bpm = 76;
const bb_yo_perreo_sola_bpm = 97;

// selected bpm
const chosen_bpm = 200;

const interval = (1/(chosen_bpm /60)) *  1000;


const generateRandomNumber = () => {
    let randomNumber = Math.floor((Math.random() * 10));
    return randomNumber = randomNumber >= 10 ? 9 : randomNumber;
};
const runLights = (toggleLights, isOn, lightNumber) => {
    const randomHueTensThousands = generateRandomNumber() * 10000;
    const randomHueThousands = generateRandomNumber() * 1000;
    const randomHueHundreds = generateRandomNumber() * 100;

    let randomHue = randomHueTensThousands + randomHueThousands + randomHueHundreds;

    if (randomHue >= 65535) {
        randomHue = 65535 - (((generateRandomNumber() +1) * 100) * (generateRandomNumber()+1)) ;
    }

    if ([1,4].includes(lightNumber)) {
        brightness = 70;
    } else {
        brightness = 250;
    }

    if (isOn) {
        console.warn('color is now', randomHue, 'for', lightNumber, 'with brightness', brightness);
    }

    const endpoint = `http://${local_bridge_ip}/api/${phillips_hue_username}/lights/${lightNumber}/state`;

    const options = {
        on: toggleLights ? !!isOn : true,
        bri: brightness,
        sat: saturation,
        hue: randomHue
    };

    axios.put(endpoint, options)
        .then(() => {
            setTimeout(() => {
                runLights(toggleLights, !isOn, lightNumber);
            }, interval)
        })
        .catch((e) => {
            console.warn(e);
        });
};


lights.forEach((num) => {
    runLights(false, true, num);
})

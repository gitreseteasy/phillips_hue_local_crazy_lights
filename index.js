// docs https://developers.meethue.com/develop/get-started-2/
const axios = require('axios');

const lightNumber = '1';
const phillips_hue_username = '<your randomly generated id here>';
const local_bridge_ip = '192.168.86.68';

// j balvin songs
const rojo_bpm = 172;
const verde_bpm = 95;
const amarillo_bpm = 123;
const negro_bpm = 93; //banger btw

// bad bunny songs
const bb_25_8_bpm = 76;
const bb_yo_perreo_sola_bpm = 97;

// selected bpm
const chosen_bpm = negro_bpm;

const interval = (1/(chosen_bpm /60)) *  1000;


const generateRandomNumber = () => {
    let randomNumber = Math.floor((Math.random() * 10));
    return randomNumber = randomNumber >= 10 ? 9 : randomNumber;
};
const runLights = (toggleLights, isOn) => {
    const randomHueTensThousands = generateRandomNumber() * 10000;
    const randomHueThousands = generateRandomNumber() * 1000;
    const randomHueHundreds = generateRandomNumber() * 100;

    let randomHue = randomHueTensThousands + randomHueThousands + randomHueHundreds;

    if (randomHue >= 65535) {
        randomHue = 65535 - (((generateRandomNumber() +1) * 100) * (generateRandomNumber()+1)) ;
    }

    if (isOn) {
        console.warn('color is now', randomHue);
    }

    const endpoint = `http://${local_bridge_ip}/api/${phillips_hue_username}/lights/${lightNumber}/state`;
    const options = {
        on: toggleLights ? !!isOn : true,
        bri: 254,
        sat: 254,
        hue: randomHue
    };

    axios.put(endpoint, options)
        .then(() => {
            setTimeout(() => {
                runLights(toggleLights, !isOn);
            }, interval)
        })
        .catch((e) => {
            console.warn(e);
        });
};

runLights(false, true);

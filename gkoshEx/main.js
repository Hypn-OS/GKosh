var container = document.createElement('span');
container.innerHTML += "<button id='playText'  style='position: absolute; bottom: 2rem; right: 2rem; background: lightskyblue; padding: .5rem 1rem; border: 2px solid #2196f3; border-radius: .25rem; font-size: 1.2rem; color: black; text-transform: uppercase; font-family: sans-serif;'>Play Selected Texts</button>";

document.body.appendChild(container);


console.log(document.getElementById('playText'));


document.getElementById('playText').addEventListener("click", function(){

    

    document.querySelectorAll('.highlighter--highlighted').forEach(function(data){
        var currentText = data.textContent;
        console.log(data.textContent);
        // list of languages is probably not loaded, wait for it
        if(window.speechSynthesis.getVoices().length == 0) {
            window.speechSynthesis.addEventListener('voiceschanged', function() {
                textToSpeech(currentText);
            });
        }
        else {
            // languages list available, no need to wait
            textToSpeech(currentText);
        }
        
    });
});

function textToSpeech(speechText) {
    // get all voices that browser offers
    var available_voices = window.speechSynthesis.getVoices();

    // this will hold an english voice
    var english_voice = '';

    // find voice by language locale "en-US"
    // if not then select the first voice
    for(var i=0; i<available_voices.length; i++) {
        if(available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if(english_voice === '')
        english_voice = available_voices[0];

    // new SpeechSynthesisUtterance object
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = speechText;
    utter.voice = english_voice;

    // event after text has been spoken
    utter.onend = function() {
        //alert('Speech has finished');
    }

    // speak
    window.speechSynthesis.speak(utter);
}
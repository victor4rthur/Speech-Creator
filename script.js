// Create a new SpeechSynthesisUtterance object
const msg = new SpeechSynthesisUtterance();

// Array to store available voices
let voices = [];

// DOM elements selection
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Set the initial text for the speech synthesis
msg.text = document.querySelector('[name="text"]').value;

// Function to populate the dropdown with available voices
function populateVoices() {
    // Get the available voices
    voices = speechSynthesis.getVoices();
    
    // Generate HTML options for each voice
    const voicesOptions = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
    
    // Update the dropdown with the generated options
    voicesDropdown.innerHTML = voicesOptions;
}

// Function to set the selected voice
function setVoice() {
    // Find the selected voice by name in the voices array
    msg.voice = voices.find(voice => voice.name === this.value);
    // Toggle the speech synthesis
    toggle();
}

// Function to toggle speech synthesis, with an optional parameter to start over
function toggle(startOver = true) {
    // Cancel any ongoing speech synthesis
    speechSynthesis.cancel();
    
    // If startOver is true, initiate speech synthesis with the configured message
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

// Function to set options for the speech synthesis
function setOption() {
    // Set the corresponding option in the msg object
    msg[this.name] = this.value;
    // Toggle the speech synthesis with the updated options
    toggle();
}

// Event listeners for voiceschanged, change, click on relevant elements
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
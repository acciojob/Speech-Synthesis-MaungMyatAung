// Your script here.
// Set the utterance's text to the textarea's value
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en')) // Only show English voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set voice from dropdown
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); // Restart with new voice
}

// Set pitch/rate/text values
function setOption() {
  msg[this.name] = this.value;
}

// Speak the message
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) speechSynthesis.speak(msg);
}

// Events
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));


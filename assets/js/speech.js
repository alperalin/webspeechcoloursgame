// Imports
import { handleResult } from './handlers/index.js';
import { colorsByLength, isDark } from './data/colors.js';

// Variables
const colorsEl = document.querySelector('.colors');

// Display Colors on index.html
const displayColors = (colors) => {
	return colors
		.map(
			(color) =>
				`<span class="${color} ${
					isDark(color) ? ' dark' : ''
				}" style="background: ${color}">${color}</span>`
		)
		.join('');
};

// Speech Recognition is a chrome API
// and it started when chrome's web engine name was webkit(right now, its blink).
// We pass any possible API name to window.SpeechRecognition. So, we can call it in code as SpeechRecognition.
window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const init = () => {
	// See if the browser support web speech recognition
	if (!('SpeechRecognition' in window)) {
		console.log(`your browser doesn't support SpeechRecognition API.`);
		return;
	}

	console.log('listen starting....');

	// Starting Code
	const recognition = new SpeechRecognition();
	recognition.continuous = true; // Enables always listen. Otherwise, it will stop listening when you don't speak.
	recognition.interimResults = true; // Returns listening results instantly. Otherwise, it waits until the end of the speech.
	recognition.onresult = handleResult; // SpeechRecognition doesn't support addEventListener. You need to pass a function to onresult to get data.
	recognition.onerror = function (event) {
		// Error function.
		console.log(event.error);
	};
	recognition.start(); // Starting the listening operation.

	colorsEl.innerHTML = displayColors(colorsByLength);
};

init();

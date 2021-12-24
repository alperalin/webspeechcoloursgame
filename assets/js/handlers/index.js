// Handlers
// import
import { isValidColor } from '../data/colors';

// Result Handler
const handleResult = ({ results }) => {
	// Get result from recognition. Turn words to lowercase and remove spaces.
	const words = results[results.length - 1][0].transcript
		.toLowerCase()
		.replace(/\s/g, '');

	// Check the word is a valid color
	if (!isValidColor(words)) return;

	// Change background of body based on words
	document.body.style.backgroundColor = words;

	// Add 'got' class to the span element of color
	document.body.querySelector(`.${words}`).classList.add('got');
};

export { handleResult };

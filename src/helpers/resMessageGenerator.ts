// This function generates response messages for email sending operations
function generateResMessages(prefixPhrase: string, recipientName: string, recipientEmail: string) {
	// Construct the success message
	const successMessage = `${prefixPhrase} has to User -: ${recipientName} at ${recipientEmail} has been sent.`;

	// Construct the failure message
	const notSucessMessage = `${prefixPhrase} has to User -: ${recipientName} at ${recipientEmail} has not been sent.`;

	// Define a generic server error message
	const error = 'server error!';

	const wrongMethodMessage = '`expected a POST request at this route.`';

	// Bundle all messages into an object
	const resMessages = {
		successMessage: successMessage,
		notSucessMessage: notSucessMessage,
		errorMessage: error,
		wrongMethodMessage: wrongMethodMessage,
	};

	// Return the messages object
	return resMessages;
}

// Export the function for use in other modules
export default generateResMessages;

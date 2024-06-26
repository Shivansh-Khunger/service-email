// Import the email content template
import getEmailContent from '../templates/welcomeEmail';

// Import the Response class
import ResponsePayload from '../utils/generateRes';
import generateResMessages from '../helpers/resMessageGenerator';

// Define constants for API URL, sender email, content type, website, support email, and unsubscribe URL
export const MAIL_API_URL = 'https://api.mailchannels.net/tx/v1/send';
const CONTENT_TYPE = 'application/json';
const HANDLER_NAME = `sendWelcomeEmail`;

export const WEBSITE_URL = `https://ijuju.in`;

// TODO -> update unsub URL.
export const UNSUB_URL = `https://ijuju.in`;

// TODO -> update guidlines URL.
export const GUIDLINES_URL = `https://ijuju.in`;

const SENDER_EMAIL = 'noreply@info.ijuju.in';
export const SUPPORT_EMAIL = `support@ijuju.in`;

// Function to send a welcome email
async function sendWelcomeEmail(request: Request) {
	const resPayload = new ResponsePayload();

	// Extract receiver email and name from the request body
	const { recipientEmail, recipientName }: { recipientEmail: string; recipientName: string } = await request.json();

	const resMessages = generateResMessages('welcome email', recipientName, recipientEmail);
	let resMessage: string;

	// Check for non POST request.
	if (request.method !== 'POST') {
		// Set the response message
		resMessage = resMessages.wrongMethodMessage;

		// Update the response payload
		resPayload.setError(resMessage, HANDLER_NAME, recipientName, recipientEmail);

		// Return a Method Not Allowed response with the response payload
		return Response.json(resPayload, { status: 405 });
	}

	try {
		// Create a new request object for the API call
		const send_request = new Request(MAIL_API_URL, {
			method: 'POST',
			headers: {
				'content-type': CONTENT_TYPE,
			},
			body: JSON.stringify({
				personalizations: [
					{
						to: [{ email: recipientEmail, name: recipientName }],
					},
				],
				from: {
					email: SENDER_EMAIL,
					name: `iJUJU`,
				},
				subject: 'Welcome to iJUJU - Start Your Smart Shopping Journey',
				content: [
					{
						type: 'text/html',
						value: getEmailContent(WEBSITE_URL, SUPPORT_EMAIL, UNSUB_URL, GUIDLINES_URL, recipientName),
					},
				],
			}),
		});

		// Send the email
		const sentEmail = await fetch(send_request);

		// Return the response from the API call
		let resMessage = ``;

		// If the email was sent successfully
		if (sentEmail.ok) {
			// Set the response message
			resMessage = resMessages.successMessage;

			// Update the response payload
			resPayload.setSuccess(resMessage, sentEmail, HANDLER_NAME, recipientName, recipientEmail);

			// Return a successful response with the response payload
			return Response.json(resPayload, { status: 200 });
		} else {
			resMessage = resMessages.notSucessMessage;
			resPayload.setConflict(resMessage, HANDLER_NAME, recipientName, recipientEmail);

			console.log(sentEmail);

			return Response.json(resPayload, { status: 409 });
		}
	} catch (err) {
		// Log any errors and return a server error response
		console.log(err);

		resMessage = resMessages.errorMessage;
		resPayload.setError(resMessage, HANDLER_NAME, recipientName, recipientEmail);

		return Response.json(resPayload, { status: 500 });
	}
}

export default sendWelcomeEmail;

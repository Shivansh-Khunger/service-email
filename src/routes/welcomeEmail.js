// Import the email content template
import getEmailContent from '../templates/welcomeEmail';

// Import the Response class
import ResponsePayload from '../utils/generateRes';

// Define constants for API URL, sender email, content type, website, support email, and unsubscribe link
const MAIL_API_URL = 'https://api.mailchannels.net/tx/v1/send';
const CONTENT_TYPE = 'application/json';
const HANDLER_NAME = `sendWelcomeEmail`;

export const WEBSITE = `ijuju.in`;

// TODO -> update unsub link.
export const UNSUB_LINK = `ijuju.in`;

const SENDER_EMAIL = 'info@ijuju.in';
export const SUPPORT_EMAIL = `support@ijuju.in`;

// Function to send a welcome email
async function sendWelcomeEmail(request) {
	const resPayload = new ResponsePayload();

	// Extract receiver email and name from the request body
	const { recipientEmail, recipientName } = await request.json();

	// Check for non POST request.
	if (request.method !== 'POST') {
		// Set the response message
		const resMessage = `expected a POST request at this route.`;

		// Update the response payload
		resPayload.setError(resMessage, HANDLER_NAME, recipientName, recipientEmail);

		// Return a Method Not Allowed response with the response payload
		return Response.json(resPayload, { status: 405, 'Content-Type': CONTENT_TYPE });
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
						to: [{ email: recipientEmail, name: 'Test Recipient' }],
					},
				],
				from: {
					email: SENDER_EMAIL,
					name: 'Cloudflare Workers - MailChannels integration',
				},
				subject: 'Welcome to iJUJU - Start Your Smart Shopping Journey',
				content: [
					{
						type: 'text/html',
						value: getEmailContent(WEBSITE, SUPPORT_EMAIL, UNSUB_LINK, recipientName),
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
			resMessage = `welcome email to has been sent.`;

			// Update the response payload
			resPayload.setSuccess(resMessage, sentEmail, HANDLER_NAME, recipientName, recipientEmail);

			// Return a successful response with the response payload
			return Response.json(resPayload, { status: 200, 'Content-Type': CONTENT_TYPE });
		} else {
			resMessage = `welcome email to has not been sent.`;
			resPayload.setConflict(resMessage, HANDLER_NAME, recipientName, recipientEmail);

			console.log(sentEmail);

			return Response.json(resPayload, { status: 409, 'Content-Type': CONTENT_TYPE });
		}
	} catch (err) {
		// Log any errors and return a server error response
		console.log(err);

		const resMessage = `server error`;
		resPayload.setError(resMessage, HANDLER_NAME, recipientName, recipientEmail);

		return Response.json(resPayload, { status: 500, 'Content-Type': CONTENT_TYPE });
	}
}

export default sendWelcomeEmail;

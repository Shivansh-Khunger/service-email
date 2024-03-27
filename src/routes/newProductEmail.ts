// Import the email content template
import getNewProductEmailContent from '../templates/newProduct';

// Import necessary modules
import ResponsePayload from '../utils/generateRes';

import { UNSUB_URL, WEBSITE_URL, SUPPORT_EMAIL, MAIL_API_URL } from './welcomeEmail';

// Define constants for API URL, sender email, content type, website, support email, and unsubscribe URL
const CONTENT_TYPE = 'application/json';
const HANDLER_NAME = `sendNewProductEmail`;

const SENDER_EMAIL = 'noreply@info.ijuju.in';

// Function to send a new Product email
async function sendNewProductEmail(request: Request) {
	const resPayload = new ResponsePayload();

	// Extract required values from the request body
	const {
		recipientEmail,
		recipientName,
		recipientBusinessName,
		productName,
	}: { recipientEmail: string; recipientName: string; recipientBusinessName: string; productName: string } = await request.json();

	// Check for non POST request.
	if (request.method !== 'POST') {
		// Set the response message
		const resMessage = `expected a POST request at this route.`;

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
				subject: 'Congratulations on Your New Product on iJUJU!',
				content: [
					{
						type: 'text/html',
						value: getNewProductEmailContent({
							WEBSITE_URL: WEBSITE_URL,
							SUPPORT_EMAIL: SUPPORT_EMAIL,
							UNSUB_URL: UNSUB_URL,
							receiverName: recipientName,
							businessName: recipientBusinessName,
							productName: productName,
						}),
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
			resMessage = `new Product email to has been sent.`;

			// Update the response payload
			resPayload.setSuccess(resMessage, sentEmail, HANDLER_NAME, recipientName, recipientEmail);

			// Return a successful response with the response payload
			return Response.json(resPayload, { status: 200 });
		} else {
			resMessage = `new Product to has not been sent.`;
			resPayload.setConflict(resMessage, HANDLER_NAME, recipientName, recipientEmail);

			console.log(sentEmail);

			return Response.json(resPayload, { status: 409 });
		}
	} catch (err) {
		// Log any errors and return a server error response
		console.log(err);

		const resMessage = `server error`;
		resPayload.setError(resMessage, HANDLER_NAME, recipientName, recipientEmail);

		return Response.json(resPayload, { status: 500 });
	}
}

export default sendNewProductEmail;
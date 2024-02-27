async function sendWelcomeEmail(request, env, ctx) {
	// For testing purpose, replace this with your personal email
	// so that you can see the message sent to your inbox
	const receiver = 'khungersons.fazilka@gmail.com';
	// Replace <yourcompany.com> with the domain you set up earlier
	const sender = 'info@ijuju.in';
	const send_request = new Request('https://api.mailchannels.net/tx/v1/send', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			personalizations: [
				{
					to: [{ email: receiver, name: 'Test Recipient' }],
				},
			],
			from: {
				email: sender,
				name: 'Cloudflare Workers - MailChannels integration',
			},
			subject: 'Welcome to iJUJU - Start Your Smart Shopping Journey',
			content: [
				{
					type: 'text/html',
					value: `<!DOCTYPE html>
							<html>
							<head>
    							<title>Welcome to iJUJU World</title>
							</head>
							<body>
    							<p>Hi User Name,</p>
    							<p>Welcome to iJUJU World, a new experience of shopping along with us to Buy Smart Around you. Now Deals will follow you on the go….Let’s shop smartly.</p>
    							<p>Below are our guidelines as a buyer, please go through once. Also please go through our attachment files for walkthrough features, faq’s of our App.</p>
    							<p>Thanks for being with us, we would like to hear from your end with your feedback form to improve our self being a partner– also hope you will enjoy our service in future.</p>
    							<p>Have a great day ahead from Team iJUJU. For more information please visit our website <a href="http://www.ijuju.in">www.ijuju.in</a> or email us on <a href="mailto:support@ijuju.in">support@ijuju.in</a>. Your suggestions are always welcome.</p>
    							<p>Thanks &amp; Regards,</p>
    							<p>Team iJUJU,</p>
							</body>
							</html>`,
				},
			],
		}),
	});
	const resp = await fetch(send_request);
	return new Response(resp.ok);
}

export default sendWelcomeEmail;

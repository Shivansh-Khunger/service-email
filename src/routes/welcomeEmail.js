async function sendWelcomeEmail(request, env, ctx) {
	// For testing purpose, replace this with your personal email
	// so that you can see the message sent to your inbox
	const receiver = 'khungersons.fazilka@gmail.com';
	// Replace <yourcompany.com> with the domain you set up earlier
	const sender = 'test@ijuju.in';
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
			subject: 'Look! No servers',
			content: [
				{
					type: 'text/html',
					value: '<h1>Hello from Cloudflare worker</h1>',
				},
			],
		}),
	});
	const resp = await fetch(send_request);
	return new Response(resp.ok);
}
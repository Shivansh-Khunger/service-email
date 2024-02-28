import handleBase from './routes/baseRoute.js';
import sendWelcomeEmail from './routes/welcomeEmail.js';

async function routeReq(request, env, ctx) {
	// Parse the URL to extract the pathname.
	const url = new URL(request.url);
	const path = url.pathname.split('/').slice(1);

	switch (path[0]) {
		case '':
			// Handle base route.
			return handleBase;
		case 'welcome':
			// Handle send welcome email route.
			return sendWelcomeEmail(request);
		default:
			// Default case, return a 404 not found response.
			return new Response('Not found', { status: 404 });
	}
}

export default routeReq;

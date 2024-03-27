// Import types
import type { Env } from '.';

// Import necessary modules
import handleBase from './routes/baseRoute';
import sendWelcomeEmail from './routes/welcomeEmail';

async function routeReq(request: Request, env: Env, ctx: ExecutionContext) {
	// Parse the URL to extract the pathname.
	const url = new URL(request.url);
	const path = url.pathname.split('/').slice(1);

	switch (path[0]) {
		case '':
			// Handle base route.
			return handleBase();
		case 'welcome':
			// Handle send welcome email route.
			return sendWelcomeEmail(request);
		default:
			// Default case, return a 404 not found response.
			return new Response('Not found', { status: 404 });
	}
}

export default routeReq;

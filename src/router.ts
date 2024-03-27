// Import types
import type { Env } from '.';

// Import necessary modules
import handleBase from './routes/baseRoute';
import sendWelcomeEmail from './routes/welcomeEmail';
import sendNewBusinessEmail from './routes/newBusinessEmail';
import sendDelBusinessEmail from './routes/delBusiness';
import sendNewProductEmail from './routes/newProductEmail';
import sendDelProductEmail from './routes/delProductEmail';
import sendNewDealEmail from './routes/newDealEmail';

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
		case 'b':
			switch (path[1]) {
				case 'new':
					return sendNewBusinessEmail(request);
				case 'delete':
					return sendDelBusinessEmail(request);
				default:
					return new Response('Not found', { status: 404 });
			}
		case 'p':
			switch (path[1]) {
				case 'new':
					return sendNewProductEmail(request);
				case 'delete':
					return sendDelProductEmail(request);
				default:
					return new Response('Not found', { status: 404 });
			}
		case 'd':
			switch (path[1]) {
				case 'new':
					return sendNewDealEmail(request);
				default:
					return new Response('Not found', { status: 404 });
			}
		default:
			// Default case, return a 404 not found response.
			return new Response('Not found', { status: 404 });
	}
}

export default routeReq;

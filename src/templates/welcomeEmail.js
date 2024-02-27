function getEmailContent(WEBSITE, SUPPORT_EMAIL, UNSUB_LINK, receiverName) {
	const welcomeEmailTemplate = `
        <!DOCTYPE html>
		<html>
        <head>
            <title>Welcome to iJUJU World</title>
        </head>
        <body>
            <p>Hi ${receiverName},</p>
            <p>Welcome to iJUJU World, a new experience of shopping along with us to Buy Smart Around you. Now Deals will follow you on the go….Let’s shop smartly.</p>
            <p>Below are our guidelines as a buyer, please go through once. Also please go through our attachment files for walkthrough features, faq’s of our App.</p>
            <p>Thanks for being with us, we would like to hear from your end with your feedback form to improve our self being a partner– also hope you will enjoy our service in future.</p>
            <p>Have a great day ahead from Team iJUJU. For more information please visit our WEBSITE <a href="${WEBSITE}">${WEBSITE}</a> or email us on <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>. Your suggestions are always welcome.</p>
            <p>Thanks &amp; Regards,</p>
            <p>Team iJUJU,</p>
            <p>If you wish to unsubscribe from our emails, please click <a href="${UNSUB_LINK}">here</a>.</p>
        </body>
        </html>`;

	return welcomeEmailTemplate;
}

export default getEmailContent;

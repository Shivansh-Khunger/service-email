type T_Options = {
	WEBSITE_URL: string;
	SUPPORT_EMAIL: string;
	UNSUB_URL: string;
	receiverName: string;
	businessName: string;
	productName: string;
};

function getNewProductEmailContent({ WEBSITE_URL, SUPPORT_EMAIL, UNSUB_URL, receiverName, businessName, productName }: T_Options) {
	const newProductEmailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>New Product Added to Your Business on iJUJU</title>
        </head>
        <body>
            <p>Hi ${receiverName},</p>
            <p>A new product, ${productName}, has been added to your business, ${businessName}, on iJUJU.</p>
            <p>We encourage you to add deals to your new product. This is a great way to attract more customers and increase your business.</p>
            <p>Thanks for being with us, we would like to hear from your end with your feedback form to improve our self being a partner– also hope you will enjoy our service in future.</p>
            <p>Have a great day ahead from Team iJUJU. For more information please visit our WEBSITE <a href="${WEBSITE_URL}">iJUJU</a> or email us on <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>. Your suggestions are always welcome.</p>
            <p>Thanks &amp; Regards,</p>
            <p>Team iJUJU,</p>
            <p>If you wish to unsubscribe from our emails, please click <a href="${UNSUB_URL}">here</a>.</p>
        </body>
        </html>`;

	return newProductEmailTemplate;
}

export default getNewProductEmailContent;

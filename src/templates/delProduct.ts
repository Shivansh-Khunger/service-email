type T_Options = {
	WEBSITE_URL: string;
	SUPPORT_EMAIL: string;
	UNSUB_URL: string;
	receiverName: string;
	businessName: string;
	productName: string;
};

function getDeleteProductEmailContent({ WEBSITE_URL, SUPPORT_EMAIL, UNSUB_URL, receiverName, businessName, productName }: T_Options) {
	const deleteProductEmailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Product Deletion Confirmation</title>
        </head>
        <body>
            <p>Hi ${receiverName},</p>
            <p>We're writing to confirm that the product, ${productName}, has been successfully deleted from your business, ${businessName}, on iJUJU.</p>
            <p>If this was a mistake or if you wish to restore your product, please contact our support team as soon as possible.</p>
            <p>For more information, please visit our website <a href="${WEBSITE_URL}">iJUJU</a> or email us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>. Your feedback and suggestions are always welcome.</p>
            <p>Thanks &amp; Regards,</p>
            <p>Team iJUJU,</p>
            <p>If you wish to unsubscribe from our emails, please click <a href="${UNSUB_URL}">here</a>.</p>
        </body>
        </html>`;

	return deleteProductEmailTemplate;
}

export default getDeleteProductEmailContent;

type T_Options = {
    WEBSITE_URL: string;
    SUPPORT_EMAIL: string;
    UNSUB_URL: string;
    receiverName: string;
    businessName: string;
    productName: string;
    dealName: string;
    dealEndDate: string;
};

function getNewDealEmailContent({ WEBSITE_URL, SUPPORT_EMAIL, UNSUB_URL, receiverName, businessName, productName, dealName, dealEndDate }: T_Options) {
    const newDealEmailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>New Deal Added to Your Product on iJUJU</title>
        </head>
        <body>
            <p>Hi ${receiverName},</p>
            <p>A new deal, ${dealName}, has been added to your product, ${productName}, under your business, ${businessName}, on iJUJU.</p>
            <p>Please note that this deal is valid until ${dealEndDate} and will be removed after this date.</p>
            <p>Thanks for being with us, we would like to hear from your end with your feedback form to improve our self being a partner– also hope you will enjoy our service in future.</p>
            <p>Have a great day ahead from Team iJUJU. For more information please visit our WEBSITE <a href="${WEBSITE_URL}">iJUJU</a> or email us on <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>. Your suggestions are always welcome.</p>
            <p>Thanks &amp; Regards,</p>
            <p>Team iJUJU,</p>
            <p>If you wish to unsubscribe from our emails, please click <a href="${UNSUB_URL}">here</a>.</p>
        </body>
        </html>`;

    return newDealEmailTemplate;
}

export default getNewDealEmailContent;

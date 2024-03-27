type T_Options = { WEBSITE_URL: string; SUPPORT_EMAIL: string; UNSUB_URL: string; receiverName: string; businessName: string };

function getDeleteBusinessEmailContent({ WEBSITE_URL, SUPPORT_EMAIL, UNSUB_URL, receiverName, businessName }: T_Options) {
    const deleteEmailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Business Deletion Confirmation</title>
        </head>
        <body>
            <p>Hi ${receiverName},</p>
            <p>We're writing to confirm that the business, ${businessName}, has been successfully deleted from our records.</p>
            <p>If this was a mistake or if you wish to restore your business, please contact our support team as soon as possible.</p>
            <p>For more information, please visit our website <a href="${WEBSITE_URL}">iJUJU</a> or email us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>. Your feedback and suggestions are always welcome.</p>
            <p>Thanks &amp; Regards,</p>
            <p>Team iJUJU,</p>
            <p>If you wish to unsubscribe from our emails, please click <a href="${UNSUB_URL}">here</a>.</p>
        </body>
        </html>`;

    return deleteEmailTemplate;
}

export default getDeleteBusinessEmailContent;

class ResponsePayload {
	constructor() {
		this.isSuccess = false;
		this.hasError = false;
		this.message = '';
		this.data = null;
		this.timestamp = new Date(); // Timestamp for when the message was created
		this.handlerName = ''; // The name of the service that created the message
		this.recipientName = '';
		this.recipientEmail = '';
	}

	setSuccess(message, data = null, handlerName = '', recipientName = '', recipientEmail = '') {
		this.isSuccess = true;
		this.message = message;
		this.data = data;
		this.handlerName = handlerName;
		this.recipientName = recipientName;
		this.recipientEmail = recipientEmail;
	}

	setError(message, handlerName = '', recipientName = '', recipientEmail = '') {
		this.hasError = true;
		this.message = message;
		this.handlerName = handlerName;
		this.recipientName = recipientName;
		this.recipientEmail = recipientEmail;
	}

	setConflict(message, handlerName = '', recipientName = '', recipientEmail = '') {
		this.message = message;
		this.handlerName = handlerName;
		this.recipientName = recipientName;
		this.recipientEmail = recipientEmail;
	}
}

export default ResponsePayload;

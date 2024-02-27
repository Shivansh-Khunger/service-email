class ResponsePayload {
	constructor() {
		this.isSuccess = false;
		this.hasError = false;
		this.message = '';
		this.data = null;
		this.timestamp = new Date(); // Timestamp for when the message was created
		this.handlerName = ''; // The name of the service that created the message
	}

	setSuccess(message, data = null, handlerName) {
		this.isSuccess = true;
		this.message = message;
		this.data = data;
		this.handlerName = handlerName;
	}

	setError(message, handlerName) {
		this.hasError = true;
		this.message = message;
		this.handlerName = handlerName;
	}

	setConflict(message, handlerName) {
		this.message = message;
		this.handlerName = handlerName;
	}
}

export default ResponsePayload;

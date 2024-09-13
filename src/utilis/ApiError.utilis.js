

class ApiError extends Error {



    constructor(statusCode, message = "something went wrong ", errors = []) {
        super(message)
        this.statusCode = statusCode
        this.success = false
        this.data = null
        this.errors = errors
    }

}

export { ApiError }
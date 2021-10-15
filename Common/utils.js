exports.API_AUTH_SECRET = "veryStrongPassword@fridaystory"
exports.ERROR_MESSAGE = "Some internal error occured. Please try again."

exports.ActiveStatus = {
    Deleted: 0,
    Active: 1
}

exports.showErrorMessage = (res, statusCode = 500, message = "", data = {}) => {
    return res.status(statusCode).json({
        message: message,
        data: data
    })
}
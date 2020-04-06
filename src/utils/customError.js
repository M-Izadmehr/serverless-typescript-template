const customError = ({ statusCode, error } = {}) => ({
    statusCode,
    body: JSON.stringify(error),
})

export default customError

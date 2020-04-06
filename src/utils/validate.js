import joi from 'joi'
import customError from './customError'

/**
 * Error handling in case of validation error
 * @param {*} errors
 * @param {*} done
 */
const errorsHandler = (errors, done) => {
    const formattedErrors = errors
        .filter((error) => error && error.details)
        .flatMap((error) =>
            error.details.map((err) => ({
                errorMessage: err.message,
                errorType: 'InvalidParametersException',
            }))
        )

    return done(
        null,
        customError({
            error: formattedErrors,
            statusCode: 400,
        })
    )
}

/**
 * Method used to validate input params and return errors
 * @param {*} schema
 * @param {*} event
 * @param {*} field
 */
const validateParams = (schema, event, field) => {
    let params
    try {
        params = JSON.parse(event[field])
    } catch (error) {
        params = event[field]
    }
    if (schema[field]) {
        return joi.validate(params, schema[field], { abortEarly: false })
    }
    return { value: params, error: null }
}

/**
 * Higher order function for validation
 * @param {*} schema
 * @param {*} fn
 */
function validate(schema, fn) {
    return function (event, context, done) {
        const queryValidation = validateParams(schema, event, 'queryStringParameters')
        const bodyValidation = validateParams(schema, event, 'body')

        if (queryValidation.error || bodyValidation.error) {
            const errors = [queryValidation.error, bodyValidation.error]
            return errorsHandler(errors, done)
        } else {
            event.data = { ...queryValidation.value, ...bodyValidation.value }
            return fn(event, context, done)
        }
    }
}

export default validate

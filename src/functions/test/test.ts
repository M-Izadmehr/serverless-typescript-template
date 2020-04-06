import validate from '../../utils/validate'
import validationSchema from './validationSchema'

const test = async (event, context, callback) => {
    return {
        statusCode: 200,
        body: JSON.stringify(event.data), // the parsed value from schema
    }
}

export const handler = validate(validationSchema, test)

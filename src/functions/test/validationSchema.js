import joi from 'joi'

const validationSchema = {
    queryStringParameters: {
        value: joi.number().min(1).max(20).required(),
    },
}

export default validationSchema

export const error = (err, res) => {
    if (err.name === 'ValidationError') return res.status(400).send({ status: false, success: false, msg: err.message })
    if (err.name === 'CastError') return res.status(400).send({ status: false, success: false, msg: 'MongoDb id Invalid' })

    return res.status(500).send({ status: false, success: false, message: err.message })
}
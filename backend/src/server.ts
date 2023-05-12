import configs from './config/configs'
import app, { accessLogStream } from './app'
import mongoose from 'mongoose'

mongoose.connect(`${configs.MONGO_URI}/${configs.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected to MongoDB ...")
        app.listen(configs.PORT, () => {
            console.log(`Server is running at http://${configs.HOST}:${configs.PORT}`)

            accessLogStream.write(`Server is running at http://${configs.HOST}:${configs.PORT} \n`)
        })
    })
    .catch(console.error)

process.on("SIGINT", () => {
    // log using
    accessLogStream.write("Server is Down!\n")
})

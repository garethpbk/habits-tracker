import mongoose from "mongoose"

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
  }

  return handler(req, res)
}

const db = mongoose.connection
db.once("open", () => {
  console.log("Connected to mongo")
})

export default connectDb

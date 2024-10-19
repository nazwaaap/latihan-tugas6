const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const { title } = require("process");

async function main() {
  /--------------- Not allowed to be edited - start - --------------------- */;
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);

  const command = args[0];
  /--------------- Not allowed to be edited - end - --------------------- */;

  // Connect to MongoDB
  await mongoose.connect(mongoUri);

  // Define a schema for the collection
  const schema = new mongoose.Schema(
    {
      title: String,
      year: Number,
      genre: [String],
      description: String,
      director: String,
      cast: [String],
    },
    { strict: false }
  );

  const Model = mongoose.model(collection, schema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
    break;
    // TODO: Buat logic fungsionalitas yg belum tersedia di bawah
    case "bulk-insert":
      const data = JSON.parse(fs.readFileSync("seed.json", "utf-8"));

      for (const item of data) {
        //const movieModel = new Model()
        //movieModel.title = movie.title
        //movieModel.year = movie.year
        //movieModel.genre = movie.genre
        //movieModel.description = movie.description
        //movieModel.director = movie.director
        //movieModel.cast = movie.cast

        //await movieModel.save()

        await Model.create({
          title: title.title,
          year: title.year,
          genre: title.genre,
          description: title.description,
          director: title.director,
          cast: title.cast,
        });
      }

      console.log("bulk insert berhasil");
    break;

    case "get-all":
      const movieDataGetAll = await Model.find();
      console.log(movieDataGetAll);
      console.log("get all berhasil");
    break;

    case "reset-db":
      await Model.deleteMany();
      console.log("reset database Berhasil")
    break;

    default:
      throw Error("command not found");
  }

  await mongoose.disconnect();
  return;
}

async function checkConnection() {
  console.log("check db connection started...");
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connection is successful!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
  console.log("check db connection ended...");
}

main();
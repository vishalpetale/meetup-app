import { MongoClient } from "mongodb";

// api/new-meetup
// POST api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://vishal:123qweasd@cluster0.o2tmf.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollections = db.collection("meetups");

    const result = await meetupCollections.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup added successfully." });
  }
}
export default handler;

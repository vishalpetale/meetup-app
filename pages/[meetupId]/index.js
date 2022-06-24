import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <MeetupDetail
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  //etablish connection, access collection
  const client = await MongoClient.connect(
    "mongodb+srv://vishal:123qweasd@cluster0.o2tmf.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    // Dynamic array of paths
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },]
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://vishal:123qweasd@cluster0.o2tmf.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");

  const selectedMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailPage;

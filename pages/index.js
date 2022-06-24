//our-domain.com/
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   //send Http request and get data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name="description" content="Browse for amazing React meetups." />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://vishal:123qweasd@cluster0.o2tmf.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");

  // to get all documents in collection
  const meetups = await meetupCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   //fetch data from an API
//   // can access request object using context parameter
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;

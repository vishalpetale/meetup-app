// our-domain.com/new-meetup

import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(meetupData) {
    const result = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Programmatic navigation
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta
          name="description"
          content="Add new meetup to increase your reach."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
}
export default NewMeetupPage;

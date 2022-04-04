import { collection, getDocs } from "firebase/firestore/lite";
import type { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { TarefasHome } from "../components/TarefasHome";
import { _database } from "../utils/_firebase";

const Home = ({ tasks }: { tasks: any[] }) => {
  return (
    <>
      <TarefasHome tasks={tasks} />
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(context);
    if (!cookies.token)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
  } catch (err) {
    console.log(err);
  }

  try {
    const snapshot = await getDocs(collection(_database, "tasks"));
    let tasks: any[] = [];

    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at.toString(),
      });
    });

    return {
      props: { tasks },
    };
  } catch (err) {
    console.log(err);
  }

  return { props: {} };
}

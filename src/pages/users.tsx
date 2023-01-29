import UserCard from "@/components/UserCard";
import { GetServerSideProps } from "next";
import Head from "next/head";

export type Person = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(`https://reqres.in/api/users?page=1`);
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      users: data.data,
    },
  };
};

const Users = ({ users }: { users: Person[] }) => {
  console.log(users);

  if (!users)
    return (
      <div className="flex justify-center mt-6">
        <span className="animate-spin w-6 h-6 rounded-full inline-block box-border border-2 border-solid border-b-slate-700 border-slate-400"></span>
      </div>
    );

  return (
    <>
      <Head>
        <title>User Fetcher | Get Users</title>
      </Head>
      <main>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {users.map((user) => (
            <UserCard person={user} key={user.id} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default Users;

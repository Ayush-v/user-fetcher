# Next.js with TypeScript and Tailwind CSS

### 1. Create a Next.js App with TypeScript

```zsh
npx create-next-app --typescript
cd my-app
```

### 2. Installed Tailwind CSS following guide

[tailwind guide](https://tailwindcss.com/docs/guides/nextjs)

### 3. Create a Layout

Create a layout.tsx file in the /components directory to serve as the parent component for all pages. Add a navigation bar that will stay on all pages.

```tsx
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type LayoutType = {
  children: ReactNode;
};

function Navbar() {
  const { pathname } = useRouter();

  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.svg" alt="" width={70} height={44} />
      </Link>
      <nav className="flex gap-4">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "border-blue-400" : ""
          } border-b-2 py-2 px-3 text-xs`}
        >
          Home
        </Link>
        <Link
          href="/users"
          className={`${
            pathname === "/users" ? "border-blue-400" : ""
          } border-b-2 py-2 px-3 text-xs`}
        >
          Get Users
        </Link>
      </nav>
    </header>
  );
}

const Layout = ({ children }: LayoutType) => {
  return (
    <div className="m-4 max-w-screen-lg mx-auto space-y-6 min-h-full h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
```

#### Wrap the pages component in the Layout component in \_app.tsx:

```tsx
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

### 4. Create a User Card Compoent

```tsx
// types imported from user page
import { Person } from "@/pages/users";

const UserCard = ({ person }: { person: Person }) => {
  return (
    <>
      <li className="col-span-1 flex flex-col divide-y divide-gray-200 border rounded-lg text-center">
        <div className="flex flex-1 flex-col p-6 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
            src={person.avatar}
            alt=""
          />
          <div className="text-left grid grid-cols-2 gap-4">
            <div>
              <h3 className="uppercase font-semibold text-sm text-gray-400">
                First Name
              </h3>
              <p>{person.first_name}</p>
            </div>
            <div>
              <h3 className="uppercase font-semibold text-sm text-gray-400">
                Last Name
              </h3>
              <p>{person.last_name}</p>
            </div>
          </div>
          <div className="text-left">
            <h3 className="uppercase font-semibold text-sm text-gray-400">
              Email
            </h3>
            <p>{person.email}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default UserCard;
```

### 5. Fetch Data using getServerSideProps

In the user.tsx file, use getServerSideProps to fetch the data from an API.

```tsx
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
```

### 6. Create a User Page

```tsx
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
      <main className="mt-16">
        <h1 className="text-4xl my-4">All Users</h1>
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
```

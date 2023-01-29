import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>User Fetcher | Home</title>
        <meta name="description" content="Lorem Ipsum User Fetcher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-5xl text-center my-16">
          Welcome To User Fetcher App!
        </h1>
      </main>
    </>
  );
}

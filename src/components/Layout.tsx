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

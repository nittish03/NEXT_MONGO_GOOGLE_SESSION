"use client";
import { useState } from "react";
import NavLink from "next/link";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  // const [username, setUsername] = useState(" ")
  // const [count, setCount] = useState(0)
  // const [error, setError] = useState("")
  console.log(session)
  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  console.log(session)
  return (
    <>
      <nav className="shadow-sm  text-xl shadow-white flex justify-center flex-col items-center py-2 px-2 bg-black text-white font-inter fixed top-0 left-0 w-full z-10 ">
        <div className="text-2xl font-extrabold font-koho">AI Clone</div>

        <div className="  flex items-center gap-10">
          <NavLink href="/">Home</NavLink>

          {session && (
            <>
              <div className="  flex space-x-2 items-center">
                <div className="flex justify-between w-[90%] items-center content-center">
                  <div className="flex justify-center content-center items-center gap-2">
                    <div className="text-l font-koho">
                    {session.user?.name?.split(" ")[0]}
                    </div>
<div>
                      <Link href="/logout">
                        <button className="flex items-center justify-center content-center" onClick={handleLogout}>
                          <CgProfile  color="green" size={40} />
                        </button>
                      </Link>
</div>
                  </div>
                </div>
              </div>
            </>
          )}
          {!session && (
            <div className="  flex space-x-2 items-center">
              <div></div>
              <Link href="/login">
                <button className="bg-white text-black rounded-full p-1">
                  Login/Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

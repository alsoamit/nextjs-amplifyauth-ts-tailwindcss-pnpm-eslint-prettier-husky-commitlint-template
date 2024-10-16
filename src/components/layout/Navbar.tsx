"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex justify-between items-center py-6 mx-auto">
      <Link href={`/`}>Home</Link>
      <section className="flex items-center gap-5">
        <button onClick={handleLogout}>Logout</button>
      </section>
    </div>
  );
}

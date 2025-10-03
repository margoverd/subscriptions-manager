"use client";

import { signOut } from "next-auth/react";

const ButtonLogout = ({ className = "" }) => {
  return (
    <button className={`btn btn-ghost ${className}`} onClick={() => signOut()}>
      Logout
    </button>
  );
};

export default ButtonLogout;

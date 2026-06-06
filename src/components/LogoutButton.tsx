'use client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {signOut} from "next-auth/react";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

export default function LogoutButton() {
  return (
    <button onClick={() => signOut()}
            className="bg-transparent hover:bg-white/10 text-gray-300 hover:text-white py-1.5 px-3 rounded text-sm font-semibold inline-flex gap-2 items-center transition-colors border border-white/10">
      Logout
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-xs" />
    </button>
  );
}
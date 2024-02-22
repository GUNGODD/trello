'use client';
import {signIn} from "next-auth/react";

export default function LoginView() {
  return (
    <div className="w-full pt-8 text-center">
      <button
        onClick={() => signIn('github')}
        className="primary">Login</button>
    </div>
  );
}
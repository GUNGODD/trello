import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="bg-[#579dff] hover:bg-[#85b8ff] text-[#1d2125] font-semibold text-sm py-1.5 px-4 ml-2 rounded transition-colors"
    >
      Login
    </Link>
  );
}
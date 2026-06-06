import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBell, 
  faQuestionCircle, 
  faBullhorn, 
  faTh, 
  faSearch, 
  faPlus 
} from "@fortawesome/free-solid-svg-icons";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <header 
      className="px-4 py-2 text-white flex items-center justify-between border-b"
      style={{
        backgroundColor: "#1d2125",
        borderColor: "#2c333a",
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Launcher Grid */}
        <button className="text-gray-400 hover:text-white transition-colors p-1.5 rounded hover:bg-[#2c333a]">
          <FontAwesomeIcon icon={faTh} className="text-base" />
        </button>

        {/* Logo */}
        <Link 
          href="/" 
          className="text-lg font-bold tracking-tight flex items-center gap-1.5 hover:opacity-90 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#579dff"/>
            <path d="M7 7H10.5V17H7V7ZM13.5 7H17V13H13.5V7Z" fill="#1d2125"/>
          </svg>
          <span className="font-extrabold text-[17px] tracking-wide text-gray-200">Trello</span>
        </Link>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FontAwesomeIcon icon={faSearch} className="text-xs" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-3 py-1.5 bg-[#2c333a] border border-[#454f59] rounded-md text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:bg-[#38424d] focus:border-[#579dff] transition-all"
          />
        </div>

        {/* Create Button */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#579dff] hover:bg-[#85b8ff] text-[#1d2125] font-semibold text-sm rounded transition-colors">
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Create
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search button for small screens */}
        <button className="md:hidden text-gray-400 hover:text-white p-1.5 rounded hover:bg-[#2c333a] transition-colors">
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {/* Megaphone */}
        <button className="text-gray-400 hover:text-white p-1.5 rounded hover:bg-[#2c333a] transition-colors">
          <FontAwesomeIcon icon={faBullhorn} className="text-sm -rotate-12" />
        </button>

        {/* Bell */}
        <button className="text-gray-400 hover:text-white p-1.5 rounded hover:bg-[#2c333a] transition-colors relative">
          <FontAwesomeIcon icon={faBell} className="text-sm" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#1d2125]"></span>
        </button>

        {/* Help */}
        <button className="text-gray-400 hover:text-white p-1.5 rounded hover:bg-[#2c333a] transition-colors">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-sm" />
        </button>

        {/* Theme Toggle & Login/Logout */}
        <div className="border-l border-[#2c333a] pl-2 flex items-center gap-2">
          <ThemeToggle />
          {session ? (
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#0052cc] text-white select-none border border-white/20"
                title={session.user?.name || "User"}
              >
                {initials}
              </div>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
}
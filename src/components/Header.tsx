
import {authOptions} from "@/lib/authOptions";
import {getServerSession} from "next-auth";
import Link from "next/link";
import LoginButton from "./LogoutButton";
import LogoutButton from '@/components/LogoutButton';


export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-gray-200 p-4 px-8">
      <div className="flex justify-between items-center">
        <Link href="/" className="logo">Trello</Link>
        <div>
          {session && (
            <>
              Hello, {session?.user?.name} 
              <LogoutButton/>           
            </>
          )}
          {!session && (
            
            <>
            Not Loged In  
            <LoginButton/>
            </>
             
          
          )}
        </div>
      </div>
    </header>
  );
}
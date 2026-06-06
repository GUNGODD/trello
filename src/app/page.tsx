import Boards from "@/components/Boards";
import Header from "@/components/Header";
import LandingPage from "@/components/landing-page";
import {authOptions} from "@/lib/authOptions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getServerSession} from "next-auth";
import Link from "next/link";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <LandingPage />;
  }
  return (
    <>
      <Header />
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 
              className="text-2xl md:text-3xl font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Your boards
            </h1>
            <Link
              className="btn inline-flex gap-2 items-center"
              href={'/new-board'}
            >
              <FontAwesomeIcon className="h-4" icon={faArrowRight}/>
              Create board
            </Link>
          </div>
          <Boards/>
        </div>
      </main>
    </>
  )
}

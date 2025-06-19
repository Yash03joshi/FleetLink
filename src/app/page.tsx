'use client';
import Header from "@/components/common/Header";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Home() {
  useAuthRedirect();
  return (
    <div>
      <Header/>
      <main>
        <div className="mt-[35vh] min-h-screen ">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Welcome to My Booking Platform
          </h1>
        </div>
      </main>
    </div>
  );
}

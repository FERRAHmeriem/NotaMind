"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="p-8 rounded-2xl shadow-xl bg-white border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
         Create Your Account ✨
        </h1>
        <p className="text-center text-gray-500 mb-6">
           Join <span className="font-semibold text-purple-600">Notamind</span> and start your journey
        </p>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg",
              card: "shadow-none border-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",

            },
            
          }}
        />
      </div>
    </div>
  );
}

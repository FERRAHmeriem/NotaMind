"use client"

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const createUser = useMutation(api.user.createUser);

  const handleCreateUser = async () => {
    if (user) {
      await createUser({
        userName: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl,
      });
    }
  };

  useEffect(() => {
    handleCreateUser();
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-gray-50 to-purple-50 overflow-hidden text-gray-900">
      
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Logo */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image src="/notamind_row.png" alt="Notamind logo" width={150} height={50} />
        </motion.div>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6 max-w-2xl">
        <motion.h1
          className="text-5xl font-extrabold tracking-tight leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Remember{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            everything
          </span>{" "}
          that matters.
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Notamind is your intelligent memory assistant — capture, organize,
          and recall your thoughts effortlessly with the power of AI.
        </motion.p>

        <motion.div
          className="flex gap-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={handleGetStarted} size="lg" className="px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all">
            Get Started
          </Button>
        </motion.div>
      </section>

      {/* Preview / Illustration */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }}>
          <Image
            src="/NotaMind.png"
            alt="App preview"
            width={800}
            height={400}
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Notamind. All rights reserved.
      </footer>
    </main>
  );
}

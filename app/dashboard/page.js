"use client";

import { useQuery } from "convex/react";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Skeleton loader compact
function SkeletonCard() {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg p-4 flex flex-col items-center shadow-sm border border-gray-100">
      <div className="w-16 h-20 bg-gray-200 rounded-md mb-3"></div>
      <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
      <div className="h-2 w-12 bg-gray-200 rounded"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
    </div>
  );
}

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  const files = useQuery(
    api.pdfStorage.getUserFiles,
    user?.primaryEmailAddress?.emailAddress
      ? { email: user.primaryEmailAddress.emailAddress }
      : undefined
  );

  // Loading shimmer
  if (files === undefined) {
    return (
      <div>
        <h1 className="text-xl font-semibold mb-4">Workplace</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Workplace</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence>
          {files.length > 0 ? (
            files.map((file, i) => (
              <motion.div
                key={file._id}
                onClick={() => router.push(`/workplace/${file.pdfId}`)}
                className="cursor-pointer bg-white rounded-lg p-4 flex flex-col items-center shadow-sm border border-gray-100 transition"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  rotate: 1,
                  boxShadow:
                    "0 12px 24px rgba(0,0,0,0.15), 0 0 12px rgba(139,92,246,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <Image
                  src="/file.png"
                  alt="PDF File"
                  width={60}
                  height={80}
                  className="mb-2"
                />
                <p className="text-sm font-medium text-gray-700 text-center line-clamp-2">
                  {file.fileName}
                </p>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12 text-gray-500 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Image
                src="/empty-folder.png"
                alt="No files"
                width={160}
                height={160}
                className="mb-4"
              />
              <p className="text-md">No files found. Please upload a PDF.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Dashboard;

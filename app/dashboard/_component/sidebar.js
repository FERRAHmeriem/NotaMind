"use client";
import React from "react";
import Image from "next/image";
import { Layout } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UplaodPdf from "./uplaodPdf";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

function Sidebar() {
  const { user } = useUser();
  const files = useQuery(api.pdfStorage.getUserFiles, {
    email: user?.primaryEmailAddress?.emailAddress,
  });
  const filesCount = files?.length ?? 0;

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="shadow-lg w-full h-screen flex flex-col items-center justify-between pt-6 pb-8 bg-gradient-to-b from-white via-gray-50 to-purple-50"
    >
      {/* Top Section */}
      <div className="space-y-16 flex flex-col items-center">
        {/* Logo with subtle animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/notamind_row.png"
            alt="logo"
            width={200}
            height={50}
            priority
            style={{ height: "auto" }}
          />
        </motion.div>

        {/* Upload + Nav */}
        <div className="flex flex-col items-center">
          <UplaodPdf count={filesCount} />
          <motion.div
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(229, 231, 235, 0.5)", // hover bg
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 px-3 py-2 rounded-md mt-4 cursor-pointer transition"
          >
            <Layout className="w-5 h-5 text-purple-600" />
            <p className="font-medium text-gray-700">Workplace</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Progress */}
      <div className="w-[85%]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(filesCount / 10) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Progress value={(filesCount / 10) * 100} />
        </motion.div>
        <p className="text-sm mt-2 text-center text-gray-600">
          {filesCount} out of 10 uploaded
        </p>
      </div>
    </motion.div>
  );
}

export default Sidebar;

"use client"
import { Button } from "@/components/ui/button";
import { UserButton , useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {api} from "@/convex/_generated/api";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  
  const createUser = useMutation(api.user.createUser);
  const handleCreateUser = async () => {
    if (user) {
     const result = await createUser({ userName: user.fullName ,  email: user.primaryEmailAddress?.emailAddress , imageUrl: user.imageUrl, });
      console.log(result);
      
    }
  };
  useEffect(()=>{
    user&&handleCreateUser();
  },[user])
  return (
    <div>
      hello 

      <Button>Subscribe</Button>
      <UserButton/>
    </div>
  );
}

'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => router.replace('/login'), [])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full">
      {/* Landing Page under construction
      <Link href='/login'>Go to login</Link> */}
    </main>
  );
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import useScroll from "@/lib/hooks/use-scroll"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ModeToggle } from "@/components/shared/mode-toggle"

export function SiteHeader() {
  const scrolled = useScroll(0)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur transition-all",
        scrolled && "bg-background/50 "
      )}
    >
      <div className="container flex h-20 sm:h-24 items-center justify-between">
        <div className="flex items-center">
          <MainNav />
          <MobileNav />
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "hidden sm:inline-flex text-lg px-4 py-2"
            )}
          >
            Dashboard
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block"
          >
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="h-10 w-10 sm:h-12 sm:w-12" />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

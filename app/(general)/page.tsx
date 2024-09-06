"use client"

import React, { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Spline from "@splinetool/react-spline"
import { motion } from "framer-motion"
import { FaDiscord, FaGithub } from "react-icons/fa"
import { LuBook } from "react-icons/lu"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { CopyButton } from "@/components/shared/copy-button"
import { SurveyList } from "@/components/SurveyList"

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="container relative mt-20 min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 px-0">
      <Head>
        <title>SurveyChain - Decentralized Surveys</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader className="pb-8">
        <Image
          src="/logo-gradient.png"
          alt="TurboETH Logo"
          width={80}
          height={80}
          className="h-20 w-20 rounded-2xl"
        />
        <PageHeaderHeading>SurveyChain</PageHeaderHeading>
        <PageHeaderDescription>
          Revolutionize Your Surveys with Blockchain
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants({ variant: "default" })}
          >
            <LuBook />
            Docs
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants({ variant: "secondary" })}
          >
            <FaGithub />
            Github
          </Link>
          <Link
            href={siteConfig.links.discord}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants(),
              "bg-[#7289da] text-white hover:bg-[#7289da]/80"
            )}
          >
            <FaDiscord />
            Discord
          </Link>
        </PageHeaderCTA>
      </PageHeader>

      <main className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white lg:w-1/2"
          >
            <h1 className="mb-6 text-5xl font-bold">
              Revolutionize Your Surveys with Blockchain
            </h1>
            <p className="mb-8 text-xl">
              Create, participate, and earn rewards in a decentralized survey
              ecosystem.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {["Create", "Participate", "Earn"].map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-8 text-center text-white opacity-10"
            >
              <h3 className="mb-4 text-2xl font-bold">{item}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                viverra justo eu nulla efficitur.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold text-white">
          Available Surveys
        </h1>
        <SurveyList />
      </div>

      <footer className="py-8 text-center text-white">
        <p>&copy; 2024 SurveyChain. All rights reserved.</p>
      </footer>
    </div>
  )
}

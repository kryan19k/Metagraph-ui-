"use client"

import Image from "next/image"
import Link from "next/link"
import { FaDiscord, FaGithub } from "react-icons/fa"
import { LuBook } from "react-icons/lu"
import React, { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

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

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="container relative mt-20 px-0 min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
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
        <PageHeaderDescription>Revolutionize Your Surveys with Blockchain</PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants({ variant: "default" })}
          >
            <LuBook  />
            Docs
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants({ variant: "secondary" })}
          >
            <FaGithub  />
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
            <FaDiscord  />
            Discord
          </Link>
        </PageHeaderCTA>
      </PageHeader>

      <main className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:w-1/2 text-white"
          >
            <h1 className="text-5xl font-bold mb-6">
              Revolutionize Your Surveys with Blockchain
            </h1>
            <p className="text-xl mb-8">
              Create, participate, and earn rewards in a decentralized survey ecosystem.
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
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {['Create', 'Participate', 'Earn'].map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-10 p-8 rounded-lg text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">{item}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra justo eu nulla efficitur.</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="text-center py-8 text-white">
        <p>&copy; 2024 SurveyChain. All rights reserved.</p>
      </footer>
    </div>
  )
}

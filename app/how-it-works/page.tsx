"use client"

import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>How It Works</PageHeaderHeading>
        <PageHeaderDescription>
          Understand the process of creating and participating in surveys on
          Survey Chain
        </PageHeaderDescription>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mockup-window bg-base-300 border mt-8"
      >
        <div className="bg-base-200 flex flex-col items-center px-4 py-16">
          <h2 className="text-2xl font-bold mb-4">Survey Chain Process</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong>Survey Creation:</strong> Users submit a transaction to
              create surveys with questions, rewards, and encryption keys.
            </li>
            <li>
              <strong>Survey Participation:</strong> Participants choose and
              respond to surveys, with responses encrypted for privacy.
            </li>
            <li>
              <strong>Reward Distribution:</strong> Automatic distribution of
              native tokens as rewards upon survey completion.
            </li>
            <li>
              <strong>Data Validation and Storage:</strong> Network validates
              and stores responses in a decentralized manner.
            </li>
            <li>
              <strong>Consensus and Security:</strong> Multi-layer consensus
              mechanism ensures integrity and scalability.
            </li>
          </ol>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="stats shadow mt-8"
      >
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Surveys</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Participants</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Completion Rate</div>
          <div className="stat-desc text-secondary">
            14% surveys in progress
          </div>
        </div>
      </motion.div>
    </>
  )
}

"use client"

import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"

export default function FAQPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Frequently Asked Questions</PageHeaderHeading>
        <PageHeaderDescription>
          Find answers to commonly asked questions about Survey Chain
        </PageHeaderDescription>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mockup-window bg-base-300 border mt-8"
      >
        <div className="bg-base-200 flex flex-col items-center px-4 py-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                How is Survey Chain different from traditional survey platforms?
              </h3>
              <p>
                Survey Chain is decentralized, provides automatic fair
                compensation, and ensures data privacy through encryption.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                How are survey rewards determined?
              </h3>
              <p>
                Survey creators set the total reward amount, which is
                distributed among participants based on network rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Is my survey data private?
              </h3>
              <p>
                Yes, all survey responses are encrypted. Only the survey creator
                can decrypt and view the responses.
              </p>
            </div>
          </div>
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
          <div className="stat-title">FAQ Views</div>
          <div className="stat-value text-primary">15.2K</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
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
          <div className="stat-title">New Users</div>
          <div className="stat-value text-secondary">1,200</div>
          <div className="stat-desc">↗︎ 90 (14%)</div>
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
          <div className="stat-value">95%</div>
          <div className="stat-title">Questions Answered</div>
          <div className="stat-desc text-secondary">
            5 new questions this week
          </div>
        </div>
      </motion.div>
    </>
  )
}

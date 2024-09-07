"use client"

import { motion } from "framer-motion"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"

export default function AboutPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>About Our Mission</PageHeaderHeading>
        <PageHeaderDescription>
          Learn about our mission to transform surveys with blockchain
        </PageHeaderDescription>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mockup-window bg-base-300 border mt-8"
      >
        <div className="bg-base-200 flex flex-col items-center px-4 py-16">
          <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
          <p className="text-center max-w-2xl mb-8">
            At Survey Chain, we&apos;re revolutionizing surveys with blockchain
            technology, creating a more transparent, fair, and engaging survey
            ecosystem.
          </p>

          <h3 className="text-xl font-semibold mb-4">Our Goals</h3>
          <ul className="list-none space-y-4">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Empower individuals to create and participate in surveys without
              intermediaries.
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Ensure fair compensation for survey participants.
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Provide businesses and researchers with high-quality, reliable
              data.
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Foster a community-driven approach to data collection and sharing.
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 text-center"
      >
        <a href="#" className="btn btn-primary">
          Learn More About Blockchain
        </a>
      </motion.div>
    </>
  )
}

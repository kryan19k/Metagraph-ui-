"use client"

import { motion } from "framer-motion"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Get Involved</PageHeaderHeading>
        <PageHeaderDescription>
          Discover ways to contribute to the Survey Chain ecosystem
        </PageHeaderDescription>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mockup-window bg-base-300 border mt-8"
      >
        <div className="bg-base-200 flex flex-col items-center px-4 py-16">
          <h2 className="text-2xl font-bold mb-6">Ways to Participate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h3 className="card-title">Participate in Surveys</h3>
                <p>
                  Start earning rewards by responding to surveys on the network.
                </p>
              </div>
            </div>
            <div className="card bg-secondary text-secondary-content">
              <div className="card-body">
                <h3 className="card-title">Create Surveys</h3>
                <p>
                  If you&apos;re a researcher or business, create surveys to
                  gather valuable data.
                </p>
              </div>
            </div>
            <div className="card bg-accent text-accent-content">
              <div className="card-body">
                <h3 className="card-title">Run a Node</h3>
                <p>Help secure the network by running a Survey Chain node.</p>
              </div>
            </div>
            <div className="card bg-neutral text-neutral-content">
              <div className="card-body">
                <h3 className="card-title">Contribute to Development</h3>
                <p>
                  If you&apos;re a developer, check out our GitHub repository
                  and contribute to the codebase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 text-center"
      >
        <a href="#" className="btn btn-primary">
          Join Our Community
        </a>
      </motion.div>
    </>
  )
}

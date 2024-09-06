"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"
import { MdCreate, MdPieChart, MdTimeline, MdTrendingUp } from "react-icons/md"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { menuAdmin } from "@/config/menu-admin"
import { menuDashboard } from "@/config/menu-dashboard"
import { siteConfig } from "@/config/site"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { SiteHeader } from "@/components/layout/site-header"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 justify-between overflow-y-auto border-r md:sticky md:flex md:flex-col">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <h3 className="text-lg font-normal">User</h3>
            <SidebarNav items={menuDashboard} />
            <hr className="my-6 border-t border-muted" />
            <h3 className="text-lg font-normal">Admin</h3>
            <SidebarNav items={menuAdmin} />
          </ScrollArea>
          <footer className="fixed bottom-6 flex flex-col border-t pr-2 pt-4">
            <h3 className="text-sm font-semibold">{siteConfig.title}</h3>
            <a
              href="https://www.givesentiment.com/"
              target="_blank"
              rel="noreferrer"
              className="w-fit py-2 text-xs text-primary underline-offset-4 hover:underline"
            >
              Built by Give Sentiment
            </a>
            <div className="mt-2 flex items-center space-x-2">
              <Link href={siteConfig.links.github}>
                <FaGithub />
              </Link>
              <Link href={siteConfig.links.twitter}>
                <FaTwitter />
              </Link>
              <Link href={siteConfig.links.discord}>
                <FaDiscord />
              </Link>
            </div>
          </footer>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <PageDashboard />
        </main>
      </div>
      <div className="fixed bottom-6 right-6">
        <WalletConnect />
      </div>
    </div>
  )
}

function PageDashboard() {
  return (
    <motion.div
      animate="show"
      className="flex h-full w-full flex-col items-center justify-start py-6 lg:py-8"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold lg:text-4xl">
              <span className="bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent dark:from-indigo-100 dark:to-purple-200">
                Welcome back, <WalletEnsName />
              </span>
            </h3>
            <span className="font-light">
              <WalletAddress className="mt-2 block text-xl font-light" />
              <div className="mt-2">
                <span className="text-2xl font-light">
                  Balance: <WalletBalance decimals={7} /> ETH
                </span>
              </div>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SurveyStatistics />
            <RecentSurveys />
          </div>

          <div className="mt-8">
            <h4 className="mb-4 text-xl font-semibold">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <QuickActionCard
                icon={<MdCreate className="h-6 w-6" />}
                title="Create Survey"
                link="/create-survey"
              />
              <QuickActionCard
                icon={<MdPieChart className="h-6 w-6" />}
                title="View Results"
                link="/survey-results"
              />
              <QuickActionCard
                icon={<MdTimeline className="h-6 w-6" />}
                title="Response Timeline"
                link="/response-timeline"
              />
              <QuickActionCard
                icon={<MdTrendingUp className="h-6 w-6" />}
                title="Engagement Metrics"
                link="/engagement-metrics"
              />
            </div>
          </div>

          <div className="mt-8">
            <h4 className="mb-4 text-xl font-semibold">Recent Activity</h4>
            <RecentActivity />
          </div>
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">
          Connect Wallet to view your personalized survey dashboard.
        </h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}

function SurveyStatistics() {
  // Mock data - replace with actual data fetching logic
  const stats = [
    { label: "Total Surveys", value: 15 },
    { label: "Active Surveys", value: 5 },
    { label: "Total Responses", value: 1250 },
    { label: "Avg. Completion Rate", value: "78%" },
  ]

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Survey Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="stat-value text-primary">{stat.value}</div>
              <div className="stat-desc">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RecentSurveys() {
  // Mock data - replace with actual data fetching logic
  const surveys = [
    { id: 1, title: "Customer Satisfaction Q2", responses: 120 },
    { id: 2, title: "Employee Engagement 2023", responses: 85 },
    { id: 3, title: "Product Feedback: New UI", responses: 230 },
  ]

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Recent Surveys</h2>
        <ul className="menu rounded-box bg-base-200">
          {surveys.map((survey) => (
            <li key={survey.id}>
              <a href={`/survey/${survey.id}`}>
                <span>{survey.title}</span>
                <span className="badge badge-sm">
                  {survey.responses} responses
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function QuickActionCard({
  icon,
  title,
  link,
}: {
  icon: React.ReactNode
  title: string
  link: string
}) {
  return (
    <Link href={link}>
      <div className="card bg-base-100 shadow-xl transition-colors hover:bg-base-200">
        <div className="card-body items-center text-center">
          {icon}
          <h2 className="card-title">{title}</h2>
        </div>
      </div>
    </Link>
  )
}

function RecentActivity() {
  // Mock data - replace with actual data fetching logic
  const activities = [
    {
      id: 1,
      action: "Survey Created",
      survey: "Product Feedback: New UI",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      action: "Response Received",
      survey: "Customer Satisfaction Q2",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      action: "Survey Closed",
      survey: "Employee Engagement 2023",
      timestamp: "1 day ago",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Action</th>
            <th>Survey</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.action}</td>
              <td>{activity.survey}</td>
              <td>{activity.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

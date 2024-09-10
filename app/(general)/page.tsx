"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaChartBar, FaCoins, FaUsers } from "react-icons/fa"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { SurveyList } from "@/components/SurveyList"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundAnimation />
      <main className="grow">
        <HeroSection />
        <FeaturesSection />
        <TechnologySection /> {/* Add this new section */}
        <HowItWorksSection />
        <FeaturedSurveysSection />
        <TestimonialsSection />
      </main>
    </div>
  )
}

function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-indigo-800/20 to-blue-900/20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 20,
        }}
      />
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.25,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="mb-10 lg:mb-0 lg:w-1/2">
            <motion.h1
              className="mb-6 text-4xl font-bold lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Revolutionize Your Surveys with Blockchain
            </motion.h1>
            <motion.p
              className="mb-8 text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create, participate, and earn rewards in a decentralized survey
              ecosystem.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/surveyCreation"
                className={cn(buttonVariants({ size: "lg" }), "mr-4")}
              >
                Create Survey
              </Link>
              <Link
                href="/SurveyParticipation"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                Explore Surveys
              </Link>
              <Link
                href="/metagraph"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                Metagraph
              </Link>
            </motion.div>
          </div>
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="artboard artboard-horizontal max-h-full overflow-hidden h-full"
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: <FaChartBar className="mb-4 h-12 w-12 text-primary" />,
      title: "Create",
      description:
        "Design and launch your surveys with ease. Set rewards and target your desired audience.",
    },
    {
      icon: <FaUsers className="mb-4 h-12 w-12 text-primary" />,
      title: "Participate",
      description:
        "Join surveys that match your profile. Provide valuable insights and earn rewards.",
    },
    {
      icon: <FaCoins className="mb-4 h-12 w-12 text-primary" />,
      title: "Earn",
      description:
        "Get rewarded for your contributions. Earn tokens for completing surveys and referring friends.",
    },
  ]

  return (
    <section className="bg-base-200 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose SurveyChain?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="card bg-base-100 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card-body items-center text-center">
                {feature.icon}
                <h3 className="card-title">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Add this new section
function TechnologySection() {
  return (
    <section className="bg-base-100 py-20">
      <div className="container mx-auto px-4">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-4">
              Powered by Constellation Network&apos;s Metagraph
            </h2>
            <p className="mb-4">
              SurveyChain leverages the power of Constellation Network&apos;s
              Metagraph technology to ensure:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Decentralized and secure survey data storage</li>
              <li>Transparent and immutable survey results</li>
              <li>Scalable infrastructure for handling large-scale surveys</li>
              <li>Enhanced data integrity and reliability</li>
            </ul>
            <p>
              By utilizing Constellation&apos;s Metagraph, we provide a
              cutting-edge platform that revolutionizes the way surveys are
              conducted and analyzed.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    { title: "Register", description: "Create your account on SurveyChain" },
    {
      title: "Create or Join",
      description: "Design your own surveys or participate in existing ones",
    },
    {
      title: "Complete Surveys",
      description: "Provide valuable insights and data",
    },
    {
      title: "Earn Rewards",
      description: "Get compensated for your contributions",
    },
  ]

  return (
    <section className="bg-base-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <ul className="steps steps-vertical w-full lg:steps-horizontal">
          {steps.map((step, index) => (
            <li key={step.title} className="step step-primary">
              <div className="text-center">
                <div className="text-lg font-semibold">{step.title}</div>
                <div className="text-sm">{step.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FeaturedSurveysSection() {
  return (
    <section className="bg-base-200 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Featured Surveys
        </h2>
        <SurveyList />
        <div className="mt-8 text-center">
          <Link
            href="/surveyParticipation"
            className={buttonVariants({ size: "lg" })}
          >
            View All Surveys
          </Link>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Market Researcher",
      quote:
        "SurveyChain has revolutionized how we conduct market research. The quality of responses has improved significantly.",
      avatar: "/avatars/alice.jpg",
    },
    {
      name: "Bob Smith",
      role: "Survey Participant",
      quote:
        "I love participating in surveys on SurveyChain. The rewards are fair, and I feel my opinions are valued.",
      avatar: "/avatars/bob.jpg",
    },
    {
      name: "Carol Davis",
      role: "Data Analyst",
      quote:
        "The data we get from SurveyChain surveys is more reliable. The blockchain aspect adds a layer of trust to the process.",
      avatar: "/avatars/carol.jpg",
    },
  ]

  return (
    <section className="bg-base-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="card bg-base-200 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card-body">
                <div className="mb-4 flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-base-content/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="italic">{testimonial.quote}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

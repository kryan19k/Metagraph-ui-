"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { LightDarkImage } from "@/components/shared/light-dark-image"

import { LinkComponent } from "../shared/link-component"

export function MainNav() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <LightDarkImage
            LightImage="/SC.png"
            DarkImage="/SC.png"
            alt="SurveyChain"
            className="rounded-full"
            height={32}
            width={32}
          />
          <span className="hidden bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-purple-500 sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-base font-medium">
          <MainNavMenu />
        </nav>
      </div>
    </div>
  )
}

function MainNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Surveys</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-purple-600 p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <LightDarkImage
                      LightImage="/SC.png"
                      DarkImage="/SC.png"
                      alt="SurveyChain"
                      className="h-16 w-16 rounded-full"
                      height={64}
                      width={64}
                    />
                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                      SurveyChain
                    </div>
                    <p className="text-sm leading-tight text-white/90">
                      Decentralized surveys powered by blockchain technology
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/surveyCreation" title="Create Survey">
                Start a new survey and reach your audience
              </ListItem>
              <ListItem href="/my-surveys" title="My Surveys">
                Manage and analyze your existing surveys
              </ListItem>
              <ListItem href="/SurveyParticipation" title="Explore">
                Discover and participate in public surveys
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/about" title="About Our Mission">
                Learn about our mission to transform surveys with blockchain
              </ListItem>
              <ListItem href="/how-it-works" title="How It Works">
                Understand the process of creating and participating in surveys
              </ListItem>
              <ListItem href="/faq" title="FAQ">
                Find answers to commonly asked questions about Survey Chain
              </ListItem>
              <ListItem href="/get-involved" title="Get Involved">
                Discover ways to contribute to the Survey Chain ecosystem
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LinkComponent href="https://docs.surveychain.xyz">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span>Documentation</span>
            </NavigationMenuLink>
          </LinkComponent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

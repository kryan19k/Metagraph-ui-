"use client"

import { useTheme } from "next-themes"
import {
  FaCircleNodes,
  FaCode,
  FaCube,
  FaMicrochip,
  FaNetworkWired,
} from "react-icons/fa6"
import { LuLaptop, LuMoon, LuSun } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const themes = [
    { value: "light", label: "Light", icon: LuSun },
    { value: "dark", label: "Dark", icon: LuMoon },
    { value: "system", label: "System", icon: LuLaptop },
    { value: "cyberpunk", label: "Cyberpunk", icon: FaCube },
    { value: "synthwave", label: "Synthwave", icon: FaCircleNodes },
    { value: "night", label: "Night", icon: FaNetworkWired },
    { value: "corporate", label: "Corporate", icon: FaMicrochip },
    { value: "wireframe", label: "Wireframe", icon: FaCode },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <LuSun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((t) => (
          <div key={t.value} className="form-control">
            <label className="label cursor-pointer gap-4">
              <span className="label-text flex items-center">
                {t.icon && <t.icon className="mr-2 h-4 w-4" />}
                {t.label}
              </span>
              <input
                type="radio"
                name="theme-radios"
                className="theme-controller radio"
                value={t.value}
                checked={theme === t.value}
                onChange={() => setTheme(t.value)}
              />
            </label>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

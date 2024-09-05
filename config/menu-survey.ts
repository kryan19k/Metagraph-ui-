import { SidebarNavProps } from "@/components/layout/sidebar-nav"

export const menuSurvey: SidebarNavProps["items"] = [
  {
    label: "Create Survey",
    href: "/surveyCreation/create",
  },
  {
    label: "My Surveys",
    href: "/surveyCreation/list",
  },
  {
    label: "Survey Templates",
    href: "/surveyCreation/templates",
  },
  // Add more survey-related menu items as needed
]
import { SidebarNavProps } from "@/components/layout/sidebar-nav"

export const menuSurvey: SidebarNavProps["items"] = [
  {
    label: "Create Survey",
    href: "/surveyCreation/",
  },
  {
    label: "My Surveys",
    href: "/surveys",
  },
  {
    label: "Survey Participation",
    href: "/SurveyParticipation",
  },
  // Add more survey-related menu items as needed
]
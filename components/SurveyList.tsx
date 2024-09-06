"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { mockDataStore, Survey } from "@/app/mockDataStore"

export function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        console.log("Fetching surveys...")
        setLoading(true)
        const response = await fetch("/api/surveys")
        console.log("Response status:", response.status)
        if (!response.ok) throw new Error("Failed to fetch surveys")
        const data = await response.json()
        console.log("Surveys data received:", JSON.stringify(data, null, 2))
        setSurveys(data)
      } catch (error) {
        console.error("Error fetching surveys:", error)
        setError(error instanceof Error ? error.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    void fetchSurveys()
  }, [])

  console.log(
    "Rendering SurveyList, surveys:",
    JSON.stringify(surveys, null, 2)
  )
  console.log("Loading:", loading)
  console.log("Error:", error)

  if (loading) {
    return <div>Loading surveys...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (surveys.length === 0) {
    return <div>No surveys found</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {surveys.map((survey) => (
        <div key={survey.id} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{survey.title}</h2>
            <p>{survey.description}</p>
            <div className="card-actions justify-end">
              <Link
                href={`/SurveyParticipation/${survey.id}`}
                className="btn btn-primary"
              >
                Participate
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

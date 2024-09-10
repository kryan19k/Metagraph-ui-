"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { Survey } from "@/app/mockDataStore"

export function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/surveys")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setSurveys(data)
      } catch (error) {
        console.error("Error fetching surveys:", error)
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while fetching surveys"
        )
      } finally {
        setLoading(false)
      }
    }

    void fetchSurveys()
  }, [])

  if (loading) {
    return <div aria-live="polite">Loading surveys...</div>
  }

  if (error) {
    return <div aria-live="assertive">Error: {error}</div>
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
                aria-label={`Participate in survey: ${survey.title}`}
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

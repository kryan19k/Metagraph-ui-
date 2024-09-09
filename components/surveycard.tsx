import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FiAward,
  FiBarChart2,
  FiClock,
  FiEdit,
  FiEye,
  FiUsers,
} from "react-icons/fi"

interface SurveyCardProps {
  survey: {
    id: string
    title: string
    description: string
    tokenReward: string
    endTime: string
    maxResponses: string
    minimumResponseTime: string
    tags: string[]
    totalParticipants: number
    averageCompletionTime: number
  }
  isCreator: boolean
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, isCreator }) => {
  return (
    <motion.div
      className="card bg-base-100 shadow-xl"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="card-body">
        <h2 className="card-title text-primary">{survey.title}</h2>
        <p className="text-sm text-base-content opacity-70">
          {survey.description}
        </p>

        <div className="flex flex-wrap gap-2 my-2">
          {survey.tags.map((tag, index) => (
            <span key={index} className="badge badge-secondary badge-outline">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm my-2">
          <div className="flex items-center">
            <FiAward className="mr-2 text-warning" />
            <span>{survey.tokenReward} DAG</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2 text-info" />
            <span>{new Date(survey.endTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <FiUsers className="mr-2 text-success" />
            <span>{survey.maxResponses} max</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2 text-error" />
            <span>{survey.minimumResponseTime}s min</span>
          </div>
        </div>

        <div className="flex justify-between text-sm text-base-content opacity-70 mt-2">
          <span>Participants: {survey.totalParticipants}</span>
          <span>Avg Time: {survey.averageCompletionTime.toFixed(2)}min</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            href={`/surveys/${survey.id}`}
            className="btn btn-primary btn-sm"
          >
            <FiEye className="mr-2" /> View
          </Link>
          {isCreator && (
            <>
              <Link
                href={`/surveys/edit/${survey.id}`}
                className="btn btn-secondary btn-sm"
              >
                <FiEdit className="mr-2" /> Edit
              </Link>
              <Link
                href={`/surveys/stats/${survey.id}`}
                className="btn btn-accent btn-sm"
              >
                <FiBarChart2 className="mr-2" /> Stats
              </Link>
            </>
          )}
          {!isCreator && (
            <Link
              href={`/SurveyParticipation/${survey.id}`}
              className="btn btn-secondary btn-sm"
            >
              Participate
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SurveyCard

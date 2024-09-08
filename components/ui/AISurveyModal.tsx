"use client"

import React, { useState } from "react"
import { FaMagic } from "react-icons/fa"

interface AISurveyModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (prompt: string, options: AISurveyOptions) => void
}

interface AISurveyOptions {
  questionCount: number
  includeScaleQuestions: boolean
  includeMultipleChoice: boolean
}

export function AISurveyModal({
  isOpen,
  onClose,
  onGenerate,
}: AISurveyModalProps) {
  const [prompt, setPrompt] = useState("")
  const [options, setOptions] = useState<AISurveyOptions>({
    questionCount: 3,
    includeScaleQuestions: true,
    includeMultipleChoice: true,
  })

  const handleGenerate = () => {
    onGenerate(prompt, options)
    onClose()
  }

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Generate AI Survey</h3>
        <div className="py-4">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Describe the survey you want to create..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Number of questions</span>
              <input
                type="number"
                className="input input-bordered w-20"
                value={options.questionCount}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    questionCount: parseInt(e.target.value),
                  })
                }
                min={1}
                max={10}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Include scale questions</span>
              <input
                type="checkbox"
                className="toggle"
                checked={options.includeScaleQuestions}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeScaleQuestions: e.target.checked,
                  })
                }
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                Include multiple choice questions
              </span>
              <input
                type="checkbox"
                className="toggle"
                checked={options.includeMultipleChoice}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeMultipleChoice: e.target.checked,
                  })
                }
              />
            </label>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleGenerate}>
            <FaMagic className="mr-2 h-5 w-5" />
            Generate
          </button>
        </div>
      </div>
    </dialog>
  )
}

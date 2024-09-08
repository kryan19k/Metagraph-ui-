export const surveyAbi = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "surveyId",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "respondent",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "reward",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "responseTime",
              "type": "uint256"
          }
      ],
      "name": "ResponseSubmitted",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
          }
      ],
      "name": "RewardWithdrawn",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "surveyId",
              "type": "uint256"
          }
      ],
      "name": "SurveyCancelled",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "surveyId",
              "type": "uint256"
          }
      ],
      "name": "SurveyCompleted",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "surveyId",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "bytes32",
              "name": "dataHash",
              "type": "bytes32"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "imageUri",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "enum SurveyContract.RewardType",
              "name": "rewardType",
              "type": "uint8"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "rewardToken",
              "type": "address"
          }
      ],
      "name": "SurveyCreated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "surveyId",
              "type": "uint256"
          }
      ],
      "name": "SurveyUpdated",
      "type": "event"
  },
  {
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "inputs": [],
      "name": "MAX_TAGS",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_surveyId",
              "type": "uint256"
          }
      ],
      "name": "cancelSurvey",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_surveyId",
              "type": "uint256"
          }
      ],
      "name": "completeSurvey",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes32",
              "name": "_dataHash",
              "type": "bytes32"
          },
          {
              "internalType": "uint256",
              "name": "_rewardAmount",
              "type": "uint256"
          },
          {
              "internalType": "enum SurveyContract.RewardType",
              "name": "_rewardType",
              "type": "uint8"
          },
          {
              "internalType": "address",
              "name": "_rewardToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_endTime",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "_imageUri",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "_maxResponses",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_minimumResponseTime",
              "type": "uint256"
          },
          {
              "internalType": "string[]",
              "name": "_tags",
              "type": "string[]"
          }
      ],
      "name": "createSurvey",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getActiveSurveys",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getContractBalance",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_surveyId",
              "type": "uint256"
          }
      ],
      "name": "getSurveyDetails",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "creator",
                      "type": "address"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "dataHash",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "uint256",
                      "name": "rewardAmount",
                      "type": "uint256"
                  },
                  {
                      "internalType": "enum SurveyContract.RewardType",
                      "name": "rewardType",
                      "type": "uint8"
                  },
                  {
                      "internalType": "address",
                      "name": "rewardToken",
                      "type": "address"
                  }
              ],
              "internalType": "struct SurveyContract.SurveyBasicInfo",
              "name": "basicInfo",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "createdAt",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "endTime",
                      "type": "uint256"
                  },
                  {
                      "internalType": "enum SurveyContract.SurveyStatus",
                      "name": "status",
                      "type": "uint8"
                  }
              ],
              "internalType": "struct SurveyContract.SurveyTimeInfo",
              "name": "timeInfo",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "maxResponses",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "currentResponses",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "minimumResponseTime",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct SurveyContract.SurveyResponseInfo",
              "name": "responseInfo",
              "type": "tuple"
          },
          {
              "internalType": "string",
              "name": "imageUri",
              "type": "string"
          },
          {
              "internalType": "string[]",
              "name": "tags",
              "type": "string[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_surveyId",
              "type": "uint256"
          }
      ],
      "name": "getSurveyStatistics",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "totalResponses",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "totalRewardsDistributed",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "averageResponseTime",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "quickestResponseTime",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "slowestResponseTime",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct SurveyContract.SurveyStatistics",
              "name": "",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_tag",
              "type": "string"
          }
      ],
      "name": "getTaggedSurveys",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_tokenAddress",
              "type": "address"
          }
      ],
      "name": "getTokenBalance",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_user",
              "type": "address"
          }
      ],
      "name": "getUserResponses",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_user",
              "type": "address"
          }
      ],
      "name": "getUserRewards",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "nativeReward",
              "type": "uint256"
          },
          {
              "internalType": "address[]",
              "name": "tokenAddresses",
              "type": "address[]"
          },
          {
              "internalType": "uint256[]",
              "name": "tokenAmounts",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_user",
              "type": "address"
          }
      ],
      "name": "getUserSurveys",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_newFee",
              "type": "uint256"
          }
      ],
      "name": "setSurveyCreationFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_surveyId",
              "type": "uint256"
          },
          {
              "internalType": "bytes",
              "name": "_encryptedAnswer",
              "type": "bytes"
          }
      ],
      "name": "submitResponse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "surveyCreationFee",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "surveyResponses",
      "outputs": [
          {
              "internalType": "address",
              "name": "respondent",
              "type": "address"
          },
          {
              "internalType": "bytes",
              "name": "encryptedAnswer",
              "type": "bytes"
          },
          {
              "internalType": "uint256",
              "name": "earnedReward",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "submittedAt",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "responseTime",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "surveys",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "creator",
                      "type": "address"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "dataHash",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "uint256",
                      "name": "rewardAmount",
                      "type": "uint256"
                  },
                  {
                      "internalType": "enum SurveyContract.RewardType",
                      "name": "rewardType",
                      "type": "uint8"
                  },
                  {
                      "internalType": "address",
                      "name": "rewardToken",
                      "type": "address"
                  }
              ],
              "internalType": "struct SurveyContract.SurveyBasicInfo",
              "name": "basicInfo",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "createdAt",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "endTime",
                      "type": "uint256"
                  },
                  {
                      "internalType": "enum SurveyContract.SurveyStatus",
                      "name": "status",
                      "type": "uint8"
                  }
              ],
              "internalType": "struct SurveyContract.SurveyTimeInfo",
              "name": "timeInfo",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "maxResponses",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "currentResponses",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "minimumResponseTime",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct SurveyContract.SurveyResponseInfo",
              "name": "responseInfo",
              "type": "tuple"
          },
          {
              "internalType": "string",
              "name": "imageUri",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "taggedSurveys",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalNativeRewardsDistributed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalResponses",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalSurveys",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "totalTokenRewardsDistributed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_surveyId",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_newEndTime",
              "type": "uint256"
          }
      ],
      "name": "updateSurveyEndTime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "userResponses",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "userRewards",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "nativeReward",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "userSurveys",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "withdrawFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_tokenAddress",
              "type": "address"
          }
      ],
      "name": "withdrawReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "stateMutability": "payable",
      "type": "receive"
  }
] as const
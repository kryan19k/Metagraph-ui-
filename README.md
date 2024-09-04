# SurveyChain - Decentralized Survey Platform

SurveyChain is a Web3 app built on the Constellation Network, leveraging decentralized technology to create, manage, and participate in surveys with enhanced privacy, security, and incentivization.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Creating a Survey](#creating-a-survey)
  - [Participating in a Survey](#participating-in-a-survey)
  - [Retrieving Survey Responses](#retrieving-survey-responses)
- [Core Technologies](#core-technologies)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Overview

SurveyChain revolutionizes the way surveys are conducted by leveraging blockchain technology. It offers a decentralized platform where survey data is not controlled by a single entity but distributed across the Constellation Network, ensuring data integrity, participant privacy, and built-in incentivization through token rewards.

## Key Features

- Decentralized survey creation and management
- End-to-end encryption for survey responses
- Token rewards for survey participation
- Immutable and tamper-proof survey data
- Integration with Constellation Network's Metagraph architecture

## Architecture

SurveyChain utilizes a two-layer architecture within the Constellation Network:

1. **Layer 1 (Data L1)**: 
   - Handles incoming survey data
   - Performs initial validations
   - Packages data into blocks
   - Runs DAG-based consensus

2. **Layer 0 (Metagraph L0)**:
   - Receives blocks from L1
   - Performs final validation and consensus
   - Creates snapshots of the survey system state
   - Submits snapshots to the Global L0

This architecture ensures scalability, security, and decentralization while maintaining privacy and functionality.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/surveychain.git
   cd surveychain
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_METAGRAPH_ID=your-metagraph-id
ENCRYPT_KEY=your-encryption-key
```

## Usage

### Creating a Survey

1. Connect your wallet
2. Navigate to the "Create Survey" page
3. Fill in survey details and set token reward
4. Submit the survey to the network

### Participating in a Survey

1. Connect your wallet
2. Browse available surveys
3. Select a survey and answer questions
4. Submit responses to receive token reward

### Retrieving Survey Responses

1. Connect your wallet
2. Navigate to "My Surveys"
3. Select a survey to view encrypted responses
4. Decrypt responses using your private key

## Core Technologies

- **Constellation Network**: The underlying blockchain platform
- **Next.js**: React framework for building the web application
- **RainbowKit**: Wallet connection manager
- **Sign-In With Ethereum**: Account authentication
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Prisma**: Database ORM for storing off-chain data

## Development

To start the development server:

```
pnpm dev
```

To build the application:

```
pnpm build
```

## Contributing

We welcome contributions to SurveyChain! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

SurveyChain is released under the [MIT License](LICENSE).
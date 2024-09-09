/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const surveysCount = await prisma.survey.count()
    console.log(`Connected successfully. Number of surveys: ${surveysCount}`)
  } catch (error) {
    console.error('Failed to connect:', error)
  } finally {
    await prisma.$disconnect()
  }
}

void main()
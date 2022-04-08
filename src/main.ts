import * as core from '@actions/core'
//import {wait} from './wait'

// I added the export to the function to get rid of some of the tests
export async function run(): Promise<void> {
  try {
    core.setOutput('release-url', 'https://example.com')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}


run()

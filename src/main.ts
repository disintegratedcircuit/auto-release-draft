import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'
import * as github from './github'
import { GitHub } from '@actions/github/lib/utils'
//import {wait} from './wait'

// I added the export to the function to get rid of some of the tests
export async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token')

    const tag = event.getCreatedTag()
    var releaseUrl = ''

    if (tag && version.isSemVer(tag)) { // null check on the tag object first, short-circuit operator
      const changelog = await git.getChangesIntroducedByTag(tag)

      releaseUrl = await github.createReleaseDraft(tag, token, changelog)
    }

    core.setOutput('release-url', releaseUrl)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

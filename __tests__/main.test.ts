import * as core from '@actions/core'
import { run } from '../src/main'
import {jest} from '@jest/globals'

// npm i --save-dev @types/jest to get the describe/expect etc
jest.mock('@actions/core')


describe('When running the action', () => {
  const fakeSetOutput = core.setOutput as jest.MockedFunction<typeof core.setOutput>

  test('it should set teh release-url output parameter', async () => {
    await run()
    expect(fakeSetOutput).toHaveBeenCalledWith('release-url', expect.anything())
  })
})
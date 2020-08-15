const fs = require('fs')
const path = require('path')
const { test } = require('zora')
const eslint = require('eslint')

const lint = code =>
  new eslint.CLIEngine({ configFile: require.resolve('./index.js') }).executeOnText(code)

const fixturesDir = path.join(__dirname, 'fixtures')

const formatResults = results => JSON.stringify(results.flatMap(({ messages }) => messages.map(({ ruleId, message }) => ({ ruleId, message }))))

test('eslint config', async t =>
  Promise.all([
    { group: 'success', assert: (t, { errorCount, results }) =>
      t.equal(
        { errorCount },
        { errorCount: 0 },
        formatResults(results)
      )
    },
    { group: 'warnings', assert: (t, result) => t.fail(result) },
    { group: 'errors', assert: (t, { errorCount, results }) =>
      t.notEqual(
        { errorCount },
        { errorCount: 0 },
        formatResults(results)
      )
    }
  ]
    .map(async ({ group, assert }) =>
      t.test(group, async t =>
        Promise.all(
          (await fs.promises.readdir(path.join(fixturesDir, group)))
            .map(async fileName => {
              const contents = await fs.promises.readFile(path.join(fixturesDir, group, fileName), 'utf8')
              await t.test(fileName, t => assert(t, lint(contents)))
            })
        )
      )
    )
  )
)

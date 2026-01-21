import { spawn } from 'node:child_process'

const processes = []

function run(command, args, name) {
  const child = spawn(command, args, { stdio: 'inherit', shell: true })
  processes.push(child)
  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${name} exited with code ${code}`)
    }
    shutdown()
  })
}

function shutdown() {
  for (const child of processes) {
    if (!child.killed) {
      child.kill('SIGTERM')
    }
  }
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

run('npm', ['run', 'dev:client'], 'vite')
run('npm', ['run', 'dev:pdf'], 'pdf-server')

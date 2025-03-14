import { exec } from 'child_process';

// The shell command you want to trun
let command = 'ls -la';

// Function that executes the command
function execFunc() {
  console.log('<pre>');
  return new Promise((resolve, _reject) => {
    let process = exec(command);
    process.stdout.on('data', data => console.log('stdout:', data));
    process.stderr.on('data', data => console.log('stderror:', data));
    process.on('close', () => {
      console.log('</pre>'); resolve();
    });
  });
}

await execFunc();

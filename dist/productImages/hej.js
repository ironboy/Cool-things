import { exec } from 'child_process';

// The shell command you want to to run
let command = 'dir ..';

// Function that executes the command
function execFunc() {
  console.log('<pre>');
  return new Promise((resolve, _reject) => {
    let process = exec(command);
    process.stdout.on('data', data => console.log('stdout:', fix(data)));
    process.stderr.on('data', data => console.log('stderror:', fix(data)));
    process.on('close', () => {
      console.log('</pre>'); resolve();
    });
  });
}

await execFunc();

// function to replace < and > with &lt; and &gt; + strange space char to normal
function fix(str){
  return str.replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('�',' ');
}

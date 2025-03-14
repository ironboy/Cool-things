import { exec } from 'child_process';



// The shell command you want to to run

// check which os
// possible values 'aix', 'darwin', 'freebsd', 'linux',
// 'openbsd', 'sunos', 'win32' (for all windows variants)
let os = process.platform;

// Decide on a command to run
// Note: The command will be run in the bash shell onn Linux, Darwin etc
// but in Windows will be run by CMD (not PowerShell!)
let command;
if (os === 'win32') {
  command = 'dir ..';
}
else {
  command = 'ls -la ..'
}



// YOU DON'T NEED TO CHANGGE THE CODE BELOW!

// Function that executes the command
function execFunc() {
  console.log('<pre>');
  console.log('OS ON THE SERVER:', os, '\n');
  console.log('COMMAND:', command, '\n\n');
  return new Promise((resolve, _reject) => {
    let process = exec(command);
    process.stdout.on('data', data => console.log(fix(data)));
    process.stderr.on('data', data => console.log('ERROR:', fix(data)));
    process.on('close', () => {
      console.log('</pre>'); resolve();
    });
  });
}

await execFunc();

// function to replace < and > with &lt; and &gt; + strange space char to normal
function fix(str) {
  return str.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('�', ' ');
}

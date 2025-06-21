// server.js
const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post('/make-video', (req, res) => {
  const { input_url } = req.body;
  const args = ['--input', input_url, '--output', 'out.mp4'];
  const proc = spawn('short-video-maker', args);

  proc.stdout.on('data', d => console.log(d.toString()));
  proc.stderr.on('data', d => console.error(d.toString()));

  proc.on('close', code => {
    if (code === 0) res.json({ success: true, download: '/out.mp4' });
    else res.status(500).json({ success: false, code });
  });
});

// Serve the output file
const path = require('path');
app.use('/', express.static(path.join(__dirname)));

app.listen(port, () => console.log(`API listening on port ${port}`));
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GIST_ID = process.env.GIST_ID;

app.use(bodyParser.text({ type: '*/*' }));

app.post('/update', async (req, res) => {
  const content = req.body;

  try {
    await axios.patch(`https://api.github.com/gists/${GIST_ID}`, {
      files: {
        "seazn-daily-brief.html": { content },
      },
      description: "Seazn Daily Brief"
    }, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    res.send('✅ Gist updated successfully.');
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send('❌ Failed to update gist.');
  }
});

app.get('/', (req, res) => {
  res.send('Webhook running.');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

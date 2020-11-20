const { createWriteStream, readFileSync } = require('fs');
const { get } = require('follow-redirects').https;
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

const sources = readFileSync('./sources', 'utf8').split('\n');

for (let i = 0; i < sources.length; i++) {
  const [owner, repo] = sources[i].split('/');

  octokit.repos
    .getLatestRelease({
      owner,
      repo,
    })
    .then(response => {
      for (let j = 0; j < response.data.assets.length; j++) {
        if (response.data.assets[j].name.match(/.+\.deb$/)) {
          const fileStream = createWriteStream(
            `./debian/.tmp/${owner}-${repo}-${response.data.assets[j].id}-${response.data.assets[j].name}`
          );
          get(response.data.assets[j].browser_download_url, res => {
            res.pipe(fileStream);
            fileStream.on('finish', () => fileStream.close());
          });
        }
      }
    });
}

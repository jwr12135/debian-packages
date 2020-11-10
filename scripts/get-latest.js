const fs = require('fs');
const httpsGet = require('follow-redirects').https.get;
const mkdirp = require('mkdirp').sync;
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

const sources = fs.readFileSync('./sources', 'utf8').split('\n');

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
          const dirPath = `./debian/${owner}/${repo}/${response.data.tag_name}`;
          const filePath = `${dirPath}/${response.data.assets[j].name}`;
          if (!fs.existsSync(filePath)) {
            mkdirp(dirPath);
            const fileStream = fs.createWriteStream(filePath);
            httpsGet(response.data.assets[j].browser_download_url, res => {
              res.pipe(fileStream);
              fileStream.on('finish', () => fileStream.close());
            });
          }
        }
      }
    });
}

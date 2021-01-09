const fs = require('fs');
const http = require('http');
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });

const Cat = mongoose.model('Cat', new mongoose.Schema({ name: String }));

const app = http.createServer(async (req, res) => {
  try {
    if (req.url.includes('%')) {
      debugger;
      ytdl(`http://www.youtube.com/watch?v=${req.url.split('%')[0].slice(1)}`, {
        // quality: 'highest'
        quality: 18, // second
        //,quality: 'highestaudio',
        //,filter: i => i.qualityLabel === '480p' && i.mimeType.slice(0, 10) === "video/webm"
      }).pipe(fs.createWriteStream(`${req.url.split('%')[1]}.mp4`));
    }
  } catch (err) {
    debugger;
  }

  const random = Math.random();
  const kitty = new Cat({ name: `Zildjian${random}` });
  // kitty.save().then(() => console.log(`meow${random}`));

  mongoose.model('Cat').find({ _id: '5ff90fbc79f6ab0038331db9' }, (err, data) => {
    res.end(`---\n${JSON.stringify({ err: err && err.toString(), data })}`);
  });
});

app.listen(3000);

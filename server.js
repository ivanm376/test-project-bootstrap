const winston = require('winston')
const colorizer = winston.format.colorize()
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(data => {
      const { timestamp, level, message } = data
      return `${timestamp} ${level.toUpperCase()}: ${message}`
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf(data => {
          const { timestamp, level, message } = data
          return colorizer.colorize(level, `${timestamp} ${level.toUpperCase()}: ${message}`)
        })
      ),
    }),
  ],
})
// logger.error('Test error message')
// logger.warn('Test warn message')

const express = require('express')
const app = express()
const compression = require('compression')
const mongoose = require('mongoose')
mongoose.connect('mongodb://mongodb:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
const Cat = mongoose.model('Cat', new mongoose.Schema({ name: String }))

app.use(compression())

if (process.env.USESSR) {
  logger.info('USESSR flag is on, trying server-side rendering')
  require('@babel/register')({ presets: ['@babel/preset-env', '@babel/preset-react'] })
  require('./server-ssr')(app)
} else {
  app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html')) // default serve index.html
}

// const fs = require('fs')
// const ytdl = require('ytdl-core') // mobile 800x480
// ytdl(`http://www.youtube.com/watch?v=ID`, { quality: 18 }).pipe(fs.createWriteStream(`v.mp4`))
app.get('/kitties', (req, res) => {
  logger.info('kitties', req.url)
  // try {
  //   // const info = await ytdl.getBasicInfo(videoId);
  //   // console.log(info.formats.map(i => `${i.itag} ${i.width}x${i.height}`));
  //   if (req.url.includes('%')) {
  //     ytdl(`http://www.youtube.com/watch?v=${req.url.split('%')[0].slice(1)}`, {
  //       // quality: 'highest'
  //       quality: 18, // second
  //       //,quality: 'highestaudio',
  //       //,filter: i => i.qualityLabel === '480p' && i.mimeType.slice(0, 10) === "video/webm"
  //     }).pipe(fs.createWriteStream(`${req.url.split('%')[1]}.mp4`))
  //   }
  // } catch (err) {
  //   logger.error(`ytdl_catch ${err}`)
  // }

  const random = Math.random()
  const kitty = new Cat({ name: `Zildjian${random}` })
  // kitty.save().then(() => logger.info(`meow${random}`));

  mongoose.model('Cat').find({ _id: '5ff90fbc79f6ab0038331db9' }, (err, data) => {
    res.end(`---\n${JSON.stringify({ err: err && err.toString(), data })}`)
  })
})

app.use(express.static('dist'))
app.use(express.static('public'))

app.listen(process.env.PORT || 3000, () => {
  logger.info(`APP listening NODE_ENV:${process.env.NODE_ENV} PORT:${process.env.PORT || 3000}`)
})

process.on('uncaughtException', err => {
  logger.error(`server_uncaughtException ${err}`)
  process.exit(1)
})

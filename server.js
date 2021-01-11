const winston = require('winston')
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(data => {
      // reorder attributes:
      return JSON.stringify({ timestamp: data.timestamp, level: data.level, message: data.message })
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})
if (process.env.NODE_ENV === 'development') {
  const colorizer = winston.format.colorize()
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(data => {
          const { timestamp, level, message } = data
          return colorizer.colorize(level, `${timestamp} ${level.toUpperCase()}: ${message}`)
        })
      ),
    })
  )
}
// logger.error('Test error message')
// logger.warn('Test warn message')

const express = require('express')
const app = express()
const compression = require('compression')
const mongoose = require('mongoose')
mongoose.connect('mongodb://mongodb:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
const Cat = mongoose.model('Cat', new mongoose.Schema({ name: String }))

app.use(compression())

require('@babel/register')({
  presets: ['@babel/preset-react', '@babel/preset-env'],
})
const renderReact = require('./renderReact')
renderReact(app)

// app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))
app.get('/kitties', (req, res) => {
  logger.info('kitties', req.url)
  try {
    // if (req.url.includes('%')) {
    //   debugger;
    //   ytdl(`http://www.youtube.com/watch?v=${req.url.split('%')[0].slice(1)}`, {
    //     // quality: 'highest'
    //     quality: 18, // second
    //     //,quality: 'highestaudio',
    //     //,filter: i => i.qualityLabel === '480p' && i.mimeType.slice(0, 10) === "video/webm"
    //   }).pipe(fs.createWriteStream(`${req.url.split('%')[1]}.mp4`));
    // }
  } catch (err) {
    debugger
  }

  const random = Math.random()
  const kitty = new Cat({ name: `Zildjian${random}` })
  // kitty.save().then(() => logger.info(`meow${random}`));

  mongoose.model('Cat').find({ _id: '5ff90fbc79f6ab0038331db9' }, (err, data) => {
    res.end(`---\n${JSON.stringify({ err: err && err.toString(), data })}`)
  })
})

app.use(express.static('dist'))
app.use(express.static('public'))

app.listen(process.env.PORT, () => {
  logger.info(`APP listening ENV:${process.env.NODE_ENV} PORT:${process.env.PORT}`)
})

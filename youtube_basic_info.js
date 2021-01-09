const fs = require('fs');
const ytdl = require('ytdl-core'); // mobile 800x480

const run = async () => {
  try {
    // const info = await ytdl.getBasicInfo(videoId);
    // console.log(info.formats.map(i => `${i.itag} ${i.width}x${i.height}`));
    debugger;
    ytdl(`http://www.youtube.com/watch?v=${process.argv[2]}`, {
      // quality: 'highest'
      quality: 18, // second
      //,quality: 'highestaudio',
      //,filter: i => i.qualityLabel === '480p' && i.mimeType.slice(0, 10) === "video/webm"
    }).pipe(fs.createWriteStream(`${process.argv[3]}.mp4`));
  } catch (err) {
    debugger;
  }
};
run();

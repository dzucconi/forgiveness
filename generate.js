const fs = require('fs');
const Ivona = require('ivona-node');

const wait = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

const ivona = new Ivona({
  accessKey: process.env.IVONA_ACCESS_KEY,
  secretKey: process.env.IVONA_SECRET_KEY
});

const getVoices = () =>
  new Promise(resolve =>
    ivona
      .listVoices()
      .on('complete', resolve)
  );

const speak = (text, voice) =>
  new Promise(resolve => {
    ivona
      .createVoice(text, {
        body: { voice: voice }
      })
      .pipe(fs.createWriteStream(`./app/assets/voices/${voice.Name}.mp3`))
      .on('finish', () => {
        wait(250).then(resolve);
      });
  });

const generate = voice => {
  console.log(`Generating ${voice.Name}`);
  return speak('forgiveness', voice).then(() => wait(25));
};

getVoices()
  .then(({ voices }) => {
    return voices.reduce((promise, voice) => {
      return promise.then(() => generate(voice));
    }, Promise.resolve(true));
  })
  .then(() => {
    console.log('Done.');
  });

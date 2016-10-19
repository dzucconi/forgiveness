import { Howl } from 'howler';

const AUDIO = {};
const VOICES = [
  'Agnieszka',
  'Amy',
  'Astrid',
  'Brian',
  'Carla',
  'Carmen',
  'Celine',
  'Chantal',
  'Chipmunk',
  'Conchita',
  'Cristiano',
  'Dora',
  'Emma',
  'Enrique',
  'Eric',
  'Ewa',
  'Filiz',
  'Geraint',
  'Giorgio',
  'Gwyneth',
  'Hans',
  'Ines',
  'Ivy',
  'Jacek',
  'Jan',
  'Jennifer',
  'Joey',
  'Justin',
  'Karl',
  'Kendra',
  'Kimberly',
  'Liv',
  'Lotte',
  'Mads',
  'Maja',
  'Marlene',
  'Mathieu',
  'Maxim',
  'Miguel',
  'Naja',
  'Nicole',
  'Penelope',
  'Raveena',
  'Ricardo',
  'Ruben',
  'Russell',
  'Salli',
  'Tatyana',
  'Vitoria',
];

const player = name =>
  new Howl({
    src: [`voices/${name}.mp3`],
  });

export default VOICES
  .reduce((memo, name) => {
    memo[name] = () =>
      AUDIO[name] || (AUDIO[name] = player(name));
    return memo;
  }, {});

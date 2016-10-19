import { knuthShuffle as shuffle } from 'knuth-shuffle';
import voices from './voices';

const grab = state => {
  if (state.speakers.length === 0) {
    state.speakers = shuffle(Object.keys(voices).slice(0));
  }

  const speaker = state.speakers.pop();

  if (state.speaker === speaker) {
    return grab(state);
  }

  state.speaker = speaker;

  return speaker;
};

export default grab;

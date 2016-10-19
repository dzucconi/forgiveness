import { knuthShuffle as shuffle } from 'knuth-shuffle';

const forgiveness = state => {
  const spelling = 'f' + shuffle('orgiveness'.split('')).join('');

  if (state.forgiveness === spelling) {
    return forgiveness(state);
  }

  state.forgiveness = spelling;

  return spelling;
};

export default forgiveness;

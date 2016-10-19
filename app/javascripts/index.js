import voices from './lib/voices';
import forgiveness from './lib/forgiveness';
import grab from './lib/grab';

const CONFIG = {
  pause: 2000,
};

const STATE = {
  speakers: [],
  speaker: null,
  forgiveness: null,
};

const DOM = {
  app: document.getElementById('app'),
  stage: document.getElementById('stage'),
  notifications: document.getElementById('notifications'),
};

const isTouchDevice = () =>
  'ontouchstart' in window || 'onmsgesturechange' in window;

const play = (start, speaker) => {
  const instance = voices[speaker()]();

  instance
    .once('play', start)
    .once('end', () =>
      setTimeout(() => play(start, speaker), CONFIG.pause));

  instance.play();
};

const render = () => DOM.stage.innerHTML = `
  <div class='forgiveness'>
    ${forgiveness(STATE)}
  </div>
`;

const init = window.init = () =>
  play(render, () => grab(STATE));

export default () => {
  if (isTouchDevice()) {
    DOM.stage.innerHTML = `
      <div class='forgiveness' ontouchstart='init()'>
        🔊
      </div>
    `;

    return;
  }

  init();

  DOM.notifications.innerHTML = `
    <div class='sound'>
      🔊
    </div>
  `;
};

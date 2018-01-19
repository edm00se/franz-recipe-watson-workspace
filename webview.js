'use strict';

const path = require('path');

module.exports = Franz => {
  const getMessages = function getMessages() {
    const elements = document.querySelectorAll('ul.ic-spaces .ic-news');
    let count = 0;

    for (let i = 0; i < elements.length; i += 1) {
      count += 1;
    }

    // set Franz badge
    Franz.setBadge(count);
  };

  // inject franz.css stylesheet
  Franz.injectCSS(path.join(__dirname, 'service.css'));

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
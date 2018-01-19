'use strict';

const path = require('path');

module.exports = Franz => {
  const getMessages = function getMessages() {
    let directCount = 0;
    let indirectCount = 0;
    
    // chats
    if( document.querySelector('.ic-menu-spaces .ic-has-unread') ){
      indirectCount++;
    }

    // DMs
    if( document.querySelector('.ic-direct-messages .ic-has-unread') ){
      directCount++;
    }

    // mentions
    if( document.querySelector('.ic-mentions .ic-has-unread') ){
      directCount++;
    }

    // set Franz badges
    Franz.setBadge(directCount, indirectCount);
  };

  // inject franz.css stylesheet
  Franz.injectCSS(path.join(__dirname, 'service.css'));

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
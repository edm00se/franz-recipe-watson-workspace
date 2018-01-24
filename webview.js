'use strict';

const path = require('path');

// works for any "type" of tab loaded (Chats/Spaces, DMs, Mentions)
function getGenericUnreadCountForType(){
  return (document.querySelectorAll('ul.ic-spaces .ic-news').length || 0);
}

function getSpacesHasUnread(){
  return !!document.querySelector('.ic-menu-spaces.ic-has-unread');
}

function getDirectMessagesHasUnread(){
  return !!document.querySelector('.ic-direct-messages.ic-has-unread');
}

function getMentionsHasUnread(){
  return !!document.querySelector('.ic-mentions.ic-has-unread');
}

module.exports = Franz => {
  const getMessages = function getMessages() {
    let directCount = 0;
    let indirectCount = 0;

    /*
    * NOTE: if WW ever changes its high level behavior to allow for better querySelector access
    * to unread counts, this can change to be more specific, for now, it's only specific for
    * when the user is in the "tab" of the type, making it inelegant
    */
    /*
     // selected into a type of space
     if(document.querySelector('.ic-conversations-header')){
       const label = document.querySelector('.ic-conversations-header h2').innerText;
     }
    */

    if( getGenericUnreadCountForType() ){
      indirectCount++;
    }
    if( getSpacesHasUnread() ){
      indirectCount++;
    }
    if( getDirectMessagesHasUnread() ){
      directCount++;
    }
    if( getMentionsHasUnread() ){
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
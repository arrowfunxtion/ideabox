chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(message){
    if(message.command == 'RELOAD_EXTENSION_PLEASE'){
      port.postMessage({command: 'RELOAD_PAGE_PLEASE'})
      chrome.runtime.reload();
    }
  })
});

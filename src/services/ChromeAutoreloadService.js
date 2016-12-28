export default function autoReload(){
  // AUTORELOAD
  console.log('chrome extension autoreloading');
  let port = chrome.runtime.connect({name: 'AUTORELOAD'})

  port.onMessage.addListener(function(message){
    if(message.command == 'RELOAD_PAGE_PLEASE'){
      window.location.reload();
    }
  })

  setInterval(function(){
    $.ajax({
      method: 'GET',
      url: chrome.extension.getURL('reload.html'),
      success: (response)=>{
        chrome.storage.sync.get('last_timestamp', (value)=>{
          if(_.isEmpty(value)){
            chrome.storage.sync.set({last_timestamp: 0})
          } else {
            if(value.last_timestamp != response){
              port.postMessage({command: 'RELOAD_EXTENSION_PLEASE'})
              chrome.storage.sync.set({last_timestamp: response})
            }
          }

        })
      },
      error: (err)=>{

      }
    })
  }, 1000)
}

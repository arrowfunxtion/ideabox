
  // add button
  export function addExtensionButton(){
    $('body').prepend('<div class="btn-open-extension">open extension</div>')
    $('body').on('click', '.btn-open-extension', ()=>{
      this.openExtensionBox()
    })
  }

  export function openExtensionBox(){
    $('#extension-wrapper').show();
  }

  export function contextMenusListener(){
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        switch(request.type){
           case 'OPEN_EXTENSION_BOX':
           this.openExtensionBox()
           break;
        }
    });
  }

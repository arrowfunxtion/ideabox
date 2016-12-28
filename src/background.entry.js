
function openExtensionBox(info, tab){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {type: 'OPEN_EXTENSION_BOX'}, function(response){})
  })
}

chrome.contextMenus.create({"title": 'Open Extension', "contexts": ["page"], "onclick": openExtensionBox})

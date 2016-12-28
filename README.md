# Chrome Extension Boilerplate
Chrome extension boilerplate using React + MOBX, Babel, ES2015, Webpack

# Version 0.1.0

## Folder Structure

    - extension/ // the distributed extension
    -- scripts
    --- background.bundle.js // compiled background js from source
    --- contentscript.bundle.js // compiled contentscript js from source
    -- icon.png // extension icon
    -- manifest.json // the chrome extension manifest file
    - src/ // the source code of app
    -- components/ // put components in this folder
    --- ExtensionContainer.react.js // the main wrapper / container for chrome extension
    -- services/ // services
    --- GlobalService.js
    -- styles/ // styling
    --- global.css
    -- background.entry.js // entry source for background js  
    -- contentscript.entry.js // entry source for contentscript
    - .gitignore
    - package.json
    - README.md
    - webpack.config.js // webpack configuration 


# Contact
Muhammad Azamuddin <mas.azamuddin@gmail.com>

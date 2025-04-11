# reveal.js-breadcrumb
Tree menu plugin for reveal.js presentations.


## Installation
```sh
npm install reveal.js-breadcrumb
```

## Usage
```javascript
import Reveal from 'reveal.js'
import Breadcrumb from 'reveal.js-breadcrumb/index.js'

let deck = new Reveal({
  plugins: [Breadcrumb]
})
await deck.initialize()
```

## Customization
```javascript
let deck = new Reveal({
  plugins: [Breadcrumb]
})
await deck.initialize()

const { breadcrumb } = deck.getPlugin("breadcrumb")

breadcrumb.node // ul DOM element
```

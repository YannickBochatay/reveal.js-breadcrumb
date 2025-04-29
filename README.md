# reveal.js-breadcrumb-yb
Breadcrumb plugin for reveal.js presentations.


## Installation
```sh
npm install reveal.js-breadcrumb-yb
```

## Usage
```javascript
import Reveal from 'reveal.js'
import Breadcrumb from 'reveal.js-breadcrumb-yb/index.js'

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

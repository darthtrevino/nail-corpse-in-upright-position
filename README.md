[![Build Status](https://travis-ci.org/darthtrevino/nail-corpse-in-upright-position.svg?branch=master)](https://travis-ci.org/darthtrevino/nail-corpse-in-upright-position)

# nail-corpse-in-upright-position

Are exceptions screwing up your production game? Don't let those pesky things affect your error metrics, nail that corpse upright and pretend everything is okay!

Usage:

```js
const nailCorpseInUprightPosition = require('nail-corpse-in-upright-position');

@nailCorpseInUprightPosition()
class DerpyThrowingClass {
  derp() {
    throw new Error('fart'); // Errors no more!
  }
}
```

Getting rid of stupid logs:
```js
const nailCorpseInUprightPosition = require('nail-corpse-in-upright-position');

@nailCorpseInUprightPosition({liveDangerously: true})
class DerpyThrowingClass {
  derp() {
    throw new Error('fart'); // Errors (and annoying logs) no more!
  }
}
```

Handling errors (y tho?)
```js
const nailCorpseInUprightPosition = require('nail-corpse-in-upright-position');

@nailCorpseInUprightPosition({errorHandler: (err) => console.log("I CAUGHT", err)})
class DerpyThrowingClass {
  derp() {
    throw new Error('fart'); // Errors (and annoying logs) no more!
  }
}
```
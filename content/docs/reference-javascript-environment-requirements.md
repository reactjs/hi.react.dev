---
id: javascript-environment-requirements
title: JavaScript Environment Requirements
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 16 depends on the collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). If you support older browsers and devices which may not yet provide these natively (e.g. IE < 11) or which have non-compliant implementations (e.g. IE 11), consider including a global polyfill in your bundled application, such as [core-js](https://github.com/zloirock/core-js) or [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).

A polyfilled environment for React 16 using core-js to support older browsers might look like:

```js
import 'core-js/es/map';
import 'core-js/es/set';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

React also depends on `requestAnimationFrame` (even in test environments).  
You can use the [raf](https://www.npmjs.com/package/raf) package to shim `requestAnimationFrame`:

```js
import 'raf/polyfill';
```

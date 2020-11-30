---
id: javascript-environment-requirements
title: जावास्क्रिप्ट एनवायरनमेंट आवश्यकताएँ
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) और [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) कलेक्शन टाइप पर निर्भर करता है। यदि आप पुराने ब्राउज़र्स और उपकरणों का समर्थन करते हैं, जो अभी तक ये टाइप नेटिवली प्रदान नहीं कर सकते हैं (जैसे IE <11) या जिनके पास नॉन-कम्प्लाइअन्ट कार्यान्वयन हैं (उदाहरण IE 11), तो अपने बंडल किए गए एप्लिकेशन में एक वैश्विक polyfill शामिल करें, जैसे कि [core-js](https://github.com/zloirock/core-js) या [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)।
=======
React 16 depends on the collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). If you support older browsers and devices which may not yet provide these natively (e.g. IE < 11) or which have non-compliant implementations (e.g. IE 11), consider including a global polyfill in your bundled application, such as [core-js](https://github.com/zloirock/core-js).
>>>>>>> 5e437a10ed4e89cd5eaf990ce4f43e0857592b53

पुराने ब्राउज़र्स का समर्थन करने के लिए core-js का उपयोग करके React 16 के लिए एक polyfilled एनवायरनमेंट ऐसा दिखेगा:

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

React `requestAnimationFrame` पर भी निर्भर करती है (परीक्षण एनवायरनमेंट में भी)।
आप `requestAnimationFrame` के समर्थन के लिए [raf](https://www.npmjs.com/package/raf) package का उपयोग कर सकते हैं :

```js
import 'raf/polyfill';
```

---
id: javascript-environment-requirements
title: जावास्क्रिप्ट एनवायरनमेंट आवश्यकताएँ
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 18 सरे मॉडर्न ब्रोसेर्स को सपोर्ट करता है (जैसे, Edge, Firefox, Chrome, Safari)।

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.

---
id: cdn-links
title: CDN लिंक
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: hello-world.html
---

React एवं ReactDOM दोनों CDN पर उपलब्ध हैं। 

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

उपरोक्त वर्शन केवल परीक्षण परिवर्धन के लिए हैं, एवं परिनियोजन के लिए नहीं। React के minified एवं optimized परिनियोजन वर्शन निम्नलिखित लिंक पर उपलब्ध हैं:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

`react` एवं `react-dom` के विशिष्ट वर्शन लोड करने के लिए `16` की जगह वर्शन संख्या डाल दें। 

### `crossorigin` एट्रीब्यूट क्यों? {#why-the-crossorigin-attribute}

यदि आप React को CDN द्वारा प्रसारित करते हैं, हमारा सुझाव है कि आप [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) एट्रीब्यूट सेट को न हटाएं:

```html
<script crossorigin src="..."></script>
```

हमारा यह भी सुझाव है कि आप सुनिश्चित कर लें जिस CDN का आप उपयोग कर रहे हैं वह `Access-Control-Allow-Origin: *` HTTP हेडर तय करता है:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

ऐसा करने से React 16 एवं बाद के वर्शन में [बेहतर त्रुटि नियंत्रण](/blog/2017/07/26/error-handling-in-react-16.html) होता है।

---
id: cdn-links
title: CDN लिंकस
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: release-channels.html
---

React एवं ReactDOM दोनों CDN पर उपलब्ध हैं। 

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

उपरोक्त वर्शन केवल डेवलपमेंट के लिए हैं, एवं प्रोडक्शन के लिए उपयुक्त नहीं हैं। React के minified एवं ऑप्टीमाइज़्ड प्रोडक्शन वर्शन निम्नलिखित लिंक पर उपलब्ध हैं:

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

<<<<<<< HEAD
`react` एवं `react-dom` के विशिष्ट वर्शन लोड करने के लिए `16` को वर्शन संख्या द्वारा बदल दें। 
=======
To load a specific version of `react` and `react-dom`, replace `17` with the version number.
>>>>>>> 82b8c9f2ab094eb7b0268029ab72fc99ffcadaf6

### `crossorigin` एट्रीब्यूट क्यों? {#why-the-crossorigin-attribute}

यदि आप React को CDN द्वारा प्रसारित करते हैं, हमारा सुझाव है कि आप [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) एट्रीब्यूट सेट को न हटाएं:

```html
<script crossorigin src="..."></script>
```

हमारा यह भी सुझाव है कि आप सुनिश्चित कर लें जिस CDN का आप उपयोग कर रहे हैं वह `Access-Control-Allow-Origin: *` HTTP हेडर सेट करता है:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

ऐसा करने से React 16 एवं बाद के वर्शन में [बेहतर एरर नियंत्रण](/blog/2017/07/26/error-handling-in-react-16.html) होता है।

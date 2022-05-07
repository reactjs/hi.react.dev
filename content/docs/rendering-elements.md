---
id: rendering-elements
title: रेंडरिंग एलिमेंट्स
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

एलिमेंट्स React ऐप्स के सबसे छोटे बिल्डिंग ब्लॉक हैं।

एक एलिमेंट वर्णन करता है कि आप स्क्रीन पर क्या देखना चाहते हैं:      

```js
const element = <h1>Hello, world</h1>;
```

ब्राउज़र DOM एलिमेंट्स के विपरीत, React एलिमेंट्स प्लेन ऑब्जेक्ट है और इन्हें बनाना आसान है। React DOM React एलिमेंट्स के अनुसार DOM को अपडेट रखता है।

>**ध्यान दें:**
>
> आप एलिमेंट्स को बहुचर्चित "कौम्पोनॅन्टस" समझ कर भ्रमित हो सकते है, हम कौम्पोनॅन्टस के बारे में [अगले भाग](/docs/components-and-props.html) में बतायेंगे। एलिमेंट्स वो है जिनका उपयोग करके एक कौम्पोनॅन्ट को बनाया जाता है। आगे बढ़ने से पहले हम इस भाग को पड़ने की सलाह देते हैं।

## DOM में एक एलिमेंट रेंडर करना {#rendering-an-element-into-the-dom}

मान लीजिए की आपकी HTML फ़ाइल में कहीं एक `<div>` है:

```html
<div id="root"></div>
```

हम इसे "रूट" DOM नोड कहते है क्यूँकि इसके अंदर की सारी चीज़ें React DOM के द्वारा संचालित होगी।

React के उपयोग से बने ज़्यादातर ऐप्लिकेशन में एक ही रूट DOM नोड होता है। परंतु यदि आप React को किसी पहले से बने हुए app में उपयोग करना चाहते है तो आप कितने भी अलग अलग रूट DOM नोड बना सकते है।

To render a React element, first pass the DOM element to [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot), then pass the React element to `root.render()`:

`embed:rendering-elements/render-an-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**

ये "Hello world" को पेज पर दर्शाता है।

## पहले से बने एलेमेंट को अपडेट करना {#updating-the-rendered-element}

React एलिमेंट्स [अचल](https://en.wikipedia.org/wiki/Immutable_object) होते है। एक बार एलेमेंट के बनने के बाद, आप उसके चिल्ड्रन या ऐट्रिब्यूट्स में परिवर्तन नहीं कर सकते। एक एलेमेंट एक चलचित्र के एक दृश्य के समान है, ये UI को एक निश्चित समय के लिए दर्शाता है।

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `root.render()`.

इस टिकिंग घड़ी उदाहरण पर विचार करें:

`embed:rendering-elements/update-rendered-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

It calls [`root.render()`](/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.

>**ध्यान दें:**
>
>In practice, most React apps only call `root.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>
>हम अनुशंसा करते हैं कि आप विषयों को छोड़ें नहीं क्योंकि वे एक-दूसरे पर निर्माण करते हैं।

## React वही अपडेट करता है जो आवश्यक है {#react-only-updates-whats-necessary}

React, DOM एलिमेंट्स और उसके चिल्डरेंस की तुलना उसके पहले की अवस्था से करता है और केवल उन्ही चीज़ों में परिवर्तन करता जिससे की DOM अपने चाहे state में आ जाए। 

आप ब्राउज़र टूलस की सहायता से [अंतिम उदाहरण](codepen://rendering-elements/update-rendered-element) का निरीक्षण करके सत्यापित कर सकते हैं:

![DOM inspector showing granular updates](../images/docs/granular-dom-updates.gif)

भले ही हम हर टिक पर पूरे UI ट्री का वर्णन करने वाला एक एलेमेंट बनाते हैं, लेकिन केवल टेक्स्ट नोड जिसकी सामग्री बदल गई है वह React DOM द्वारा अपडेट हो जाता है।

हमारे अनुभव से, UI को कैसे अप्डेट करना है के बिपरीत यदि हम ये सोचे की UI को किसी समय कैसे दिखाना है तो हम बहुत सारी बग से बच सकते है।

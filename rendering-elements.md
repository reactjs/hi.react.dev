---
id: rendering-elements
title: रेंडरिंग एलिमेंट्स
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

एलिमेंट्स रिएक्ट ऐप्स के सबसे छोटे बिल्डिंग ब्लॉक हैं।

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

एक React एलिमेंट्स को DOM नोड में दर्शाने के लिए, आपको इन दोनो को `ReactDOM.render()` में भेजना पड़ेगा:

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

ये "Hello world" को पेज पर दर्शाता है।

## पहले से बने एलेमेंट को अपडेट करना {#updating-the-rendered-element}

React एलिमेंट्स [अचल](https://en.wikipedia.org/wiki/Immutable_object) होते है। एक बार एलेमेंट के बनने के बाद, आप उसके चिल्ड्रन या ऐट्रिब्यूट्स में परिवर्तन नहीं कर सकते। एक एलेमेंट एक चलचित्र के एक दृश्य के समान है, ये UI को एक निश्चित समय के लिए दर्शाता है।

हमारे अब तक के ज्ञान के अनुसार, UI में परिवर्तन करने का एक ही तरीक़ा है। इसके लिए हमें एक नया एलेमेंट बना कर उसे `ReactDOM.render()` को भेजना पड़ेगा।

इस टिकिंग घड़ी उदाहरण पर विचार करें:

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

ये `ReactDOM.render()` को प्रत्येक सेकंड [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback से कॉल करता है।

>**ध्यान दें:**
>
>व्यवहार में, ज़्यादातर React ऍप्स `ReactDOM.render()` को एक ही बार कॉल करते है। अगले भाग में हम ये सीखेंगे कि कैसे इस तरह के कोड को [stateful components](/docs/state-and-lifecycle.html) में एन्काप्सुलेट करते है।
>
>हम अनुशंसा करते हैं कि आप विषयों को छोड़ें नहीं क्योंकि वे एक-दूसरे पर निर्माण करते हैं।

## React वही अपडेट करता है जो आवश्यक है {#react-only-updates-whats-necessary}

React, DOM एलिमेंट्स और उसके चिल्डरेंस की तुलना उसके पहले की अवस्था से करता है और केवल उन्ही चीज़ों में परिवर्तन करता जिससे की DOM अपने चाहे state में आ जाए। 

आप ब्राउज़र टूलस की सहायता से [अंतिम उदाहरण](codepen://rendering-elements/update-rendered-element) का निरीक्षण करके सत्यापित कर सकते हैं:

![DOM inspector showing granular updates](../images/docs/granular-dom-updates.gif)

भले ही हम हर टिक पर पूरे UI ट्री का वर्णन करने वाला एक एलेमेंट बनाते हैं, लेकिन केवल टेक्स्ट नोड जिसकी सामग्री बदल गई है वह React DOM द्वारा अपडेट हो जाता है।

हमारे अनुभव से, UI को कैसे अप्डेट करना है के बिपरीत यदि हम ये सोचे की UI को किसी समय कैसे दिखाना है तो हम बहुत सारी बग से बच सकते है।

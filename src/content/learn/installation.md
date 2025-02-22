---
title: इंस्टॉलेशन
---

<Intro>

React को शुरु से ही धीरे-धीरे अपनाने के लिए डिज़ाइन किया गया है। आप जितना चाहें, उतना React का यूज़ कर सकते हो। चाहे आप React की एक झलक पाना चाहते हो, HTML पेज में कुछ इंटरएक्टिविटी ऐड करना चाहते हो, या एक काम्प्लेक्स React-पॉवर्ड ऐप शुरू करना चाहते हो, यह सेक्शन आपकी शुरुआत में मदद करेगा।

</Intro>

## React को आजमाएं {/*try-react*/}

React के साथ खेलने के लिए आपको कुछ भी इंस्टॉल करने की आवश्यकता नहीं है। इस सैंडबॉक्स को एडिट करने की कोशिश करें!

<Sandpack>

```js
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />
}
```

</Sandpack>

आप इसे सीधे एडिट कर सकते हैं या ऊपर दाईं ओर "Fork" बटन दबाकर नए टैब में खोल सकते हैं।

React डॉक्यूमेंटेशन में ज्यादातर पेजों पर ऐसे ही सैंडबॉक्स होते हैं। React डॉक्यूमेंटेशन के अलावा, कई ऑनलाइन सैंडबॉक्स भी हैं जो React को सपोर्ट करते हैं: जैसे [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), या [CodePen.](https://codepen.io/pen?template=QWYVwWN)

अगर आप React को अपने कंप्यूटर पर लोकल ट्राई करना चाहते हैं, तो [इस HTML पेज को डाउनलोड करें।](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) इसे अपने एडिटर और ब्राउज़र में खोलें!

## React ऐप बनाना {/*creating-a-react-app*/}

अगर आप नया React ऐप शुरू करना चाहते हैं, तो आप [React ऐप बना सकते हैं](/learn/creating-a-react-app) एक रिकमेंडेड फ्रेमवर्क का इस्तेमाल करके।

## React ऐप को स्क्रैच से बनाएं {/*build-a-react-app-from-scratch*/}

अगर कोई फ्रेमवर्क आपके प्रोजेक्ट के लिए सही नहीं है, आप अपना खुद का फ्रेमवर्क बनाना चाहते हैं, या आप सिर्फ React ऐप के बेसिक्स सीखना चाहते हैं, तो आप [React ऐप को स्क्रैच से बना सकते हैं](/learn/build-a-react-app-from-scratch)।

## पहले से बने प्रोजेक्ट में React जोड़ें {/*add-react-to-an-existing-project*/}

अगर आप अपने पहले से बने ऐप या वेबसाइट में React यूज़ करना चाहते हैं, तो आप [React को पहले से बने प्रोजेक्ट में जोड़ सकते हैं।](/learn/add-react-to-an-existing-project)

<Note>

#### क्या मुझे Create React App यूज़ करना चाहिए? {/*should-i-use-create-react-app*/}

नहीं। Create React App अब बंद कर दिया गया है। ज्यादा जानकारी के लिए देखें [Sunsetting Create React App](/blog/2025/02/14/sunsetting-create-react-app)।

</Note>

## आगे क्या करें? {/*next-steps*/}

React के सबसे ज़रूरी कॉन्सेप्ट्स को जल्दी समझने के लिए [Quick Start](/learn) गाइड पर जाएं।

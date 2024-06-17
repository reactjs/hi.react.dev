---
title: इंस्टॉलेशन
---

<Intro>

React को शुरु से ही धीरे-धीरे अपनाने के लिए डिज़ाइन किया गया है। आप जितना चाहें, उतना React का यूज़ कर सकते हो। चाहे आप React की एक झलक पाना चाहते हो, HTML पेज में कुछ इंटरएक्टिविटी ऐड करना चाहते हो, या एक काम्प्लेक्स React-पॉवर्ड ऐप शुरू करना चाहते हो, यह सेक्शन आपकी शुरुआत में मदद करेगा।

</Intro>

<YouWillLearn isChapter={true}>

* [एक नया React प्रोजेक्ट कैसे शुरू करें](/learn/start-a-new-react-project)
* [एक मौजूदा प्रोजेक्ट में React कैसे ऐड करें](/learn/add-react-to-an-existing-project)
* [अपने एडिटर को कैसे सेटअप करें](/learn/editor-setup)
* [React डेवलपर टूल्स को कैसे इनस्टॉल करें](/learn/react-developer-tools)

</YouWillLearn>

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

आप इसे डायरेक्ट एडिट कर सकते हैं या उपरी राईट कोर्नर में 'Fork' बटन दबाकर एक नए टैब में ओपन कर सकते हैं।

React डॉक्युमेंटेशन में बहुत से पेज में इस तरह के सैंडबॉक्स शामिल हैं। React डॉक्युमेंटेशन के बाहर, बहुत सारे ऑनलाइन सैंडबॉक्स हैं जो React को सपोर्ट करते हैं: उदाहरण के लिए, [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), या [CodePen।](https://codepen.io/pen?template=QWYVwWN)

### React लोकाली ट्राई करें {/*try-react-locally*/}

अपने कंप्यूटर पर React लोकाली ट्राई करने के लिए, [इस HTML पेज को डाउनलोड करें।](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) इसे अपने एडिटर और अपने ब्राउज़र में ओपन करें!

## एक नया प्रोजेक्ट स्टार्ट करें {/*start-a-new-react-project*/}

अगर आप एक एप्लिकेशन या वेबसाइट को पूरी तरह से React के साथ बनाना चाहते हैं तो, [एक नया React प्रोजेक्ट स्टार्ट करें।](/learn/start-a-new-react-project)

## React को एक मौजूदा प्रोजेक्ट में ऐड करें {/*add-react-to-an-existing-project*/}

अगर आप अपने मौजूदा ऐप या वेबसाइट में React का यूज़ करना चाहते हैं तो, [React को एक मौजूदा प्रोजेक्ट में ऐड करें।](/learn/add-react-to-an-existing-project)

## अगले स्टेप्स {/*next-steps*/}

सबसे इम्पोर्टेंट React कॉन्सेप्ट्स के टूर के लिए [क्विक स्टार्ट](/learn) गाइड पर जाएं, जिनका आप हर दिन सामना करेंगे।

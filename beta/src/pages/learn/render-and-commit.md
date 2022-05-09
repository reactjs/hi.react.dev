---
title: रेंडर और कमिट
---

<Intro>

आपके कौम्पोनॅन्टस स्क्रीन पर डिस्प्ले होने से पहले, उन्हें React द्वारा रेंडर किया जाना चाहिए। इस प्रोसेस के स्टेप्स को समझने से आपको यह सोचने में मदद मिलेगी कि आपका कोड कैसे एग्ज़िक्युट होता है और इसके व्यवहार के बारे में बताता है।

</Intro>

<YouWillLearn>

* React में रेंडरिंग का क्या अर्थ है
* React कब और क्यों एक कौम्पोनॅन्ट रेंडर करता है
* स्क्रीन पर एक कौम्पोनॅन्ट डिस्प्ले करने में शामिल स्टेप्स
* क्यों रेंडरिंग हमेशा एक DOM अपडेट प्रोडूयज़ नहीं करता है

</YouWillLearn>

कल्पना कीजिए कि आपके कौम्पोनॅन्टस रसोई में रसोइया हैं, सामग्री से स्वादिष्ट व्यंजन इकट्ठा करते हैं। ऐसे में, React वेटर है जो ग्राहकों से उनके रिक्वेस्ट्स लेता है और उन्हें उनके ऑर्डर्स लाके देता है। UI से रिक्वेस्ट करने और उसे सर्व करने की इस प्रोसेस के तीन स्टेप्स हैं

1. **ट्रिगरिंग** एक रेंडर (रसोई में मेहमान का ऑर्डर डिलीवर करना)
2. **रेंडरिंग** कौम्पोनॅन्ट (रसोई में ऑर्डर तैयार करना)
3. **कमिटिंग** DOM में (टेबल पर ऑर्डर देना)

<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

## स्टेप 1: एक रेंडर ट्रिगर करें {/*step-1-trigger-a-render*/}

किसी कौम्पोनॅन्ट को रेंडर करने के दो कारण हैं:

1. यह कौम्पोनॅन्ट का **प्रारंभिक रेंडर है।**
2. कौम्पोनॅन्ट की **स्थिति अपडेट कर दी गई है।**

### प्रारंभिक रेंडर {/*initial-render*/}

जब आपका ऐप शुरू होता है, तो आपको शुरुआती रेंडर को ट्रिगर करना होगा। फ़्रेमवर्क और सैंडबॉक्स कभी-कभी इस कोड को छुपाते हैं, लेकिन यह आपके रुट कौम्पोनॅन्ट और टारगेट DOM नोड के साथ ReactDOM.render को कॉल करके किया जाता है:

<Sandpack>

```js index.js active
import Image from './Image.js';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Image />,
  document.getElementById('root')
);
```

```js Image.js
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

</Sandpack>

`ReactDOM.render` कॉल पर कमेंट करने का प्रयास करें और देखें कि कौम्पोनॅन्ट गायब हो गया है!

### state अपडेट होने पर री-रेंडर {/*re-renders-when-state-updates*/}

एक बार कौम्पोनॅन्ट शुरू में रेंडर किया गया है, तो आप  [`set` function](/apis/usestate#setstate) के साथ इसकी state को अपडेट करके आगे के रेंडरर्स को ट्रिगर कर सकते हैं। अपने कौम्पोनॅन्ट की स्टेट को अपडेट करने पर ऑटोमेटिकली एक रेंडर कियु हो जाता है।। (आप उनकी प्यास या भूख की स्थिति के आधार पर, उनके पहले ऑर्डर में डालने के बाद चाय, मिठाई और सभी प्रकार की चीजों को ऑर्डर करने वाले एक रेस्टोरेंट अतिथि के रूप में कल्पना कर सकते हैं।)

<IllustrationBlock sequential>
  <Illustration caption="State update..." alt="React as a server in a restaurant, serving a Card UI to the user, represented as a patron with a cursor for their head. They patron expresses they want a pink card, not a black one!" src="/images/docs/illustrations/i_rerender1.png" />
  <Illustration caption="...triggers..." alt="React returns to the Component Kitchen and tells the Card Chef they need a pink Card." src="/images/docs/illustrations/i_rerender2.png" />
  <Illustration caption="...render!" alt="The Card Chef gives React the pink Card." src="/images/docs/illustrations/i_rerender3.png" />
</IllustrationBlock>

## स्टेप 2: React आपके कौम्पोनॅन्टस को रेंडर करता है {/*step-2-react-renders-your-components*/}

एक रेंडर ट्रिगर करने के बाद, React आपके कौम्पोनॅन्टस को यह पता लगाने के लिए कॉल करता है कि स्क्रीन पर क्या डिस्प्ले किया जाए। **"रेंडरिंग" मतलब, React आपके कौम्पोनॅन्टस को कॉल कर रहा है।**

* **प्रारंभिक रेंडर पर,** React रूट कौम्पोनॅन्ट को कॉल करेगा।
* **बाद के रेंडर के लिए,** React उस फंक्शन कौम्पोनॅन्ट को कॉल करेगा जिसके state अपडेट ने रेंडर को ट्रिगर किया।

यह प्रोसेस रिकर्सिव है: यदि अपडेट कौम्पोनॅन्ट किसी अन्य कौम्पोनॅन्ट को रिटर्न करता है, तो React _उस_ कौम्पोनॅन्ट को अगला रेंडर करेगा, और यदि वह कौम्पोनॅन्ट भी कुछ रिटर्न करता है, तो वह _उस_ कौम्पोनॅन्ट को आगे रेंडर करेगा, और इसी तरह आगे के कौम्पोनॅन्टस को रेंडर करते जाएगा। प्रोसेस तब तक जारी रहेगी जब तक कि कोई और नेस्टेड कौम्पोनॅन्ट न हों और React को ठीक से पता हो कि स्क्रीन पर क्या डिस्प्ले किया जाना चाहिए।

निम्नलिखित उदाहरण में, React कई बार `Gallery()` और `Image()` को कॉल करेगा:

<Sandpack>

```js Gallery.js active
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

```js index.js
import Gallery from './Gallery.js';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Gallery />,
  document.getElementById('root')
);
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

* **प्रारंभिक रेंडर के दौरान,** React `<section>`, `<h1>`, और तीन `<img>` टैग के लिए [DOM नोड्स बनाएगा](https://developer.mozilla.org/docs/Web/API/Document/createElement)।
* **री-रेंडर के दौरान,** React यह कैलकुलेट करेगा कि पिछले रेंडर के बाद से उनकी कौन सी प्रॉपर्टीज, यदि कोई, बदल गई है। यह अगले स्टेप, कमिट कमिट फेज तक उस जानकारी के साथ कुछ नहीं करेगा।

<Gotcha>

रेंडरिंग हमेशा एक [पुरे कैलकुलेशन](/learn/keeping-components-pure) होना चाहिए:

* **वही इनपुट, वही आउटपुट।** वही इनपुट को देखते हुए, एक कौम्पोनॅन्ट को हमेशा वही JSX रिटर्न करना चाहिए। (जब कोई टमाटर के साथ सलाद का ऑर्डर देता है, तो उसे प्याज के साथ सलाद नहीं मिलना चाहिए!)
* **अपने से मतलब रखना।** इसे रेंडर करने से पहले मौजूद किसी भी ऑब्जेक्ट्स या वेरिएबल्स को नहीं बदलना चाहिए। (एक ऑर्डर से किसी और का ऑर्डर नहीं बदलना चाहिए।)

अन्यथा, आप कन्फुसिंग बग और अनप्रेडिक्टेबल व्यवहार का सामना कर सकते हैं क्योंकि आपका कोडबेस कम्प्लेक्सिटी में बढ़ता है। "Strict Mode" में डेवेलप होने पर, React प्रत्येक कौम्पोनॅन्ट के कार्य को दो बार कॉल करता है, जो इमप्योर फंक्शन्स के कारण सतह की गलतियों में मदद कर सकता है।

</Gotcha>

<DeepDive title="Optimizing performance">

यदि अपडेट कौम्पोनॅन्ट ट्री में बहुत ऊंचाई पर है तो अपडेट कौम्पोनॅन्ट के अंदर नेस्टेड सभी कौम्पोनॅन्टस को रेंडर करने का डिफ़ॉल्ट व्यवहार परफॉरमेंस के लिए ऑप्टिमम नहीं है। यदि आप किसी परफॉरमेंस समस्या का सामना करते हैं, तो इसे हल करने के लिए [परफॉरमेंस](/learn/performance) अनुभाग में वर्णित कई ऑप्ट-इन तरीके हैं। **समय से पहले ऑप्टिमाइज़ न करें!**

</DeepDive>

## स्टेप 3: React DOM में चेंजेस कमिट करता है {/*step-3-react-commits-changes-to-the-dom*/}

आपके कौम्पोनॅन्टस को रेंडर करने (कॉल करने) के बाद, React DOM में मॉडिफाई करेगा।

* **प्रारंभिक रेंडर पर,** React स्क्रीन पर बनाए गए सभी DOM नोड्स को डालने के लिए [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild)  DOM API का उपयोग करेगा।
* **पुन: रेंडर करने के लिए,** React DOM को लेटेस्ट आउटपुट के जैसा करने के लिए कम से कम ज़रूरी ऑपरेशन्स (जो रेंडरिंग करते वक़्त कैलकुलेट होते है!) का इस्तेमाल करेगा।    

**React केवल DOM नोड्स को बदलता है यदि रेंडरर्स के बीच कोई अंतर है।** उदाहरण के लिए, यहां एक कौम्पोनॅन्ट है जो हर सेकेंड में अपने पैरेंट से पास किये गए विभिन्न प्रोप के साथ फिर से रेंडर करता है। ध्यान दें कि आप `<input>` में कुछ टेक्स्ट कैसे जोड़ सकते हैं, इसके `value` को अपडेट कर सकते हैं, लेकिन जब कौम्पोनॅन्ट फिर से रेंडर होता है तो टेक्स्ट गायब नहीं होता है:

<Sandpack>

```js Clock.js active
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  return (
    <Clock time={time.toLocaleTimeString()} />
  );
}
```

</Sandpack>

यह काम करता है क्योंकि इस अंतिम स्टेप के दौरान, React केवल `<h1>` की कंटेंट को नए `time` के साथ अपडेट करता है। यह देखता है कि `<input>` JSX में पिछली बार की तरह ही दिखाई दे रहा है, इसलिए React `<input>`— या इसके `value` को नहीं छूताा है!
## Epilogue: ब्राउज़र पेंट {/*epilogue-browser-paint*/}

रेंडरिंग के बाद और React के DOM को अपडेट करने पर, ब्राउज़र स्क्रीन को फिर से रंग देगा। हालांकि इस प्रोसेस को "ब्राउज़र रेंडरिंग" के रूप में जाना जाता है, हम इन बाकी डाक्यूमेंट्स में कन्फूज़न से बचने के लिए इसे "painting" के रूप में रेफेर करेंगे।

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

<Recap>

* React ऐप में कोई भी स्क्रीन अपडेट तीन स्टेप्स में होता है:
  1. ट्रिगर
  2. रेंडर
  3. कमिट
* आप अपने कौम्पोनॅन्टस में गलतियों को खोजने के लिए Strict Mode का उपयोग कर सकते हैं। 
* यदि रेंडरिंग परिणाम पिछली बार की तरह ही है तो React DOM को नहीं छूता है।

</Recap>


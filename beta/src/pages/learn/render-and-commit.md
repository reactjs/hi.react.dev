---
title: रेंडर और कमिट
---

<Intro>

आपके कंपोनेंट्स स्क्रीन पर प्रदर्शित होने से पहले, उन्हें React द्वारा रेंडर किया जाना चाहिए। इस प्रक्रिया के चरणों को समझने से आपको यह सोचने में मदद मिलेगी कि आपका कोड कैसे निष्पादित होता है और इसके व्यवहार की व्याख्या करता है।

</Intro>

<YouWillLearn>

* React में रेंडरिंग का क्याअर्थ है
* React कब और क्यों एक कॉम्पोनेन्ट रेंडर करता है
* स्क्रीन पर एक कॉम्पोनेन्ट प्रदर्शित करने में शामिल कदम
* क्यों रेंडरिंग हमेशा एक डोम अद्यतन उत्पन्न नहीं करता है

</YouWillLearn>

कल्पना कीजिए कि आपके कंपोनेंट्स रसोई में रसोइया हैं, सामग्री से स्वादिष्ट व्यंजन इकट्ठा करते हैं। इस परिदृश्य में, React वेटर है जो ग्राहकों से अनुरोध करता है और उन्हें उनके आदेश लाता है। UI का अनुरोध करने और उसे प्रस्तुत करने की इस प्रक्रिया के तीन चरण हैं

1. **ट्रिग्गरिंग** रेंडर (रसोईघर में अतिथि का आदेश पहुंचाना)
2. **रेंडरिंग** कॉम्पोनेन्ट (रसोई से आदेश प्राप्त करना)
3. **कमिटिंग** डोम पर (टेबल पर ऑर्डर देकर)

<IllustrationBlock sequential>
  <Illustration caption="ट्रिगर" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="रेंडर" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="कमिट" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

## स्टेप 1: एक रेंडर ट्रिगर करें {/*step-1-trigger-a-render*/}

किसी कॉम्पोनेन्ट को रेंडर करने के दो कारण हैं:

1. यह कॉम्पोनेन्ट का **प्रारंभिक रेंडर है।**
2. कॉम्पोनेन्ट की **स्थिति अपडेट कर दी गई है।**

### प्रारंभिक रेंडर {/*initial-render*/}

जब आपका ऐप शुरू होता है, तो आपको शुरुआती रेंडर को ट्रिगर करना होगा। फ़्रेमवर्क और सैंडबॉक्स कभी-कभी इस कोड को छुपाते हैं, लेकिन यह आपके मूल कॉम्पोनेन्ट और टारगेट DOM नोड के साथ ReactDOM.render को कॉल करके किया जाता है:

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

`ReactDOM.render` कॉल पर कमेंट करने का प्रयास करें और देखें कि कॉम्पोनेन्ट गायब हो गया है|

### स्टेट अद्यतन होने पर पुन: रेंडर {/*re-renders-when-state-updates*/}

एक बार कॉम्पोनेन्ट शुरू में रेंडर किया गया है, तो आप [`setState`](reference/setstate) के साथ इसकी स्टेट को अपडेट करके आगे के रेंडरर्स को ट्रिगर कर सकते हैं|

<IllustrationBlock sequential>
  <Illustration caption="स्टेट अपडेट..." alt="React as a server in a restaurant, serving a Card UI to the user, represented as a patron with a cursor for their head. They patron expresses they want a pink card, not a black one!" src="/images/docs/illustrations/i_rerender1.png" />
  <Illustration caption="...ट्रिगर्स..." alt="React returns to the Component Kitchen and tells the Card Chef they need a pink Card." src="/images/docs/illustrations/i_rerender2.png" />
  <Illustration caption="...रेंडर!" alt="The Card Chef gives React the pink Card." src="/images/docs/illustrations/i_rerender3.png" />
</IllustrationBlock>

## स्टेप 2: React आपके कंपोनेंट्स को रेंडर करता है {/*step-2-react-renders-your-components*/}

एक रेंडर ट्रिगर करने के बाद, React आपके कंपोनेंट्स को यह पता लगाने के लिए कॉल करता है कि स्क्रीन पर क्या प्रदर्शित किया जाए। **"रेंडरिंग" पर React आपके कंपोनेंट्स को कॉल कर रहा है |**

* **प्रारंभिक रेंडर पर**, React रूट कंपोनेंट को कॉल करेगा।
* **बाद के रेंडर के लिए,** React उस फंक्शन कंपोनेंट को कॉल करेगा जिसके स्टेट अपडेट ने रेंडर को ट्रिगर किया।

यह प्रक्रिया पुनरावर्ती है: यदि अद्यतन कंपोनेंट किसी अन्य कंपोनेंट को लौटाता है, तो React उस कंपोनेंट को अगला रेंडर करेगा, और यदि वह कंपोनेंट भी कुछ लौटाता है, तो वह उस कंपोनेंट को आगे रेंडर करेगा, और इसी तरह। प्रक्रिया तब तक जारी रहेगी जब तक कि कोई और नेस्टेड कंपोनेंट न हों और React को ठीक से पता हो कि स्क्रीन पर क्या प्रदर्शित किया जाना चाहिए।

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

* **री-रेंडर के दौरान,** React यह गणना करेगा कि पिछले रेंडर के बाद से उनकी कौन सी प्रॉपर्टीज, यदि कोई है, बदल गई है। यह अगले चरण, कमिट फेज तक उस जानकारी के साथ कुछ नहीं करेगा।

<Gotcha>

रेंडरिंग हमेशा एक [शुद्ध गणना](/learn/keeping-components-pure) होना चाहिए:

* **समान इनपुट, वही आउटपुट।** समान इनपुट को देखते हुए, एक कॉम्पोनेन्ट को हमेशा वही JSX वापस करना चाहिए। (जब कोई टमाटर के साथ सलाद का आदेश देता है, तो उसे प्याज के साथ सलाद नहीं मिलना चाहिए!)
* **अपना खुद का व्यवसाय ध्यान रखें।** इसे रेंडर करने से पहले मौजूद किसी भी ऑब्जेक्ट्स या वेरिएबल्स को नहीं बदलना चाहिए।(एक आदेश से किसी और का आदेश नहीं बदलना चाहिए।)

अन्यथा, आप भ्रमित बग और अप्रत्याशित व्यवहार का सामना कर सकते हैं क्योंकि आपका कोडबेस जटिलता में बढ़ता है। "स्ट्रिक्ट मोड" में डेवेलोप होने पर, React प्रत्येक कॉम्पोनेन्ट के कार्य को दो बार कॉल करती है, जो अशुद्ध कार्यों के कारण सतह की गलतियों में मदद कर सकती है।

</Gotcha>

<DeepDive title="ऑप्टिमिज़िंग परफॉरमेंस">

अद्यतन कॉम्पोनेन्ट के भीतर नेस्टेड सभी कंपोनेंट्स को रेंडर करने का डिफ़ॉल्ट व्यवहार प्रदर्शन के लिए इष्टतम नहीं है यदि अद्यतन कॉम्पोनेन्ट ट्री में बहुत ऊंचाई पर है। यदि आप किसी प्रदर्शन समस्या का सामना करते हैं, तो इसे हल करने के लिए [प्रदर्शन](/learn/performance) अनुभाग में वर्णित कई ऑप्ट-इन तरीके हैं। **समय से पहले अनुकूलन न करें!**

</DeepDive>

## स्टेप 3: React DOM में कमिटस करता है {/*step-3-react-commits-changes-to-the-dom*/}

आपके कंपोनेंट्स को रेंडर करने (कॉल करने) के बाद, React DOM को संशोधित करेगा।

* **प्रारंभिक रेंडर पर,** React स्क्रीन पर बनाए गए सभी डोम नोड्स को डालने के लिए [`appendChild ()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild)  DOM API का उपयोग करेगा।
* **पुन: रेंडर करने के लिए,** DOM को नवीनतम रेंडरिंग आउटपुट से मिलान करने के लिए React न्यूनतम आवश्यक संचालन (रेंडरिंग के दौरान परिकलित!) लागू करेगा।

**React केवल DOM नोड्स को बदलता है यदि रेंडरर्स के बीच कोई अंतर है। **उदाहरण के लिए, यहां एक कॉम्पोनेन्ट है जो हर सेकेंड में अपने माता-पिता से पारित विभिन्न प्रोप के साथ फिर से रेंडर करता है। ध्यान दें कि आप `<input>` में कुछ टेक्स्ट कैसे जोड़ सकते हैं, इसके `value` को अपडेट कर सकते हैं, लेकिन जब कॉम्पोनेन्ट फिर से रेंडर होता है तो टेक्स्ट गायब नहीं होता है:

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

यह काम करता है क्योंकि इस अंतिम चरण के दौरान, React केवल `<h1>` की कंटेंट को नए `time` के साथ अपडेट करता है। यह देखता है कि `<input>` JSX में पिछली बार की तरह ही दिखाई देता है, इसलिए React `<input>`— या इसके `value` को स्पर्श नहीं करता है!
## उपसंहार: ब्राउज़र पेंट {/*epilogue-browser-paint*/}

रेंडरिंग के बाद और React ने DOM को अपडेट करने पर, ब्राउज़र स्क्रीन को फिर से रंग देगा। हालांकि इस प्रक्रिया को "ब्राउज़र रेंडरिंग" के रूप में जाना जाता है, हम इन बाकी दस्तावेज़ों में भ्रम से बचने के लिए इसे "पेंटिंग" के रूप में संदर्भित करेंगे।

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

<Recap>

* React ऐप में कोई भी स्क्रीन अपडेट तीन चरणों में होता है:
  1. ट्रिगर
  2. रेंडर
  3. कमिट
* आप अपने कंपोनेंट्स में गलतियों को खोजने के लिए Strict Mode का उपयोग कर सकते हैं। 
* यदि रेंडरिंग परिणाम पिछली बार की तरह ही है तो React DOM को नहीं छूता है।

</Recap>


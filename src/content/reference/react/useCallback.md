---
title: useCallback
---

<Intro>

`useCallback` एक React हुक है जो आपको री-रेंडर के बीच फंक्शन डेफिनिशन को कैश करने की सुविधा देता है।

```js
const cachedFn = useCallback(fn, dependencies)
```

</Intro>

<Note>

[React Compiler](/learn/react-compiler) automatically memoizes values and functions, reducing the need for manual `useCallback` calls. You can use the compiler to handle memoization automatically.

</Note>

<InlineToc />

---

## Reference {/*reference*/}

### `useCallback(fn, dependencies)` {/*usecallback*/}

अपने कौम्पोनॅन्ट के टॉप लेवल पर फंक्शन डेफिनिशन को री-रेंडर के बीच कैश करने के लिए `useCallback` कॉल करें:

```js {4,9}
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
```

[नीचे और उदाहरण देखें।](#usage)

#### Parameters {/*parameters*/}

* `fn`: वह फंक्शन जिसे आप कैश करना चाहते हैं। यह किसी भी प्रकार के आर्ग्यूमेंट्स ले सकता है और कोई भी वैल्यू रिटर्न कर सकता है। React पहले रेंडर पर आपका फंक्शन रिटर्न करता है (कॉल नहीं करता!)। अगले रेंडर पर, अगर `dependencies` नहीं बदली हैं, तो React वही फंक्शन रिटर्न करता है। यदि `dependencies` बदल गई हैं, तो React इस रेंडर में पास किया गया नया फंक्शन रिटर्न करता है और इसे बाद में रियूज़ के लिए स्टोर करता है। React आपका फंक्शन कॉल नहीं करता, बल्कि इसे रिटर्न करता है ताकि आप तय कर सकें कि इसे कब और कैसे कॉल करना है।

* `dependencies`: उन सभी रिएक्टिव वैल्यूज़ की सूची जो `fn` के कोड में रेफरेंस की गई हैं। रिएक्टिव वैल्यूज़ में प्रॉप्स, स्टेट, और कौम्पोनॅन्ट बॉडी में डायरेक्टली डिक्लेयर किए गए वेरिएबल्स और फंक्शन्स शामिल हैं। यदि आपका लिंटर [React के लिए कॉन्फ़िगर](/learn/editor-setup#linting) है, तो यह वेरिफ़ाई करेगा कि हर रिएक्टिव वैल्यू सही तरीके से डिपेंडेंसी के रूप में दी गई है। डिपेंडेंसीज़ की सूची की संख्या स्थिर होनी चाहिए और इसे इनलाइन, `[dep1, dep2, dep3]` की तरह लिखा जाना चाहिए। React प्रत्येक डिपेंडेंसी की तुलना पिछले रेंडर से [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) एल्गोरिदम का उपयोग करके करता है।

#### Returns {/*returns*/}

पहले रेंडर पर, `useCallback` आपके द्वारा पास किया गया `fn` फंक्शन रिटर्न करता है।

<<<<<<< HEAD
अगले रेंडर पर, यह या तो पिछले रेंडर से कैश्ड `fn` फंक्शन रिटर्न करता है (यदि डिपेंडेंसीज़ नहीं बदली हैं), या इस रेंडर में पास किया गया नया `fn` फंक्शन रिटर्न करता है।
=======
During subsequent renders, it will either return an already stored `fn` function from the last render (if the dependencies haven't changed), or return the `fn` function you have passed during this render.
>>>>>>> 1207ee36e1c7e3f2737d8f1022015473ffa99adf

#### Caveats {/*caveats*/}

* `useCallback` एक हुक है, इसलिए इसे केवल आपके कौम्पोनॅन्ट या कस्टम हुक के **टॉप लेवल** पर ही कॉल किया जा सकता है। इसे लूप्स या कंडीशन्स के अंदर कॉल नहीं करना चाहिए। यदि ज़रूरी हो, तो नया कौम्पोनॅन्ट बनाएँ और स्टेट को वहाँ ले जाएँ।
* React कैश्ड फंक्शन को तब तक डिस्कार्ड **नहीं करता जब तक कोई विशेष कारण न हो**। उदाहरण के लिए, डेवलपमेंट मोड में, यदि आप कौम्पोनॅन्ट की फ़ाइल एडिट करते हैं, तो React कैश डिस्कार्ड कर देता है। डेवलपमेंट और प्रोडक्शन दोनों में, यदि कौम्पोनॅन्ट इनिशियल माउंट के दौरान सस्पेंड होता है, तो React कैश डिस्कार्ड कर देता है। भविष्य में, React और फ़ीचर्स जोड़ सकता है जो कैश डिस्कार्ड का लाभ उठाएँ—जैसे कि वर्चुअलाइज़्ड लिस्ट्स के लिए बिल्ट-इन सपोर्ट, जो वर्चुअलाइज़्ड टेबल व्यूपोर्ट से बाहर स्क्रॉल होने वाले आइटम्स के लिए कैश डिस्कार्ड कर सकता है। यदि आप `useCallback` को परफॉर्मेंस ऑप्टिमाइज़ेशन के लिए उपयोग कर रहे हैं, तो यह आपके अपेक्षाओं के अनुरूप होना चाहिए। अन्यथा, [स्टेट वेरिएबल](/reference/react/useState#im-trying-to-set-state-to-a-function-but-it-gets-called-instead) या [रेफ़](/reference/react/useRef#avoiding-recreating-the-ref-contents) बेहतर विकल्प हो सकता है।

---

## Usage {/*usage*/}

### कौम्पोनॅन्ट की री-रेंडरिंग को स्किप करना {/*skipping-re-rendering-of-components*/}

जब आप रेंडर परफॉर्मेंस को ऑप्टिमाइज़ करते हैं, तो चाइल्ड कौम्पोनॅन्ट को पास किए गए फंक्शन्स को कैश करना कभी-कभी ज़रूरी होता है। पहले इसका सिंटैक्स देखें, फिर समझें कि यह कब उपयोगी है।

अपने कौम्पोनॅन्ट के रेंडर के बीच फंक्शन को कैश करने के लिए, उसकी डेफिनिशन को `useCallback` हुक में रैप करें:

```js [[3, 4, "handleSubmit"], [2, 9, "[productId, referrer]"]]
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  // ...
```

`useCallback` को दो चीज़ें पास करनी होंगी:

1. फंक्शन डेफिनिशन, जिसे आप रेंडर के बीच कैश करना चाहते हैं।
2. <CodeStep step={2}>डिपेंडेंसीज़ की सूची</CodeStep>, जिसमें आपके कौम्पोनॅन्ट के वे सभी वैल्यूज़ शामिल हों जो इस फंक्शन में उपयोग हुए हैं।

पहले रेंडर में, `useCallback` से <CodeStep step={3}>रिटर्न किया गया फंक्शन</CodeStep> वही होता है जो आपने पास किया है।

अगले रेंडर में, React आपके द्वारा इस रेंडर में पास की गई <CodeStep step={2}>डिपेंडेंसीज़</CodeStep> की तुलना पिछले रेंडर से करता है। यदि डिपेंडेंसीज़ नहीं बदली हैं (तुलना [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) से होती है), तो `useCallback` पिछले रेंडर का फंक्शन रिटर्न करता है। यदि डिपेंडेंसीज़ बदल गई हैं, तो React इस रेंडर में पास किया गया नया फंक्शन रिटर्न करता है।

संक्षेप में, `useCallback` फंक्शन को रेंडर के बीच कैश करता है जब तक डिपेंडेंसीज़ न बदलें।

**उदाहरण से समझें कि यह कब उपयोगी है।**

मान लें आप `ProductPage` कौम्पोनॅन्ट से `handleSubmit` फंक्शन को `ShippingForm` कौम्पोनॅन्ट में पास कर रहे हैं:

```js {5}
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
```

आपने नोटिस किया कि `theme` प्रॉप को टॉगल करने पर ऐप कुछ देर के लिए फ़्रीज़ हो जाता है। लेकिन यदि आप `<ShippingForm />` को JSX से हटा देते हैं, तो ऐप तेज़ हो जाता है। इससे पता चलता है कि `ShippingForm` को ऑप्टिमाइज़ करना फ़ायदेमंद हो सकता है।

**डिफॉल्ट रूप से, जब कोई कौम्पोनॅन्ट री-रेंडर होता है, तो React उसके सभी चाइल्ड कौम्पोनॅन्ट्स को रिकर्सिवली री-रेंडर करता है।** इसलिए जब `ProductPage` अलग `theme` के साथ री-रेंडर होता है, तो `ShippingForm` भी री-रेंडर होता है। यदि चाइल्ड कौम्पोनॅन्ट हल्का है, तो यह सामान्य है। लेकिन यदि आपने चेक किया और पाया कि री-रेंडर धीमा है, तो आप `ShippingForm` को [`memo`](/reference/react/memo) से रैप करके बता सकते हैं कि यदि उसके प्रॉप्स पिछले रेंडर जैसे ही हैं, तो री-रेंडर स्किप करें:

```js {3,5}
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

**इस बदलाव के बाद, `ShippingForm` तभी री-रेंडर होगा जब उसके प्रॉप्स पिछले रेंडर से अलग होंगे।** यहाँ फंक्शन को कैश करना महत्वपूर्ण हो जाता है! मान लीजिए आपने `handleSubmit` को `useCallback` के बिना डिक्लेयर किया है:

```js {2,3,8,12-13}
function ProductPage({ productId, referrer, theme }) {
  // हर बार theme बदलेगा, यह एक नया फंक्शन होगा...
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      {/* ...इसलिए ShippingForm के प्रॉप्स हमेशा बदलेंगे और यह हर बार री-रेंडर होगा */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**जावास्क्रिप्ट में, `function () {}` या `() => {}` हर बार एक *नया* फंक्शन बनाता है**, जैसे `{}` हर बार नया ऑब्जेक्ट बनाता है। सामान्यतः यह समस्या नहीं है, लेकिन इसका मतलब है कि `ShippingForm` के प्रॉप्स कभी समान नहीं होंगे, और आपकी [`memo`](/reference/react/memo) ऑप्टिमाइज़ेशन काम नहीं करेगी। यही वह स्थिति है जहाँ `useCallback` उपयोगी है:

```js {2,3,8,12-13}
function ProductPage({ productId, referrer, theme }) {
  // React को बताएँ कि फंक्शन को रेंडर के बीच कैश करना है...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ...ताकि जब तक डिपेंडेंसीज़ न बदलें...

  return (
    <div className={theme}>
      {/* ...ShippingForm को समान प्रॉप्स मिलें और यह री-रेंडर स्किप कर सके */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**`handleSubmit` को `useCallback` में रैप करने से आप सुनिश्चित करते हैं कि यह रेंडर के बीच वही फंक्शन रहे** (जब तक डिपेंडेंसीज़ न बदलें)। आपको फंक्शन को `useCallback` से रैप करना ज़रूरी नहीं है जब तक इसके लिए विशिष्ट कारण न हो। इस उदाहरण में कारण यह है कि आप इसे [`memo`](/reference/react/memo) से रैप किए गए कौम्पोनॅन्ट को पास कर रहे हैं, ताकि वह री-रेंडर स्किप कर सके। अन्य कारण इस पेज पर आगे बताए गए हैं।

<Note>

**`useCallback` का उपयोग केवल परफॉर्मेंस ऑप्टिमाइज़ेशन के लिए करें।** यदि आपका कोड इसके बिना काम नहीं कर रहा, तो पहले मूल समस्या ढूंढें और ठीक करें। फिर `useCallback` का उपयोग करें।

</Note>

<DeepDive>

#### `useCallback` का `useMemo` से क्या संबंध है? {/*how-is-usecallback-related-to-usememo*/}

`useCallback` अक्सर [`useMemo`](/reference/react/useMemo) के साथ उपयोग होता है। दोनों चाइल्ड कौम्पोनॅन्ट की परफॉर्मेंस ऑप्टिमाइज़ करने में उपयोगी हैं। ये आपको नीचे पास की गई वैल्यूज़ को [मेमोइज़](https://en.wikipedia.org/wiki/Memoization) (कैश) करने की सुविधा देते हैं:

```js {6-8,10-15,19}
import { useMemo, useCallback } from 'react';

function ProductPage({ productId, referrer }) {
  const product = useData('/product/' + productId);

  const requirements = useMemo(() => { // आपके फंक्शन को कॉल करता है और उसके रिजल्ट को कैश करता है
    return computeRequirements(product);
  }, [product]);

  const handleSubmit = useCallback((orderDetails) => { // फंक्शन को खुद कैश करता है
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm requirements={requirements} onSubmit={handleSubmit} />
    </div>
  );
}
```

दोनों में अंतर यह है कि ये क्या कैश करते हैं:

* **[`useMemo`](/reference/react/useMemo) आपके फंक्शन को कॉल करने के बाद मिले *रिजल्ट* को कैश करता है।** इस उदाहरण में, यह `computeRequirements(product)` के रिजल्ट को कैश करता है, ताकि यह तब तक न बदले जब तक `product` न बदले। इससे आप बिना ज़रूरत के `ShippingForm` को री-रेंडर किए `requirements` ऑब्जेक्ट को नीचे पास कर सकते हैं। ज़रूरत पड़ने पर, React आपके फंक्शन को रेंडर के दौरान कॉल करके रिजल्ट को फिर से कैलकुलेट करता है।

* **`useCallback` फंक्शन को *खुद* कैश करता है।** यह `useMemo` की तरह आपके फंक्शन को कॉल नहीं करता। बल्कि, आपके द्वारा दिए गए फंक्शन (`handleSubmit`) को कैश करता है, ताकि यह तब तक न बदले जब तक `productId` या `referrer` न बदलें। इससे आप बिना ज़रूरत के `ShippingForm` को री-रेंडर किए `handleSubmit` को नीचे पास कर सकते हैं। यह कोड तब तक नहीं चलेगा जब तक यूज़र फ़ॉर्म सबमिट न करे।

यदि आप [`useMemo`](/reference/react/useMemo) से परिचित हैं, तो `useCallback` को इस तरह समझ सकते हैं:

<<<<<<< HEAD
```js
// आसान इम्प्लिमेंटेशन (React में कुछ ऐसा होता है)
=======
```js {expectedErrors: {'react-compiler': [3]}}
// Simplified implementation (inside React)
>>>>>>> 1207ee36e1c7e3f2737d8f1022015473ffa99adf
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

[`useMemo` और `useCallback` के बीच अंतर के बारे में और पढ़ें।](/reference/react/useMemo#memoizing-a-function)

</DeepDive>

<DeepDive>

#### क्या हर जगह `useCallback` जोड़ना चाहिए? {/*should-you-add-usecallback-everywhere*/}

<<<<<<< HEAD
यदि आपका ऐप इस साइट जैसा है, और ज़्यादातर इंटरैक्शन्स मोटे स्तर के हैं (जैसे पूरे पेज या सेक्शन को रिप्लेस करना), तो सामान्यतः मेमोइज़ेशन की ज़रूरत नहीं होती। लेकिन यदि आपका ऐप ड्रॉइंग एडिटर जैसा है और इंटरैक्शन्स छोटे स्तर के हैं (जैसे शेप्स को मूव करना), तो मेमोइज़ेशन बहुत मददगार हो सकता है।

`useCallback` से फंक्शन को कैश करना केवल कुछ स्थितियों में उपयोगी है:
=======
If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful.

Caching a function with `useCallback` is only valuable in a few cases:
>>>>>>> 1207ee36e1c7e3f2737d8f1022015473ffa99adf

* जब आप इसे किसी [`memo`](/reference/react/memo) में रैप किए गए कौम्पोनॅन्ट को प्रॉप के रूप में पास करते हैं। आप चाहते हैं कि वैल्यू न बदलने पर री-रेंडरिंग स्किप हो जाए। मेमोइज़ेशन से कौम्पोनॅन्ट तभी री-रेंडर होगा जब उसकी डिपेंडेंसीज़ बदलेंगी।
* जब आपका पास किया हुआ फंक्शन किसी हुक की डिपेंडेंसी के रूप में उपयोग होता है। उदाहरण के लिए, किसी दूसरे `useCallback` में रैप किए गए फंक्शन की डिपेंडेंसी के रूप में, या [`useEffect`](/reference/react/useEffect) की डिपेंडेंसी के रूप में।

अन्य मामलों में `useCallback` से फंक्शन को रैप करने का विशेष फ़ायदा नहीं है। हालाँकि ऐसा करने से बड़ा नुकसान भी नहीं होता, लेकिन कोड कम रीडेबल हो सकता है। साथ ही, हर मेमोइज़ेशन प्रभावी नहीं होता: एक भी "हर बार नई" वैल्यू पूरे कौम्पोनॅन्ट के मेमोइज़ेशन को बेकार कर सकती है।

ध्यान दें कि `useCallback` फंक्शन को *बनने* से नहीं रोकता। आप हमेशा नया फंक्शन बना रहे होते हैं (यह सामान्य है!), लेकिन React इसे इग्नोर करता है और यदि कुछ नहीं बदला तो कैश्ड फंक्शन रिटर्न करता है।

**नीचे दिए गए सिद्धांतों को फॉलो करके आप काफी मेमोइज़ेशन को अनावश्यक बना सकते हैं:**

<<<<<<< HEAD
1. जब कोई कौम्पोनॅन्ट अन्य कौम्पोनॅन्ट्स को विज़ुअली रैप करता है, तो उसे [JSX को चिल्ड्रन के रूप में स्वीकार](/learn/passing-props-to-a-component#passing-jsx-as-children) करने दें। इससे यदि रैपर कौम्पोनॅन्ट अपने स्टेट को अपडेट करता है, तो React जानता है कि उसके चिल्ड्रन को री-रेंडर करने की ज़रूरत नहीं है।
=======
1. When a component visually wraps other components, let it [accept JSX as children.](/learn/passing-props-to-a-component#passing-jsx-as-children) Then, if the wrapper component updates its own state, React knows that its children don't need to re-render.
2. Prefer local state and don't [lift state up](/learn/sharing-state-between-components) any further than necessary. Don't keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3. Keep your [rendering logic pure.](/learn/keeping-components-pure) If re-rendering a component causes a problem or produces some noticeable visual artifact, it's a bug in your component! Fix the bug instead of adding memoization.
4. Avoid [unnecessary Effects that update state.](/learn/you-might-not-need-an-effect) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5. Try to [remove unnecessary dependencies from your Effects.](/learn/removing-effect-dependencies) For example, instead of memoization, it's often simpler to move some object or a function inside an Effect or outside the component.
>>>>>>> 1207ee36e1c7e3f2737d8f1022015473ffa99adf

2. लोकल स्टेट का उपयोग करें और ज़रूरत से ज़्यादा [स्टेट को ऊपर न ले जाएँ](/learn/sharing-state-between-components)। फ़ॉर्म जैसे ट्रांज़िएंट स्टेट या आइटम होवर की जानकारी जैसे स्टेट्स को कौम्पोनॅन्ट ट्री के सबसे ऊपर या ग्लोबल स्टेट लाइब्रेरी में न रखें।

3. अपने [रेंडरिंग लॉजिक को प्योर रखें](/learn/keeping-components-pure)। यदि कौम्पोनॅन्ट के री-रेंडर होने पर समस्या होती है या विज़ुअल ग्लिच दिखता है, तो यह कौम्पोनॅन्ट का बग है। मेमोइज़ेशन जोड़ने के बजाय बग को ठीक करें।

4. [अनावश्यक स्टेट अपडेट्स करने वाले इफ़ेक्ट्स](/learn/you-might-not-need-an-effect) से बचें। React ऐप्स की अधिकतर परफॉर्मेंस समस्याएँ ऐसे इफ़ेक्ट्स से होती हैं जो अपडेट की चेन शुरू करते हैं, जिससे कौम्पोनॅन्ट बार-बार रेंडर होते हैं।

5. इफ़ेक्ट्स में से [अनावश्यक डिपेंडेंसीज़ हटाएँ](/learn/removing-effect-dependencies)। उदाहरण के लिए, मेमोइज़ेशन की बजाय ऑब्जेक्ट या फंक्शन को इफ़ेक्ट के अंदर या कौम्पोनॅन्ट के बाहर रखना आसान होता है।

यदि इसके बाद भी कोई इंटरैक्शन धीमा लगता है, तो [React Developer Tools प्रोफ़ाइलर](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) का उपयोग करें ताकि पता लगे कि कौन-से कौम्पोनॅन्ट्स मेमोइज़ेशन से सबसे ज़्यादा लाभ पा सकते हैं, और ज़रूरत के हिसाब से मेमोइज़ेशन जोड़ें। इन सिद्धांतों को अपनाने से आपके कौम्पोनॅन्ट्स को डिबग करना और समझना आसान होगा। लंबे समय के लिए, हम [मेमोइज़ेशन को ऑटोमैटिकली करने पर रिसर्च](https://www.youtube.com/watch?v=lGEMwh32soc) कर रहे हैं।

</DeepDive>

<Recipes titleText="useCallback और फंक्शन को डायरेक्टली डिक्लेयर करने में अंतर" titleId="examples-rerendering">

#### `useCallback` और `memo` के साथ री-रेंडरिंग स्किप करना {/*skipping-re-rendering-with-usecallback-and-memo*/}

इस उदाहरण में, `ShippingForm` कौम्पोनॅन्ट को **जानबूझकर धीमा किया गया है** ताकि आप देख सकें कि जब कोई React कौम्पोनॅन्ट वास्तव में धीमा हो, तब क्या होता है। काउंटर बढ़ाने और थीम को टॉगल करने की कोशिश करें।

काउंटर बढ़ाना धीमा लगता है क्योंकि यह जानबूझकर धीमे किए गए `ShippingForm` को री-रेंडर करने पर मजबूर करता है। यह अपेक्षित है क्योंकि काउंटर बदला है, और आपको स्क्रीन पर यूज़र की नई पसंद दिखानी होगी।

अब थीम को टॉगल करने की कोशिश करें। **`useCallback` और [`memo`](/reference/react/memo) की मदद से, यह तेज़ी से काम करता है, भले ही `ShippingForm` धीमा हो!** `ShippingForm` ने री-रेंडर स्किप कर दिया क्योंकि `handleSubmit` फंक्शन में कोई बदलाव नहीं हुआ। `handleSubmit` फंक्शन नहीं बदला क्योंकि `productId` और `referrer` (आपके `useCallback` की डिपेंडेंसीज़) पिछले रेंडर से अब तक नहीं बदली हैं।


<Sandpack>

```js src/App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        डार्क मोड
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/ProductPage.js active
import { useCallback } from 'react';
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
 // कल्पना करें कि यह कोई रिक्वेस्ट भेजता है...
  console.log('POST /' + url);
  console.log(data);
}
```

```js {expectedErrors: {'react-compiler': [7, 8]}} src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('[कृत्रिम रूप से धीमा] <ShippingForm /> रेंडर हो रहा है');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // 500 ms तक कुछ न करें ताकि बेहद धीमे कोड का अनुकरण हो
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><b>नोट: <code>ShippingForm</code> को जानबूझकर धीमा किया गया है!</b></p>
      <label>
        आइटम्स की संख्या:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        सड़क:
        <input name="street" />
      </label>
      <label>
        शहर:
        <input name="city" />
      </label>
      <label>
        पिन कोड:
        <input name="zipCode" />
      </label>
      <button type="submit">सबमिट</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

<Solution />

#### कौम्पोनॅन्ट को हमेशा री-रेंडर करना {/*always-re-rendering-a-component*/}

इस उदाहरण में, `ShippingForm` की इम्प्लिमेंटेशन को **जानबूझकर धीमा किया गया है**, ताकि आप देख सकें कि जब कोई React कौम्पोनॅन्ट वास्तव में धीमा हो, तब क्या होता है। काउंटर बढ़ाने और थीम को टॉगल करने की कोशिश करें।

पिछले उदाहरण के विपरीत, अब थीम को टॉगल करना भी धीमा है! इसका कारण यह है कि **इस वर्ज़न में `useCallback` का उपयोग नहीं किया गया है,** इसलिए `handleSubmit` हर बार नया फंक्शन बनता है, और धीमा किया गया `ShippingForm` कौम्पोनॅन्ट री-रेंडरिंग स्किप नहीं कर पाता।

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        डार्क मोड
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/ProductPage.js active
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // कल्पना करें कि यह कोई रिक्वेस्ट भेजता है...
  console.log('POST /' + url);
  console.log(data);
}
```

```js {expectedErrors: {'react-compiler': [7, 8]}} src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('[कृत्रिम रूप से धीमा] <ShippingForm /> रेंडर हो रहा है');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // 500 ms तक कुछ न करें ताकि बेहद धीमे कोड का अनुकरण हो
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><b>नोट: <code>ShippingForm</code> को जानबूझकर धीमा किया गया है!</b></p>
      <label>
        आइटम्स की संख्या:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        सड़क:
        <input name="street" />
      </label>
      <label>
        शहर:
        <input name="city" />
      </label>
      <label>
        पिन कोड:
        <input name="zipCode" />
      </label>
      <button type="submit">सबमिट</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

लेकिन यहाँ वही कोड है **जिसमें जानबूझकर किया गया धीमापन हटा दिया गया है।** क्या अब `useCallback` का न होना आपको स्पष्ट रूप से महसूस होता है या नहीं?


<Sandpack>

```js src/App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type=" FacetGrid
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        डार्क मोड
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/ProductPage.js active
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // कल्पना करें कि यह कोई रिक्वेस्ट भेजता है...
  console.log('POST /' + url);
  console.log(data);
}
```

```js src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('<ShippingForm /> रेंडर हो रहा है');

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        आइटम्स की संख्या:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        सड़क:
        <input name="street" />
      </label>
      <label>
        शहर:
        <input name="city" />
      </label>
      <label>
        पिन कोड:
        <input name="zipCode" />
      </label>
      <button type="submit">सबमिट</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>
अक्सर बिना मेमोइज़ेशन वाला कोड भी ठीक चलता है। यदि आपके इंटरैक्शन्स पहले से ही तेज़ हैं, तो मेमोइज़ेशन की ज़रूरत नहीं होती।

ध्यान रखें कि आपको React को प्रोडक्शन मोड में चलाना चाहिए, [React Developer Tools](/learn/react-developer-tools) को डिसएबल करना चाहिए, और उन डिवाइसेस का उपयोग करना चाहिए जो आपके ऐप के यूज़र इस्तेमाल करते हैं। इससे आपको वास्तव में समझ आएगा कि आपका ऐप क्या धीमा कर रहा है।


<Solution />

</Recipes>

---

### मेमोइज़्ड कॉलबैक से स्टेट अपडेट करना {/*updating-state-from-a-memoized-callback*/}

कभी-कभी आपको मेमोइज़्ड कॉलबैक के अंदर पिछले स्टेट के आधार पर स्टेट अपडेट करना पड़ सकता है।

यह `handleAddTodo` फंक्शन `todos` को डिपेंडेंसी के रूप में निर्दिष्ट करता है क्योंकि यह इससे अगली todos की गणना करता है:

```js {6,7}
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
  // ...
```

आप चाहेंगे कि मेमोइज़्ड फंक्शन्स में कम से कम डिपेंडेंसीज़ हों। यदि आप स्टेट को केवल अगली स्टेट निकालने के लिए पढ़ रहे हैं, तो डिपेंडेंसी हटा सकते हैं। इसके लिए [अपडेटर फंक्शन](/reference/react/useState#updating-state-based-on-the-previous-state) पास करें:

```js {6,7}
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ todos डिपेंडेंसी की ज़रूरत नहीं
  // ...
```

यहाँ, `todos` को डिपेंडेंसी बनाने और पढ़ने के बजाय, आप React को निर्देश पास करते हैं कि स्टेट को *कैसे* अपडेट करना है (`todos => [...todos, newTodo]`)। [अपडेटर फंक्शन्स के बारे में और पढ़ें।](/reference/react/useState#updating-state-based-on-the-previous-state)

---

### इफ़ेक्ट को बार-बार चलने से रोकना {/*preventing-an-effect-from-firing-too-often*/}

कभी-कभी आपको [इफ़ेक्ट](/learn/synchronizing-with-effects) के अंदर फंक्शन कॉल करने की ज़रूरत पड़ सकती है:

```js {4-9,12}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    // ...
```

यह समस्या पैदा करता है। [हर रिएक्टिव वैल्यू को इफ़ेक्ट की डिपेंडेंसी के रूप में डिक्लेयर करना ज़रूरी है।](/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) लेकिन यदि आप `createOptions` को डिपेंडेंसी के रूप में डिक्लेयर करते हैं, तो यह इफ़ेक्ट को बार-बार चैट रूम से री-कनेक्ट करने का कारण बनेगा:

```js {6}
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🔴 समस्या: यह डिपेंडेंसी हर रेंडर पर बदलती है
  // ...
```

इस समस्या को हल करने के लिए, जिस फंक्शन को इफ़ेक्ट से कॉल करना है, उसे `useCallback` में रैप करें:

```js {4-9,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ केवल जब roomId बदलता है

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ केवल जब createOptions बदलता है
  // ...
```

यह सुनिश्चित करता है कि यदि `roomId` समान है, तो रेंडर के बीच `createOptions` फंक्शन वही रहता है। **हालाँकि, इससे बेहतर यह है कि फंक्शन डिपेंडेंसी की ज़रूरत ही खत्म कर दी जाए।** इसके लिए फंक्शन को इफ़ेक्ट के *अंदर* ले जाएँ:

```js {5-10,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // ✅ useCallback या फंक्शन डिपेंडेंसीज़ की ज़रूरत नहीं!
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ केवल जब roomId बदलता है
  // ...
```

अब आपका कोड सरल हो गया है और इसमें `useCallback` की ज़रूरत नहीं है। [इफ़ेक्ट डिपेंडेंसीज़ हटाने के बारे में और जानें।](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)

---

### कस्टम हुक को ऑप्टिमाइज़ करना {/*optimizing-a-custom-hook*/}

यदि आप [कस्टम हुक](/learn/reusing-logic-with-custom-hooks) लिख रहे हैं, तो सुझाव है कि उसमें रिटर्न होने वाले फंक्शन्स को `useCallback` में रैप करें:

```js {4-6,8-10}
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```

यह सुनिश्चित करता है कि आपके हुक के यूज़र्स ज़रूरत पड़ने पर अपने कोड को ऑप्टिमाइज़ कर सकें।

---

## समस्या निवारण {/*troubleshooting*/}

### हर बार मेरे कौम्पोनॅन्ट के रेंडर होने पर `useCallback` नया फंक्शन रिटर्न करता है {/*every-time-my-component-renders-usecallback-returns-a-different-function*/}

सुनिश्चित करें कि आपने डिपेंडेंसी ऐरे को दूसरे आर्ग्यूमेंट के रूप में निर्दिष्ट किया है!

यदि आप डिपेंडेंसी ऐरे भूल जाते हैं, तो `useCallback` हर बार नया फंक्शन रिटर्न करेगा:

```js {7}
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }); // 🔴 हर बार नया फंक्शन रिटर्न करता है: डिपेंडेंसी ऐरे नहीं दिया
  // ...
```

यह सही वर्ज़न है जिसमें डिपेंडेंसी ऐरे दूसरा आर्ग्यूमेंट है:

```js {7}
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ✅ बिना वजह नया फंक्शन नहीं रिटर्न करता
  // ...
```

यदि इससे समस्या हल नहीं होती, तो शायद कोई डिपेंडेंसी पिछले रेंडर से अलग है। आप डिपेंडेंसीज़ को कंसोल में मैन्युअली लॉग करके डिबग कर सकते हैं:

```js {5}
  const handleSubmit = useCallback((orderDetails) => {
    // ..
  }, [productId, referrer]);

  console.log([productId, referrer]);
```

इसके बाद, कंसोल में अलग-अलग रेंडर्स की ऐरे पर राइट-क्लिक करें और दोनों को "Store as a global variable" के रूप में सेव करें। मान लें पहली ऐरे `temp1` और दूसरी `temp2` के रूप में सेव हुई, तो आप ब्राउज़र कंसोल में चेक कर सकते हैं कि दोनों ऐरे की डिपेंडेंसीज़ समान हैं या नहीं:

```js
Object.is(temp1[0], temp2[0]); // क्या पहली डिपेंडेंसी समान है?
Object.is(temp1[1], temp2[1]); // क्या दूसरी डिपेंडेंसी समान है?
Object.is(temp1[2], temp2[2]); // ...और इसी तरह हर डिपेंडेंसी के लिए...
```

जब आपको पता चल जाए कि कौन-सी डिपेंडेंसी मेमोइज़ेशन तोड़ रही है, तो उसे हटाने का तरीका ढूंढें या [उसे भी मेमोइज़ करें](/reference/react/useMemo#memoizing-a-dependency-of-another-hook)।

---

### मुझे लिस्ट में हर आइटम के लिए `useCallback` कॉल करना है, लेकिन यह अनुमति नहीं है {/*i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed*/}

मान लें `Chart` कौम्पोनॅन्ट को [`memo`](/reference/react/memo) में रैप किया गया है। आप चाहते हैं कि `ReportList` कौम्पोनॅन्ट के री-रेंडर होने पर लिस्ट में हर `Chart` का री-रेंडर स्किप हो जाए। लेकिन आप लूप के अंदर `useCallback` कॉल नहीं कर सकते:

```js {expectedErrors: {'react-compiler': [6]}} {5-14}
function ReportList({ items }) {
  return (
    <article>
      {items.map(item => {
        // 🔴 लूप के अंदर useCallback कॉल नहीं कर सकते:
        const handleClick = useCallback(() => {
          sendReport(item)
        }, [item]);

        return (
          <figure key={item.id}>
            <Chart onClick={handleClick} />
          </figure>
        );
      })}
    </article>
  );
}
```

इसके बजाय, विशिष्ट आइटम के लिए अलग कौम्पोनॅन्ट बनाएँ और उसमें `useCallback` रखें:

```js {5,12-21}
function ReportList({ items }) {
  return (
    <article>
      {items.map(item =>
        <Report key={item.id} item={item} />
      )}
    </article>
  );
}

function Report({ item }) {
  // ✅ टॉप लेवल पर useCallback कॉल करें:
  const handleClick = useCallback(() => {
    sendReport(item)
  }, [item]);

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
}
```

या फिर, आप `useCallback` हटा सकते हैं और `Report` कौम्पोनॅन्ट को [`memo`](/reference/react/memo) में रैप कर सकते हैं। यदि `item` प्रॉप नहीं बदलता, तो `Report` री-रेंडर स्किप करेगा, जिससे `Chart` भी री-रेंडर स्किप कर देगा:

```js {5,6-8,15}
function ReportList({ items }) {
  // ...
}

const Report = memo(function Report({ item }) {
  function handleClick() {
    sendReport(item);
  }

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
});
```

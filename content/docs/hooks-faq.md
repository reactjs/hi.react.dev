---
id: hooks-faq
title: Hooks FAQ
permalink: docs/hooks-faq.html
prev: hooks-reference.html
---

*Hooks* React 16.8 में जोड़ा गया है जो, आपको बिना क्लास कौम्पोनॅन्ट के state और अन्य React फीचर्स का उपयोग करने सुविधा देते हैं

यह पेज [Hooks](/docs/hooks-overview.html) के बारे में अक्सर पूछे जाने वाले प्रश्नों के उत्तर देता है

<!--
  if you ever need to regenerate this, this snippet in the devtools console might help:

  $$('.anchor').map(a =>
    `${' '.repeat(2 * +a.parentNode.nodeName.slice(1))}` +
    `[${a.parentNode.textContent}](${a.getAttribute('href')})`
  ).join('\n')
-->

* **[एडॉप्शन स्ट्रेटेजी](#adoption-strategy)**
  * [React के कौन से संस्करणों में Hooks शामिल हैं?](#which-versions-of-react-include-hooks)
  * [क्या मुझे अपने सभी क्लास कॉम्पोनेन्ट को फिर से लिखना होगा?](#do-i-need-to-rewrite-all-my-class-components)
  * [मैं Hooks के साथ क्या कर सकता हूं जो मैं क्लासेज के साथ नहीं कर सकता हूं?](#what-can-i-do-with-hooks-that-i-couldnt-with-classes)
  * [मेरा React ज्ञान कितना रिलेवेंट है?](#how-much-of-my-react-knowledge-stays-relevant)
  * [क्या मुझे Hook, क्लासेज या दोनों का मिश्रण इस्तेमाल करना चाहिए?](#should-i-use-hooks-classes-or-a-mix-of-both)
  * [क्या Hooks, क्लासेज के सारे उपयोगों को कवर करता है?](#do-hooks-cover-all-use-cases-for-classes)
  * [क्या Hooks रेंडर props और हायर आर्डर कौम्पोनॅन्टस को रेप्लस करता है?](#do-hooks-replace-render-props-and-higher-order-components)
  * [पॉपुलर APIs जैसे Redux connect() और React Router के लिए React के मायने?](#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router)
  * [क्या Hooke स्टैटिक टाइपिंग के साथ काम करता है?](#do-hooks-work-with-static-typing)
  * [Hooks का इस्तेमाल करते वाले कौम्पोनॅन्टस का टेस्ट कैसे करें?](#how-to-test-components-that-use-hooks)
  * [लिंट नियम क्या लागू करते हैं?](#what-exactly-do-the-lint-rules-enforce)
* **[क्लासेज से हूक्स तक](#from-classes-to-hooks)**
  * [लाइफ साइकिल मेथड्स Hooks को कैसे करेस्पॉन्ड करते हैं?](#how-do-lifecycle-methods-correspond-to-hooks)
  * [Hooks के द्वारा डाटा फेचिंग कैसे करें?](#how-can-i-do-data-fetching-with-hooks)
  * [क्या इंस्टैंस वेरिएबल की तरह कुछ है?](#is-there-something-like-instance-variables)
  * [एक या एक से ज्यादा state वेरिएबल का इस्तेमाल करना चाहिए?](#should-i-use-one-or-many-state-variables)
  * [क्या इफेक्ट को सिर्फ उपडटेस के बाद इस्तेमाल करना चाहिए?](#can-i-run-an-effect-only-on-updates)
  * [पिछले props या state को कैसे प्राप्त करें?](#how-to-get-the-previous-props-or-state)
  * [पुराने स्टेट्स और props का फंक्शन में दिखने का क्या मतलब है?](#why-am-i-seeing-stale-props-or-state-inside-my-function)
  * [getDerivedStateFromProps कैसे इम्प्लीमेंट करें?](#how-do-i-implement-getderivedstatefromprops)
  * [क्या forceUpdate जैसा कुछ है?](#is-there-something-like-forceupdate)
  * [क्या फंक्शन कम्पोनेंट के लिए ref बना सकते हैं?](#can-i-make-a-ref-to-a-function-component)
  * [DOM नोड को कैसे मापेंगे?](#how-can-i-measure-a-dom-node)
  * [const, thing, setThing, useState() क्या करते हैं](#what-does-const-thing-setthing--usestate-mean)
* **[परफॉरमेंस ऑप्टिमिजाशंस](#performance-optimizations)**
  * [क्या अपडेट पर एक इफ़ेक्ट स्किप कर सकते हैं?](#can-i-skip-an-effect-on-updates)
  * [क्या डेपेंडेन्सीज़ की सूची से फंक्शन्स को छोड़ना सुरक्षित है?](#is-it-safe-to-omit-functions-from-the-list-of-dependencies)
  * [इफ़ेक्ट डेपेंडेन्सीज़ के बार बार बदलने की दशा में क्या करें?](#what-can-i-do-if-my-effect-dependencies-change-too-often)
  * [shouldComponentUpdate कैसे इम्प्लीमेंट करें?](#how-do-i-implement-shouldcomponentupdate)
  * [कॅल्क्युलेशन्स को कैसे memoize करें?](#how-to-memoize-calculations)
  * [एक्सपेंसिव ऑब्जेक्ट को लेज़ीली कैसे क्रिएट करें?](#how-to-create-expensive-objects-lazily)
  * [क्या रेंडर में फंक्शन क्रिएट करने की वजह से Hooks धीमा है?](#are-hooks-slow-because-of-creating-functions-in-render)
  * [कालबैकस को डाउन पास करने से कैसे बचें?](#how-to-avoid-passing-callbacks-down)
  * [कालबैक से बार बार बदलती हुई एक वैल्यू को कैसे रीड करें?](#how-to-read-an-often-changing-value-from-usecallback)
* **[अंडर द हुड](#under-the-hood)**
  * [कौम्पोनॅन्टस के साथ React सहयोगी Hook कैसे कॉल करता है?](#how-does-react-associate-hook-calls-with-components)
  * [Hooks के लिए पूर्व कला क्या है?](#what-is-the-prior-art-for-hooks)

## एडॉप्शन स्ट्रेटेजी {#adoption-strategy}

### React के कौन से संस्करणों में Hooks शामिल हैं? {#which-versions-of-react-include-hooks}

16.8.0 के साथ शुरू, React में React Hooks का एक स्टेबल इम्प्लीमेंटेशन शामिल है:

* React DOM
* React Native
* React DOM Server
* React Test Renderer
* React Shallow Renderer

ध्यान दें **hook को इस्तेमाल करने के लिए, सभी React पैकेज 16.8.0 या उच्चतर होना चाहिए**. यदि आप अपडेट करना भूल जाते हैं तो hook काम नहीं करेंगे, उदाहरण के लिए, React DOM पैकेज।

[React Native 0.59](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059) और उच्चतर Hook को सपोर्ट करते हैं।

### क्या मुझे अपने सभी क्लास कॉम्पोनेन्ट को फिर से लिखना होगा? {#do-i-need-to-rewrite-all-my-class-components}

नहीं, React से क्लासेज को हटाने का [कोई प्लान](/docs/hooks-intro.html#gradual-adoption-strategy) नहीं है, हम सभी को शिपिंग प्रोडक्ट को रखने की आवश्यकता है और वे फिर से लिखे नहीं जा सकते। हम नए कोड में Hook को शामिल करने की सलाह देते हैं।

### मैं Hooks के साथ क्या कर सकता हूं जो मैं क्लासेज के साथ नहीं कर सकता हूं? {#what-can-i-do-with-hooks-that-i-couldnt-with-classes}

["अपनी खुद की Hook का निर्माण"](/docs/hooks-custom.html) विभिन्न संभावनाओं की एक झलक प्रदान करता है। Hook कौम्पोनॅन्टस के बीच फंक्शनलिटी का री-यूज़ करने के लिए एक शक्तिशाली और नया अर्थपूर्ण तरीका प्रदान करते हैं। ["लेख"](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) में एक रिएक्ट कोर टीम के सदस्य द्वारा Hook द्वारा दिए जाने वाली नई क्षमताओं पर गहन अध्ययन।

### मेरा React ज्ञान कितना रिलेवेंट है? {#how-much-of-my-react-knowledge-stays-relevant}

Hook, आपके द्वारा पहले से ही पहचाने जाने वाले React फीचर्स का उपयोग करने के लिए एक सीधा तरीका है - जैसे कि state ,लाइफसाइकिल, रेफ्स और कॉन्टेक्स्ट। वे मूल रूप से React कैसे काम करता है इसमें कोई परिवर्तन नहीं करते हैं, और आपके कौम्पोनॅन्टस, props और टॉप-डाउन डेटा-फ्लो का ज्ञान पूरी तरह से रिलेवेंट है।

Hooks का अपना लर्निंग कर्व है। यदि इस डॉक्यूमेंटेशन में कुछ कमी है, तो [इशू रेज करें](https://github.com/reactjs/reactjs.org/issues/new) और हम मदद करने की कोशिश करेंगे।

### क्या मुझे Hook, क्लासेज या दोनों का मिश्रण इस्तेमाल करना चाहिए? {#should-i-use-hooks-classes-or-a-mix-of-both}

जब आप तैयार हों, तो हम आपके द्वारा लिखे गए नए कौम्पोनॅन्टस में Hook इम्प्लीमेंट की कोशिश करने के लिए प्रोत्साहित करेंगे। सुनिश्चित करें कि आपकी टीम में हर कोई उन्हें इस्तेमाल करने और इस डॉक्यूमेंटेशन से परिचित हों। जब तक आप उन्हें फिर से लिखने की योजना नहीं बनाते, हम आपके पहले से उपस्थित क्लासेज को हुक्स का इस्तेमाल कर के लिखने के लिए प्रोत्साहित नहीं करते(जैसे बग को ठीक करने के लिए)।

आप एक क्लास कॉम्पोनेन्ट *के अंदर Hook* का उपयोग नहीं कर सकते हैं, लेकिन आप निश्चित रूप से एक ही ट्री में Hook के साथ क्लासेज और फ़ंक्शन कौम्पोनॅन्टस को मिला सकते हैं। एक कॉम्पोनेन्ट एक क्लास या एक फ़ंक्शन है जो Hook का उपयोग करता है, उस कॉम्पोनेन्ट का कार्यान्वयन विवरण है। लंबी अवधि में, हम उम्मीद करते हैं कि प्राथमिक रूप से Hooks लोग के रिएक्ट कॉम्पोनेन्ट लिखने का तरीका बनेगा।

### क्या Hooks, क्लासेज के सारे उपयोगों को कवर करता है? {#do-hooks-cover-all-use-cases-for-classes}

हमारा लक्ष्य Hook के लिए जितनी जल्दी हो सके क्लासेज के सभी उपयोग के मामलों को कवर करना है। असामान्य `getSnapshotBeforeUpdate`, `getDerivedStateFromError` और `componentDidCatch` लाइफसाइकिल के लिए कोई Hook समकक्ष नहीं हैं, लेकिन हम जल्द ही इसे जोड़ने की योजना बना रहे हैं।

यह Hook के लिए एक प्रारंभिक समय है, और कुछ थर्ड-पार्टी लाइब्रेरीज इस समय Hook के अनुरूप नहीं हो सकते हैं।

### क्या Hooks रेंडर props और हायर आर्डर कौम्पोनॅन्टस को रेप्लस करता है? {#do-hooks-replace-render-props-and-higher-order-components}

अक्सर, props और उच्च-क्रम के कॉम्पोनेन्ट केवल एक ही चाइल्ड को प्रस्तुत करते हैं। हमें लगता है कि Hook इस उपयोग के मामले को पूरा करने का एक सरल तरीका है। दोनों पैटर्न के लिए अभी भी एक जगह है (उदाहरण के लिए, एक वर्चुअल स्कॉलर कंपोनेंट में एक `renderItem` प्रोप हो सकता है, या एक विज़ुअल कंटेनर कंपोनेंट की अपनी DOM स्ट्रक्चर हो सकती है)। लेकिन ज्यादातर मामलों में, Hook पर्याप्त होंगे और आपके ट्री में नेस्टिंग कम करने में मदद करेंगे।

### पॉपुलर APIs जैसे Redux connect() और React Router के लिए React के मायने? {#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router}

आप हमेशा के समान सटीक API का उपयोग जारी रख सकते हैं, वे काम करेंगे।

React Redux V7.1.0 के बाद से [हुक्स API का सपोर्ट करते हैं](https://react-redux.js.org/api/hooks) और `useDispatch` or `useSelector` जैसे हुक्स एक्सपोज़ करते हैं।

React Router v5.1 के बाद से [हुक्स का सपोर्ट करते हैं](https://reacttraining.com/react-router/web/api/Hooks) 

अन्य लाइब्रेरीज भी भविष्य में Hook का समर्थन कर सकते हैं।

### क्या Hook स्टैटिक टाइपिंग के साथ काम करता है? {#do-hooks-work-with-static-typing}

Hook को स्टैटिक टाइपिंग को ध्यान में रखकर डिजाइन किया गया था। क्योंकि वे कार्य कर रहे हैं, वे उच्च-क्रम के कौम्पोनॅन्टस जैसे पैटर्न की तुलना में सही प्रकार से लिखना आसान है। नवीनतम फ्लो और टाइपस्क्रिप्ट रिएक्ट डेफिनिशंस में रिएक्ट Hook के लिए समर्थन शामिल है।

महत्वपूर्ण बात यह है कि कस्टम Hook आपको React API को बाधित करने की शक्ति देता है यदि आप उन्हें किसी तरह से अधिक सख्ती से टाइप करना चाहते हैं। रिएक्ट आपको प्रिमितिवेस देता है, लेकिन आप उन्हें अलग-अलग तरीकों से जोड़ सकते हैं जो हम लीक से हटकर प्रदान करते हैं।

### Hooks का इस्तेमाल करते वाले कौम्पोनॅन्टस का टेस्ट कैसे करें? {#how-to-test-components-that-use-hooks}

रिएक्ट के दृष्टिकोण से, Hook का उपयोग करने वाला एक कॉम्पोनेन्ट सिर्फ एक रेगुलर कॉम्पोनेन्ट है। यदि आपका टेस्ट समाधान रिएक्ट इंटर्नल्स पर निर्भर नहीं करता है, तो Hook के साथ टेस्टिंग कम्पोनेंट आपको सामान्य रूप से कम्पोनेंट्स का टेस्ट करने के तरीके से अलग नहीं होना चाहिए।

> ध्यान दें
>
> [टेस्टिंग रेसिपीज](/docs/testing-recipes.html) कई उदाहरणों को शामिल करते हैं जिन्हें आप कॉपी और पेस्ट कर सकते हैं

उदाहरण के लिए, मान लें कि हमारे पास यह काउंटर कॉम्पोनेन्ट है:

```js
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

हम रिएक्ट डोम का उपयोग करके इसका टेस्ट करेंगे। यह सुनिश्चित करने के लिए कि ब्राउज़र में क्या बिहेवियर है, हम कोड रेंडरिंग को व्रैप और [ReactTestUtils.act()](/docs/test-utils.html#act) कॉल में अपडेट करेंगे:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and effect
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // Test second render and effect
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
```

`act()` के लिए कॉल भी उनके अंदर इफ़ेक्ट फ्लश जाएगा.

यदि आपको एक कस्टम Hook का टेस्ट करने की आवश्यकता है, तो आप अपने टेस्ट में एक कॉम्पोनेन्ट बनाकर, और उसमें अपने Hook का उपयोग करके ऐसा कर सकते हैं। फिर आप लिखे गए कॉम्पोनेन्ट का टेस्ट कर सकते हैं।

बॉयलरप्लेट को कम करने के लिए, हम [React टेस्टिंग लाइब्रेरी](https://testing-library.com/react) का उपयोग करने की सलाह देते हैं जो टेस्ट राइटिंग को प्रोत्साहित करने के लिए डिज़ाइन किया गया है जो आपके कौम्पोनॅन्टस का उपयोग एन्ड यूजर के रूप में करते हैं।

अधिक जानकारी के लिए [टेस्टिंग रेसिपीज़](/docs/testing-recipes.html) चेक करें।

### [लिंट नियम](https://www.npmjs.com/package/eslint-plugin-react-hooks) क्या लागू करते हैं? {#what-exactly-do-the-lint-rules-enforce}

हम बग्स से बचने के लिए एक प्लग-इन  [ESLint plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) जो [हुक्स के रूल्स](/docs/hooks-rules.html) लागू करते हैं। यह मानता है कि कोई भी फ़ंक्शन "`use`" और एक कैपिटल लेटर के बाद के शुरू होने वाला एक Hook है। हम पहचानते हैं कि यह अनुमान सही नहीं है और कुछ गलत सकारात्मक हो सकते हैं, लेकिन पारिस्थितिकी तंत्र के व्यापक सम्मेलन के बिना, Hook को अच्छी तरह से काम करने का कोई तरीका नहीं है - और लंबे समय तक लोग Hook को अपनाने या सम्मेलन का पालन करने से लोगों को हतोत्साहित करेंगे।

विशेष रूप से, नियम लागू होता है:

* Hook कॉल या तो एक `PascalCase` फ़ंक्शन (एक कॉम्पोनेन्ट माना जाता है) या किसी अन्य` useSomething` फ़ंक्शन (एक कस्टम Hook माना जाता है) के अंदर हैं।
* Hook हर रेंडर पर एक ही क्रम में कॉल किया जाता है।

कुछ और आंकड़े हैं, और वे समय के साथ बदल सकते हैं क्योंकि हम झूठी सकारात्मकता से बचने के साथ बग को खोजने के लिए नियम को ठीक करते हैं।

## क्लासेज से हूक्स तक {#from-classes-to-hooks}

### लाइफ साइकिल मेथड्स Hooks को कैसे करेस्पॉन्ड करते हैं? {#how-do-lifecycle-methods-correspond-to-hooks}

* `constructor`: फ़ंक्शन कौम्पोनॅन्टस को कंट्रक्टर की आवश्यकता नहीं है। आप [`useState`] (/ डॉक्स / Hook-संदर्भ.html # usestate) कॉल में इनिशियलाइज़ कर सकते हैं। यदि इनिशियल स्थिति की कंप्यूटिंग करना महंगा है, तो आप एक फ़ंक्शन को 'useState' में पास कर सकते हैं।

* `getDerivedStateFromProps`: इसके बजाय [रेंडर करते हुए](#how-do-i-implement-getderivedstatefromprops) को अपडेट शेड्यूल करें।

* `shouldComponentUpdate`: `React.memo` [देखें](#how-do-i-implement-shouldcomponentupdate).

* `render`: यह फंक्शन कंपोनेंट बॉडी है.

* `ComponentsDidMount`, `componentDidUpdate`, `ComponentsWillUnmount`: [` useEffect` हुक] कम आम मामलों सहित इनमें से सभी कॉम्बिनेशंस को एक्सप्रेस कर सकते हैं।

* `getSnapshotBeforeUpdate`, `componentDidCatch` और `getDerivedStateFromError`: इन विधियों के लिए कोई Hook समकक्ष नहीं हैं, लेकिन उन्हें जल्द ही जोड़ दिया जाएगा।

### Hooks के द्वारा डाटा फेचिंग कैसे करें? {#how-can-i-do-data-fetching-with-hooks}

आपकी शुरुआत के लिए एक [छोटा डेमो](https://codesandbox.io/s/jvvkoo8pq3). अधिक जानने के लिए, Hook के साथ डेटा फेच के बारे में [यह लेख](https://www.robinwieruch.de/react-hooks-fetch-data/) देखें।

### या इंस्टैंस वेरिएबल की तरह कुछ है? {#is-there-something-like-instance-variables}

हाँ, [useRef()](/docs/hooks-reference.html#useref) Hook केवल एक डॉम रेफ्स नहीं है। `ref` ऑब्जेक्ट एक सामान्य कंटेनर है, जिसका `current` प्रॉपर्टी परस्पर भिन्न होता है और किसी क्लास पर एक उदाहरण प्रॉपर्टी के समान किसी भी वैल्यू को होल्ड सकता है।

आप इसे `useEffect` के अंदर से लिख सकते हैं:

```js{2,8}
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

अगर हम सिर्फ एक इंटरवल निर्धारित करना चाहते हैं, तो हमें रेफ की आवश्यकता नहीं होगी (`id` इफ़ेक्ट के लिए लोकल हो सकती है), लेकिन यह उपयोगी है अगर हम एक इवेंट  हैंडलर से इंटरवल को क्लियर करना चाहते हैं।:

```js{3}
  // ...
  function handleCancelClick() {
    clearInterval(intervalRef.current);
  }
  // ...
```
वैचारिक रूप से, आप किसी क्लास में वेरिएबल के समान रेफ के बारे में सोच सकते हैं। जब तक आप [लेज़ी इनिशियलएसशन](#how-to-create-expensive-objects-lazily) नहीं कर रहे हैं, रेंडरिंग के दौरान रिफ सेट करने से बचें - इससे आश्चर्यजनक व्यवहार हो सकता है। इसके बजाय, आमतौर पर आप ईवेंट हैंडलर और इफ़ेक्ट्स में Refs को संशोधित कर सकते हैं। 

### एक या एक से ज्यादा state वेरिएबल का इस्तेमाल करना चाहिए? {#should-i-use-one-or-many-state-variables}

यदि आप क्लासेज का यूज़ करते आ रहे हैं, तो आपको हमेशा एक बार `useState()` को कॉल करने और सभी state को एक ही ऑब्जेक्ट में डालने की कोशिश कर के सामान बिहेवियर पाने की कोशिश करनी चाहिए। आप चाहें तो ऐसा कर सकते हैं। यहां एक कॉम्पोनेन्ट का उदाहरण है जो माउस मूवमेंट  फॉलो करता है। हम इसकी पोजीशन और साइज को लोकल state में रखते हैं:

```js
function Box() {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
  // ...
}
```

अब मान लें कि हम कुछ तर्क लिखना चाहते हैं जो यूजर के माउस को स्थानांतरित करने पर `left` और `top` बदलता है। ध्यान दें कि हमें इन फ़ील्ड्स को पिछली state ऑब्जेक्ट में मैन्युअल रूप से कैसे मर्ज करना है:

```js{4,5}
  // ...
  useEffect(() => {
    function handleWindowMouseMove(e) {
      // Spreading "...state" ensures we don't "lose" width and height
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    }
    // Note: this implementation is a bit simplified
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);
  // ...
```

ऐसा इसलिए है क्योंकि जब हम किसी state वैरिएबल को अपडेट करते हैं, तो हम उसकी वैल्यू को *रिप्लेस* करते हैं। यह एक क्लास में `this.setState` से अलग है, जो ऑब्जेक्ट में अपडेटेड फ़ील्ड को *मर्ज* करता है।

यदि आप आटोमेटिक मर्जिंग को मिस करते हैं, तो आप एक कस्टम `useLegacyState` Hook लिख सकते हैं जो ऑब्जेक्ट state अपडेट को मर्ज करता है। हालाँकि, **हम state को कई state वेरिएबल में विभाजित करने की सलाह देते हैं जिसके आधार पर वैल्यू एक साथ बदलते हैं।**

उदाहरण के लिए, हम अपने कंपोनेंट state को `position` और `size` ऑब्जेक्ट्स में विभाजित कर सकते हैं, और हमेशा `position` को बदलने की आवश्यकता नहीं है:

```js{2,7}
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
    }
    // ...
```

इंडिपेंडेंट state वेरिएबल को अलग करने का एक और लाभ भी है। उदाहरण के लिए, कस्टम Hook में बाद में कुछ संबंधित लॉजिक को एक्सट्रेक्ट करना आसान बनाता है:

```js{2,7}
function Box() {
  const position = useWindowPosition();
  const [size, setSize] = useState({ width: 100, height: 100 });
  // ...
}

function useWindowPosition() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    // ...
  }, []);
  return position;
}
```

ध्यान दें कि हम अपने कोड को बदले बिना एक कस्टम Hook में `position` state वेरिएबल और रिलेटेड इफ़ेक्ट के लिए `useState` कॉल को कैसे मूव करने में सक्षम थे। यदि सभी state एक ही ऑब्जेक्ट में थे, तो इसे निकालना अधिक कठिन होगा।

सभी state एक `useState` कॉल में रखने, और प्रत्येक फील्ड में एक `useState` कॉल, दोनों करने से काम चल सकता है। जब आप इन दो चरम सीमाओं और समूह से संबंधित state के बीच कुछ इंडिपेंडेंट state वेरिएबल में संतुलन पाते हैं, तो कॉम्पोनेन्ट सबसे अधिक रीडबल होते हैं। यदि state लॉजिक जटिल हो जाता है, तो हम इसे [रिड्यूसर के साथ मैनेज](/docs/hooks-reference.html#usereducer) या कस्टम Hook के साथ मैनेज करने की सलाह देते हैं।

### क्या इफेक्ट को सिर्फ उपडटेस के बाद इस्तेमाल करना चाहिए? {#can-i-run-an-effect-only-on-updates}

यह एक दुर्लभ उपयोग मामला है। यदि आपको इसकी आवश्यकता है, तो आप मैन्युअल रूप से बूलियन मान को स्टोर करने के लिए एक [म्यूटेबल रेफ का उपयोग](#is-there-something-like-instance-variables) कर सकते हैं, चाहे आप पहले या बाद के रेंडर पर हों, फिर उस फ्लैग को अपने प्रभाव में देखें। (यदि आप खुद को अक्सर ऐसा करते हुए पाते हैं, तो आप इसके लिए एक कस्टम Hook बना सकते हैं।)

### पिछले props या state को कैसे प्राप्त करें? {#how-to-get-the-previous-props-or-state}

वर्तमान में, आप इसे [रेफ के साथ](#is-there-something-like-instance-variables) मैन्युअल रूप से कर सकते हैं:

```js{6,8}
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Now: {count}, before: {prevCount}</h1>;
}
```

यह थोड़ा जटिल हो सकता है लेकिन आप इसे कस्टम Hook में एक्सट्रेक्ट कर सकते हैं:

```js{3,7}
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>Now: {count}, before: {prevCount}</h1>;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

ध्यान दें कि यह props, state या किसी अन्य कैलक्युलेटेड वैल्यू के लिए कैसे काम करेगा

```js{5}
function Counter() {
  const [count, setCount] = useState(0);

  const calculation = count + 100;
  const prevCalculation = usePrevious(calculation);
  // ...
```

यह संभव है कि भविष्य में रिएक्ट लीक से हटकर एक `usePrevious` प्रदान करेगा क्योंकि यह अपेक्षाकृत सामान्य उपयोग का मामला है।

[डेरिवेद state के लिए अनुशंसित पैटर्न](#how-do-i-implement-getderivedstatefromprops) भी देखें.

### पुराने स्टेट्स और props का फंक्शन में दिखने का क्या मतलब है? {#why-am-i-seeing-stale-props-or-state-inside-my-function}

एक कॉम्पोनेन्ट के अंदर कोई भी कार्य, जिसमें ईवेंट हैंडलर और इफेक्ट्स शामिल हैं, props को "रेंडर" करता है और रेंडर से state करता है कि यह किस तरह से बनाया गया था। उदाहरण के लिए, इस तरह कोड पर विचार करें।:

```js
function Example() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

यदि आप पहले "अलर्ट दिखाएं" पर क्लिक करते हैं और फिर काउंटर को बढ़ाते हैं, **जब आपने "अलर्ट दिखाएं" बटन पर क्लिक किया था तो अलर्ट `काउंट` वेरिएबल** दिखाएगा। यह कोड की वजह से बग को रोकता है, जो अनुमान लगाता है कि props और state नहीं बदलते हैं।

यदि आप जानबूझकर कुछ असिंक्रोनोस कॉलबैक से *लेटेस्ट* state पढ़ना चाहते हैं, तो आप इसे [एक रेफ](/docs/hooks-faq.html#is-there-something-like-instance-variables) में रख सकते हैं, इसे mutate कर, और पढ़ सकते हैं।

अंत में, एक और संभावित कारण जो आप स्टेल props या state देख रहे हैं यदि आप "डिपेंडेंसी ऐरे" ऑप्टिमाइजेशन का उपयोग करते हैं, लेकिन सभी डेपेंडेंसीएस को सही ढंग से निर्दिष्ट नहीं करते हैं। उदाहरण के लिए, यदि कोई इफ़ेक्ट दूसरे आर्गुमेंट  के रूप में  `[]` को निर्दिष्ट करता है, लेकिन `someProp` को अंदर पढ़ता है, तो यह `someProp` के इनिशियल वैल्यू को "देखता" रहेगा। समाधान या तो डिपेंडेंसी ऐरे को हटाने के लिए है, या इसे ठीक करने के लिए है। यहां बताया गया है कि आप [फ़ंक्शंस से कैसे डील कर सकते हैं](#is-it-safe-to-omit-functions-from-the-list-of-dependencies), और यहाँ गलत तरीके से डेपेंडेन्सीज़ को कम करने के बिना इफ़ेक्ट को रन करने के लिए [अन्य आम स्ट्रेटेजीज](#what-can-i-do-if-my-effect-dependencies-change-too-often) हैं।

> ध्यान दें
>
> हम [`एक्सहॉस्टिव-डिप्स`](https://github.com/facebook/react/issues/14920) ESLint नियम [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) पैकेज के एक भाग के रूप में प्रदान करते हैं।जब डेपेंडेन्सीज़ गलत तरीके से निर्दिष्ट की जाती है यह चेतावनी और एक फिक्स का सुझाव देती है।

### getDerivedStateFromProps कैसे इम्प्लीमेंट करें? {#how-do-i-implement-getderivedstatefromprops}

आपको शायद [इसकी आवश्यकता नहीं है](/blog/2018/06/07/you-probably-dont-need-derived-state.html), दुर्लभ मामलों में (जैसे कि एक `<Transition>` कॉम्पोनेन्ट) को लागू करना, आप रेंडरिंग के दौरान state को सही अपडेट कर सकते हैं। React पहले रेंडर से बाहर निकलने के तुरंत बाद अपडेटेड state के साथ कॉम्पोनेन्ट को फिर से रन करेगा ताकि यह एक्सपेंसिव प्रोसेस न हो।

यहां, हम एक state वेरिएबल में `रो` प्रोप के पिछले वैल्यू को स्टोर करते हैं ताकि हम तुलना कर सकें:

```js
function ScrollView({row}) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    // Row changed since last render. Update isScrollingDown.
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }

  return `Scrolling down: ${isScrollingDown}`;
}
```

यह पहली बार में अजीब लग सकता है, लेकिन रेंडरिंग के दौरान वास्तव में `getDerivedStateFromProps` हमेशा कन्सेप्तुअली एक अपडेट जैसा रहा है।

### क्या forceUpdate जैसा कुछ है? {#is-there-something-like-forceupdate}

दोनों `useState` और `useReducer` हुक्स अपडेट की [जमानत नहीं करते](/docs/hooks-reference.html#bailing-out-of-a-state-update) अगर पिछली और अगली वैल्यू सामान है। मुतातिंग state और `setState` को कॉल करने से पुन: रेंडर नहीं होगा।


आम तौर पर, आपको React में लोकल state में बदलाव नहीं करना चाहिए। हालाँकि, बचाव के रूप में, आप एक फिर से रेंडर करने के लिए एक इंक्रीमेंटिंग काउंटर का उपयोग कर सकते हैं, भले ही state में कोई बदलाव न हो:

```js
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
```

यदि संभव हो तो इस पैटर्न से बचने की कोशिश करें

### क्या फंक्शन कम्पोनेंट क लिए ref बना सकते हैं? {#can-i-make-a-ref-to-a-function-component}

आपको अक्सर इसकी आवश्यकता नहीं होती है, तो आप कुछ इम्पेरेटिव मेथड को किसी पैरेंट कॉम्पोनेन्ट के साथ [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle) Hook एक्सपोज़ कर सकते हैं।

### How can I measure a DOM node? {#how-can-i-measure-a-dom-node}

एक DOM नोड की पोजीशन या साइज को मैसूर करने के लिए एक रुड़ीमेंटरी तरीका [कॉलबैक रिफ](/docs/refs-and-the-dom.html#callback-refs) का उपयोग करना है। जब भी रेफ एक अलग नोड से जुड़ जाता है तो React उस कॉलबैक को कॉल करेगा। यहाँ एक [छोटा डेमो है](https://codesandbox.io/s/l7m0v5x4v9):

```js{4-8,12}
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

हमने इस उदाहरण में `useRef` का चयन नहीं किया है क्योंकि कोई ऑब्जेक्ट रेफ हमें करंट रेफ वैल्यू के लिए *चेंज* के बारे में सूचित नहीं करता है। [भले ही एक चाइल्ड कॉम्पोनेन्ट मेझड नोड को बाद में प्रदर्शित करता है(https://codesandbox.io/s/818zzk8m78) कॉलबैक रेफ का उपयोग यह सुनिश्चित करता है, (उदहारण । एक क्लिक के रिस्पांस में ), हम अभी भी पैरेंट कॉम्पोनेन्ट में इसके बारे में सूचित रहते हैं और मासुरेमेन्ट्स को अपडेट कर सकते हैं।

ध्यान दें कि हम `[]` को एक डिपेंडेंसी ऐरे के रूप में `useCallback` पास करते हैं। यह सुनिश्चित करता है कि री-रेंडरर्स के बीच हमारा रेफ कॉलबैक न बदले, और इसलिए React इसे अनावश्यक रूप से कॉल नहीं करेगा।

इस उदाहरण में, कॉलबैक रेफ केवल तभी कॉल होगा जब कॉम्पोनेन्ट माउंट और अनमाउंट करता है, क्योंकि रेंडर किए गए `<h1>`कॉम्पोनेन्ट किसी भी रेंडरर्स में मौजूद रहता है। यदि आप किसी भी समय किसी कॉम्पोनेन्ट का साइज बदलना चाहते हैं, तो आप [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) या उस पर बने हुए किसी थर्ड पार्टी Hook का उपयोग कर सकते हैं।

यदि आप चाहें, तो आप इस [लॉजिक को एक रीयूज़बल Hook में एक्सट्रेक्ट](https://codesandbox.io/s/m5o42082xy) कर सकते हैं:

```js{2}
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```


### const, thing, setThing, useState() क्या करते हैं? {#what-does-const-thing-setthing--usestate-mean}

यदि आप इस सिंटेक्स से परिचित नहीं हैं, तो state Hook डॉक्यूमेंटेशन में [स्पष्टीकरण](/docs/hooks-state.html#tip-what-do-square-brackets-mean) देखें।


## परफॉरमेंस ऑप्टिमिजाशंस {#performance-optimizations}

### क्या अपडेट पर एक इफ़ेक्ट स्किप कर सकते हैं? {#can-i-skip-an-effect-on-updates}

हाँ। [कण्डीशनली इफ़ेक्ट फायरिंग देखें](/docs/hooks-reference.html#conditionally-firing-an-effect)। ध्यान दें कि अपडेट को हैंडल न करने की भूल अक्सर [बग का कारण](/docs/hooks-effect.html#explanation-why-effects-run-on-each-update) बनती है, यही कारण है कि यह डिफ़ॉल्ट बिहेवियर नहीं है।

### क्या डेपेंडेन्सीज़ की सूची से फंक्शन्स को छोड़ना सुरक्षित है? {#is-it-safe-to-omit-functions-from-the-list-of-dependencies}

सामान्यतया, नहीं।

```js{3,8}
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 This is not safe (it calls `doSomething` which uses `someProp`)
}
```

यह याद रखना मुश्किल है कि कौन से props या state इफ़ेक्ट बाहर के कार्यों द्वारा उपयोग किए जाते हैं। यही कारण है कि **आमतौर पर आप इसके अंदर** के एक इफ़ेक्ट द्वारा आवश्यक फंक्शन को डिक्लेअर करना चाहते हैं। **फिर यह देखना आसान है कि कॉम्पोनेन्ट स्कोप कौन से इफ़ेक्ट पर निर्भर करता है:

```js{4,8}
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ OK (our effect only uses `someProp`)
}
```

यदि उसके बाद भी हम कॉम्पोनेन्ट के दायरे से किसी भी वैल्यू का उपयोग नहीं करते हैं, तो यह `[]` निर्दिष्ट करना सुरक्षित है:

```js{7}
useEffect(() => {
  function doSomething() {
    console.log('hello');
  }

  doSomething();
}, []); // ✅ OK in this example because we don't use *any* values from component scope
```

Depending on your use case, there are a few more options described below.

> ध्यान दें
>
> हम [`एक्सहॉस्टिव-डिप्स`](https://github.com/facebook/react/issues/14920) ESLint नियम [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) पैकेज के एक भाग के रूप में प्रदान करते हैं।जब डेपेंडेन्सीज़ गलत तरीके से निर्दिष्ट की जाती है यह चेतावनी और एक फिक्स का सुझाव देती है।

आइए देखें कि यह क्यों मायने रखता है।

यदि आप [डेपेंडेन्सीज़ की एक सूची](/docs/hooks-reference.html#conditionally-firing-an-effect) को `useEffect`,`useMemo`, `useCallback` या `useImperativeHandle` के अंतिम आर्गूमेंट के रूप में स्पेसिफी करते हैं, तो इसमें कॉलबैक के अंदर उपयोग किए जाने वाले सभी वैल्यू और रिएक्ट डेटा फ्लो में शामिल होना चाहिए। जिसमें props, state और उनसे डेरिवेद कुछ भी शामिल है।

यह **केवल** निर्भरता सूची से किसी फ़ंक्शन को छोड़ने के लिए सुरक्षित है अगर इसमें कुछ भी नहीं (या इसके द्वारा कॉल किये गए फंक्शन्स) रेफरेन्सेस, state, या उनसे प्राप्त वैल्यूज को संदर्भित करता है। इस उदाहरण में एक बग है:

```js{5,12}
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId); // Uses productId prop
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 Invalid because `fetchProduct` uses `productId`
  // ...
}
```

**रेकमेंडेड फ़िक्स उस फ़ंक्शन को आपके प्रभाव के _inside_ मूव करने के लिए है**। यही कारण है कि यह सुनिश्चित करता है के आपके state और props सभी घोषित है और आप आसानी से देख सकें की वो कौन सा इफ़ेक्ट यूज़ कर रहे हैं:

```js{5-10,13}
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // By moving this function inside the effect, we can clearly see the values it uses.
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ Valid because our effect only uses productId
  // ...
}
```

यह आपको इफ़ेक्ट के अंदर एक लोकल वेरिएबल के साथ आउट-ऑफ-ऑर्डर रेस्पॉन्सेस को संभालने की अनुमति देता है:

```js{2,6,10}
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      if (!ignore) setProduct(json);
    }

    fetchProduct();
    return () => { ignore = true };
  }, [productId]);
```

हमने फ़ंक्शन को प्रभाव के अंदर मूव कर दिया है, इसलिए इसकी डिपेंडेंसी लिस्ट में होने की आवश्यकता नहीं है।

>टिप
>
>Hook के साथ डेटा फेच के बारे में अधिक जानने के लिए [इस छोटे डेमो](https://codesandbox.io/s/jvvkoo8pq3) और [इस लेख](https://www.robinwieruch.de/react-hooks-fetch-data/) को देखें।

**यदि किसी कारण से आप किसी इफ़ेक्ट के अंदर फ़ंक्शन को मूव __नहीं__ कर पाते, तो कुछ और विकल्प हैं:**

* **आप उस फ़ंक्शन को अपने कॉम्पोनेन्ट के बाहर मूव करने का प्रयास कर सकते हैं**. उस मामले में, फ़ंक्शन को किसी भी props या state का संदर्भ नहीं देने की गारंटी है, और डेपेंडेन्सीज़ लिस्ट में होने की भी आवश्यकता नहीं है।
* यदि आप जिस फ़ंक्शन को कॉल कर रहे हैं वह एक प्योर कम्प्यूटेशन है और रेंडर करते समय कॉल करना सुरक्षित है, तो आप इसे **इफ़ेक्ट के बाहर से कॉल कर सकते है** और इफ़ेक्ट को रिटर्न्ड वैल्यू पर आश्रित बना सकते हैं।
* एक अंतिम उपाय के रूप में, आप **इफ़ेक्ट डेपेंडेन्सीज़ में एक फंक्शन जोड़ सकते हैं लेकिन _इसकी डेफिनिशन को_ [`useCallback`](/docs/hooks-reference.html#usecallback) Hook में व्रैप करें**। यह सुनिश्चित करता है कि यह हर रेंडर पर तब तक न बदले जब तक कि इसकी *अपनी* डेपेंडेन्सीज़ न बदल जाएँ:

```js{2-5}
function ProductPage({ productId }) {
  // ✅ Wrap with useCallback to avoid change on every render
  const fetchProduct = useCallback(() => {
    // ... Does something with productId ...
  }, [productId]); // ✅ All useCallback dependencies are specified

  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ All useEffect dependencies are specified
  // ...
}
```

ध्यान दें कि उपरोक्त उदाहरण में हमें फ़ंक्शन को डेपेंडेन्सीज़ लिस्ट में रखने की **आवश्यकता** है। यह सुनिश्चित करता है कि `ProductPd` के` productId` प्रोप में एक परिवर्तन `ProductDetails` कॉम्पोनेन्ट में ऑटोमेटिकली रीफ़ेच को ट्रिगर करता है।

### इफ़ेक्ट डेपेंडेन्सीज़ के बार बार बदलने की दशा में क्या करें? {#what-can-i-do-if-my-effect-dependencies-change-too-often}

कभी-कभी, आपका इफ़ेक्ट उस state का यूज़ कर करता है जो बहुत बार बदलता है। आप उस state को एक डिपेंडेंसी लिस्ट से छोड़ सकते हैं, लेकिन आमतौर पर ऐसा करना कोड में बग्स लाता है:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
}
```

डेपेंडेन्सीज़ के खाली सेट, `[]` का मतलब है कि इफ़ेक्ट केवल एक बार चलेगा जब कॉम्पोनेन्ट माउंट होगा, न कि प्रत्येक पुन: रेंडर पर। समस्या यह है कि `setInterval` कॉलबैक के अंदर, `काउंट` का मान नहीं बदलता है, क्योंकि हमने `0` सेट के मान के साथ एक क्लोजर बनाया है क्योंकि यह तब था जब इफेक्ट कॉलबैक चला। हर सेकंड, यह कॉलबैक फिर `setCount (0 + 1)` को कॉल करता है, इसलिए गिनती कभी भी 1 से ऊपर नहीं जाती है।

डेपेंडेन्सीज़ की लिस्ट के रूप में  `[काउंट]` को स्पेसिफी करना बग को फिक्स करेगा, लेकिन हर बदलाव पर अंतराल को रीसेट करेगा। प्रभावी रूप से, प्रत्येक `setInterval` को क्लियर होने से पहले एक्सीक्यूट करने का एक मौका मिलेगा (एक` setTimeout` के समान)। जो वांछनीय नहीं हो सकता है। इसे ठीक करने के लिए, हम [`setState` के फंक्शनल अपडेट](/docs/hooks-reference.html#functional-updates) का उपयोग कर सकते हैं। यह हमें स्पेसिफी करता है कि *करंट* state को रिफरेन्स किए बिना *कैसे* state  को बदलने की आवश्यकता है:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope

  return <h1>{count}</h1>;
}
```

(`SetCount` फ़ंक्शन की पहचान स्टेबल होने की गारंटी है, इसलिए इसे छोड़ना सुरक्षित है।)

अब, `setInterval` कॉलबैक एक सेकंड में एक बार एक्सेक्यूट करता है, लेकिन हर बार `सेटकाउंट` का इंटरनल कॉल `काउंट` के लिए अप-टू-डेट मान का उपयोग कर सकता है (जिसे कॉलबैक में `c` कहा जाता है)।

अधिक जटिल मामलों में (जैसे कि यदि एक state दूसरे state पर निर्भर करता है), तो [`useReducer` Hook](/docs/hooks-reference.html#usereducer) के इफ़ेक्ट के बाहर state अपडेट लॉजिक को मूव करने का प्रयास करें। [यह आलेख](https://adamrackis.dev/state-and-use-reducer/) एक उदाहरण प्रस्तुत करता है कि आप यह कैसे कर सकते हैं। **`useReducer` से `dispatch` फ़ंक्शन की पहचान हमेशा स्टेबल होती है** - भले ही रीड्यूसर फ़ंक्शन कॉम्पोनेन्ट के अंदर डिक्लेअर किया गया हो और इसके प्रॉप को रीड करता हो।

एक अंतिम उपाय के रूप में, यदि आप एक क्लास में `this` जैसा कुछ चाहते हैं, तो आप एक मुतबल वेरिएबल को होल्ड करने के लिए [रेफ का उपयोग](/docs/hooks-faq.html#is-there-something-like-instance-variables) कर सकते हैं। फिर आप इसे रिड और राइट सकते हैं। उदाहरण के लिए:

```js{2-6,10-11,16}
function Example(props) {
  // Keep latest props in a ref.
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // Read latest props at any time
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // This effect never re-runs
}
```

ऐसा केवल तभी करें जब आप एक बेहतर विकल्प नहीं ढूंढ सकते हैं, क्योंकि म्यूटेशन पर निर्भर रहने से कौम्पोनॅन्टस कम प्रेडिक्टेबल होते हैं। यदि कोई विशिष्ट पैटर्न है जो अच्छी तरह से ट्रांसलेट नहीं करता है, तो एक रनेबल उदाहरण कोड के साथ [एक समस्या दर्ज करें](https://github.com/facebook/react/issues/new) और हम मदद करने की कोशिश कर सकते हैं।

### shouldComponentUpdate कैसे इम्प्लीमेंट करें? {#how-do-i-implement-shouldcomponentupdate}

आप एक फंक्शन कॉम्पोनेन्ट को `React.memo` के साथ व्रैप कर के शैलो रूप से इसकी props की तुलना कर सकते हैं:

```js
const Button = React.memo((props) => {
  // your component
});
```

यह Hook नहीं है क्योंकि यह Hook की तरह कंपोज़ नहीं है। `React.memo` `PureComponent` के बराबर है, लेकिन यह केवल props की तुलना करता है। (आप पुराने और नए props लेने वाले कस्टम कंपरिसों फ़ंक्शन को स्पेसिफी करने के लिए दूसरा लॉजिक भी जोड़ सकते हैं। यदि यह सही है, तो अपडेट स्किप कर दिया जाता है।)

`React.memo` state की तुलना नहीं करता है क्योंकि तुलना करने के लिए कोई सिंगल state ऑब्जेक्ट नहीं है। लेकिन आप चिल्ड्रन  को प्योर भी बना सकते हैं, या [इंडिविजुअल चिल्ड्रन को भी `useMemo` के साथ ऑप्टिमाइज़ कर सकते हैं](/docs/hooks-faq.html#how-to-memoize-calculations)

### कॅल्क्युलेशन्स को कैसे memoize करें? {#how-to-memoize-calculations}


[`UseMemo`](/docs/hooks-reference.html#usememo) Hook मल्टिपल रेंडर्स के बीच कैश कैलकुलेशन कर आपको पिछले कॅल्क्युलेशन्स को "याद रखने" की सुविधा देता है:

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

यह कोड `computeExpensiveValue (a, b)` कहलाता है। लेकिन अगर डेपेंडेन्सीज़ `[a, b]` अंतिम मूल्य के बाद से नहीं बदली है, `useMemo` इसे दूसरी बार कॉल करने के लिए छोड़ देता है और बस अंतिम वैल्यू का पुन: उपयोग करता है।

याद रखें कि रेंडरिंग के दौरान फंक्शन जो `useMemo` में पास किया जाता, रन होता है। वहां कुछ भी ऐसा न करें जो नार्मल रेंडरिंग के दौरान करते हैं। उदाहरण के लिए, साइड इफेक्ट्स `useEffect` में होते हैं, न कि `useMemo`।

**परफॉरमेंस ऑप्टिमाइजेशन के लिए आप `useMemo` पर भरोसा कर सकते हैं, न कि सेमेंटिक गारंटी के रूप में।** भविष्य में, React कुछ पहले से याद किए गए वैल्यूज को "भूल" सकता है और अगले रेंडर पर उन्हें रीकैलकुलेट कर सकता है, उदहारण के लिए, ऑफस्क्रीन कौम्पोनॅन्टस को मेमोरी से फ्री करना। अपना ऐसा कोड लिख सकते हैं , जो अभी भी `useMemo` के बिना काम करता है - और फिर परफॉरमेंस ऑप्टिमाइजेशन करने के लिए इसे जोड़ें। (दुर्लभ मामलों के लिए जब एक वैल्यू *कभी* रीकंप्यूट नहीं किया जाए, तो आप [लाज़िली इनिशियलाइज़](#how-to-create-expensive-objects-lazily) कर सकते हैं।)

आसानी से, `useMemo` भी आपको एक चाइल्ड के एक्सपेंसिव री-रेंडर को स्किप करने देता है:

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

ध्यान दें कि यह एप्रोच लूप में काम नहीं करेगा क्योंकि Hook कॉल को लूप के अंदर [नहीं](/docs/hooks-rules.html) रखा जा सकता है। लेकिन आप लिस्ट आइटम के लिए एक अलग कॉम्पोनेन्ट को निकाल सकते हैं, और वहां `useMemo` को कॉल कर सकते हैं।

### एक्सपेंसिव ऑब्जेक्ट को लेज़ीली कैसे क्रिएट करें? {#how-to-create-expensive-objects-lazily}

यदि डेपेंडेन्सीज़ समान हैं, तो `useMemo` आपको [एक एक्सपेंसिव गणना को याद](#how-to-memoize-calculations) करने की सुविधा देता है। हालाँकि, यह केवल एक संकेत के रूप में कार्य करता है, और *गारंटी* की कम्प्युटशन नहीं करता है। लेकिन कभी-कभी आपको यह सुनिश्चित करने की आवश्यकता होती है कि एक ऑब्जेक्ट केवल एक बार क्रिएट किया गया है।

**जब प्रारंभिक state बनाना एक्सपेंसिव है, पहला सामान्य उपयोग मामला है:**

```js
function Table(props) {
  // ⚠️ createRows() is called on every render
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

इग्नोरेड इनिशियल state को रेक्रेट होने से बचने के लिए, हम एक **फ़ंक्शन** को `useState` में पास कर सकते हैं:

```js
function Table(props) {
  // ✅ createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

React केवल पहले रेंडर के दौरान इस फ़ंक्शन को कॉल करेगा। [`UseState` API संदर्भ देखें](/docs/hooks-reference.html#usestate)

**आप कभी-कभार `useRef()` प्रारंभिक वैल्यू को फिर से बनाने से बचना चाह सकते हैं।** उदाहरण के लिए, शायद आप यह सुनिश्चित करना चाहते हैं कि कुछ इम्पेरटिव क्लास केवल एक बार बने:

```js
function Image(props) {
  // ⚠️ IntersectionObserver is created on every render
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

`useRef` एक विशेष फ़ंक्शन ओवरलोड को **स्वीकार नहीं करता** है जैसे `useState`। इसके बजाय, आप अपना स्वयं का फ़ंक्शन लिख सकते हैं जो इसे लेज़ीली बनाता है और सेट करता है:

```js
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver is created lazily once
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // When you need it, call getObserver()
  // ...
}
```

यह एक एक्सपेंसिव ऑब्जेक्ट बनाने से बचता है जब तक कि यह पहली बार वास्तव में आवश्यक न हो। यदि आप फ़्लो या टाइपस्क्रिप्ट का उपयोग करते हैं, तो आप सुविधा के लिए `getObserver ()` को एक नॉन-नलबल प्रकार भी दे सकते हैं।


### क्या रेंडर में फंक्शन क्रिएट करने की वजह से Hooks धीमा है? {#are-hooks-slow-because-of-creating-functions-in-render}

आधुनिक ब्राउज़रों में, क्लासेज की तुलना में क्लोसूरेस का रॉ परफॉरमेंस चरम परिदृश्यों को छोड़कर महत्वपूर्ण रूप से भिन्न नहीं है।

इसके अलावा, विचार करें कि Hook के डिजाइन कुछ तरीकों से अधिक कुशल हैं:

* Hook बहुत सारे ओवरहेड से बचते हैं जिनकी क्लासेज को आवश्यकता होती है, जैसे उदाहरण के लिए, क्लास इंस्टैंस और बॉन्डिंग इवेंट हैंडलर्स की कन्स्ट्रुक्टर में कॉस्ट।

* **कोडबेस में प्रचलित है जो हायर-आर्डर कौम्पोनॅन्टस का उपयोग करता है, props और कॉन्टेक्स्ट प्रस्तुत करने वाले कोड को** हुक्स का यूज़ करते हुए डीप कॉम्पोनेन्ट ट्री नेस्टिंग की आवश्यकता नहीं होती है । छोटे कॉम्पोनेन्ट ट्रीज के साथ, React को कम काम करना पड़ता है।

ट्रडीशनली, रिएक्ट में इनलाइन फ़ंक्शन के आसपास प्रदर्शन संबंधी चिंताओं का संबंध इस बात से रहा है कि प्रत्येक रेंडर पर नए कॉलबैक `shouldComponentUpdate` कैसे पास किए जा रहे हैं। Hook तीन तरफ से इस समस्या का सामना करते हैं।

* [`UseCallback`](/docs/hooks-reference.html#usecallback) Hook आपको रीरेंडर्स के बीच एक ही कॉलबैक रिफरेन्स रखने देता है ताकि `shouldComponentUpdate` काम करना जारी रखे:

    ```js{2}
    // Will not change unless `a` or `b` changes
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

* जब इंडिविजुअल चाइल्ड अपडेट करते हैं [`UseMemo`](/docs/hooks-faq.html#how-to-memoize-calculations) Hook, प्योर कॉम्पोनेन्टस की आवश्यकता को कम करते हैं, इसे नियंत्रित करना आसान बनाता है।

* अंत में, [`useReducer`](/docs/hooks-reference.html#usereducer) Hook कॉलबैक को डीपली पास करने की आवश्यकता को कम कर देता है, जैसा कि नीचे बताया गया है।

### कालबैकस को डाउन पास करने से कैसे बचें? {#how-to-avoid-passing-callbacks-down}

हमने पाया है कि ज्यादातर लोग कॉम्पोनेन्ट ट्री के प्रत्येक स्तर के माध्यम से कॉलबैक को मैन्युअल रूप से पारित करने का फ़ायदा नहीं लेते हैं। हालांकि यह अधिक स्पष्ट है, इसे "पाइपलाइन" की तरह महसूस कर सकता है।

बड़े कौम्पोनॅन्टस ट्री में, हम एक वैकल्पिक विकल्प सुझाते हैं कि [`useReducer`](/docs/hooks-reference.html#usereducer) कॉन्टेक्स्ट के माध्यम से `dispatch` फंक्शन पास करें:


```js{4,5}
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // Note: `dispatch` won't change between re-renders
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

`TodosApp` के अंदर ट्री का कोई भी चाइल्ड  `TodosApp` में एक्शन को पास करने के लिए `dispatch` फ़ंक्शन का उपयोग कर सकता है:

```js{2,3}
function DeepChild(props) {
  // If we want to perform an action, we can get dispatch from context.
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```

यह रखरखाव के दृष्टिकोण (कॉल फॉरवार्डिंग को रखने की कोई आवश्यकता नहीं) से अधिक सुविधाजनक है, और कॉलबैक समस्या से पूरी तरह से बचाता है। इस तरह से `dispatch` को पास करना डीप अपडेट के लिए रेकमेण्डेड पैटर्न है।

ध्यान दें कि आप अभी भी चुन सकते हैं कि एप्लिकेशन *state* को props (अधिक स्पष्ट) या कॉन्टेक्स्ट के रूप में पास करना है या नहीं। यदि आप state के नीचे से गुजरने के लिए भी कॉन्टेक्स्ट का उपयोग करते हैं, तो दो अलग-अलग कॉन्टेक्स्ट प्रकारों का उपयोग करें - `dispatch` कॉन्टेक्स्ट कभी नहीं बदलता है, इसलिए इसे रीड करने वाले कौम्पोनॅन्टस को तब तक रेंडर करने की आवश्यकता नहीं है जब तक कि उन्हें एप्लिकेशन state की आवश्यकता न हो।

### कालबैक से बार-बार बदलती हुई एक वैल्यू को कैसे रीड करें? {#how-to-read-an-often-changing-value-from-usecallback}

>ध्यान दें
>
>हम props में इंडिविजुअल कॉलबैक के बजाय [कॉन्टेक्स्ट में `dispatch` को पास](#how-to-avoid-passing-callbacks-down) करने की सलाह देते हैं। नीचे का दृष्टिकोण केवल पूर्णता के लिए यहां उल्लिखित है।

>यह भी ध्यान दें कि यह पैटर्न [कंकररेंट मोड](/blog/2018/03/27/update-on-async-rendering.html) में समस्याएं पैदा कर सकता है। हम भविष्य में और अधिक एर्गोनोमिक विकल्प प्रदान करने की योजना बना रहे हैं, लेकिन अभी सबसे सुरक्षित समाधान कॉलबैक को हमेशा अमान्य करना है यदि यह कुछ वैल्यू परिवर्तनों पर निर्भर करता है।

कुछ दुर्लभ मामलों में आपको [`useCallback`](/docs/hooks-reference.html#usecallback) के साथ एक कॉलबैक को याद करने की आवश्यकता हो सकती है, लेकिन मेमोइजेशन बहुत अच्छी तरह से काम नहीं करता है क्योंकि इनर फ़ंक्शन को भी अक्सर बनाना पड़ता है । यदि आप जो फ़ंक्शन याद कर रहे हैं, वह एक इवेंट हैंडलर है और रेंडरिंग के दौरान उपयोग नहीं किया जाता है, तो आप [रेफ को एक इंस्टैंस वेरिएबल के रूप में उपयोग कर सकते हैं](#is-there-something-like-instance-variables), और अंतिम प्रतिबद्ध वैल्यू को मैन्युअल रूप से इसमें सेव कर सकते हैं:

```js{6,10}
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // Write it to the ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // Read it from the ref
    alert(currentText);
  }, [textRef]); // Don't recreate handleSubmit like [text] would do

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

यह बल्कि एक जटिल पैटर्न है, लेकिन यह दिखाता है कि यदि आपको इसकी ज़रूरत है तो आप यह एस्केप हैच ऑप्टिमाइजेशन कर सकते हैं। यदि आप इसे कस्टम Hook में एक्सट्रेक्ट करते हैं तो यह अधिक अच्छा है:

```js{4,16}
function Form() {
  const [text, updateText] = useState('');
  // Will be memoized even if `text` changes:
  const handleSubmit = useEventCallback(() => {
    alert(text);
  }, [text]);

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
```

किसी भी स्थिति में, हम **इस पैटर्न की सिफारिश नहीं करते हैं** और केवल इसे पूर्णता के लिए यहां दिखाते हैं। इसके बजाय,  [डीप कॉलबैक से गुजरने से बचना ](#how-to-avoid-passing-callbacks-down) बेहतर है।


## अंडर द हुड {#under-the-hood}

### React एसोसिएट Hook कौम्पोनॅन्टस के साथ कैसे कॉल करता है?  {#how-does-react-associate-hook-calls-with-components}

रिएक्ट वर्तमान में रेंडरिंग कॉम्पोनेन्ट का ट्रैक रखता है। [Hook के नियम](/docs/hooks-rules.html) के लिए धन्यवाद, हम जानते हैं कि Hook केवल React कौम्पोनॅन्टस (या कस्टम Hook - जिसे केवल React कौम्पोनॅन्टस से कॉल किया जाता है) से कॉल किया जाता है।
---
id: hooks-faq
title: Hooks FAQ
permalink: docs/hooks-faq.html
prev: hooks-reference.html
---

*Hooks* React 16.8 में जोड़ा गया है जो, आपको बिना क्लास कौम्पोनॅन्ट के state और अन्य React फीचर्स का उपयोग करने सुविधा देते हैं

यह पेज [Hooks](/docs/hooks-overview.html) के बारे में अक्सर पूछे जाने वाले प्रश्नों के उत्तर देता है

<!--
  if you ever need to regenerate this, this snippet in the devtools console might help:

  $$('.anchor').map(a =>
    `${' '.repeat(2 * +a.parentNode.nodeName.slice(1))}` +
    `[${a.parentNode.textContent}](${a.getAttribute('href')})`
  ).join('\n')
-->

* **[एडॉप्शन स्ट्रेटेजी](#adoption-strategy)**
  * [React के कौन से संस्करणों में Hooks शामिल हैं?](#which-versions-of-react-include-hooks)
  * [क्या मुझे अपने सभी क्लास कॉम्पोनेन्ट को फिर से लिखना होगा?](#do-i-need-to-rewrite-all-my-class-components)
  * [मैं Hooks के साथ क्या कर सकता हूं जो मैं क्लासेज के साथ नहीं कर सकता हूं?](#what-can-i-do-with-hooks-that-i-couldnt-with-classes)
  * [मेरा React ज्ञान कितना रिलेवेंट है?](#how-much-of-my-react-knowledge-stays-relevant)
  * [क्या मुझे Hook, क्लासेज या दोनों का मिश्रण इस्तेमाल करना चाहिए?](#should-i-use-hooks-classes-or-a-mix-of-both)
  * [क्या Hooks, क्लासेज के सारे उपयोगों को कवर करता है?](#do-hooks-cover-all-use-cases-for-classes)
  * [क्या Hooks रेंडर props और हायर आर्डर कौम्पोनॅन्टस को रेप्लस करता है?](#do-hooks-replace-render-props-and-higher-order-components)
  * [पॉपुलर APIs जैसे Redux connect() और React Router के लिए React के मायने?](#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router)
  * [क्या Hooke स्टैटिक टाइपिंग के साथ काम करता है?](#do-hooks-work-with-static-typing)
  * [Hooks का इस्तेमाल करते वाले कौम्पोनॅन्टस का टेस्ट कैसे करें?](#how-to-test-components-that-use-hooks)
  * [लिंट नियम क्या लागू करते हैं?](#what-exactly-do-the-lint-rules-enforce)
* **[क्लासेज से हूक्स तक](#from-classes-to-hooks)**
  * [लाइफ साइकिल मेथड्स Hooks को कैसे करेस्पॉन्ड करते हैं?](#how-do-lifecycle-methods-correspond-to-hooks)
  * [Hooks के द्वारा डाटा फेचिंग कैसे करें?](#how-can-i-do-data-fetching-with-hooks)
  * [क्या इंस्टैंस वेरिएबल की तरह कुछ है?](#is-there-something-like-instance-variables)
  * [एक या एक से ज्यादा state वेरिएबल का इस्तेमाल करना चाहिए?](#should-i-use-one-or-many-state-variables)
  * [क्या इफेक्ट को सिर्फ उपडटेस के बाद इस्तेमाल करना चाहिए?](#can-i-run-an-effect-only-on-updates)
  * [पिछले props या state को कैसे प्राप्त करें?](#how-to-get-the-previous-props-or-state)
  * [पुराने स्टेट्स और props का फंक्शन में दिखने का क्या मतलब है?](#why-am-i-seeing-stale-props-or-state-inside-my-function)
  * [getDerivedStateFromProps कैसे इम्प्लीमेंट करें?](#how-do-i-implement-getderivedstatefromprops)
  * [क्या forceUpdate जैसा कुछ है?](#is-there-something-like-forceupdate)
  * [क्या फंक्शन कम्पोनेंट क लिए ref बना सकते हैं?](#can-i-make-a-ref-to-a-function-component)
  * [DOM नोड को कैसे मापेंगे?](#how-can-i-measure-a-dom-node)
  * [const [thing, setThing क्या करते हैं] = useState() mean?](#what-does-const-thing-setthing--usestate-mean)
* **[परफॉरमेंस ऑप्टिमिजाशंस](#performance-optimizations)**
  * [क्या अपडेट पर एक इफ़ेक्ट स्किप कर सकते हैं?](#can-i-skip-an-effect-on-updates)
  * [क्या डेपेंडेन्सीज़ की सूची से फंक्शन्स को छोड़ना सुरक्षित है?](#is-it-safe-to-omit-functions-from-the-list-of-dependencies)
  * [इफ़ेक्ट डेपेंडेन्सीज़ के बार बार बदलने की दशा में क्या करें?](#what-can-i-do-if-my-effect-dependencies-change-too-often)
  * [shouldComponentUpdate कैसे इम्प्लीमेंट करें?](#how-do-i-implement-shouldcomponentupdate)
  * [कॅल्क्युलेशन्स को कैसे memoize करें?](#how-to-memoize-calculations)
  * [एक्सपेंसिव ऑब्जेक्ट को लेज़ीली कैसे क्रिएट करें?](#how-to-create-expensive-objects-lazily)
  * [क्या रेंडर में फंक्शन क्रिएट करने की वजह से Hooks धीमा है?](#are-hooks-slow-because-of-creating-functions-in-render)
  * [कालबैकस को डाउन पास करने से कैसे बचें?](#how-to-avoid-passing-callbacks-down)
  * [कालबैक से बार बार बदलती हुई एक वैल्यू को कैसे रीड करें?](#how-to-read-an-often-changing-value-from-usecallback)
* **[अंडर द हुड](#under-the-hood)**
  * [कौम्पोनॅन्टस के साथ React सहयोगी Hook कैसे कॉल करता है?](#how-does-react-associate-hook-calls-with-components)
  * [Hooks के लिए पूर्व कला क्या है?](#what-is-the-prior-art-for-hooks)

## एडॉप्शन स्ट्रेटेजी {#adoption-strategy}

### React के कौन से संस्करणों में Hooks शामिल हैं? {#which-versions-of-react-include-hooks}

16.8.0 के साथ शुरू, React में React Hooks का एक स्टेबल इम्प्लीमेंटेशन शामिल है:

* React DOM
* React Native
* React DOM Server
* React Test Renderer
* React Shallow Renderer

ध्यान दें **hook को इस्तेमाल करने के लिए, सभी React पैकेज 16.8.0 या उच्चतर होना चाहिए**. यदि आप अपडेट करना भूल जाते हैं तो hook काम नहीं करेंगे, उदाहरण के लिए, React DOM पैकेज।

[React Native 0.59](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059) और उच्चतर Hook को सपोर्ट करते हैं।

### क्या मुझे अपने सभी क्लास कॉम्पोनेन्ट को फिर से लिखना होगा? {#do-i-need-to-rewrite-all-my-class-components}

नहीं, React से क्लासेज को हटाने का [कोई प्लान](/docs/hooks-intro.html#gradual-adoption-strategy) नहीं है, हम सभी को शिपिंग प्रोडक्ट को रखने की आवश्यकता है और वे फिर से लिखे नहीं जा सकते। हम नए कोड में Hook को शामिल करने की सलाह देते हैं।

### मैं Hooks के साथ क्या कर सकता हूं जो मैं क्लासेज के साथ नहीं कर सकता हूं? {#what-can-i-do-with-hooks-that-i-couldnt-with-classes}

["अपनी खुद की Hook का निर्माण"](/docs/hooks-custom.html) विभिन्न संभावनाओं की एक झलक प्रदान करता है। Hook कौम्पोनॅन्टस के बीच फंक्शनलिटी का री-यूज़ करने के लिए एक शक्तिशाली और नया अर्थपूर्ण तरीका प्रदान करते हैं। ["लेख"](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) में एक रिएक्ट कोर टीम के सदस्य द्वारा Hook द्वारा दिए जाने वाली नई क्षमताओं पर गहन अध्ययन।

### मेरा React ज्ञान कितना रिलेवेंट है? {#how-much-of-my-react-knowledge-stays-relevant}

Hook, आपके द्वारा पहले से ही पहचाने जाने वाले React फीचर्स का उपयोग करने के लिए एक सीधा तरीका है - जैसे कि state ,लाइफसाइकिल, रेफ्स और कॉन्टेक्स्ट। वे मूल रूप से React कैसे काम करता है इसमें कोई परिवर्तन नहीं करते हैं, और आपके कौम्पोनॅन्टस, props और टॉप-डाउन डेटा-फ्लो का ज्ञान पूरी तरह से रिलेवेंट है।

Hooks का अपना लर्निंग कर्व है। यदि इस डॉक्यूमेंटेशन में कुछ कमी है, तो [इशू रेज करें](https://github.com/reactjs/reactjs.org/issues/new) और हम मदद करने की कोशिश करेंगे।

### क्या मुझे Hook, क्लासेज या दोनों का मिश्रण इस्तेमाल करना चाहिए? {#should-i-use-hooks-classes-or-a-mix-of-both}

जब आप तैयार हों, तो हम आपके द्वारा लिखे गए नए कौम्पोनॅन्टस में Hook इम्प्लीमेंट की कोशिश करने के लिए प्रोत्साहित करेंगे। सुनिश्चित करें कि आपकी टीम में हर कोई उन्हें इस्तेमाल करने और इस डॉक्यूमेंटेशन से परिचित हों। जब तक आप उन्हें फिर से लिखने की योजना नहीं बनाते, हम आपके पहले से उपस्थित क्लासेज को हुक्स का इस्तेमाल कर के लिखने के लिए प्रोत्साहित नहीं करते(जैसे बग को ठीक करने के लिए)।

आप एक क्लास कॉम्पोनेन्ट *के अंदर Hook* का उपयोग नहीं कर सकते हैं, लेकिन आप निश्चित रूप से एक ही ट्री में Hook के साथ क्लासेज और फ़ंक्शन कौम्पोनॅन्टस को मिला सकते हैं। एक कॉम्पोनेन्ट एक क्लास या एक फ़ंक्शन है जो Hook का उपयोग करता है, उस कॉम्पोनेन्ट का कार्यान्वयन विवरण है। लंबी अवधि में, हम उम्मीद करते हैं कि प्राथमिक रूप से Hooks लोग के रिएक्ट कॉम्पोनेन्ट लिखने का तरीका बनेगा।

### क्या Hooks, क्लासेज के सारे उपयोगों को कवर करता है? {#do-hooks-cover-all-use-cases-for-classes}

हमारा लक्ष्य Hook के लिए जितनी जल्दी हो सके क्लासेज के सभी उपयोग के मामलों को कवर करना है। असामान्य `getSnapshotBeforeUpdate`, `getDerivedStateFromError` और `componentDidCatch` लाइफसाइकिल के लिए कोई Hook समकक्ष नहीं हैं, लेकिन हम जल्द ही इसे जोड़ने की योजना बना रहे हैं।

यह Hook के लिए एक प्रारंभिक समय है, और कुछ थर्ड-पार्टी लाइब्रेरीज इस समय Hook के अनुरूप नहीं हो सकते हैं।

### क्या Hooks रेंडर props और हायर आर्डर कौम्पोनॅन्टस को रेप्लस करता है? {#do-hooks-replace-render-props-and-higher-order-components}

अक्सर, props और उच्च-क्रम के कॉम्पोनेन्ट केवल एक ही चाइल्ड को प्रस्तुत करते हैं। हमें लगता है कि Hook इस उपयोग के मामले को पूरा करने का एक सरल तरीका है। दोनों पैटर्न के लिए अभी भी एक जगह है (उदाहरण के लिए, एक वर्चुअल स्कॉलर कंपोनेंट में एक `renderItem` प्रोप हो सकता है, या एक विज़ुअल कंटेनर कंपोनेंट की अपनी DOM स्ट्रक्चर हो सकती है)। लेकिन ज्यादातर मामलों में, Hook पर्याप्त होंगे और आपके ट्री में नेस्टिंग कम करने में मदद करेंगे।

### पॉपुलर APIs जैसे Redux connect() और React Router के लिए React के मायने? {#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router}

आप हमेशा के समान सटीक API का उपयोग जारी रख सकते हैं, वे काम करेंगे।

React Redux V7.1.0 के बाद से [हुक्स API का सपोर्ट करते हैं](https://react-redux.js.org/api/hooks) और `useDispatch` or `useSelector` जैसे हुक्स एक्सपोज़ करते हैं।

React Router v5.1 के बाद से [हुक्स का सपोर्ट करते हैं](https://reacttraining.com/react-router/web/api/Hooks) 

अन्य लाइब्रेरीज भी भविष्य में Hook का समर्थन कर सकते हैं।

### क्या Hook स्टैटिक टाइपिंग के साथ काम करता है? {#do-hooks-work-with-static-typing}

Hook को स्टैटिक टाइपिंग को ध्यान में रखकर डिजाइन किया गया था। क्योंकि वे कार्य कर रहे हैं, वे उच्च-क्रम के कौम्पोनॅन्टस जैसे पैटर्न की तुलना में सही प्रकार से लिखना आसान है। नवीनतम फ्लो और टाइपस्क्रिप्ट रिएक्ट डेफिनिशंस में रिएक्ट Hook के लिए समर्थन शामिल है।

महत्वपूर्ण बात यह है कि कस्टम Hook आपको React API को बाधित करने की शक्ति देता है यदि आप उन्हें किसी तरह से अधिक सख्ती से टाइप करना चाहते हैं। रिएक्ट आपको प्रिमितिवेस देता है, लेकिन आप उन्हें अलग-अलग तरीकों से जोड़ सकते हैं जो हम लीक से हटकर प्रदान करते हैं।

### Hooks का इस्तेमाल करते वाले कौम्पोनॅन्टस का टेस्ट कैसे करें? {#how-to-test-components-that-use-hooks}

रिएक्ट के दृष्टिकोण से, Hook का उपयोग करने वाला एक कॉम्पोनेन्ट सिर्फ एक रेगुलर कॉम्पोनेन्ट है। यदि आपका टेस्ट समाधान रिएक्ट इंटर्नल्स पर निर्भर नहीं करता है, तो Hook के साथ टेस्टिंग कम्पोनेंट आपको सामान्य रूप से कम्पोनेंट्स का टेस्ट करने के तरीके से अलग नहीं होना चाहिए।

> ध्यान दें
>
> [टेस्टिंग रेसिपीज](/docs/testing-recipes.html) कई उदाहरणों को शामिल करते हैं जिन्हें आप कॉपी और पेस्ट कर सकते हैं

उदाहरण के लिए, मान लें कि हमारे पास यह काउंटर कॉम्पोनेन्ट है:

```js
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

हम रिएक्ट डोम का उपयोग करके इसका टेस्ट करेंगे। यह सुनिश्चित करने के लिए कि ब्राउज़र में क्या बिहेवियर है, हम कोड रेंडरिंग को व्रैप और [ReactTestUtils.act()](/docs/test-utils.html#act) कॉल में अपडेट करेंगे:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and effect
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // Test second render and effect
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
```

`act()` के लिए कॉल भी उनके अंदर इफ़ेक्ट फ्लश जाएगा.

यदि आपको एक कस्टम Hook का टेस्ट करने की आवश्यकता है, तो आप अपने टेस्ट में एक कॉम्पोनेन्ट बनाकर, और उसमें अपने Hook का उपयोग करके ऐसा कर सकते हैं। फिर आप लिखे गए कॉम्पोनेन्ट का टेस्ट कर सकते हैं।

बॉयलरप्लेट को कम करने के लिए, हम [React टेस्टिंग लाइब्रेरी](https://testing-library.com/react) का उपयोग करने की सलाह देते हैं जो टेस्ट राइटिंग को प्रोत्साहित करने के लिए डिज़ाइन किया गया है जो आपके कौम्पोनॅन्टस का उपयोग एन्ड यूजर के रूप में करते हैं।

अधिक जानकारी के लिए [टेस्टिंग रेसिपीज़](/docs/testing-recipes.html) चेक करें।

### [लिंट नियम](https://www.npmjs.com/package/eslint-plugin-react-hooks) क्या लागू करते हैं? {#what-exactly-do-the-lint-rules-enforce}

हम बग्स से बचने के लिए एक प्लग-इन  [ESLint plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) जो [हुक्स के रूल्स](/docs/hooks-rules.html) लागू करते हैं। यह मानता है कि कोई भी फ़ंक्शन "`use`" और एक कैपिटल लेटर के बाद के शुरू होने वाला एक Hook है। हम पहचानते हैं कि यह अनुमान सही नहीं है और कुछ गलत सकारात्मक हो सकते हैं, लेकिन पारिस्थितिकी तंत्र के व्यापक सम्मेलन के बिना, Hook को अच्छी तरह से काम करने का कोई तरीका नहीं है - और लंबे समय तक लोग Hook को अपनाने या सम्मेलन का पालन करने से लोगों को हतोत्साहित करेंगे।

विशेष रूप से, नियम लागू होता है:

* Hook कॉल या तो एक `PascalCase` फ़ंक्शन (एक कॉम्पोनेन्ट माना जाता है) या किसी अन्य` useSomething` फ़ंक्शन (एक कस्टम Hook माना जाता है) के अंदर हैं।
* Hook हर रेंडर पर एक ही क्रम में कॉल किया जाता है।

कुछ और आंकड़े हैं, और वे समय के साथ बदल सकते हैं क्योंकि हम झूठी सकारात्मकता से बचने के साथ बग को खोजने के लिए नियम को ठीक करते हैं।

## क्लासेज से हूक्स तक {#from-classes-to-hooks}

### लाइफ साइकिल मेथड्स Hooks को कैसे करेस्पॉन्ड करते हैं? {#how-do-lifecycle-methods-correspond-to-hooks}

* `constructor`: फ़ंक्शन कौम्पोनॅन्टस को कंट्रक्टर की आवश्यकता नहीं है। आप [`useState`] (/ डॉक्स / Hook-संदर्भ.html # usestate) कॉल में इनिशियलाइज़ कर सकते हैं। यदि इनिशियल स्थिति की कंप्यूटिंग करना महंगा है, तो आप एक फ़ंक्शन को 'useState' में पास कर सकते हैं।

* `getDerivedStateFromProps`: इसके बजाय [रेंडर करते हुए](#how-do-i-implement-getderivedstatefromprops) को अपडेट शेड्यूल करें।

* `shouldComponentUpdate`: `React.memo` [देखें](#how-do-i-implement-shouldcomponentupdate).

* `render`: यह फंक्शन कंपोनेंट बॉडी है.

* `ComponentsDidMount`, `componentDidUpdate`, `ComponentsWillUnmount`: [` useEffect` हुक] कम आम मामलों सहित इनमें से सभी कॉम्बिनेशंस को एक्सप्रेस कर सकते हैं।

* `getSnapshotBeforeUpdate`, `componentDidCatch` और `getDerivedStateFromError`: इन विधियों के लिए कोई Hook समकक्ष नहीं हैं, लेकिन उन्हें जल्द ही जोड़ दिया जाएगा।

### Hooks के द्वारा डाटा फेचिंग कैसे करें? {#how-can-i-do-data-fetching-with-hooks}

आपकी शुरुआत के लिए एक [छोटा डेमो](https://codesandbox.io/s/jvvkoo8pq3). अधिक जानने के लिए, Hook के साथ डेटा फेच के बारे में [यह लेख](https://www.robinwieruch.de/react-hooks-fetch-data/) देखें।

### या इंस्टैंस वेरिएबल की तरह कुछ है? {#is-there-something-like-instance-variables}

हाँ, [useRef()](/docs/hooks-reference.html#useref) Hook केवल एक डॉम रेफ्स नहीं है। `ref` ऑब्जेक्ट एक सामान्य कंटेनर है, जिसका `current` प्रॉपर्टी परस्पर भिन्न होता है और किसी क्लास पर एक उदाहरण प्रॉपर्टी के समान किसी भी वैल्यू को होल्ड सकता है।

आप इसे `useEffect` के अंदर से लिख सकते हैं:

```js{2,8}
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

अगर हम सिर्फ एक इंटरवल निर्धारित करना चाहते हैं, तो हमें रेफ की आवश्यकता नहीं होगी (`id` इफ़ेक्ट के लिए लोकल हो सकती है), लेकिन यह उपयोगी है अगर हम एक इवेंट  हैंडलर से इंटरवल को क्लियर करना चाहते हैं।:

```js{3}
  // ...
  function handleCancelClick() {
    clearInterval(intervalRef.current);
  }
  // ...
```
वैचारिक रूप से, आप किसी क्लास में वेरिएबल के समान रेफ के बारे में सोच सकते हैं। जब तक आप [लेज़ी इनिशियलएसशन](#how-to-create-expensive-objects-lazily) नहीं कर रहे हैं, रेंडरिंग के दौरान रिफ सेट करने से बचें - इससे आश्चर्यजनक व्यवहार हो सकता है। इसके बजाय, आमतौर पर आप ईवेंट हैंडलर और इफ़ेक्ट्स में Refs को संशोधित कर सकते हैं। 

### एक या एक से ज्यादा state वेरिएबल का इस्तेमाल करना चाहिए? {#should-i-use-one-or-many-state-variables}

यदि आप क्लासेज का यूज़ करते आ रहे हैं, तो आपको हमेशा एक बार `useState()` को कॉल करने और सभी state को एक ही ऑब्जेक्ट में डालने की कोशिश कर के सामान बिहेवियर पाने की कोशिश करनी चाहिए। आप चाहें तो ऐसा कर सकते हैं। यहां एक कॉम्पोनेन्ट का उदाहरण है जो माउस मूवमेंट  फॉलो करता है। हम इसकी पोजीशन और साइज को लोकल state में रखते हैं:

```js
function Box() {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
  // ...
}
```

अब मान लें कि हम कुछ तर्क लिखना चाहते हैं जो यूजर के माउस को स्थानांतरित करने पर `left` और `top` बदलता है। ध्यान दें कि हमें इन फ़ील्ड्स को पिछली state ऑब्जेक्ट में मैन्युअल रूप से कैसे मर्ज करना है:

```js{4,5}
  // ...
  useEffect(() => {
    function handleWindowMouseMove(e) {
      // Spreading "...state" ensures we don't "lose" width and height
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    }
    // Note: this implementation is a bit simplified
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);
  // ...
```

ऐसा इसलिए है क्योंकि जब हम किसी state वैरिएबल को अपडेट करते हैं, तो हम उसकी वैल्यू को *रिप्लेस* करते हैं। यह एक क्लास में `this.setState` से अलग है, जो ऑब्जेक्ट में अपडेटेड फ़ील्ड को *मर्ज* करता है।

यदि आप आटोमेटिक मर्जिंग को मिस करते हैं, तो आप एक कस्टम `useLegacyState` Hook लिख सकते हैं जो ऑब्जेक्ट state अपडेट को मर्ज करता है। हालाँकि, **हम state को कई state वेरिएबल में विभाजित करने की सलाह देते हैं जिसके आधार पर वैल्यू एक साथ बदलते हैं।**

उदाहरण के लिए, हम अपने कंपोनेंट state को `position` और `size` ऑब्जेक्ट्स में विभाजित कर सकते हैं, और हमेशा `position` को बदलने की आवश्यकता नहीं है:

```js{2,7}
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
    }
    // ...
```

इंडिपेंडेंट state वेरिएबल को अलग करने का एक और लाभ भी है। उदाहरण के लिए, कस्टम Hook में बाद में कुछ संबंधित लॉजिक को एक्सट्रेक्ट करना आसान बनाता है:

```js{2,7}
function Box() {
  const position = useWindowPosition();
  const [size, setSize] = useState({ width: 100, height: 100 });
  // ...
}

function useWindowPosition() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    // ...
  }, []);
  return position;
}
```

ध्यान दें कि हम अपने कोड को बदले बिना एक कस्टम Hook में `position` state वेरिएबल और रिलेटेड इफ़ेक्ट के लिए `useState` कॉल को कैसे मूव करने में सक्षम थे। यदि सभी state एक ही ऑब्जेक्ट में थे, तो इसे निकालना अधिक कठिन होगा।

सभी state एक `useState` कॉल में रखने, और प्रत्येक फील्ड में एक `useState` कॉल, दोनों करने से काम चल सकता है। जब आप इन दो चरम सीमाओं और समूह से संबंधित state के बीच कुछ इंडिपेंडेंट state वेरिएबल में संतुलन पाते हैं, तो कॉम्पोनेन्ट सबसे अधिक रीडबल होते हैं। यदि state लॉजिक जटिल हो जाता है, तो हम इसे [रिड्यूसर के साथ मैनेज](/docs/hooks-reference.html#usereducer) या कस्टम Hook के साथ मैनेज करने की सलाह देते हैं।

### क्या इफेक्ट को सिर्फ उपडटेस के बाद इस्तेमाल करना चाहिए? {#can-i-run-an-effect-only-on-updates}

यह एक दुर्लभ उपयोग मामला है। यदि आपको इसकी आवश्यकता है, तो आप मैन्युअल रूप से बूलियन मान को स्टोर करने के लिए एक [म्यूटेबल रेफ का उपयोग](#is-there-something-like-instance-variables) कर सकते हैं, चाहे आप पहले या बाद के रेंडर पर हों, फिर उस फ्लैग को अपने प्रभाव में देखें। (यदि आप खुद को अक्सर ऐसा करते हुए पाते हैं, तो आप इसके लिए एक कस्टम Hook बना सकते हैं।)

### पिछले props या state को कैसे प्राप्त करें? {#how-to-get-the-previous-props-or-state}

वर्तमान में, आप इसे [रेफ के साथ](#is-there-something-like-instance-variables) मैन्युअल रूप से कर सकते हैं:

```js{6,8}
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Now: {count}, before: {prevCount}</h1>;
}
```

यह थोड़ा जटिल हो सकता है लेकिन आप इसे कस्टम Hook में एक्सट्रेक्ट कर सकते हैं:

```js{3,7}
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>Now: {count}, before: {prevCount}</h1>;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

ध्यान दें कि यह props, state या किसी अन्य कैलक्युलेटेड वैल्यू के लिए कैसे काम करेगा

```js{5}
function Counter() {
  const [count, setCount] = useState(0);

  const calculation = count + 100;
  const prevCalculation = usePrevious(calculation);
  // ...
```

यह संभव है कि भविष्य में रिएक्ट लीक से हटकर एक `usePrevious` प्रदान करेगा क्योंकि यह अपेक्षाकृत सामान्य उपयोग का मामला है।

[डेरिवेद state के लिए अनुशंसित पैटर्न](#how-do-i-implement-getderivedstatefromprops) भी देखें.

### पुराने स्टेट्स और props का फंक्शन में दिखने का क्या मतलब है? {#why-am-i-seeing-stale-props-or-state-inside-my-function}

एक कॉम्पोनेन्ट के अंदर कोई भी कार्य, जिसमें ईवेंट हैंडलर और इफेक्ट्स शामिल हैं, props को "रेंडर" करता है और रेंडर से state करता है कि यह किस तरह से बनाया गया था। उदाहरण के लिए, इस तरह कोड पर विचार करें।:

```js
function Example() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

यदि आप पहले "अलर्ट दिखाएं" पर क्लिक करते हैं और फिर काउंटर को बढ़ाते हैं, **जब आपने "अलर्ट दिखाएं" बटन पर क्लिक किया था तो अलर्ट `काउंट` वेरिएबल** दिखाएगा। यह कोड की वजह से बग को रोकता है, जो अनुमान लगाता है कि props और state नहीं बदलते हैं।

यदि आप जानबूझकर कुछ असिंक्रोनोस कॉलबैक से *लेटेस्ट* state पढ़ना चाहते हैं, तो आप इसे [एक रेफ](/docs/hooks-faq.html#is-there-something-like-instance-variables) में रख सकते हैं, इसे mutate कर, और पढ़ सकते हैं।

अंत में, एक और संभावित कारण जो आप स्टेल props या state देख रहे हैं यदि आप "डिपेंडेंसी ऐरे" ऑप्टिमाइजेशन का उपयोग करते हैं, लेकिन सभी डेपेंडेंसीएस को सही ढंग से निर्दिष्ट नहीं करते हैं। उदाहरण के लिए, यदि कोई इफ़ेक्ट दूसरे आर्गुमेंट  के रूप में  `[]` को निर्दिष्ट करता है, लेकिन `someProp` को अंदर पढ़ता है, तो यह `someProp` के इनिशियल वैल्यू को "देखता" रहेगा। समाधान या तो डिपेंडेंसी ऐरे को हटाने के लिए है, या इसे ठीक करने के लिए है। यहां बताया गया है कि आप [फ़ंक्शंस से कैसे डील कर सकते हैं](#is-it-safe-to-omit-functions-from-the-list-of-dependencies), और यहाँ गलत तरीके से डेपेंडेन्सीज़ को कम करने के बिना इफ़ेक्ट को रन करने के लिए [अन्य आम स्ट्रेटेजीज](#what-can-i-do-if-my-effect-dependencies-change-too-often) हैं।

> ध्यान दें
>
> हम [`एक्सहॉस्टिव-डिप्स`](https://github.com/facebook/react/issues/14920) ESLint नियम [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) पैकेज के एक भाग के रूप में प्रदान करते हैं।जब डेपेंडेन्सीज़ गलत तरीके से निर्दिष्ट की जाती है यह चेतावनी और एक फिक्स का सुझाव देती है।

### getDerivedStateFromProps कैसे इम्प्लीमेंट करें? {#how-do-i-implement-getderivedstatefromprops}

आपको शायद [इसकी आवश्यकता नहीं है](/blog/2018/06/07/you-probably-dont-need-derived-state.html), दुर्लभ मामलों में (जैसे कि एक `<Transition>` कॉम्पोनेन्ट) को लागू करना, आप रेंडरिंग के दौरान state को सही अपडेट कर सकते हैं। React पहले रेंडर से बाहर निकलने के तुरंत बाद अपडेटेड state के साथ कॉम्पोनेन्ट को फिर से रन करेगा ताकि यह एक्सपेंसिव प्रोसेस न हो।

यहां, हम एक state वेरिएबल में `रो` प्रोप के पिछले वैल्यू को स्टोर करते हैं ताकि हम तुलना कर सकें:

```js
function ScrollView({row}) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    // Row changed since last render. Update isScrollingDown.
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }

  return `Scrolling down: ${isScrollingDown}`;
}
```

यह पहली बार में अजीब लग सकता है, लेकिन रेंडरिंग के दौरान वास्तव में `getDerivedStateFromProps` हमेशा कन्सेप्तुअली एक अपडेट जैसा रहा है।

### क्या forceUpdate जैसा कुछ है? {#is-there-something-like-forceupdate}

दोनों `useState` और `useReducer` हुक्स अपडेट की [जमानत नहीं करते](/docs/hooks-reference.html#bailing-out-of-a-state-update) अगर पिछली और अगली वैल्यू सामान है। मुतातिंग state और `setState` को कॉल करने से पुन: रेंडर नहीं होगा।


आम तौर पर, आपको React में लोकल state में बदलाव नहीं करना चाहिए। हालाँकि, बचाव के रूप में, आप एक फिर से रेंडर करने के लिए एक इंक्रीमेंटिंग काउंटर का उपयोग कर सकते हैं, भले ही state में कोई बदलाव न हो:

```js
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
```

यदि संभव हो तो इस पैटर्न से बचने की कोशिश करें

### क्या फंक्शन कम्पोनेंट क लिए ref बना सकते हैं? {#can-i-make-a-ref-to-a-function-component}

आपको अक्सर इसकी आवश्यकता नहीं होती है, तो आप कुछ इम्पेरेटिव मेथड को किसी पैरेंट कॉम्पोनेन्ट के साथ [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle) Hook एक्सपोज़ कर सकते हैं।

### How can I measure a DOM node? {#how-can-i-measure-a-dom-node}

एक DOM नोड की पोजीशन या साइज को मैसूर करने के लिए एक रुड़ीमेंटरी तरीका [कॉलबैक रिफ](/docs/refs-and-the-dom.html#callback-refs) का उपयोग करना है। जब भी रेफ एक अलग नोड से जुड़ जाता है तो React उस कॉलबैक को कॉल करेगा। यहाँ एक [छोटा डेमो है](https://codesandbox.io/s/l7m0v5x4v9):

```js{4-8,12}
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

हमने इस उदाहरण में `useRef` का चयन नहीं किया है क्योंकि कोई ऑब्जेक्ट रेफ हमें करंट रेफ वैल्यू के लिए *चेंज* के बारे में सूचित नहीं करता है। [भले ही एक चाइल्ड कॉम्पोनेन्ट मेझड नोड को बाद में प्रदर्शित करता है(https://codesandbox.io/s/818zzk8m78) कॉलबैक रेफ का उपयोग यह सुनिश्चित करता है, (उदहारण । एक क्लिक के रिस्पांस में ), हम अभी भी पैरेंट कॉम्पोनेन्ट में इसके बारे में सूचित रहते हैं और मासुरेमेन्ट्स को अपडेट कर सकते हैं।

ध्यान दें कि हम `[]` को एक डिपेंडेंसी ऐरे के रूप में `useCallback` पास करते हैं। यह सुनिश्चित करता है कि री-रेंडरर्स के बीच हमारा रेफ कॉलबैक न बदले, और इसलिए React इसे अनावश्यक रूप से कॉल नहीं करेगा।

इस उदाहरण में, कॉलबैक रेफ केवल तभी कॉल होगा जब कॉम्पोनेन्ट माउंट और अनमाउंट करता है, क्योंकि रेंडर किए गए `<h1>`कॉम्पोनेन्ट किसी भी रेंडरर्स में मौजूद रहता है। यदि आप किसी भी समय किसी कॉम्पोनेन्ट का साइज बदलना चाहते हैं, तो आप [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) या उस पर बने हुए किसी थर्ड पार्टी Hook का उपयोग कर सकते हैं।

यदि आप चाहें, तो आप इस [लॉजिक को एक रीयूज़बल Hook में एक्सट्रेक्ट](https://codesandbox.io/s/m5o42082xy) कर सकते हैं:

```js{2}
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```


### const [thing, setThing क्या करते हैं] = useState() mean? {#what-does-const-thing-setthing--usestate-mean}

यदि आप इस सिंटेक्स से परिचित नहीं हैं, तो state Hook डॉक्यूमेंटेशन में [स्पष्टीकरण](/docs/hooks-state.html#tip-what-do-square-brackets-mean) देखें।


## परफॉरमेंस ऑप्टिमिजाशंस {#performance-optimizations}

### क्या अपडेट पर एक इफ़ेक्ट स्किप कर सकते हैं? {#can-i-skip-an-effect-on-updates}

हाँ। [कण्डीशनली इफ़ेक्ट फायरिंग देखें](/docs/hooks-reference.html#conditionally-firing-an-effect)। ध्यान दें कि अपडेट को हैंडल न करने की भूल अक्सर [बग का कारण](/docs/hooks-effect.html#explanation-why-effects-run-on-each-update) बनती है, यही कारण है कि यह डिफ़ॉल्ट बिहेवियर नहीं है।

### क्या डेपेंडेन्सीज़ की सूची से फंक्शन्स को छोड़ना सुरक्षित है? {#is-it-safe-to-omit-functions-from-the-list-of-dependencies}

सामान्यतया, नहीं।

```js{3,8}
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 This is not safe (it calls `doSomething` which uses `someProp`)
}
```

यह याद रखना मुश्किल है कि कौन से props या state इफ़ेक्ट बाहर के कार्यों द्वारा उपयोग किए जाते हैं। यही कारण है कि **आमतौर पर आप इसके अंदर** के एक इफ़ेक्ट द्वारा आवश्यक फंक्शन को डिक्लेअर करना चाहते हैं। **फिर यह देखना आसान है कि कॉम्पोनेन्ट स्कोप कौन से इफ़ेक्ट पर निर्भर करता है:

```js{4,8}
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ OK (our effect only uses `someProp`)
}
```

यदि उसके बाद भी हम कॉम्पोनेन्ट के दायरे से किसी भी वैल्यू का उपयोग नहीं करते हैं, तो यह `[]` निर्दिष्ट करना सुरक्षित है:

```js{7}
useEffect(() => {
  function doSomething() {
    console.log('hello');
  }

  doSomething();
}, []); // ✅ OK in this example because we don't use *any* values from component scope
```

Depending on your use case, there are a few more options described below.

> ध्यान दें
>
> हम [`एक्सहॉस्टिव-डिप्स`](https://github.com/facebook/react/issues/14920) ESLint नियम [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) पैकेज के एक भाग के रूप में प्रदान करते हैं।जब डेपेंडेन्सीज़ गलत तरीके से निर्दिष्ट की जाती है यह चेतावनी और एक फिक्स का सुझाव देती है।

आइए देखें कि यह क्यों मायने रखता है।

यदि आप [डेपेंडेन्सीज़ की एक सूची](/docs/hooks-reference.html#conditionally-firing-an-effect) को `useEffect`,`useMemo`, `useCallback` या `useImperativeHandle` के अंतिम आर्गूमेंट के रूप में स्पेसिफी करते हैं, तो इसमें कॉलबैक के अंदर उपयोग किए जाने वाले सभी वैल्यू और रिएक्ट डेटा फ्लो में शामिल होना चाहिए। जिसमें props, state और उनसे डेरिवेद कुछ भी शामिल है।

यह **केवल** निर्भरता सूची से किसी फ़ंक्शन को छोड़ने के लिए सुरक्षित है अगर इसमें कुछ भी नहीं (या इसके द्वारा कॉल किये गए फंक्शन्स) रेफरेन्सेस, state, या उनसे प्राप्त वैल्यूज को संदर्भित करता है। इस उदाहरण में एक बग है:

```js{5,12}
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId); // Uses productId prop
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 Invalid because `fetchProduct` uses `productId`
  // ...
}
```

**रेकमेंडेड फ़िक्स उस फ़ंक्शन को आपके प्रभाव के _inside_ मूव करने के लिए है**। यही कारण है कि यह सुनिश्चित करता है के आपके state और props सभी घोषित है और आप आसानी से देख सकें की वो कौन सा इफ़ेक्ट यूज़ कर रहे हैं:

```js{5-10,13}
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // By moving this function inside the effect, we can clearly see the values it uses.
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ Valid because our effect only uses productId
  // ...
}
```

यह आपको इफ़ेक्ट के अंदर एक लोकल वेरिएबल के साथ आउट-ऑफ-ऑर्डर रेस्पॉन्सेस को संभालने की अनुमति देता है:

```js{2,6,10}
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      if (!ignore) setProduct(json);
    }

    fetchProduct();
    return () => { ignore = true };
  }, [productId]);
```

हमने फ़ंक्शन को प्रभाव के अंदर मूव कर दिया है, इसलिए इसकी डिपेंडेंसी लिस्ट में होने की आवश्यकता नहीं है।

>टिप
>
>Hook के साथ डेटा फेच के बारे में अधिक जानने के लिए [इस छोटे डेमो](https://codesandbox.io/s/jvvkoo8pq3) और [इस लेख](https://www.robinwieruch.de/react-hooks-fetch-data/) को देखें।

**यदि किसी कारण से आप किसी इफ़ेक्ट के अंदर फ़ंक्शन को मूव __नहीं__ कर पाते, तो कुछ और विकल्प हैं:**

* **आप उस फ़ंक्शन को अपने कॉम्पोनेन्ट के बाहर मूव करने का प्रयास कर सकते हैं**. उस मामले में, फ़ंक्शन को किसी भी props या state का संदर्भ नहीं देने की गारंटी है, और डेपेंडेन्सीज़ लिस्ट में होने की भी आवश्यकता नहीं है।
* यदि आप जिस फ़ंक्शन को कॉल कर रहे हैं वह एक प्योर कम्प्यूटेशन है और रेंडर करते समय कॉल करना सुरक्षित है, तो आप इसे **इफ़ेक्ट के बाहर से कॉल कर सकते है** और इफ़ेक्ट को रिटर्न्ड वैल्यू पर आश्रित बना सकते हैं।
* एक अंतिम उपाय के रूप में, आप **इफ़ेक्ट डेपेंडेन्सीज़ में एक फंक्शन जोड़ सकते हैं लेकिन _इसकी डेफिनिशन को_ [`useCallback`](/docs/hooks-reference.html#usecallback) Hook में व्रैप करें**। यह सुनिश्चित करता है कि यह हर रेंडर पर तब तक न बदले जब तक कि इसकी *अपनी* डेपेंडेन्सीज़ न बदल जाएँ:

```js{2-5}
function ProductPage({ productId }) {
  // ✅ Wrap with useCallback to avoid change on every render
  const fetchProduct = useCallback(() => {
    // ... Does something with productId ...
  }, [productId]); // ✅ All useCallback dependencies are specified

  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ All useEffect dependencies are specified
  // ...
}
```

ध्यान दें कि उपरोक्त उदाहरण में हमें फ़ंक्शन को डेपेंडेन्सीज़ लिस्ट में रखने की **आवश्यकता** है। यह सुनिश्चित करता है कि `ProductPd` के` productId` प्रोप में एक परिवर्तन `ProductDetails` कॉम्पोनेन्ट में ऑटोमेटिकली रीफ़ेच को ट्रिगर करता है।

### इफ़ेक्ट डेपेंडेन्सीज़ के बार बार बदलने की दशा में क्या करें? {#what-can-i-do-if-my-effect-dependencies-change-too-often}

कभी-कभी, आपका इफ़ेक्ट उस state का यूज़ कर करता है जो बहुत बार बदलता है। आप उस state को एक डिपेंडेंसी लिस्ट से छोड़ सकते हैं, लेकिन आमतौर पर ऐसा करना कोड में बग्स लाता है:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
}
```

डेपेंडेन्सीज़ के खाली सेट, `[]` का मतलब है कि इफ़ेक्ट केवल एक बार चलेगा जब कॉम्पोनेन्ट माउंट होगा, न कि प्रत्येक पुन: रेंडर पर। समस्या यह है कि `setInterval` कॉलबैक के अंदर, `काउंट` का मान नहीं बदलता है, क्योंकि हमने `0` सेट के मान के साथ एक क्लोजर बनाया है क्योंकि यह तब था जब इफेक्ट कॉलबैक चला। हर सेकंड, यह कॉलबैक फिर `setCount (0 + 1)` को कॉल करता है, इसलिए गिनती कभी भी 1 से ऊपर नहीं जाती है।

डेपेंडेन्सीज़ की लिस्ट के रूप में  `[काउंट]` को स्पेसिफी करना बग को फिक्स करेगा, लेकिन हर बदलाव पर अंतराल को रीसेट करेगा। प्रभावी रूप से, प्रत्येक `setInterval` को क्लियर होने से पहले एक्सीक्यूट करने का एक मौका मिलेगा (एक` setTimeout` के समान)। जो वांछनीय नहीं हो सकता है। इसे ठीक करने के लिए, हम [`setState` के फंक्शनल अपडेट](/docs/hooks-reference.html#functional-updates) का उपयोग कर सकते हैं। यह हमें स्पेसिफी करता है कि *करंट* state को रिफरेन्स किए बिना *कैसे* state  को बदलने की आवश्यकता है:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope

  return <h1>{count}</h1>;
}
```

(`SetCount` फ़ंक्शन की पहचान स्टेबल होने की गारंटी है, इसलिए इसे छोड़ना सुरक्षित है।)

अब, `setInterval` कॉलबैक एक सेकंड में एक बार एक्सेक्यूट करता है, लेकिन हर बार `सेटकाउंट` का इंटरनल कॉल `काउंट` के लिए अप-टू-डेट मान का उपयोग कर सकता है (जिसे कॉलबैक में `c` कहा जाता है)।

अधिक जटिल मामलों में (जैसे कि यदि एक state दूसरे state पर निर्भर करता है), तो [`useReducer` Hook](/docs/hooks-reference.html#usereducer) के इफ़ेक्ट के बाहर state अपडेट लॉजिक को मूव करने का प्रयास करें। [यह आलेख](https://adamrackis.dev/state-and-use-reducer/) एक उदाहरण प्रस्तुत करता है कि आप यह कैसे कर सकते हैं। **`useReducer` से `dispatch` फ़ंक्शन की पहचान हमेशा स्टेबल होती है** - भले ही रीड्यूसर फ़ंक्शन कॉम्पोनेन्ट के अंदर डिक्लेअर किया गया हो और इसके प्रॉप को रीड करता हो।

एक अंतिम उपाय के रूप में, यदि आप एक क्लास में `this` जैसा कुछ चाहते हैं, तो आप एक मुतबल वेरिएबल को होल्ड करने के लिए [रेफ का उपयोग](/docs/hooks-faq.html#is-there-something-like-instance-variables) कर सकते हैं। फिर आप इसे रिड और राइट सकते हैं। उदाहरण के लिए:

```js{2-6,10-11,16}
function Example(props) {
  // Keep latest props in a ref.
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // Read latest props at any time
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // This effect never re-runs
}
```

ऐसा केवल तभी करें जब आप एक बेहतर विकल्प नहीं ढूंढ सकते हैं, क्योंकि म्यूटेशन पर निर्भर रहने से कौम्पोनॅन्टस कम प्रेडिक्टेबल होते हैं। यदि कोई विशिष्ट पैटर्न है जो अच्छी तरह से ट्रांसलेट नहीं करता है, तो एक रनेबल उदाहरण कोड के साथ [एक समस्या दर्ज करें](https://github.com/facebook/react/issues/new) और हम मदद करने की कोशिश कर सकते हैं।

### shouldComponentUpdate कैसे इम्प्लीमेंट करें? {#how-do-i-implement-shouldcomponentupdate}

आप एक फंक्शन कॉम्पोनेन्ट को `React.memo` के साथ व्रैप कर के शैलो रूप से इसकी props की तुलना कर सकते हैं:

```js
const Button = React.memo((props) => {
  // your component
});
```

यह Hook नहीं है क्योंकि यह Hook की तरह कंपोज़ नहीं है। `React.memo` `PureComponent` के बराबर है, लेकिन यह केवल props की तुलना करता है। (आप पुराने और नए props लेने वाले कस्टम कंपरिसों फ़ंक्शन को स्पेसिफी करने के लिए दूसरा लॉजिक भी जोड़ सकते हैं। यदि यह सही है, तो अपडेट स्किप कर दिया जाता है।)

`React.memo` state की तुलना नहीं करता है क्योंकि तुलना करने के लिए कोई सिंगल state ऑब्जेक्ट नहीं है। लेकिन आप चिल्ड्रन  को प्योर भी बना सकते हैं, या [इंडिविजुअल चिल्ड्रन को भी `useMemo` के साथ ऑप्टिमाइज़ कर सकते हैं](/docs/hooks-faq.html#how-to-memoize-calculations)

### कॅल्क्युलेशन्स को कैसे memoize करें? {#how-to-memoize-calculations}


[`UseMemo`](/docs/hooks-reference.html#usememo) Hook मल्टिपल रेंडर्स के बीच कैश कैलकुलेशन कर आपको पिछले कॅल्क्युलेशन्स को "याद रखने" की सुविधा देता है:

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

यह कोड `computeExpensiveValue (a, b)` कहलाता है। लेकिन अगर डेपेंडेन्सीज़ `[a, b]` अंतिम मूल्य के बाद से नहीं बदली है, `useMemo` इसे दूसरी बार कॉल करने के लिए छोड़ देता है और बस अंतिम वैल्यू का पुन: उपयोग करता है।

याद रखें कि रेंडरिंग के दौरान फंक्शन जो `useMemo` में पास किया जाता, रन होता है। वहां कुछ भी ऐसा न करें जो नार्मल रेंडरिंग के दौरान करते हैं। उदाहरण के लिए, साइड इफेक्ट्स `useEffect` में होते हैं, न कि `useMemo`।

**परफॉरमेंस ऑप्टिमाइजेशन के लिए आप `useMemo` पर भरोसा कर सकते हैं, न कि सेमेंटिक गारंटी के रूप में।** भविष्य में, React कुछ पहले से याद किए गए वैल्यूज को "भूल" सकता है और अगले रेंडर पर उन्हें रीकैलकुलेट कर सकता है, उदहारण के लिए, ऑफस्क्रीन कौम्पोनॅन्टस को मेमोरी से फ्री करना। अपना ऐसा कोड लिख सकते हैं , जो अभी भी `useMemo` के बिना काम करता है - और फिर परफॉरमेंस ऑप्टिमाइजेशन करने के लिए इसे जोड़ें। (दुर्लभ मामलों के लिए जब एक वैल्यू *कभी* रीकंप्यूट नहीं किया जाए, तो आप [लाज़िली इनिशियलाइज़](#how-to-create-expensive-objects-lazily) कर सकते हैं।)

आसानी से, `useMemo` भी आपको एक चाइल्ड के एक्सपेंसिव री-रेंडर को स्किप करने देता है:

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

ध्यान दें कि यह एप्रोच लूप में काम नहीं करेगा क्योंकि Hook कॉल को लूप के अंदर [नहीं](/docs/hooks-rules.html) रखा जा सकता है। लेकिन आप लिस्ट आइटम के लिए एक अलग कॉम्पोनेन्ट को निकाल सकते हैं, और वहां `useMemo` को कॉल कर सकते हैं।

### एक्सपेंसिव ऑब्जेक्ट को लेज़ीली कैसे क्रिएट करें? {#how-to-create-expensive-objects-lazily}

यदि डेपेंडेन्सीज़ समान हैं, तो `useMemo` आपको [एक एक्सपेंसिव गणना को याद](#how-to-memoize-calculations) करने की सुविधा देता है। हालाँकि, यह केवल एक संकेत के रूप में कार्य करता है, और *गारंटी* की कम्प्युटशन नहीं करता है। लेकिन कभी-कभी आपको यह सुनिश्चित करने की आवश्यकता होती है कि एक ऑब्जेक्ट केवल एक बार क्रिएट किया गया है।

**जब प्रारंभिक state बनाना एक्सपेंसिव है, पहला सामान्य उपयोग मामला है:**

```js
function Table(props) {
  // ⚠️ createRows() is called on every render
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

इग्नोरेड इनिशियल state को रेक्रेट होने से बचने के लिए, हम एक **फ़ंक्शन** को `useState` में पास कर सकते हैं:

```js
function Table(props) {
  // ✅ createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

React केवल पहले रेंडर के दौरान इस फ़ंक्शन को कॉल करेगा। [`UseState` API संदर्भ देखें](/docs/hooks-reference.html#usestate)

**आप कभी-कभार `useRef()` प्रारंभिक वैल्यू को फिर से बनाने से बचना चाह सकते हैं।** उदाहरण के लिए, शायद आप यह सुनिश्चित करना चाहते हैं कि कुछ इम्पेरटिव क्लास केवल एक बार बने:

```js
function Image(props) {
  // ⚠️ IntersectionObserver is created on every render
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

`useRef` एक विशेष फ़ंक्शन ओवरलोड को **स्वीकार नहीं करता** है जैसे `useState`। इसके बजाय, आप अपना स्वयं का फ़ंक्शन लिख सकते हैं जो इसे लेज़ीली बनाता है और सेट करता है:

```js
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver is created lazily once
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // When you need it, call getObserver()
  // ...
}
```

यह एक एक्सपेंसिव ऑब्जेक्ट बनाने से बचता है जब तक कि यह पहली बार वास्तव में आवश्यक न हो। यदि आप फ़्लो या टाइपस्क्रिप्ट का उपयोग करते हैं, तो आप सुविधा के लिए `getObserver ()` को एक नॉन-नलबल प्रकार भी दे सकते हैं।


### क्या रेंडर में फंक्शन क्रिएट करने की वजह से Hooks धीमा है? {#are-hooks-slow-because-of-creating-functions-in-render}

आधुनिक ब्राउज़रों में, क्लासेज की तुलना में क्लोसूरेस का रॉ परफॉरमेंस चरम परिदृश्यों को छोड़कर महत्वपूर्ण रूप से भिन्न नहीं है।

इसके अलावा, विचार करें कि Hook के डिजाइन कुछ तरीकों से अधिक कुशल हैं:

* Hook बहुत सारे ओवरहेड से बचते हैं जिनकी क्लासेज को आवश्यकता होती है, जैसे उदाहरण के लिए, क्लास इंस्टैंस और बॉन्डिंग इवेंट हैंडलर्स की कन्स्ट्रुक्टर में कॉस्ट।

* **कोडबेस में प्रचलित है जो हायर-आर्डर कौम्पोनॅन्टस का उपयोग करता है, props और कॉन्टेक्स्ट प्रस्तुत करने वाले कोड को** हुक्स का यूज़ करते हुए डीप कॉम्पोनेन्ट ट्री नेस्टिंग की आवश्यकता नहीं होती है । छोटे कॉम्पोनेन्ट ट्रीज के साथ, React को कम काम करना पड़ता है।

ट्रडीशनली, रिएक्ट में इनलाइन फ़ंक्शन के आसपास प्रदर्शन संबंधी चिंताओं का संबंध इस बात से रहा है कि प्रत्येक रेंडर पर नए कॉलबैक `shouldComponentUpdate` कैसे पास किए जा रहे हैं। Hook तीन तरफ से इस समस्या का सामना करते हैं।

* [`UseCallback`](/docs/hooks-reference.html#usecallback) Hook आपको रीरेंडर्स के बीच एक ही कॉलबैक रिफरेन्स रखने देता है ताकि `shouldComponentUpdate` काम करना जारी रखे:

    ```js{2}
    // Will not change unless `a` or `b` changes
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

* जब इंडिविजुअल चाइल्ड अपडेट करते हैं [`UseMemo`](/docs/hooks-faq.html#how-to-memoize-calculations) Hook, प्योर कॉम्पोनेन्टस की आवश्यकता को कम करते हैं, इसे नियंत्रित करना आसान बनाता है।

* अंत में, [`useReducer`](/docs/hooks-reference.html#usereducer) Hook कॉलबैक को डीपली पास करने की आवश्यकता को कम कर देता है, जैसा कि नीचे बताया गया है।

### कालबैकस को डाउन पास करने से कैसे बचें? {#how-to-avoid-passing-callbacks-down}

हमने पाया है कि ज्यादातर लोग कॉम्पोनेन्ट ट्री के प्रत्येक स्तर के माध्यम से कॉलबैक को मैन्युअल रूप से पारित करने का फ़ायदा नहीं लेते हैं। हालांकि यह अधिक स्पष्ट है, इसे "पाइपलाइन" की तरह महसूस कर सकता है।

बड़े कौम्पोनॅन्टस ट्री में, हम एक वैकल्पिक विकल्प सुझाते हैं कि [`useReducer`](/docs/hooks-reference.html#usereducer) कॉन्टेक्स्ट के माध्यम से `dispatch` फंक्शन पास करें:


```js{4,5}
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // Note: `dispatch` won't change between re-renders
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

`TodosApp` के अंदर ट्री का कोई भी चाइल्ड  `TodosApp` में एक्शन को पास करने के लिए `dispatch` फ़ंक्शन का उपयोग कर सकता है:

```js{2,3}
function DeepChild(props) {
  // If we want to perform an action, we can get dispatch from context.
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```

यह रखरखाव के दृष्टिकोण (कॉल फॉरवार्डिंग को रखने की कोई आवश्यकता नहीं) से अधिक सुविधाजनक है, और कॉलबैक समस्या से पूरी तरह से बचाता है। इस तरह से `dispatch` को पास करना डीप अपडेट के लिए रेकमेण्डेड पैटर्न है।

ध्यान दें कि आप अभी भी चुन सकते हैं कि एप्लिकेशन *state* को props (अधिक स्पष्ट) या कॉन्टेक्स्ट के रूप में पास करना है या नहीं। यदि आप state के नीचे से गुजरने के लिए भी कॉन्टेक्स्ट का उपयोग करते हैं, तो दो अलग-अलग कॉन्टेक्स्ट प्रकारों का उपयोग करें - `dispatch` कॉन्टेक्स्ट कभी नहीं बदलता है, इसलिए इसे रीड करने वाले कौम्पोनॅन्टस को तब तक रेंडर करने की आवश्यकता नहीं है जब तक कि उन्हें एप्लिकेशन state की आवश्यकता न हो।

### कालबैक से बार-बार बदलती हुई एक वैल्यू को कैसे रीड करें? {#how-to-read-an-often-changing-value-from-usecallback}

>ध्यान दें
>
>हम props में इंडिविजुअल कॉलबैक के बजाय [कॉन्टेक्स्ट में `dispatch` को पास](#how-to-avoid-passing-callbacks-down) करने की सलाह देते हैं। नीचे का दृष्टिकोण केवल पूर्णता के लिए यहां उल्लिखित है।

>यह भी ध्यान दें कि यह पैटर्न [कंकररेंट मोड](/blog/2018/03/27/update-on-async-rendering.html) में समस्याएं पैदा कर सकता है। हम भविष्य में और अधिक एर्गोनोमिक विकल्प प्रदान करने की योजना बना रहे हैं, लेकिन अभी सबसे सुरक्षित समाधान कॉलबैक को हमेशा अमान्य करना है यदि यह कुछ वैल्यू परिवर्तनों पर निर्भर करता है।

कुछ दुर्लभ मामलों में आपको [`useCallback`](/docs/hooks-reference.html#usecallback) के साथ एक कॉलबैक को याद करने की आवश्यकता हो सकती है, लेकिन मेमोइजेशन बहुत अच्छी तरह से काम नहीं करता है क्योंकि इनर फ़ंक्शन को भी अक्सर बनाना पड़ता है । यदि आप जो फ़ंक्शन याद कर रहे हैं, वह एक इवेंट हैंडलर है और रेंडरिंग के दौरान उपयोग नहीं किया जाता है, तो आप [रेफ को एक इंस्टैंस वेरिएबल के रूप में उपयोग कर सकते हैं](#is-there-something-like-instance-variables), और अंतिम प्रतिबद्ध वैल्यू को मैन्युअल रूप से इसमें सेव कर सकते हैं:

```js{6,10}
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // Write it to the ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // Read it from the ref
    alert(currentText);
  }, [textRef]); // Don't recreate handleSubmit like [text] would do

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

यह बल्कि एक जटिल पैटर्न है, लेकिन यह दिखाता है कि यदि आपको इसकी ज़रूरत है तो आप यह एस्केप हैच ऑप्टिमाइजेशन कर सकते हैं। यदि आप इसे कस्टम Hook में एक्सट्रेक्ट करते हैं तो यह अधिक अच्छा है:

```js{4,16}
function Form() {
  const [text, updateText] = useState('');
  // Will be memoized even if `text` changes:
  const handleSubmit = useEventCallback(() => {
    alert(text);
  }, [text]);

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
```

किसी भी स्थिति में, हम **इस पैटर्न की सिफारिश नहीं करते हैं** और केवल इसे पूर्णता के लिए यहां दिखाते हैं। इसके बजाय,  [डीप कॉलबैक से गुजरने से बचना ](#how-to-avoid-passing-callbacks-down) बेहतर है।


## अंडर द हुड {#under-the-hood}

### React एसोसिएट Hook कौम्पोनॅन्टस के साथ कैसे कॉल करता है?  {#how-does-react-associate-hook-calls-with-components}

रिएक्ट वर्तमान में रेंडरिंग कॉम्पोनेन्ट का ट्रैक रखता है। [Hook के नियम](/docs/hooks-rules.html) के लिए धन्यवाद, हम जानते हैं कि Hook केवल React कौम्पोनॅन्टस (या कस्टम Hook - जिसे केवल React कौम्पोनॅन्टस से कॉल किया जाता है) से कॉल किया जाता है।

प्रत्येक कॉम्पोनेन्ट से जुड़ी "मेमोरी सेल्स" की एक इंटरनल सूची है। वे सिर्फ JavaScript ऑब्जेक्ट्स जहां हम कुछ डेटा डाल सकते हैं। जब आप Hook का उपयोग करते हैं जैसे `useState()`, यह वर्तमान सेल रीड करता है (या पहले रेंडर के दौरान इसे इनिशियलाइज़ करता है), और फिर पॉइंटर को अगले पर ले जाता है। ऐसे एक से अधिक  `useState()` कॉल में प्रत्येक को इंडिपेंडेंट लोकल state मिलता है।

### Hook के लिए पूर्व कला क्या है? {#what-is-the-prior-art-for-hooks}

Hook कई अलग-अलग स्रोतों से विचारों का संश्लेषण करते हैं:

* [react-future](https://github.com/reactjs/react-future/tree/master/07%20-%20Returning%20State) में एक्सपेरिमेंटल APIs के साथ हमारे पुराने प्रयोग।
* [Ryan Florence](https://github.com/ryanflorence) का [Reactions कॉम्पोनेन्ट](https://github.com/reactions/component) props API प्रस्तुत करने के साथ रिएक्ट समुदाय के प्रयोग।
* [Dominic Gannaway](https://github.com/trueadm) का [`adopt` keyword](https://gist.github.com/trueadm/17beb64288e30192f3aa29cad0218067) रेंडर props के लिए एक शुगर सिंटेक्स प्रस्ताव.
* [DisplayScript](http://displayscript.org/introduction.html) में state वेरिएबल और state सेल.
* ReasonReact में [Reducer components](https://reasonml.github.io/reason-react/docs/en/state-actions-reducer.html).
* Rx में [Subscriptions](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html).
* Multicore OCaml में [Algebraic effects](https://github.com/ocamllabs/ocaml-effects-tutorial#2-effectful-computations-in-a-pure-setting).

[Sebastian Markbåge](https://github.com/sebmarkbage) Hook के लिए मूल डिजाइन के साथ आए, बाद में [Andrew Clark](https://github.com/acdlite), [Sophie Alpert](https://github.com/sophiebits), [Dominic Gannaway](https://github.com/trueadm) और रिएक्ट टीम के अन्य सदस्यों द्वारा इसे और करेक्ट किया गया।

प्रत्येक कॉम्पोनेन्ट से जुड़ी "मेमोरी सेल्स" की एक इंटरनल सूची है। वे सिर्फ JavaScript ऑब्जेक्ट्स जहां हम कुछ डेटा डाल सकते हैं। जब आप Hook का उपयोग करते हैं जैसे `useState()`, यह वर्तमान सेल रीड करता है (या पहले रेंडर के दौरान इसे इनिशियलाइज़ करता है), और फिर पॉइंटर को अगले पर ले जाता है। ऐसे एक से अधिक  `useState()` कॉल में प्रत्येक को इंडिपेंडेंट लोकल state मिलता है।

### Hook के लिए पूर्व कला क्या है? {#what-is-the-prior-art-for-hooks}

Hook कई अलग-अलग स्रोतों से विचारों का संश्लेषण करते हैं:

* [react-future](https://github.com/reactjs/react-future/tree/master/07%20-%20Returning%20State) में एक्सपेरिमेंटल APIs के साथ हमारे पुराने प्रयोग।
* [Ryan Florence](https://github.com/ryanflorence) का [Reactions कॉम्पोनेन्ट](https://github.com/reactions/component) props API प्रस्तुत करने के साथ रिएक्ट समुदाय के प्रयोग।
* [Dominic Gannaway](https://github.com/trueadm) का [`adopt` keyword](https://gist.github.com/trueadm/17beb64288e30192f3aa29cad0218067) रेंडर props के लिए एक शुगर सिंटेक्स प्रस्ताव.
* [DisplayScript](http://displayscript.org/introduction.html) में state वेरिएबल और state सेल.
* ReasonReact में [Reducer components](https://reasonml.github.io/reason-react/docs/en/state-actions-reducer.html).
* Rx में [Subscriptions](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html).
* Multicore OCaml में [Algebraic effects](https://github.com/ocamllabs/ocaml-effects-tutorial#2-effectful-computations-in-a-pure-setting).

[Sebastian Markbåge](https://github.com/sebmarkbage) Hook के लिए मूल डिजाइन के साथ आए, बाद में [Andrew Clark](https://github.com/acdlite), [Sophie Alpert](https://github.com/sophiebits), [Dominic Gannaway](https://github.com/trueadm) और रिएक्ट टीम के अन्य सदस्यों द्वारा इसे और करेक्ट किया गया।

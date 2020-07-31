---
id: hooks-overview
title: एक नज़र में Hooks
permalink: docs/hooks-overview.html
next: hooks-state.html
prev: hooks-intro.html
---

React 16.8 में *Hooks* नामक एक नया फीचर ऐड हुआ है। यह आपको class का इस्तेमाल किये बिना state और अन्य React विशेषताओं का उपयोग करने देता है।

Hooks [बैकवर्डस-कम्पेटिबल](/docs/hooks-intro.html#no-breaking-changes) है। यह पेज अनुभवी React उपयोगकर्ताओं के लिए Hooks का ओवरव्यू प्रदान करता है। यह एक तेज गति का ओवरव्यू है। यदि आप उलझन में पड़ जाते है, तो निचे दिखाए गए पीले बॉक्स की तलाश करे:

>विस्तृत विवरण
>
>Hooks के React में परिचय होने के कारणो को जानने के लिए [मोटिवेशन](/docs/hooks-intro.html#motivation) पढ़ें।

**↑↑↑ प्रत्येक खंड इस तरह के पीले बॉक्स के साथ समाप्त होता है।** वे आपको और जानकारी की तरफ ले जाते है।

## 📌 State Hook {#state-hook}

यह उदाहरण एक काउंटर को रेंडर करता है। जब आप बटन पर क्लिक करते है, तो यह वैल्यू को बढ़ाता है।

```js{1,4,5}
import React, { useState } from 'react';

function Example() {
  // एक नया state variable घोषित करा जा रहा हैं, जिसे हम "काउंट" कहेंगे
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        क्लिक करें
      </button>
    </div>
  );
}
```

यहाँ, `useState` एक *Hook* है (हम इसके बारे में एक पल में बात करेंगे)। हम इसे फंक्शन कौम्पोनॅन्ट के अंदर लोकल state डालने के लिए कॉल करते है। री-रेंडरर्स के बीच React इस state को संरक्षित करता है। `useState` एक जोड़ा देता है: एक *current* state वैल्यू और एक फ़ंक्शन जो आपको इसे अपडेट करने देता है। आप इस फ़ंक्शन को किसी इवेंट हैडलर या कहीं और से कॉल कर सकते है। यह एक class में `this.setState` के समान है, लेकिन यह पुराने और नए state को एक साथ नहीं मिलाता। (हम [State Hook उपयोग करते समय](/docs/hooks-state.html) में एक उदाहरण दिखाएंगे जिसमे `useState` की `this.state` से तुलना की गयी है।

`UseState` का एकमात्र पैरामीटर initial state है। ऊपर दिखाए हुए उदाहरण में, यह `0` है क्योंकि हमारा काउंटर शून्य से शुरू होता है। ध्यान दें कि `this.state` के विपरीत, यहाँ state के पास कोई object नहीं है -- पर यह एक object भी हो सकता है, यदि आप चाहें। Initial state का पैरामीटर केवल पहले रेंडर के दौरान उपयोग किया जाता है।

#### कई state वेरिएबल्स को घोषित करना {#declaring-multiple-state-variables}

आप एक कौम्पोनॅन्ट में एक से अधिक बार State Hook का उपयोग कर सकते है:

```js
function ExampleWithManyStates() {
  // यहाँ कई state variables घोषित हो रहे हैं!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('केला');
  const [todos, setTodos] = useState([{ text: 'Hooks सीखें' }]);
  // ...
}
```

[ऐरे डेस्ट्रक्टरिंग] सिंटेक्स हमें state वेरिएबल्स को अलग-अलग नाम देने की सुविधा देता है जो हमें `useState` को घोषित करके मिलते है। ये नाम `useState` एपीआई का हिस्सा नहीं है। इसके बजाय, React मानता है कि यदि आप कई बार `useState` कॉल करते है, तो आप इसे हर रेंडर के दौरान उसी क्रम में करते है। हम इसके बारे में फिर बात करेंगे और बताएँगे की यह कहाँ उपयोगी होता है।

#### लेकिन hook है क्या? {#but-what-is-a-hook}

Hooks ऐसे फंक्शन है जो आपको React State और लाइफ साइकिल का उपयोग फ़ंक्शन कौम्पोनॅन्टस के माध्यम से करने की सुविधा देते है। Hooks क्लासेस के अंदर काम नहीं करते - वे आपको क्लासेस के बिना React का उपयोग करने देते है। (हम [सलाह नहीं देते](/docs/hooks-intro.html#gradual-adoption-strategy) की आप अपने मौजूदा कौम्पोनॅन्टस को रात भर में Hooks में परिवर्तित करदे लेकिन यदि आप चाहें तो नए कौम्पोनॅन्टस में Hooks का उपयोग शुरू कर सकते है।)

React `useState` जैसे कुछ बने बनाये Hooks प्रदान करता है। आप विभिन्न कौम्पोनॅन्टस के बीच stateful बिहेवियर का फिर से उपयोग करने के लिए अपने स्वयं के Hooks भी बना सकते है। हम बने बनाये Hooks को पहले देखते है।

>विस्तृत विवरण
>
>आप समर्पित पेज पर state hook के बारे में अधिक जान सकते है: [State Hook का उपयोग करना](/docs/hooks-state.html)

## ⚡️ Effect Hook {#effect-hook}

आपने पहले डेटा फेचिंग, सब्स्क्रिप्शन, या मैन्युअल रूप से DOM को React कौम्पोनॅन्टस के उपयोग से बदला हुआ है। हम इन ऑपरेशनों को "साइड इफेक्ट्स" (या शॉर्ट में "effects") कहते है क्योंकि वे अन्य कौम्पोनॅन्टस को प्रभावित कर सकते है और रेंडरिंग के दौरान नहीं चलाये जा सकते।

Effect Hook, `useEffect`, एक फ़ंक्शन कौम्पोनॅन्टस से साइड इफेक्ट करने की क्षमता देता है। यह उसी प्रकार में कार्य करता है जैसे `componentDidMount`, `componentDidUpdate`, और `componentWillUnmount` React classes में करते है, लेकिन यह एक ही API में एकीकृत है। (हम इन तरीकों की तुलना में `useEffect` की तुलना करने वाले उदाहरण यहाँ दिखाएंगे [Effect Hook का उपयोग करना](/docs/hooks-effect.html)।)

उदाहरण के लिए, React DOM को अपडेट करने के बाद यह कौम्पोनॅन्ट डॉक्यूमेंट का शीर्षक सेट करता है: 

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // `componentDidMount`, `componentDidUpdate` के समान
  useEffect(() => {
    // browser API का उपयोग करके डॉक्यूमेंट के शीर्षक को अपडेट करें
    document.title = `आपने ${count} बार क्लिक किया`;
  });

  return (
    <div>
      <p>आपने ${count} बार क्लिक किया</p>
      <button onClick={() => setCount(count + 1)}>
        मुझे क्लिक करें
      </button>
    </div>
  );
}
```

जब आप `useEffect` कॉल करते है, तब React DOM पे अपने बदलाव को फ्लश करके "effect" फ़ंक्शन चलाता है। कौम्पोनॅन्टस के अंदर effects को डिक्लेअर किया जाता है ताकि वो इसके props और state को यूज़ कर सके। डिफ़ॉल्ट रूप से, React हर रेंडर के बाद effects चलाता है -- पहले रेंडर *के साथ भी*। ये class lifecycles की तुलना में कैसे काम करता है इसके बारे में हम यहाँ और बात करेंगे: [Effect hook का उपयोग](/docs/hooks-effect.html)

Effects ऑप्शनल रूप से यह भी निर्दिष्ट कर सकते है कि उसका "clean up" कैसे करे। यह आप "effect" मैं एक फंक्शन return करके कर सकते है। उदाहरण के लिए, यह कौम्पोनॅन्ट किसी मित्र के ऑनलाइन स्टेटस को सब्सक्राइब करने के लिए एक effect का उपयोग करता है, और बाद मैं इससे अनसब्सक्राइब करके क्लीन करता है:

```js{10-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

इस उदाहरण में, React हमारे `ChatAPI` से तब अनसब्सक्राइब हो जाती है जब कौम्पोनॅन्ट अनमाउंट हो जाता है, और अगले रेंडर पर भी क्यूंकि हर रेंडर पे effect दोबारा चलता है। अगर `props.friend.id` नहीं बदलता जो हमने `ChatAPI` को पास किया है तो React री-सब्सक्राइबिंग को स्किप कर देगा (आप इस बारे मैं यहाँ और पढ़ सकते है: [React री-सब्सक्राइबिंग को कैसे स्किप करें](/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects))

`useState` की तरह, आप एक कौम्पोनॅन्ट में एक से अधिक effect का उपयोग कर सकते है:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `आपने ${count} बार क्लिक किया`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

Hooks आपको एक कौम्पोनॅन्ट में साइड इफेक्ट को व्यवस्थित करने देते है जो pieces से संबंधित होते है (जैसे कि सब्सक्रिप्शन लेना और हटाना), वे आपको लाइफसाइकिल के तरीकों के आधार पर विभाजित करने के लिए मजबूर नहीं करते।

>विस्तृत विवरण
>
>आप एक समर्पित पेज पर `useEffect` के बारे में अधिक जान सकते है: [Effect Hook का उपयोग करना](/docs/hooks-effect.html)

## ✌️ Hooks के नियम {#rules-of-hooks}

Hooks JavaScript फंक्शन्स है, लेकिन वे दो अतिरिक्त नियम लागू करते है:

* Hooks को केवल **सबसे उपर** कॉल करें। लूप्स, कंडीशंस, या नेस्टेड फ़ंक्शन के अंदर Hooks को कॉल न करें।
* Hooks को सिर्फ **React फ़ंक्शन कौम्पोनॅन्ट** मैं ही कॉल करें। नियमित जावास्क्रिप्ट फ़ंक्शंस से Hooks कॉल न करें। (Hooks को कॉल करने के लिए सिर्फ एक अन्य वैध स्थान है -- अपने स्वयं के कस्टम Hooks। हम उनके बारे में एक क्षण में जानेंगे।)

हम एक [लिंटर प्लगइन](https://www.npmjs.com/package/eslint-plugin-react-hooks) यूज़ करेंगे जो इन नियमों को खुद लागू कर देगा। हम समझते है कि ये नियम शुरू मैं थोड़े सीमित या मुश्किल लग सकते हैं, लेकिन वे Hooks को अच्छे से काम करने के लिए आवश्यक है।

>विस्तृत विवरण
>
>आप एक समर्पित पेज पर इन नियमों के बारे में अधिक जान सकते है: [Hooks के नियम](/docs/hooks-rules.html)

## 💡 अपने खुद के Hooks बनाना {#building-your-own-hooks}

कभी-कभी, हम कौम्पोनॅन्टस के बीच कुछ स्टेटफुल लॉजिक का फिर से उपयोग करना चाहते है। परंपरागत रूप से, इस समस्या के दो लोकप्रिय समाधान थे: [higher-order कौम्पोनॅन्ट](/docs/higher-order-components.html) और [रेंडर प्रॉप्स](/docs/render-props.html)। लेकिन कस्टम Hooks आपको आपके tree में अधिक कौम्पोनॅन्ट को ऐड करे बिना ऐसा करने देते है।

इस पेज मैं पहले, हमने एक `FriendStatus` कौम्पोनॅन्ट पेश किया था, जो किसी मित्र के ऑनलाइन स्टेटस की सब्सक्रिप्शन के लिए `useState` और `useEffect` Hook को कॉल करता है। मान लें कि हम इस सब्सक्रिप्शन लॉजिक को किसी अन्य कौम्पोनॅन्ट में फिर से उपयोग करना चाहते है।

सबसे पहले, हम इस लॉजिक को `useFriendStatus` नामक एक कस्टम Hook में निकालेंगे:

```js{3}
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

यह एक आर्गुमेंट के रूप में `friendID` लेता है, और रिटर्न करता है कि क्या हमारा दोस्त ऑनलाइन है।

अब हम इसे दोनों कौम्पोनॅन्टस में उपयोग कर सकते है:


```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

हर कौम्पोनॅन्ट की स्टेट पूरी तरह से स्वतंत्र है। Hooks *स्टेट फुल लॉजिक* का फिर से उपयोग करने का एक तरीका है, न कि state का। वास्तव में, एक Hook करने के लिए प्रत्येक *कॉल* में एक पूरी तरह से अलग state है -- आप वही कस्टम Hook एक ही कौम्पोनॅन्ट में दो बार उपयोग कर सकते है।

कस्टम Hooks एक विशेषता से ज़्यादा एक कन्वेंशन है। यदि किसी फ़ंक्शन का नाम "`use`" से शुरू होता है और इसे अन्य Hooks कॉल करते है, तो हम कहते है कि यह एक कस्टम Hook है। हमारे लिंटर प्लगइन `useSomething` नामकरण कन्वेंशन का उपयोग करके कोड में बग ढूंढने में मदद करता है।

आप कस्टम Hooks फॉर्म हैडलिंग, एनीमेशन, डेक्लेरेटिव सब्सक्रिप्शन, टाइमर और शायद और अधिक यूज़ केसेस के लिए लिख सकते है जिसपे हमने कभी विचार भी नहीं किया। हम यह देखने के लिए उत्साहित है कि React समुदाय और कौन कौन से कस्टम Hooks लेकर आएंगे।

>विस्तृत विवरण
>
>आप एक समर्पित पेज पर कस्टम Hooks के बारे में अधिक जान सकते है: [अपने खुद के Hooks का निर्माण](/docs/hooks-custom.html).

## 🔌 अन्य Hooks {#other-hooks}

कुछ Hooks ऐसे भी है जो कम इस्तेमाल होते है। उदाहरण के लिए, [`useContext`](/docs/hooks-reference.html#usecontext) आपको नेस्टिंग के बिना React context को सब्सक्राइब करने देता है:

```js{2,3}
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

और [`useReducer`](/docs/hooks-reference.html#usereducer) आपको एक reducer के साथ जटिल कौम्पोनॅन्टस के लोकल state को संभालने देता है:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

>विस्तृत विवरण
>
>आप एक समर्पित पेज पर सब बिल्ड इन Hooks के बारे में अधिक जान सकते है: [Hooks API संदर्भ](/docs/hooks-reference.html)

## अगला कदम {#next-steps}

अगर आपको कुछ चीजें समझ में नहीं आईं या आप अधिक विस्तार से सीखना चाहते है, आप अगले पेज पढ़ सकते है, [State Hook](/docs/hooks-state.html) डॉक्यूमेंटेशन के साथ शुरू करते हुए।

आप इन पेजों को भी देख सकते है: [Hooks API संदर्भ](/docs/hooks-reference.html) और [Hooks FAQ](/docs/hooks-faq.html)

अंत में, [introduction page](/docs/hooks-intro.html) को देखना ना भूले जो बताता है कि *हम* Hooks क्यों बना रहे है और कैसे हम classes के साथ-साथ उनका उपयोग करना शुरू करेंगे -- हमारे एप्लिकेशन को फिरसे लिखे बिना।

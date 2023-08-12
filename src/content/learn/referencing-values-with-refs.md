---
title: 'Refs के ज़रिए वैल्यू का रेफरन्स लेना'
---

<Intro>

जब आप किसी कौम्पोनॅन्ट को कुछ जानकारी "याद" रखवाना चाहते हों, लेकिन आप नहीं चाहते कि वह जानकारी [नए रेंडर को ट्रिगर करे](/learn/render-and-commit), तब आप एक *ref* का इस्तेमाल कर सकते हैं।

</Intro>

<YouWillLearn>

- अपने कौम्पोनॅन्ट में ref कैसे ऐड करें
- ref के वैल्यू को कैसे अपडेट करें
- ref state से कैसे अलग होते हैं
- ref को सुरक्षित तरीके से कैसे इस्तेमाल करें

</YouWillLearn>

## अपने कौम्पोनॅन्ट में ref ऐड करना {/*adding-a-ref-to-your-component*/}

आप React से `useRef` हुक इम्पोर्ट करके अपने कौम्पोनॅन्ट में एक ref ऐड कर सकते हैं:

```js
import { useRef } from 'react';
```

अपने कौम्पोनॅन्ट के अंदर, `useRef` हुक को कॉल करें और इनिशियल वैल्यू पास करें जिसे आप केवल आर्गुमेंट के रूप में रेफरन्स करना चाहते हैं। उदाहरण के लिए, यहां वैल्यू `0` के लिए एक ref है:

```js
const ref = useRef(0);
```

`useRef` एक इस तरह के ऑब्जेक्ट को रिटर्न करता है:

```js
{ 
  current: 0 // The value you passed to useRef
}
```

<Illustration src="/images/docs/illustrations/i_ref.png" alt="An arrow with 'current' written on it stuffed into a pocket with 'ref' written on it." />

आप उस ref के करंट वैल्यू को `ref.current` प्रॉपर्टी से एक्सेस कर सकते हैं। यह वैल्यू म्यूटेबल है, मतलब आप इसे रीड और राइट दोनों कर सकते हैं। यह आपके कौम्पोनॅन्ट का एक सीक्रेट पॉकेट की तरह है जिसे React ट्रैक नहीं करता। (यही वजह है जो इसे React में एकतरफा डेटा फ्लो से इसे एक "एस्केप हैच" बनाता है - इसके बारे में नीचे और अधिक जानकारी है!)

यहाँ, बटन पर हर क्लिक से `ref.current` इन्क्रीमेंट होगा:

<Sandpack>

```js
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```

</Sandpack>

यह ref एक नंबर को पॉइंट कर रहा है, लेकिन [state](/learn/state-a-components-memory) की तरह, आप कुछ भी पॉइंट कर सकते हैं: एक स्ट्रिंग, एक ऑब्जेक्ट, या एक फंक्शन तक। state की तुलना में, ref एक प्लैन जावास्क्रिप्ट ऑब्जेक्ट है जिसमें आप `current` प्रॉपर्टी को रीड कर सकते हैं और उसे मॉडिफाय भी कर सकते हैं।

ध्यान दें **यहाँ हर इन्क्रीमेंट के बाद भी कौम्पोनॅन्ट फिर से रेंडर नहीं होता है।** जैसा कि state के साथ होता है, React ref को फिर से रेंडर करने से रोक कर रखता है। हालांकि, state सेट करने से कौम्पोनॅन्ट फिर से रेंडर हो जाता है। ref को बदलने से कौम्पोनॅन्ट फिर से रेंडर नहीं होता है!

## उदाहरण: एक स्टॉपवॉच बनाए {/*example-building-a-stopwatch*/}

आप एक कौम्पोनॅन्ट में ref और state को ऐड कर सकते हैं। उदाहरण के लिए, आइए एक स्टॉपवॉच बनाते हैं जिसे यूज़र एक बटन दबाकर शुरू या बंद कर सकता है। यह डिस्प्ले करने के लिए कि यूज़र द्वारा "Start" बटन दबाए जाने के बाद से कितना समय बीत चुका है, 
आपको इस बात का ध्यान रखना होगा कि स्टार्ट बटन कब दबाया गया था और करंट समय क्या है **इस जानकारी का इस्तेमाल रेंडरिंग के लिए किया जाता है, इसीलिए आप इसे state में रखेंगे:**

```js
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
```

जब यूज़र "Start" दबाता है, तब आप समय अपडेट करने के लिए हर 100 मिलीसेकंड के बाद [`setInterval`](https://developer.mozilla.org/docs/Web/API/setInterval) का इस्तेमाल करेंगे:

<Sandpack>

```js
import { useState } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  function handleStart() {
    // Start counting.
    setStartTime(Date.now());
    setNow(Date.now());

    setInterval(() => {
      // Update the current time every 10ms.
      setNow(Date.now());
    }, 10);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
    </>
  );
}
```

</Sandpack>

जब "Stop" बटन दबाया जाता है, आपको मौजूदा इंटरवल को रद्द करने की जरूरत है ताकि यह `now` state वेरिएबल को अपडेट न करें। आप [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) को कॉल करके ऐसा कर सकते हैं, लेकिन आपको इसे इंटरवल आईडी देना होगा जिसे पहले `setInterval` कॉल द्वारा लौटाया गया था जब यूज़र ने Start दबाया था। आपको कहीं इंटरवल आईडी रखने की जरूरत है। **चूंकि इंटरवल आईडी का इस्तेमाल रेंडर के लिए नहीं किया जाता है, आप इसे ref में रख सकते हैं :**

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
```

</Sandpack>

जब कुछ इनफॉर्मेशन रेंडरिंग के लिए यूज होती है, तब उसे state में रखें। और जब कुछ इनफ़ॉर्मेशन सिर्फ़ event-handler को चाहिए या उसे बदलने से री-रेंडर करने की ज़रूरत नहीं होती है, तब ref का इस्तेमाल करना ज़्यादा अच्छा रहेगा!

## ref और state के बीच अंतर {/*differences-between-refs-and-state*/}

शायद आप सोच रहे हैं कि state की तुलना में ref कम "स्ट्रिक्ट" लगता हैं—उदाहरण के लिए, आप इन्हें म्यूटेट कर सकते हैं इससे आपको हमेशा स्टेट सेटिंग फंक्शन का इस्तेमाल नहीं करना होगा। लेकिन ज्यादातर मामलों में, आप state का इस्तेमाल करना चाहेंगे। Ref एक "एस्केप हैच" हैं जिसकी आपको अक्सर ज़रूरत नहीं होगी। यहां बताया गया है कि state और ref की तुलना कैसे की जाती है:

| refs                                                                                  | state                                                                                                                     |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `useRef(initialValue)` `{ current: initialValue }` को रिटर्न करता है।                          | `useState(initialValue)` करंट state वेरिएबल की वैल्यू और state सेट करने वाले फंक्शन को रिटर्न करता है (`[value, setValue]`)। |
| जब आप इसे बदलते हैं तो यह दोबारा रेंडर नहीं होता है।                                         | जब आप इसे बदलते हैं तो यह दोबारा रेंडर होता है।                                                                                    |
| "म्यूटेबल"—आप रेंडरिंग प्रोसेस के बाहर `current` वेरिएबल की वैल्यू को मॉडिफाई और अपडेट कर सकते हैं। | "इमम्यूटेबल"—क्यू को दोबारा रेंडर कराने के लिए, आपको state सेटिंग फंक्शन से state वेरिएबल्स को मॉडिफाई करना पड़ता है।                       |
| रेंडरिंग के दौरान `current` वैल्यू को रीड (या राइट) नहीं करना चाहिए। | आप किसी भी समय state को रीड कर सकते हैं। हालांकि, हर रेंडर के पास अपनी state का [स्नैपशॉट](/learn/state-as-a-snapshot) होता है जो बदलता नहीं है।

यहाँ एक काउंटर बटन है जो state के साथ इम्पलीमेंट किया गया है:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You clicked {count} times
    </button>
  );
}
```

</Sandpack>

यहाँ `count` का वैल्यू बताया गया है, इसलिए उसके लिए state वैल्यू का इस्तेमाल करना सही है। जब काउंटर की वैल्यू `setCount()` से सेट की जाती है, React कॉम्पोनेंट को दोबारा रेंडर करता है और स्क्रीन नए काउंट को दिखाता है।

अगर आप इसे ref के साथ इम्पलीमेंट करने की कोशिश करेंगे, तो React कॉम्पोनेंट को दोबारा रेंडर नहीं करेगा, इसलिए आप कभी भी काउंट में बदलाव नहीं देख पाएंगे! देखें कि इस बटन पर क्लिक करने से **उसका टेक्स्ट अपडेट नहीं होता है**:

<Sandpack>

```js
import { useRef } from 'react';

export default function Counter() {
  let countRef = useRef(0);

  function handleClick() {
    // This doesn't re-render the component!
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick={handleClick}>
      You clicked {countRef.current} times
    </button>
  );
}
```

</Sandpack>

इसीलिए रेंडर के दौरान `ref.current` को रीड करने से कोड अनरीलाऐबल होजाता है। अगर आपको उसकी जरूरत है, तो ref के बजाय state का इस्तेमाल करें।

<DeepDive>

#### अंदर से useRef कैसे काम करता है?? {/*how-does-use-ref-work-inside*/}

हालाँकि React दोनों `useState` और `useRef` उपलब्ध करता है, लेकिन प्रिंसिपल से `useRef` `useState` _के ऊपर_ लागू किया जा सकता है। आप यह कल्पना कर सकते हैं कि React के अंदर, `useRef` इस तरह लागू होता है:

```js
// Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

पहले रेंडर के दौरान, `useRef` `{ current: initialValue }` रिटर्न करता है। यह ऑब्जेक्ट React द्वारा स्टोर किया जाता है, ताकि अगले रेंडर के दौरान वही ऑब्जेक्ट रिटर्न किया जा सके। इस उदाहरण में state सेटर इस्तेमाल नहीं होता है। यह अनावश्यक है क्योंकि `useRef` हमेशा एक ही ऑब्जेक्ट रिटर्न करता है!

React में `useRef` का एक built-in वर्शन उपलब्ध होता है क्योंकि इसका इस्तेमाल वास्तविकता में बहुत आम है। लेकिन आप इसे एक साधारण state वेरिएबल की तरह भी समझ सकते हैं जिसमें सेटर नहीं होता है। यदि आप ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग से फेमिलिअर हैं तो ref आपको इंस्टेंस फ़ील्ड की याद दिला सकता हैं--लेकिन इसमें `this.something` की बजाय `somethingRef.current` लिखा जाता है।

</DeepDive>

## ref का इस्तेमाल कब करें {/*when-to-use-refs*/}

आम तौर पर, आप एक ref का इस्तेमाल तभी करेंगे जब आपके कौम्पोनॅन्ट को React से "बाहर निकल के" बाहरी APIs के साथ संवाद करने की जरूरत होगी-अक्सर एक ब्राउज़र API जो कम्पोनेंट की परफ़ॉर्मेंस को इम्पैक्ट नहीं करता। यह कुछ ऐसी रेयर परिस्थितियां हैं:

- [Timeout IDs](https://developer.mozilla.org/docs/Web/API/setTimeout) को स्टोर करना।
- [DOM elements](https://developer.mozilla.org/docs/Web/API/Element) को स्टोर करना और मैनिपुलेट करना।, जिसे हम [अगले पेज](/learn/manipulating-the-dom-with-refs) पर कवर करेंगे।
- JSX को कैलकुलेट करने के लिए आवश्यक न होने वाले अन्य ऑब्जेक्ट्स को स्टोर करना।

यदि आपके कौम्पोनॅन्ट को कुछ वैल्यू स्टोर करने की जरुरत है, लेकिन यह रेंडरिंग लॉजिक पर असर नहीं डालता है, तो ref का इस्तेमाल करें।

## ref के लिए बेस्ट प्रैक्टिस {/*best-practices-for-refs*/}

इन प्रिंसिपल का पालन करने से आपके कॉम्पोनेन्ट ज्यादा प्रेडिक्टेबल हो जाएँगे:

- **ref को एक एस्केप हैच के रूप में इस्तेमाल करें।** जब आप एक्सटर्नल सिस्टम या ब्राउज़र APIs के साथ काम करते हैं तब ref बहुत काम आता हैं। यदि आपके एप्लिकेशन लॉजिक और डेटा फ्लो ref पर बहुत निर्भर करते हैं, तो आपको अपने एप्रोच को बदलने की ज़रूरत है।

- **रेंडरिंग के दौरान `ref.current` को न रीड करें और न ही राइट करें।** अगर कुछ जानकारी की रेंडरिंग के दौरान ज़रूरत पड़ती है तो, [state](/learn/state-a-components-memory) का इस्तेमाल करें। क्योंकि React को पता नहीं होता कब `ref.current` बदलता है, यहाँ तक कि रेंडरिंग के दौरान इसे रीड करने से आपके कौम्पोनॅन्ट के बिहेवियर को प्रेडिक्ट करना मुश्किल हो जाता है। (इसका एक ही एक्सेप्शन है जो आप `if (!ref.current) ref.current = new Thing()` ऐसे कोड का इस्तेमाल करके पहले रेंडर के दौरान रेफरेंस को सेट कर सकते हैं।)

React state की सीमाएँ ref के लिए लागू नहीं होती हैं। उदाहरण के लिए, state [हर रेंडर के लिए एक स्नैपशॉट](/learn/state-as-a-snapshot) की तरह काम करता है और [सिंक्रोनोसली से अपडेट नहीं होता है।](/learn/queueing-a-series-of-state-updates) लेकिन जब आप ref के करंट वैल्यू को म्यूटेट करते हैं, तो वाह तुरंत बदल जाता है।

```js
ref.current = 5;
console.log(ref.current); // 5
``` 

यह इसलिए होता है क्योंकि **ref खुद एक साधारण जावास्क्रिप्ट ऑब्जेक्ट है** और इसलिए यह उसके जैसे काम करता है।

जब आप ref के साथ काम करते हैं तो [म्यूटेशन से बचने](/learn/updating-objects-in-state) की चिंता करने की ज़रुरत नहीं है। जब तक आप म्युटेट कर रहे ऑब्जेक्ट को रेंडरिंग के लिए नहीं इस्तेमाल कर रहे हैं, React को कोई फर्क नहीं पड़ता कि आप ref या उसकी कंटेंट्स के साथ क्या कर रहे हैं।

## ref और DOM {/*refs-and-the-dom*/}

आप ref को किसी भी वैल्यू पर पॉइंट कर सकते हैं। हालांकि, एक ref का सबसे आम काम एक DOM एलिमेंट तक पहुंचने का होता है। उदाहरण के लिए, अगर आप किसी input को प्रोग्रामेटिकली focus करना चाहते है। जब आप JSX में ref एट्रिब्यूट में एक ref को पास करते हैं, जैसे `<div ref={myRef}>`, तो React उस संबंधित DOM एलिमेंट को `myRef.current` में रखता हैं। आप इसके बारे में अधिक जानकारी [Manipulating the DOM with Refs](/learn/manipulating-the-dom-with-refs) में पढ़ सकते हैं।

<Recap>

- Ref रेंडर करने के लिए इस्तेमाल नहीं होने वाले वैल्यूज को पकड़ने के लिए एक एस्केप हैच हैं। आपको इनकी अक्सर जरूरत नहीं होगी।
- Ref एक सादा जावास्क्रिप्ट ऑब्जेक्ट होता है जिसमें एक ही प्रॉपर्टी होती है जो `current` नाम से होती है और जिसे आप पढ़ सकते हैं या सेट कर सकते हैं।
- आप `useRef` हुक को कॉल करके React से एक Ref मांग सकते हैं।
- state की तरह, ref आपको कौम्पोनॅन्ट के री-रेंडर के बीच जानकारी रखने की अनुमति देते हैं।
- state के विपरीत, Ref के `current` वैल्यू को सेट करने से फिर से रेंडर ट्रिगर नहीं होता हैं।
- रेंडरिंग के दौरान `ref.current` को न रीड करें और न ही राइट करें। यह आपके कौम्पोनॅन्ट को प्रेडिक्ट करना मुश्किल कर देता है।

</Recap>

<Challenges>

#### ब्रोकन चैट इनपुट को ठीक करें {/*fix-a-broken-chat-input*/}

एक मैसेज टाइप करें और "Send" पर क्लिक करें। आपको "Sent!" अलर्ट दिखाई देने से पहले तीन सेकंड कि देरी नोटिस होगी। इस देरी के दौरान, आप "Undo" बटन देख सकते हैं। उस पर क्लिक करें। यह "Undo" बटन "Sent!" मैसेज को रोकने के लिए होता है। यह `handleSend` के दौरान सेव की गई timeout ID के लिए [`clearTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) को कॉल करता है। हालांकि, "Undo" पर क्लिक करने के बाद भी, "Sent!" मैसेज दिखाई दे रहा है। इसका कारण खोजें और उसे ठीक करें।

<Hint>

`let timeoutID` जैसी साधी वेरिएबल्स फिर से रेंडर के बीच "सर्वाइव" नहीं करता क्योंकि हर रेंडर के साथ आपके कौम्पोनॅन्ट को फिर से चलाया जाता है (और इसके वेरिएबल्स को फिर से इनिशियलाइज़ किया जाता है)। क्या आपने timeout ID को कहीं और रखना चाहिए?

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  let timeoutID = null;

  function handleSend() {
    setIsSending(true);
    timeoutID = setTimeout(() => {
      alert('Sent!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutID);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          Undo
        </button>
      }
    </>
  );
}
```

</Sandpack>

<Solution>

जब भी आपका कौम्पोनॅन्ट फिर से रेंडर होता है (जैसे कि जब आप state सेट करते हैं), सभी लोकल वेरिएबल्स शुरुआत से इनिशियलाइज हो जाते हैं। इसीलिए आप `timeoutID` को लोकल वेरिएबल में सेव नहीं कर सकते और फिर भविष्य में दूसरे event-handler से इसे "देखने" की उम्मीद नहीं कर सकते है। इसके बजाय, इसे रेंडर के बीच संभालने वाले ref में स्टोर करें, जिसे React रेंडर के बीच संभालेगा।

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const timeoutRef = useRef(null);

  function handleSend() {
    setIsSending(true);
    timeoutRef.current = setTimeout(() => {
      alert('Sent!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutRef.current);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          Undo
        </button>
      }
    </>
  );
}
```

</Sandpack>

</Solution>

#### री-रेंडर होने में फेल होने वाले कौम्पोनॅन्ट को ठीक करें। {/*fix-a-component-failing-to-re-render*/}

यह बटन "On" और "Off" दिखाने के बीच टॉगल करने के लिए है। हालांकि, यह हमेशा "Off" दिखा रहा है। इस कोड में क्या गलत है? इसे ठीक करें।

<Sandpack>

```js
import { useRef } from 'react';

export default function Toggle() {
  const isOnRef = useRef(false);

  return (
    <button onClick={() => {
      isOnRef.current = !isOnRef.current;
    }}>
      {isOnRef.current ? 'On' : 'Off'}
    </button>
  );
}
```

</Sandpack>

<Solution>

इस उदाहरण में, ref कि करंट वैल्यू रेंडरिंग आउटपुट के लिए इस्तेमाल कि गाइ है: `{isOnRef.current ? 'On' : 'Off'}`। यह एक संकेत है कि यह जानकारी ref में नहीं होनी चाहिए थी, बल्कि इसे state में रखा जाना चाहिए था। इसे ठीक करने के लिए, ref को हटाकर state का इस्तेमाल करें।:

<Sandpack>

```js
import { useState } from 'react';

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => {
      setIsOn(!isOn);
    }}>
      {isOn ? 'On' : 'Off'}
    </button>
  );
}
```

</Sandpack>

</Solution>

#### डिबाउंसिंग को ठीक करें {/*fix-debouncing*/}

इस उदाहरण में, सभी बटन क्लिक हैंडलर ["डिबाउंस्ड"](https://redd.one/blog/debounce-vs-throttle) हैं। इसका क्या मतलब होता है देखने के लिए, किसी एक बटन पर क्लिक करें। ध्यान दें कि मैसेज एक सेकंड बाद दिखाई देता है। अगर आप मैसेज के इंतजार में बटन दबाते रहते हैं, तो टाइमर रीसेट हो जाएगा। तो यदि आप बहुत जल्दी बटन को कई बार दबाते रहें, तो मैसेज दिखाई नहीं देगा, *जब तक* आप दबाना बंद नहीं करते। डिबाउंसिंग आपको कुछ एक्शन को तब तक डिले करने देता है जब तक यूजर "कुछ-न-कुछ करता रहता है" है।

यह उदाहरण काम करता है, लेकिन इच्छित रूप से नहीं। बटन एक दूसरे से अलग नहीं हैं। समस्या देखने के लिए, उनमें से किसी एक बटन पर क्लिक करें, और फिर तुरंत दूसरे बटन पर क्लिक करें। आप उम्मीद करते हैं कि देरी के बाद, आप दोनों बटन के मैसेज देखेंगे। लेकिन केवल अंतिम बटन का मैसेज दिखाई देता है। पहले बटन का मैसेज खो जाता है।

क्यों बटन एक दूसरे के बीच दख़ल दे रहे हैं? समस्या को खोजें और ठीक करें।

<Hint>

लास्ट टाइमआउट आईडी वेरिएबल सभी `DebouncedButton` कौम्पोनॅन्ट के बीच शेयर कि गई है। इसी कारण एक बटन पर क्लिक करने से दूसरे बटन कि टाइमआउट को रीसेट कर दिया जाता है। क्या आप हर बटन के लिए एक अलग टाइमआउट आईडी इनिशियलाइज़ कर सकते हैं?

</Hint>

<Sandpack>

```js
let timeoutID;

function DebouncedButton({ onClick, children }) {
  return (
    <button onClick={() => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('Spaceship launched!')}
      >
        Launch the spaceship
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Soup boiled!')}
      >
        Boil the soup
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Lullaby sung!')}
      >
        Sing a lullaby
      </DebouncedButton>
    </>
  )
}
```

```css
button { display: block; margin: 10px; }
```

</Sandpack>

<Solution>

एक ऐसी वेरिएबल जैसे `timeoutID` सभी कौम्पोनॅन्टस के बीच शेयर होती है। इसीलिए, दूसरे बटन पर क्लिक करने से पहले बटन के पेंडिंग टाइमआउट को रीसेट किया जाता है। इसे ठीक करने के लिए, आप ref में टाइमआउट रख सकते हैं। हर बटन को अपना अलग ref मिलेगा, इसलिए वे एक दूसरे को विरोध नहीं करेंगे। ध्यान दें कि दो बटनों पर तुरंत क्लिक करने से दोनों मैसेज दिखाई देंगे।

<Sandpack>

```js
import { useRef } from 'react';

function DebouncedButton({ onClick, children }) {
  const timeoutRef = useRef(null);
  return (
    <button onClick={() => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('Spaceship launched!')}
      >
        Launch the spaceship
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Soup boiled!')}
      >
        Boil the soup
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Lullaby sung!')}
      >
        Sing a lullaby
      </DebouncedButton>
    </>
  )
}
```

```css
button { display: block; margin: 10px; }
```

</Sandpack>

</Solution>

#### लेटेस्ट state रीड करें {/*read-the-latest-state*/}

इस उदाहरण में, "Send" बटन दबाने के बाद मैसेज दिखाई देने से पहले थोड़ा डिले होता है। "hello" टाइप करें, Send दबाएं, और फिर जल्दी से इनपुट को फिर से एडिट करें। आपकी एडिट करने के बावजूद, अलर्ट अभी भी "hello" दिखाएगा (जो बटन क्लिक [करते समय](/learn/state-as-a-snapshot#state-over-time) state की वैल्यू थी)।

आमतौर पर, एप्प में यह व्यवहार आपको चाहिए होता है। हालांकि, कुछ अवसरों में आपको एक ऐसा असिंक्रोनस कोड की ज़रूरत होती है जो स्टेट का *लेटेस्ट* वर्शन रीड कर सके। क्या आप ऐसे कोई तरीका सोच सकते हैं जिससे अलर्ट *करंट* इनपुट टेक्स्ट दिखाएँ ना की जो क्लिक के समय था।

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');

  function handleSend() {
    setTimeout(() => {
      alert('Sending: ' + text);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={handleSend}>
        Send
      </button>
    </>
  );
}
```

</Sandpack>

<Solution>

State [एक स्नैपशॉट की तरह](/learn/state-as-a-snapshot) काम करता है, इसलिए आप टाइमआउट जैसे असिंक्रोनस ऑपरेशन से state की लेटेस्ट वैल्यू रीड नहीं कर सकते। हालांकि, आप लेटेस्ट इनपुट टेक्स्ट को एक ref में रख सकते हैं। ref म्यूटेबल है, इसलिए आप कभी भी करंट प्रॉपर्टी को रीड कर सकते हैं। क्योंकि करंट टेक्स्ट रेंडरिंग के लिए भी इस्तेमाल किया जाता है, इस उदाहरण में, आपको *दोनों* state वेरिएबल (रेंडरिंग के लिए) *और* एक ref (टाइमआउट के समय इसे रीड करने के लिए) की जरुरत होगी। आपको करंट ref वैल्यू को मैन्युअल रूप से अपडेट करने की आवश्यकता होगी।

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const textRef = useRef(text);

  function handleChange(e) {
    setText(e.target.value);
    textRef.current = e.target.value;
  }

  function handleSend() {
    setTimeout(() => {
      alert('Sending: ' + textRef.current);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={handleChange}
      />
      <button
        onClick={handleSend}>
        Send
      </button>
    </>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
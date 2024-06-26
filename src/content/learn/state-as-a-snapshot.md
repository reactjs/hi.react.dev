---
title: State एक स्नैपशॉट की तरह
---

<Intro>

State वेरिएबल नियमित जावास्क्रिप्ट वेरिएबलों की तरह दिख सकते हैं जिन्हें आप पढ़ और लिख सकते हैं। हालांकि, state एक स्नैपशॉट की तरह व्यवहार करता है। इसे सेट करने से पहले आपके पास पहले से मौजूद state वेरिएबल में कोई परिवर्तन नहीं होता है, बल्कि इसे फिर से रेंडर करने को ट्रिगर करता है।

</Intro>

<YouWillLearn>

* State सेट करने से री-रेंडर को ट्रिगर कैसे किया जाता है
* State कब और कैसे अपडेट होता है
* State सेट करने के तुरंत बाद अपडेट क्यों नहीं होता
* इवेंट हैंडलर्स कैसे State के "स्नैपशॉट" को एक्सेस करते हैं

</YouWillLearn>

## State सेट करने से रेंडर ट्रिगर होता है {/*setting-state-triggers-renders*/}

आप अपने यूजर इंटरफ़ेस को ऐसे समझ सकते हैं जैसे यूजर इवेंट जैसे कि एक क्लिक से रिस्पांस में सीधे चेंज होना। React में यह एस मेंटल मॉडल से थोड़ा अलग काम करता है। पिछले पेज में, आपने देखा कि [state को सेट करने से React से री-रेंडर रिक्वेस्ट होता है](/learn/render-and-commit#step-1-trigger-a-render)। इसका मतलब है इंटरफ़ेस को इवेंट पर रिएक्ट करने के लिए आपको staet को अपडेट करने की ज़रूरत है।

इस उदाहरण में, जब आप "send" दबाते हैं, `setIsSent(true)` React को यह सूचित करता है कि UI को री-रेंडर किया जाए।

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

बटन पर क्लिक करने पर निम्नलिखित होता है:

1. `onSubmit` इवेंट हैंडलर एक्सीक्यूट होता है।
2. `setIsSent(true)` द्वारा `isSent` को `true` में सेट किया जाता है और एक नया रेंडर करने की क्रिया शुरू हो जाती है।
3. React नए `isSent` वैल्यू के आधार पर कौम्पोनॅन्ट को फिर से रेंडर करता है।

चलिए state और रेंडरिंग के बीच का संबंध और विश्लेषण करें।

## रेंडरिंग समय में एक स्नैपशॉट लेता है {/*rendering-takes-a-snapshot-in-time*/}

[रेंडरिंग](/learn/render-and-commit#step-2-react-renders-your-components) का मतलब है कि React आपके कौम्पोनॅन्ट को कॉल करता है, जो एक फ़ंक्शन होता है। आप उस फ़ंक्शन से जो JSX रिटर्न करते हैं, वह उस समय की UI का एक स्नैपशॉट होता है। इसमें props, इवेंट हैंडलर्स और स्थानिक वेरिएबल इत्यादि सभी वैल्यूें, **रेंडर करने के समय के state के अनुसार निर्धारित की गई थीं।**

एक फ़ोटोग्राफ या मूवी फ़्रेम की तरह, आपके द्वारा रिटर्न किया गया UI "स्नैपशॉट" इंटरैक्टिव होता है। इसमें इवेंट हैंडलर्स जैसी लॉजिक शामिल होता है जो इनपुट के रिस्पोंस के लिए स्पष्ट करती है। React स्क्रीन को इस स्नैपशॉट के साथ अपडेट करता है और इवेंट हैंडलर्स को कनेक्ट करता है। इस 
परिणाम के रूप में, बटन को दबाने से आपके JSX में से क्लिक हैंडलर ट्रिगर होगा।

जब React किसी कौम्पोनॅन्ट को री-रेंडर करता है:

1. React आपके फ़ंक्शन को फिर से कॉल करता है।
2. आपका फ़ंक्शन एक नया JSX स्नैपशॉट रिटर्न करता है।
3. फिर, React स्क्रीन को उस स्नैपशॉट के साथ अपडेट करता है जिसे आपने रिटर्न किया है।

<IllustrationBlock sequential>
    <Illustration caption="React executing the function" src="/images/docs/illustrations/i_render1.png" />
    <Illustration caption="Calculating the snapshot" src="/images/docs/illustrations/i_render2.png" />
    <Illustration caption="Updating the DOM tree" src="/images/docs/illustrations/i_render3.png" />
</IllustrationBlock>

एक कौम्पोनॅन्ट की मेमोरी के रूप में, state एक रेगुलर वेरिएबल की तरह नहीं है जो आपके फ़ंक्शन के रिटर्न करने के बाद गायब हो जाता है। State वास्तव में React के भीतर "रहता है" - जैसे कि एक शेल्फ पर! - आपके फ़ंक्शन के बाहर। जब React आपके कौम्पोनॅन्ट को कॉल करता है, तो वह आपको उस विशेष रेंडर के लिए state का एक स्नैपशॉट देता है। आपका कौम्पोनॅन्ट एक नई सेट के props और इवेंट हैंडलर के साथ UI का एक स्नैपशॉट रिटर्न करता है, जो **उस रेंडर की state रिटर्न का उपयोग करके** कॅल्क्युलेट होता है!

<IllustrationBlock sequential>
  <Illustration caption="You tell React to update the state" src="/images/docs/illustrations/i_state-snapshot1.png" />
  <Illustration caption="React updates the state value" src="/images/docs/illustrations/i_state-snapshot2.png" />
  <Illustration caption="React passes a snapshot of the state value into the component" src="/images/docs/illustrations/i_state-snapshot3.png" />
</IllustrationBlock>

यहां एक छोटा प्रयोग है जो आपको दिखाएगा कि यह कैसे काम करता है। इस उदाहरण में, आपकी उम्मीद हो सकती है कि "+3" बटन पर क्लिक करने से काउंटर को तीन बार बढ़ाने की प्रत्येक बार `setNumber(number + 1)` को कॉल के कारण होना चाहिए।

जब आप "+3" बटन दबाते हैं, तो देखिए क्या होता है:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

ध्यान दें कि हर क्लिक number केवल एक बार बढ़ता है!

**State सेट करने से यह केवल *अगले* रेंडर के लिए इसे बदल दिया जाता है।** पहले रेंडर के दौरान, `number` की वैल्यू `0` थी। इसलिए, *उस रेंडर के* `onClick` हैंडलर में, `setNumber(number + 1)` को कॉल करने के बाद भी `number` की वैल्यू `0` ही है।

```js
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```

यहां इस बटन के क्लिक हैंडलर React को बताता है कि क्या करना चाहिए:

1. `setNumber(number + 1)`: `number` की वैल्यू `0` है, इसलिए `setNumber(0 + 1)`।
    - React अगले रेंडर पर `number` को 1 में बदलने की तैयारी करता है।
2. `setNumber(number + 1)`: `number` की वैल्यू `0` है, इसलिए `setNumber(0 + 1)`।
    - React अगले रेंडर पर `number` को 1 में बदलने की तैयारी करता है।
3. `setNumber(number + 1)`: `number` की वैल्यू `0` है, इसलिए `setNumber(0 + 1)`।
    - React अगले रेंडर पर `number` को 1 में बदलने की तैयारी करता है।

हालांकि आपने `setNumber(number + 1)` को तीन बार कॉल करा है, लेकिन *इस रेंडर के* इवेंट हैंडलर में `number` हमेशा `0` होता है, इसलिए आपने तीन बार state को `1` में सेट किया है। इसलिए, जब आपका इवेंट हैंडलर समाप्त होता है, React `number` को `3` के बजाय `1` के साथ ही कौम्पोनॅन्ट को री-रेंडर करता है।

आप इसे इस प्रकार से भी मानसिक रूप से दृश्यीकरण कर सकते हैं, अपने कोड में state वेरिएबल को उनके वैल्यूेंस के साथ सब्स्टिटूट करके। क्योंकि `number` state वेरिएबल *इस रेंडर के लिए* `0` है, इसलिए इसके इवेंट हैंडलर का दिखने का यह तरीका है:

```js
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```

अगले रेंडर के लिए, `number` 1 है, इसलिए *उस रेंडर का* क्लिक हैंडलर इस तरह दीखता है:

```js
<button onClick={() => {
  setNumber(1 + 1);
  setNumber(1 + 1);
  setNumber(1 + 1);
}}>+3</button>
```

इसलिए बटन पर फिर से क्लिक करने से काउंटर को `2` पर सेट किया जाएगा, फिर अगले क्लिक पर `3` पर और ऐसी ही प्रक्रिया जारी रहेगी।

## समय के दौरान State {/*state-over-time*/}

अच्छा, यह बहुत मजेदार था। कोशिश करें कि इस बटन पर क्लिक करने पर क्या चेतावनी दी जाएगी, इससे अनुमान लगाएँ:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

यदि आप पहले बताए गए सब्स्टिटूशन के तरीके का उपयोग करते हैं, तो आप अनुमान लगा सकते हैं कि अलर्ट "0" दिखाता है:

```js
setNumber(0 + 5);
alert(0);
```

लेकिन यदि आप अलर्ट पर टाइमर लगाएं, जिससे वह केवल कौम्पोनॅन्ट री-रेंडर के बाद ही ट्रिगर होती है, तो क्या यह "0" या "5" दिखाएगी? कृपया अनुमान लगाएं!

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

हैरानी हुई? यदि आप सब्सीट्यूशन विधि का उपयोग करते हैं, तो आप अलर्ट को पास किए गए state की "स्नैपशॉट" देख सकते हैं।

```js
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

React में स्‍टोर state अलर्ट रन होने के समय बदल सकती है, लेकिन यह state का स्नैपशॉट उस समय के लिए यूजर के साथ इंटरैक्ट करने पर निर्धारित किया गया था!

**रेंडर के भीतर एक state वेरिएबल का वैल्यू कभी नहीं बदलता,** यद्यपि इसके इवेंट हैंडलर कोड असिंक्रोनस हो। *उस रेंडर के* `onClick` में, `number` की वैल्यू `setNumber(number + 5)` को कॉल करने के बाद भी `0` ही रहती है। इसकी वैल्यू React द्वारा आपके कौम्पोनॅन्ट को कॉल करके UI का "स्नैपशॉट" लेने पर "फिक्स्ड" की गई थी।

यहां एक उदाहरण है जो दिखाता है कि यह कैसे आपके इवेंट हैंडलर को टाइमिंग गलतियों के प्रति कम संवेदनशील बनाता है। नीचे एक फ़ॉर्म है जो पांच सेकंड के विलंब से संदेश भेजता है। इस state को कल्पना करें:

1. आप "Send" बटन दबाते हैं और "Hello" को Alice को भेजते हैं।
2. पांच सेकंड की विलंब समय समाप्त होने से पहले, आप "To" फ़ील्ड के वैल्यू को "Bob" में बदल देते हैं।

आप `alert` में क्या डिस्प्ले होने की उम्मीद करते हैं? क्या यह "You said Hello to Alice" दिखाएगा? या क्या यह "You said Hello to Bob" दिखाएगा? अपने ज्ञान के आधार पर एक अनुमान बनाएँ और फिर इसे प्रयास करें:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

**React एक रेंडर के इवेंट हैंडलर के भीतर state वैल्यूस को "फिक्स्ड" रखता है।** आपको चिंता करने की आवश्यकता नहीं है कि state कोड रन होने के दौरान बदल गई हो।

लेकिन यदि आप री-रेंडर से पहले लेटेस्ट state को रीड करना चाहते हैं तो क्या करें? आपको [state अपडेट करने वाली फ़ंक्शन](/learn/queueing-a-series-of-state-updates) का उपयोग करना चाहिए, जिसका विवरण अगले पेज पर दिया गया है!

<Recap>

* State को सेट करने से नया रेंडर रिक्वेस्ट्स होता है।
* React आपके कौम्पोनॅन्ट के बाहर state को एक शेल्फ पर स्टोर करता है।
* जब आप `useState` को कॉल करते हैं, तो React आपको उस रेंडर के लिए state का स्नैपशॉट प्रदान करता है।
* री-रेंडर करने पर वेरिएबल और इवेंट हैंडलर "बचते" नहीं हैं। प्रत्येक रेंडर में अपने खुद के इवेंट हैंडलर होते हैं।
* प्रत्येक रेंडर (और उसमें स्थित फ़ंक्शन) हमेशा उस स्नैपशॉट को "देखेंगे" जिसे React ने *उस* रेंडर को दिया है।
* आप इवेंट हैंडलर में state को मेंटली सब्सीट्यूट कर सकते हैं, ठीक वैसे ही जैसे आप रेंडर किए गए JSX के बारे में सोचते हैं।
* पहले के बनाए गए इवेंट हैंडलर में state वैल्यूस उस रेंडर के होते हैं जिसमें वे बनाए गए थे।

</Recap>



<Challenges>

#### एक ट्रैफिक लाइट इम्प्लीमेंट करें {/*implement-a-traffic-light*/}

यहां एक क्रॉसवॉक लाइट कौम्पोनॅन्ट है जो बटन दबाने पर टॉगल होता है:

<Sandpack>

```js
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
```

```css
h1 { margin-top: 20px; }
```

</Sandpack>

इस क्लिक हैंडलर में एक alert ऐड करें। जब लाइट हरी हो और "Walk" दिखाए, तो बटन को क्लिक करने पर "Stop is next" दिखना चाहिए। जब लाइट लाल हो और "Stop" दिखाए, तो बटन को क्लिक करने पर "Walk is next" दिखना चाहिए।

क्या यह अंतर करता है कि आप `alert` को `setWalk` कॉल के पहले या उसके बाद डालते हैं?

<Solution>

आपका `alert` इस तरह से दिखना चाहिए:

<Sandpack>

```js
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? 'Stop is next' : 'Walk is next');
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
```

```css
h1 { margin-top: 20px; }
```

</Sandpack>

चाहे आप इसे `setWalk` कॉल के पहले डालें या उसके बाद, इसका कोई फर्क नहीं पड़ता। उस रेंडर में `walk` की वैल्यू फिक्स्ड हो जाती है। `setWalk` को कॉल करने से केवल अगले रेंडर के लिए उसे बदलेगा, लेकिन पिछले रेंडर के इवेंट हैंडलर को अफेक्ट नहीं करेगा।

यह पंक्ति पहले तो विरोधाभासी लग सकती है:

```js
alert(walk ? 'Stop is next' : 'Walk is next');
```

लेकिन अगर आप इसे इस तरह पढ़ें तो यह समझ में आता है: "यदि ट्रैफिक लाइट में 'Walk now' दीखता है, तो संदेश 'Stop is next' होना चाहिए।" आप `walk` वेरिएबल को इवेंट हैंडलर के भीतर की `walk` वैल्यू के साथ मिलाकर सब्सीट्यूट कर सकते हैं और इसे सही वैल्यू दे सकते हैं।

आप इसे सब्सीट्यूट करने के लिए साधारण तरीके से देख सकते हैं। जब `walk` की वैल्यू `true` होती है, तब आपको निम्न नतीजा मिलता है:

```js
<button onClick={() => {
  setWalk(false);
  alert('Stop is next');
}}>
  Change to Stop
</button>
<h1 style={{color: 'darkgreen'}}>
  Walk
</h1>
```

"Change to Stop" पर क्लिक करने से `walk` को `false` पर सेट करके एक रेंडर क्यू किया जाता है और "Stop is next" का अलर्ट दिया जाता है।

</Solution>

</Challenges>

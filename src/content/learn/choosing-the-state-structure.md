---
title: State स्ट्रक्चर चुनना
---

<Intro>

अछि तरह से State को स्ट्रक्चर करने से एक कौम्पोनॅन्ट के बीच अंतर पता लग सकता है जो चंगेस और डिबग करने में आराम दायक हो, और एक जो बग का एक निरंतर स्त्रोत ह। यहाँ दिए गए टिप्स state स्ट्रक्चर करते समय ध्यान में रखें।

</Intro>

<YouWillLearn>

* सिंगल और मल्टीपल state वेरिएबल्स का उपयोग कब करें
* State को ऑर्गनाइज़ करते समय किन बातों से बचना चाहिए
* State स्ट्रक्चर के सामान्य इश्यूज को कैसे ठीक करें

</YouWillLearn>

## State स्ट्रक्टरिंग के प्रिंसिपल्स {/*principles-for-structuring-state*/}

जब आप एक कौम्पोनॅन्ट लिखते हैं जिसमें state का इस्तेमाल होता है, तो आपको इसके बारे में सोचना होता है की कितने state वेरिएबल्स का उपयोग करना है और उनके डेटा का शेप क्या होना चाहिए। हालांकि एक सबऑप्टिमल state स्ट्रक्चर के साथ भी सही प्रोग्राम लिखना पॉसिबल है, कुछ प्रिंसिपल्स हैं जो आपको बेहतर चोइसस बनाने के लिए गाइड कर सकते हैं:

1. **ग्रुप से संबंधित state।** यदि आप हमेशा एक ही समय में दो या दो से ज्यादा state वेरिएबल्स को अपडेट करते हैं, तो उन्हें एक state वेरिएबल में मर्ज करने के बारे में सोचें।
2. **State में कन्ट्राडिक्शन्स से बचें।** जब state को इस तरह से स्ट्रक्चर किया जाता है कि state के कई टुकड़े एक-दूसरे के साथ कन्ट्राडिक्ट और "असहमत" हो सकते हैं, तो आप गलतियों के लिए जगह छोड़ते हैं। इससे बचने की कोशिश करें।
3. **रिडेन्डेन्ट state से बचें।** यदि आप रेंडरिंग के दौरान कौम्पोनॅन्ट के props या उसके मौजूदा state वेरिएबल्स से कुछ जानकारी कैलकुलेट कर सकते हैं, तो आपको उस जानकारी को उस कौम्पोनॅन्ट के state में नहीं रखना चाहिए।
4. **State में डुप्लिकेशन से बचें।** जब एक ही डेटा को कई state वेरिएबल्स के बीच, या नेस्टेड ऑब्जेक्ट्स के बीच डुप्लिकेट किया जाता है, तो उन्हें सिंक में रखना मुश्किल होता है। जब आप कर सकते हैं तो डुप्लिकेशन कम करें।
5. **डीप नेस्टेड state से बचें।** डीप्ली हायरार्किकल state को अपडेट करना आसान नहीं है। जब मुमकिन हो, state को फ्लैट तरीके से स्ट्रक्चर करें।

इन प्रिंसिपल्स के पीछे उद्देश्य है *गलतियों को पेश किए बिना state को अपडेट करना आसान बनाएं*। State से रिडेन्डेन्ट और डुप्लिकेट डेटा को हटाने से यह सुनिश्चित करने में मदद मिलती है कि इसके सभी टुकड़े सिंक में रहें। यह उसी तरह है जैसे एक डेटाबेस इंजीनियर बग की संभावना को कम करने के लिए [डेटाबेस स्ट्रक्चर को "normalize"](https://docs.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description) करना चाहता है। अल्बर्ट आइंस्टीन की व्याख्या करने के लिए, **"अपने state को जितना हो सके उतना सरल बनाएं - लेकिन सरलतम नहीं।"**

अब देखते हैं कि ये प्रिंसिपल्स कैसे लागू होते हैं।

## समूह से संबंधित state {/*group-related-state*/}

आप कभी कभी एक या मल्टीपल state वेरिएबल्स का उपयोग करने के बीच अनिश्चित हो सकते हैं।

क्या आपको ऐसा करना चाहिए?

```js
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```

या यह?

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

तकनीकी तौर पर, आप इनमें से किसी भी तरीके का इस्तेमाल कर सकते हैं। लेकिन **अगर कुछ दो state वेरिएबल्स हमेशा एक साथ बदलते हैं, तो यह एक अच्छा विचार हो सकता है कि उन्हें एक state वेरिएबल में एकीकृत रखा जाये**। तब आप उन्हें हमेशा सिंक में रखना नहीं भूलते हैं, जैसे कि इस उदाहरण में, जहां कर्सर को आगे बढ़ाना लाल डॉट के दोनों कोआर्डिनेट्स को अपडेट करता है:

<Sandpack>

```js
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  )
}
```

```css
body { margin: 0; padding: 0; height: 250px; }
```

</Sandpack>

एक और मामला जहां आप डेटा को किसी ऑब्जेक्ट या array में समूहित करेंगे, जब आप नहीं जानते कि आपको state के कितने अलग-अलग टुकड़ों की ज़रूरत होगी। उदाहरण के लिए, यह तब मददगार होता है जब आपके पास एक फॉर्म होता है जहां उपयोगकर्ता कस्टम फ़ील्ड ऐड कर सकता है।

<Pitfall>

यदि आपका स्टेट वेरिएबल एक ऑब्जेक्ट है, तो याद रखें कि [आप इसमें केवल एक फ़ील्ड को अपडेट नहीं कर सकते हैं](/learn/updating-objects-in-state) अन्य फ़ील्ड्स को स्पष्ट रूप से कॉपी किए बिना। उदाहरण के लिए, आप `setPosition({ x: 100})` नहीं कर सकते हैं ऊपर के उदाहरण में क्योंकि इसमें `y` प्रॉपर्टी बिल्कुल नहीं होगी! इसके बजाय, यदि आप अकेले `x` सेट करना चाहते हैं, तो आप या तो `setPosition({ ...position, x: 100})` करेंगे, या उन्हें दो स्टेट वेरिएबल्स में विभाजित करेंगे और `setX(100)` करेंगे।

</Pitfall>

## State में कंट्राडिक्शन्स से बचें {/*avoid-contradictions-in-state*/}

यहां `isSending` और` isSent` स्टेट वेरिएबल्स के साथ एक होटल फीडबैक फॉर्म दिया गया है:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
    setIsSent(true);
  }

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}
```

</Sandpack>

हालांकि यह कोड काम करता है, लेकिन यह "नामुमकिन" states के लिए दरवाजा खुला छोड़ देता है। उदाहरण के लिए, यदि आप एक साथ `setIsSent` और `setIsSending` को कॉल करना भूल जाते हैं, तो आप ऐसी स्थिति में हो सकते हैं जहाँ `isSending` और` isSent` दोनों एक ही समय में `true` हैं। आपका कौम्पोनॅन्ट जितना कॉम्प्लेक्स होगा, यह समझना उतना ही मुश्किल होगा कि क्या हुआ था।

**चूँकि `isSending` और` isSent` एक ही समय में कभी भी `true` नहीं होने चाहिए, इसलिए बेहतर होगा कि उन्हें एक `status` state वेरिएबल से बदल दिया जाए जो *तीन* वैलिड states में से एक ले सकता है:** `'typing'` (शुरुआती), `'sending'`, और `'sent'`:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}
```

</Sandpack>

पढ़ने की क्षमता के लिए आप अभी भी कुछ कॉन्स्टेंट्स डिक्लेअर कर सकते हैं:

```js
const isSending = status === 'sending';
const isSent = status === 'sent';
```

लेकिन वे state वेरिएबल नहीं हैं, इसलिए आपको उनके एक-दूसरे के साथ तालमेल बिठाने की चिंता करने की ज़रूरत नहीं है।

## रिडेन्डेन्ट state से बचें {/*avoid-redundant-state*/}

यदि आप रेंडरिंग के दौरान कौम्पोनॅन्ट के props या उसके मौजूदा state वेरिएबल्स से कुछ जानकारी को कैलकुलेट कर सकते हैं, तो आपको उस जानकारी को उस कौम्पोनॅन्ट के state में **नहीं डालना** चाहिए।

उदाहरण के लिए, इस फॉर्म को लें। यह काम करता है, लेकिन क्या आप इसमें कोई रिडेन्डेन्ट state ढूंढ सकते हैं?

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

इस फॉर्म में तीन state वेरिएबल्स हैं: `firstName`, `lastName`, and `fullName`। हालांकि, `fullName` रिडेन्डेन्ट है। **आप रेंडर के दौरान हमेशा `firstName` और`lastName` से `fullName` को कैलकुलेट कर सकते हैं, इसलिए इसे state से हटा दें।**

आप इसे इस तरह कर सकते हैं:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

यहां, `fullName` एक state वेरिएबल *नहीं* है। इसके बजाय, इसको कैलकुलेट रेंडर के दौरान किया जाता है:

```js
const fullName = firstName + ' ' + lastName;
```

चेंज हैंडलर्स को इसे अपडेट करने के लिए कुछ विशेष करने की ज़रूरत नहीं है। जब आप `setFirstName` या `setLastName` को कॉल करते हैं, तो आप फिर से रेंडर ट्रिगर करते हैं, और फिर अगले `fullName` की गणना नए डेटा से की जाएगी।

<DeepDive>

#### Don't mirror props in state {/*don-t-mirror-props-in-state*/}

रिडेन्डेन्ट state का एक सामान्य उदाहरण इस तरह का कोड है:

```js
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
```

यहाँ, एक `color` state वेरिएबल को `messageColor` prop में इनिशियलाइज़ किया गया है। समस्या यह है कि **यदि पैरेंट कौम्पोनॅन्ट बाद में `messageColor` का एक अलग वैल्यू पास करता है (उदाहरण के लिए, `'blue'` के बजाय `'red'`), तो `color` *state वेरिएबल* अपडेट नहीं होगा!** State केवल पहले रेंडर के दौरान इनिशलाइज्ड होता है।

यही कारण है कि state वेरिएबल में कुछ prop को "मिरर" करने से कन्फ्यूजन पैदा हो सकता है। इसके बजाय, सीधे अपने कोड में `messageColor` props का उपयोग करें। यदि आप इसे छोटा नाम देना चाहते हैं, तो कॉन्स्टेंट का उपयोग करें:

```js
function Message({ messageColor }) {
  const color = messageColor;
```

इस तरह यह पैरेंट कौम्पोनॅन्ट से पास किए गए prop के साथ सिंक से बाहर नहीं होगा।

State में prop को "मिरर" करना तभी समझ में आता है जब आप किसी विशिष्ट prop के लिए सभी अपडेट को अनदेखा करना चाहते हैं। कन्वेंशन के अनुसार, prop के नाम को `initial` या `default` से शुरू करें ताकि यह स्पष्ट किया जा सके कि इसके नए वैल्यूज़ को अनदेखा किया गया है:

```js
function Message({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor);
```

</DeepDive>

## State में डुप्लिकेशन से बचें {/*avoid-duplication-in-state*/}

यह मेनू लिस्ट कौम्पोनॅन्ट आपको कई यात्रा के नास्ते में से एक यात्रा नाश्ता चुनने देता है:

<Sandpack>

```js
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.title}
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```

```css
button { margin-top: 10px; }
```

</Sandpack>

अभी, यह सिलेक्टेड आइटम को `selectedItem` state वेरिएबल में एक ऑब्जेक्ट के रूप में रखता है। हालाँकि, यह बहुत अच्छा नहीं है: **`selectedItem` में शामिल कंटेंट `items` में से एक आइटम के समान ऑब्जेक्ट है।** इसका मतलब है कि आइटम के बारे में जानकारी दो जगहों पर डुप्लिकेट है।

यह समस्या क्यों है? आइए हर एक item को एडिटेबल बनाएं:

<Sandpack>

```js
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2> 
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```

```css
button { margin-top: 10px; }
```

</Sandpack>

ध्यान दें की कैसे जब आप पहले आइटम के "Choose" पर क्लिक करते हैं और फिर उसे *एडिट* करते हैं, **इनपुट अपडेट होता है लेकिन नीचे का लेबल एडिट को रिफ्लेक्ट नहीं करता है।** ऐसा इसलिए है क्योंकि आपके पास डुप्लिकेट state है, और आप `selectedItem` को अपडेट करना भूल गए हैं।

हालाँकि आप `selectedItem` को भी अपडेट कर सकते हैं, लेकिन डुप्लीकेशन को निकालना आसान हल होगा। इस उदाहरण में, एक `selectedItem` ऑब्जेक्ट के बजाय (जो `items` के अंदर ऑब्जेक्ट्स के साथ डुप्लिकेशंस बनाता है), आप state में `selectedId` रख सकते हैं, और फिर उस ID के साथ item को `items` array में खोजकर `selectedItem` प्राप्त कर सकते हैं:

<Sandpack>

```js
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedId(item.id);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```

```css
button { margin-top: 10px; }
```

</Sandpack>

(इसके बजाये, आप selected index को state में रख सकते हैं।)

State को इस तरह डुप्लिकेट किया जाता था:

* `items = [{ id: 0, title: 'pretzels'}, ...]`
* `selectedItem = {id: 0, title: 'pretzels'}`

लेकिन बदलाव के बाद यह इस तरह है:

* `items = [{ id: 0, title: 'pretzels'}, ...]`
* `selectedId = 0`

डुप्लिकेशन चला गया है, और आप केवल ज़रूरी state रखते हैं!

अब अगर आप *selected* item को एडिट करते हैं, तो नीचे दिया गया मैसेज तुरंत अपडेट हो जाएगा। ऐसा इसलिए है क्योंकि `setItems` फिर से रेंडर ट्रिगर करता है, और `items.find(...)` आइटम को अपडेट किये गए title के साथ ढूंढेगा। आपको *selected item* को state में रखने की ज़रूरत नहीं थी, क्योंकि केवल *selected ID* ही ज़रूरी है। बाकी की कैलकुलेशन रेंडर के दौरान की जा सकती है।

## डीप नेस्टेड state से बचें {/*avoid-deeply-nested-state*/}

एक यात्रा प्लान की कल्पना करें जिसमें ग्रह, महाद्वीप और देश शामिल हों। आप नेस्टेड ऑब्जेक्ट्स और arrays का उपयोग करके इसकी state को स्ट्रक्टर करने के लिए लुभा सकते हैं, जैसे इस उदाहरण में:

<Sandpack>

```js
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

function PlaceTree({ place }) {
  const childPlaces = place.childPlaces;
  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map(place => (
            <PlaceTree key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const planets = plan.childPlaces;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planets.map(place => (
          <PlaceTree key={place.id} place={place} />
        ))}
      </ol>
    </>
  );
}
```

```js places.js active
export const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [{
    id: 1,
    title: 'Earth',
    childPlaces: [{
      id: 2,
      title: 'Africa',
      childPlaces: [{
        id: 3,
        title: 'Botswana',
        childPlaces: []
      }, {
        id: 4,
        title: 'Egypt',
        childPlaces: []
      }, {
        id: 5,
        title: 'Kenya',
        childPlaces: []
      }, {
        id: 6,
        title: 'Madagascar',
        childPlaces: []
      }, {
        id: 7,
        title: 'Morocco',
        childPlaces: []
      }, {
        id: 8,
        title: 'Nigeria',
        childPlaces: []
      }, {
        id: 9,
        title: 'South Africa',
        childPlaces: []
      }]
    }, {
      id: 10,
      title: 'Americas',
      childPlaces: [{
        id: 11,
        title: 'Argentina',
        childPlaces: []
      }, {
        id: 12,
        title: 'Brazil',
        childPlaces: []
      }, {
        id: 13,
        title: 'Barbados',
        childPlaces: []
      }, {
        id: 14,
        title: 'Canada',
        childPlaces: []
      }, {
        id: 15,
        title: 'Jamaica',
        childPlaces: []
      }, {
        id: 16,
        title: 'Mexico',
        childPlaces: []
      }, {
        id: 17,
        title: 'Trinidad and Tobago',
        childPlaces: []
      }, {
        id: 18,
        title: 'Venezuela',
        childPlaces: []
      }]
    }, {
      id: 19,
      title: 'Asia',
      childPlaces: [{
        id: 20,
        title: 'China',
        childPlaces: []
      }, {
        id: 21,
        title: 'Hong Kong',
        childPlaces: []
      }, {
        id: 22,
        title: 'India',
        childPlaces: []
      }, {
        id: 23,
        title: 'Singapore',
        childPlaces: []
      }, {
        id: 24,
        title: 'South Korea',
        childPlaces: []
      }, {
        id: 25,
        title: 'Thailand',
        childPlaces: []
      }, {
        id: 26,
        title: 'Vietnam',
        childPlaces: []
      }]
    }, {
      id: 27,
      title: 'Europe',
      childPlaces: [{
        id: 28,
        title: 'Croatia',
        childPlaces: [],
      }, {
        id: 29,
        title: 'France',
        childPlaces: [],
      }, {
        id: 30,
        title: 'Germany',
        childPlaces: [],
      }, {
        id: 31,
        title: 'Italy',
        childPlaces: [],
      }, {
        id: 32,
        title: 'Portugal',
        childPlaces: [],
      }, {
        id: 33,
        title: 'Spain',
        childPlaces: [],
      }, {
        id: 34,
        title: 'Turkey',
        childPlaces: [],
      }]
    }, {
      id: 35,
      title: 'Oceania',
      childPlaces: [{
        id: 36,
        title: 'Australia',
        childPlaces: [],
      }, {
        id: 37,
        title: 'Bora Bora (French Polynesia)',
        childPlaces: [],
      }, {
        id: 38,
        title: 'Easter Island (Chile)',
        childPlaces: [],
      }, {
        id: 39,
        title: 'Fiji',
        childPlaces: [],
      }, {
        id: 40,
        title: 'Hawaii (the USA)',
        childPlaces: [],
      }, {
        id: 41,
        title: 'New Zealand',
        childPlaces: [],
      }, {
        id: 42,
        title: 'Vanuatu',
        childPlaces: [],
      }]
    }]
  }, {
    id: 43,
    title: 'Moon',
    childPlaces: [{
      id: 44,
      title: 'Rheita',
      childPlaces: []
    }, {
      id: 45,
      title: 'Piccolomini',
      childPlaces: []
    }, {
      id: 46,
      title: 'Tycho',
      childPlaces: []
    }]
  }, {
    id: 47,
    title: 'Mars',
    childPlaces: [{
      id: 48,
      title: 'Corn Town',
      childPlaces: []
    }, {
      id: 49,
      title: 'Green Hill',
      childPlaces: []      
    }]
  }]
};
```

</Sandpack>

अब मान लें कि आप किसी ऐसे स्थान को हटाने के लिए एक बटन ऐड करना चाहते हैं, जहां आप पहले जा चुके हैं। आप इसे कैसे करेंगे? [नेस्टेड state को अपडेट करने](/learn/updating-objects-and-arrays-in-state#updating-nested-objects-and-arrays) में बदले गए हिस्से से ऊपर तक ऑब्जेक्ट की कॉपी बनाना शामिल है। किसी गहरे नेस्टेड स्थान को हटाने से उसकी संपूर्ण पैरेंट प्लेस चैन की कॉपी बनाना शामिल होगा। ऐसा कोड बहुत वर्बोज़ हो सकता है।

**यदि state आसानी से अपडेट करने के लिए ज़्यादा नेस्टेड है, तो इसे "फ्लैट" बनाने पर विचार करें।** यहाँ एक तरीका है जिससे आप इस डेटा को रीस्ट्रक्चर कर सकते हैं। एक ट्री जैसे स्ट्रक्चर के बजाय जहां प्रत्येक `place` में *child places* की एक array होता है, आपके पास प्रत्येक स्थान में *child place IDs* की एक array को रख सकते हैं। फिर आप प्रत्येक place ID से संबंधित स्थान पर मैपिंग स्टोर कर सकते हैं।

यह डेटा रिस्ट्रक्चरिंग आपको डेटाबेस टेबल देखने की याद दिला सकता है:

<Sandpack>

```js
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

function PlaceTree({ id, placesById }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      {childIds.length > 0 && (
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              placesById={placesById}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            placesById={plan}
          />
        ))}
      </ol>
    </>
  );
}
```

```js places.js active
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 43, 47],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 27, 35]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25, 26],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'Hong Kong',
    childIds: []
  },
  22: {
    id: 22,
    title: 'India',
    childIds: []
  },
  23: {
    id: 23,
    title: 'Singapore',
    childIds: []
  },
  24: {
    id: 24,
    title: 'South Korea',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Thailand',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Vietnam',
    childIds: []
  },
  27: {
    id: 27,
    title: 'Europe',
    childIds: [28, 29, 30, 31, 32, 33, 34],   
  },
  28: {
    id: 28,
    title: 'Croatia',
    childIds: []
  },
  29: {
    id: 29,
    title: 'France',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Germany',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Italy',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Portugal',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Spain',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Turkey',
    childIds: []
  },
  35: {
    id: 35,
    title: 'Oceania',
    childIds: [36, 37, 38, 39, 40, 41, 42],   
  },
  36: {
    id: 36,
    title: 'Australia',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  39: {
    id: 39,
    title: 'Fiji',
    childIds: []
  },
  40: {
    id: 40,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  41: {
    id: 41,
    title: 'New Zealand',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Vanuatu',
    childIds: []
  },
  43: {
    id: 43,
    title: 'Moon',
    childIds: [44, 45, 46]
  },
  44: {
    id: 44,
    title: 'Rheita',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Piccolomini',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Tycho',
    childIds: []
  },
  47: {
    id: 47,
    title: 'Mars',
    childIds: [48, 49]
  },
  48: {
    id: 48,
    title: 'Corn Town',
    childIds: []
  },
  49: {
    id: 49,
    title: 'Green Hill',
    childIds: []
  }
};
```

</Sandpack>

**अब जब state "फ्लैट" ("normalized" के रूप में भी जाना जाता है) है, तो नेस्टेड आइटम को अपडेट करना आसान हो जाता है।**

किसी स्थान को अभी निकालने के लिए, आपको केवल state के दो लेवल को अपडेट करने की ज़रूरत है:

- अपडेटेड वर्शन के *parent* की जगह में हटाई गयी ID `childIds` array से एक्सक्लूड होनी चाहिए।  
- रूट "टेबल" ऑब्जेक्ट के अपडेटेड वर्जन में पैरेंट प्लेस का अपडेटेड वर्जन शामिल होना चाहिए।

आप इसके बारे में कैसे जा सकते हैं इसका एक उदाहरण यहां दिया गया है:

<Sandpack>

```js
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);

  function handleComplete(parentId, childId) {
    const parent = plan[parentId];
    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
    };
    // Update the root state object...
    setPlan({
      ...plan,
      // ...so that it has the updated parent.
      [parentId]: nextParent
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}
```

```js places.js
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 43, 47],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 27, 35]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25, 26],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'Hong Kong',
    childIds: []
  },
  22: {
    id: 22,
    title: 'India',
    childIds: []
  },
  23: {
    id: 23,
    title: 'Singapore',
    childIds: []
  },
  24: {
    id: 24,
    title: 'South Korea',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Thailand',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Vietnam',
    childIds: []
  },
  27: {
    id: 27,
    title: 'Europe',
    childIds: [28, 29, 30, 31, 32, 33, 34],   
  },
  28: {
    id: 28,
    title: 'Croatia',
    childIds: []
  },
  29: {
    id: 29,
    title: 'France',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Germany',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Italy',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Portugal',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Spain',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Turkey',
    childIds: []
  },
  35: {
    id: 35,
    title: 'Oceania',
    childIds: [36, 37, 38, 39, 40, 41,, 42],   
  },
  36: {
    id: 36,
    title: 'Australia',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  39: {
    id: 39,
    title: 'Fiji',
    childIds: []
  },
  40: {
    id: 40,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  41: {
    id: 41,
    title: 'New Zealand',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Vanuatu',
    childIds: []
  },
  43: {
    id: 43,
    title: 'Moon',
    childIds: [44, 45, 46]
  },
  44: {
    id: 44,
    title: 'Rheita',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Piccolomini',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Tycho',
    childIds: []
  },
  47: {
    id: 47,
    title: 'Mars',
    childIds: [48, 49]
  },
  48: {
    id: 48,
    title: 'Corn Town',
    childIds: []
  },
  49: {
    id: 49,
    title: 'Green Hill',
    childIds: []
  }
};
```

```css
button { margin: 10px; }
```

</Sandpack>

आप जितना चाहें उतना नेस्टेड state बना सकते हैं, लेकिन इसे "फ्लैट" बनाने से कई समस्याएं हल हो सकती हैं। यह state को अपडेट करना आसान बनाता है, और यह सुनिश्चित करने में मदद करता है कि आपके पास नेस्टेड ऑब्जेक्ट के विभिन्न हिस्सों में डुप्लीकेशन नहीं है।

<DeepDive>

#### Improving memory usage {/*improving-memory-usage*/}

आदर्श रूप से, आप मेमोरी उपयोग को बेहतर बनाने के लिए हटाए गए आइटम (और उनके चिल्ड्रन!) को "table" ऑब्जेक्ट से हटा देंगे। यह वर्जन ऐसा करता है। यह [Immer का भी उपयोग करता है](/learn/updating-objects-in-state#write-concise-update-logic-with-immer) अपडेट लॉजिक को अधिक संक्षिप्त बनाने के लिए।

<Sandpack>

```js
import { useImmer } from 'use-immer';
import { initialTravelPlan } from './places.js';

export default function TravelPlan() {
  const [plan, updatePlan] = useImmer(initialTravelPlan);

  function handleComplete(parentId, childId) {
    updatePlan(draft => {
      // Remove from the parent place's child IDs.
      const parent = draft[parentId];
      parent.childIds = parent.childIds
        .filter(id => id !== childId);

      // Forget this place and all its subtree.
      deleteAllChildren(childId);
      function deleteAllChildren(id) {
        const place = draft[id];
        place.childIds.forEach(deleteAllChildren);
        delete draft[id];
      }
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}
```

```js places.js
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 43, 47],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 27, 35]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25, 26],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'Hong Kong',
    childIds: []
  },
  22: {
    id: 22,
    title: 'India',
    childIds: []
  },
  23: {
    id: 23,
    title: 'Singapore',
    childIds: []
  },
  24: {
    id: 24,
    title: 'South Korea',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Thailand',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Vietnam',
    childIds: []
  },
  27: {
    id: 27,
    title: 'Europe',
    childIds: [28, 29, 30, 31, 32, 33, 34],   
  },
  28: {
    id: 28,
    title: 'Croatia',
    childIds: []
  },
  29: {
    id: 29,
    title: 'France',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Germany',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Italy',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Portugal',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Spain',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Turkey',
    childIds: []
  },
  35: {
    id: 35,
    title: 'Oceania',
    childIds: [36, 37, 38, 39, 40, 41,, 42],   
  },
  36: {
    id: 36,
    title: 'Australia',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  39: {
    id: 39,
    title: 'Fiji',
    childIds: []
  },
  40: {
    id: 40,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  41: {
    id: 41,
    title: 'New Zealand',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Vanuatu',
    childIds: []
  },
  43: {
    id: 43,
    title: 'Moon',
    childIds: [44, 45, 46]
  },
  44: {
    id: 44,
    title: 'Rheita',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Piccolomini',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Tycho',
    childIds: []
  },
  47: {
    id: 47,
    title: 'Mars',
    childIds: [48, 49]
  },
  48: {
    id: 48,
    title: 'Corn Town',
    childIds: []
  },
  49: {
    id: 49,
    title: 'Green Hill',
    childIds: []
  }
};
```

```css
button { margin: 10px; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

</DeepDive>

कभी-कभी, आप कुछ नेस्टेड state को चाइल्ड कौम्पोनॅन्ट में ले जाकर state नेस्टिंग को कम कर सकते हैं। यह ephemeral UI state के लिए अच्छी तरह से काम करता है जिसे संग्रहीत करने की ज़रूरत नहीं होती है, जैसे कि कोई आइटम hovered है या नहीं।

<Recap>

* अगर दो स्टेट वेरिएबल हमेशा एक साथ अपडेट होते हैं, तो उन्हें एक में मर्ज करने पर विचार करें।
* "नामुमकिन" state को बनाने से बचने के लिए अपने state वेरिएबल्स सावधानी से चुनें।
* अपने state को इस तरह से स्ट्रक्चर करें जिससे आपके द्वारा इसे अपडेट करने में गलती होने की संभावना कम हो जाए।
* रिडेन्डेन्ट और डुप्लिकेट state से बचें ताकि आपको इसे सिंक में रखने की ज़रूरत न हो।
* जब तक आप विशेष रूप से अपडेट को रोकना नहीं चाहते हैं, तब तक props को state *में* न रखें।
* UI पैटर्न जैसे सिलेक्शन के लिए, ऑब्जेक्ट के बजाय ID या index को state में रखें।
* यदि गहराई से नेस्टेड state को अपडेट करना कॉम्प्लेक्स है, तो इसे फ़्लैट करने का प्रयास करें।

</Recap>

<Challenges>

### अपडेट न होने वाले कौम्पोनॅन्ट को ठीक करें {/*fix-a-component-thats-not-updating*/}

इस `Clock` कौम्पोनॅन्ट को दो prop मिलते हैं: `color` और `time`। जब आप सिलेक्ट बॉक्स में एक अलग रंग चुनते हैं, `Clock` कौम्पोनॅन्ट अपने पैरेंट कौम्पोनॅन्ट से एक अलग `color` prop प्राप्त करता है। हालाँकि, किसी कारण से, प्रदर्शित color अपडेट नहीं होता है। क्यों? समस्या हल करें।
<Sandpack>

```js Clock.js active
import { useState } from 'react';

export default function Clock(props) {
  const [color, setColor] = useState(props.color);
  return (
    <h1 style={{ color: color }}>
      {props.time}
    </h1>
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
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

<Solution>

मुद्दा यह है कि इस कौम्पोनॅन्ट में `color` state है जिसे `color` prop के शुरुआती वैल्यू के साथ शुरू किया गया है। लेकिन जब `color` prop बदलता है, तो यह state वेरिएबल को असर नहीं करता है! तो वे सिंक से बाहर हो जाते हैं। इस समस्या को ठीक करने के लिए, state वेरिएबल को पूरी तरह से हटा दें, और सीधे `color` prop का उपयोग करें।

<Sandpack>

```js Clock.js active
import { useState } from 'react';

export default function Clock(props) {
  return (
    <h1 style={{ color: props.color }}>
      {props.time}
    </h1>
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
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

या, डीस्ट्रक्चरिंग सिंटैक्स का उपयोग करना:

<Sandpack>

```js Clock.js active
import { useState } from 'react';

export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
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
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

</Solution>

### टूटी हुई पैकिंग लिस्ट को ठीक करें {/*fix-a-broken-packing-list*/}

इस पैकिंग लिस्ट में एक फुटर है जो दिखता है कि कितने आइटम पैक किए गए हैं और कुल मिलाकर कितने आइटम हैं। यह पहली बार में काम करने लगता है, लेकिन यह बग्गी है। उदाहरण के लिए, यदि आप किसी आइटम को पैक करते हैं और फिर उसे हटा देते हैं, तो काउंटर ठीक से अपडेट नहीं होता है। काउंटर को ठीक करें ताकि यह हमेशा सही रहे।

<Hint>

क्या इस उदाहरण में कोई state रीडंडंट है?

</Hint>

<Sandpack>

```js App.js
import { useState } from 'react';
import AddItem from './AddItem.js';
import PackingList from './PackingList.js';

let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(3);
  const [packed, setPacked] = useState(1);

  function handleAddItem(title) {
    setTotal(total + 1);
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false
      }
    ]);
  }

  function handleChangeItem(nextItem) {
    if (nextItem.packed) {
      setPacked(packed + 1);
    } else {
      setPacked(packed - 1);
    }
    setItems(items.map(item => {
      if (item.id === nextItem.id) {
        return nextItem;
      } else {
        return item;
      }
    }));
  }

  function handleDeleteItem(itemId) {
    setTotal(total - 1);
    setItems(
      items.filter(item => item.id !== itemId)
    );
  }

  return (
    <>  
      <AddItem
        onAddItem={handleAddItem}
      />
      <PackingList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <hr />
      <b>{packed} out of {total} packed!</b>
    </>
  );
}
```

```js AddItem.js hidden
import { useState } from 'react';

export default function AddItem({ onAddItem }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add item"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddItem(title);
      }}>Add</button>
    </>
  )
}
```

```js PackingList.js hidden
import { useState } from 'react';

export default function PackingList({
  items,
  onChangeItem,
  onDeleteItem
}) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={e => {
                onChangeItem({
                  ...item,
                  packed: e.target.checked
                });
              }}
            />
            {' '}
            {item.title}
          </label>
          <button onClick={() => onDeleteItem(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<Solution>

हालांकि आप प्रत्येक event handler को `total` और `packed` काउंटरों को सही ढंग से अपडेट करने के लिए सावधानी से बदल सकते हैं, रुट समस्या यह है कि ये state वेरिएबल मौजूद हैं। वे निरर्थक हैं क्योंकि आप हमेशा `item` array से ही आइटमों की संख्या (packed या total) को कैलकुलेट कर सकते हैं। बग को ठीक करने के लिए रीडंडंट state को हटा दें:

<Sandpack>

```js App.js
import { useState } from 'react';
import AddItem from './AddItem.js';
import PackingList from './PackingList.js';

let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);

  const total = items.length;
  const packed = items
    .filter(item => item.packed)
    .length;

  function handleAddItem(title) {
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false
      }
    ]);
  }

  function handleChangeItem(nextItem) {
    setItems(items.map(item => {
      if (item.id === nextItem.id) {
        return nextItem;
      } else {
        return item;
      }
    }));
  }

  function handleDeleteItem(itemId) {
    setItems(
      items.filter(item => item.id !== itemId)
    );
  }

  return (
    <>  
      <AddItem
        onAddItem={handleAddItem}
      />
      <PackingList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <hr />
      <b>{packed} out of {total} packed!</b>
    </>
  );
}
```

```js AddItem.js hidden
import { useState } from 'react';

export default function AddItem({ onAddItem }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add item"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddItem(title);
      }}>Add</button>
    </>
  )
}
```

```js PackingList.js hidden
import { useState } from 'react';

export default function PackingList({
  items,
  onChangeItem,
  onDeleteItem
}) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={e => {
                onChangeItem({
                  ...item,
                  packed: e.target.checked
                });
              }}
            />
            {' '}
            {item.title}
          </label>
          <button onClick={() => onDeleteItem(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

ध्यान दें कि इस परिवर्तन के बाद event handlers केवल `setItems` को कॉल करने से कैसे संबंधित हैं। आइटम का काउंट अब `items` से अगले रेंडर के दौरान कैलकुलेट किया जाता है, इसलिए वे हमेशा अप-टू-डेट रहता है।

</Solution>

### गायब होने वाले सेलेक्शन को ठीक करें {/*fix-the-disappearing-selection*/}

State में `letters` की एक लिस्ट है। जब आप किसी विशेष अक्षर पर होवर या फ़ोकस करते हैं, तो वह हाइलाइट हो जाता है। अभी हाइलाइट किया गया अक्षर `highlightedLetter` state वेरिएबल में संग्रहित है। आप अलग-अलग अक्षरों को "Star" और "Unstar" कर सकते हैं, जो state में `letters` array को अपडेट करता है।

यह कोड काम करता है, लेकिन इसमें एक छोटी सी UI गड़बड़ है। जब आप "Star" या "Unstar" दबाते हैं, तो हाइलाइटिंग एक पल के लिए गायब हो जाती है। हालाँकि, जैसे ही आप अपना पॉइंटर ले जाते हैं या कीबोर्ड के साथ दूसरे अक्षर पर स्विच करते हैं, यह फिर से दिखाई देता है। ऐसा क्यों हो रहा है? इसे ठीक करें ताकि बटन क्लिक करने के बाद हाइलाइटिंग गायब न हो जाए।

<Sandpack>

```js App.js
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedLetter, setHighlightedLetter] = useState(null);

  function handleHover(letter) {
    setHighlightedLetter(letter);
  }

  function handleStar(starred) {
    setLetters(letters.map(letter => {
      if (letter.id === starred.id) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter === highlightedLetter
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}
```

```js Letter.js
export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter);        
      }}
      onPointerMove={() => {
        onHover(letter);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}
```

```js data.js
export const initialLetters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
button { margin: 5px; }
li { border-radius: 5px; }
.highlighted { background: #d2eaff; }
```

</Sandpack>

<Solution>

समस्या यह है कि आप letter ऑब्जेक्ट को `highlightedLetter` में स्टोर कर रहे हैं। लेकिन आप `letters` array में भी वही जानकारी रखते हैं। तो आपके state में डुप्लीकेशन है! जब आप बटन क्लिक करने के बाद `letters` array को अपडेट करते हैं, आप एक नया अक्षर ऑब्जेक्ट बनाते हैं जो `highlightedLetter` से अलग है। यही कारण है कि `highlightedLetter === letter` चेक `false` हो जाता है, और हाइलाइट गायब हो जाता है। अगली बार जब आप पॉइंटर के हिलने पर `setHighlightedLetter` को कॉल करते हैं तो यह फिर से दिखाई देता है।

समस्या को ठीक करने के लिए, state से डुप्लिकेशन हटाएं। *letter* को दो जगह स्टोर करने की बजाय, `highlightedId` स्टोर करें। फिर आप प्रत्येक अक्षर के लिए `letter.id === HighlightedId` के साथ `isHighlighted` की जांच कर सकते हैं, जो अंतिम रेंडर के बाद से `letter` ऑब्जेक्ट बदल जाने पर भी काम करेगा।

<Sandpack>

```js App.js
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedId, setHighlightedId ] = useState(null);

  function handleHover(letterId) {
    setHighlightedId(letterId);
  }

  function handleStar(starredId) {
    setLetters(letters.map(letter => {
      if (letter.id === starredId) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter.id === highlightedId
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}
```

```js Letter.js
export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter.id);        
      }}
      onPointerMove={() => {
        onHover(letter.id);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter.id);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}
```

```js data.js
export const initialLetters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
button { margin: 5px; }
li { border-radius: 5px; }
.highlighted { background: #d2eaff; }
```

</Sandpack>

</Solution>

### मल्टीप्ल सेलेक्शन इम्प्लीमेंट करें {/*implement-multiple-selection*/}

इस उदाहरण में, प्रत्येक `Letter` में एक `isSelected` prop और एक `onToggle` handler है जो इसे सेलेक्ट करता है। यह काम करता है, लेकिन state को `selectedId` के रूप में स्टोर किया जाता है (या तो `null` या एक ID), इसलिए किसी भी समय केवल एक ही अक्षर सिलेक्ट किया जा सकता है।

मल्टीप्ल सिलेक्शन इम्प्लीमेंट करने के लिए state स्ट्रक्चर बदलें। (आप इसे कैसे स्ट्रक्चर करेंगे? कोड लिखने से पहले इसके बारे में सोचें।) प्रत्येक चेकबॉक्स दूसरों से स्वतंत्र होना चाहिए। किसी सेलेक्टेड अक्षर पर क्लिक करने से उसे अनचेक कर देना चाहिए। अंत में, फुटर को सेलेक्टेड आइटम्स की सही संख्या दर्शानी चाहिए।

<Hint>

एक ही selected ID के बजाय, आप एक array या selected IDs का [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) state में रखना चाह सकते हैं।

</Hint>

<Sandpack>

```js App.js
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedId, setSelectedId] = useState(null);

  // TODO: allow multiple selection
  const selectedCount = 1;

  function handleToggle(toggledId) {
    // TODO: allow multiple selection
    setSelectedId(toggledId);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              // TODO: allow multiple selection
              letter.id === selectedId
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
```

```js Letter.js
export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}
```

```js data.js
export const letters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
input { margin: 5px; }
li { border-radius: 5px; }
label { width: 100%; padding: 5px; display: inline-block; }
.selected { background: #d2eaff; }
```

</Sandpack>

<Solution>

एक `selectedId` के बजाय, `selectedIds` *array* को state में रखें। उदाहरण के लिए, यदि आप पहले और अंतिम अक्षर का सेलेक्शन करते हैं, इसमें `[0, 2]` होगा। जब कुछ भी नहीं चुना जाता है, तो यह एक खाली `[]` array होगा:

<Sandpack>

```js App.js
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedCount = selectedIds.length;

  function handleToggle(toggledId) {
    // Was it previously selected?
    if (selectedIds.includes(toggledId)) {
      // Then remove this ID from the array.
      setSelectedIds(selectedIds.filter(id =>
        id !== toggledId
      ));
    } else {
      // Otherwise, add this ID to the array.
      setSelectedIds([
        ...selectedIds,
        toggledId
      ]);
    }
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
```

```js Letter.js
export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}
```

```js data.js
export const letters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
input { margin: 5px; }
li { border-radius: 5px; }
label { width: 100%; padding: 5px; display: inline-block; }
.selected { background: #d2eaff; }
```

</Sandpack>

एक array का उपयोग करने का एक मामूली नकारात्मक पहलू यह है कि प्रत्येक आइटम के लिए, आप `selectedIds.includes(letter.id)` को कॉल कर रहे हैं यह जांचने के लिए कि यह सेलेक्टेड है या नहीं। अगर array बहुत बड़ा है, यह एक परफ़ॉर्मेंस मुसीबत बन सकती है क्योंकि [`includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) के साथ array खोज लिनियर समय लेती है, और आप यह खोज प्रत्येक व्यक्तिगत आइटम के लिए कर रहे हैं।

इसे ठीक करने के लिए, आप [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) को state में रख सकते हैं, जो एक तेज़ [`has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) ऑपरेशन प्रोवाइड है:

<Sandpack>

```js App.js
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState(
    new Set()
  );

  const selectedCount = selectedIds.size;

  function handleToggle(toggledId) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.has(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
```

```js Letter.js
export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}
```

```js data.js
export const letters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
input { margin: 5px; }
li { border-radius: 5px; }
label { width: 100%; padding: 5px; display: inline-block; }
.selected { background: #d2eaff; }
```

</Sandpack>

अब प्रत्येक आइटम एक `selectedIds.has(letter.id)` चेक करता है, जो बहुत तेज़ है।

ध्यान रखें कि आपको [state में ऑब्जेक्ट्स को म्यूटेट नहीं करना है](/learn/updating-objects-in-state), और इसमें Sets भी शामिल हैं। यही कारण है कि `handleToggle` फ़ंक्शन पहले सेट की एक *कॉपी* बनाता है, और फिर उस कॉपी को अपडेट करता है।

</Solution>

</Challenges>

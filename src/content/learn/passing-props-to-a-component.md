---
title: एक कॉम्पोनेन्ट में प्रॉप्स को भेजना
---

<Intro>

React कॉम्पोनेन्ट एक दूसरे के साथ संवाद करने के लिए *प्रॉप्स* का उपयोग करते हैं। प्रत्येक पैरेंट कॉम्पोनेन्ट अपने चाइल्ड कॉम्पोनेन्ट को उन्हें प्रॉप्स देकर कुछ जानकारी पास कर सकता है। प्रॉप्स आपको HTML एट्रीब्यूट्स की याद दिला सकता है, लेकिन आप इनके माध्यम से ऑब्जेक्ट्स, ऐरेज़ और फंक्शन्स सहित किसी भी JavaScript वैल्यू को पास कर सकते हैं।

</Intro>

<YouWillLearn>

* एक कॉम्पोनेन्ट में प्रॉप्स को कैसे पास करें
* एक कॉम्पोनेन्ट से प्रॉप्स कैसे पढ़ें
* प्रॉप्स के लिए डिफ़ॉल्ट वैल्यूज कैसे निर्दिष्ट करें
* एक कॉम्पोनेन्ट में किसी JSX को कैसे पास करें
* समय के साथ प्रॉप्स कैसे बदलते हैं

</YouWillLearn>

## परिचित प्रॉप्स {/*familiar-props*/}

प्रॉप्स वह जानकारी है जिसे आप एक JSX टैग में पास करते हैं। उदाहरण के लिए, `className`, `src`, `alt`, `width`, and `height` कुछ प्रॉप्स हैं जिन्हें आप `<img>` में पास कर सकते हैं:

<Sandpack>

```js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```

```css
body { min-height: 120px; }
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

जो प्रॉप्स आप एक `<img>` टैग को पास कर सकते हैं, वे पूर्वनिर्धारित हैं (ReactDOM [HTML स्टैंडर्ड](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element) के अनुरूप है।) लेकिन आप *अपने स्वयं के* कॉम्पोनेन्ट, जैसे `<Avatar>`, में उन्हें कस्टमाइज़ करने के लिए कोई भी प्रॉप्स पास कर सकते हैं। इसे ऐसे करें!

##  एक कॉम्पोनेन्ट में प्रॉप्स को भेजना {/*passing-props-to-a-component*/}

इस कोड में, `Profile` कॉम्पोनेन्ट अपने चाइल्ड कॉम्पोनेन्ट, `Avatar`, में कोई भी प्रॉप्स पास नहीं कर रहा है:

```js
export default function Profile() {
  return (
    <Avatar />
  );
}
```

आप `Avatar` को दो चरणों में कुछ प्रॉप्स दे सकते हैं।

### चरण 1: चाइल्ड कॉम्पोनेन्ट को प्रॉप्स पास करें {/*step-1-pass-props-to-the-child-component*/}

सबसे पहले,`Avatar` में कुछ प्रॉप्स पास करें। उदाहरण के लिए, दो प्रॉप्स पास करें: `person` (एक ऑब्जेक्ट), और `size` (एक नंबर):

```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

<Note>

यदि `person=` के बाद double curly braces आपको भ्रमित करें, याद करें के JSX curlies में [वे केवल एक ऑब्जेक्ट हैं](/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx)।

</Note>

अब आप इन प्रॉप्स को `Avatar` कॉम्पोनेन्ट के अंदर प्राप्त कर सकते हैं।

### चरण 2: चाइल्ड कॉम्पोनेन्ट के अंदर प्रॉप्स प्राप्त करें {/*step-2-read-props-inside-the-child-component*/}

आप इन प्रॉप्स को उनके नाम `person, size` को सूचीबद्ध करके पढ़ सकते हैं, जो कि `function Avatar` के बाद `({` और `})` के अंदर कॉमा द्वारा अलग किए गए हैं। यह आपको उन्हें `Avatar` के कोड के अंदर उपयोग करने देता है, जैसे आप एक वेरिएबल के साथ करेंगे।

```js
function Avatar({ person, size }) {
  // person और size यहां उपलब्ध हैं
}
```

`Avatar` में कुछ लॉजिक जोड़ें जो `person` और `size` प्रॉप्स को रेंडरिंग के लिए उपयोग करता है, और आपका कार्य पूर्ण।

अब आप विभिन्न प्रॉप्स के साथ कई अलग -अलग तरीकों से रेंडर करने के लिए `Avatar` को कॉन्फ़िगर कर सकते हैं। वैल्यूज में छोटे बदलाव करने का प्रयास करें!

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
body { min-height: 120px; }
.avatar { margin: 10px; border-radius: 50%; }
```

</Sandpack>

प्रोप्स आपको स्वतंत्र रूप से पैरेंट और चाइल्ड कॉम्पोनेंट्स के बारे में सोचने देते हैं। उदाहरण के लिए, आप `Profile` के अंदर `person` या `size` प्रॉप्स को बदल सकते हैं, यह सोचे बिना कि `Avatar` उनका उपयोग कैसे करता है। इसी प्रकार, आप बदल सकते हैं कि कैसे `Avatar` इन प्रॉप्स का उपयोग करता है,`Profile` को देखे बिना।

आप प्रॉप्स को "knobs" की तरह सोच सकते हैं जिसे आप समायोजित कर सकते हैं। वे वही भूमिका निभाते हैं जो कि फंक्शन्स के लिए आर्ग्यूमेंट्स निभाते हैं - वास्तव में, आपके कॉम्पोनेन्ट के लिए प्रॉप्स एकमात्र आर्ग्युमेंट _होते हैं_! React कॉम्पोनेन्ट फ़ंक्शन एक अकेला आर्ग्युमेंट, एक `props` ऑब्जेक्ट, स्वीकार करते हैं:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

आमतौर पर आपको पूरे `props` ऑब्जेक्ट की आवश्यकता नहीं होती है, इसलिए आप इसे व्यक्तिगत प्रॉप्स में डीस्ट्रक्चर करते हैं।

<Pitfall>

**प्रॉप्स को डिक्लेअर करते समय `(` और `)` के अंदर `{` और `}` curlies** की जोड़ी को न भूलें:

```js
function Avatar({ person, size }) {
  // ...
}
```

इस सिंटैक्स को ["destructuring"](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter) कहा जाता है और यह एक फ़ंक्शन पैरामीटर से प्रॉपर्टीज को प्राप्त करने के बराबर है:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

</Pitfall>

## एक प्रोप के लिए एक डिफ़ॉल्ट वैल्यू निर्दिष्ट करना {/*specifying-a-default-value-for-a-prop*/}

यदि आप कोई वैल्यू निर्दिष्ट न होने पर fall back के लिए एक डिफ़ॉल्ट वैल्यू देना चाहते हैं, आप इसे destructuring के द्वारा पैरामीटर के ठीक बाद `=` और डिफ़ॉल्ट वैल्यू डालकर कर सकते हैं:

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

अब, यदि `<Avatar person={...} />` बिना `size` प्रोप के साथ रेंडर किया गया है, तो `size` `100` पर सेट हो जाएगा।

डिफ़ॉल्ट वैल्यू का उपयोग केवल तभी किया जाता है जब `size` प्रोप गायब है या यदि आप `size={undefined}` पास करते हैं। लेकिन अगर आप `size= {null}` या `size={0}` पास करते हैं, तो डिफ़ॉल्ट वैल्यू का उपयोग **नहीं** किया जाएगा।

## JSX स्प्रेड सिंटैक्स का उपयोग करके प्रॉप्स को फॉरवर्ड करना {/*forwarding-props-with-the-jsx-spread-syntax*/}

कभी-कभी, प्रॉप्स को पास करना बहुत दोहरावदार हो जाता है:

```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

दोहरावदार कोड के साथ कुछ भी गलत नहीं है - यह अधिक सुपाठ्य हो सकता है। लेकिन कई बार आप संक्षिप्तता को महत्व दे सकते हैं। कुछ कॉम्पोनेंट्स अपने चिल्ड्रन को अपने सभी प्रॉप्स को फॉरवर्ड कर देते हैं, जैसे कि यह `Profile` `Avatar` के साथ करता है। क्योंकि वे सीधे अपने किसी भी प्रॉप्स का उपयोग नहीं करते हैं, इसलिए यह अधिक संक्षिप्त "स्प्रेड" सिंटैक्स का उपयोग करने के लिए समझ में आ सकता है:

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

यह `Profile` के सभी प्रॉप्स को उनके प्रत्येक नाम को सूचीबद्ध किए बिना `Avatar` को फॉरवर्ड कर देता है।

**स्प्रेड सिंटैक्स का उपयोग नियंत्रित रूप में करें।** यदि आप इसे हर दूसरे कॉम्पोनेन्ट में उपयोग कर रहे हैं, तो कुछ गलत है। अक्सर, यह इंगित करता है कि आपको अपने कॉम्पोनेंट्स को विभाजित करना चाहिए और चिल्ड्रन को JSX के रूप में पास करना चाहिए. उस पर और अधिक आगे!

## JSX को चिल्ड्रन के रूप में पास करना {/*passing-jsx-as-children*/}

built-in ब्राउज़र टैग्स को एक दूसरे के अंदर रखना (नेस्ट करना) आम बात है:

```js
<div>
  <img />
</div>
```

कभी-कभी आप अपने स्वयं के कॉम्पोनेंट्स को उसी तरह नेस्ट करना चाहेंगे:

```js
<Card>
  <Avatar />
</Card>
```

जब आप एक JSX टैग के अंदर कंटेंट को नेस्ट करते हैं, तो पैरेंट कॉम्पोनेन्ट उस कंटेंट को `children` नामक एक प्रोप में प्राप्त करेगा। उदाहरण के लिए, नीचे दिए गए `Card` कॉम्पोनेन्ट को `children` प्रोप प्राप्त प्राप्त होगा जो `<Avatar/>` पर सेट है और उसे एक wrapper div में रेंडर करेगा:

<Sandpack>

```js src/App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

```js src/Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

```js src/utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.card {
  width: fit-content;
  margin: 5px;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.avatar {
  margin: 20px;
  border-radius: 50%;
}
```

</Sandpack>

`<Card>` के अंदर `<Avatar>` को कुछ टेक्स्ट के साथ बदलने का प्रयास करें, यह देखने के लिए कि `Card` कॉम्पोनेन्ट किसी भी नेस्टेड कंटेंट को कैसे wrap कर सकता है। इसे "जानने" की आवश्यकता नहीं है कि इसके अंदर क्या रेंडर किया जा रहा है। आप इस लचीले पैटर्न को कई स्थानों पर देखेंगे।

आप एक `children` प्रॉप के साथ एक कॉम्पोनेन्ट को ऐसे सोच सकते हैं, जिसमें "छेद" होता है जो कि मनमाने ढंग से JSX के साथ अपने पैरेंट कॉम्पोनेंट्स द्वारा "भरा" जा सकता है। आप अक्सर `children` प्रोप का visual wrappers के लिए उपयोग करेंगे: पैनल, ग्रिड, आदि।

<Illustration src="/images/docs/illustrations/i_children-prop.png" alt='एक पहेली जैसी कार्ड टाइल जिसमे "children" के टुकड़े जैसे text और Avatar के लिए एक स्लॉट है' />

## समय के साथ प्रॉप्स कैसे बदलते हैं {/*how-props-change-over-time*/}

नीचे दिया गया `Clock` कॉम्पोनेन्ट अपने पैरेंट कॉम्पोनेन्ट से दो प्रॉप्स प्राप्त करता है:c`color` और `time`। (पैरेंट कॉम्पोनेन्ट का कोड छोड़ दिया गया है क्योंकि यह [स्टेट](/learn/state-a-components-memory) का उपयोग करता है, जिसमे हम अभी तक गोता नहीं लगाएंगे।)

नीचे दिए गए सेलेक्ट बॉक्स में रंग बदलने का प्रयास करें:

<Sandpack>

```js src/Clock.js active
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

```js src/App.js hidden
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

यह उदाहरण दर्शाता है कि **एक कॉम्पोनेन्ट समय के साथ अलग-अलग प्रॉप्स प्राप्त कर सकता है।** प्रॉप्स हमेशा स्टैटिक नहीं होते हैं! यहाँ, `time` प्रोप हर सेकंड बदल रहा है, और `color` प्रोप तब बदलता है जब आप किसी और रंग का चयन करते हैं। प्रॉप्स केवल शुरुआत के बजाय किसी भी समय एक कॉम्पोनेन्ट के डेटा को दर्शाते हैं।

हालाँकि, प्रॉप्स [अपरिवर्तनीय](https://en.wikipedia.org/wiki/immutable_object) होते हैं - कंप्यूटर विज्ञान से शब्द "unchangeable" हैं। जब किसी कॉम्पोनेन्ट को अपने प्रॉप्स को बदलने की आवश्यकता होती है (उदाहरण के लिए, एक उपयोगकर्ता के इंटरैक्शन या नए डेटा के जवाब में), तो उसे अपने पैरेंट कॉम्पोनेन्ट को "पूछना" होगा कि वह इसे _अलग प्रॉप्स_- एक नई ऑब्जेक्ट पास करे! इसके पुराने प्रॉप्स को तब एक तरफ रखा जाएगा, और अंततः JavaScript इंजन उनके द्वारा ली गई मेमोरी को पुनः प्राप्त कर लेगा।

**"प्रॉप्स को बदलने" की प्रयास न करें।** जब आपको उपयोगकर्ता इनपुट का जवाब देने की आवश्यकता होती है (जैसे चयनित रंग को बदलना), तो आपको "स्टेट को सेट" करने की आवश्यकता होगी, जिसके बारे में आप [State: एक कौम्पोनॅन्ट की मेमोरी](/learn/state-a-components-memory) में सीख सकते हैं।

<Recap>

* प्रॉप्स पास करने के लिए, उन्हें JSX में जोड़ें, जैसे आप HTML ऐट्रिब्यूट्स के साथ करेंगे।
* प्रॉप्स प्राप्त करने के लिए, `function Avatar({ person, size })` destructuring सिंटेक्स का उपयोग करें।
* आप डिफ़ॉल्ट वैल्यू जैसे `size = 100` निर्दिष्ट कर सकते हैं, जिसका उपयोग लापता और `undefined` प्रॉप्स के लिए किया जाता है।
* आप सभी प्रॉप्स को `<Avatar {...props} />` JSX स्प्रेड सिंटेक्स के साथ फॉरवर्ड कर सकते हैं, लेकिन इसका अत्यधिक उपयोग न करें!
* नेस्टेड JSX जैसे `<Card><Avatar /></Card>` `Card` कॉम्पोनेन्ट के `children` प्रोप के रूप में दिखाई देगा।
* प्रॉप्स किसी विशेष समय के केवल read-only स्नैपशॉट होते हैं: प्रत्येक रेंडर प्रॉप्स का एक नया संस्करण प्राप्त करता है।
* आप प्रॉप्स को बदल नहीं सकते। जब आपको इंटरैक्टिविटी की आवश्यकता होगी, तो आपको स्टेट सेट करनी होगी।

</Recap>



<Challenges>

#### एक कॉम्पोनेन्ट को एक्सट्रेक्ट करें {/*extract-a-component*/}

इस `Gallery` कॉम्पोनेन्ट में दो प्रोफाइल के लिए कुछ समान मार्कअप है। दोहराव को कम करने के लिए इसमें से एक `Profile` कॉम्पोनेन्ट निकालें। आपको यह चुनना होगा कि इसमें कोनसे प्रॉप्स पास करें।

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (chemical element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

<Hint>

Scientists में से एक के लिए मार्कअप एक्सट्रेक्ट करने से शुरू करें। फिर उन टुकड़ों को खोजें जो इसे दूसरे उदाहरण में मेल नहीं खाते हैं, और उन्हें प्रॉप्स द्वारा कॉन्फ़िगर करने योग्य बनाएं।

</Hint>

<Solution>

इस उत्तर में, `Profile` कॉम्पोनेन्ट कई प्रॉप्स को स्वीकार करता है: `imageId` (एक स्ट्रिंग), `name` (एक स्ट्रिंग), `profession` (एक स्ट्रिंग), `awards` (स्ट्रिंग की एक ऐरे), `discovery`(एक स्ट्रिंग), और `imageSize` (एक नंबर)।

ध्यान दें कि `imageSize` प्रोप का एक डिफ़ॉल्ट वैल्यू है, यही कारण है कि हम इसे कॉम्पोनेन्ट में पास नहीं करते हैं।

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70
}) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li><b>Profession:</b> {profession}</li>
        <li>
          <b>Awards: {awards.length} </b>
          ({awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        imageId="szV5sdG"
        name="Maria Skłodowska-Curie"
        profession="physicist and chemist"
        discovery="polonium (chemical element)"
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ]}
      />
      <Profile
        imageId='YfeOqp2'
        name='Katsuko Saruhashi'
        profession='geochemist'
        discovery="a method for measuring carbon dioxide in seawater"
        awards={[
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ]}
      />
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

ध्यान दें कि कैसे आपको एक अलग `awardCount` प्रोप की आवश्यकता नहीं है यदि `awards` एक ऐरे है। तब आप awards की संख्या को गिनने के लिए `awards.length` का उपयोग कर सकते हैं। याद रखें कि प्रॉप्स कोई भी वैल्यूज ले सकते हैं, और इसमें ऐरेज़ भी शामिल हैं!

एक अन्य उत्तर, जो इस पृष्ठ पर पहले के उदाहरणों के समान है, एक ऑब्जेक्ट में किसी व्यक्ति के बारे में सभी जानकारी को समूहित करना है, और उस ऑब्जेक्ट को एक प्रोप के रूप में पास करना है:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Profile({ person, imageSize = 70 }) {
  const imageSrc = getImageUrl(person)

  return (
    <section className="profile">
      <h2>{person.name}</h2>
      <img
        className="avatar"
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li>
          <b>Profession:</b> {person.profession}
        </li>
        <li>
          <b>Awards: {person.awards.length} </b>
          ({person.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {person.discovery}
        </li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile person={{
        imageId: 'szV5sdG',
        name: 'Maria Skłodowska-Curie',
        profession: 'physicist and chemist',
        discovery: 'polonium (chemical element)',
        awards: [
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ],
      }} />
      <Profile person={{
        imageId: 'YfeOqp2',
        name: 'Katsuko Saruhashi',
        profession: 'geochemist',
        discovery: 'a method for measuring carbon dioxide in seawater',
        awards: [
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ],
      }} />
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

यद्यपि सिंटैक्स थोड़ा अलग दिखता है क्योंकि आप JSX ऐट्रिब्यूट्स के संग्रह के बजाय एक JavaScript ऑब्जेक्ट के प्रॉपर्टीज़ का वर्णन कर रहे हैं, ये उदाहरण ज्यादातर समकक्ष हैं, और आप किसी भी दृष्टिकोण को चुन सकते हैं।

</Solution>

#### एक प्रोप के आधार पर इमेज के आकार को एडजस्ट करें {/*adjust-the-image-size-based-on-a-prop*/}

इस उदाहरण में, `Avatar` एक संख्यात्मक `size` प्रोप प्राप्त करता है जो `<img>` की चौड़ाई और ऊंचाई को निर्धारित करता है। इस उदाहरण में `size` प्रोप `40` पर सेट है। हालाँकि, यदि आप एक नए टैब में छवि खोलते हैं, तो आप देखेंगे कि छवि स्वयं बड़ी है (`160` पिक्सेल)। वास्तविक छवि आकार इस आधार पर निर्धारित किया जाता है कि आप किस थंबनेल आकार का अनुरोध कर रहे हैं।

`size` प्रोप के आधार पर निकटतम छवि आकार का अनुरोध करने के लिए `Avatar` कॉम्पोनेन्ट बदलें। विशेष रूप से, यदि `size` `90` से कम है, तो `getImageUrl` फ़ंक्शन में `'b'` ("बड़ा") के बजाय `'s'` ("छोटा") पास करें। सत्यापित करें कि छवियों को `size` प्रोप के विभिन्न मूल्यों के साथ रेंडर करके और छवियों को एक नए टैब में खोलने से आपके परिवर्तन काम कर रहे हैं।

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

<Solution>

इस प्रकार से आप इसमें आगे बढ़ सकते हैं:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

आप [`window.devicePixelRatio`](https://developer.mozilla.org/en-us/docs/web/window/devicepixelratio) को ध्यान में रखते हुए उच्च DPI स्क्रीन के लिए एक तेज छवि भी दिखा सकते हैं:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

const ratio = window.devicePixelRatio;

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size * ratio > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={70}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

प्रॉप्स आपको `Avatar` कॉम्पोनेन्ट के अंदर इस तरह से तर्क को एनकैप्सुलेट करने देता है (और बाद में जरूरत पड़ने पर इसे बदलें) ताकि हर कोई `<Avatar>` कॉम्पोनेन्ट का उपयोग कर सके बिना सोचे कि छवियों को कैसे अनुरोध किया जाता है और आकार दिया जाता है।

</Solution>

#### JSX को एक `children` प्रोप में पास करना {/*passing-jsx-in-a-children-prop*/}

नीचे दिए गए मार्कअप से एक `Card` कॉम्पोनेन्ट एक्सट्रेक्ट करें, और अलग-अलग JSX को पास करने के लिए `children` प्रोप का उपयोग करें:

<Sandpack>

```js
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

<Hint>

किसी भी JSX को जो आप एक कॉम्पोनेन्ट के टैग के अंदर डालते हैं, उस कॉम्पोनेन्ट में `children` प्रोप के रूप में पास किया जाएगा।

</Hint>

<Solution>

आप इस प्रकार से दोनों स्थानों में `Card` कॉम्पोनेन्ट का उपयोग कैसे कर सकते हैं:

<Sandpack>

```js
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card>
        <h1>Photo</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card>
        <h1>About</h1>
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

यदि आप चाहते हैं कि हर `Card` में हमेशा एक title हो तो आप `title` को एक अलग प्रोप भी बना सकते हैं:

<Sandpack>

```js
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card title="Photo">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card title="About">
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

</Solution>

</Challenges>

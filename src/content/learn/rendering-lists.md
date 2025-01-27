---
title: सूचियाँ प्रस्तुत करना
---

<Intro>
आप अक्सर किसी डेटा संग्रह से कई समान कौम्पोनॅन्ट्स प्रदर्शित करना चाहेंगे। डेटा के array को प्रबंधित करने के लिए आप [JavaScript array methods](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#) का उपयोग कर सकते हैं। इस पेज पर, आप React के साथ [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) और [`map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) का उपयोग करेंगे ताकि अपने डेटा के array को फ़िल्टर और परिवर्तित करके कौम्पोनॅन्ट्स के array में बदल सकें।


</Intro>

<YouWillLearn>

* JavaScript के `map()` का उपयोग करके array से कौम्पोनॅन्ट्स को कैसे रेंडर करें।
* JavaScript के  `filter()` का उपयोग करके केवल विशेष कौम्पोनॅन्ट्स को कैसे रेंडर करें। 
* React keys का उपयोग कब और क्यों करना चाहिए।

</YouWillLearn>

## Arrays से डेटा रेंडर करना {/*rendering-data-from-arrays*/}

मान लीजिए कि आपके पास content की एक सूची है।

```js
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```

उन सूची आइटम्स के बीच केवल एक अंतर होता है: उनकी contents, यानी उनका डेटा। जब आप इंटरफेस बना रहे होते हैं, तो अक्सर आपको एक ही कौम्पोनॅन्ट के कई उदाहरणों को अलग-अलग डेटा के साथ दिखाने की आवश्यकता होती है, जैसे कि टिप्पणियों की सूची या प्रोफ़ाइल images की गैलरी। ऐसे मामलों में, आप उस डेटा को JavaScript ऑब्जेक्ट्स और arrays में संग्रहीत कर सकते हैं और फिर उनमें से कौम्पोनॅन्ट्स की सूची रेंडर करने के लिए [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)  और [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) जैसे तरीकों का उपयोग कर सकते हैं।

यहां एक छोटा उदाहरण दिया गया है कि कैसे एक array से आइटम्स की सूची बनाई जा सकती है:

1. डेटा को एक array में **स्थानांतरित** करें:

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

2. **Map** `people` के सदस्यों को एक नए JSX nodes के array, `listItems`, में परिवर्तित करें:

```js
const listItems = people.map(person => <li>{person}</li>);
```

3. **Return** अपने कौम्पोनॅन्ट में `listItems` को `<ul>` में wrapped करें:

```js
return <ul>{listItems}</ul>;
```

यहां परिणाम दिया गया है:

<Sandpack>

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

```css
li { margin-bottom: 10px; }
```

</Sandpack>

ध्यान दें कि ऊपर दिए गए sandbox में एक कंसोल error दिखाई दे रही है:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

आप इस error को ठीक करना बाद में सीखेंगे इस पेज पर। इससे पहले, आइए आपके डेटा को कुछ संरचना दें।

## आइटम्स के arrays को फ़िल्टर करना {/*filtering-arrays-of-items*/}

यह डेटा और भी अधिक structured किया जा सकता है।

```js
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```

मान लीजिए आप केवल उन लोगों को दिखाना चाहते हैं जिनका पेशा `'chemist'` है। आप JavaScript के `filter()` method का उपयोग करके केवल उन्हीं लोगों को प्राप्त कर सकते हैं। यह method एक array को पास करता है और एक "test" (एक function जो `true` या `false` लौटाता है) के माध्यम से उन आइटम्स को फ़िल्टर करता है और केवल उन आइटम्स को एक नए array में लौटाता है जिन्होंने test पास किया (जो `true` लौटाते हैं)।

आप केवल उन आइटम्स को चाहते हैं जिनका `profession` `'chemist'` है। इसके लिए "test" function इस प्रकार दिखेगा: `(person) => person.profession === 'chemist'`। इसे एक साथ जोड़ने का तरीका यहां है:

1. एक नई array `chemists` **Create** करें  जो केवल ”chemist” वाले लोगों को दिखाती हो, `people` पर `filter()` कॉल करके इससे `person.profession === 'chemist'` फ़िल्टर करें:

```js
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```

2. अब **map**  करें `chemists` array पर:

```js {1,13}
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```

3. अब, अपने कौम्पोनॅन्ट से `listItems` को **return** करें :

```js
return <ul>{listItems}</ul>;
```

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Pitfall>

एरो फंक्शंस स्वचालित रूप से `=>` के बाद वाले एक्सप्रेशन को रिटर्न कर देते हैं, इसलिए आपको `return` स्टेटमेंट की आवश्यकता नहीं होती।

```js
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);
```

हालांकि, **आपको `return` को स्पष्ट रूप से लिखना चाहिए यदि आपके `=>` के बाद `{` कर्ली ब्रेस आ रहा है!**

```js
const listItems = chemists.map(person => { // Curly brace
  return <li>...</li>;
});
```

एरो फंक्शंस जिनमें `=> {` होता है, उन्हें ["block body".](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body) कहा जाता है। ये आपको एक से अधिक लाइन का कोड लिखने की अनुमति देते हैं, लेकिन आपको स्वयं `return` स्टेटमेंट लिखना पड़ता है। यदि आप इसे भूल जाते हैं, तो कुछ भी रिटर्न नहीं होता!

</Pitfall>

## सूची आइटम्स को क्रम में रखना `key` {/*keeping-list-items-in-order-with-key*/}

ध्यान दें कि ऊपर दिए गए सभी सैंडबॉक्स कंसोल में एक त्रुटि दिखा रहे हैं:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

आपको प्रत्येक array आइटम को एक `key` देना होगा -- एक स्ट्रिंग या नंबर जो उसे उस array के अन्य आइटम्स में से विशिष्ट रूप से पहचान सके।

```js
<li key={person.id}>...</li>
```

<Note>

`map()` कॉल के अंदर सीधे JSX elements को हमेशा keys की आवश्यकता होती है!

</Note>

Keys React को यह बताती हैं कि कौन सा array आइटम प्रत्येक कौम्पोनॅन्ट से संबंधित है, ताकि React बाद में उन्हें मेल कर सके। यह महत्वपूर्ण हो जाता है यदि आपके array आइटम्स को स्थानांतरित (जैसे कि सॉर्टिंग के कारण), जोड़ा, या हटाया जा सकता है। एक अच्छे तरीके से चुनी गई `key` React को यह अनुमान लगाने में मदद करती है कि क्या हुआ है, और DOM वृक्ष में सही अपडेट्स कराती है।

key को तुरंत जनरेट करने के बजाय, आपको उन्हें अपने डेटा में शामिल करना चाहिए।

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js src/data.js active
export const people = [{
  id: 0, // Used in JSX as a key
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Used in JSX as a key
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2, // Used in JSX as a key
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Used in JSX as a key
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4, // Used in JSX as a key
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<DeepDive>

#### प्रत्येक सूची आइटम के लिए कई DOM नोड्स को प्रदर्शित करना {/*displaying-several-dom-nodes-for-each-list-item*/}

जब प्रत्येक आइटम को केवल एक नहीं, बल्कि कई DOM नोड्स रेंडर करने की आवश्यकता हो, तो आप क्या करेंगे?

The short [`<>...</>` Fragment](/reference/react/Fragment) syntax won't let you pass a key, so you need to either group them into a single `<div>`, or use the slightly longer and [more explicit `<Fragment>` syntax:](/reference/react/Fragment#rendering-a-list-of-fragments)
संक्षिप्त [`<>...</>` फ्रैगमेंट](/reference/react/Fragment) सिंटैक्स आपको एक key पास करने की अनुमति नहीं देता, इसलिए आपको या तो उन्हें एकल `<div>` में समूहित करना होगा, या थोड़ा लंबा और [अधिक स्पष्ट `<Fragment>` सिंटैक्स](/reference/react/Fragment#rendering-a-list-of-fragments) का उपयोग करना होगा।

```js
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

फ्रैगमेंट्स DOM से गायब हो जाते हैं, इसलिए यह `<h1>`, `<p>`, `<h1>`, `<p>`, और इस तरह की एक सपाट सूची उत्पन्न करेगा।

</DeepDive>

### अपनी `key` कहां से प्राप्त करें {/*where-to-get-your-key*/}

डेटा के विभिन्न स्रोत विभिन्न प्रकार की keys प्रदान करते हैं:

* **डेटा डेटाबेस से:** यदि आपका डेटा डेटाबेस से आ रहा है, तो आप डेटाबेस keys/IDs का उपयोग कर सकते हैं, जो स्वभाव से अद्वितीय होती हैं।

* **स्थानीय रूप से उत्पन्न डेटा:** यदि आपका डेटा स्थानीय रूप से उत्पन्न और संग्रहित किया गया है (जैसे कि नोट-लेने वाले ऐप में नोट्स), तो आइटम बनाते समय एक बढ़ता हुआ काउंटर, [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) या [`uuid`](https://www.npmjs.com/package/uuid) जैसे पैकेज का उपयोग करें।

### keys के नियम {/*rules-of-keys*/}

* **keys को सिबलिंग्स के बीच अद्वितीय होना चाहिए।** हालांकि, _विभिन्न_ arrays में JSX नोड्स के लिए एक ही keys का उपयोग करना ठीक है।
* **keys को बदलना नहीं चाहिए** वरना उनका उद्देश्य ही समाप्त हो जाएगा! उन्हें रेंडर करते समय उत्पन्न न करें।

### React को keys की आवश्यकता क्यों है? {/*why-does-react-need-keys*/}

कल्पना करें कि आपके डेस्कटॉप पर फाइलों के नाम नहीं होते। इसके बजाय, आप उन्हें उनके क्रम के अनुसार संदर्भित करते — पहली फाइल, दूसरी फाइल, और इसी तरह। आप इसके आदी हो सकते थे, लेकिन जैसे ही आप एक फाइल को डिलीट करते, यह उलझन में डाल सकता था। दूसरी फाइल पहली फाइल बन जाती, तीसरी फाइल दूसरी फाइल बन जाती, और इसी तरह।

एक फोल्डर में फाइल नाम और array में JSX keys का उद्देश्य समान होता है। ये हमें एक आइटम को उसके सिबलिंग्स के बीच अद्वितीय रूप से पहचानने की अनुमति देते हैं। एक अच्छे तरीके से चुनी गई key अधिक जानकारी देती है, न केवल array में स्थिति के बारे में। यहां तक कि यदि स्थिति पुनर्व्यवस्थित होने के कारण बदलती है, तो `key` React को आइटम को उसकी पूरी जीवनकाल के दौरान पहचानने में मदद करती है।

<Pitfall>

आपको किसी आइटम के इंडेक्स को उसकी key के रूप में उपयोग करने का मन हो सकता है। दरअसल, यही React उपयोग करेगा यदि आप `key` को बिल्कुल निर्दिष्ट नहीं करते। लेकिन यदि कोई आइटम डाली जाती है, डिलीट होती है, या यदि array का पुनर्व्यवस्थापन होता है, तो आपके द्वारा रेंडर किए गए आइटम्स का क्रम समय के साथ बदल जाएगा। इंडेक्स को key के रूप में उपयोग करना अक्सर सूक्ष्म और उलझन भरे बग्स का कारण बनता है।

इसी तरह, तुरंत कीज़ उत्पन्न न करें, जैसे कि `key={Math.random()}` के साथ। इससे keys रेंडर के बीच कभी मेल नहीं खाएंगी, जिससे हर बार आपके सभी कौम्पोनॅन्ट्स और DOM को फिर से बनाना पड़ेगा। यह न केवल धीमा है, बल्कि यह सूची आइटम्स के अंदर किसी भी उपयोगकर्ता इनपुट को भी खो देगा। इसके बजाय, डेटा पर आधारित एक स्थिर ID का उपयोग करें।

ध्यान दें कि आपके कौम्पोनॅन्ट्स को `key` प्रॉप के रूप में प्राप्त नहीं होगी। इसे केवल React खुद द्वारा एक संकेत के रूप में उपयोग किया जाता है। यदि आपके कौम्पोनॅन्ट को ID की आवश्यकता है, तो आपको इसे एक अलग प्रॉप के रूप में पास करना होगा: `<Profile key={id} userId={id} />`।

</Pitfall>

<Recap>

इस पृष्ठ पर आपने सीखा:

* कैसे डेटा को कौम्पोनॅन्ट्स से बाहर ले जाकर डेटा संरचनाओं जैसे arrays और ऑब्जेक्ट्स में रखा जाए।
* कैसे JavaScript के `map()` का उपयोग करके समान कौम्पोनॅन्ट्स के सेट बनाए जाएं।
* कैसे JavaScript के `filter()` का उपयोग करके फ़िल्टर किए गए आइटम्स के arrays बनाए जाएं।
* क्यों और कैसे प्रत्येक कौम्पोनॅन्ट पर `key` सेट किया जाए ताकि React उन्हें ट्रैक कर सके, भले ही उनकी स्थिति या डेटा बदल जाए।

</Recap>



<Challenges>

#### एक सूची को दो में विभाजित करना {/*splitting-a-list-in-two*/}

यह उदाहरण सभी लोगों की एक सूची दिखाता है।

इसे दो अलग-अलग सूचियाँ एक के बाद एक दिखाने के लिए बदलें: **Chemists** और **बाकी सभी**। जैसा कि पहले था, आप यह निर्धारित कर सकते हैं कि कोई व्यक्ति केमिस्ट है या नहीं, इसके लिए आप `person.profession === 'chemist'` की जांच कर सकते हैं।

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Solution>

आप `filter()` का उपयोग दो बार कर सकते हैं, दो अलग-अलग arrays बना सकते हैं, और फिर दोनों पर `map` का उपयोग कर सकते हैं:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <h2>Chemists</h2>
      <ul>
        {chemists.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
      <h2>Everyone Else</h2>
      <ul>
        {everyoneElse.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

इस समाधान में, `map` कॉल्स को सीधे पैरेंट `<ul>` elements में इनलाइन रखा गया है, लेकिन यदि आपको इसे अधिक readable लगे, तो आप उनके लिए वेरिएबल्स भी बना सकते हैं।

फिर भी रेंडर की गई सूचियों के बीच कुछ डुप्लिकेशन है। आप आगे बढ़ सकते हैं और पुनरावृत्त भागों को `<ListSection>` कौम्पोनॅन्ट में निकाल सकते हैं।

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>
एक बहुत ही सतर्क पाठक यह नोटिस कर सकता है कि दो `filter` कॉल्स के साथ, हम प्रत्येक व्यक्ति के प्रोफेशन की जांच दो बार कर रहे हैं। एक प्रॉपर्टी की जांच करना बहुत तेज़ होता है, इसलिए इस उदाहरण में यह ठीक है। यदि आपकी लॉजिक उससे अधिक महंगी होती, तो आप `filter` कॉल्स को एक लूप से बदल सकते थे जो मैन्युअली arrays बनाता और प्रत्येक व्यक्ति की एक बार जांच करता।

असल में, अगर `people` कभी नहीं बदलते, तो आप इस कोड को अपने कौम्पोनॅन्ट से बाहर ले जा सकते हैं। React के दृष्टिकोण से, यह महत्वपूर्ण नहीं है कि आप उस array को कैसे उत्पन्न करते हैं, केवल यह मायने रखता है कि आप अंत में उसे JSX नोड्स का array देते हैं।

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

let chemists = [];
let everyoneElse = [];
people.forEach(person => {
  if (person.profession === 'chemist') {
    chemists.push(person);
  } else {
    everyoneElse.push(person);
  }
});

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

</Solution>

#### एक कौम्पोनॅन्ट में नेस्टेड सूचियाँ {/*nested-lists-in-one-component*/}
इस array से रेसिपी की एक सूची बनाएं! array में प्रत्येक रेसिपी के लिए, उसका नाम `<h2>` के रूप में दिखाएं और उसकी सामग्री को `<ul>` में सूचीबद्ध करें।
<Hint>

इसके लिए दो अलग-अलग `map` कॉल्स को नेस्ट करना होगा।

</Hint>

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

यहाँ एक तरीका है जिससे आप इसे कर सकते हैं:

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

`recipes` में से प्रत्येक के पास पहले से ही एक `id` फ़ील्ड है, इसलिए बाहरी लूप इसके `key` के रूप में इसका उपयोग करता है। सामग्री पर लूप करने के लिए कोई ID नहीं है, हालांकि यह मानना उचित है कि एक ही सामग्री को एक ही रेसिपी में दो बार सूचीबद्ध नहीं किया जाएगा, इसलिए उसका नाम `key` के रूप में काम कर सकता है। वैकल्पिक रूप से, आप डेटा संरचना को बदल सकते हैं और IDs जोड़ सकते हैं, या `key` के रूप में इंडेक्स का उपयोग कर सकते हैं (इस चेतावनी के साथ कि आप सामग्री को सुरक्षित रूप से पुनर्व्यवस्थित नहीं कर सकते)।

</Solution>

#### एक सूची आइटम कौम्पोनॅन्ट निकालना {/*extracting-a-list-item-component*/}

यह `RecipeList` कौम्पोनॅन्ट दो नेस्टेड `map` कॉल्स को शामिल करता है। इसे सरल बनाने के लिए, इससे एक `Recipe` कौम्पोनॅन्ट निकालें जो `id`, `name`, और `ingredients` प्रॉप्स को स्वीकार करेगा। आप बाहरी `key` को कहां रखें और क्यों?

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

आप बाहरी `map` से JSX को कॉपी-पेस्ट करके एक नया `Recipe` कौम्पोनॅन्ट बना सकते हैं और उस JSX को रिटर्न कर सकते हैं। फिर आप `recipe.name` को `name`, `recipe.id` को `id`, और इसी तरह बदल सकते हैं, और उन्हें प्रॉप्स के रूप में `Recipe` को पास कर सकते हैं।

<Sandpack>

```js
import { recipes } from './data.js';

function Recipe({ id, name, ingredients }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map(ingredient =>
          <li key={ingredient}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

यहाँ, `<Recipe {...recipe} key={recipe.id} />` एक syntax शॉर्टकट है जो यह कहता है "सब कुछ प्रॉपर्टीज़ `recipe` ऑब्जेक्ट की `Recipe` कौम्पोनॅन्ट को प्रॉप्स के रूप में पास करें"। आप प्रत्येक प्रॉप को स्पष्ट रूप से भी लिख सकते हैं: `<Recipe id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} />`।

**ध्यान दें कि `key` को `<Recipe>` पर ही निर्दिष्ट किया गया है, न कि `Recipe` से रिटर्न होने वाले रूट `<div>` पर।** इसका कारण यह है कि यह `key` सीधे आसपास की array के संदर्भ में आवश्यक है। पहले, आपके पास `<div>` का एक array था, इसलिए प्रत्येक को एक `key` की आवश्यकता थी, लेकिन अब आपके पास `<Recipe>` का एक array है। दूसरे शब्दों में, जब आप एक कौम्पोनॅन्ट को निकालते हैं, तो यह न भूलें कि `key` को JSX से बाहर छोड़ दें जिसे आप कॉपी और पेस्ट करते हैं।

</Solution>

#### एक सेपरेटर के साथ सूची {/*list-with-a-separator*/}

यह उदाहरण ताचिबाना होकुशी की एक प्रसिद्ध हैकू को रेंडर करता है, जिसमें प्रत्येक पंक्ति को `<p>` टैग में लपेटा गया है। आपका काम है कि प्रत्येक पैराग्राफ के बीच एक `<hr />` सेपरेटर डालें। आपका परिणामस्वरूप संरचना इस तरह दिखनी चाहिए:

```js
<article>
  <p>I write, erase, rewrite</p>
  <hr />
  <p>Erase again, and then</p>
  <hr />
  <p>A poppy blooms.</p>
</article>
```

एक हैकू में केवल तीन पंक्तियाँ होती हैं, लेकिन आपका समाधान किसी भी संख्या में पंक्तियों के लिए काम करना चाहिए। ध्यान दें कि `<hr />` तत्व केवल `<p>` elements के *बीच* दिखाई देने चाहिए, न कि शुरुआत में या अंत में!

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>
        <p key={index}>
          {line}
        </p>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

(यह एक दुर्लभ मामला है जहां इंडेक्स को एक की के रूप में उपयोग किया जा सकता है क्योंकि एक कविता की पंक्तियाँ कभी भी फिर से क्रमबद्ध नहीं होती हैं।)

<Hint>

आपको या तो `map` को एक मैनुअल लूप में बदलने की आवश्यकता होगी, या एक Fragment का उपयोग करना होगा।

</Hint>

<Solution>

आप एक मैनुअल लूप लिख सकते हैं, `<hr />` और `<p>...</p>` को आउटपुट array में डालते हुए:

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  let output = [];

  // Fill the output array
  poem.lines.forEach((line, i) => {
    output.push(
      <hr key={i + '-separator'} />
    );
    output.push(
      <p key={i + '-text'}>
        {line}
      </p>
    );
  });
  // Remove the first <hr />
  output.shift();

  return (
    <article>
      {output}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

मूल पंक्ति इंडेक्स को `key` के रूप में इस्तेमाल करना अब काम नहीं करेगा क्योंकि अब प्रत्येक सेपरेटर और पैराग्राफ एक ही array में हैं। हालांकि, आप उन्हें एक अलग `key` दे सकते हैं एक उपसर्ग का उपयोग करते हुए, जैसे कि `key={i + '-text'}`।

वैकल्पिक रूप से, आप Fragments का एक संग्रह रेंडर कर सकते हैं जिसमें `<hr />` और `<p>...</p>` शामिल हों। हालांकि, `<>...</>` संक्षिप्त सिंटैक्स keys पास करने का समर्थन नहीं करता है, इसलिए आपको `<Fragment>` को स्पष्ट रूप से लिखना होगा।

<Sandpack>

```js
import { Fragment } from 'react';

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, i) =>
        <Fragment key={i}>
          {i > 0 && <hr />}
          <p>{line}</p>
        </Fragment>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

याद रखें, Fragments (जो अक्सर `<> </>` के रूप में लिखा जाता है) आपको अतिरिक्त `<div>` जोड़ने के बिना JSX नोड्स को समूहित करने की अनुमति देते हैं!

</Solution>

</Challenges>

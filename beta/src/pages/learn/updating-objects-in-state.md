---
title: स्टेट में ऑब्जेक्ट्स को अपडेट करना
---

<Intro>

स्टेट कोई भी जावास्क्रिप्ट वैल्यू स्टोर करसकती है, ऑब्जेक्ट समेत। लेकिन आपको कभी भी  ऑब्जेक्ट्स को बदलना नहीं चैयाह जो आप React स्टेट में होल्ड करते है। उसके बजाए आपको जब भी  ऑब्जेक्ट को अपडेट करना हो या तो आप  एक नया ऑब्जेक्ट बनाये  या उसी की एक  कॉपी बनाये   और फिर स्टेट को सेट करदे उस कॉपी का उपयोग करने के लिये। 

</Intro>

<YouWillLearn>

- React में सही से ऑब्जेक्ट को कैसे अपडेट करे
- बिना बदले कैसे नेस्टेड ऑब्जेक्ट को अपडेट करे 
- इम्म्यूटेबलिटी  क्या होती है और कैसे उसे न तोड़े 
- Immer की मदद से एक जैसे ऑब्जेक्टस को बार-बार कम कैसे बनाये

</YouWillLearn>

## म्युटेशन क्या होती है ?  {/*whats-a-mutation*/}

आप स्टेट में कोई भी जावास्क्रिप्ट वैल्यू स्टोर करसकते है 

```js
const [x, setX] = useState(0);
```

अभी तक आप नंबर्स, स्ट्रिंग्स, और बूलियन के साथ काम कर रहे थे। ऐसी जावास्क्रिप्ट वैल्यूज " इम्म्यूटेबल " होती है,  मतलब जो कभी बदल न सके या " रीड-ओनली " हो। आप रीरेंदर ट्रिगर करसकते है वैल्यू को _ब्दलने_ के लिया।

```js
setX(5);
```

स्टेट `x`   `0` से  `5` तक बदली है,  लेकिन _नंबर `0` खुद_  बदला नहीं है। जावास्क्रिप्ट में ये मुमकिन नहीं है की बिल्ट-इन प्रिमिटिव वैल्यूज जैसे की नंबर्स, स्टिंग्स, और बूलियन बदल सके। 

अब विचार कीजिये एक ऑब्जेक्ट स्टेट में है:

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

तकनीकी ओर से यह मुमकिन है की _खुदी ऑब्जेक्ट_ के कंटेंट को चेंज करसके।  **यही म्युटेशन कहलाता है:**

```js
position.x = 5;
```

हलाक, जबकि React स्टेट में ऑब्जेक्ट्स तकनीकी रूप से मुटेबल होते है, आपको उनके साथ ऐसे व्यवहार करना चैयाह **जैसे वो** इम्म्यूटेबल हो नंबर्स, बूलियनस, और स्ट्रिंग्स की तरह। उनको म्यूटेट करने की बजाए, आपको हमेशा उनको ररिप्लेस करना चैयाह।  

## स्टेट का रीड-ओनली व्यवहार करना  {/*treat-state-as-read-only*/}

दुसरे शब्दों में, आपको **स्टेट में मौजूद जावास्क्रिप्ट ऑब्जेक्ट के साथ हमेशा रीड-ओनली व्यवहार करना चैयाह**

दिए गए  उदाहरण में, स्टेट में मोजूद ऑब्जेक्ट वर्तमान में  पॉइंटर का स्थान बता रहा है। मौजूद लाल बिंदु पर कर्सर टच या प्रीव्यू करने पे अपना स्थान बदलना छियाह। परन्तु बिंदु अपने स्थान पे ही रहती है:

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
        position.x = e.clientX;
        position.y = e.clientY;
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

दिकत इस दिए गए कोड में है। 

```js
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

दिया गया कोड शंशोदित करता है सोपे गए उस `स्थान` पे ऑब्जेक्ट को [पिछली रेंडर](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) से। परन्तु बिना स्टेट सेटिंग फंक्शन का उपयोग करे, React को कोई अंदाज़ा नहीं है की ऑब्जेक्ट में परिवर्तन आये है। इसलिए React कुछ जवाब नहीं देता। उद्धरण के लिए आप भोजन करने के बाद भोजन का गढ़ बदल रहे है। हालाँकि कुछ मामलो में स्टेट को म्यूटेट  करना काम करता है। परन्तु असा करना हम सुझाव नहीं देते। आपको हमेशा स्टेट में उपलब्ध वैल्यू को मौजूद रेंडर में हमेशा रीड-ओनली व्यवहार करना चैयाह।  

वास्तव में [रे-रेंडर ट्रिगर](/learn/state-as-a-snapshot#setting-state-triggers-renders) करने के लिया , **एक *नया* ऑब्जेक्ट सर्जन करे और स्टेट सेटिंग फंक्शन में पास करदे:**

```js
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

`सेट पोजीशन` के द्वारा, आप React को बता रहे है:

* `पोजीशन` को बदले नए बने ऑब्जेक्ट्स से 
* इस कॉम्पोनेन्ट को दोबारा रेंडर करे 

नोटिस करिये कैसे लाल बिंदु पालन कर रहा है पॉइंटर का जब अप्प टच या होवर करते है प्रीव्यू पर:

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

<DeepDive title="Local mutation is fine">

इस तरह का कोड एक समस्या है क्योंकि यह स्टेट में *मौजूदा* ऑब्जेक्ट को संशोधित करता है:

```js
position.x = e.clientX;
position.y = e.clientY;
```
लेकिन इस तरह का कोड *बिल्कुल ठीक* है क्योंकि आप एक ताजा ऑब्जेक् को बदल रहे हैं जिसे आपने *अभी बनाया है*:

```js
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
````

वास्तव में, यह पूरी तरह से इसे लिखने के बराबर है:

```js
setPosition({
  x: e.clientX,
  y: e.clientY
});
```

म्युटेशन  केवल एक समस्या है जब आप *मौजूदा* ऑब्जेक्ट् को बदलते हैं जो पहले से ही स्टेट  में हैं। आपके द्वारा अभी-अभी बनाई गई ऑब्जेक्ट  को बदलना ठीक है क्योंकि *अभी तक कोई अन्य कोड इसका संदर्भ नहीं देता है।* इसे बदलने से गलती से उस पर निर्भर किसी चीज़ पर प्रभाव नहीं पड़ेगा। इसे "स्थानीय उत्परिवर्तन" कहा जाता है। आप स्थानीय उत्परिवर्तन भी कर सकते हैं [प्रतिपादन करते समय](/learn/keeping-components-pure#local-mutation-your-components-little-secret) बहुत सुविधाजनक और पूरी तरह से ठीक! 

</DeepDive>  

## स्प्रेड सिंटैक्स के साथ ऑब्जेक्ट्स  की प्रतिलिपि बनाना {/*copying-objects-with-the-spread-syntax*/}

पिछले उदाहरण में, `स्थिति` ऑब्जेक्ट  हमेशा वर्तमान कर्सर स्थिति से ताजा बनाई जाती है। लेकिन अक्सर, आप अपने द्वारा बनाई जा रही नई ऑब्जेक्ट  के हिस्से के रूप में *मौजूदा* डेटा शामिल करना चाहेंगे। उदाहरण के लिए, आप किसी प्रपत्र में *केवल एक* फ़ील्ड को अपडेट करना चाह सकते हैं, लेकिन अन्य सभी फ़ील्ड के लिए पिछले मान रख सकते हैं।

ये इनपुट फ़ील्ड काम नहीं करते क्योंकि `ऑन चेंज` हैंडलर स्टेट  को बदलते हैं:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

उदाहरण के लिए, यह लाइन स्टेट  को पिछले रेंडर से बदल देती है:
```js
person.firstName = e.target.value;
```

आप जिस व्यवहार की तलाश कर रहे हैं उसे प्राप्त करने का विश्वसनीय तरीका एक नई ऑब्जेक्ट  बनाना और उसे 'सेटपर्सन' को पास करना है। लेकिन यहां, आप **मौजूदा डेटा को इसमें कॉपी करना चाहते हैं** क्योंकि केवल एक फ़ील्ड बदल गई है:

```js
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});
```

आप `...` [ऑब्जेक्ट स्प्रेड](a-javascript-refresher#object-spread) सिंटैक्स का उपयोग कर सकते हैं ताकि आपको प्रत्येक प्रॉपर्टी को अलग से कॉपी करने की आवश्यकता न पड़े।

```js
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```

अब फॉर्म काम करता है!

ध्यान दें कि आपने प्रत्येक इनपुट फ़ील्ड के लिए एक अलग स्टेट वैल्यू  घोषित नहीं किया। बड़े रूपों के लिए, सभी डेटा को किसी ऑब्जेक्ट में समूहीकृत रखना बहुत सुविधाजनक है--जब तक आप इसे सही तरीके से अपडेट करते हैं!

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

ध्यान दें कि `...` स्प्रेड सिंटैक्स "उथला" है - यह केवल चीजों को एक स्तर की गहराई तक कॉपी करता है। यह इसे तेज़ बनाता है, लेकिन इसका मतलब यह भी है कि यदि आप किसी नेस्टेड प्रॉपर्टी को अपडेट करना चाहते हैं, तो आपको इसे एक से अधिक बार उपयोग करना होगा।

<DeepDive title="Using a single event handler for multiple fields">

आप डायनामिक नाम वाली किसी प्रॉपर्टी को निर्दिष्ट करने के लिए अपनी ऑब्जेक्ट परिभाषा के अंदर `[` और `]` ब्रेसिज़ का भी उपयोग कर सकते हैं। यहां एक ही उदाहरण है, लेकिन तीन अलग-अलग लोगों के बजाय एक ही ईवेंट हैंडलर के साथ:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

यहां, `e.target.name` का मतलब `नाम` प्रॉपर्टी  है जो `<input>` DOM तत्व को दी गई है।

</DeepDive>

## नेस्टेड ऑब्जेक्ट को अपडेट करना {/*updating-a-nested-object*/}

इस तरह एक नेस्टेड ऑब्जेक्ट  संरचना पर विचार करें:

```js
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
```

यदि आप `person.artwork.city` को अपडेट करना चाहते हैं, तो यह स्पष्ट है कि इसे उत्परिवर्तन के साथ कैसे किया जाए:

```js
person.artwork.city = 'New Delhi';
```

लेकिन React  में, आप ऑब्जेक्ट  को अपरिवर्तनीय मानते हैं! `शहर` को बदलने के लिए, आपको पहले नई `कलाकृति` ऑब्जेक्ट  (पिछले एक से डेटा के साथ पूर्व-आबादी) का उत्पादन करना होगा, और फिर नई `व्यक्ति` ऑब्जेक्ट  का उत्पादन करना होगा जो नई `कलाकृति` पर इंगित करता है:

```js
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

या, एकल फ़ंक्शन कॉल के रूप में लिखा गया है:

```js
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

यह थोड़ा चिंताजनक है, लेकिन यह कई मामलों में ठीक काम करता है:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

<DeepDive title="Objects are not really nested">

इस तरह का  ऑब्जेक्ट  कोड में "नेस्टेड" दिखाई देता  है:

```js
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
```

हालांकि, "नेस्टिंग " ऑब्जेक्ट्स  के व्यवहार के बारे में सोचने का एक गलत तरीका है। जब कोड निष्पादित होता है, तो "नेस्टेड" ऑब्जेक्ट जैसी कोई चीज़ नहीं होती है। आप वास्तव में दो अलग-अलग ऑब्जेक्ट  को देख रहे हैं:

```js
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```

`obj1` ऑब्जेक्ट "अंदर" `obj2` नहीं है। उदाहरण के लिए, `obj3` `obj1` पर भी "बिंदु" कर सकता है:

```js
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1
};
```

अगर आप `obj3.artwork.city` को बदलते हैं, तो यह `obj2.artwork.city` और `obj1.city` दोनों को प्रभावित करेगा। ऐसा इसलिए है क्योंकि `obj3.artwork`, `obj2.artwork`, और `obj1` एक ही ऑब्जेक्ट  हैं। यह देखना मुश्किल है कि आप ऑब्जेक्ट्स  को "नेस्टेड" के रूप में कब सोचते हैं। इसके बजाय, वे अलग-अलग ऑब्जेक्ट  हैं जो गुणों के साथ एक दूसरे पर "इंगित" करती हैं।

</DeepDive>  

### Write concise update logic with Immer {/*write-concise-update-logic-with-immer*/}

If your state is deeply nested, you might want to consider [flattening it](/learn/choosing-the-state-structure#avoid-deeply-nested-state). But, if you don't want to change your state structure, you might prefer a shortcut to nested spreads. [Immer](https://github.com/immerjs/use-immer) is a popular library that lets you write using the convenient but mutating syntax and takes care of producing the copies for you. With Immer, the code you write looks like you are "breaking the rules" and mutating an object:

```js
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

But unlike a regular mutation, it doesn't overwrite the past state!

<DeepDive title="How does Immer work?">

The `draft` provided by Immer is a special type of object, called a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), that "records" what you do with it. This is why you can mutate it freely as much as you like! Under the hood, Immer figures out which parts of the `draft` have been changed, and produces a completely new object that contains your edits.

</DeepDive>

To try Immer:

1. Add `use-immer` to your `package.json` as a dependency
2. Run `npm install`
3. Then replace `import { useState } from 'react'` with `import { useImmer } from 'use-immer'`

Here is the above example converted to Immer:

<Sandpack>

```js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
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

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

Notice how much more concise the event handlers have become. You can mix and match `useState` and `useImmer` in a single component as much as you like. Immer is a great way to keep the update handlers concise, especially if there's nesting in your state, and copying objects leads to repetitive code.

<DeepDive title="Why is mutating state not recommended in React?">

There are a few reasons:

* **Debugging:** If you use `console.log` and don't mutate state, your past logs won't get clobbered by the more recent state changes. So you can clearly see how state has changed between renders.
* **Optimizations:** Common React [optimization strategies](/learn/skipping-unchanged-trees) rely on skipping work if previous props or state are the same as the next ones. If you never mutate state, it is very fast to check whether there were any changes. If `prevObj === obj`, you can be sure that nothing could have changed inside of it.
* **New Features:** The new React features we're building rely on state being [treated like a snapshot](/learn/state-as-a-snapshot). If you're mutating past versions of state, that may prevent you from using the new features.
* **Requirement Changes:** Some application features, like implementing Undo/Redo, showing a history of changes, or letting the user reset a form to earlier values, are easier to do when nothing is mutated. This is because you can keep past copies of state in memory, and reuse them when appropriate. If you start with a mutative approach, features like this can be difficult to add later on.
* **Simpler Implementation:** Because React does not rely on mutation, it does not need to do anything special with your objects. It does not need to hijack their properties, always wrap them into Proxies, or do other work at initialization as many "reactive" solutions do. This is also why React lets you put any object into state--no matter how large--without additional performance or correctness pitfalls.

In practice, you can often "get away" with mutating state in React, but we strongly advise you not to do that so that you can use new React features developed with this approach in mind. Future contributors and perhaps even your future self will thank you!

</DeepDive>

<Recap>

* Treat all state in React as immutable.
* When you store objects in state, mutating them will not trigger renders and will change the state in previous render "snapshots."
* Instead of mutating an object, create a *new* version of it, and trigger a re-render by setting state to it.
* You can use the `{...obj, something: 'newValue'}` object spread syntax to create copies of objects.
* Spread syntax is shallow: it only copies one level deep.
* To update a nested object, you need to create copies all the way up from the place you're updating.
* To reduce repetitive copying code, use Immer.

</Recap>



<Challenges>

### Fix incorrect state updates {/*fix-incorrect-state-updates*/}

This form has a few bugs. Click the button that increases the score a few times. Notice that it does not increase. Then edit the first name, and notice that the score has suddenly "caught up" with your changes. Finally, edit the last name, and notice that the score has disappeared completely.

Your task is to fix all of these bugs. As you fix them, explain why each of them happens.

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    player.score++;
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 10px; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

<Solution>

Here is a version with both bugs fixed:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    setPlayer({
      ...player,
      score: player.score + 1,
    });
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      ...player,
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

The problem with `handlePlusClick` was that it mutated the `player` object. As a result, React did not know that there's a reason to re-render, and did not update the score on the screen. This is why, when you edited the first name, the state got updated, triggering a re-render which _also_ updated the score on the screen.

The problem with `handleLastNameChange` was that it did not copy the existing `...player` fields into the new object. This is why the score got lost after you edited the last name.

</Solution>

### Find and fix the mutation {/*find-and-fix-the-mutation*/}

There is a draggable box on a static background. You can change the box's color using the select input.

But there is a bug. If you move the box first, and then change its color, the background (which isn't supposed to move!) will "jump" to the box position. But this should not happen: the `Background`'s `position` prop is set to `initialPosition`, which is `{ x: 0, y: 0 }`. Why is the background moving after the color change?

Find the bug and fix it.

<Hint>

If something unexpected changes, there is a mutation. Find the mutation in `App.js` and fix it.

</Hint>

<Sandpack>

```js App.js
import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

</Sandpack>

<Solution>

The problem was in the mutation inside `handleMove`. It mutated `shape.position`, but that's the same object that `initialPosition` points at. This is why both the shape and the background move. (It's a mutation, so the change doesn't reflect on the screen until an unrelated update--the color change--triggers a re-render.)

The fix is to remove the mutation from `handleMove`, and use the spread syntax to copy the shape. Note that `+=` is a mutation, so you need to rewrite it to use a regular `+` operation.

<Sandpack>

```js App.js
import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    setShape({
      ...shape,
      position: {
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      }
    });
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

</Sandpack>

</Solution>

### Update an object with Immer {/*update-an-object-with-immer*/}

This is the same buggy example as in the previous challenge. This time, fix the mutation by using Immer. For your convenience, `useImmer` is already imported, so you need to change the `shape` state variable to use it.

<Sandpack>

```js App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
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

<Solution>

This is the solution rewritten with Immer. Notice how the event handlers are written in a mutating fashion, but the bug does not occur. This is because under the hood, Immer never mutates the existing objects.

<Sandpack>

```js App.js
import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, updateShape] = useImmer({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    updateShape(draft => {
      draft.position.x += dx;
      draft.position.y += dy;
    });
  }

  function handleColorChange(e) {
    updateShape(draft => {
      draft.color = e.target.value;
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
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

</Solution>

</Challenges>

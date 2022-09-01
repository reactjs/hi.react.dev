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

### Immer के साथ संक्षिप्त अद्यतन तर्क लिखें {/*write-concise-update-logic-with-immer*/}


यदि आपका स्टेट  गहरा नेस्टेड  है, तो आप [इसे समतल करना](/learn/choosing-the-state-structure#avoid-deeply-nested-state) पर विचार करना चाहेंगे। लेकिन, यदि आप अपनी स्टेट  संरचना को बदलना नहीं चाहते हैं, तो आप नेस्टेड स्प्रेड के लिए एक शॉर्टकट पसंद कर सकते हैं। [इमर](https://github.com/immerjs/use-immer) एक लोकप्रिय लाइब्रेरी  है जो आपको सुविधाजनक लेकिन परिवर्तनशील सिंटैक्स का उपयोग करके लिखने देता है और आपके लिए प्रतियां तैयार करने का ख्याल रखता है। Immer के साथ, आपके द्वारा लिखा गया कोड ऐसा लगता है जैसे आप "नियम तोड़ रहे हैं" और किसी वस्तु को बदल रहे हैं:

```js
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

लेकिन एक नियमित उत्परिवर्तन के विपरीत, यह पिछली स्थिति को अधिलेखित नहीं करता है!

<DeepDive title="How does Immer work?">

Immer द्वारा प्रदान किया गया `ड्राफ़्ट` एक विशेष प्रकार की ऑब्जेक्ट  है, जिसे [प्रॉक्सी](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) कहा जाता है, जो "रिकॉर्ड करता है" "आप इसके साथ क्या करते हैं। यही कारण है कि आप इसे जितना चाहें उतना स्वतंत्र रूप से बदल सकते हैं! हुड के तहत, Immer यह पता लगाता है कि `ड्राफ़्ट` के किन हिस्सों को बदल दिया गया है, और एक पूरी तरह से नया ऑब्जेक्ट तैयार करता है जिसमें आपके संपादन शामिल हैं।
</DeepDive>

इमर को आजमाने के लिए:

1. डिपेंडेंसी  के रूप में अपने `package.json` में `use-immer` जोड़ें
2. रन `एनपीएम इंस्टॉल
3. फिर `import {useState} को 'react' से बदलकर `import {useImmer} से 'use-immer'` से बदलें

यहाँ उदाहरण Immer में परिवर्तित किया गया है:

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

ध्यान दें कि ईवेंट हैंडलर कितने अधिक संक्षिप्त हो गए हैं। आप जितना चाहें उतना एक ही कॉम्पोनेन्ट  में `useState` और `useImmer` को मिला सकते हैं। इमर अपडेट हैंडलर को संक्षिप्त रखने का एक शानदार तरीका है, खासकर यदि आपके स्टेट  में नेस्टिंग  है, और ऑब्जेक्ट  की प्रतिलिपि बनाने से दोहराव कोड होता है।

<DeepDive title="Why is mutating state not recommended in React?">

कुछ कारण हैं:

* **डिबगिंग:** यदि आप `console.log` का उपयोग करते हैं और स्टेट  को परिवर्तित नहीं करते हैं, तो आपके पिछले लॉग हाल के स्टेट  परिवर्तनों से प्रभावित नहीं होंगे। तो आप स्पष्ट रूप से देख सकते हैं कि रेंडरर्स के बीच सताते  कैसे बदल गया है।
* **ऑप्टिमिजाशंस:** कॉमन रिएक्ट [ऑप्टिमाइज़ेशन स्ट्रेटेजी](/learn/skipping-unchanged-trees) लंघन कार्य पर भरोसा करते हैं यदि पिछले प्रॉप्स या स्टेट अगले वाले के समान हैं। यदि आप कभी भी स्टेट  को उत्परिवर्तित नहीं करते हैं, तो यह जांचना बहुत तेज़ है कि क्या कोई परिवर्तन हुआ है। यदि `prevObj === obj` है, तो आप सुनिश्चित हो सकते हैं कि इसके अंदर कुछ भी नहीं बदला होगा।
* **नए विशेषताएँ:** हम जो नई रिएक्ट सुविधाएँ बना रहे हैं, वे राज्य के [स्नैपशॉट की तरह व्यवहार](/learn/state-as-a-snapshot) पर निर्भर हैं। यदि आप राज्य के पिछले संस्करणों को बदल रहे हैं, तो यह आपको नई सुविधाओं का उपयोग करने से रोक सकता है।
* **आवश्यकता परिवर्तन:** कुछ एप्लिकेशन सुविधाएं, जैसे पूर्ववत करें/फिर से करें को लागू करना, परिवर्तनों का इतिहास दिखाना, या उपयोगकर्ता को किसी फ़ॉर्म को पहले के मानों पर रीसेट करने देना, तब करना आसान होता है जब कुछ भी उत्परिवर्तित नहीं होता है। ऐसा इसलिए है क्योंकि आप स्टेट  की पिछली प्रतियों को स्मृति में रख सकते हैं, और उपयुक्त होने पर उनका पुन: उपयोग कर सकते हैं। यदि आप एक परिवर्तनशील दृष्टिकोण से शुरू करते हैं, तो इस तरह की सुविधाओं को बाद में जोड़ना मुश्किल हो सकता है।
* **सरल कार्यान्वयन:** क्योंकि React  म्यूटेशन पर निर्भर नहीं है, इसलिए इसे आपकी वस्तुओं के साथ कुछ खास करने की आवश्यकता नहीं है। इसे अपनी संपत्तियों को हाईजैक करने की आवश्यकता नहीं है, हमेशा उन्हें प्रॉक्सी में लपेटें, या प्रारंभ में अन्य कार्य करें जैसा कि कई "प्रतिक्रियाशील" समाधान करते हैं। यही कारण है कि React  आपको किसी भी वस्तु को राज्य में रखने देता है - चाहे वह कितना भी बड़ा हो - बिना अतिरिक्त प्रदर्शन या शुद्धता के नुकसान के।

व्यवहार में, आप अक्सर React  में उत्परिवर्तित अवस्था के साथ "दूर हो सकते हैं", लेकिन हम आपको दृढ़ता से सलाह देते हैं कि आप ऐसा न करें ताकि आप इस दृष्टिकोण को ध्यान में रखते हुए विकसित नई React  सुविधाओं का उपयोग कर सकें। भविष्य के योगदानकर्ता और शायद आपका भविष्य स्वयं भी आपको धन्यवाद देगा!
</DeepDive>

<Recap>

* Recat में सभी स्टेट  को अपरिवर्तनीय मानें।
* जब आप ऑब्जेक्ट  को स्टेट  में संग्रहीत करते हैं, तो उन्हें उत्परिवर्तित करने से रेंडर ट्रिगर नहीं होंगे और पिछले रेंडर "स्नैपशॉट्स" में स्थिति बदल जाएगी।
* किसी ऑब्जेक्ट को बदलने के बजाय, उसका एक *नया* संस्करण बनाएं, और उस पर स्थिति सेट करके एक री-रेंडर को ट्रिगर करें।
* आप ऑब्जेक्ट  की प्रतियां बनाने के लिए `{...obj, कुछ: 'newValue'}` ऑब्जेक्ट स्प्रेड सिंटैक्स का उपयोग कर सकते हैं।
* स्प्रेड सिंटैक्स उथला है: यह केवल एक स्तर को गहराई से कॉपी करता है।
* नेस्टेड ऑब्जेक्ट को अपडेट करने के लिए, आपको उस जगह से ऊपर तक कॉपी बनानी होगी, जहां आप अपडेट कर रहे हैं।
* दोहराए जाने वाले प्रतिलिपि कोड को कम करने के लिए, Immer का उपयोग करें।

</Recap>



<Challenges>

### गलत स्थिति अपडेट को ठीक करें {/*fix-incorrect-state-updates*/}

इस फॉर्म में कुछ बग हैं। उस बटन पर क्लिक करें जो स्कोर को कुछ गुना बढ़ा देता है। ध्यान दें कि यह नहीं बढ़ता है। फिर पहले नाम को संपादित करें, और ध्यान दें कि आपके परिवर्तनों के साथ स्कोर अचानक "पकड़ गया" है। अंत में, अंतिम नाम संपादित करें, और ध्यान दें कि स्कोर पूरी तरह से गायब हो गया है।

आपका काम इन सभी बगों को ठीक करना है। जैसे ही आप उन्हें ठीक करते हैं, समझाएं कि उनमें से प्रत्येक क्यों होता है।

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

यहाँ एक संस्करण है जिसमें दोनों बग फिक्स हैं:

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

`हैंडलप्लसक्लिक` के साथ समस्या यह थी कि इसने `प्लेयर` ऑब्जेक्ट को बदल दिया। नतीजतन, रिएक्ट को यह नहीं पता था कि फिर से रेरेन्दर  करने का एक कारण है, और स्क्रीन पर स्कोर को अपडेट नहीं किया। यही कारण है कि, जब आपने पहले नाम को संपादित किया, तो राज्य अपडेट हो गया, एक री-रेंडर को ट्रिगर किया जिसने स्क्रीन पर स्कोर को अपडेट किया।


`हैंडललास्टनाम चेंज` के साथ समस्या यह थी कि इसने मौजूदा `...प्लेयर` फ़ील्ड को नए ऑब्जेक्ट में कॉपी नहीं किया। यही कारण है कि आपके द्वारा अंतिम नाम संपादित करने के बाद स्कोर खो गया है।

</Solution>

### उत्परिवर्तन खोजें और ठीक करें {/*find-and-fix-the-mutation*/}

स्टैटिक बैकग्राउंड पर ड्रैग करने योग्य बॉक्स होता है। आप चुनिंदा इनपुट का उपयोग करके बॉक्स का रंग बदल सकते हैं।

लेकिन एक बग है। यदि आप पहले बॉक्स को घुमाते हैं, और फिर उसका रंग बदलते हैं, तो बैकग्राउंड (जिसे हिलना नहीं चाहिए!) बॉक्स की स्थिति में "कूद" जाएगा। लेकिन ऐसा नहीं होना चाहिए: 'बैकग्राउंड' का 'पोजिशन' प्रोप 'आरंभिक स्थिति' पर सेट है, जो कि '{x: 0, y: 0}' है। रंग बदलने के बाद बैकग्राउंड क्यों हिल रहा है?

बग ढूंढें और इसे ठीक करें।

<Hint>

यदि कुछ अनपेक्षित परिवर्तन होता है, तो एक म्युटेशन  होता है। `App.js` में उत्परिवर्तन खोजें और इसे ठीक करें।

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

समस्या `हैंडलमोव` के अंदर उत्परिवर्तन में थी। इसने `shape.position` को बदल दिया, लेकिन यह वही ऑब्जेक्ट  है जिस पर `initialPosition` इंगित करता है। यही कारण है कि आकार और बैकग्राउंड  दोनों चलते हैं। (यह एक उत्परिवर्तन है, इसलिए परिवर्तन एक असंबंधित अद्यतन तक स्क्रीन पर प्रतिबिंबित नहीं होता है - रंग परिवर्तन - एक पुन: प्रस्तुत करना ट्रिगर करता है।)

फिक्स म्यूटेशन को `हैंडलमोव` से हटाना है, और आकृति को कॉपी करने के लिए स्प्रेड सिंटैक्स का उपयोग करना है। ध्यान दें कि `+=` एक उत्परिवर्तन है, इसलिए आपको नियमित `+` ऑपरेशन का उपयोग करने के लिए इसे फिर से लिखना होगा।

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

### Immer के साथ किसी ऑब्जेक्ट को अपडेट करें {/*update-an-object-with-immer*/}

पिछली चुनौती की तरह यह वही buggy  उदाहरण है। इस बार, इमर का उपयोग करके उत्परिवर्तन को ठीक करें। आपकी सुविधा के लिए, `useImmer` पहले से ही आयात किया जा चुका है, इसलिए इसका उपयोग करने के लिए आपको `आकार` स्थिति चर को बदलना होगा।

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

यह इमर के साथ फिर से लिखा गया समाधान है। ध्यान दें कि कैसे ईवेंट हैंडलर एक परिवर्तनशील तरीके से लिखे जाते हैं, लेकिन बग नहीं होता है। ऐसा इसलिए है क्योंकि हुड के निचे , इमर मौजूदा ऑब्जेक्ट्स  को कभी भी उत्परिवर्तित नहीं करता है।

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

---
title: स्टेट में ऑब्जेक्ट्स को अपडेट करना
---

<Intro>

स्टेट ऑब्जेक्ट समेत कोई भी जावास्क्रिप्ट वैल्यू स्टोर कर सकती है। लेकिन आपको कभी भी  ऑब्जेक्ट्स को बदलना नहीं चाहिए जो आप React स्टेट में रखते हैं। उसके बजाए आपको जब भी  ऑब्जेक्ट को अपडेट करना हो या तो आप  एक नया ऑब्जेक्ट बनाये  (या उसी की एक कॉपी बनाये) और फिर उस कॉपी का उपयोग करने के लिये स्टेट को सेट कर दें। 

</Intro>

<YouWillLearn>

- React में सही से ऑब्जेक्ट को कैसे अपडेट करे
- बिना बदले कैसे नेस्टेड ऑब्जेक्ट को अपडेट करे 
- इम्म्यूटेबलिटी  क्या होती है और कैसे उसे ब्रेक ना करें 
- Immer की मदद से बार-बार ऑब्जेक्टस की कॉपी बनाने को कम कैसे करें

</YouWillLearn>

## म्युटेशन क्या होता है? {/*whats-a-mutation*/}

आप स्टेट में कोई भी जावास्क्रिप्ट वैल्यू स्टोर करसकते है 

```js
const [x, setX] = useState(0);
```

अभी तक आप नंबर्स, स्ट्रिंग्स, और बूलियन के साथ काम कर रहे थे। ऐसी जावास्क्रिप्ट वैल्यूज "इम्म्यूटेबल" होती है,  मतलब जो कभी बदल न सके या "रीड-ओनली" हो। वैल्यू को _ब्दलने_ के लिए आप री-रेंडर ट्रिगर करसकते है।

```js
setX(5);
```

स्टेट `x`   `0` से  `5` तक बदली है,  लेकिन _नंबर `0` खुद_  बदला नहीं है। जावास्क्रिप्ट में ये मुमकिन नहीं है की बिल्ट-इन प्रिमिटिव वैल्यूज जैसे की नंबर्स, स्टिंग्स, और बूलियन बदल सके। 

अब विचार कीजिये एक ऑब्जेक्ट स्टेट में है:

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

तकनीकी ओर से यह मुमकिन है की _खुदी ऑब्जेक्ट_ के कंटेंट को चेंज कर सकते हैं। **यही म्युटेशन कहलाता है:**

```js
position.x = 5;
```

हलाक, जबकि React स्टेट में ऑब्जेक्ट्स तकनीकी रूप से मुटेबल होते है, आपको उनके साथ ऐसे व्यवहार करना चैयाह **जैसे वो** इम्म्यूटेबल हो--नंबर्स, बूलियनस, और स्ट्रिंग्स की तरह। उनको म्यूटेट करने की बजाए, आपको हमेशा उनको रीप्लेस करना चाहिए।  

## स्टेट का रीड-ओनली मानें {/*treat-state-as-read-only*/}

दुसरे शब्दों में, आपको **स्टेट में मौजूद जावास्क्रिप्ट ऑब्जेक्ट को हमेशा रीड-ओनली मानना चाहिए**

दिए गए  उदाहरण में, स्टेट में मोजूद ऑब्जेक्ट करंट पॉइंटर की पोजीशन बता रहा है। मौजूद लाल बिंदु पर कर्सर टच या प्रीव्यू करने पे अपना स्थान बदलना चाहिए। परन्तु बिंदु अपने स्थान पे ही रहता है:

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

ये कोड [पिछले रेंडर](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) से `position` को एसाइन्ड ऑब्जेक्ट को बदलता है। परन्तु बिना स्टेट सेटिंग फंक्शन का उपयोग करे, React को कोई अंदाज़ा नहीं है की ऑब्जेक्ट में परिवर्तन आये है। इसलिए React कुछ नहीं करता उसके जवाब में। उद्धरण के लिए आप भोजन करने के बाद भोजन का आर्डर बदल रहे है। हालाँकि कुछ मामलो में स्टेट को म्यूटेट करना काम करता, परन्तु हम ऐसा करने का हम सुझाव नहीं देते। आपको हमेशा स्टेट में उपलब्ध वैल्यू को मौजूद रेंडर में हमेशा रीड-ओनली व्यवहार करना चैयाह।  

वास्तव में [री-रेंडर ट्रिगर](/learn/state-as-a-snapshot#setting-state-triggers-renders) करने के लिया , **एक *नया* ऑब्जेक्ट बनाये करे और स्टेट सेटिंग फंक्शन में पास करदे:**

```js
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

`setPosition` के द्वारा, आप React को बता रहे है:

* `position` को बदलें नए बने ऑब्जेक्ट्स से 
* इस कॉम्पोनेन्ट को दोबारा रेंडर करे 

नोटिस करिये कैसे लाल बिंदु पालन कर रहा है पॉइंटर का जब आप टच या होवर करते है प्रीव्यू पर:

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

<DeepDive>

#### Local mutation is fine {/*local-mutation-is-fine*/}

इस तरह का कोड एक समस्या है क्योंकि यह स्टेट में *मौजूदा* ऑब्जेक्ट को बदलता है:

```js
position.x = e.clientX;
position.y = e.clientY;
```

 लेकिन इस तरह का कोड *बिल्कुल ठीक* है क्योंकि आप एक ताज़े ऑब्जेक् को बदल रहे हैं जिसे आपने *अभी बनाया है*:

```js
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

वास्तव में, यह पूरी तरह से इसे लिखने के बराबर है:

```js
setPosition({
  x: e.clientX,
  y: e.clientY
});
```

म्युटेशन  केवल एक समस्या है जब आप *मौजूदा* ऑब्जेक्ट् को बदलते हैं जो पहले से ही स्टेट  में हैं। आपके द्वारा अभी-अभी बनाये गए ऑब्जेक्ट को बदलना ठीक है क्योंकि *अभी तक कोई अन्य कोड इसको रिफरेन्स नहीं करता।* इसे बदलने से गलती से उस पर निर्भर किसी चीज़ पर प्रभाव नहीं पड़ेगा। इसे "लोकल म्युटेशन" कहा जाता है। आप स्थानीय उत्परिवर्तन भी कर सकते हैं [प्रतिपादन करते समय](/learn/keeping-components-pure#local-mutation-your-components-little-secret) बहुत सुविधाजनक और पूरी तरह से ठीक! 

</DeepDive>  

## स्प्रेड सिंटैक्स के साथ ऑब्जेक्ट्स की कॉपी बनाना {/*copying-objects-with-the-spread-syntax*/}

पिछले उदाहरण में, `position` ऑब्जेक्ट  हमेशा वर्तमान कर्सर के स्थान से ताजा बनाया जाता है। लेकिन अक्सर, आप अपने द्वारा बनाये जा रहे नए ऑब्जेक्ट के हिस्से के रूप में *मौजूदा* डेटा शामिल करना चाहेंगे। उदाहरण के लिए, आप किसी फॉर्म में *केवल एक* फ़ील्ड को अपडेट करना चाह सकते हैं, लेकिन अन्य सभी फ़ील्ड के लिए पिछली वैल्यूज रख सकते हैं।

ये इनपुट फ़ील्ड काम नहीं करते क्योंकि `onChange` हैंडलर स्टेट  को बदलते हैं:

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


उदाहरण के लिए, यह लाइन स्टेट को पिछले रेंडर से बदल देती है:
```js
person.firstName = e.target.value;
```

आप जिस व्यवहार की तलाश कर रहे हैं उसे प्राप्त करने का विश्वसनीय तरीका एक नया ऑब्जेक्ट  बनाना और उसे `setPerson` को पास करना है। लेकिन यहां, आप **मौजूदा डेटा को इसमें कॉपी करना चाहते हैं** क्योंकि केवल एक फ़ील्ड बदला है:

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

अब फॉर्म काम कर रहा!

ध्यान दें कि आपने प्रत्येक इनपुट फ़ील्ड के लिए एक अलग स्टेट वैल्यू डिक्लेअर नहीं किया। बड़े फॉर्म्स के लिए, सभी डेटा को किसी ऑब्जेक्ट में एक साथ ग्रुप में रखना बहुत सुविधाजनक है--जब तक आप इसे सही तरीके से अपडेट करते हैं!

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

ध्यान दें कि `...` स्प्रेड सिंटैक्स "shallow" है - यह केवल चीजों को एक लेवल की गहराई तक कॉपी करता है। यह इसे तेज़ बनाता है, लेकिन इसका मतलब यह भी है कि यदि आप किसी नेस्टेड प्रॉपर्टी को अपडेट करना चाहते हैं, तो आपको इसे एक से अधिक बार उपयोग करना होगा।

<DeepDive>

#### Using a single event handler for multiple fields {/*using-a-single-event-handler-for-multiple-fields*/}

आप डायनामिक नाम वाली किसी प्रॉपर्टी को निर्दिष्ट करने के लिए अपने ऑब्जेक्ट डेफिनिशन के अंदर `[` और `]` ब्रेसिज़ का भी उपयोग कर सकते हैं। यहां एक ही उदाहरण है, लेकिन तीन अलग-अलग लोगों के बजाय एक ही ईवेंट हैंडलर के साथ:

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

यहां, `e.target.name` का मतलब `name` प्रॉपर्टी  है जो `<input>` DOM एलिमेंट को दी गई है।

</DeepDive>

## नेस्टेड ऑब्जेक्ट को अपडेट करना {/*updating-a-nested-object*/}

इस तरह एक नेस्टेड ऑब्जेक्ट स्ट्रक्चर पर विचार करें:

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

यदि आप `person.artwork.city` को अपडेट करना चाहते हैं, तो यह स्पष्ट है कि इसे म्युटेशन के साथ कैसे किया जाए:

```js
person.artwork.city = 'New Delhi';
```

लेकिन React  में, आप ऑब्जेक्ट  को अपरिवर्तनीय मानते हैं! `city` को बदलने के लिए, आपको पहले नई  `artwork` ऑब्जेक्ट  (पिछले वाले से प्री-पॉपुलटेड डेटा के साथ) का उत्पादन करना होगा, और फिर नई  `person` ऑब्जेक्ट  का उत्पादन करना होगा जो नई   `artwork` पर पॉइंट करता है:

```js
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

या, एक ही फ़ंक्शन कॉल के रूप में लिखा गया है:

```js
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

यह थोड़ा ज़्यादा वर्ड्स वाला हो जाता है, लेकिन यह ज़्यादातर ठीक काम करता है:

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

<DeepDive>

#### Objects are not really nested {/*objects-are-not-really-nested*/}

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

हालांकि, "नेस्टिंग" ऑब्जेक्ट्स  के व्यवहार के बारे में सोचने का एक गलत तरीका है। जब कोड एक्ज़िक्युट होता है, तो "नेस्टेड" ऑब्जेक्ट जैसी कोई चीज़ नहीं होती है। आप वास्तव में दो अलग-अलग ऑब्जेक्ट  को देख रहे हैं:

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

`obj1` ऑब्जेक्ट `obj2` के  "अंदर" नहीं है। उदाहरण के लिए, `obj3` `obj1` पर भी "पॉइंट" कर सकता है:

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

अगर आप `obj3.artwork.city` को बदलते हैं, तो यह `obj2.artwork.city` और `obj1.city` दोनों को प्रभावित करेगा। ऐसा इसलिए है क्योंकि `obj3.artwork`, `obj2.artwork`, और `obj1` एक ही ऑब्जेक्ट  हैं। जब आप ऑब्जेक्ट्स को "नेस्टेड" रुट में सोचते है तो यह देखना मुश्किल होता है। इसके बजाय, वे अलग-अलग ऑब्जेक्ट  हैं जो प्रॉपर्टीज के साथ एक दूसरे पर "पॉइंट" करती हैं।

</DeepDive>  

### Immer के साथ संक्षिप्त अपडेट लॉजिक लिखें {/*write-concise-update-logic-with-immer*/}

यदि आपका स्टेट ज़्यादा नेस्टेड  है, तो आप [इसे फ्लाय्टन करने](/learn/choosing-the-state-structure#avoid-deeply-nested-state) पर विचार करना चाहेंगे। लेकिन, यदि आप अपनी स्टेट स्ट्रक्चर को बदलना नहीं चाहते हैं, तो आप नेस्टेड स्प्रेड के लिए एक शॉर्टकट पसंद कर सकते हैं। [Immer](https://github.com/immerjs/use-immer) एक लोकप्रिय लाइब्रेरी  है जो आपको सुविधाजनक लेकिन मुटेटिंग सिंटैक्स का उपयोग करके लिखने देता है और आपके लिए कॉपीस बनाने का ख्याल रखता है। Immer के साथ, आपके द्वारा लिखा गया कोड ऐसा लगता है जैसे आप "नियम तोड़ रहे हैं" और किसी ऑब्जेक्ट को मुटेट कर रहे हैं:

```js
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

लेकिन एक रेगुलर म्युटेशन के विपरीत, यह पिछले स्टेट को ओवरराईट नहीं करता है!

<DeepDive>

#### How does Immer work? {/*how-does-immer-work*/}

Immer द्वारा प्रदान किया गया `ड्राफ़्ट` एक विशेष प्रकार का ऑब्जेक्ट  है, जिसे [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) कहा जाता है, जो आप इसके साथ क्या करते हैं उसे "रिकॉर्ड करता है"। यही कारण है कि आप इसे जितना चाहें उतना स्वतंत्र रूप से बदल सकते हैं! हुड के तहत, Immer यह पता लगाता है कि `ड्राफ़्ट` के किन हिस्सों को बदल दिया गया है, और एक पूरी तरह से नया ऑब्जेक्ट तैयार करता है जिसमें आपके बदलाव शामिल हैं।

</DeepDive>

इमर को आजमाने के लिए:

1. डिपेंडेंसी  के रूप में अपने `package.json` में `use-immer` ऐड करें
2. `npm install` रन करें
3. फिर `import {useState} from 'react'` से बदलकर `import {useImmer} from 'use-immer'` से बदलें

यहाँ ऊपर दिया गया उदाहरण Immer में परिवर्तित किया गया है:

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

ध्यान दें कि ईवेंट हैंडलर कितने अधिक संक्षिप्त हो गए हैं। आप जितना चाहें उतना एक ही  कौम्पोनॅन्ट  में `useState` और `useImmer` को मिला सकते हैं। Immer अपडेट हैंडलर को संक्षिप्त रखने का यह एक शानदार तरीका है, खासकर यदि आपके स्टेट  में नेस्टिंग  है, और ऑब्जेक्ट  की कॉपी बनाने से रिपीट कोड होता है।

<DeepDive>

#### Why is mutating state not recommended in React? {/*why-is-mutating-state-not-recommended-in-react*/}

कुछ कारण हैं:

* **डिबगिंग:** यदि आप `console.log` का उपयोग करते हैं और स्टेट को परिवर्तित नहीं करते हैं, तो आपके पिछले लॉग नए स्टेट परिवर्तनों से प्रभावित नहीं होंगे। तो आप स्पष्ट रूप से देख सकते हैं कि रेंडरर्स के बीच स्टेट कैसे बदल गया है।
* **ऑप्टिमिजाशंस:** कॉमन React [ऑप्टिमाइज़ेशन स्ट्रेटेजी](/learn/skipping-unchanged-trees) काम छोड़ने पर भरोसा करते हैं यदि पिछले प्रॉप्स या स्टेट अगले वाले के समान हैं। यदि आप कभी भी स्टेट  को उत्परिवर्तित नहीं करते हैं, यह बहुत तेज़ी में जांचा जा सकता है कि क्या कोई परिवर्तन हुआ है। यदि `prevObj === obj` है, तो आप सुनिश्चित हो सकते हैं कि इसके अंदर कुछ भी नहीं बदला होगा।
* **नए फीचर्स:** हम जो नए React फीचर्स बना रहे हैं, वे इसपर निर्भर करता है की स्टेट को [स्नैपशॉट की तरह समझा जाये](/learn/state-as-a-snapshot)। यदि आप स्टेट के पिछले संस्करणों को बदल रहे हैं, तो यह आपको नए फीचर्स का उपयोग करने से रोक सकता है।
* **आवश्यकता परिवर्तन:** कुछ एप्लिकेशन फीचर्स, जैसे Undo/Redo, परिवर्तनों की हिस्ट्री दिखाना, या यूज़र्स को किसी फ़ॉर्म को के पहले की वैल्यूज पर रीसेट करने देना, तब करना आसान होता है जब कुछ भी म्यूटेट नहीं होता है। ऐसा इसलिए है क्योंकि आप स्टेट  की पिछली कॉपीस को मेमोरी में रख सकते हैं, और उपयुक्त होने पर उनका पुन: उपयोग कर सकते हैं। यदि आप एक म्यूटेटिव अप्रोच से शुरू करते हैं, तो इस तरह के फीचर्स को बाद में ऐड करना मुश्किल हो सकता है।
* **सरल इम्प्लीमेंटेशन:** क्योंकि React म्यूटेशन पर निर्भर नहीं है, इसलिए इसे आपकी ऑब्जेक्ट्स के साथ कुछ खास करने की आवश्यकता नहीं है। इसे अपनी प्रॉपर्टीज को हाईजैक करने की आवश्यकता नहीं है, हमेशा उन्हें Proxies में लपेटें, या प्रारंभ में अन्य कार्य करें जैसा कि कई "रिएक्टिव" समाधान करते हैं। यही कारण है कि React आपको किसी भी ऑब्जेक्ट को स्टेट में रखने देता है - चाहे वह कितना भी बड़ा हो - बिना अतिरिक्त परफॉरमेंस या करेक्टनेस के नुकसान के।

व्यवहार में, आप अक्सर React  में म्यूटेटिंग स्टेट के साथ "काम चला सकते हैं", लेकिन हम आपको दृढ़ता से सलाह देते हैं कि आप ऐसा न करें ताकि आप इस अप्रोच को ध्यान में रखते हुए बनाये गए नए React  फीचर्स का उपयोग कर सकें। भविष्य के कॉंट्रिब्युटर्स और शायद आप खुद भी भविष्य अपने आपको धन्यवाद देंगे!

</DeepDive>

<Recap>

* React में सभी स्टेट को अपरिवर्तनीय मानें।
* जब आप ऑब्जेक्ट को स्टेट में स्टोर करते हैं, तो उन्हें म्यूटेट करने से रेंडर ट्रिगर नहीं होंगे और पिछले रेंडर "स्नैपशॉट्स" में स्थिति बदल जाएगी।
* किसी ऑब्जेक्ट को बदलने के बजाय, उसका एक *नया* वर्शन बनाएं, और उस पर स्टेट को सेट करके एक री-रेंडर को ट्रिगर करें।
* आप ऑब्जेक्ट की कॉपीस बनाने के लिए ऑब्जेक्ट स्प्रेड सिंटैक्स `{...obj, something: 'newValue'}` का उपयोग कर सकते हैं।
* स्प्रेड सिंटैक्स शैलो है: यह केवल एक लेवल तक की गहराई से कॉपी करता है।
* नेस्टेड ऑब्जेक्ट को अपडेट करने के लिए, आपको उस जगह से ऊपर तक कॉपी बनानी होगी, जहां आप अपडेट कर रहे हैं।
* रिपीट होने वाले कोड को कम करने के लिए, Immer का उपयोग करें।

</Recap>



<Challenges>

#### गलत स्टेट अपडेट को ठीक करना {/*fix-incorrect-state-updates*/}

इस फॉर्म में कुछ बग हैं। उस बटन पर क्लिक करें जो स्कोर को कुछ गुना बढ़ा देता है। ध्यान दें कि यह नहीं बढ़ता है। फिर पहले नाम को एडिट करें, और ध्यान दें कि आपके परिवर्तनों के साथ स्कोर अचानक "आपके बदलाव के अनुसार सही हो गया" है। अंत में, अंतिम नाम एडिट करें, और ध्यान दें कि स्कोर पूरी तरह से गायब हो गया है।

आपका काम इन सभी बगों को ठीक करना है। जैसे-जैसे आप उन्हें ठीक करते हैं, यह समझाएं कि उनमें से प्रत्येक क्यों होते हैं।

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

यहाँ एक वर्शन है जिसमें दोनों बग फिक्स हैं:

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

`handlePlusClick` के साथ समस्या यह थी कि इसने `player` ऑब्जेक्ट को बदल दिया। जिसकी वजह से, React को यह नहीं पता था कि फिर से री-रेंडर करने का एक कारण है, और स्क्रीन पर स्कोर को अपडेट नहीं किया। यही कारण है कि, जब आपने पहले नाम को एडिट किया, तो स्टेट अपडेट हो गया, एक री-रेंडर को _भी_ ट्रिगर किया जिसने स्क्रीन पर स्कोर को अपडेट किया।

`handleLastNameChange` के साथ समस्या यह थी कि इसने मौजूदा `...player` फ़ील्ड को नए ऑब्जेक्ट में कॉपी नहीं किया। यही कारण है कि आपके द्वारा अंतिम नाम एडिट करने के बाद स्कोर गायब हो गया।

</Solution>

#### म्यूटेशन ढूंढे और ठीक करें {/*find-and-fix-the-mutation*/}

स्टैटिक बैकग्राउंड पर ड्रैग करने योग्य बॉक्स होता है। आप चुनिंदा इनपुट का उपयोग करके बॉक्स का रंग बदल सकते हैं।

लेकिन एक बग है। यदि आप पहले बॉक्स को घुमाते हैं, और फिर उसका रंग बदलते हैं, तो बैकग्राउंड (जिसे हिलना नहीं चाहिए!) बॉक्स की जगह पर "कूद" जाएगा। लेकिन ऐसा नहीं होना चाहिए: `Background` का `position` prop `initialPosition` पर सेट है, जो कि `{ x: 0, y: 0 }` है। रंग बदलने के बाद बैकग्राउंड क्यों हिल रहा है?

बग ढूंढें और इसे ठीक करें।

<Hint>

यदि कुछ अनएक्सपेक्टेड बदलता होता है, तो एक म्युटेशन होता है।`App.js` में म्यूटेशन ढूंढे और उसे ठीक करें।

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

समस्या `handleMove` के अंदर म्यूटेशन में थी। इसने `shape.position` को बदल दिया, लेकिन यह वही ऑब्जेक्ट  है जिस पर `initialPosition` पॉइंट करता है। यही कारण है कि शेप और बैकग्राउंड दोनों मूव होते हैं। (यह एक म्यूटेशन है, इसलिए परिवर्तन एक अनरिलेटेड अपडेट तक स्क्रीन पर रिफ्लेक्ट नहीं होता है--रंग परिवर्तन--एक री-रेंडर करना ट्रिगर करता है।)

इसका फिक्स म्यूटेशन को `handleMove` से हटाना है, और shape को कॉपी करने के लिए स्प्रेड सिंटैक्स का उपयोग करना है। ध्यान दें कि `+=` एक म्यूटेशन है, इसलिए आपको नियमित `+` ऑपरेशन का उपयोग करने के लिए इसे फिर से लिखना होगा।

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

#### Immer के साथ किसी ऑब्जेक्ट को अपडेट करें {/*update-an-object-with-immer*/}

पिछले चैलेंज की तरह यह वही buggy उदाहरण है। इस बार, Immer का उपयोग करके म्यूटेशन को ठीक करें। आपकी सुविधा के लिए, `useImmer` पहले से ही इम्पोर्ट किया जा चुका है, इसलिए इसका उपयोग करने के लिए आपको `shape` स्टेट वेरिएबल को बदलना होगा।

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

यह Immer के साथ फिर से लिखा गया समाधान है। ध्यान दें कि कैसे ईवेंट हैंडलर एक म्यूटेटिंग तरीके से लिखे जाते हैं, लेकिन बग नहीं आता है। ऐसा इसलिए है क्योंकि हुड के निचे , Immer मौजूदा ऑब्जेक्ट्स  को कभी भी म्यूटेट नहीं करता है।

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

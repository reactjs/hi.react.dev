---
title: "State: एक कौम्पोनॅन्ट की मेमोरी"
---

<Intro>

कोई भी इंटरेक्शन होने की वजह स कौम्पोनॅन्ट को अक्सर स्क्रीन पर क्या दिख रहा है उसको बदलना होता है। फॉर्म में टाइप करने पर इनपुट फील्ड अपडेट होने चाहिए, इमेज करौसेल के "next" को क्लिक करने पर करौसेल की इमेज बदलनी चाहिए, "buy" पर क्लिक करने पर एक प्रोडक्ट शॉपिंग कार्ट में ऐड होना चाहिए। कौम्पोनॅन्ट को चीजों को "याद रखना" चाहिए: इनपुट की अभी की वैल्यू, अभी की इमेज, शॉपिंग कार्ट। React में, इस प्रकार की कौम्पोनॅन्ट-स्पेसिफिक मेमोरी को *State* कहा जाता है।

</Intro>

<YouWillLearn>

* state वेरिएबल को [`useState`](/apis/usestate) Hook के साथ कैसे ऐड करें
* `useState` Hook कोनसे वैल्यूज की पेअर को रिटर्न करता है 
* एक से अधिक स्टेट वेरिएबल कैसे ऐड करें
* state को लोकल क्यों कहा जाता है

</YouWillLearn>

## जब एक सामान्य वेरिएबल पर्याप्त नहीं है {/*when-a-regular-variable-isnt-enough*/}

यहाँ एक कौम्पोनॅन्ट है जो एक स्कल्पचर इमेज प्रस्तुत करता है। "Next" बटन पर क्लिक करने से `इंडेक्स` को `1`, फिर `2`, और इसी तरह बदलकर अगली स्कल्पचर इमेज दिखाई देनी चाहिए। हालांकि, यह **काम नहीं करेगा** (आप इसे आज़मा सकते हैं!):

<Sandpack>

```js
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

`handleClick()` event handler एक लोकल वैरिएबल, `इंडेक्स` को अपडेट कर रहा है। लेकिन दो चीजें उस बदलाव को दिखने से रोकती हैं

1. **लोकल वैरिएबल रेंडरर्स के बीच बने नहीं रहते हैं** जब React इस कौम्पोनॅन्ट को दूसरी बार रेंडर करता है, यह इसे नए सिरे से रेंडर करता है—यह लोकल वैरिएबल में किसी भी परिवर्तन पर विचार नहीं करता है।
2. **लोकल वैरिएबल में बदलाव करने से रेंडर ट्रिगर नहीं होंगे.** React को एहसास नहीं होता है कि उसे नए डेटा के साथ कौम्पोनॅन्ट को फिर से रेंडर करने की आवश्यकता है।

किसी कौम्पोनॅन्ट को नए डेटा से अपडेट करने के लिए, दो चीज़ें होनी चाहिए:

1. रेंडरर्स के बीच डेटा को **बनाए रखें**।
2. कौम्पोनॅन्ट को नए डेटा (री-रेंडरिंग) के साथ रेंडर करने के लिए React को **ट्रिगर करे**।

यह दोनों चीज़े [`useState`](/apis/usestate) हुक की सहायता से की जा सकती है::

1. एक **state वैरिएबल** रेंडरर्स के बीच डेटा को बनाए रखे।
2. एक **state setter फंक्शन** वैरिएबल अपडेट करने के लिए और कौम्पोनॅन्ट को फिर से रेंडर करने के लिए React को ट्रिगर करें।

## एक state वैरिएबल ऐड करना {/*adding-a-state-variable*/}

एक state वैरिएबल ऐड करने के लिए, फाइल से सबसे ऊपर useState को React से इम्पोर्ट करें:

```js
import { useState } from 'react';
```

फिर, इस लाइन को बदलें:

```js
let index = 0;
```

इस लाइन के साथ

```js
const [index, setIndex] = useState(0);
````

`index` एक state वैरिएबल है और `setIndex` एक सेटर फ़ंक्शन है।

> यहाँ पर  `[` और `]` सिंटेक्स को [ऐरे डेस्ट्रक्टरिंग](/learn/a-javascript-refresher#array-destructuring) कहा जाता हे और यह आपको array की वैल्यू पढ़ने देता है। `useState` द्वारा रिटर्न किये गए array हमेशा दो आइटम्स होते है। 

इस तरह वे `handleClick()` में एक साथ काम करते हैं :

```js
function handleClick() {
  setIndex(index + 1);
}
```

अब "Next" बटन पर क्लिक करने से करंट स्कल्पचर बदल जाती है:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
 margin-top: 5px;
 font-weight: normal;
 font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

### अपने पहले हुक से मिलें {/*meet-your-first-hook*/}

React में, `useState`, या "`use`," से शुरू होने वाला कोई अन्य फ़ंक्शन को हुक कहा जाता है।

*हुक* विशेष फ़ंक्शन हैं जो केवल React के [रेंडरिंग](/learn/render-and-commit#step-1-trigger-a-render) (जिसके बारे में और डिटेल में हम अगले पेज पर जानेंगे)  के दौरान उपलब्ध हैं। वे आपको विभिन्न React फीचर्स में "हुक इन" करने देते हैं।

State उन फीचर्स में से एक है, लेकिन आप दूसरे हुक से बाद में मिलेंगे।

<Gotcha>

**`use` से शुरू होने वाले हुक फ़ंक्शंस केवल कौम्पोनॅन्टस के ऊपरी लेवल या [आपके अपने हुक](/learn/reusing-logic-with-custom-hooks) से कॉल हो सकते हे।** आप हुक को कंडीशंस, लूप्स, या अन्य नेस्टेड फ़ंक्शंस के अंदर कॉल नहीं कर सकते। हुक फ़ंक्शंस हैं, लेकिन उनको आपके कौम्पोनॅन्टस की जरूरतों के बारे में बिना शर्त डेक्लेरेशंस के जैसे समझिये। जिस प्रकार से आप अपनी फाइल की शुरुआत में मॉडल्स "इम्पोर्ट" करते है, उसी प्रकार से आप React के फीचर्स का उपयोग फाइल के शुरुवात में कर सकते है।  

</Gotcha>

### `useState` का विश्लेषण{/*anatomy-of-usestate*/}

जब आप [`useState`](/apis/usestate) को कॉल करते हैं, आप React को बता रहे हैं कि आप चाहते हैं कि यह कौम्पोनॅन्ट कुछ याद रखे:

```js
const [index, setIndex] = useState(0);
```

इस मामले में, आप चाहते हैं कि React `index` को याद रखे। 

> कन्वेंशनल तरीके से आप इस पेअर को ऐसे लिखेंगे : `const [something, setSomething]`। वैसे तो आप जो चाहे वो नाम इसे दे सकते हे, लेकिन पारंपरिक तरीके से लिखने पर, आपका कोड बाकि लोगो को भी आसानी से समझ आता है। 

useState` केवल एक ही आर्गुमेंट लेता है और वह है **इनिशियल वैल्यू** आपके state वेरिएबल का। इस उदाहरण में, `index` की इनिशियल वैल्यू है `0` क्युकी `useState(0)` लिखा गया है। 

जब भी आपका कौम्पोनॅन्ट रेंडर होता है, `useState` आपको एक array देता है जिसमें दो वैल्यूज होते हैं:

1. **state वेरिएबल** (`index`) आपके द्वारा स्टोर की गयी वैल्यू के साथ।
2. **state सेटर फंक्शन** (`setIndex`) जो state वेरिएबल की वैल्यू बदल सकता है और कौम्पोनॅन्ट को फिर से रेंडर करने के लिए React को ट्रिगर कर सकता है।

देखिये यह कैसे होता है :

```js
const [index, setIndex] = useState(0);
```

1. **आपका कौम्पोनॅन्ट पहली बार रेंडर होता है।** क्युकी आपने `useState` को `0` वैल्यू `index` की इनिशियल वैल्यू के तौर पर दी थीं, वह `[0, setIndex]` रिटर्न करेगा। React `0` को नई state वैल्यू के तौर पर याद रखेगा। 
2. **आप state को अपडेट करें।** जब कोई यूजर, बटन पर क्लिक करता है, यह `setIndex(index + 1)` को कॉल करता है। `index` अभी `0` है, तो `setIndex(1)` हो जायेगा। यह React को याद रखने के लिए कहता है कि `index` अब `1` है और एक और रेंडर ट्रिगर करता है।
3. **आपके कौम्पोनॅन्ट का दूसरा रेंडर.** React अभी भी देखता है `useState(0)`, लेकिन क्योंकि React को *याद है* की आपने `index` को `1` सेट किया था , वह `[1, setIndex]` रिटर्न करता है। 
4. और इसी तरह आगे भी होता रहता है!

## एक कौम्पोनॅन्ट को कई state वेरिएबल देना {/*giving-a-component-multiple-state-variables*/}

आपके पास एक कौम्पोनॅन्ट में जितने चाहें उतने प्रकार के state वेरिएबल हो सकते हैं। इस कौम्पोनॅन्ट में दो state वेरिएबल हैं, एक number `index` और एक boolean `showMore` जिसकी वैल्यू तब बदलती है जब आप "Show details" को क्लिक करते है : 

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
 margin-top: 5px;
 font-weight: normal;
 font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

यदि state वेरिएबल्स रिलेटेड नहीं है, तो कई state वेरिएबल होना एक अच्छा विचार है, जैसे इस उदाहरण में `index` और `showMore`। लेकिन अगर आप पाते हैं कि आप अक्सर दो state वेरिएबल एक साथ बदलते हैं तो उन्हें एक में करना बेहतर हो सकता है। उदाहरण के लिए, यदि आपके पास कई फ़ील्ड्स के साथ एक फॉर्म है, तो हर फील्ड के लिए अलग state वेरिएबल रखने से बेहतर होगा की आप एक state वेरिएबल रखे जो एक ऑब्जेक्ट है। [State स्ट्रक्चर चुनना](/learn/choosing-the-state-structure) में इसके बारे में और टिप्स है।

<DeepDive title="How does React know which state to return?">

आपने देखा होगा कि `useState` कॉल को स्टेट वेरिएबल के बारे में कोई जानकारी नहीं मिलती है। कोई "आइडेंटिफायर" नहीं है जो `useState` को पास किया जाता है, तो उसे कैसे पता चलता है कि किस state वेरिएबल को वापस करना है? क्या यह आपके फ़ंक्शन को पार्स करने जैसे किसी जादू पर निर्भर करता है? इसका जवाब है नहीं। 

इसके बजाय, उनके संक्षिप्त सिंटैक्स को सक्षम करने के लिए, Hooks ** एक ही कौम्पोनॅन्ट के प्रत्येक रेंडर पर स्थिर कॉल ऑर्डर पर भरोसा करते है।** अगर आप ऊपर दिए गए नियम का पालन करते हैं ("हुक को केवल टॉप लेवल पर करें"), तो यह अक्सर अच्छा काम करता है, Hooks को हमेशा उसी क्रम में बुलाया जाएगा। और, एक [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) बाकी की ज़्यादातर गलतियाँ पकड़ता है।

आंतरिक रूप से, React प्रत्येक कौम्पोनॅन्ट के लिए state एक पेअर का एक array रखता है। यह अभी के पेअर के इंडेक्स को भी बनाए रखता है, जो रेंडर करने से पहले `0` पर सेट है। हर बार जब आप `useState` कॉल करते हैं , React आपको अगला स्टेट पेअर देता है और इंडेक्स को इन्क्रीमेंट करता है। आप इसके के बारे में अधिक [React Hooks: Not Magic, Just Arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e) में पढ़ सकते हैं।

यह उदाहरण **React का उपयोग नहीं करता है**, लेकिन यह आपको समझाता है कि `useState` आंतरिक रूप से कैसे काम करता है:

<Sandpack>

```js index.js active
let componentHooks = [];
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++;
    return pair;
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = [initialState, setState];

  function setState(nextState) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair[0] = nextState;
    updateDOM();
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // Each useState() call will get the next pair.
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // This example doesn't use React, so
  // return an output object instead of JSX.
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? 'Hide' : 'Show'} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt
  };
}

function updateDOM() {
  // Reset the current Hook index
  // before rendering the component.
  currentHookIndex = 0;
  let output = Gallery();

  // Update the DOM to match the output.
  // This is the part React does for you.
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}

let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description = document.getElementById('description');
let image = document.getElementById('image');
let sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];

// Make UI match the initial state.
updateDOM();
```

```html public/index.html
<button id="nextButton">
  Next
</button>
<h3 id="header"></h3>
<button id="moreButton"></button>
<p id="description"></p>
<img id="image">

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
button { display: block; margin-bottom: 10px; }
</style>
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

React का उपयोग करने के लिए आपको इसे समझने की आवश्यकता नहीं है, लेकिन आपको यह उपयोगी साबित हो सकता है।

</DeepDive>

## State अलग और प्राइवेट है {/*state-is-isolated-and-private*/}

State स्क्रीन पर दिखने वाले कॉम्पोनेन्ट के इंस्टैंस के लिए लोकल है। दूसरे शब्दों में, **यदि आप एक ही कौम्पोनॅन्ट को दो बार रेंडर करते हैं, तो हर कॉपी में पूरी तरह से अलग state होगा!** उनमें से एक को बदलने से दूसरे पर कोई प्रभाव नहीं पड़ेगा।

इस उदाहरण में, पहले के `Gallery` कौम्पोनॅन्ट को इसके लॉजिक में बिना किसी बदलाव के दो बार रेंडर किया गया है। प्रत्येक Gallery के अंदर बटन क्लिक करने का प्रयास करें। ध्यान दें कि उनका state एक दूसरे से अलग है:

<Sandpack>

```js
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}

```

```js Gallery.js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </section>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

आप स्टेट वेरिएबल्स को अपने मॉड्यूल के शीर्ष पर घोषित कर सकते हैं, यही बात स्टेट वेरिएबल को आम वेरिएबल से विपरीत करती है। State किसी विशेष फ़ंक्शन कॉल या कोड में स्थान से बंधा नहीं है, किंतु यह स्क्रीन पर स्पेसिफिक स्थान पर "लोकल" है। आपने दो `<Gallery />` कौम्पोनॅन्ट को रेंडर किया, इसलिए उनका state अलग से स्टोर किया जाता है।

यह भी देखें कि कैसे `Page` कौम्पोनॅन्ट `Gallery` के state के बारे में कुछ भी नहीं "जानता", उसे तोह यह भी नहीं पता की `Gallery` कौम्पोनॅन्ट के पास कोई state है। props के विपरीत, **state इसे घोषित करने वाले कौम्पोनॅन्ट के लिए पूरी तरह से प्राइवेट है**। पैरेंट कौम्पोनॅन्ट state को बदल नहीं सकता है। इससे आप किसी भी कौम्पोनॅन्ट में state ऐड कर सकते हैं या बाकी कौम्पोनॅन्ट को प्रभावित किए बिना उसे हटा सकते हैं।

यदि आप चाहें कि दोनों galleries अपने state सिंक में रखें तो? React में इसे करने का सही तरीका यह है कि चाइल्ड कौम्पोनॅन्ट से state *निकालें* और इसे दोनों के निकटतम शेयर्ड पैरेंट कौम्पोनॅन्ट में ऐड करें। अगले कुछ पेजेज़ एक कौम्पोनॅन्ट के state को ओर्गनइजे करने पर ध्यान केंद्रित करेंगे, लेकिन हम इस विषय पर [कई कौम्पोनॅन्ट के बीच state शेयर करना](/learn/sharing-state-between-components) में वापस आएंगे।

<Recap>

* जब किसी कौम्पोनॅन्ट को रेंडरर्स के बीच कुछ जानकारी "याद" रखने की आवश्यकता हो, तो state वेरिएबल का उपयोग करें।
* स्टेट वेरिएबल को `useState` हुक कॉलकर कर डिक्लेअर किया जाता है।
* हुक विशेष फंक्शन हैं जो `use` से शुरू होते हैं। वे आपको state जैसी React के फीचर्स को "हुक इन" करने देते हैं।
* हुक आपको इम्पोर्ट्स की याद दिला सकते हैं: उन्हें बिना किसी कंडीशन के बुलाया जाना चाहिए। हुक्स को बुलाना, जिसमें `useState` शामिल है, केवल एक कौम्पोनॅन्ट या किसी अन्य हुक के शीर्ष स्तर पर करना सही है।
* `useState` हुक वैल्यूज की एक जोड़ी देता है: अभी का state और इसे अपडेट करने के लिए फंक्शन।
* आपके पास एक से अधिक state वेरिएबल हो सकते हैं। आंतरिक रूप से, React उनके क्रम से उनको मैच करता है।
* State कौम्पोनॅन्ट के लिए प्राइवेट है। यदि आप इसे दो स्थानों पर रेंडर करते हैं, तो हर कॉपी को अपना state मिलता है।
  
</Recap>



<Challenges>

### Gallery कम्पलीट करें /*complete-the-gallery*/}

जब आप अंतिम स्कल्पचर पर "Next" बटन दबाते हैं, तो कोड क्रैश हो जाता है। इस क्रैश को रोकने के लिए लॉजिक को ठीक करें। आप ईवेंट हैंडलर में एक्स्ट्रा लॉजिक ऐड कर के ऐसा कर सकते हैं या एक्शन पॉसिबल न होने पर बटन को डिसएबल करके।

इस क्रैश को ठीक करने के बाद, एक "Previous" बटन ऐड करें जो पिछली मूर्तिकला दिखाता है। यह पहले स्कल्पचर पर क्रैश नहीं होना चाहिए।

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
```

</Sandpack>

<Solution>
यह दोनों ईवेंट हैंडलर के अंदर एक गार्डिंग कंडीशन ऐड करता है और जरूरत पड़ने पर बटन को डिसएबल कर देता है:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button
        onClick={handlePrevClick}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        onClick={handleNextClick}
        disabled={!hasNext}
      >
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js data.js hidden
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
```

</Sandpack>

ध्यान दें कि कैसे लौटाए गए JSX और ईवेंट हैंडलर, *दोनों* के अंदर, `hasPrev` और `hasNext` का उपयोग किया जाता है! यह आसान पैटर्न काम करता है क्योंकि ईवेंट हैंडलर रेंडर करते समय डिक्लेअर किसी भी वेरिएबल के लिए ["close over"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) कार्य करता है।

</Solution>

### अटके हुए फॉर्म इनपुट को ठीक करें {/*fix-stuck-form-inputs*/}

जब आप इनपुट फ़ील्ड में टाइप करते हैं, तो कुछ भी नहीं दीखता है। यह ऐसा है जैसे इनपुट वैल्यूज खाली strings के साथ "अटक" गए हैं। पहले `<input>` का `वैल्यू` हमेशा `firstName` वेरिएबल से मैच होने के लिए सेट है, और दूसरे `<input>` का `वैल्यू` हमेशा `lastName` वेरिएबल से मैच होने के लिए सेट है। यह सही है। दोनों इनपुट में `onChange` event handler हैं, जो यूज़र के नये इनपुट (`e.target.value`) के आधार पर वेरिएबलो को अपडेट करने का प्रयास करते हैं। हालांकि, वेरिएबल री-रेंडर के बीच अपने वैल्यूज को "याद" नहीं कर पाता। इसके बजाय state वेरिएबल का उपयोग करके इसे ठीक करें।

<Sandpack>

```js
export default function Form() {
  let firstName = '';
  let lastName = '';

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = '';
    lastName = '';
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css 
h1 { margin-top: 10px; }
```

</Sandpack>

<Solution>

सबसे पहले, React से `useState` इम्पोर्ट करें। फिर `useState` की मदद से `firstName` और `lastName` को state वेरिएबल्स बदलें। आख़िरकार, प्रत्येक `firstName = ...` असाइनमेंट को `setFirstName(...)` से बदलें, और `lastName` के लिए भी ऐसा ही करें। `handleReset` को भी अपडेट करना न भूलें ताकि रीसेट बटन काम करे।

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName('');
    setLastName('');
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css 
h1 { margin-top: 10px; }
```

</Sandpack>

</Solution>

### क्रैश ठीक करें {/*fix-a-crash*/}

यहां एक छोटा फॉर्म है जो उपयोगकर्ता को प्रतिपुष्टि देने देता है। प्रतिपुष्टि प्रदान करने पर, उसने एक धन्यवाद सन्देश प्रदर्शित करना अपेक्षित है। हालांकि, यह एक त्रुटि संदेश कह कर क्रैश हो जाता है "Rendered fewer hooks than expected"। क्या आप गलती का पता लगा सकते हैं और उसे ठीक कर सकते हैं?

<Hint>

हुक को _कहाँ_ (किस जगह) बुलाने पर क्या कोई पाबंदी है? क्या यह कौम्पोनॅन्ट कोई नियम तोड़ रहा है?

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    const [message, setMessage] = useState('');
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
```

</Sandpack>

<Solution>

हुक को केवल कौम्पोनॅन्ट फ़ंक्शन के शीर्ष स्तर पर बुलाया जा सकता है। यहाँ, पहली `isSent` परिभाषा इस नियम का पालन करती है, लेकिन `message` परिभाषा एक condition के भीतर है (nested within a condition)। समस्या को ठीक करने के लिए इसे condition से बाहर ले जाएं:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
```

</Sandpack>

याद रखें, हुक को बिना शर्त (unconditionally) और हमेशा उसी क्रम में बुलाया जाना चाहिए!

आप नेस्टिंग को कम करने के लिए अनावश्यक `else` शाखा को भी हटा सकते हैं। हालांकि, यह अभी भी महत्वपूर्ण है कि Hooks के सभी कॉल्स `return` से *पहले* हो। 

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Thank you!</h1>;
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert(`Sending: "${message}"`);
      setIsSent(true);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
```

</Sandpack>

ध्यान दें कि कैसे अगर आपने दूसरे `useState` कॉल को `if` के बाद स्थानांतरित करने का प्रयास किया तो यह काम नहीं करेगा। 

सामान्य तौर पर, इस प्रकार की गलतियों को पकड़ा जाता है [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) linter rule के द्वारा।. यदि आप अपने मशीन पर कोड करते वक्त यह error नहीं देखते हैं तो आपको इसे अपने बिल्ड टूलिंग कॉन्फ़िगरेशन (build tooling conifiguration) में सेट अप करने की आवश्यकता है।

</Solution>

### अनावश्यक State हटाएं {/*remove-unnecessary-state*/}

इस उदाहरण में, जब बटन क्लिक किया जाता है तो उपयोगकर्ता का नाम पूछना चाहिए और फिर उन्हें अभिवादन करते हुए एक अलर्ट प्रदर्शित करना चाहिए। आपने नाम रखने के लिए state का उपयोग करने की कोशिश की, लेकिन किसी कारण से यह हमेशा "Hello, !" दिखाता है।

इस कोड को ठीक करने के लिए, अनावश्यक state वेरिएबल को हटा दें। (हम इस बारे में [यह काम क्यों नहीं करता](/learn/troubleshooting-state-updates#setting-state-does-not-update-variables) बाद में चर्चा करेंगे। )

क्या आप बता सकते हैं कि यह state वेरिएबल अनावश्यक क्यों था?

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('');

  function handleClick() {
    setName(prompt('What is your name?'));
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
```

</Sandpack>

<Solution>

यहां एक निश्चित संस्करण है जो उस फ़ंक्शन में घोषित एक नियमित `name` वेरिएबल का उपयोग करता है जिसे इसकी आवश्यकता होती है:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  function handleClick() {
    const name = prompt('What is your name?');
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
```

</Sandpack>

एक state वेरिएबल केवल एक कौम्पोनॅन्ट के री-रेंडर करने के बीच जानकारी रखने के लिए आवश्यक है। एकल event handler के भीतर, एक सामान्य वेरिएबल ठीक रहेगा। जब एक सामान्य वेरिएबल अच्छी तरह से काम करता है, तो state वेरिएबल की कोई आवश्यकता नहीं है।

</Solution>

</Challenges>

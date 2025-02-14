---
title: स्टेट में ऐरेज़ को अपडेट करना
---

<Intro>

JavaScript में ऐरे म्युटेबल होती हैं, लेकिन जब आप उन्हें स्टेट में स्टोर करते हैं तो आपको उन्हें इम्म्युटेबल मानना ​​चाहिए. ऑब्जेक्ट्स की तरह ही, जब आप स्टेट में स्टोर्ड किसी ऐरे को अपडेट करना चाहते हैं, तो आपको एक नई ऐरे बनानी होगी (या किसी मौजूदा ऐरे की कॉपी बनानी होगी), और फिर नए ऐरे का उपयोग करने के लिए स्टेट सेट करना होगा।

</Intro>

<YouWillLearn>

- React स्टेट में किसी ऐरे में आइटम कैसे जोड़ें, हटाएं या बदलें
- किसी ऐरे के अंदर किसी ऑब्जेक्ट को कैसे अपडेट करें
- Immer के साथ ऐरे कॉपी करने का काम कम दोहराव वाला कैसे बनाएं

</YouWillLearn>

## बिना म्युटेशन के ऐरेज़ को अपडेट करना {/*updating-arrays-without-mutation*/}

JavaScript में ऐरेज़ एक अन्य प्रकार के ऑब्जेक्ट्स ही हैं। [ऑब्जेक्ट्स की तरह ही](/learn/updating-objects-in-state), **आपको React स्टेट में ऐरेज़ को read-only ही मानना ​​चाहिए।** इसका अर्थ यह है कि आपको `arr[0] = 'bird'` की तरह ऐरे के अंदर आइटम को पुनः असाइन नहीं करना चाहिए, और आपको `push()` और `pop()` जैसे मेथड्स का भी उपयोग नहीं करना चाहिए जो ऐरे को म्युटेट करते हैं।

इसके बजाय, हर बार जब आप एक ऐरे को अपडेट करना चाहते हैं, तो आप अपने स्टेट सेटिंग फ़ंक्शन में एक *नई* ऐरे पास करना चाहेंगे। ऐसा करने के लिए, आप अपनी स्टेट में मूल ऐरे से एक नई ऐरे बना सकते हैं, जैसे कि `filter()` और `map()` जैसे नॉन-म्युटेटिंग मेथड्स को कॉल करके। फिर आप अपनी स्टेट को परिणामी नई ऐरे में सेट कर सकते हैं।

यहाँ सामान्य ऐरे ऑपरेशन्स की एक संदर्भ तालिका है। React स्टेट के अंदर ऐरेज़ के साथ काम करते समय, आपको बाएं कॉलम में लिखे मेथड्स से बचने की आवश्यकता होगी, और इसके बजाय दांए कॉलम में लिखे मेथड्स को पसंद करें:

|           | बचें (एरे को म्युटेट करता है)           | चुनें (एक नई ऐरे रिटर्न करता है)                                      |
| --------- | ----------------------------------- | ------------------------------------------------------------------- |
| ऐड करना    | `push`, `unshift`                   | `concat`, `[...arr]` spread syntax ([उदाहरण](#adding-to-an-array)) |
| रिमूव करना | `pop`, `shift`, `splice`            | `filter`, `slice` ([उदाहरण](#removing-from-an-array))              |
| रिप्लेस करना | `splice`, `arr[i] = ...` assignment | `map` ([उदाहरण](#replacing-items-in-an-array))                     |
| सॉर्ट करना | `reverse`, `sort`                   |ऐरे को पहले कॉपी करें ([उदाहरण](#making-other-changes-to-an-array)) |

वैकल्पिक रूप से, आप [Immer का उपयोग कर सकते हैं](#write-concise-update-logic-with-immer) जो आपको दोनों कॉलम से मेथड्स का उपयोग करने देता है।

<Pitfall>

दुर्भाग्य से, [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) और [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) समान रूप से नामित हैं लेकिन बहुत अलग हैं:

* `slice` आपको एक ऐरे या उसके एक हिस्से को कॉपी करने देता है।
* `splice` ऐरे को **म्युटेट** कर देता है (आइटम्स को इन्सर्ट या डिलीट करने के लिए)।

React में, आप `slice` (कोई समस्या नहीं!) का उपयोग बहुत अधिक बार करेंगे क्योंकि आप स्टेट में ऑब्जेक्ट्स या ऐरेज़ को म्युटेट नहीं करना चाहते हैं। [Updating Objects](/learn/updating-objects-in-state) बताता है कि म्यूटेशन क्या है और स्टेट के लिए अनुशंसित क्यों नहीं है।

</Pitfall>

### ऐरे में ऐड करना {/*adding-to-an-array*/}

`push()` एक ऐरे को म्युटेट करेगा, जो आप नहीं चाहते हैं:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        artists.push({
          id: nextId++,
          name: name,
        });
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

इसके बजाय, एक *नई*  ऐरे बनाएं जिसमें मौजूदा आइटम्स *और* अंत में एक नया आइटम शामिल है। ऐसा करने के कई तरीके हैं, लेकिन सबसे आसान है `...`  [ऐरे स्प्रेड](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals) सिंटैक्स का उपयोग करना:

```js
setArtists( // Replace the state
  [ // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name } // and one new item at the end
  ]
);
```

अब यह सही तरीके से काम करता है:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

ऐरे स्प्रेड सिंटैक्स आपको किसी आइटम को मूल `... artists` से *पहले* स्थापित करके उसको प्रीपेंड भी करने देता है:

```js
setArtists([
  { id: nextId++, name: name },
  ...artists // Put old items at the end
]);
```

इस प्रकार, स्प्रेड एक ऐरे के अंत में जुड़कर `push()` और एक ऐरे की शुरुआत में जुड़कर `unshift()` दोनों का काम कर सकता है। इसे ऊपर सैंडबॉक्स में आज़माएं!

### ऐरे से रिमूव करना {/*removing-from-an-array*/}

एक ऐरे से किसी आइटम को हटाने का सबसे आसान तरीका है *इसे फ़िल्टर करना*। दूसरे शब्दों में, आप एक नई ऐरे का उत्पादन करेंगे जिसमें उस आइटम की उपस्तिथि नहीं होगी। ऐसा करने के लिए, `filter` मेथड का उपयोग करें, उदाहरण के लिए:

<Sandpack>

```js
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

कुछ बार "Delete" बटन पर क्लिक करें, और इसके क्लिक हैंडलर को देखें।

```js
setArtists(
  artists.filter(a => a.id !== artist.id)
);
```

यहाँ, `artists.filter(a => a.id !== artist.id)` का अर्थ है "एक ऐरे बनाएं जिसमें वे `artists` शामिल हैं जिनकी IDs `artist.id` से अलग हैं।" दूसरे शब्दों में, प्रत्येक artist का "Delete" बटन _उस_ artist को ऐरे से फ़िल्टर करेगा, और फिर परिणामी ऐरे के साथ फिर से रेंडर का अनुरोध करेगा। ध्यान दें कि `filter` मूल ऐरे को संशोधित नहीं करता है।

### ऐरे को ट्रांसफॉर्म करना {/*transforming-an-array*/}

यदि आप ऐरे के कुछ या सभी आइटम्स को बदलना चाहते हैं, तो आप एक **नई** ऐरे बनाने के लिए `map()` का उपयोग कर सकते हैं। जिस फ़ंक्शन को आप `map` में भेजेंगे, वह तय कर सकता है कि प्रत्येक आइटम के साथ क्या करना है, उसके डेटा या उसके इंडेक्स (या दोनों) के आधार पर।

इस उदाहरण में, एक ऐरे दो हलकों और एक वर्ग के निर्देशांक रखती है। जब आप बटन दबाते हैं, तो यह 50 पिक्सेल द्वारा केवल हलकों को स्थानांतरित करता है। यह `map()` का उपयोग करके डेटा की एक नई ऐरे का निर्माण करके ऐसा करता है:

<Sandpack>

```js
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // No change
        return shape;
      } else {
        // Return a new circle 50px below
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Re-render with the new array
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        Move circles down!
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}
```

```css
body { height: 300px; }
```

</Sandpack>

### ऐरे में आइटम्स को रिप्लेस करना {/*replacing-items-in-an-array*/}

एक ऐरे में एक या अधिक आइटम्स को बदलने के लिए सोचना विशेष रूप से आम बात है. `arr[0] = 'bird'` जैसे असाइनमेंट मूल ऐरे को म्युटेट कर देते हैं, इसलिए इसके बजाय आप इसके लिए भी ` map` का उपयोग करना चाहेंगे।

किसी आइटम को रिप्लेस करने के लिए `map` का उपयोग करके एक नई ऐरे बनाएं। अपनी `map` कॉल के अंदर, आप दूसरे आर्ग्युमेंट के रूप में आइटम इंडेक्स प्राप्त करेंगे। इसका उपयोग यह तय करने के लिए करें कि क्या आप मूल आइटम (पहला आर्ग्युमेंट) रिटर्न  करना चाहते हैं या कुछ और:

<Sandpack>

```js
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

### ऐरे में इन्सर्ट करना {/*inserting-into-an-array*/}

कभी-कभी, आप एक विशेष पोज़िशन में एक आइटम को इन्सर्ट करना चाह सकते हैं जो न तो शुरुआत में है और न ही अंत में। ऐसा करने के लिए, आप `...` ऐरे स्प्रेड सिंटैक्स का उपयोग `slice()` मेथड के साथ कर सकते हैं। `slice()` मेथड आपको ऐरे के "टुकड़े" को काटने देता है। किसी आइटम को इन्सर्ट करने के लिए, आप एक ऐरे बनाएंगे जो इंसर्शन पॉइंट से _पहले_ के स्लाइस को स्प्रेड करती है, फिर नया आइटम, और फिर मूल ऐरे के बाकी हिस्से को स्प्रेड करती है।

इस उदाहरण में, Insert बटन हमेशा इंडेक्स `1` पर इन्सर्ट करता है:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

### एक ऐरे में अन्य बदलाव करना {/*making-other-changes-to-an-array*/}

कुछ चीजें हैं जो आप अकेले स्प्रेड सिंटैक्स और नॉन-म्युटेटिंग मेथड्स जैसे `map()` और `filter()` से नहीं कर सकते हैं। उदाहरण के लिए, आप एक ऐरे को रिवर्स या सॉर्ट करना चाह सकते हैं। JavaScript के `reverse()` और `sort()` मूल ऐरे को म्युटेट कर रहे हैं, इसलिए आप उन्हें सीधे उपयोग नहीं कर सकते।

**हालाँकि, आप पहले ऐरे को कॉपी कर सकते हैं, और फिर इसमें बदलाव कर सकते हैं।**

उदाहरण के लिए:

<Sandpack>

```js
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

यहां, आप पहले मूल ऐरे की एक कॉपी बनाने के लिए `[...list]` स्प्रेड सिंटैक्स का उपयोग करें। अब जब आपके पास एक कॉपी है, तो आप `nextList.reverse()` या `nextList.sort()` जैसे म्युटेटिंग मेथड्स का उपयोग कर सकते हैं, या यहां तक ​​कि `nextList[0] = "something"` का उपयोग करके व्यक्तिगत आइटम को असाइन कर सकते हैं।

हालाँकि, **यहां तक ​​कि अगर आप एक ऐरे को कॉपी करते हैं, तो उसके _अंदर_ आप मौजूदा आइटम्स को सीधे म्युटेट नहीं कर सकते हैं।** इसलिए यदि आप कॉपी हुई ऐरे के अंदर किसी ऑब्जेक्ट को मॉडिफाई करते हैं, तो आप मौजूदा स्टेट को म्युटेट कर रहे हैं। उदाहरण के लिए, इस तरह का कोड एक समस्या है।

```js
const nextList = [...list];
nextList[0].seen = true; // Problem: mutates list[0]
setList(nextList);
```

हालाँकि `nextList` और `list` दो अलग-अलग ऐरे हैं, **`nextList[0]` और `list[0]` एक ही ऑब्जेक्ट को पॉइंट करती हैं।** इसलिए `nextList[0].seen` को बदलकर, आप `list[0].seen` को भी बदल रहे हैं। यह एक स्टेट म्युटेशन है, जिससे आपको बचना चाहिए! आप इस मुद्दे को [नेस्टेड Javascript ऑब्जेक्ट्स को अपडेट करने](/learn/updating-objects-in-state#updating-a-nested-object) के ज़रिए हल कर सकते हैं--उन व्यक्तिगत आइटम्स को कॉपी करके जिन्हें आप म्युटेट करने के बजाय चेंज करना चाहते हैं। इसे ऐसे करें।

## ऐरेज़ के अंदर ऑब्जेक्ट्स को अपडेट करना {/*updating-objects-inside-arrays*/}

ऑब्जेक्ट्स _वास्तव में_ ऐरेज़ के "अंदर" स्थित नहीं होते हैं। वे कोड में "अंदर" दिखाई दे सकते हैं, परन्तु एक ऐरे में प्रत्येक ऑब्जेक्ट एक अलग वैल्यू है, जिसको ऐरे "पॉइंट" करती है। यही कारण है कि `list[0]` जैसे नेस्टेड फ़ील्ड्स बदलते समय आपको सावधान रहने की आवश्यकता है। किसी अन्य व्यक्ति की artwork लिस्ट ऐरे के एक ही एलिमेंट को पॉइंट कर सकती है!

**नेस्टेड स्टेट को अपडेट करते समय, जहां से आप अपडेट करना चाहते हैं, आपको वहां से लेकर टॉप लेवल तक कॉपीज़ बनाने की ज़रुरत है।** आइए देखें कि यह कैसे काम करता है।

इस उदाहरण में, दो अलग-अलग artwork लिस्ट्स में एक ही प्रारंभिक वैल्यू है। उन्हें आइसोलेटेड होना चाहिए, लेकिन एक म्युटेशन के कारण, उनकी स्टेट गलती से शेयर्ड हो गई है, और इस कारण एक सूची में एक बॉक्स को चेक करने से दूसरी सूची प्रभावित हो रही है:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

समस्या कोड में इस तरह है:

```js
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // Problem: mutates an existing item
setMyList(myNextList);
```

हालांकि `myNextList` ऐरे अपने आप में नई है, इसके *आइटम्स* वही हैं जो मूल `myList` ऐरे में हैं। इसलिए `artwork.seen` को बदलने से *मूल* artwork आइटम बदल जायेगा। यह artwork आइटम `yourList` में भी है, जो गलती का कारण बनता है। इस तरह की गलतियों के बारे में सोचना मुश्किल हो सकता है, लेकिन शुक्र है कि यदि आप म्युटेटिंग स्टेट का प्रयोग करने से बचते हैं तो ऐसी ग़लतियाँ गायब हो जाती हैं।

**आप म्युटेशन किए बिना एक पुराने आइटम को उसके अपडेटेड संस्करण से प्रतिस्थापित करने के लिए `map` का उपयोग कर सकते हैं।**

```js
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Create a *new* object with changes
    return { ...artwork, seen: nextSeen };
  } else {
    // No changes
    return artwork;
  }
}));
```

यहाँ, `...` ऑब्जेक्ट स्प्रेड सिंटैक्स है जिसका उपयोग [एक ऑब्जेक्ट की एक कॉपी बनाने के लिए](/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax) किया जाता है।

इस दृष्टिकोण के साथ, मौजूदा स्टेट आइटम्स में से कोई भी म्युटेट नहीं किया जा रहा है, और त्रुटि ठीक हो गई है:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // Create a *new* object with changes
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        // Create a *new* object with changes
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

सामान्य तौर पर, **आपको केवल उन ऑब्जेक्ट्स को म्युटेट करना चाहिए जो आपने अभी बनाए हैं।** यदि आप एक *नया* artwork इन्सर्ट कर रहे होते, तो आप उसे म्युटेट कर सकते थे, लेकिन यदि आप पहले से ही स्टेट में उपस्थित किसी वैल्यू का प्रयोग कर रहे हैं, तो आपको कॉपी बनाने की आवश्यकता है।

### Immer के साथ संक्षिप्त अपडेट लॉजिक लिखें {/*write-concise-update-logic-with-immer*/}

म्युटेशन के बिना नेस्टेड एरेज़ को अपडेट करने से थोड़ा दोहराव हो सकता है। [ऑब्जेक्ट्स की तरह ही](/learn/updating-objects-in-state#write-concise-update-logic-with-immer):

- आम तौर पर, आपको कुछ स्तरों से अधिक डीप स्टेट को अपडेट करने की आवश्यकता नहीं होनी चाहिए। यदि आपके स्टेट ऑब्जेक्ट्स बहुत डीप हैं, तो आप [उन्हें अलग तरीके से पुनर्गठन करना चाहिए](/learn/choosing-the-state-structure#avoid-deeply-nested-state) ताकि वे फ्लैट हों।
- यदि आप अपने स्टेट की संरचना को बदलना नहीं चाहते हैं, आप [Immer](https://github.com/immerjs/use-immer) का उपयोग करना पसंद कर सकते हैं, जो आपको सुविधाजनक लेकिन म्युटेटिंग सिंटैक्स का उपयोग करके लिखने देता है और आपके लिए कॉपीज़ का उत्पादन करने का ध्यान रखता है।

यहाँ Art Bucket List उदाहरण है जो Immer का प्रयोग करके फिर से लिखा गया है:

<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
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

</Sandpack>

ध्यान दें कि कैसे Immer के साथ, **म्युटेशन जैसे `artwork.seen = nextSeen` अब ठीक है:**

```js
updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
```

ऐसा इसलिए है क्योंकि आप _मूल_ स्टेट को म्युटेट नहीं कर रहे हैं, लेकिन आप Immer द्वारा प्रदान किया गया एक विशेष `draft` ऑब्जेक्ट को म्युटेट कर रहे हैं। इसी प्रकार, आप `push()` और `pop()` जैसे म्युटेटिंग मेथड्स ko `draft` के कंटेंट पर अप्लाई कर सकते हैं।

पर्दे के पीछे, Immer हमेशा उन परिवर्तनों के अनुसार शुरुआत से अगले स्टेट का निर्माण करता है जो आपने `draft` में किए हैं। यह आपके ईवेंट हैंडलर को स्टेट को कभी भी म्युटेट किया बिना बहुत संक्षिप्त रखता है।

<Recap>

- आप ऐरेज़ को स्टेट में रख सकते हैं, लेकिन आप उन्हें बदल नहीं सकते।
- एक ऐरे को म्युटेट करने के बजाय, इसका एक *नया* वर्शन बनाएं, और स्टेट को इससे अपडेट करें।
- आप नए आइटम्स के साथ ऐरे को बनाने के लिए `[...arr, newItem]` ऐरे स्प्रेड सिंटैक्स का उपयोग कर सकते हैं।
- आप फिल्टर्ड या ट्रांसफोर्मेड आइटम्स के साथ नई ऐरेज़ को बनाने के लिए `filter()` और `map()` का उपयोग कर सकते हैं।
- आप अपने कोड को संक्षिप्त रखने के लिए Immer का उपयोग कर सकते हैं।

</Recap>



<Challenges>

#### शॉपिंग कार्ट में किसी आइटम को अपडेट करें {/*update-an-item-in-the-shopping-cart*/}

`handleIncreaseClick` लॉजिक में भरें ताकि "+" को दबाने से संबंधित संख्या बढ़ जाए:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {

  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

<Solution>

आप एक नई ऐरे बनाने के लिए `map` फ़ंक्शन का उपयोग कर सकते हैं, और फिर नई ऐरे के लिए परिवर्तित ऑब्जेक्ट की एक कॉपी बनाने के लिए `...` ऑब्जेक्ट स्प्रेड सिंटैक्स का उपयोग करें:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

</Solution>

#### शॉपिंग कार्ट से एक आइटम निकालें {/*remove-an-item-from-the-shopping-cart*/}

इस शॉपिंग कार्ट में एक काम करता हुआ "+" बटन है, लेकिन "-" बटन कुछ भी नहीं करता है। आपको इसमें एक इवेंट हैंडलर जोड़ने की आवश्यकता है ताकि इसे दबाने से संबंधित प्रोडक्ट का `count` कम हो जाए। यदि आप दबाते हैं " -" जब गिनती 1 हो, तो उत्पाद को स्वचालित रूप से कार्ट से हटा दिया जाना चाहिए। सुनिश्चित करें कि यह कभी 0 नहीं दिखाए।

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

<Solution>

आप पहले एक नई ऐरे का उत्पादन करने के लिए `map` का उपयोग कर सकते हैं, और फिर `filter` का प्रयोग उपयोग उन प्रोडक्ट्स को हटाने के लिए जिनका `count` `0` सेट हो:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  function handleDecreaseClick(productId) {
    let nextProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count - 1
        };
      } else {
        return product;
      }
    });
    nextProducts = nextProducts.filter(p =>
      p.count > 0
    );
    setProducts(nextProducts)
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button onClick={() => {
            handleDecreaseClick(product.id);
          }}>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

</Solution>

#### नॉन-म्युटेटिव मेथड्स का उपयोग करके म्युटेशंस को ठीक करें {/*fix-the-mutations-using-non-mutative-methods*/}

इस उदाहरण में, `App.js` में सभी ईवेंट हैंडलर म्युटेशन का उपयोग कर रहे हैं। नतीजतन, todos को संपादित करना और हटाना काम नहीं करता है। `handleAddTodo`,`handleChangeTodo`, और `handleDeleteTodo` को नॉन-म्युटेटिव मेथड्स का उपयोग करने के लिए फिर से लिखें:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
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

`handleAddTodo` में आप ऐरे स्प्रेड सिंटैक्स का उपयोग कर सकते हैं। `handleChangeTodo` में आप `map` का उपयोग करके एक नई ऐरे बना सकते हैं। `handleDeleteTodo` में, आप `filter` का उपयोग करके एक नई ऐरे बना सकते हैं। अब सूची सही तरीके से काम कर रही है:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

</Solution>


#### Immer का उपयोग करके म्युटेशन को ठीक करें {/*fix-the-mutations-using-immer*/}

यह पिछली चुनौती के समान ही उदाहरण है। इस बार, Immer का उपयोग करके म्युटेशन को ठीक करें। आपकी सुविधा के लिए, `Useimmer` पहले से ही इम्पोर्ट किया गया है, इसलिए आपको इसका उपयोग करने के लिए `todos` स्टेट वैरिएबल को बदलने की आवश्यकता है।

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
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

Immer के साथ, आप म्युटेटिव फैशन में कोड लिख सकते हैं, जब तक कि आप केवल `draft` के कुछ हिस्सों को म्युटेट कर रहे हैं जो कि Immer आपको देता है। यहाँ, सभी म्युटेशन `draft` पर किए गए हैं, इसलिए कोड काम करता है:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(draft => {
      const todo = draft.find(t =>
        t.id === nextTodo.id
      );
      todo.title = nextTodo.title;
      todo.done = nextTodo.done;
    });
  }

  function handleDeleteTodo(todoId) {
    updateTodos(draft => {
      const index = draft.findIndex(t =>
        t.id === todoId
      );
      draft.splice(index, 1);
    });
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
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

आप Immer के साथ म्युटेटिव और नॉन-म्युटेटिव दृष्टिकोणों को मिला सकते हैं।

उदाहरण के लिए, इस वर्शन में `handleAddTodo` को Immer `draft` को म्युटेट करके कार्यान्वित किया गया है, जबकि `handleChangeTodo` और `handleDeleteTodo` नॉन-म्युटेटिव `map` और `filter` मेथड्स का उपयोग कर रहे हैं:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(todos.map(todo => {
      if (todo.id === nextTodo.id) {
        return nextTodo;
      } else {
        return todo;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    updateTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
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

Immer के साथ, आप उस शैली को चुन सकते हैं जो प्रत्येक अलग मामले के लिए सबसे स्वाभाविक लगता है।

</Solution>

</Challenges>

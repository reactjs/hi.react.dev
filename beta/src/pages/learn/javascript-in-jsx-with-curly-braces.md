---
title: कर्ली ब्रेसेस के साथ JSX में JavaScript
---

<Intro>

JSX आपको rendering लॉजिक और कंटेंट को एक ही स्थान पर रख कर, JavaScript फ़ाइल के अंदर HTML जैसा मार्कअप लिखने देता है। कभी-कभी आप थोड़ा JavaScript rendering लॉजिक ऐड करना चाहेंगे या उस मार्कअप के अंदर एक डायनामिक प्रॉपर्टी का रिफरेन्स देना चाहेंगे। इस स्थिति में, आप JavaScript के लिए एक विंडो खोलने के लिए अपने JSX में कर्ली ब्रेसेस का उपयोग कर सकते हैं।
</Intro>

<YouWillLearn>

* कोट्स के साथ strings कैसे पास करें
* कर्ली ब्रेसेस के साथ JSX के अंदर एक JavaScript चर का संदर्भ कैसे लें
* कर्ली ब्रेसेस के साथ JSX के अंदर JavaScript फ़ंक्शन को कैसे कॉल करें
* कर्ली ब्रेसेस के साथ JSX के अंदर JavaScript ऑब्जेक्ट का उपयोग कैसे करें

</YouWillLearn>

## कोट्स के साथ strings पास करना {/*passing-strings-with-quotes*/}

जब आप JSX को एक string एट्रिब्यूट पास करना चाहते हैं, तो आप इसे सिंगल या डबल कोट्स में डालते हैं:

<Sandpack>

```js
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

यहाँ, `"https://i.imgur.com/7vQD0fPs.jpg"` और `"Gregorio Y. Zara"` को strings के रूप में पास किया जा रहा है।

लेकिन क्या होगा यदि आप डायनामिक रूप से `src` या `alt` टेक्स्ट निर्दिष्ट करना चाहते हैं? आप **`"` और `"` इससे `{` और `}` बदलकर JavaScript से एक वैल्यू का उपयोग** कर सकते हैं:

<Sandpack>

```js
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

`className="avatar"` के बीच अंतर पर ध्यान दें, `"avatar"` एक CSS क्लास के नाम को दर्शाता है जो इमेज को गोल बनाता है, और `src={avatar}` जो `avatar` नामक JavaScript वेरिएबल की वैल्यू को रीड करता है। ऐसा इसलिए है क्योंकि कर्ली ब्रेसेस आपको अपने मार्कअप में वहीं JavaScript के साथ काम करने देते हैं!

## कर्ली ब्रेसेस का उपयोग: JavaScript वर्ल्ड में जाने का एक रास्ता {/*using-curly-braces-a-window-into-the-javascript-world*/}

JSX, JavaScript लिखने का एक विशेष तरीका है। इसका मतलब है कि इसके अंदर JavaScript का उपयोग करना संभव है - कर्ली ब्रेसेस के साथ `{ }`। नीचे दिया गया उदाहरण पहले वैज्ञानिक के नाम को डिक्लेअर करता है, `name`, फिर उसे `<h1>` के अंदर कर्ली ब्रेसेस के साथ एम्बेड करता है:

<Sandpack>

```js
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

</Sandpack>

`name` की वैल्यू को `'Gregorio Y. Zara'` से बदलकर `'Hedy Lamarr'` करके देखें। कि टू डू लिस्ट का शीर्षक कैसे बदलता है?

कोई भी JavaScript एक्सप्रेशन कर्ली ब्रेसेस के बीच काम करेगा, जिसमें फ़ंक्शन कॉल जैसे `formatDate()` शामिल हैं:

<Sandpack>

```js
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```

</Sandpack>

### कर्ली ब्रेसेस का उपयोग कहाँ करें {/*where-to-use-curly-braces*/}

आप JSX के अंदर केवल दो तरीकों से कर्ली ब्रेसेस का उपयोग कर सकते हैं:

1. **टेक्स्ट के रूप में** सीधे JSX टैग के अंदर: `<h1>{name}'s टू डू लिस्ट</h1>` काम करेगा, लेकिन `<{tag}>Gregorio Y. Zara की टू डू लिस्ट</{tag}>` नहीं करेगा।
2. **एट्रिब्यूटओं के रूप में** `=` साइन के ठीक बाद: `src={avatar}` `avatar` वेरिएबल को रीड करेगा, लेकिन `src="{avatar}"` स्ट्रिंग `{avatar}` को पास करेगा।

## "डबल कर्ली" का उपयोग करना: JSX में CSS और अन्य ऑब्जेक्ट {/*using-double-curlies-css-and-other-objects-in-jsx*/}

strings, numbers और अन्य JavaScript एक्सप्रेशंस के अलावा, आप JSX में ऑब्जेक्ट्स को भी पास कर सकते हैं। ऑब्जेक्ट्स को कर्ली ब्रेसेस से भी दिखाया जाता है, जैसे `{name: "Hedy Lamarr",  inventions: 5 }`। इसलिए, JSX में JS ऑब्जेक्ट को पास करने के लिए, आपको ऑब्जेक्ट को कर्ली ब्रेसेस की एक और जोड़ी में ऐड करना: `person={{ name: "Hedy Lamarr", inventions: 5 }}`।

आप इसे JSX में इनलाइन CSS स्टाइल्स के साथ देख सकते हैं। React के लिए आपको इनलाइन स्टाइल्स का उपयोग करने की आवश्यकता नहीं है (CSS क्लासेज ज्यादातर मामलों के लिए बहुत अच्छा काम करती हैं)। लेकिन जब आपको इनलाइन स्टाइल की आवश्यकता होती है, तो आप ऑब्जेक्ट को `style` एट्रिब्यूट में पास करते हैं:

<Sandpack>

```js
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

```css
body { padding: 0; margin: 0 }
ul { padding: 20px 20px 20px 40px; margin: 0; }
```

</Sandpack>

`backgroundColor` और `color` के वैल्यूज को बदलने का प्रयास करें।

जब आप इसे इस तरह लिखते हैं तो आप JavaScript ऑब्जेक्ट को कर्ली ब्रेसेस के अंदर देख सकते हैं:

```js {2-5}
<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
```

अगली बार जब आप JSX में `{{` and `}}` देखें, तो जान लें कि यह JSX कर्लीस के अंदर एक ऑब्जेक्ट से ज्यादा कुछ नहीं है!

<Gotcha>

इनलाइन `style` प्रॉपर्टीज कैमलकेस में लिखे गए हैं। उदाहरण के लिए, HTML `<ul style="background-color: black">` को आपके कौम्पोनॅन्ट में `<ul style={{ backgroundColor: 'black' }}>` के रूप में लिखा जाएगा।

</Gotcha>

## JavaScript ऑब्जेक्ट और कर्ली ब्रेसेस के साथ अधिक मज़ा {/*more-fun-with-javascript-objects-and-curly-braces*/}

आप कई एक्सप्रेशंस को एक ऑब्जेक्ट में मूव कर सकते हैं, और उन्हें अपने JSX में कर्ली ब्रेसेस से रिफरेन्स कर सकते हैं:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

इस उदाहरण में, `person` JavaScript ऑब्जेक्ट में एक `name` string और एक `theme` ऑब्जेक्ट है:

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

कौम्पोनॅन्ट इन वैल्यूज का उपयोग `person` से कर सकता है जैसे:

```js
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
```

JSX एक टेम्प्लेटिंग भाषा के रूप में बहुत कम है क्योंकि यह आपको JavaScript का उपयोग करके डेटा और rendering लॉजिक को व्यवस्थित करने देता है।

<Recap>

अब आप JSX के बारे में लगभग सब कुछ जानते हैं:

* कोट्स के अंदर JSX ऐट्रिब्यूट्स स्ट्रिंग के रूप में पास होती है।
* कर्ली ब्रेसेस आपको अपने मार्कअप में JavaScript rendering लॉजिक और वेरिएबल्स लाने देते हैं।
* वे JSX टैग कंटेंट के अंदर या एट्रिब्यूटओं में `=` के तुरंत बाद काम करते हैं।
* `{{` and `}}` विशेष सिंटैक्स नहीं है: यह एक JavaScript ऑब्जेक्ट है जिसे JSX कर्ली ब्रेसिज़ के अंदर रखा गया है।

</Recap>

<Challenges>

### गलती को सुधारें {/*fix-the-mistake*/}

यह कोड यह कहते हुए एक एरर साथ क्रैश हो जाता है कि `ऑब्जेक्ट्स React चाइल्ड के रूप में वैलिड नहीं हैं`:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

क्या आप समस्या का पता लगा सकते हैं?

<Hint>देखें कि कर्ली ब्रेसेस के अंदर क्या है। क्या हम वहां सही चीज डाल रहे हैं?</Hint>

<Solution>

ऐसा इसलिए हो रहा है क्योंकि यह उदाहरण एक स्ट्रिंग के बजाय मार्कअप में *एक ऑब्जेक्ट ही* रेंडर करता है: `<h1>{person}'s Todos</h1>` पूरे `person` ऑब्जेक्ट को रेंडर करने की कोशिश कर रहा है! रॉ ऑब्जेक्ट्स को टेक्स्ट कंटेंट में शामिल करना एक एरर उत्पन्न करता है क्योंकि React यह नहीं जानता कि आप उन्हें कैसे डिस्प्ले करना चाहते हैं।

इसे ठीक करने के लिए, `<h1>{person}'s Todos</h1>` को `<h1>{person.name}'s Todos</h1>` से बदलें:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

### किसी ऑब्जेक्ट में जानकारी निकालें {/*extract-information-into-an-object*/}

इमेज URL को `person` ऑब्जेक्ट में निकालें।

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

<Solution>

इमेज URL को `person.imageUrl` नामक संपत्ति में ले जाएं और इसे कर्ली का उपयोग करके `<img>` टैग से पढ़ें:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  imageUrl: "https://i.imgur.com/7vQD0fPs.jpg",
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={person.imageUrl}
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

### JSX कर्ली ब्रेसेस के अंदर एक एक्सप्रेशन लिखें {/*write-an-expression-inside-jsx-curly-braces*/}

नीचे दिए गए ऑब्जेक्ट में, पूरी इमेज URL को चार भागों में बांटा गया है: आधार URL, `imageId`, `imageSize`, और फ़ाइल एक्सटेंशन।

हम चाहते हैं कि इमेज URL इन एट्रिब्यूटओं को एक साथ जोड़ दे: आधार URL (हमेशा `'https://i.imgur.com/'`), `imageId` (`'7vQD0fP'`), `imageSize` (`'s'`), और फ़ाइल एक्सटेंशन (हमेशा `'.jpg'`)। हालांकि, `<img>` टैग अपने `src` को कैसे निर्दिष्ट करता है, इसमें कुछ गड़बड़ है।


क्या आप इसे ठीक कर सकते हैं?

<Sandpack>

```js

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

यह जाँचने के लिए कि आपका फिक्स काम कर गया है, `imageSize` की वैल्यू को `'b'` में बदलने का प्रयास करें। आपके एडिटिंग के बाद इमेज का आकार बदलना चाहिए।

<Solution>

आप इसे `src={baseUrl person.imageId person.imageSize '.jpg'}` के रूप में लिख सकते हैं।

1. `{` जावास्क्रिप्ट एक्सप्रेशन ओपन करता है
2. `baseUrl person.imageId person.imageSize '.jpg'` सही URL स्ट्रिंग प्रोडूयस करता है
3. `}` JavaScript एक्सप्रेशन को बंद कर देता है

<Sandpack>

```js
const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={baseUrl + person.imageId + person.imageSize + '.jpg'}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

आप इस एक्सप्रेशन को नीचे `getImageUrl` जैसे एक अलग फ़ंक्शन में भी अलग कर सकते हैं:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js'

const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```js utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    person.imageSize +
    '.jpg'
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

वेरिएबल और फ़ंक्शन मार्कअप को सरल रखने में आपकी सहायता कर सकते हैं!

</Solution>

</Challenges>

---
title: घुंघराले ब्रेसिज़ के साथ JSX में JavaScript
---

<Intro>

JSX आपको तर्क और सामग्री को एक ही स्थान पर प्रस्तुत करते हुए, JavaScript फ़ाइल के अंदर HTML जैसा मार्कअप लिखने देता है। कभी-कभी आप थोड़ा JavaScript तर्क जोड़ना चाहेंगे या उस मार्कअप के अंदर एक गतिशील संपत्ति का संदर्भ देना चाहेंगे। इस स्थिति में, आप JavaScript के लिए एक विंडो खोलने के लिए अपने JSX में घुंघराले ब्रेसिज़ का उपयोग कर सकते हैं।
</Intro>

<YouWillLearn>

* उद्धरणों के साथ strings कैसे पास करें
* घुंघराले ब्रेसिज़ के साथ JSX के अंदर एक JavaScript चर का संदर्भ कैसे लें
* घुंघराले ब्रेसिज़ के साथ JSX के अंदर JavaScript फ़ंक्शन को कैसे कॉल करें
* घुंघराले ब्रेसिज़ के साथ JSX के अंदर JavaScript ऑब्जेक्ट का उपयोग कैसे करें

</YouWillLearn>

## उद्धरणों के साथ strings पास करना {/*उद्धरणों-के-साथ-strings-पास-करना*/}

जब आप JSX को एक string विशेषता पास करना चाहते हैं, तो आप इसे सिंगल या डबल कोट्स में डालते हैं:

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

यहां, `"https://i.imgur.com/7vQD0fPs.jpg"` और `"Gregorio Y. Zara"` को strings के रूप में पास किया जा रहा है।

लेकिन क्या होगा यदि आप गतिशील रूप से `src` या `alt` टेक्स्ट निर्दिष्ट करना चाहते हैं? आप **`"` और `"` साथ `{` और `}` से बदलकर JavaScript से एक मान का उपयोग** कर सकते हैं:

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

क्लासनाम = "अवतार" के बीच अंतर पर ध्यान दें, जो एक "अवतार" CSS वर्ग का नाम निर्दिष्ट करता है जो छवि को गोल बनाता है, और src={अवतार} जो अवतार नामक JavaScript चर के मूल्य को पढ़ता है। ऐसा इसलिए है क्योंकि घुंघराले ब्रेसिज़ आपको अपने मार्कअप में वहीं JavaScript के साथ काम करने देते हैं!

## घुंघराले ब्रेसिज़ का उपयोग: JavaScript दुनिया में एक खिड़की {/*उपयोग-घुंघराले-ब्रेसिज़-ए-विंडो-में-javascript-दुनिया*/}

JSX JavaScript लिखने का एक विशेष तरीका है। इसका मतलब है कि इसके अंदर JavaScript का उपयोग करना संभव है - घुंघराले ब्रेसिज़ के साथ `{ }`। नीचे दिया गया उदाहरण पहले वैज्ञानिक के नाम की घोषणा करता है, `name`, फिर उसे `<h1>` के अंदर घुंघराले ब्रेसिज़ के साथ एम्बेड करता है:

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

'नाम' के मान को `'Gregorio Y. Zara'` से बदलकर `'Hedy Lamarr'` करने का प्रयास करें। देखें कि टू डू लिस्ट का शीर्षक कैसे बदलता है?

कोई भी JavaScript अभिव्यक्ति घुंघराले ब्रेसिज़ के बीच काम करेगी, जिसमें फ़ंक्शन कॉल जैसे `formatDate ()` शामिल हैं:

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

### घुंघराले ब्रेसिज़ का उपयोग कहाँ करें {/*घुंघराले-ब्रेसिज़-का-उपयोग-कहाँ-करें*/}

आप JSX के अंदर केवल दो तरीकों से घुंघराले ब्रेसिज़ का उपयोग कर सकते हैं:

1. **टेक्स्ट के रूप में** सीधे JSX टैग के अंदर: `<h1>{name}'s टू डू लिस्ट</h1>` काम करता है, लेकिन `<{tag}>Gregorio Y. Zara की टू डू लिस्ट</{ टैग}>` नहीं होगा।
2. **विशेषताओं के रूप में** तुरंत `=` चिह्न के बाद: `src={avatar}` `अवतार` चर को पढ़ेगा, लेकिन `src="{avatar}"` स्ट्रिंग `{अवतार}` को पास करेगा .

## "डबल कर्ली" का उपयोग करना: JSX में CSS और अन्य ऑब्जेक्ट {/*उपयोग-डबल-कर्ली-CSS-और-अन्य-वस्तुओं-इन-JSX*/}

strings, नंबर्स और अन्य JavaScript एक्सप्रेशंस के अलावा, आप JSX में ऑब्जेक्ट्स को पास भी कर सकते हैं। वस्तुओं को घुंघराले ब्रेसिज़ से भी दर्शाया जाता है, जैसे `{name: "Hedy Lamarr", आविष्कार: 5 }`। इसलिए, JSX में JS ऑब्जेक्ट को पास करने के लिए, आपको ऑब्जेक्ट को घुंघराले ब्रेसिज़ की एक और जोड़ी में लपेटना होगा: `व्यक्ति = {{नाम: "Hedy Lamarr", आविष्कार: 5}}`।

आप इसे JSX में इनलाइन CSS शैलियों के साथ देख सकते हैं। प्रतिक्रिया के लिए आपको इनलाइन शैलियों का उपयोग करने की आवश्यकता नहीं है (CSS कक्षाएं ज्यादातर मामलों के लिए बहुत अच्छा काम करती हैं)। लेकिन जब आपको इनलाइन शैली की आवश्यकता होती है, तो आप ऑब्जेक्ट को `style` विशेषता में पास करते हैं:

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

`backgroundColor` और `color` के मानों को बदलने का प्रयास करें।

जब आप इसे इस तरह लिखते हैं तो आप वास्तव में JavaScript ऑब्जेक्ट को घुंघराले ब्रेसिज़ के अंदर देख सकते हैं:

```js {2-5}
<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
```

अगली बार जब आप JSX में `{{` और `}}` देखें, तो जान लें कि यह JSX कर्ली के अंदर एक वस्तु से ज्यादा कुछ नहीं है!

<Gotcha>

इनलाइन `style` गुण कैमलकेस में लिखे गए हैं। उदाहरण के लिए, HTML `<ul style="background-color: black"`> को आपके कंपोनेंट में `<ul style={{ backgroundColor: 'black' }}>` के रूप में लिखा जाएगा।

</Gotcha>

## JavaScript ऑब्जेक्ट और घुंघराले ब्रेसिज़ के साथ अधिक मज़ा {/*JavaScript-ऑब्जेक्ट-और-घुंघराले-ब्रेसिज़-के-साथ-अधिक-मज़ा*/}

आप कई भावों को एक वस्तु में स्थानांतरित कर सकते हैं, और उन्हें अपने JSX में घुंघराले ब्रेसिज़ के अंदर संदर्भित कर सकते हैं:

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

इस उदाहरण में, `person` JavaScript ऑब्जेक्ट में एक `name` string और एक `theme` ऑब्जेक्ट होता है:

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

घटक इन मानों का उपयोग `person` से कर सकता है जैसे:

```js
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
```

JSX एक टेम्प्लेटिंग भाषा के रूप में बहुत कम है क्योंकि यह आपको JavaScript का उपयोग करके डेटा और तर्क को व्यवस्थित करने देता है।

<Recap>

अब आप JSX के बारे में लगभग सब कुछ जानते हैं:

* उद्धरण के अंदर JSX विशेषताएँ तार के रूप में पारित की जाती हैं।
* घुंघराले ब्रेसिज़ आपको अपने मार्कअप में JavaScript तर्क और चर लाने देते हैं।
* वे JSX टैग सामग्री के अंदर या विशेषताओं में `=` के तुरंत बाद काम करते हैं।
* `{{` और `}}` विशेष सिंटैक्स नहीं है: यह एक JavaScript ऑब्जेक्ट है जिसे JSX कर्ली ब्रेसिज़ के अंदर रखा गया है।

</Recap>

<Challenges>

### गलती को सुधारें {/*गलती-को-सुधारें */}

यह कोड यह कहते हुए एक त्रुटि के साथ क्रैश हो जाता है कि `ऑब्जेक्ट्स React चाइल्ड के रूप में मान्य नहीं हैं`:

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

<Hint>देखें कि घुंघराले ब्रेसिज़ के अंदर क्या है। क्या हम वहां सही चीज डाल रहे हैं?</Hint>

<Solution>

ऐसा इसलिए हो रहा है क्योंकि यह उदाहरण एक स्ट्रिंग के बजाय मार्कअप में *एक ऑब्जेक्ट ही* रेंडर करता है: `<h1>{person}'s Todos</h1>` पूरे `person` ऑब्जेक्ट को रेंडर करने की कोशिश कर रहा है! कच्ची वस्तुओं को पाठ सामग्री के रूप में शामिल करना एक त्रुटि उत्पन्न करता है क्योंकि React यह नहीं जानता कि आप उन्हें कैसे प्रदर्शित करना चाहते हैं।

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

### किसी वस्तु में जानकारी निकालें {/*extract-information-into-an-object*/}

छवि URL को `person` ऑब्जेक्ट में निकालें।

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

छवि URL को `person.imageUrl` नामक संपत्ति में ले जाएं और इसे कर्ली का उपयोग करके `<img>` टैग से पढ़ें:

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

### Write an expression inside JSX curly braces {/*write-an-expression-inside-jsx-curly-braces*/}

नीचे दिए गए ऑब्जेक्ट में, पूर्ण छवि URL को चार भागों में विभाजित किया गया है: आधार URL, `imageId`, `imageSize`, और फ़ाइल एक्सटेंशन।

हम चाहते हैं कि छवि URL इन विशेषताओं को एक साथ जोड़ दे: आधार URL (हमेशा `'https://i.imgur.com/'`), `imageId` (`'7vQD0fP'`), `imageSize` (`'s') `), और फ़ाइल एक्सटेंशन (हमेशा `'.jpg'`)। हालांकि, `<img>` टैग अपने `src` को कैसे निर्दिष्ट करता है, इसमें कुछ गड़बड़ है।

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

यह जाँचने के लिए कि आपका सुधार काम कर गया है, `imageSize` के मान को `'b'` में बदलने का प्रयास करें। आपके संपादन के बाद छवि का आकार बदलना चाहिए।

<Solution>

आप इसे `src={baseUrl person.imageId person.imageSize '.jpg'}` के रूप में लिख सकते हैं।

1. `{` जावास्क्रिप्ट अभिव्यक्ति खोलता है
2. `baseUrl person.imageId person.imageSize '.jpg'` सही यूआरएल स्ट्रिंग तैयार करता है
3. `}` JavaScript व्यंजक को बंद कर देता है

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

आप इस एक्सप्रेशन को नीचे 'getImageUrl' जैसे एक अलग फ़ंक्शन में भी स्थानांतरित कर सकते हैं:

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

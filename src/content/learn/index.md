---
title: तुरंत शुरुआत
---

<Intro>

React प्रलेखन में आपका स्वागत है! यह पृष्ठ आपको उन 80% React अवधारणाओं का परिचय देगा जिन्हें आप दैनिक आधार पर उपयोग करेंगे।

</Intro>

<YouWillLearn>

- कौम्पोनॅन्ट को कैसे बनाएँ और नेस्ट करें  
- मार्कअप और स्टाइल कैसे जोड़ें  
- डेटा कैसे प्रदर्शित करें  
- शर्तें और सूचियाँ कैसे रेंडर करें  
- events का जवाब कैसे दें और स्क्रीन अपडेट करें  
- कौम्पोनॅन्ट के बीच डेटा कैसे साझा करें  

</YouWillLearn>

## कौम्पोनॅन्ट बनाना और नेस्ट करना {/*components*/}

React ऐप्स *कौम्पोनॅन्टस* से बने होते हैं। एक कौम्पोनॅन्ट UI (यूज़र इंटरफ़ेस) का एक हिस्सा होता है, जिसमें अपनी खुद की लॉजिक और रूपरेखा होती है। एक कौम्पोनॅन्ट एक बटन जितना छोटा या पूरी पेज जितना बड़ा हो सकता है।  

React कौम्पोनॅन्टस JavaScript फ़ंक्शंस होते हैं जो मार्कअप रिटर्न करते हैं:

```js
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

अब जब आपने `MyButton` डिक्लेयर कर लिया है, तो आप इसे किसी अन्य कौम्पोनॅन्ट के अंदर नेस्ट कर सकते हैं:

```js {5}
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

ध्यान दें कि `<MyButton />` बड़े अक्षर से शुरू होता है। यही संकेत है कि यह एक React कौम्पोनॅन्ट है। React कौम्पोनॅन्ट के नाम हमेशा बड़े अक्षर से शुरू होने चाहिए, जबकि HTML टैग छोटे अक्षरों में होने चाहिए।  

परिणाम पर एक नज़र डालें:

<Sandpack>

```js
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

</Sandpack>

`export default` कीवर्ड फ़ाइल में मुख्य कौम्पोनॅन्ट को निर्दिष्ट करते हैं। यदि आपको किसी JavaScript सिंटैक्स के बारे में जानकारी नहीं है, तो [MDN](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) और [javascript.info](https://javascript.info/import-export) पर बेहतरीन संदर्भ उपलब्ध हैं।

## JSX के साथ मार्कअप लिखना {/*writing-markup-with-jsx*/}

जो मार्कअप सिंटैक्स आपने ऊपर देखा, उसे *JSX* कहा जाता है। यह वैकल्पिक है, लेकिन अधिकांश React प्रोजेक्ट JSX का उपयोग इसकी सुविधा के कारण करते हैं। [स्थानीय विकास के लिए हम जिन टूल्स की सिफारिश करते हैं](/learn/installation), वे सभी JSX को सीधे सपोर्ट करते हैं।  

JSX, HTML की तुलना में अधिक सख्त होता है। आपको `<br />` जैसे टैग को बंद करना पड़ता है। आपका कौम्पोनॅन्ट कई JSX टैग्स को सीधे रिटर्न नहीं कर सकता। आपको उन्हें एक साझा पैरेंट में लपेटना होगा, जैसे कि `<div>...</div>` या एक खाली `<>...</>` रैपर:

```js {3,6}
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

यदि आपके पास बहुत सारा HTML है जिसे JSX में बदलना है, तो आप एक [ऑनलाइन कन्वर्टर](https://transform.tools/html-to-jsx) का उपयोग कर सकते हैं।

## स्टाइल्स जोड़ना {/*adding-styles*/}

React में, आप CSS क्लास को `className` के साथ निर्दिष्ट करते हैं। यह HTML के [`class`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) एट्रिब्यूट की तरह काम करता है:

```js
<img className="avatar" />
```

फिर आप इसके लिए CSS नियमों को एक अलग CSS फ़ाइल में लिखते हैं:

```css
/* In your CSS */
.avatar {
  border-radius: 50%;
}
```

React यह निर्धारित नहीं करता कि आप CSS फ़ाइलें कैसे जोड़ें। सबसे सरल मामले में, आप अपनी HTML में एक [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) टैग जोड़ सकते हैं। अगर आप किसी बिल्ड टूल या फ्रेमवर्क का उपयोग करते हैं, तो अपने प्रोजेक्ट में CSS फ़ाइल जोड़ने के लिए उसके दस्तावेज़ों से मार्गदर्शन प्राप्त करें।
## डेटा प्रदर्शित करना {/*displaying-data*/}

JSX आपको जावास्क्रिप्ट में मार्कअप डालने की अनुमति देता है। कर्ली ब्रेसेस आपको "वापस" जावास्क्रिप्ट में जाने देते हैं ताकि आप अपने कोड से किसी वेरिएबल को एम्बेड करके उसे उपयोगकर्ता को दिखा सकें। उदाहरण के लिए, यह `user.name` प्रदर्शित करेगा:

```js {3}
return (
  <h1>
    {user.name}
  </h1>
);
```

आप JSX एट्रिब्यूट्स से भी "जावास्क्रिप्ट में जा सकते हैं", लेकिन इसके लिए आपको **कोट्स की जगह** कर्ली ब्रेसेस का उपयोग करना होगा। उदाहरण के लिए, `className="avatar"` `"avatar"` स्ट्रिंग को CSS क्लास के रूप में पास करता है, लेकिन `src={user.imageUrl}` जावास्क्रिप्ट वेरिएबल `user.imageUrl` का मान पढ़ता है और फिर उसे `src` एट्रिब्यूट के रूप में पास करता है।
```js {3,4}
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

आप JSX की कर्ली ब्रेसेस के अंदर अधिक जटिल अभिव्यक्तियाँ भी रख सकते हैं, उदाहरण के लिए, [स्ट्रिंग कॉनकैटनेशन](https://javascript.info/operators#string-concatenation-with-binary):

<Sandpack>

```js
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

```css
.avatar {
  border-radius: 50%;
}

.large {
  border: 4px solid gold;
}
```

</Sandpack>

ऊपर दिए गए उदाहरण में, `style={{}}` कोई विशेष सिंटैक्स नहीं है, बल्कि `style={ }` JSX कर्ली ब्रेसेस के अंदर एक सामान्य `{}` ऑब्जेक्ट है। जब आपकी स्टाइल्स जावास्क्रिप्ट वेरिएबल्स पर निर्भर करती हैं, तो आप `style` एट्रिब्यूट का उपयोग कर सकते हैं।

## शर्तीय रेंडरिंग (Conditional Rendering) {/*conditional-rendering*/}

React में शर्तें लिखने के लिए कोई विशेष सिंटैक्स नहीं होता। इसके बजाय, आप वही तकनीकें उपयोग करेंगे जो सामान्य जावास्क्रिप्ट कोड लिखते समय करते हैं। उदाहरण के लिए, आप JSX को शर्तीय रूप से शामिल करने के लिए [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) स्टेटमेंट का उपयोग कर सकते हैं:

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

यदि आप अधिक संक्षिप्त कोड पसंद करते हैं, तो आप [शर्तीय `?` ऑपरेटर](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) का उपयोग कर सकते हैं। `if` के विपरीत, यह JSX के अंदर काम करता है:

```js
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

जब आपको `else` ब्रांच की ज़रूरत नहीं होती, तो आप एक छोटा [लॉजिकल `&&` सिंटैक्स](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation) भी उपयोग कर सकते हैं।

```js
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

इन सभी तरीकों का उपयोग आप शर्तों के आधार पर एट्रीब्यूट्स को निर्दिष्ट करने के लिए भी कर सकते हैं। अगर आप इनमें से कुछ JavaScript सिंटैक्स से अपरिचित हैं, तो आप हमेशा `if...else` का उपयोग करके शुरुआत कर सकते हैं।

## सूचियों को रेंडर करना {/*rendering-lists*/}

आप सूचियों को रेंडर करने के लिए JavaScript की विशेषताओं जैसे [`for` लूप](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) और [array `map()` फ़ंक्शन](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) पर निर्भर करेंगे।

उदाहरण के लिए, मान लीजिए आपके पास उत्पादों की एक सूची है:

```js
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

अपने कौम्पोनॅन्ट के अंदर, आप `map()` फ़ंक्शन का उपयोग करके उत्पादों की एक सूची को `<li>` आइटम्स की एक सूची में बदल सकते हैं:

```js
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

ध्यान दें कि `<li>` में एक `key` एट्रीब्यूट है। सूची में प्रत्येक आइटम के लिए, आपको एक ऐसा स्ट्रिंग या नंबर पास करना चाहिए जो उस आइटम को उसके अन्य समान आइटम्स में अद्वितीय रूप से पहचान सके। आमतौर पर, एक कुंजी आपके डेटा से आनी चाहिए, जैसे कि एक डेटाबेस आईडी। React आपके द्वारा प्रदान की गई कुंजी का उपयोग यह जानने के लिए करता है कि बाद में यदि आप आइटम्स को जोड़ते, हटाते या पुनः क्रमबद्ध करते हैं तो क्या हुआ।

<Sandpack>

```js
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

</Sandpack>

## इवेंट्स का जवाब देना {/*responding-to-events*/}

You can respond to events by declaring *event handler* functions inside your components:
आप अपने कौम्पोनॅन्टस के अंदर *इवेंट हैंडलर* फ़ंक्शंस घोषित करके इवेंट्स का जवाब दे सकते हैं।

```js {2-4,7}
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

ध्यान दें कि `onClick={handleClick}` के अंत में कोई कोष्ठक नहीं हैं! इवेंट हैंडलर फ़ंक्शन को _कॉल_ न करें: आपको केवल इसे *पास* करना है। React आपके द्वारा पास किए गए इवेंट हैंडलर को तब कॉल करेगा जब उपयोगकर्ता बटन पर क्लिक करेगा।

## स्क्रीन को अपडेट करना {/*updating-the-screen*/}

अक्सर, आप चाहेंगे कि आपका कौम्पोनॅन्ट कुछ जानकारी "याद रखे" और उसे प्रदर्शित करे। उदाहरण के लिए, शायद आप यह गिनना चाहते हैं कि बटन पर कितनी बार क्लिक किया गया है। इसे करने के लिए, अपने कौम्पोनॅन्ट में *state* जोड़ें।

सबसे पहले, React से [`useState`](/reference/react/useState) को import करें:

```js
import { useState } from 'react';
```

अब आप अपने कौम्पोनॅन्ट के अंदर एक *state वेरिएबल* घोषित कर सकते हैं:

```js
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

आपको `useState` से दो चीज़ें मिलेंगी: वर्तमान स्टेट (`count`), और वह फ़ंक्शन जो आपको इसे अपडेट करने की अनुमति देता है (`setCount`)। आप इन्हें कोई भी नाम दे सकते हैं, लेकिन परंपरा है कि इन्हें `[कुछ, setकुछ]` के रूप में लिखा जाता है।

जब पहली बार बटन प्रदर्शित होता है, तो `count` `0` होगा क्योंकि आपने `useState()` में `0` पास किया था। जब आप स्टेट बदलना चाहते हैं, तो `setCount()` को कॉल करें और उसमें नया मान पास करें। इस बटन पर क्लिक करने से काउंटर बढ़ेगा:

```js {5}
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

React आपके कौम्पोनॅन्ट फ़ंक्शन को फिर से कॉल करेगा। इस बार, `count` `1` होगा। फिर यह `2` होगा। और इसी तरह।

अगर आप वही कौम्पोनॅन्ट कई बार रेंडर करते हैं, तो प्रत्येक को अपनी अपनी स्टेट मिलेगी। प्रत्येक बटन पर अलग-अलग क्लिक करें:

<Sandpack>

```js
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

```css
button {
  display: block;
  margin-bottom: 5px;
}
```

</Sandpack>

ध्यान दें कि प्रत्येक बटन अपनी अपनी `count` स्टेट को "याद" रखता है और अन्य बटन पर असर नहीं डालता।

## हुक्स का उपयोग करना {/*using-hooks*/}

`use` से शुरू होने वाले फ़ंक्शंस को *हुक्स* कहा जाता है। `useState` एक इनबिल्ट हुक है जो React द्वारा प्रदान किया गया है। आप अन्य इनबिल्ट हुक्स [API संदर्भ](/reference/react) में पा सकते हैं। आप मौजूदा हुक्स को मिलाकर अपने खुद के हुक्स भी लिख सकते हैं।

हुक्स अन्य फ़ंक्शंस की तुलना में अधिक प्रतिबंधित होते हैं। आप हुक्स को *केवल अपने कंपोनेंट्स* (या अन्य हुक्स) के शीर्ष पर ही कॉल कर सकते हैं। यदि आप `useState` को किसी शर्त या लूप में उपयोग करना चाहते हैं, तो एक नया कौम्पोनॅन्ट बनाएं और उसे वहाँ रखें।

## कौम्पोनॅन्टस के बीच डेटा साझा करना {/*sharing-data-between-components*/}

पिछले उदाहरण में, प्रत्येक `MyButton` का अपना स्वतंत्र `count` था, और जब प्रत्येक बटन पर क्लिक किया गया, तो केवल उसी बटन के लिए `count` बदला।

<DiagramGroup>

<Diagram name="sharing_data_child" height={367} width={407} alt="Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. Both MyButton components contain a count with value zero.">

प्रारंभ में, प्रत्येक `MyButton` का `count` स्टेट `0` होता है।

</Diagram>

<Diagram name="sharing_data_child_clicked" height={367} width={407} alt="The same diagram as the previous, with the count of the first child MyButton component highlighted indicating a click with the count value incremented to one. The second MyButton component still contains value zero." >

पहला `MyButton` अपनी `count` को `1` में अपडेट करता है।

</Diagram>

</DiagramGroup>

However, often you'll need components to *share data and always update together*.

हालाँकि, अक्सर आपको कंपोनेंट्स को *डेटा साझा करने और हमेशा एक साथ अपडेट करने* की आवश्यकता होती है।

दोनों `MyButton` कंपोनेंट्स को एक जैसा `count` दिखाने और एक साथ अपडेट करने के लिए, आपको स्टेट को व्यक्तिगत बटनों से "ऊपर" उस सबसे नज़दीकी कौम्पोनॅन्ट में स्थानांतरित करना होगा जो इन सभी को शामिल करता है।

इस उदाहरण में, वह कौम्पोनॅन्ट `MyApp` है।

<DiagramGroup>

<Diagram name="sharing_data_parent" height={385} width={410} alt="Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. MyApp contains a count value of zero which is passed down to both of the MyButton components, which also show value zero." >

प्रारंभ में, `MyApp` का `count` स्टेट `0` होता है और इसे दोनों बच्चों को पास किया जाता है।

</Diagram>

<Diagram name="sharing_data_parent_clicked" height={385} width={410} alt="The same diagram as the previous, with the count of the parent MyApp component highlighted indicating a click with the value incremented to one. The flow to both of the children MyButton components is also highlighted, and the count value in each child is set to one indicating the value was passed down." >

क्लिक करने पर, `MyApp` अपनी `count` स्टेट को `1` में अपडेट करता है और इसे दोनों बच्चों को पास करता है।

</Diagram>

</DiagramGroup>

अब जब आप किसी भी बटन पर क्लिक करेंगे, तो `MyApp` में `count` बदलेगा, जो कि दोनों `MyButton` के `count` को भी बदल देगा। यहाँ यह कोड के रूप में कैसे व्यक्त किया जा सकता है।

सबसे पहले, *state को ऊपर* `MyButton` से `MyApp` में स्थानांतरित करें:

```js {2-6,18}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  // ... we're moving code from here ...
}

```

फिर, *state को नीचे पास करें* `MyApp` से प्रत्येक `MyButton` को, साथ ही साझा किया गया क्लिक हैंडलर। आप JSX कर्ली ब्रेसेस का उपयोग करके `MyButton` को जानकारी पास कर सकते हैं, ठीक वैसे ही जैसे आपने पहले `<img>` जैसे इनबिल्ट टैग्स के साथ किया था।

```js {11-12}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

जो जानकारी आप इस तरह से पास करते हैं, उसे _props_ कहा जाता है। अब `MyApp` कौम्पोनॅन्ट में `count` स्टेट और `handleClick` इवेंट हैंडलर दोनों होते हैं, और *इन दोनों को props के रूप में* प्रत्येक बटन को पास किया जाता है।

अंत में, `MyButton` को इस तरह से बदलें कि वह अपने पेरेंट कौम्पोनॅन्ट से पास किए गए props को *पढ़े*:

```js {1,3}
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

जब आप बटन पर क्लिक करते हैं, तो `onClick` हैंडलर फायर होता है। प्रत्येक बटन का `onClick` prop `MyApp` के अंदर `handleClick` फ़ंक्शन पर सेट किया गया था, इसलिए इसके अंदर का कोड चलता है। वह कोड `setCount(count + 1)` को कॉल करता है, जिससे `count` स्टेट वेरिएबल बढ़ता है। नया `count` मान प्रत्येक बटन को prop के रूप में पास किया जाता है, जिससे वे सभी नया मान दिखाते हैं। इसे "state को ऊपर उठाना" कहा जाता है। स्टेट को ऊपर उठाकर, आपने इसे कौम्पोनॅन्ट्स के बीच साझा किया है।

<Sandpack>

```js
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

```css
button {
  display: block;
  margin-bottom: 5px;
}
```

</Sandpack>

## अगले कदम {/*next-steps*/}

अब तक, आप React कोड लिखने के मूल बातें जान चुके हैं!

इन्हें व्यवहार में लाने और React के साथ अपनी पहली मिनी-एप्लिकेशन बनाने के लिए [ट्यूटोरियल](/learn/tutorial-tic-tac-toe) देखें।
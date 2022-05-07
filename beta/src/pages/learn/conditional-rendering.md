---
title: कंडीशनल  रेंडरिंग
---

<Intro>

आपके कौम्पोनॅन्ट को अक्सर अलग-अलग कंडीशंस के आधार पर अलग-अलग चीजें डिस्प्ले करने की आवश्यकता होगी। React में, आप JSX को किसी कंडीशन के साथ JavaScript सिंटेक्स जैसे की `if` स्टेटमेंट्स, `&&`, एंड `?:` ऑपरेटर्स को इस्तेमाल करके रेंडर कर सकते है।

</Intro>

<YouWillLearn>

* कैसे एक कंडीशन के आधार पर अलग JSX रिटर्न करे
* कैसे किसी कंडीशन के आधार पर JSX के एक पीस को शामिल करें या निकालें
* सामान्य कंडीशनल सिंटैक्स शॉर्टकट जो आपको React कोडबेस में मिलेंगे

</YouWillLearn>

## कंडीशन के आधार पर JSX को रिटर्न करें {/*conditionally-returning-jsx*/}

मान लें कि आपके पास एक `PackingList` कौम्पोनॅन्ट है जो कई `Item` रेंडर करता है, जिसे मार्क जा सकता है या नहीं:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ध्यान दें कि कुछ `Item` कौम्पोनॅन्ट का `isPacked` prop `false` के बजाय `true` पर सेट है। आप पैक किए गए आइटम में एक चेकमार्क (✔) ऐड करना चाहते हैं यदि `isPacked={true}` है।

आप इसे [`if`/`else` स्टेटमेंट](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) के रूप में लिख सकते हैं, इस तरह:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

यदि `isPacked` prop `true` है, तो यह कोड **एक अलग JSX ट्री रिटर्न करता है**। इस परिवर्तन के साथ, कुछ चीज़ों को अंत में एक चेकमार्क मिलता है:

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

किसी भी केस में जो रिटर्न आता है उसे बदलने का प्रयास करें, और देखें कि परिणाम कैसे बदलता है!

ध्यान दें कि आप JavaScript के `if` और `return` स्टेटमेंट के साथ ब्रांचिंग लॉजिक कैसे बना रहे हैं। React में, कण्ट्रोल फ्लो  (जैसे की कंडीशंस) को JavaScript से कण्ट्रोल किया जाता है।

### `null` के साथ कंडीशन के आधार पर कुछ कुछ नहीं रिटर्न करना {/*conditionally-returning-nothing-with-null*/}

कुछ कंडीशंस में, आप कुछ भी रेंडर नहीं करना चाहेंगे। उदाहरण के लिए, मान लें कि आप पैक्ड आइटम बिल्कुल नहीं दिखाना चाहते हैं। लेकिन एक कौम्पोनॅन्ट को तो कुछ न कुछ रिटर्न करना होग। इस केस में, आप `null` रिटर्न कर सकते हैं:

```js
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

यदि `isPacked` true है, तो कौम्पोनॅन्ट कुछ भी नहीं रिटर्न करेगा, `null`। नहीं तो, यह JSX को रेंडर करने के लिए रिटर्न कर देगा।

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

अभ्यास में, किसी कौम्पोनॅन्ट से `null` लौटाना आम बात नहीं है क्योंकि यह इसे रेंडर करने की कोशिश कर रहे डेवलपर को आश्चर्यचकित कर सकता है। अधिक बार, आप पैरेंट कौम्पोनॅन्ट के JSX में कौम्पोनॅन्ट को कंडीशनल रूप से शामिल करेंगे या बहार रखेंगे। यहाँ यह कैसे करना है!

## कंडीशन के आधार पर JSX को इंक्लूड करें {/*conditionally-including-jsx*/}

पिछले उदाहरण में, आपने कण्ट्रोल किया था कि कौन सा (यदि कोई हो!) JSX ट्री कौम्पोनॅन्ट से लौटाया जाएगा। आपने पहले ही रेंडर आउटपुट में कुछ डुप्लीकेशन देखा होगा:

```js
<li className="item">{name} ✔</li>
```

इससे बहुत समान है

```js
<li className="item">{name}</li>
```

दोनों कंडीशनल ब्रांचेज `<li className="item">...</li>` रिटर्न करती हैं:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

हालांकि यह डुप्लीकेशन हानिकारक नहीं है, लेकिन यह आपके कोड को मेन्टेन करना कठिन बना सकता है। क्या होगा यदि आप `className` को बदलना चाहते हैं? आपको इसे अपने कोड में दो स्थानों पर करना होगा! ऐसी स्थिति में, आप अपने कोड को और अधिक [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) बनाने के लिए कंडीशनल रूप से थोड़ा JSX शामिल कर सकते हैं।

### कंडीशनल (टरनरी) ऑपरेटर (`? :`) {/*conditional-ternary-operator--*/}

कंडीशनल एक्सप्रेशन लिखने के लिए JavaScript में एक कॉम्पैक्ट सिंटैक्स है - [कंडीशनल ऑपरेटर](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) या "टर्नरी ऑपरेटर।"

इसके बजाये:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

आप इसे लिख सकते हैं:

```js
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

आप इसे इस प्रकार पढ़ सकते हैं *"यदि `isPacked` true है, तो (`?`) `name +' ✔'` रेंडर करें, नहीं तो (`:`) `name` रेंडर करें।"*)

<DeepDive title="क्या ये दो उदाहरण पूरी तरह बराबर हैं?">

यदि आप किसी ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग बैकग्राउंड से आ रहे हैं, तो आप मान सकते हैं कि ऊपर दिए गए दो उदाहरण सूक्ष्म रूप से भिन्न हैं क्योंकि उनमें से एक `<li>` के दो अलग-अलग "इंस्टेंस" बना सकता है। लेकिन JSX एलिमेंट्स "इंस्टेंस" नहीं हैं क्योंकि उनके पास कोई आंतरिक state नहीं है और वे असली DOM नोड नहीं हैं। वे हल्के विवरण हैं, जैसे ब्लूप्रिंट। तो ये दो उदाहरण, असली में, *पूरी तरह* से समान हैं। [State को प्रीज़र्व और रीसेट करना](/learn/preserving-and-resetting-state) विस्तार से बताता है कि यह कैसे काम करता है।

</DeepDive>

अब मान लें कि आप पूर्ण किए गए आइटम के टेक्स्ट को किसी अन्य HTML टैग में ऐड करना चाहते हैं, जैसे `<del>` को बाहर निकालने के लिए। आप और भी नई पंक्तियाँ और पैरेंथेसेस ऐड कर सकते हैं ताकि प्रत्येक केस में अधिक JSX को नेस्टेड करना आसान हो:


<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

यह तरीका साधारण परिकंडीशंस के लिए अच्छी तरह से काम करती है, लेकिन इसे मॉडरेशन में उपयोग करें। यदि आपके कौम्पोनॅन्ट बहुत अधिक नेस्टेड कंडीशनल मार्कअप के साथ कीच-पिच हो जाते हैं, तो चीजों को साफ करने के लिए चाइल्ड कौम्पोनॅन्टस को निकालने पर विचार करें। React में, मार्कअप आपके कोड का एक हिस्सा है, इसलिए आप काम्प्लेक्स एक्सप्रेशंस को व्यवस्थित करने के लिए वेरिएबल और फ़ंक्शन जैसे टूल का उपयोग कर सकते हैं।

### लॉजिकल AND ऑपरेटर  (`&&`) {/*logical-and-operator-*/}

एक और आम शॉर्टकट जो आपको मिलेगा वह है [JavaScript लॉजिकल AND (`&&`) ऑपरेटर](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.)। React कौम्पोनॅन्टस के अंदर, यह अक्सर तब सामने आता है जब आप कंडीशन के true होने पर कुछ JSX को रेंडर करना चाहते हैं, **या अन्यथा कुछ भी रेंडर नहीं करना चाहते हैं।** `&&` के साथ, आप कंडिशनल रूप से चेकमार्क तभी रेंडर कर सकते हैं जब `isPacked` `true` हो:

```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

आप इसे इस रूप में पढ़ सकते हैं *“यदि `isPacked` है, तो (`&&`) चेकमार्क रेंडर करे, अन्यथा, कुछ भी रेंडर न करे।"*

यहाँ यह इस्तेमाल में है:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

एक [JavaScript && एक्सप्रेशन](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) इसके दाईं ओर का वैल्यू रिटर्न करता है (हमारे केस में, चेकमार्क) यदि बाईं ओर (हमारी कंडीशन) `true` है। लेकिन अगर कंडीशन `false` है, तो पूरी एक्सप्रेशन `false` हो जाती है। React JSX ट्री में `true` को "होल" के रूप में मानता है, ठीक `null` या `undefined` की तरह, और इसके स्थान पर कुछ भी रेंडर नहीं करता है।

<Gotcha>

**`&&` के बाईं ओर नंबर न लगाएं।**

कंडीशन को टेस्ट करने के लिए, JavaScript ऑटोमेटिकली बाईं ओर को बूलियन में परिवर्तित कर देता है। हालाँकि, यदि बाईं ओर `0` है, तो संपूर्ण एक्सप्रेशन को वह वैल्यू (`0`) प्राप्त होता है, और React खुशी से `0` को रेंडर कर देगा, न कि कुछ भी नहीं।

उदाहरण के लिए, एक सामान्य गलती `messageCount && <p>New messages</p>` जैसा कोड लिखना है। यह मान लेना आसान है कि `messageCount` `0` होने पर कुछ भी रेंडर नहीं करता है, लेकिन यह वास्तव में `0` को ही रेंडर करता है!

इसे ठीक करने के लिए, बाईं ओर एक बूलियन बनाएं: `messageCount > 0 && <p>New messages</p>`।

</Gotcha>

### कंडीशनली एक वैरिएबल को JSX असाइन करना {/*conditionally-assigning-jsx-to-a-variable*/}

जब शॉर्टकट प्लेन कोड लिखने के रास्ते में आ जाते हैं, तो एक `if` स्टेटमेंट और एक वेरिएबल का उपयोग करके देखें। आप [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) के साथ डिफाइंड वेरिएबल्स को फिर से असाइन कर सकते हैं, इसलिए डिफ़ॉल्ट कंटेंट देके करके शुरु करें जिसे आप डिस्प्ले करना चाहते हैं , नाम:

```js
let itemContent = name;
```

यदि `isPacked` `true` है, तो JSX एक्सप्रेशन को `itemContent` पर फिर से असाइन करने के लिए `if` स्टेटमेंट का उपयोग करें:

```js
if (isPacked) {
  itemContent = name + " ✔";
}
```

[कर्ली ब्रेसिज़ "जावास्क्रिप्ट के लिए एक रास्ता" खोलते है।](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) लौटाए गए JSX ट्री में कर्ली ब्रेसिज़ वाले वेरिएबल को एम्बेड करें, JSX के अंदर पहले से कैलकुलेट की हुई एक्सप्रेशन को नेस्ट करें:

```js
<li className="item">
  {itemContent}
</li>
```

यह तरीका सबसे अधिक वर्बोस है, लेकिन यह सबसे फ्लैक्सीबल भी है। यहाँ यह इस्तेमाल में है:

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

पहले की तरह, यह न केवल टेक्स्ट के लिए, बल्कि मनमाने JSX के लिए भी काम करता है:

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

यदि आप JavaScript से परिचित नहीं हैं, तो इस तरह की तरीके पहली बार में भारी लग सकती हैं। हालांकि, उन्हें सीखने से आपको किसी भी JavaScript कोड को पढ़ने और लिखने में मदद मिलेगी - न कि केवल React कौम्पोनॅन्ट! शुरुआत के लिए आप जो पसंद करते हैं उसे चुनें, और अगर आप भूल जाते हैं कि दूसरे कैसे काम करते हैं तो इस रिफरेन्स को फिर से देखें।

<Recap>

* React में, आप JavaScript के साथ ब्रांचिंग लॉजिक को कण्ट्रोल करते हैं।
* आप एक `if` स्टेटमेंट के साथ कंडिशनल रूप से JSX एक्सप्रेशन रिटर्न कर सकते हैं।
* आप कंडिशनल रूप से कुछ JSX को एक वेरिएबल में सेव कर सकते है और फिर कर्ली ब्रेसिज़ का उपयोग करके इसे अन्य JSX में शामिल कर सकते हैं।
* JSX में, `{cond ? <A /> : <B />}` का अर्थ है *"यदि `cond` है, तो `<A />` रेंडर करें, अन्यथा `<B />`"*।
* JSX में, `{cond && <A />}` का अर्थ है *"यदि `cond`, `<A />` रेंडर करें, अन्यथा कुछ भी नहीं"*।
* शॉर्टकट सामान्य हैं, लेकिन यदि आप प्लेन `if` पसंद करते हैं तो आपको उनका उपयोग करने की आवश्यकता नहीं है।

</Recap>



<Challenges>

### अधूरे आइटम के लिए `? :` के साथ एक आइकन दिखाएं {/*show-an-icon-for-incomplete-items-with--*/}

अगर `isPacked` `true` नहीं है तो एक ❌ रेंडर करने के लिए कंडीशनल ऑपरेटर (`cond ? a : b`) का इस्तेमाल करें।

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✔' : '❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

</Solution>

### आइटम की अहमियत `&&` के साथ दिखाएं {/*show-the-item-importance-with-*/}

इस उदाहरण में, प्रत्येक `Item` को एक संख्यात्मक `importance` prop मिलता है। इटैलिक में "_(Importance: X)_" रेंडर करने के लिए `&&` ऑपरेटर का उपयोग करें, लेकिन केवल उन आइटम्स के लिए जिनमें गैर-शून्य कठिनाई है। आपकी आइटम सूची इस तरह दिखनी चाहिए:

* Space suit _(Importance: 9)_
* Helmet with a golden leaf
* Photo of Tam _(Importance: 6)_

दो लेबल्स के बीच एक स्पेस जोड़ना न भूलें!

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          importance={9}
          name="Space suit"
        />
        <Item
          importance={0}
          name="Helmet with a golden leaf"
        />
        <Item
          importance={6}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

यह काम कर जाना चाहिए:

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>(Importance: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          importance={9}
          name="Space suit"
        />
        <Item
          importance={0}
          name="Helmet with a golden leaf"
        />
        <Item
          importance={6}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ध्यान दें कि आपको `importance && ...` के बजाय `importance > 0 && ...` लिखना होगा ताकि अगर `importance` `0` हो, तो `0` परिणाम के रूप में रेंडर नहीं हो!

इस समाधान में, नाम और importance लेबल के बीच एक स्पेस डालने के लिए दो अलग-अलग कंडीशंस का उपयोग किया गया है। इसके अलावा, आप एक प्रमुख स्पेस के साथ एक फ्रेगमेंट का उपयोग भी कर सकते हैं: `importance > 0 && <> <i>...</i></>` या `<i>` के अंदर शुरुआत में ही एक स्पेस जोड़ें: `importance > 0 && <i> ...</i>`।

</Solution>

### रिफैक्टर करे एक सीरीज `? :` से `if` और वेरिएबल्स {/*refactor-a-series-of---to-if-and-variables*/}

यह `Drink` कौम्पोनॅन्ट `? :` कंडीशंस की एक सीरीज का उपयोग करता है `name` prop `"tea"` या `"coffee"` के आधार पर अलग-अलग जानकारी दिखाने क लिए। समस्या यह है कि प्रत्येक ड्रिंक के बारे में जानकारी कई कंडीशंस में फैली हुई है। तीन `? :` कंडीशंस के बजाय एक `if` स्टेटमेंट का उपयोग करने के लिए इस कोड को दोबारा रिफैक्टर करे।

<Sandpack>

```js
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

एक बार जब आप `if` का उपयोग कर क कोड को रिफैक्टर कर लेते हैं, तो क्या आपके पास इसे सरल बनाने के बारे में और विचार हैं?

<Solution>

इसके बारे में आप कई तरीके अपना सकते हैं, लेकिन यहां एक प्रारंभिक बिंदु है:

<Sandpack>

```js
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

यहां प्रत्येक ड्रिंक के बारे में जानकारी को कई कंडीशंस में फैलाने के बजाय एक साथ ग्रुप किया जाता है। इससे भविष्य में और ड्रिंक ऐड करना आसान हो जाता है।

एक अन्य उपाय यह होगा कि जानकारी को ऑब्जेक्ट्स में मूव करके कंडीशन को पूरी तरह से हटा दिया जाए:

<Sandpack>

```js
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>

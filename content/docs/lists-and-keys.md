---
id: lists-and-keys
title: Lists and Keys
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

पहले, आइए समीक्षा करें कि आप जावास्क्रिप्ट में लिस्ट्स को कैसे बदलते हैं।

नीचे दिए गए कोड में हम `numbers` की एक array के मूल्यों को दोगुना करने के लिए [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) फ़ंक्शन का उपयोग करते हैं। हम `map()` द्वारा दिए गए नए array को `doubled` नाम के वेरिएबल को सौपते हैं और फिर लॉग करते हैं।

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

यह कोड [2, 4, 6, 8, 10] को कंसोल में लोग करता है।

React में, array को [एलिमेंट्स](/docs/rendering-elements.html) की लिस्ट में बदलना लगभग समान है।

### कई कौम्पोनॅन्टस को रेंडर करना {#rendering-multiple-components}

आप एलिमेंट्स का संग्रह बना सकते हैं और कर्ली ब्रेसिज़ `{}` का उपयोग करके [उन्हें JSX में शामिल कर सकते हैं।](/docs/introducing-jsx.html#embedding-expressions-in-jsx)

हमने जावास्क्रिप्ट [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) फंक्शन का उपयोग करके `numbers` नाम की array में लूप लगाया है। हमने प्रत्येक आइटम के लिए `<li>` एलिमेंट को रिटर्न किया है। अंत में, हम परिणामस्वरूप आयी हुई एलिमेंट्स की array को `listItems` को सौपते है:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

हम पुरे `listItems` array को `<ul>` एलिमेंट में शामिल करके इसे [DOM में रेंडर करते हैं](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

यह कोड 1 से 5 के बीच संख्याओं की एक बुलेट लिस्ट प्रदर्शित करता है।

### मूल लिस्टस कौम्पोनॅन्ट {#basic-list-component}

आमतौर पर आप एक [कौम्पोनॅन्ट](/docs/components-and-props.html) के अंदर लिस्ट रेंडर करते हैं। 

हम पिछले उदाहरण को एक कौम्पोनॅन्ट में बदल सकते हैं जो `numbers` की एक array को स्वीकार करता है और एलिमेंटस की लिस्ट को आउटपुट करता है।

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

जब आप यह कोड चलाते हैं, तो आपको एक चेतावनी दी जाती है कि लिस्ट आइटम के लिए एक key प्रदान की जानी चाहिए। "key" एक विशेष स्ट्रिंग एट्रिब्यूट है जिसे आपको एलिमेंटस की सूची बनाते समय शामिल करने की आवश्यकता होती है। हम अगले भाग में चर्चा करेंगे कि यह महत्वपूर्ण क्यों है।

आइए `numbers.map()` के अंदर हमारी लिस्ट आइटम को एक `key`असाइन करें और लापता key की समस्या को ठीक करें।

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Keys {#keys}

Keys React को पहचानने में मदद करती हैं कि कौन से आइटम ऐड किये गए हैं, या हटा दिए गए हैं। एलिमेंट्स को स्टेबल करने के लिए array के अंदर एलिमेंट्स को key दी जानी चाहिए:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Key चुनने का सबसे अच्छा तरीका एक string का उपयोग करना है जो विशिष्ट रूप से अपने सिब्लिंग्स के बीच एक लिस्ट आइटम की पहचान करता है। अक्सर आप अपने डेटा की IDs को key के रूप में उपयोग करेंगे:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

जब आपके पास प्रदान की गई वस्तुओं के लिए स्थिर ID नहीं है, तो आप अंतिम उपाय के रूप में आइटम इंडेक्स का key के रूप में उपयोग कर सकते हैं:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

यदि आइटम का क्रम बदल सकता है तो हम key के लिए इंडेक्स का उपयोग ना करने की सिफारिश करते हैं। इसका नकारात्मक प्रभाव पड़ सकता हैं और यह कौम्पोनॅन्ट की अवस्था के साथ समस्या भी पैदा कर सकता है। अधिक जानकारी के लिए Robin Pokorny के [इंडेक्स को key के रूप में उपयोग करने के नकारात्मक प्रभाव](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) के आर्टिकल को देखें। यदि आप लिस्ट आइटम्स को एक स्पष्ट key नहीं देते हैं, तो React key के रूप में इंडेक्स का उपयोग करता है।

यदि आप अधिक सीखने में रुचि रखते हैं, तो यहाँ [key की आवशयकताओ के बारे में गहराई से स्पष्टीकरणं](/docs/reconciliation.html#recursing-on-children) दिया गया हैं।

### Key के साथ कौम्पोनॅन्टस निकालना {#extracting-components-with-keys}

Keys केवल आस-पास के array के संदर्भ में ही समझ में आती हैं।

उदाहरण के लिए, यदि आप एक ListItem कौम्पोनॅन्ट को [निकालते](/docs/components-and-props.html#extracting-components) हैं, तो आपको key `ListItem` के `<li>` एलिमेंट पर रखने के बजाये array में `<ListItem />` एलिमेंट पर रखनी चाहिए। 

**उदाहरण: key का गलत उपयोग**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**उदाहरण: key का सही उपयोग**

```javascript{2,3,9,10}
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

एक अच्छा नियम यह है `map()` कॉल के एलिमेंट्स को key की आवशयकता होती हैं ।  

### Keys सिर्फ़ सिब्लिंग्स के बीच अद्वितीय होनी चाहिए {#keys-must-only-be-unique-among-siblings}

Arrays के भीतर उपयोग की जाने वाली key उनके सिब्लिंग्स के बीच अद्वितीय होनी चाहिए। हालाँकि उन्हें पूरी तरह से अद्वितीय होने की आवश्यकता नहीं है। हम अलग-अलग arrays के लिए सामान keys का उपयोग कर सकते हैं:

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Keys React के लिए संकेत के रूप में काम करती हैं लेेकिन वह आपके कौम्पोनॅन्टस को नहीं दी जाती हैं। यदि आपको अपने कौम्पोनॅन्ट में समान वैल्यू की आवश्यकता है, तो इसे अलग नाम के साथ स्पष्ट रूप से prop की तरह पास करें:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

ऊपर के उदाहरण के साथ, `Post` कौम्पोनॅन्ट `props.id` पढ़ सकता है, लेकिन `props.key` नहीं।

### JSX में map() को एम्बेड करना {#embedding-map-in-jsx}

ऊपर दिए गए उदाहरणों में हमने एक अलग `listItems` वेरिएबल को घोषित किया था और इसे JSX में शामिल किया था:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX कर्ली ब्रेसिज़ में किसी भी [एक्सप्रेशन की एम्बेडिंग](/docs/introducing-jsx.html#embedding-expressions-in-jsx) करने की अनुमति देता है ताकि हम `map()` के परिणाम को इनलाइन कर सकें:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

कभी-कभी इसका परिणाम स्पष्ट कोड होता है, लेकिन इस शैली का दुरुपयोग भी किया जा सकता है। जैसे जावास्क्रिप्ट में ये आपको तय करना होता है की readability के लिए एक variable को extract करना चाहिए या नहीं। ध्यान रखें कि यदि `map()` बॉडी बहुत नेस्टेड है, तो [कंपोनेंट निकालने](/docs/components-and-props.html#extracting-components) का अच्छा समय हो सकता है।

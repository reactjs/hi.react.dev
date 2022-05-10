---
title: किसी वेबसाइट पर React ऐड करें
---

<Intro>

आपको React के साथ अपनी पूरी वेबसाइट बनाने की जरूरत नहीं है। HTML में React ऐड करने के लिए इंस्टॉलेशन की आवश्यकता नहीं होती है, इसमें एक मिनट का समय लगता है, और आप तुरंत इंटरेक्टिव कौम्पोनॅन्ट को लिखना शुरू कर सकते हैं।

</Intro>

<YouWillLearn>

* एक मिनट में HTML पेज पर React कैसे ऐड करें
* JSX सिंटैक्स क्या है और इसे जल्दी से कैसे आज़माएँ
* प्रोडक्शन के लिए JSX प्रीप्रोसेसर कैसे सेट करें

</YouWillLearn>

## एक मिनट में React ऐड करें {/*add-react-in-one-minute*/}

React को धीरे-धीरे अपनाने के लिए शुरू से ही डिजाइन किया गया है। अधिकांश वेबसाइट पूरी तरह से React के साथ बानी हुई नहीं हैं (और होने की आवश्यकता नहीं है)। यह गाइड दिखाती है कि किसी मौजूदा HTML पेज में कुछ "sprinkles of interactivity" कैसे ऐड करें।

इसे अपनी वेबसाइट या [एक खाली HTML फ़ाइल](https://gist.github.com/gaearon/edf814aeee85062bc9b9830aeaf27b88/archive/3b31c3cdcea7dfcfd38a81905a0052dd8e5f71ec.zip) के साथ आज़माएं। आपको बस एक इंटरनेट कनेक्शन और नोटपैड या VSCode जैसे टेक्स्ट एडिटर की आवश्यकता है। (यहां बताया गया है की सिंटैक्स हाइलाइटिंग के लिए [अपने एडिटर को कैसे कॉन्फ़िगर करें] (/लर्न/एडिटर-सेटअप/)!)

### स्टेप 1: एक रूट HTML टैग ऐड करें {/*step-1-add-a-root-html-tag*/}

सबसे पहले, वह HTML पृष्ठ खोलें जिसे आप एडिट करना चाहते हैं। उस स्थान को मार्क करने के लिए एक खाली `<div>` टैग जोड़ें जहां आप React के  साथ कुछ display करना चाहते हैं। इस `<div>` को एक यूनिक `id` एट्रिब्यूट वैल्यू दें। उदाहरण के लिए:

```html {3}
<!-- ... मौजूदा HTML ... -->

<div id="like-button-root"></div>

<!-- ... मौजूदा HTML ... -->
```

इसे "root" कहा जाता है क्योंकि यह वह जगह है जहाँ से React ट्री शुरू होगा। आप `<body>` टैग के अंदर इस तरह एक रूट HTML टैग कहीं भी रख सकते हैं। इसे खाली छोड़ दें क्योंकि React इसके कंटेंट्स को आपके React कौम्पोनॅन्ट से बदल देगा।

आपके पास एक पेज पर कितने भी रूट HTML टैग्स हो सकते हैं।

### स्टेप 2: Script टैग ऐड करें {/*step-2-add-the-script-tags*/}

HTML पेज में, क्लोजिंग `</body>` टैग से ठीक पहले, निम्न फ़ाइलों के लिए तीन `<script>` टैग ऐड करें:

- [**react.development.js**](https://unpkg.com/react@18/umd/react.development.js) आपको React कौम्पोनॅन्टस को डिफाइन करने देता है।
- [**react-dom.development.js**](https://unpkg.com/react-dom@18/umd/react-dom.development.js) React को HTML एलिमेंट्स [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model) को रेंडर करने देता है।
- **like_button.js** वह जगह है जहाँ आप स्टेप 3 में अपना कौम्पोनॅन्ट लिखेंगे!
  
आपका HTML अब इस तरह समाप्त होना चाहिए:

```html
    <!-- end of the page -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="like-button.js"></script>
  </body>
</html>
```

<Gotcha>

लाइव वेबसाइट पर डेप्लॉय करने से पहले, "development.js" को "production.min.js" से बदलें। React का development बिल्ड अधिक उपयोगी एरर मैसेज दिखता है, लेकिन आपकी वेबसाइट को *बहुत* धीमा कर देता है।

</Gotcha>

```html
  <!-- पेज का अंत -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="like_button.js"></script>
</body>
```

### स्टेप 3: एक React कौम्पोनॅन्ट बनाएँ {/*step-3-create-a-react-component*/}

अपने HTML पेज के बगल में **like_button.js** नाम की एक फाइल बनाएं, इस कोड स्निपेट को ऐड करें और फाइल को सेव करें। यह कोड `LikeButton` नामक एक React कौम्पोनॅन्ट को डिफाइन करता है। ([क्विक स्टार्ट](/learn) में कौम्पोनॅन्ट बनाने के बारे में और जानें!)

```js
'use strict';

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return 'You liked this!';
  }

  return React.createElement(
    'button',
    {
      onClick: () => setLiked(true),
    },
    'Like'
  );
}
```

### स्टेप 4: पेज पर अपना React कौम्पोनॅन्ट ऐड करें {/*step-4-add-your-react-component-to-the-page*/}

अंत में, **like_button.js** के नीचे तीन पंक्तियाँ ऐड करें। कोड की ये पंक्तियाँ पहले स्टेप में आपके द्वारा HTML में ऐड किये गए `<div>` को ढूंढती हैं, एक React रूट बनती है, और फिर उसके अंदर "Like" बटन React कौम्पोनॅन्ट डिस्प्ले करती है:

```js
const domContainer = document.getElementById('कौम्पोनॅन्ट-यहाँ-जाएगा');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(LikeButton));
```

**बधाई हो! आपने अभी-अभी अपनी वेबसाइट पर अपना पहला React कौम्पोनॅन्ट रेंडर किया है!**

- [पूरा उदाहरण सोर्स कोड देखें](https://gist.github.com/gaearon/0b535239e7f39c524f9c7dc77c44f09e)
- [पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/gaearon/0b535239e7f39c524f9c7dc77c44f09e/archive/651935b26a48ac68b2de032d874526f2d0896848.zip)

#### आप कौम्पोनॅन्ट का पुन: उपयोग कर सकते हैं! {/*you-can-reuse-components*/}

आप एक ही HTML पेज पर कई स्थानों पर एक React कौम्पोनॅन्ट को डिस्प्ले करना चाह सकते हैं। यह सबसे उपयोगी है जब पेज के React-संचालित हिस्से एक दूसरे से अलग-थलग हैं। आप अपने HTML में कई रूट टैग डालकर और फिर उनमें से प्रत्येक के अंदर React कौम्पोनॅन्ट को `ReactDOM.createRoot()` के साथ डिस्प्ले करके ऐसा कर सकते हैं। उदाहरण के लिए:

1. **index.html** में, एक और कंटेनर एलिमेंट ऐड करें `<div id="another-root"></div>`.
2. **like_button.js** में, अंत में तीन और पंक्तियाँ ऐड करें:

```js {6,7,8,9}
const anotherRootNode = document.getElementById('another-root');
const anotherRoot = ReactDOM.createRoot(anotherRootNode);
anotherRoot.render(React.createElement(LikeButton));
```

यदि आपको एक ही कौम्पोनॅन्ट को कई स्थानों पर डिस्प्ले करने की आवश्यकता है, तो आप प्रत्येक रूट को `id` के बजाय एक CSS `class` असाइन कर सकते हैं, और फिर उन सभी को ढूंढ सकते हैं। यहां [एक उदाहरण है जो तीन "Like" बटन प्रदर्शित करता है और प्रत्येक को डेटा पास करता है।](https://gist.github.com/gaearon/779b12e05ffd5f51ffadd50b7ded5bc8)

### स्टेप 5: प्रोडक्शन के लिए जावास्क्रिप्ट को छोटा करें {/*step-5-minify-javascript-for-production*/}

अनमिनिफाइड जावास्क्रिप्ट आपके यूज़रस के लिए पेज लोड समय को महत्वपूर्ण रूप से धीमा कर सकता है। अपनी वेबसाइट को प्रोडक्शन में लगाने से पहले, इसकी स्क्रिप्ट को छोटा करना एक अच्छा विचार है।

- **यदि आपके पास अपनी स्क्रिप्ट के लिए छोटा करने का स्टेप नहीं है**, [इसे सेट करने का एक तरीका यहां दिया गया है](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).
- **यदि आप अपनी एप्लिकेशन स्क्रिप्ट को पहले ही छोटा कर चुके हैं**, तो आपकी साइट प्रोडक्शन के लिए तैयार हो जाएगी यदि आप सुनिश्चित करते हैं कि डेप्लॉयड HTML React के संस्करणों को `product.min.js` में समाप्त करता है, जैसे:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
```

## JSX के साथ React का प्रयास करें {/*try-react-with-jsx*/}

ऊपर दिए गए उदाहरण उन विशेषताओं पर निर्भर करते हैं जो नैटिवली ब्राउज़र में सपोर्टेड हैं। यही कारण है कि **`like-button.js`**  React को यह बताने के लिए कि क्या डिस्प्ले करना है एक JavaScript फ़ंक्शन कॉल का उपयोग करता है:

```js
return React.createElement('button', {onClick: () => setLiked(true)}, 'Like');
```

हालाँकि, React इसके बजाय एक HTML-जैसे जावास्क्रिप्ट सिंटैक्स [JSX](/learn/writing-markup-with-jsx), इस्तेमाल करने का ऑप्शन भी प्रदान करता है:

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

ये दो कोड स्निपेट बराबर हैं। JSX जावास्क्रिप्ट में मार्कअप का वर्णन करने के लिए लोकप्रिय सिंटैक्स है। बहुत से लोग इसे React और अन्य लाइब्रेरीज के साथ UI कोड लिखने के लिए परिचित और सहायक पाते हैं।

> आप [इस ऑनलाइन कनवर्टर](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.17) का उपयोग करके HTML मार्कअप को JSX में बदलने के साथ खेल सकते हैं।

### JSX का प्रयास करें {/*try-jsx*/}

JSX को आज़माने का सबसे तेज़ तरीका Babel कंपाइलर को पेज पर `<script>` टैग के रूप में ऐड करना है। इसे **`like-button.js`** से पहले रखें, और फिर `type="text/babel"` एट्रिब्यूट को `<script>` टैग में **`like-button.js`** के लिए ऐड करें:

```html {3,4}
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="like-button.js" type="text/babel"></script>
</body>
```

अब आप **`like-button.js`** खोलें और बदलें

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Like'
);
```

एक्विवैलेन्ट JSX कोड के साथ:

```jsx
return (
  <button onClick={() => setLiked(true)}>
    Like
  </button>
);
```

JS को मार्कअप के साथ मिलाना पहली बार में थोड़ा असामान्य लग सकता है, लेकिन यह आप पर बढ़ेगा! परिचय के लिए [JSX में राइटिंग मार्कअप] (/लर्न/राइटिंग-मार्कअप-विथ-जेएसएक्स) देखें। यहाँ [JSX के साथ एक उदाहरण HTML फ़ाइल](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) है जिसे आप डाउनलोड कर सकते हैं और उसके साथ खेल सकते हैं।

<Gotcha>

Babel `<script>` कंपाइलर सरल डेमो सीखने और बनाने के लिए ठीक है। हालांकि, **यह आपकी वेबसाइट को धीमा बनाता है और प्रोडक्शन के लिए उपयुक्त नहीं है**। जब आप आगे बढ़ने के लिए तैयार हों, तो Babel `<script>` टैग को हटा दें और इस स्टेप में ऐड किये गए `type="text/babel` एट्रिब्यूट को हटा दें। इसके बजाय, अगले भाग में आप अपने सभी `<script>` टैग को JSX से JS में बदलने के लिए JSX प्रीप्रोसेसर सेटअप करेंगे।
  
</Gotcha>

### किसी प्रोजेक्ट में JSX ऐड करें {/*add-jsx-to-a-project*/}

किसी प्रोजेक्ट में JSX को ऐडने के लिए [bundler](/learn/start-a-new-react-project#custom-toolchains) जैसे जटिल टूल या एक डेवलपमेंट सर्वर की आवश्यकता नहीं होती है।JSX प्रीप्रोसेसर ऐड करना एक CSS प्रीप्रोसेसर ऐड करने जैसा है।

टर्मिनल में अपने प्रोजेक्ट फ़ोल्डर में जाएं, और इन दो कमांड्स को पेस्ट करें (**सुनिश्चित करें कि आपने [Node.js](https://nodejs.org/) इंस्टॉल किया हुआ है!**):

1. `npm init -y` (यदि यह फ़ैल होता है, [यहाँ एक समाधान है](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

JSX प्रीप्रोसेसर को सेटअप करने के लिए आपको केवल npm की आवश्यकता है। आपको किसी और चीज के लिए इसकी आवश्यकता नहीं होगी। React और एप्लिकेशन कोड दोनों बिना किसी बदलाव के `<script>` टैग के रूप में रह सकते हैं।

बधाई हो! आपने अभी-अभी अपने प्रोजेक्ट में **प्रोडक्शन के लिए तैयार JSX सेटअप** ऐड किया है।

### JSX प्रीप्रोसेसर चलाएँ {/*run-the-jsx-preprocessor*/}

आप JSX को प्रीप्रोसेस कर सकते हैं ताकि हर बार जब आप किसी फ़ाइल को JSX के साथ सहेजते हैं, तो ट्रांसफ़ॉर्म फिर से चलाया जाएगा, JSX फ़ाइल को एक नई, प्लेन जावास्क्रिप्ट फ़ाइल में परिवर्तित किया जाएगा जिसे ब्राउज़र समझ सकता है। यहां इसे सेट अप करने का तरीका बताया गया है:

1. **`src`** नाम का फोल्डर बनाएं।
2. अपने टर्मिनल में, यह कमांड चलाएँ: `npx babel --watch src --out-dir । --presets React-app/prod` (इसके समाप्त होने की प्रतीक्षा न करें! यह कमांड `src` के अंदर JSX में चंगेस के लिए एक ऑटोमेटेड वॉचर शुरू करता है।)
3. अपना JSX-ified **`like-button.js`** ले जाएँ ([यह इस तरह दिखना चाहिए!](https://gist.githubusercontent.com/gaearon/1884acf8834f1ef9a574a953f77ed4d8/raw/dfc664bbd25992c5278c3bf3d8504424c1104ecf/like) ) नए **`src`** फ़ोल्डर में।

वॉचर ब्राउज़र के लिए उपयुक्त प्लेन जावास्क्रिप्ट कोड के साथ एक प्रीप्रोसेस्ड **`like-button.js`** बनाएगा।

<Gotcha>

यदि आपको यह कहते हुए एक एरर मैसेज दिखाई देता है कि "आपने गलती से `babel` पैकेज सेटअप कर लिया है", तो आप [पिछला स्टेप](#add-jsx-to-a-project) चूक गए होंगे। इसे उसी फ़ोल्डर में निष्पादित करें, और फिर पुन: प्रयास करें।

</Gotcha>

आपके द्वारा अभी-अभी उपयोग किए गए टूल को Babel कहा जाता है, और आप इसके बारे में [इसके डॉक्यूमेंटेशन](https://babeljs.io/docs/en/babel-cli/) से अधिक जान सकते हैं। JSX के अलावा, यह आपको पुराने ब्राउज़रों में ब्रेक होने की चिंता किए बिना लेटेस्ट जावास्क्रिप्ट सिंटैक्स फीचर्स का उपयोग करने देता है।

यदि आप बिल्ड टूल्स के साथ कम्फ़र्टेबल हो रहे हैं और चाहते हैं कि वे आपके लिए और अधिक करें, [हम यहां कुछ सबसे लोकप्रिय और पहुंचने योग्य टूलचेन को कवर करते हैं](/learn/start-a-new-react-project)।

<DeepDive title="React बिना JSX के">

कोर रूप से JSX को React के कौम्पोनॅन्ट लिखने को HTML लिखने के रूप में परिचित बनाने के लिए पेश किया गया था। तब से, वाक्यविन्यास व्यापक हो गया है। हालाँकि, ऐसे उदाहरण हो सकते हैं जहाँ आप JSX का उपयोग नहीं करना चाहते हैं या नहीं कर सकते हैं। आपके पास दो ऑप्शन हैं:

- [htm](https://github.com/developit/htm) जैसे JSX अल्टरनेटिव का उपयोग करें जो एक कंपाइलर के बजाय जावास्क्रिप्ट [टेम्पलेट स्ट्रिंग्स] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) का उपयोग करता है।
- [`React.createElement()`](/apis/createelement) का उपयोग करें, जिसकी एक स्पेशल स्ट्रक्चर के बारे में नीचे बताया गया है।

JSX के साथ, आप एक कौम्पोनॅन्ट लिखेंगे जैसे:

```jsx
function Hello(props) {
  return <div>Hello {props.toWhat}</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />, );
```

With `React.createElement()`, you would write it like this:

```js
function Hello(props) {
  return React.createElement('div', null, 'Hello ', props.toWhat);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(Hello, { toWhat: 'World' }, null)
);
```

यह कई आर्ग्यूमेंट्स को एक्सेप्ट करता है: `React.createElement(component, props, ...children)`।

यहां बताया गया है कि वे कैसे काम करते हैं:

1. एक **कौम्पोनॅन्ट**, जो एक HTML एलिमेंट या एक फ़ंक्शन कौम्पोनॅन्ट का रिप्रजेंटेशन करने वाला एक स्ट्रिंग हो सकता है
2. किसी भी [**props** का एक ऑब्जेक्ट जो आप पास करना चाहते हैं](/learn/passing-props-to-a-component)
3. बाकी **children** जो कौम्पोनॅन्ट में हो सकते हैं, जैसे टेक्स्ट स्ट्रिंग या अन्य एलिमेंट्स

यदि आप `React.createElement()` टाइप करते-करते थक गए हैं, तो एक सामान्य पैटर्न शॉर्टहैंड असाइन करना है:

```js
const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));
```

फिर, यदि आप इस स्टाइल को प्रिफर करते हैं, तो यह JSX जितना ही सुविधाजनक हो सकता है।

</DeepDive>

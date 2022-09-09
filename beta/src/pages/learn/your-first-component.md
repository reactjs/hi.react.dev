---
title: आपका पहला कौम्पोनॅन्ट
---

<Intro>

*कौम्पोनॅन्टस* React की मुख्य अवधारणाओं में से एक हैं। वे नींव हैं जिस पर आप यूजर इंटरफेस (UI) का निर्माण करते हैं, जो उन्हें आपकी React यात्रा शुरू करने के लिए एक आदर्श स्थान बनाता है!

</Intro>

<YouWillLearn>

* एक कौम्पोनॅन्ट क्या है
* React एप्लिकेशन में कौम्पोनॅन्ट क्या भूमिका निभाते हैं
* अपना पहला React कौम्पोनॅन्ट कैसे लिखें

</YouWillLearn>

## कौम्पोनॅन्ट: UI बिल्डिंग ब्लॉक्स {/*components-ui-building-blocks*/}

Web पर, HTML हमें `<h1>` और `<li>` जैसे टैग के अंतर्निहित सेट के साथ रिच स्ट्रक्चर्ड डाक्यूमेंट्स बनाने देता है:

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

यह मार्कअप इस आर्टिकल `<article>`, इसके शीर्षक `<h1>`, और एक (संक्षिप्त) टेबल ऑफ़ कंटेंट्सा को एक ऑर्डर्ड लिस्टी `<ol>` के रूप में दर्शाता है। इस तरह का मार्कअप, स्टाइल के लिए CSS के साथ मिला के, और जावास्क्रिप्ट इंटरएक्टिविटी के लिए, प्रत्येक साइडबार, अवतार, मोडल, ड्रॉपडाउन के पीछे रहता है — UI का हर टुकड़ा जो आप Web पर देखते हैं।

React आपको अपने मार्कअप, CSS और जावास्क्रिप्ट को कस्टम "कौम्पोनॅन्ट," **आपके एप्प के लिए री-यूज़ब्ले UI एलिमेंट्स** में संयोजित करने देता है। ऊपर देखी गई टेबल ऑफ़ कंटेंट्स कोड को `<TableOfContents />` कौम्पोनॅन्ट में बदल दिया जा सकता है जो आप हर पेज पर रेंडर कर सकते हैं। अंडर हुड, यह अभी भी HTML टैग जैसे `<article>`, `<h1>`, आदि का उपयोग करता है।

HTML टैग्स की तरह ही, आप संपूर्ण पेज को डिज़ाइन करने के लिए कौम्पोनॅन्ट को कंपोज़, ऑर्डर और नेस्ट कर सकते हैं। उदाहरण के लिए, आप जिस डॉक्यूमेंटेशन पेज को पढ़ रहे हैं वह React कौम्पोनॅन्ट से बना है:

```js
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

जैसे-जैसे आपका प्रोजेक्ट बढ़ताी है, आप देखेंगे कि आपके कई डिज़ाइन आपके द्वारा पहले से लिखे गए कौम्पोनॅन्ट का पुन: उपयोग करके, आपके डेवलपमेंट की गति को बढ़ाते हैं। ऊपर दिए गए हमारे टेबल ऑफ़ कंटेंट्स `<TableOfContents />` के साथ किसी भी स्क्रीन पर ऐड किया जा सकता है! आप React ओपन सोर्स कम्युनिटी जैसे [Chakra UI](https://chakra-ui.com/) और [Material UI](https://material-ui.com/) द्वारा शेयर किए गए हजारों कौम्पोनॅन्ट के साथ अपने प्रोजेक्टा को एक शुरुआत दे सकते हैं।

## एक कौम्पोनॅन्ट को डिफाइन करना {/*defining-a-component*/}

परंपरागत रूप से वेब पेज बनाते समय, वेब डेवलपर्स अपने कंटेंट को मार्कअप करते हैंा और फिर कुछ जावास्क्रिप्ट पर ऐड करके इंटरेक्शन ऐड करते हैं। यह तब बहुत अच्छा काम करता था जब वेब पर इंटरेक्शन एक अच्छी सुविधा थी। अब यह कई साइटों और सभी ऐप्स के लिए एक्सपेक्टेड है। React एक ही टेक्नोलॉजी का इस्तेमाल करते हुए इंटरएक्टिविटी को पहले रखता है: **एक React कौम्पोनॅन्ट एक जावास्क्रिप्ट फ़ंक्शन है जिसे आप _मार्कअप के साथ स्प्रिंकल सकते हैं_**। यह ऐसा दिखता है (आप नीचे दिए गए उदाहरण को एडिट कर सकते हैं):

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  );
}
```

```css
img { height: 200px; }
```

</Sandpack>

 और यहाँ एक कौम्पोनॅन्ट बनाने का तरीका बताया गया है:

### Step 1: कौम्पोनॅन्ट एक्सपोर्ट करें {/*step-1-export-the-component*/}

`export default` प्रीफिक्स एक [स्टैण्डर्ड जावास्क्रिप्ट सिंटेक्स](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) है (React के लिए स्पेसिफिक नहीं)। यह आपको फ़ाइल में मैन फ़ंक्शन को मार्क करने देता है ताकि आप बाद में इसे अन्य फ़ाइलों से इम्पोर्ट कर सकें। ([इम्पॉर्टिंग एंड एक्सपोर्टिंग कौम्पोनॅन्टस](/learn/importing-and-exporting-components) में इम्पॉर्टिंग के बारे में और अधिक जानें!)

### Step 2: फ़ंक्शन को डिफाइन करें {/*step-2-define-the-function*/}

`function Profile() { }` के साथ आप `Profile` नाम से एक जावास्क्रिप्ट फ़ंक्शन को डिफाइन करते हैं।

<Gotcha>

React कौम्पोनॅन्ट नियमित जावास्क्रिप्ट फ़ंक्शन हैं, लेकिन **उनके नाम बड़े अक्षर से शुरू होने चाहिए** नहीं तो वे काम नहीं करेंगे!

</Gotcha>

### Step 3: मार्कअप ऐड करें {/*step-3-add-markup*/}

कौम्पोनॅन्ट `src` और `alt` ऐट्रिब्यूट्स के साथ एक `<img />` रिटर्न करता है। `<img />` HTML की तरह लिखा गया है, लेकिन वास्तव में यह जावास्क्रिप्ट है! इस सिंटैक्स को [JSX](/learn/writing-markup-with-jsx) कहा जाता है, और यह आपको जावास्क्रिप्ट के अंदर मार्कअप एम्बेड करने देता है।

रिटर्न स्टेटमेंट सभी को एक लाइन पर लिखा जा सकता है, जैसा कि इस कौम्पोनॅन्ट में है:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

लेकिन अगर आपका मार्कअप `return` कीवर्ड की तरह एक ही लाइन पर नहीं है, तो आपको इसे इस तरह के ब्रैकेट्स की एक जोड़ी में लपेटना होगा:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Gotcha>

ब्रैकेट के बिना, `return` के बाद लाइनों पर लिखा कोई भी कोड [इग्नोर हो जाएगा](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Gotcha>

## एक कौम्पोनॅन्ट का उपयोग करना {/* using-a-component */}

अब जब आपने अपना `Profile` कौम्पोनॅन्ट परिभाषित कर लिया है, तो आप इसे अन्य कौम्पोनॅन्ट के अंदर घोंसला बना सकते हैं। उदाहरण के लिए, आप एक `Gallery` कौम्पोनॅन्ट निर्यात कर सकते हैं जो एकाधिक `Profile` कौम्पोनॅन्ट का उपयोग करता है:

<Sandpack>

```js
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img {
  margin: 0 10px 10px 0;
  height: 90px;
}
```

</Sandpack>

### ब्राउज़र क्या देखता है {/* what-the-browser-sees */}

आवरण में अंतर पर ध्यान दें:

- `<section>` लोअरकेस है, इसलिए React जानता है कि हम एक HTML टैग को संदर्भित करते हैं।
- `<Profile />` पूंजी `P` से शुरू होता है, इसलिए React जानता है कि हम `Profile` नामक हमारे कौम्पोनॅन्ट का उपयोग करना चाहते हैं।

और `Profile` में और भी अधिक HTML शामिल हैं: `<img />`। अंत में, ब्राउज़र यही देखता है:

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### कौम्पोनॅन्ट को घोंसला बनाना और व्यवस्थित करना {/* nesting-and-organizing-components */}

कौम्पोनॅन्ट नियमित जावास्क्रिप्ट फ़ंक्शन हैं, इसलिए आप एक ही फ़ाइल में कई कौम्पोनॅन्ट को रख सकते हैं। यह तब सुविधाजनक होता है जब कौम्पोनॅन्ट अपेक्षाकृत छोटे होते हैं या एक दूसरे से कसकर जुड़े होते हैं। यदि इस फ़ाइल में भीड़ हो जाती है, तो आप हमेशा `Profile` को एक अलग फ़ाइल में ले जा सकते हैं। आप इसे जल्दी ही [page about imports](/learn/importing-and-exporting-components) पर सीखेंगे।

चूंकि `Profile` कौम्पोनॅन्ट `Gallery` के अंदर प्रस्तुत किए जाते हैं—यहां तक कि कई बार!—हम कह सकते हैं कि `Gallery` एक **मूल कौम्पोनॅन्ट है,** प्रत्येक `Profile` को "बच्चे" के रूप में प्रस्तुत करता है। यह React के जादू का हिस्सा है: आप एक कौम्पोनॅन्ट को एक बार परिभाषित कर सकते हैं, और फिर इसे कई जगहों पर और जितनी बार चाहें उपयोग कर सकते हैं।

<DeepDive title="Components All the Way Down">

आपका React एप्लिकेशन "रूट" कौम्पोनॅन्ट से शुरू होता है। आमतौर पर, जब आप कोई नया प्रोजेक्ट शुरू करते हैं तो यह अपने आप बन जाता है। उदाहरण के लिए, अगर आप [CodeSandbox](https://codesandbox.io/) या [Create React App](https://create-react-app.dev/) का इस्तेमाल करते हैं, तो रूट कौम्पोनॅन्ट को `src/App.js` में परिभाषित किया गया है। अगर आप [Next.js](https://nextjs.org/) फ्रेमवर्क का इस्तेमाल करते हैं, तो रूट कौम्पोनॅन्ट `page/index.js` में परिभाषित होता है। इन उदाहरणों में, आप मूल कौम्पोनॅन्ट का निर्यात कर रहे हैं।

अधिकांश React ऐप्स सभी तरह से कौम्पोनॅन्ट का उपयोग करते हैं। इसका मतलब है कि आप न केवल बटन जैसे पुन: प्रयोज्य टुकड़ों के लिए कौम्पोनॅन्ट का उपयोग करेंगे, बल्कि साइडबार, सूचियों और अंततः पूर्ण पृष्ठों जैसे बड़े टुकड़ों के लिए भी! कौम्पोनॅन्ट UI कोड और मार्कअप को व्यवस्थित करने का एक आसान तरीका है, भले ही उनमें से कुछ का उपयोग केवल एक बार किया गया हो।

Next.js जैसे फ्रेमवर्क इसे एक कदम आगे ले जाते हैं। एक खाली HTML फ़ाइल का उपयोग करने और जावास्क्रिप्ट के साथ पेज को प्रबंधित करने के लिए React को "टेक ओवर" करने देने के बजाय, वे आपके React कौम्पोनॅन्ट से स्वचालित रूप से HTML उत्पन्न करते हैं। यह आपके ऐप को जावास्क्रिप्ट कोड लोड होने से पहले कुछ सामग्री दिखाने की अनुमति देता है।

फिर भी, कई वेबसाइटें केवल React का उपयोग करती हैं [add "sprinkles of interactivity"](/learn/add-react-to-a-website)। उनके पास पूरे पृष्ठ के लिए एक के बजाय कई मूल कौम्पोनॅन्ट हैं। आप जितना चाहें उतना उपयोग कर सकते हैं - या जितना कम - React दें।

</DeepDive>

<Recap>

आपने अभी-अभी React का अपना पहला स्वाद प्राप्त किया है! आइए कुछ प्रमुख बिंदुओं का पुनर्कथन करें।

- React आपको कौम्पोनॅन्ट बनाने देता है, **आपके ऐप के लिए पुन: प्रयोज्य UI तत्व।**
- React ऐप में, UI का हर टुकड़ा एक कौम्पोनॅन्ट है।
- React कौम्पोनॅन्ट नियमित जावास्क्रिप्ट कार्य हैं सिवाय:

  1. उनके नाम हमेशा बड़े अक्षर से शुरू होते हैं।
  2. वे JSX मार्कअप लौटाते हैं।

</Recap>

<Challenges>

### कौम्पोनॅन्ट निर्यात करें {/* export-the-component */}

यह sandbox काम नहीं करता क्योंकि मूल कौम्पोनॅन्ट निर्यात नहीं किया जाता है:

<Sandpack>

```js
function Profile() {
  return <img src="https://i.imgur.com/lICfvbD.jpg" alt="Aklilu Lemma" />;
}
```

```css
img {
  height: 181px;
}
```

</Sandpack>

समाधान देखने से पहले इसे स्वयं ठीक करने का प्रयास करें!

<Solution>

फ़ंक्शन परिभाषा से पहले `export default` जोड़ें जैसे:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/lICfvbD.jpg" alt="Aklilu Lemma" />;
}
```

```css
img {
  height: 181px;
}
```

</Sandpack>

आप सोच रहे होंगे कि इस उदाहरण को ठीक करने के लिए केवल `export` लिखना ही पर्याप्त क्यों नहीं है। आप [Importing and Exporting Components](/learn/importing-and-exporting-components) में `export` और `export default` के बीच अंतर जान सकते हैं।

</Solution>

### रिटर्न स्टेटमेंट को ठीक करें {/* fix-the-return-statement */}

इस `return` स्टेटमेंट में कुछ गलत है। क्या तुम इसे ठीक कर सकते हो?

<Hint>

इसे ठीक करने का प्रयास करते समय आपको "Unexpected token" त्रुटि मिल सकती है। उस स्थिति में, जांचें कि अर्धविराम _after_ समापन कोष्ठक प्रकट होता है। `return ( )` के अंदर अर्धविराम छोड़ने से एक त्रुटि होगी।

</Hint>

<Sandpack>

```js
export default function Profile() {
  return;
  <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img {
  height: 180px;
}
```

</Sandpack>

<Solution>

आप रिटर्न स्टेटमेंट को एक लाइन में ले जाकर इस कौम्पोनॅन्ट को ठीक कर सकते हैं:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img {
  height: 180px;
}
```

</Sandpack>

या लौटाए गए JSX मार्कअप को कोष्ठक में लपेटकर जो `return` के ठीक बाद खुलता है:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img {
  height: 180px;
}
```

</Sandpack>

</Solution>

### गलती का पता लगाएं {/* spot-the-mistake */}

'Profile' कौम्पोनॅन्ट को कैसे घोषित और उपयोग किया जाता है, इसमें कुछ गड़बड़ है। क्या आप गलती का पता लगा सकते हैं? (याद रखने की कोशिश करें कि कैसे React नियमित HTML टैग से कौम्पोनॅन्ट को अलग करता है!)

<Sandpack>

```js
function profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
```

```css
img {
  margin: 0 10px 10px 0;
  height: 90px;
}
```

</Sandpack>

<Solution>

React कौम्पोनॅन्ट नाम बड़े अक्षर से शुरू होने चाहिए।

`function profile ()` को `function Profile ()` में बदलें, और फिर प्रत्येक `<profile />` को `<Profile />` में बदलें:

<Sandpack>

```js
function Profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img {
  margin: 0 10px 10px 0;
}
```

</Sandpack>

</Solution>

### आपका अपना कौम्पोनॅन्ट {/* your-own-component */}

Scratch से एक कौम्पोनॅन्ट लिखें। आप इसे कोई भी मान्य नाम दे सकते हैं और कोई मार्कअप वापस कर सकते हैं। यदि आपके पास विचार नहीं हैं, तो आप एक `Congratulations` कौम्पोनॅन्ट लिख सकते हैं जो `<h1>Good job!</h1>` दिखाता है। इसे निर्यात करना न भूलें!

<Sandpack>

```js
// Write your component below!
```

</Sandpack>

<Solution>

<Sandpack>

```js
export default function Congratulations() {
  return <h1>Good job!</h1>;
}
```

</Sandpack>

</Solution>

</Challenges>

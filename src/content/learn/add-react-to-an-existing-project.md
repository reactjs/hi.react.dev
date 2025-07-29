---
title: किसी मौजूदा प्रोजेक्ट में React जोड़ें
---

<Intro>

यदि आप अपने मौजूदा प्रोजेक्ट में कुछ अन्तरक्रियाशीलता जोड़ना चाहते हैं, तो आपको इसे React में फिर से लिखने की आवश्यकता नहीं है।अपने मौजूदा स्टैक में React जोड़ें, और कहीं भी इंटरैक्टिव React घटकों को प्रस्तुत करें।

</Intro>

<Note>

**आपको स्थापित करने की आवश्यकता है [Node.js](https://nodejs.org/en/) स्थानीय विकास के लिए।** हालांकि आप कर सकते हैं [try React](/learn/installation#try-react) ऑनलाइन या एक साधारण HTML पेज के साथ, वास्तविक रूप से सबसे जावास्क्रिप्ट टूलिंग जिसे आप विकास के लिए उपयोग करना चाहते हैं, नोड की आवश्यकता होती है।

</Note>

## अपनी मौजूदा वेबसाइट के संपूर्ण सबरूट के लिए React का उपयोग करना {/*using-react-for-an-entire-subroute-of-your-existing-website*/}

मान लीजिए कि आपके पास एक मौजूदा वेब ऐप है `example.com` एक अन्य सर्वर तकनीक के साथ बनाया गया है (जैसे Rails), और आप पूरी तरह से React के साथ `example.com/some-app/`शुरू होने वाले सभी मार्गों को लागू करना चाहते हैं।

यहां बताया गया है कि हम इसे कैसे सेट करने की सलाह देते हैं:

1. **अपने ऐप के React भाग का निर्माण करें** इनमें से एक का उपयोग करके [React-based frameworks](/learn/start-a-new-react-project)।
2. **निर्दिष्ट करना `/some-app` अपने फ्रेमवर्क के कॉन्फ़िगरेशन में *बेस पथ***  के रूप में (यहां कैसे है: [Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/))।
3. **अपने सर्वर या एक प्रॉक्सी सर्वर को कॉन्फ़िगर करें**ताकि सभी अनुरोधों को `/some-app/` आपके React ऐप द्वारा नियंत्रित किया जाए।
   
यह सुनिश्चित करता है कि आपके ऐप का React हिस्सा हो सकता है [सर्वोत्तम प्रथाओं से लाभ](/learn/creating-a-react-app#full-stack-frameworks) उन फ्रेमवर्क में पका हुआ।

कई React-आधारित फ्रेमवर्क full-stack हैं और आपके React ऐप को सर्वर का लाभ उठाते हैं।हालाँकि, आप उसी दृष्टिकोण का उपयोग कर सकते हैं, भले ही आप सर्वर पर जावास्क्रिप्ट नहीं चलाना चाहते हैं या नहीं चाहते हैं।उस स्थिति में, HTML/CSS/JS निर्यात परोसें([`next export` output](https://nextjs.org/docs/advanced-features/static-html-export) Next.js के लिए, GATSBY के लिए डिफ़ॉल्ट) इसके `/some-app/` बजाय।

## अपनी मौजूदा वेबसाइट के संपूर्ण सबरूट के लिए React का उपयोग करना {/*using-react-for-a-part-of-your-existing-page*/}

मान लीजिए कि आपके पास एक मौजूदा पेज है जो किसी अन्य तकनीक (या तो एक सर्वर की तरह Rail, या Backbone जैसा एक ग्राहक है) के साथ बनाया गया है, और आप उस पृष्ठ पर कहीं न कहीं इंटरैक्टिव React घटकों को प्रस्तुत करना चाहते हैं।यह React को एकीकृत करने का एक सामान्य तरीका है-वास्तव में, यह है कि सबसे अधिक React उपयोग कई वर्षों तक मेटा को कैसे देखा!

आप इसे दो चरणों में कर सकते हैं:

1. **एक जावास्क्रिप्ट वातावरण स्थापित करें**  जो आपको उपयोग करने देता है [JSX syntax](/learn/writing-markup-with-jsx), अपने कोड को मॉड्यूल में विभाजित करें[`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) सिंटैक्स, और पैकेज का उपयोग करें (उदाहरण के लिए, React) से [npm](https://www.npmjs.com/) पैकेज रजिस्ट्री।
2. **अपने React घटकों को रेंडर करें** जहां आप उन्हें पृष्ठ पर देखना चाहते हैं।

सटीक दृष्टिकोण आपके मौजूदा पेज सेटअप पर निर्भर करता है, इसलिए चलो कुछ विवरणों के माध्यम से चलते हैं।

### चरण 1: एक मॉड्यूलर जावास्क्रिप्ट वातावरण सेट करें {/*step-1-set-up-a-modular-javascript-environment*/}

एक मॉड्यूलर जावास्क्रिप्ट वातावरण आपको व्यक्तिगत फ़ाइलों में अपने React घटकों को लिखने देता है, जैसा कि आपके सभी कोड को एक ही फ़ाइल में लिखने का विरोध करता है।यह आपको [npm](https://www.npmjs.com/) रजिस्ट्री पर अन्य डेवलपर्स द्वारा प्रकाशित सभी अद्भुत पैकेजों का उपयोग करने की सुविधा भी देता है।आप यह कैसे करते हैं यह आपके मौजूदा सेटअप पर निर्भर करता है:

* **यदि आपका ऐप पहले से ही उन फ़ाइलों में विभाजित है जो `import` स्टेटमेंट का उपयोग करती हैं, तो,** आपके पास पहले से मौजूद सेटअप का उपयोग करने का प्रयास करें।जांचें कि क्या आपके JS कोड में `<div />` लिखना एक सिंटैक्स त्रुटि का कारण बनता है।यदि यह एक सिंटैक्स त्रुटि का कारण बनता है, तो आपको [बाबेल के साथ अपने जावास्क्रिप्ट कोड को बदलने की आवश्यकता हो सकती है](https://babeljs.io/setup),और JSX का उपयोग करने के लिए [बैबेल रिएक्ट प्रीसेट](https://babeljs.io/docs/babel-preset-react) को सक्षम करें।

* **यदि आपके ऐप में जावास्क्रिप्ट मॉड्यूल को संकलित करने के लिए मौजूदा सेटअप नहीं है, तो** इसे [Vite](https://vite.dev/) के साथ सेट करें। VITE समुदाय [बैकएंड फ्रेमवर्क के साथ कई एकीकरण](https://github.com/vitejs/awesome-vite#integrations-with-backends) को बनाए रखता है, जिसमें Rail, Django और Laravel शामिल हैं।यदि आपका बैकएंड फ्रेमवर्क सूचीबद्ध नहीं है, तो [इस गाइड का पालन करें](https://vitejs.dev/guide/backend-integration.html) मैन्युअल रूप से आपके बैकएंड के साथ VITE बिल्ड को एकीकृत करने के लिए।

यह जांचने के लिए कि आपका सेटअप काम करता है, इस कमांड को अपने प्रोजेक्ट फ़ोल्डर में चलाएं:

<TerminalBlock>
npm install react react-dom
</TerminalBlock>

फिर अपनी मुख्य जावास्क्रिप्ट फ़ाइल के शीर्ष पर कोड की इन पंक्तियों को जोड़ें (इसे `index.js` या` main.js` कहा जा सकता है):

<Sandpack>

```html public/index.html hidden
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <!-- Your existing page content (in this example, it gets replaced) -->
    <div id="root"></div>
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

</Sandpack>

यदि आपके पृष्ठ की पूरी सामग्री को "हैलो, वर्ल्ड!" द्वारा बदल दिया गया था, तो सब कुछ काम किया!पढ़ते रहिये।

<Note>

पहली बार एक मौजूदा परियोजना में एक मॉड्यूलर जावास्क्रिप्ट वातावरण को एकीकृत करना डराने वाला महसूस कर सकता है, लेकिन यह इसके लायक है!यदि आप अटक जाते हैं, तो हमारे [सामुदायिक संसाधन](/community) या [Vite चैट](https://chat.vite.dev/) का प्रयास करें।

</Note>

### चरण 2: पृष्ठ पर कहीं भी React घटकों को रेंडर करें {/*step-2-render-react-components-anywhere-on-the-page*/}

पिछले चरण में, आप इस कोड को अपनी मुख्य फ़ाइल के शीर्ष पर डालते हैं:

```js
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

बेशक, आप वास्तव में मौजूदा HTML सामग्री को साफ नहीं करना चाहते हैं!

इस कोड को हटाएं।

इसके बजाय, आप शायद अपने HTML में विशिष्ट स्थानों में अपने React घटकों को प्रस्तुत करना चाहते हैं।अपना HTML पेज (या इसे उत्पन्न करने वाले सर्वर टेम्प्लेट) खोलें और एक अद्वितीय [`id`](https://developer.mozilla.org/en-us/docs/web/html/global_attributes/id) जोड़ें।टैग, उदाहरण के लिए:

```html
<!-- ... somewhere in your html ... -->
<nav id="navigation"></nav>
<!-- ... more html ... -->
```

यह आपको यह पता लगाने देता है कि HTML तत्व [`document.getElementByid`](https://developer.mozilla.org/en-us/docs/web/api/document/getelementbyid) के साथ और [`createroot`](/reference/react-dom/client/createRoot) को पास करता है ताकि आप अपने स्वयं के रिएक्ट घटक को अंदर प्रस्तुत कर सकें:

<Sandpack>

```html public/index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <p>This paragraph is a part of HTML.</p>
    <nav id="navigation"></nav>
    <p>This paragraph is also a part of HTML.</p>
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <h1>Hello from React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

</Sandpack>

ध्यान दें कि `index.html` से मूल HTML सामग्री कैसे संरक्षित है, लेकिन आपका अपना` नेविगेशनबार` React घटक अब आपके HTML से `<nav id =" नेविगेशन ">` के अंदर दिखाई देता है।मौजूदा HTML पृष्ठ के अंदर React घटकों को प्रस्तुत करने के बारे में अधिक जानने के लिए [`createroot` उपयोग दस्तावेज़](/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react) पढ़ें।

<<<<<<< HEAD
जब आप किसी मौजूदा प्रोजेक्ट में React को अपनाते हैं, तो छोटे इंटरैक्टिव घटकों (जैसे बटन) के साथ शुरू करना आम है, और फिर धीरे -धीरे "ऊपर की ओर बढ़ते" रहें जब तक कि आपका पूरा पेज React के साथ नहीं बन जाता।यदि आप कभी भी उस बिंदु तक पहुँचते हैं, तो हम React से बाहर निकलने के बाद [एक रिएक्ट फ्रेमवर्क](/learn/start-a-new-react-project) पर माइग्रेट करने की सलाह देते हैं।
=======
When you adopt React in an existing project, it's common to start with small interactive components (like buttons), and then gradually keep "moving upwards" until eventually your entire page is built with React. If you ever reach that point, we recommend migrating to [a React framework](/learn/creating-a-react-app) right after to get the most out of React.
>>>>>>> d52b3ec734077fd56f012fc2b30a67928d14cc73

## एक मौजूदा native मोबाइल ऐप में React native का उपयोग करना {/*using-react-native-in-an-existing-native-mobile-app*/}

[React native](https://reactnative.dev/) को भी मौजूदा native ऐप्स में एकीकृत किया जा सकता है।यदि आपके पास Android (Java या Kotlin) या iOS (ऑब्जेक्टिव-C या स्विफ्ट) के लिए एक मौजूदा native ऐप है, तो [इस गाइड का पालन करें](https://reactnative.dev/docs/integration-with-existing-apps)एक React native स्क्रीन जोड़ने के लिए।

---
title: किसी वेबसाइट पर React ऐड करें
---

<Intro>

<<<<<<< HEAD
React को शुरू से ही धीरे-धीरे अपनाने के लिए डिज़ाइन किया गया है, और आप जितना चाहें उतना कम या ज्यादा React का उपयोग कर सकते हैं। चाहे आप माइक्रो-फ्रंटेंड, या एक मौजूदा सिस्टम के साथ काम कर रहे हों, या सिर्फ React को आज़मा रहे हों, आप HTML पेज पर इंटरेक्टिव React कौम्पोनॅन्ट के कोड की कुछ पंक्तियों के साथ ऐड करना शुरू कर सकते हैं - और कोई बिल्ड टूलिंग की ज़रूरत नहीं!

</Intro>

## एक मिनट में React ऐड करें {/*add-react-in-one-minute*/}

आप एक मिनट से भी कम समय में मौजूदा HTML पेज पर एक React कौम्पोनॅन्ट ऐड कर सकते हैं। इसे अपनी वेबसाइट या [एक खाली HTML फ़ाइल](https://gist.github.com/rachelnabors/7b33305bf33776354797a2e3c1445186/archive/859eac2f7079c9e1f0a6eb818a9684a464064d80.zip) के साथ आज़माएं—आपको बस एक इंटरनेट कनेक्शन और नोटपैड (या VSCode—को [कैसे सेट अप करें](/learn/editor-setup/) इस पर हमारी गाइड देखें) जैसे टेक्स्ट एडिटर की आवश्यकता है!

### स्टेप 1: HTML में एक एलिमेंट ऐड करें {/*step-1-add-an-element-to-the-html*/}

जिस HTML पेज को एडिट करके आप React के साथ कुछ डिस्प्ले करना चाहते हैं, वहां पर  एक खाली `<div>` टैग के साथ एक यूनिक ‘id’ वाला HTML एलिमेंट ऐड करें।

आप इस तरह का "कंटेनर" एलिमेंट `<div>` को `<body>` टैग के अंदर कहीं भी रख सकते हैं। React HTML एलिमेंट के अंदर किसी भी मौजूदा कंटेंट को बदल देगा, इसलिए वे आमतौर पर खाली होते हैं। आप अपनी ज़रूरत के हिसाब से ऐसे कितने भी HTML एलिमेंट्स एक पेज पर इस्तेमाल कर सकते हैं।
=======
You don't have to build your whole website with React. Adding React to HTML doesn't require installation, takes a minute, and lets you start writing interactive components right away.

</Intro>

<YouWillLearn>

* How to add React to an HTML page in one minute
* What is the JSX syntax and how to quickly try it
* How to set up a JSX preprocessor for production

</YouWillLearn>

## Add React in one minute {/*add-react-in-one-minute*/}

React has been designed from the start for gradual adoption. Most websites aren't (and don't need to be) fully built with React. This guide shows how to add some “sprinkles of interactivity” to an existing HTML page.

Try this out with your own website or [an empty HTML file](https://gist.github.com/gaearon/edf814aeee85062bc9b9830aeaf27b88/archive/3b31c3cdcea7dfcfd38a81905a0052dd8e5f71ec.zip). All you need is an internet connection and a text editor like Notepad or VSCode. (Here's [how to configure your editor](/learn/editor-setup/) for syntax highlighting!)

### Step 1: Add a root HTML tag {/*step-1-add-a-root-html-tag*/}

First, open the HTML page you want to edit. Add an empty `<div>` tag to mark the spot where you want to display something with React. Give this `<div>` a unique `id` attribute value. For example:
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

```html {3}
<!-- ... मौजूदा HTML ... -->

<<<<<<< HEAD
<div id="कौम्पोनॅन्ट-यहाँ-जाएगा"></div>
=======
<div id="like-button-root"></div>
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

<!-- ... मौजूदा HTML ... -->
```

<<<<<<< HEAD
### स्टेप 2: Script टैग ऐड करें {/*step-2-add-the-script-tags*/}
=======
It's called a "root" because it's where the React tree will start. You can place a root HTML tag like this anywhere inside the `<body>` tag. Leave it empty because React will replace its contents with your React component.

You may have as many root HTML tags as you need on one page.

### Step 2: Add the script tags {/*step-2-add-the-script-tags*/}
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

HTML पेज में, क्लोजिंग `</body>` टैग से ठीक पहले, निम्न फ़ाइलों के लिए तीन `<script>` टैग ऐड करें:

<<<<<<< HEAD
- [**react.development.js**](https://unpkg.com/react@17/umd/react.development.js) React के कोर को लोड करता है
- [**react-dom.development.js**](https://unpkg.com/react-dom@17/umd/react-dom.development.js) React को HTML एलिमेंट्स [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model) को रेंडर करने देता है।
- **like_button.js** वह जगह है जहाँ आप स्टेप 3 में अपना कौम्पोनॅन्ट लिखेंगे!

<Gotcha>

डेप्लॉय करते समय, "development.js" को "production.min.js" से बदलें।

</Gotcha>

```html
  <!-- पेज का अंत -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="like_button.js"></script>
</body>
```

### स्टेप 3: एक React कौम्पोनॅन्ट बनाएँ {/*step-3-create-a-react-component*/}

अपने HTML पेज के बगल में **like_button.js** नाम की एक फाइल बनाएं, इस कोड स्निपेट को ऐड करें और फाइल को सेव करें। यह कोड `LikeButton` नामक एक React कौम्पोनॅन्ट को डिफाइन करता है। [आप हमारे गाइड में कौम्पोनॅन्ट बनाने के बारे में अधिक जान सकते हैं।](/learn/your-first-component)
=======
- [`react.development.js`](https://unpkg.com/react@18/umd/react.development.js) lets you define React components.
- [`react-dom.development.js`](https://unpkg.com/react-dom@18/umd/react-dom.development.js) lets React render HTML elements to the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model).
- **`like-button.js`** is where you'll write your component in the next step!

Your HTML should now end like this:

```html
    <!-- end of the page -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="like-button.js"></script>
  </body>
</html>
```

<Gotcha>

Before deploying to a live website, make sure to replace `development.js` with `production.min.js`! Development builds of React provide more helpful error messages, but slow down your website *a lot.*

</Gotcha>

### Step 3: Create a React component {/*step-3-create-a-react-component*/}

Create a file called **`like-button.js`** next to your HTML page, add this code snippet, and save the file. This code defines a React component called `LikeButton`. (Learn more about making components in the [Quick Start!](/learn))
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

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

<<<<<<< HEAD
### स्टेप 4: पेज पर अपना React कौम्पोनॅन्ट ऐड करें {/*step-4-add-your-react-component-to-the-page*/}

अंत में, **like_button.js** के नीचे दो पंक्तियाँ ऐड करें। कोड की ये दो पंक्तियाँ पहले स्टेप में आपके द्वारा अपने HTML में ऐड किये गए `<div>` को ढूंढती हैं और फिर उसके अंदर "Like" बटन React कौम्पोनॅन्ट को डिस्प्ले करती हैं।

```js
const domContainer = document.getElementById('कौम्पोनॅन्ट-यहाँ-जाएगा');
ReactDOM.render(React.createElement(LikeButton), domContainer);
=======
### Step 4: Add your React component to the page {/*step-4-add-your-react-component-to-the-page*/}

Lastly, add three lines to the bottom of **`like-button.js`**. These lines of code find the `<div>` you added to the HTML in the first step, create a React root, and then display the "Like" button React component inside of it:

```js
const rootNode = document.getElementById('like-button-root');
const root = ReactDOM.createRoot(rootNode);
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985
root.render(React.createElement(LikeButton));
```

**बधाई हो! आपने अभी-अभी अपनी वेबसाइट पर अपना पहला React कौम्पोनॅन्ट रेंडर किया है!**

<<<<<<< HEAD
- [पूरा उदाहरण सोर्स कोड देखें](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9)
- [पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9/archive/7b41a88cb1027c9b5d8c6aff5212ecd3d0493504.zip)
=======
- [View the full example source code](https://gist.github.com/gaearon/0b535239e7f39c524f9c7dc77c44f09e)
- [Download the full example (2KB zipped)](https://gist.github.com/gaearon/0b535239e7f39c524f9c7dc77c44f09e/archive/651935b26a48ac68b2de032d874526f2d0896848.zip)
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

#### आप कौम्पोनॅन्ट का पुन: उपयोग कर सकते हैं! {/*you-can-reuse-components*/}

<<<<<<< HEAD
आप एक ही HTML पेज पर कई स्थानों पर एक React कौम्पोनॅन्ट को डिस्प्ले करना चाह सकते हैं। यह सबसे उपयोगी है जबकि पेज के React-संचालित हिस्से एक दूसरे से अलग-थलग हैं। आप कई कंटेनर एलिमेंट के साथ `ReactDOM.render()` को कई बार कॉल करके ऐसा कर सकते हैं।

1. **index.html** में, एक और कंटेनर एलिमेंट ऐड करें `<div id="कौम्पोनॅन्ट-यहाँ-भी-जाएगा"></div>`.
2. **like_button.js** में, नए कंटेनर एलिमेंट के लिए एक और `ReactDOM.render()` ऐड करें:

```js {6,7,8,9}
const root1 = ReactDOM.createRoot(
  document.getElementById('कौम्पोनॅन्ट-यहाँ-जाएगा')
);
root1.render(React.createElement(LikeButton));

const root2 = ReactDOM.createRoot(
  document.getElementById('कौम्पोनॅन्ट-यहाँ-भी-जाएगा')
);
root2.render(React.createElement(LikeButton));
```

देखें [एक उदाहरण जो "Like" बटन को तीन बार को डिस्प्ले करता है और उसमें कुछ डेटा भेजता है](https://gist.github.com/rachelnabors/c0ea05cc33fbe75ad9bbf78e9044d7f8)!
=======
You might want to display React components in multiple places on the same HTML page. This is useful if React-powered parts of your page are separate from each other. You can do this by putting multiple root tags in your HTML and then rendering React components inside each of them with `ReactDOM.createRoot()`. For example:

1. In **`index.html`**, add an additional container element `<div id="another-root"></div>`.
2. In **`like-button.js`**, add three more lines at the end:

```js {6,7,8,9}
const anotherRootNode = document.getElementById('another-root');
const anotherRoot = ReactDOM.createRoot(anotherRootNode);
anotherRoot.render(React.createElement(LikeButton));
```

If you need to render the same component in many places, you can assign a CSS `class` instead of `id` to each root, and then find them all. Here is [an example that displays three "Like" buttons and passes data to each.](https://gist.github.com/gaearon/779b12e05ffd5f51ffadd50b7ded5bc8)
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

### स्टेप 5: प्रोडक्शन के लिए जावास्क्रिप्ट को छोटा करें {/*step-5-minify-javascript-for-production*/}

अनमिनिफाइड जावास्क्रिप्ट आपके यूज़रस के लिए पेज लोड समय को महत्वपूर्ण रूप से धीमा कर सकता है। अपनी वेबसाइट को प्रोडक्शन में लगाने से पहले, इसकी स्क्रिप्ट को छोटा करना एक अच्छा विचार है।

- **यदि आपके पास अपनी स्क्रिप्ट के लिए छोटा करने का स्टेप नहीं है**, [इसे सेट करने का एक तरीका यहां दिया गया है](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).
- **यदि आप अपनी एप्लिकेशन स्क्रिप्ट को पहले ही छोटा कर चुके हैं**, तो आपकी साइट प्रोडक्शन के लिए तैयार हो जाएगी यदि आप सुनिश्चित करते हैं कि डेप्लॉयड HTML React के संस्करणों को `product.min.js` में समाप्त करता है, जैसे:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
```

## JSX के साथ React का प्रयास करें {/*try-react-with-jsx*/}

<<<<<<< HEAD
ऊपर दिए गए उदाहरण उन विशेषताओं पर निर्भर करते हैं जो कोर रूप से ब्राउज़र द्वारा समर्थित हैं। यही कारण है कि **like_button.js** React बताने के लिए जावास्क्रिप्ट फ़ंक्शन कॉल का उपयोग करता है की क्या डिस्प्ले करना है:
=======
The examples above rely on features that are natively supported by browsers. This is why **`like-button.js`** uses a JavaScript function call to tell React what to display:
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

```js
return React.createElement('button', {onClick: () => setLiked(true)}, 'Like');
```

हालाँकि, React इसके बजाय एक HTML-जैसे जावास्क्रिप्ट सिंटैक्स [JSX](/learn/writing-markup-with-jsx), इस्तेमाल करने का ऑप्शन भी प्रदान करता है:

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

<<<<<<< HEAD
बहुत से लोग इसे React के साथ और अन्य लाइब्रेरी के साथ UI कोड लिखने के लिए परिचित और सहायक पाते हैं। आप अन्य प्रोजेक्ट्स में "आपके पूरे जावास्क्रिप्ट में फैला हुआ मार्कअप" देख सकते हैं!
=======
These two code snippets are equivalent. JSX is popular syntax for describing markup in JavaScript. Many people find it familiar and helpful for writing UI code--both with React and with other libraries.
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

> आप [इस ऑनलाइन कनवर्टर](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.17) का उपयोग करके HTML मार्कअप को JSX में बदलने के साथ खेल सकते हैं।

### JSX का प्रयास करें {/*try-jsx*/}

<<<<<<< HEAD
अपने प्रोजेक्ट में JSX को आज़माने का सबसे तेज़ तरीका है कि आप अपने पेज के `<head>` में Babel कंपाइलर को React और ReactDom के साथ ऐड दें:

```html {6}
<!-- ... बाकी का <head> टैग ... -->

<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

</head>
<!-- ... बाकी का <body> टैग ... -->
```

अब आप किसी भी `<script>` टैग में `type="text/babel"` एट्रिब्यूट ऐड करके JSX का उपयोग कर सकते हैं। उदाहरण के लिए:

```jsx {1}
<script type="text/babel">
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<h1>Hello, world!</h1>);
</script>
```

**like_button.js** को JSX में बदलने के लिए:

1. **like_button.js** में, निचे के कोड को
=======
The quickest way to try JSX is to add the Babel compiler as a `<script>` tag to the page. Put it before **`like-button.js`**, and then add `type="text/babel"` attribute to the `<script>` tag for **`like-button.js`**:

```html {3,4}
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="like-button.js" type="text/babel"></script>
</body>
```

Now you can open **`like-button.js`** and replace
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Like'
);
```

<<<<<<< HEAD
इससे बदलें:
=======
with the equivalent JSX code:
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

```jsx
return (
  <button onClick={() => setLiked(true)}>
    Like
  </button>
);
```

<<<<<<< HEAD
2. **index.html** में, लाइक बटन के script टैग में `type="text/babel"` ऐड करें:
=======
It may feel a bit unusual at first to mix JS with markup, but it will grow on you! Check out [Writing Markup in JSX](/learn/writing-markup-with-jsx) for an introduction. Here is [an example HTML file with JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) that you can download and play with.
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

<Gotcha>

<<<<<<< HEAD
यहाँ [JSX के साथ एक उदाहरण HTML फ़ाइल](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) है जिसे आप डाउनलोड कर सकते हैं और उसके साथ खेल सकते हैं।

सरल डेमो सीखने और बनाने के लिए यह तरीका ठीक है। हालांकि, यह आपकी वेबसाइट को धीमा कर देता है और **प्रोडक्शन के लिए उपयुक्त नहीं है**। जब आप आगे बढ़ने के लिए तैयार हों, तो यह नया `<script>` टैग और आपके द्वारा ऐड की गई `type="text/babel"` एट्रिब्यूट को हटा दें। इसके बजाय, अगले भाग में आप अपने सभी `<script>` टैग को ऑटोमेटेड रूप से बदलने के लिए एक JSX प्रीप्रोसेसर सेटअप करेंगे।
=======
The Babel `<script>` compiler is fine for learning and creating simple demos. However, **it makes your website slow and isn't suitable for production**. When you're ready to move forward, remove the Babel `<script>` tag and remove the `type="text/babel"` attribute you've added in this step. Instead, in the next section you will set up a JSX preprocessor to convert all your `<script>` tags from JSX to JS.

</Gotcha>
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

### किसी प्रोजेक्ट में JSX ऐड करें {/*add-jsx-to-a-project*/}

किसी प्रोजेक्ट में JSX को ऐडने के लिए [bundler](/learn/start-a-new-react-project#custom-toolchains) जैसे जटिल टूल या एक डेवलपमेंट सर्वर की आवश्यकता नहीं होती है।JSX प्रीप्रोसेसर ऐड करना एक CSS प्रीप्रोसेसर ऐड करने जैसा है।

टर्मिनल में अपने प्रोजेक्ट फ़ोल्डर में जाएं, और इन दो कमांड्स को पेस्ट करें (**सुनिश्चित करें कि आपने [Node.js](https://nodejs.org/) इंस्टॉल किया हुआ है!**):

1. `npm init -y` (यदि यह फ़ैल होता है, [यहाँ एक समाधान है](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

JSX प्रीप्रोसेसर को सेटअप करने के लिए आपको केवल npm की आवश्यकता है। आपको किसी और चीज के लिए इसकी आवश्यकता नहीं होगी। React और एप्लिकेशन कोड दोनों बिना किसी बदलाव के `<script>` टैग के रूप में रह सकते हैं।

बधाई हो! आपने अभी-अभी अपने प्रोजेक्ट में **प्रोडक्शन के लिए तैयार JSX सेटअप** ऐड किया है।

### JSX प्रीप्रोसेसर चलाएँ {/*run-the-jsx-preprocessor*/}

<<<<<<< HEAD
आप JSX को प्रीप्रोसेस कर सकते हैं ताकि हर बार जब आप किसी फ़ाइल को JSX के साथ सहेजते हैं, तो JSX फ़ाइल को एक नई, सादी जावास्क्रिप्ट फ़ाइल में परिवर्तित करते हुए, ट्रांसफ़ॉर्म फिर से चलाया जाएगा।

1. **src** नाम का फोल्डर बनाएं
2. अपने टर्मिनल में, यह कमांड चलाएँ: `npx babel --watch src --out-dir . --presets react-app/prod ` (इसके खत्म होने की प्रतीक्षा न करें! यह कमांड JSX के लिए एक ऑटोमेटेड वॉचर शुरू करता है।)
3. अपने JSX-ified **like_button.js** को नए **src** फ़ोल्डर में ले जाएं (या एक **like_button.js** बनाएं जिसमें यह [JSX स्टार्टर कोड] हो (https://gist.githubusercontent.com/ rachelnabors/ffbc9a0e33665a58d4cfdd1676f05453/raw/652003ff54d2dab8a1a1e5cb3bb1e28ff207c1a6/like_button.js))

वाचर ब्राउज़र के लिए उपयुक्त सादे जावास्क्रिप्ट कोड के साथ एक प्रीप्रोसेस्ड **like_button.js** बनाएगा।
=======
You can preprocess JSX so that every time you save a file with JSX in it, the transform will be re-run, converting the JSX file into a new, plain JavaScript file that the browser can understand. Here's how to set this up:

1. Create a folder called **`src`**.
2. In your terminal, run this command: `npx babel --watch src --out-dir . --presets react-app/prod ` (Don't wait for it to finish! This command starts an automated watcher for edits to JSX inside `src`.)
3. Move your JSX-ified **`like-button.js`** ([it should look like this!](https://gist.githubusercontent.com/gaearon/1884acf8834f1ef9a574a953f77ed4d8/raw/dfc664bbd25992c5278c3bf3d8504424c1104ecf/like-button.js)) to the new **`src`** folder.

The watcher will create a preprocessed **`like-button.js`** with the plain JavaScript code suitable for the browser.
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

<Gotcha>

यदि आपको यह कहते हुए एक एरर मैसेज दिखाई देता है कि "आपने गलती से `babel` पैकेज सेटअप कर लिया है", तो आप [पिछला स्टेप](#add-jsx-to-a-project) चूक गए होंगे। इसे उसी फ़ोल्डर में निष्पादित करें, और फिर पुन: प्रयास करें।

</Gotcha>

<<<<<<< HEAD
एक बोनस के रूप में, यह आपको पुराने ब्राउज़रों में ब्रेक होने की चिंता किए बिना classes जैसी आधुनिक जावास्क्रिप्ट सिंटैक्स सुविधाओं का उपयोग करने देता है। हमारे द्वारा अभी-अभी उपयोग किए गए टूल को babel कहा जाता है, और आप इसके बारे में [इसके डॉक्यूमेंटेशन](https://babeljs.io/docs/en/babel-cli/) से अधिक जान सकते हैं।
=======
The tool you just used is called Babel, and you can learn more about it from [its documentation](https://babeljs.io/docs/en/babel-cli/). In addition to JSX, it lets you use the most recent JavaScript syntax features without worrying about breaking older browsers.
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

यदि आप बिल्ड टूल्स के साथ कम्फ़र्टेबल हो रहे हैं और चाहते हैं कि वे आपके लिए और अधिक करें, [हम यहां कुछ सबसे लोकप्रिय और पहुंचने योग्य टूलचेन को कवर करते हैं](/learn/start-a-new-react-project)।

<DeepDive title="React बिना JSX के">

कोर रूप से JSX को React के कौम्पोनॅन्ट लिखने को HTML लिखने के रूप में परिचित बनाने के लिए पेश किया गया था। तब से, वाक्यविन्यास व्यापक हो गया है। हालाँकि, ऐसे उदाहरण हो सकते हैं जहाँ आप JSX का उपयोग नहीं करना चाहते हैं या नहीं कर सकते हैं। आपके पास दो ऑप्शन हैं:

<<<<<<< HEAD
- [htm](https://github.com/developit/htm) जैसे JSX अल्टरनेटिव का उपयोग करें, जो कंपाइलर का उपयोग नहीं करता है—यह जावास्क्रिप्ट के नेटिव टैग किए गए टेम्प्लेट का उपयोग करता है।
- [`React.createElement()`](/reference/createelement) का उपयोग करें, जिसकी एक विशेष स्ट्रक्चर नीचे बताया गया है।
=======
- Use a JSX alternative like [htm](https://github.com/developit/htm) which uses JavaScript [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of a compiler.
- Use [`React.createElement()`](/apis/createelement) which has a special structure explained below.
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

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

<<<<<<< HEAD
यह तीन आर्ग्यूमेंट्स को स्वीकार करता है: `React.createElement(component, props, children)`। यहां बताया गया है कि वे कैसे काम करते हैं:

1. एक **component**, जो एक HTML एलिमेंट या एक फ़ंक्शन कौम्पोनॅन्ट को रिप्रेजेंट करने वाला एक स्ट्रिंग हो सकता है
2. किसी भी [**props** का एक ऑब्जेक्ट जिसे आप पास करना चाहते हैं](/learn/passing-props-to-a-component)
3. कौम्पोनॅन्ट में किसी भी **children** का ऑब्जेक्ट हो सकता है, जैसे टेक्स्ट स्ट्रिंग्स
=======
It accepts several arguments: `React.createElement(component, props, ...children)`.

Here's how they work:

1. A **component**, which can be a string representing an HTML element or a function component
2. An object of any [**props** you want to pass](/learn/passing-props-to-a-component)
3. The rest are **children** the component might have, such as text strings or other elements
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

यदि आप `React.createElement()` टाइप करते-करते थक गए हैं, तो एक सामान्य पैटर्न शॉर्टहैंड असाइन करना है:

```js
const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));
```

<<<<<<< HEAD
यदि आप `React.createElement()` के लिए इस शॉर्टहैंड फॉर्म का उपयोग करते हैं, तो JSX के बिना React का उपयोग करना लगभग उतना ही सुविधाजनक हो सकता है।
=======
Then, if you prefer this style, it can be just as convenient as JSX.
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

</DeepDive>

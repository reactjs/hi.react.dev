---
title: किसी वेबसाइट पर React जोड़ें
---

<Intro>

React को शुरू से ही धीरे-धीरे अपनाने के लिए डिज़ाइन किया गया है, और आप जितना चाहें उतना कम या ज्यादा React का उपयोग कर सकते हैं। चाहे आप माइक्रो-फ्रंटेंड, एक मौजूदा सिस्टम के साथ काम कर रहे हों, या सिर्फ React को आज़मा रहे हों, आप HTML पेज पर इंटरेक्टिव React कौम्पोनॅन्ट को कोड की कुछ पंक्तियों के साथ जोड़ना शुरू कर सकते हैं - और कोई बिल्ड टूलिंग नहीं!

</Intro>

## एक मिनट में React जोड़ें {/*add-react-in-one-minute*/}

आप एक मिनट से भी कम समय में मौजूदा HTML पृष्ठ पर एक React कौम्पोनॅन्ट जोड़ सकते हैं। इसे अपनी वेबसाइट या [एक खाली HTML फ़ाइल](https://gist.github.com/rachelnabors/7b33305bf33776354797a2e3c1445186/archive/859eac2f7079c9e1f0a6eb818a9684a464064d80.zip) के साथ आज़माएं—आपको बस एक इंटरनेट कनेक्शन और नोटपैड (या VSCode—को [कैसे सेट अप करें](/learn/editor-setup/) इस पर हमारी मार्गदर्शिका देखें) जैसे टेक्स्ट एडिटर की आवश्यकता है!

### चरण 1: HTML में एक एलिमेंट जोड़ें {/*step-1-add-an-element-to-the-html*/}

जिस HTML पृष्ठ में आप संपादित करना चाहते हैं, जहां आप React के साथ कुछ प्रदर्शित करना चाहते हैं, उस स्थान पर एक खाली `<div>` टैग के साथ एक अनोखा ‘id’ वाला HTML एलिमेंट जोड़ें।

आप इस तरह का "कंटेनर" एलिमेंट `<div>` को `<body>` टैग के अंदर कहीं भी रख सकते हैं। React HTML एलिमेंट के अंदर किसी भी मौजूदा अंतर्वस्तु को बदल देगा, इसलिए वे आमतौर पर खाली होते हैं। आपके पास इन HTML एलिमेंट्स में से एक पृष्ठ पर जितनी आवश्यकता हो उतनी हो सकती है।

```html {3}
<!-- ... मौजूदा HTML ... -->

<div id="कौम्पोनॅन्ट-यहाँ-जाएगा"></div>

<!-- ... मौजूदा HTML ... -->
```

### चरण 2: script टैग जोड़ें {/*step-2-add-the-script-tags*/}

HTML पृष्ठ में, समापन `</body>` टैग से ठीक पहले, निम्न फ़ाइलों के लिए तीन `<script>` टैग जोड़ें:

- [**react.development.js**](https://unpkg.com/react@17/umd/react.development.js) React के मूल को लोड करता है
- [**react-dom.development.js**](https://unpkg.com/react-dom@17/umd/react-dom.development.js) React को HTML एलिमेंट को प्रस्तुत करने देता है [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model).
- **like_button.js** वह जगह है जहाँ आप चरण 3 में अपना कौम्पोनॅन्ट लिखेंगे!

<Gotcha>

परिनियोजित करते समय, "Development.js" को "production.min.js" से बदलें।

</Gotcha>

```html
  <!-- पृष्ठ का अंत -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="like_button.js"></script>
</body>
```

### चरण 3: एक React कौम्पोनॅन्ट बनाएँ {/*step-3-create-a-react-component*/}

अपने HTML पृष्ठ के बगल में **like_button.js** नाम की एक फाइल बनाएं, इस कोड स्निपेट को जोड़ें और फाइल को सेव करें। यह कोड `LikeButton` नामक एक React कौम्पोनॅन्ट को परिभाषित करता है। [आप हमारे गाइड में कौम्पोनॅन्ट बनाने के बारे में अधिक जान सकते हैं।](/learn/your-first-component)

```js
'use strict';

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return 'आपको यह पसंद आया!';
  }

  return React.createElement(
    'button',
    {
      onClick: () => setLiked(true),
    },
    'पसंद करें'
  );
}
```

### चरण 4: पृष्ठ पर अपना React कौम्पोनॅन्ट जोड़ें {/*step-4-add-your-react-component-to-the-page*/}

अंत में, **like_button.js** के नीचे दो पंक्तियाँ जोड़ें। कोड की ये दो पंक्तियाँ पहले चरण में आपके द्वारा अपने HTML में जोड़े गए `<div>` को ढूंढती हैं और फिर उसके अंदर "पसंद करें" बटन React कौम्पोनॅन्ट प्रदर्शित करती हैं।

```js
const domContainer = document.getElementById('कौम्पोनॅन्ट-यहाँ-जाएगा');
ReactDOM.render(React.createElement(LikeButton), domContainer);
```

**बधाई हो! आपने अभी-अभी अपनी वेबसाइट पर अपना पहला React कौम्पोनॅन्ट प्रस्तुत किया है!**

- [पूरा उदाहरण स्रोत कोड देखें](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9)
- [पूरा उदाहरण डाउनलोड करें (2KB ज़िपित)](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9/archive/7b41a88cb1027c9b5d8c6aff5212ecd3d0493504.zip)

#### आप कौम्पोनॅन्ट का पुन: उपयोग कर सकते हैं! {/*you-can-reuse-components*/}


आप एक ही HTML पृष्ठ पर कई स्थानों पर एक React कौम्पोनॅन्ट प्रदर्शित करना चाह सकते हैं। यह सबसे उपयोगी है जबकि पृष्ठ के React-संचालित हिस्से एक दूसरे से अलग-थलग हैं। आप कई कंटेनर एलिमेंट के साथ `ReactDOM.render ()` को कई बार कॉल करके ऐसा कर सकते हैं।

1. **index.html** में, एक अतिरिक्त कंटेनर एलिमेंट जोड़ें `<div id="कौम्पोनॅन्ट-यहाँ-भी-जाएगा"></div>`.
2. **like_button.js** में, नए कंटेनर एलिमेंट के लिए एक अतिरिक्त `ReactDOM.render ()` जोड़ें:

```js {6,7,8,9}
ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('कौम्पोनॅन्ट-यहाँ-जाएगा')
);

ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('कौम्पोनॅन्ट-यहाँ-भी-जाएगा')
);
```

देखें [एक उदाहरण जो "पसंद करें" बटन को तीन बार प्रदर्शित करता है और उसमें कुछ डेटा भेजता है](https://gist.github.com/rachelnabors/c0ea05cc33fbe75ad9bbf78e9044d7f8)!

### चरण 5: प्रोडक्शन के लिए जावास्क्रिप्ट को छोटा करें {/*step-5-minify-javascript-for-production*/}

असिंचित जावास्क्रिप्ट आपके उपयोगकर्ताओं के लिए पृष्ठ लोड समय को महत्वपूर्ण रूप से धीमा कर सकता है। अपनी वेबसाइट को प्रोडक्शन में लगाने से पहले, इसकी स्क्रिप्ट को छोटा करना एक अच्छा विचार है।

- **यदि आपके पास अपनी स्क्रिप्ट के लिए छोटा करने का चरण नहीं है**, [इसे सेट करने का एक तरीका यहां दिया गया है](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).
- **यदि आप अपनी एप्लिकेशन स्क्रिप्ट को पहले ही छोटा कर देते हैं**, तो आपकी साइट उत्पादन के लिए तैयार हो जाएगी यदि आप सुनिश्चित करते हैं कि तैनात HTML React के संस्करणों को `product.min.js` में समाप्त करता है, जैसे:

```html
<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
```

## JSX के साथ React का प्रयास करें {/*try-react-with-jsx*/}

ऊपर दिए गए उदाहरण उन विशेषताओं पर निर्भर करते हैं जो मूल रूप से ब्राउज़र द्वारा समर्थित हैं। यही कारण है कि **like_button.js** React को क्या प्रदर्शित करना है, यह बताने के लिए जावास्क्रिप्ट फ़ंक्शन कॉल का उपयोग करता है:

```js
return React.createElement('button', {onClick: () => setLiked(true)}, 'पसंद करें');
```

हालाँकि, React इसके बजाय [JSX],(/learn/writing-markup-with-jsx), एक HTML-जैसे जावास्क्रिप्ट सिंटैक्स का उपयोग करने का विकल्प भी प्रदान करता है:

```jsx
return <button onClick={() => setLiked(true)}>पसंद करें</button>;
```


ये दो कोड स्निपेट बराबर हैं। JSX जावास्क्रिप्ट में मार्कअप का वर्णन करने के लिए लोकप्रिय सिंटैक्स है। बहुत से लोग इसे UI कोड लिखने के लिए परिचित और सहायक पाते हैं - दोनों रिएक्ट के साथ और अन्य लाइब्रेरी के साथ। आप अन्य परियोजनाओं में "आपके पूरे जावास्क्रिप्ट में छिड़का हुआ मार्कअप" देख सकते हैं!

> आप [इस ऑनलाइन कनवर्टर](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3) का उपयोग करके HTML मार्कअप को JSX में बदलने के साथ खेल सकते हैं।

### Try JSX {/_try-jsx_/} {/_try-jsx-try-jsx_/} {/*try-jsx-try-jsx-try-jsx-try-jsx*/}

The quickest way to try JSX in your project is to add the Babel compiler to your page's `<head>` along with React and ReactDOM like so:

```html {6}
<!-- ... rest of <head> ... -->

<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

</head>
<!-- ... rest of <body> ... -->
```

Now you can use JSX in any `<script>` tag by adding `type="text/babel"` attribute to it. For instance:

```jsx {1}
<script type="text/babel">
  ReactDOM.render(
  <h1>Hello, world!</h1>, document.getElementById('root') );
</script>
```

To convert **like_button.js** to use JSX:

1. In **like_button.js**, replace

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Like'
);
```

with:

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

2. In **index.html**, add `type="text/babel"` to the like button's script tag:

```html
<script src="like_button.js" type="text/babel"></script>
```

Here is [an example HTML file with JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) that you can download and play with.

This approach is fine for learning and creating simple demos. However, it makes your website slow and **isn't suitable for production**. When you're ready to move forward, remove this new `<script>` tag and the `type="text/babel"` attributes you've added. Instead, in the next section you will set up a JSX preprocessor to convert all your `<script>` tags automatically.

### Add JSX to a project {/_add-jsx-to-a-project_/} {/_add-jsx-to-a-project-add-jsx-to-a-project_/} {/*add-jsx-to-a-project-add-jsx-to-a-project-add-jsx-to-a-project-add-jsx-to-a-project*/}

Adding JSX to a project doesn't require complicated tools like a [bundler](/learn/start-a-new-react-project#custom-toolchains) or a development server. Adding a JSX preprocessor is a lot like adding a CSS preprocessor.

Go to your project folder in the terminal, and paste these two commands (**Be sure you have [Node.js](https://nodejs.org/) installed!**):

1. `npm init -y` (if it fails, [here's a fix](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

You only need npm to install the JSX preprocessor. You won't need it for anything else. Both React and the application code can stay as `<script>` tags with no changes.

Congratulations! You just added a **production-ready JSX setup** to your project.

### Run the JSX Preprocessor {/_run-the-jsx-preprocessor_/} {/_run-the-jsx-preprocessor-run-the-jsx-preprocessor_/} {/*run-the-jsx-preprocessor-run-the-jsx-preprocessor-run-the-jsx-preprocessor-run-the-jsx-preprocessor*/}

You can preprocess JSX so that every time you save a file with JSX in it, the transform will be re-run, converting the JSX file into a new, plain JavaScript file.

1. Create a folder called **src**
2. In your terminal, run this command: `npx babel --watch src --out-dir . --presets react-app/prod ` (Don't wait for it to finish! This command starts an automated watcher for JSX.)
3. Move your JSX-ified **like_button.js** to the new **src** folder (or create a **like_button.js** containing this [JSX starter code](https://gist.githubusercontent.com/rachelnabors/ffbc9a0e33665a58d4cfdd1676f05453/raw/652003ff54d2dab8a1a1e5cb3bb1e28ff207c1a6/like_button.js))

The watcher will create a preprocessed **like_button.js** with the plain JavaScript code suitable for the browser.

<Gotcha>

If you see an error message saying "You have mistakenly installed the `babel` package", you might have missed [the previous step](#add-jsx-to-a-project). Perform it in the same folder, and then try again.

</Gotcha>

As a bonus, this also lets you use modern JavaScript syntax features like classes without worrying about breaking older browsers. The tool we just used is called Babel, and you can learn more about it from [its documentation](https://babeljs.io/docs/en/babel-cli/).

If you're getting comfortable with build tools and want them to do more for you, [we cover some of the most popular and approachable toolchains here](/learn/start-a-new-react-project).

<DeepDive title="React without JSX">

Originally JSX was introduced to make writing components with React feel as familiar as writing HTML. Since then, the syntax has become widespread. However, there may be instances where you do not want to use or cannot use JSX. You have two options:

- Use a JSX alternative like [htm](https://github.com/developit/htm) which doesn't use a compiler—it uses JavaScript's native Tagged Templates.
- Use [`React.createElement()`](/reference/createelement), which has a special structure explained below.

With JSX, you would write a component like so:

```jsx
function Hello(props) {
  return <div>Hello {props.toWhat}</div>;
}

ReactDOM.render(<Hello toWhat="World" />, document.getElementById('root'));
```

With `React.createElement()`, you would write it like this:

```js
function Hello(props) {
  return React.createElement('div', null, `Hello ${props.toWhat}`);
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

It accepts three arguments: `React.createElement(component, props, children)`. Here's how they work:

1. A **component**, which can be a string representing an HTML element or a function component
2. An object of any [**props** you want to pass](/learn/passing-props-to-a-component)
3. An object of any **children** the component might have, such as text strings

If you get tired of typing `React.createElement()`, one common pattern is to assign a shorthand:

```js
const e = React.createElement;

ReactDOM.render(e('div', null, 'Hello World'), document.getElementById('root'));
```

If you use this shorthand form for `React.createElement()`, it can be almost as convenient to use React without JSX.

</DeepDive>

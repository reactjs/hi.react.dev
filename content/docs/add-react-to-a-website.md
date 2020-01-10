---
id: add-react-to-a-website
title: Add React to a Website
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---
अपनी आवश्यकता के अनुसार कम या ज्यादा React का उपयोग करें

क्रमिक गोद या अपने तरीके से उपयोग करने के लिए शुरू से ही इसी तरह डिज़ाइन की गई है, और **आप आवश्यकतानुसार कम या ज्यादा इसका उपयोग कर सकते हैं**। शायद आप केवल एक मौजूदा पेज पर कुछ "अन्तरक्रियाशीलता के छिड़काव( इसके अंतर्गत कुछ छोटा सा काम )" जोड़ना चाहते हैं। React Component ऐसा करने का एक शानदार तरीका है।

अधिकांश वेबसाइटों को एकल-पृष्ठ ऐप्स होने की आवश्यकता नहीं है, और नहीं भी। **कोड की कुछ पंक्तियों और बिना किसी बिल्ड टूलिंग** के साथ, अपनी वेबसाइट के एक छोटे से हिस्से में React उपयोग  करने का प्रयास करें। आप तब या तो धीरे-धीरे अपनी उपस्थिति का विस्तार कर सकते हैं, या इसे कुछ गतिशील विजेट में समाहित में रखे।

---

- [एक मिनट में React जोड़ें](#add-react-in-one-minute)
- [वैकल्पिक: JSX के साथ React का उपयोग करे](#optional-try-react-with-jsx) ( किसी भी बंडल आवश्यकता नहीं !)

## एक मिनट में React जोड़ें {#add-react-in-one-minute}

इस अनुभाग में, हम यह दिखाएंगे कि किसी मौजूदा HTML पृष्ठ पर एक React Component कैसे जोड़ा जाए। आप अपनी वेबसाइट के साथ अनुसरण कर सकते हैं, या अभ्यास करने के लिए एक खाली HTML फ़ाइल बना सकते हैं।

यहाँ कोई जटिल उपकरण नहीं होगा या आवश्यकताओं को स्थापित( इनस्टॉल ) नहीं किया जाएगा -- **इस अनुभाग को पूरा करने के लिए, आपको केवल एक इंटरनेट कनेक्शन और आपके समय का एक मिनट चाहिए।**

वैकल्पिक: [पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### चरण 1: HTML में DOM कंटेनर जोड़ें {#step-1-add-a-dom-container-to-the-html}

सबसे पहले, उस HTML पेज को खोलें जिसे आप संपादित( एडिट ) करना चाहते हैं। उस स्थान को चिह्नित करने के लिए एक खाली `<div>` टैग जोड़ें जहां आप React के साथ कुछ प्रदर्शित करना चाहते हैं। उदाहरण के लिए:

```html{3}
<!-- ... existing HTML ... -->

<div id="like_button_container"></div>

<!-- ... existing HTML ... -->
```

हमने इस `<div>`  को एक अद्वितीय ( नया ) `id` HTML attribute दिया  है। यह हमें बाद में जावास्क्रिप्ट ( JavaScript ) कोड से इसे खोजने और इसके अंदर एक React Component प्रदर्शित करने की अनुमति देगा।

>टिप
>
>आप एक "कंटेनर" `<div>` को इस तरह से **कहीं भी** `<body>` टैग के अंदर रख सकते हैं। आपके पास एक पृष्ठ पर कई स्वतंत्र डोम कंटेनर हो सकते हैं जैसी आपकी आवश्यकता हो। वे आम तौर पर खाली होते हैं - React डोम (Dom) कंटेनर के अंदर किसी भी मौजूदा सामग्री को बदल देगी।

### चरण 2: स्क्रिप्ट टैग जोड़ें {#step-2-add-the-script-tags}

अगला, `</ body>` टैग बंद करने से ठीक पहले HTML पेज पर तीन `<script>` टैग जोड़ें:

```html{5,6,9}
  <!-- ... other HTML ... -->

  <!-- Load React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Load our React component. -->
  <script src="like_button.js"></script>

</body>
```

पहले दो टैग React लोड करते हैं। तीसरा आपके घटक (Component) कोड को लोड करेगा।

### चरण 3: एक React Component(प्रतिक्रिया घटक) बनाएँ {#step-3-create-a-react-component}

अपने HTML पृष्ठ के बगल में `like_button.js` नामक एक फ़ाइल बनाएँ।

खोले **[इस स्टार्टर कोड](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** और आपके द्वारा बनाई गई फ़ाइल में पेस्ट करें या छांपे।

>Tip
>
>यह कोड `LikeButton` नामक एक रिएक्ट घटक (React Component) को परिभाषित करता है। चिंता न करें अगर आप इसे अभी तक नहीं समझे हैं - हम बाद में रिएक्ट  (React) के बिल्डिंग ब्लॉक्स को अपने [हैंड्स-ऑन टुटोरिअल (हाथों पर ट्यूटोरियल)](/tutorial/tutorial.html) और [मुख्य अवधारणा गाइड](/docs/hello-world.html) में कवर करेंगे। अभी के लिए, चलो इसे स्क्रीन पर देख कर प्राप्त करे!

**[स्टार्टर कोड](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** के बाद, like_button.js के नीचे दो लाइनें जोड़ें:

```js{3,4}
// ... the starter code you pasted ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

कोड की ये दो पंक्तियाँ उस `<div>` को ढूंढती है जिसे हमने पहले चरण में अपने HTML में जोड़ा था, और फिर इसके अंदर अपने "Like" बटन रिएक्ट घटक (React Component) को प्रदर्शित करते हैं।

### बस! {#thats-it}

कोई चरण चार नहीं है। **आपने अपनी वेबसाइट पर पहला रिएक्ट घटक जोड़ा चुके है।**

React को एकीकृत (इंटिग्रेटिंग) करने के बारे में अधिक सुझावों के लिए अगला अनुभाग देखें।

**[पूर्ण उदाहरण स्रोत कोड देखें](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### सुझाव: एक घटक का पुन: उपयोग करें {#tip-reuse-a-component}

आमतौर पर, आप HTML पृष्ठ पर कई स्थानों पर React Component (प्रतिक्रिया घटकों) को प्रदर्शित करना चाह सकते हैं। यहाँ एक उदाहरण है जो "लाइक" बटन को तीन बार प्रदर्शित करता है और इसके लिए कुछ डेटा पास करता है:

[पूर्ण उदाहरण स्रोत कोड देखें](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>Note
>
>यह रणनीति सबसे उपयोगी है, जब पृष्ठ के रिएक्ट-संचालित हिस्से एक-दूसरे से अलग-थलग (आइसोलेटेड) हो। रिएक्ट कोड के अंदर, इसके बजाय [component composition (घटक संरचना) ](/docs/components-and-props.html#composing-components) का उपयोग करना आसान है।

### सुझाव: उत्पादन के लिए JavaScript (जावास्क्रिप्ट) को छोटा करें {#tip-minify-javascript-for-production}

अपनी वेबसाइट को उत्पादन में तैनात या अपलोड करने से पहले, इस बात का ध्यान रखें कि निर्विवाद (अनावश्यक) JavaSript (जावास्क्रिप्ट) कोड आपके उपयोगकर्ताओं के लिए पेज को काफी धीमा कर सकता है।

यदि आप पहले से ही एप्लिकेशन स्क्रिप्ट को छोटा करते हैं, तो **आपकी साइट का उत्पादन तैयार हो जाएगा** यदि आप सुनिश्चित करते हैं कि तैनात HTML रिएक्शन के संस्करणों (वर्जन) को `production.min.js` में समाप्त करता है:

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

If you don't have a minification step for your scripts, [here's one way to set it up](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).

## Optional: Try React with JSX {#optional-try-react-with-jsx}

In the examples above, we only relied on features that are natively supported by the browsers. This is why we used a JavaScript function call to tell React what to display:

```js
const e = React.createElement;

// Display a "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

However, React also offers an option to use [JSX](/docs/introducing-jsx.html) instead:

```js
// Display a "Like" <button>
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

These two code snippets are equivalent. While **JSX is [completely optional](/docs/react-without-jsx.html)**, many people find it helpful for writing UI code -- both with React and with other libraries.

You can play with JSX using [this online converter](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3).

### Quickly Try JSX {#quickly-try-jsx}

The quickest way to try JSX in your project is to add this `<script>` tag to your page:

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

Now you can use JSX in any `<script>` tag by adding `type="text/babel"` attribute to it. Here is [an example HTML file with JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html) that you can download and play with.

This approach is fine for learning and creating simple demos. However, it makes your website slow and **isn't suitable for production**. When you're ready to move forward, remove this new `<script>` tag and the `type="text/babel"` attributes you've added. Instead, in the next section you will set up a JSX preprocessor to convert all your `<script>` tags automatically.

### Add JSX to a Project {#add-jsx-to-a-project}

Adding JSX to a project doesn't require complicated tools like a bundler or a development server. Essentially, adding JSX **is a lot like adding a CSS preprocessor.** The only requirement is to have [Node.js](https://nodejs.org/) installed on your computer.

Go to your project folder in the terminal, and paste these two commands:

1. **Step 1:** Run `npm init -y` (if it fails, [here's a fix](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **Step 2:** Run `npm install babel-cli@6 babel-preset-react-app@3`

>Tip
>
>We're **using npm here only to install the JSX preprocessor;** you won't need it for anything else. Both React and the application code can stay as `<script>` tags with no changes.

Congratulations! You just added a **production-ready JSX setup** to your project.


### Run JSX Preprocessor {#run-jsx-preprocessor}

Create a folder called `src` and run this terminal command:

```
npx babel --watch src --out-dir . --presets react-app/prod 
```

>Note
>
>`npx` is not a typo -- it's a [package runner tool that comes with npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
>
>If you see an error message saying "You have mistakenly installed the `babel` package", you might have missed [the previous step](#add-jsx-to-a-project). Perform it in the same folder, and then try again.

Don't wait for it to finish -- this command starts an automated watcher for JSX.

If you now create a file called `src/like_button.js` with this **[JSX starter code](https://gist.github.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)**, the watcher will create a preprocessed `like_button.js` with the plain JavaScript code suitable for the browser. When you edit the source file with JSX, the transform will re-run automatically.

As a bonus, this also lets you use modern JavaScript syntax features like classes without worrying about breaking older browsers. The tool we just used is called Babel, and you can learn more about it from [its documentation](https://babeljs.io/docs/en/babel-cli/).

If you notice that you're getting comfortable with build tools and want them to do more for you, [the next section](/docs/create-a-new-react-app.html) describes some of the most popular and approachable toolchains. If not -- those script tags will do just fine!

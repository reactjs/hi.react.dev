---
id: composition-vs-inheritance
title: Composition vs Inheritance
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React का कम्पोजीशन मॉडल शक्तिशाली है, और हम सलाह देते है कि आप कौम्पोनॅन्ट के बीच कोड के दुबारा प्रयोग के लिए इनहेरिटेंस कि जगह कम्पोजीशन का प्रयोग करे|

इस भाग में, हम कुछ समस्याएं देखेंगे जहाँ React के नए डेवेलपर्स इनहेरिटेंस का प्रयोग करने की दिशा में जाते है, और यह भी देखेंगे की हम उनका समाधान कम्पोजीशन से कैसे कर सकते हैं|

## कन्टेनमेंट {#containment}

कुछ कौम्पोनॅन्ट अपने children के बारे में समय से पूर्व नहीं जान पाते| यह उन कौम्पोनॅन्ट्स के लिए आम बात है, जो सामान्य "boxes" दर्शाते है, जैसे `Sidebar` एवं `Dialog`।

हम सलाह देते है कि, यह कौम्पोनॅन्ट्स विशेष `children` props का प्रयोग करे जिनसे children एलिमेंट्स को सीधा आउटपुट में पास करना मुमकिन होगा|

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

यह दूसरे कौम्पोनॅन्ट्स को JSX की nesting के माध्यम से मनमाना children पास करने देता है|

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

`<FancyBorder>` JSX टैग के अंदर कुछ भी हो, वह `FancyBorder` कौम्पोनॅन्ट में `चिल्ड्रेंस` prop की तरह पास किया जा सकता है। क्यूंकि `FancyBorder`, `{props.children}` को `<div>` के अंदर रेंडर करता है, पास किये गए एल्मेंट्स अंतिम परिणाम में देखे जा सकते हैं|

जबकि यह सामान्य नहीं है, कई बारी आपको एक कौम्पोनॅन्ट में एक से अधिक "holes" की आवश्यकता पढ़ सकती है। इन परिस्थियों में आप `children` की जगह अपनी कन्वेंशंस इजात कर सकते हैं:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

React एलिमेंट्स जैसे कि `<Contacts />` एवं `<Chat />` केवल एक ऑब्जेक्ट है, आप इनको props की तरह पास कर सकते है, जैसे आप बाक़ी डाटा को पास करते है । यह तरिका आपको और लाइब्रेरीज में "slot" की तरह लग रहा होगा परन्तु React में कोई रोक नहीं है कि आप props में क्या पास कर सकते हैं|

## स्पेशलाइजेशन {#specialization}

कई बार हम कौम्पोनॅन्ट्स को और कौम्पोनॅन्ट्स का "स्पेशल केसेस" समझते है। उदहारण के लिए हम कह सकते है `WelcomeDialog`, `Dialog` का विशेष केस है।

React में यह भी कम्पोजीशन से उपलब्ध किया जाता है, जहाँ एक "विशिष्ट" कौम्पोनॅन्ट एक "सामान्य" कौम्पोनॅन्ट को रेंडर करता है और उसको props के द्वारा कॉन्फ़िगर करता है:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

कम्पोजीशन, classes वाले कौम्पोनॅन्ट के लिए भी समान रूप से काम करता है:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## So What About Inheritance? {#so-what-about-inheritance}

Facebook में हम हज़ारों React कौम्पोनॅन्ट्स का प्रयोग करते हैं, लेकिन हमे कोई भी ऐसा केस नहीं मिला जहाँ हम आपको कौम्पोनॅन्ट्स इन्हेरिटेंस हाईरारकीस बनाने की सलाह दे।

Props एवं कम्पोजीशन आपको हर प्रकार का लचीलापन देता है ताकि आप अपने कौम्पोनॅन्ट का देख दिखाव एवं बिहेवियर एक सुरक्षित एवं एक्सप्लिसित तरीके से बदल सके। याद रखिये की एक कौम्पोनॅन्ट आरबिटीआरी props, जिसमे प्रिमिटिव वैल्यू हो, React एलिमेंट्स या फिर फंक्शन्स को स्वीकार कर सकता है।

अगर आप अपने कौम्पोनॅन्ट के बीच कोई भी non-UI फंक्शनलिटी का प्रयोग करना चाहते है, हम सुझाव देंगे की आप एक अलग जावास्क्रिप्ट मॉड्यूल का प्रयोग करें क्योंकि कोई भी कौम्पोनॅन्ट इसको इम्पोर्ट कर सकता है एवं बिना इसको एक्सटेंड करे इसको फंक्शन, ऑब्जेक्ट, या फिर class की तरह प्रयोग कर सकता है|
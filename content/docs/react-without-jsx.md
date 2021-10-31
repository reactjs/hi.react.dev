---
id: react-without-jsx
title: JSX के बिना React
permalink: docs/react-without-jsx.html
---

React का उपयोग करने के लिए JSX की आवश्यकता नहीं है। JSX के बिना React का उपयोग करना विशेष रूप से तब सुविधाजनक होता है जब आप अपने बील्ड परिवेश मे कंपाइलेशन को सेटअप नहीं करना चाहते हैं।

प्रत्येक JSX एलिमेंट `React.createElement(component, props, ...children)` को कॉल करने के लिए मात्र सुंदर लिखने का तरीक़ा है। अतः, आप JSX से जो कुछ भी कर सकते हैं, वही सब सामान्य जावास्क्रिप्ट से भी किया जा सकता है।

उदाहरण के लिए, यह JSX के साथ लिखा गया कोड है:

```js
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```

उपरोक्त कोड को नीचे दिए कोड मे कंपाइल किया जा सकता है जिसमें JSX का उपयोग नहीं किया गया है

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

यदि आप अधिक उदाहरण देखने के लिए उत्सुक हैं कि JSX को जावास्क्रिप्ट में कैसे परिवर्तित किया जाता है, तो आप [ऑनलाइन Babel कंपाइलर](babel://jsx-simple-example) आज़मा सकते हैं।

कौम्पोनॅन्ट या एक स्ट्रिंग के रूप में या `React.Component` के सब-क्लास के रूप में या फिर एक सादे फ़ंक्शन के रूप में प्रदान किया जा सकता है।

यदि आप `React.createElement` टाइप करते-करते थक जाते हैं, तो एक सामान्य तारिका शॉर्टहैंड बनाना है:

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

यदि आप `React.createElement` के लिए इस शॉर्टहैंड फॉर्म का उपयोग करते हैं, तो JSX के बिना React का उपयोग करना लगभग सुविधाजनक हो सकता है।

इसके अलावा, आप [`रीएक्ट-हाइपरस्क्रिप्ट`](https://github.com/mlmorg/react-hyperscript) और [`हाइपरस्क्रिप्ट-हेल्पर्स`](https://github.com/ohanhi/hyperscript-helpers) जैसी सामुदायिक प्रोजेक्ट्स को भी देख सकते हैं, जो एक संक्षिप्त वाक्य रचना प्रदान करती हैं।

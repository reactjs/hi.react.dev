---
id: portals
title: Portals
permalink: docs/portals.html
prev: fragments.html
next: error-boundaries.html
---

Portals चिल्ड्रन को एक ऐसे DOM नोड में रेंडर करने का तरीका प्रदान करते हैं जो पैरेंट कौम्पोनॅन्ट के DOM हायरार्की के बाहर मौजूद हो।

```js
ReactDOM.createPortal(child, container)
```

सबसे पहला आर्गुमेंट (`child`) कोई भी [रेंडर होने में सक्षम React चाइल्ड](/docs/react-component.html#render) है, जैसे कोई एलिमेंट, स्ट्रिंग या फ्रेगमेंट। दूसरा आर्गुमेंट (`container`) एक DOM एलिमेंट है।

## उपयोग {#usage}

आम तौर पर, जब आप किसी कौम्पोनॅन्ट के रेंडर मेथड से एक एलिमेंट return करते हैं, तो उसे नज़दीकी पैरेंट नोड के चाइल्ड के रूप में DOM में माउंट करा जाता है:

```js{4,6}
render() {
  // React एक नया div माउंट करता है और इसमें चिल्ड्रन को रेंडर करता है
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

हालांकि, कभी कभार DOM में किसी अलग स्थान पर एक चाइल्ड को डालने की उपयोगिता होती है:

```js{6}
render() {
  // React एक नया div *नहीं* बनाता। वह चिल्ड्रन को `domNode` में रेंडर करता है।
  // `domNode` कोई भी एक मान्य DOM नोड है, DOM में इसका स्थान मायने नहीं रखता।
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

Portals के विशिष्ट उपयोग का उदाहरण है जब एक पैरेंट कौम्पोनॅन्ट में `overflow: hidden` या `z-index` स्टाइल हो, लेकिन नेत्रहीन आपको चाइल्ड को उसके कंटेनर से "बाहर" करने की आवश्यकता हो। जैसे की डॉयलोग्स, होवरकार्ड और टूलटिप्स।

> टिप्पणी:
>
> ध्यान रखें, Portals के साथ काम करते वक्त [कीबोर्ड फोकस को मैनेज करना](/docs/accessibility.html#programmatically-managing-focus) बहुत जरूरी हो जाता है।
>
> मोडल डॉयलोग्स के लिए, ये सुनिश्चित करें कि हर कोई [WAI-ARIA मोडल संलेखन प्रथाएं](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) का पालन करते हुए उनके साथ इंटरैक्ट कर सके।

[**इसे CodePen पर आजमाएं**](https://codepen.io/gaearon/pen/yzMaBd)

## Portals के माध्यम से इवेंट बबलिंग {#event-bubbling-through-portals}

एक portal DOM ट्री में कहीं भी हो, यह हर नज़रिये से एक सामान्य React चाइल्ड की तरह व्यवहार करता है। Context जैसे फीचर्स बिल्कुल उसी तरह से काम करते हैं, भले ही चाइल्ड एक portal हो, क्योंकि portal अभी भी *React ट्री* के अंदर है, इसका स्थान *DOM ट्री* में बेशक कहीं भी हो।

इसमें इवेंट बबलिंग भी शामिल है। एक portal के अंदर से चलाया गया इवेंट उस *React ट्री* के ऐन्सिस्टर्ज़ तक प्रचारित करेगा, भले ही वे एलिमेंट्स *DOM ट्री* में ऐन्सिस्टर्ज़ न हों। निम्न HTML ढांचे को मानते हुए:

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

`#app-root` में एक `पैरेंट` कौम्पोनॅन्ट अपने सिबलिंग नोड `#modal-root` से एक अज्ञात बबलिंग इवेंट को पकड़ने में सक्षम होगा।


```js{26-29,40-47,51,58-60,67-68,71}
// ये दो कंटेनर DOM में सिबलिंग हैं
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Modal के चिल्ड्रन को माउंट किए जाने के बाद portal एलिमेंट को DOM ट्री
    // में डाला जाता है, अर्थात चिल्ड्रन को एक अलग DOM नोड पर रखा जाएगा। यदि
    // चाइल्ड कौम्पोनॅन्ट को माउंट होने पर तुरंत DOM ट्री से जोड़ने की आवश्यकता होती है,
    // जैसे डोम नोड को मापने के लिए, या डिसेंडेंट में 'autoFocus' का उपयोग करना
    // हो, Modal में state जोड़ने के लिए और चिल्ड्रन केवल तभी रेंडर करने हों जब
    // DOM ट्री में Modal डाला जाये।
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // चाइल्ड में बटन पर क्लिक करने पर यह शुरू हो जाएगा,
    // पैरेंट की state को अपडेट करते हुए, भले ही DOM
    // में बटन प्रत्यक्ष डिसेंडेंट नहीं है।
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>क्लिक की संख्या: {this.state.clicks}</p>
        <p>
          ब्राउज़र DevTools खोलें और यह देखें 
          की बटन onClick हैंडलर वाले div का 
          चाइल्ड नहीं है।
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // इस बटन का क्लिक इवेंट पैरेंट तक पहुंच जाएगा,
  // क्योंकि कोई 'onClick' एट्रिब्यूट परिभाषित नहीं है
  return (
    <div className="modal">
      <button>क्लिक</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);
```

[**इसे CodePen पर आजमाएं**](https://codepen.io/gaearon/pen/jGBWpE)

किसी portal की इवेंट बबलिंग को उसके पैरेंट कौम्पोनॅन्ट में पकड़ने से अधिक लचीले सार का विकास होता है जो स्वाभाविक रूप से portals पर निर्भर नहीं होते हैं। उदाहरण के लिए, यदि आप एक `<Modal />` कौम्पोनॅन्ट रेंडर करते हैं तो पैरेंट इसके इवेंट्स को पकड़ सकते हैं भले ही यह portals का उपयोग करके लागू किया गया हो।

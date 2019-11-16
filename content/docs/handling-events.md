---
id: handling-events
title: Handling Events
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

React के एलिमेंट्स के साथ इवेंट्स हैंडल करना DOM एलिमेंट्स के इवेंट्स को हैंडल करने जैसा ही है । इनमे खाली कुछ सिंटैक्टिक अंतर हैं ।

* React के इवेंट्स का नाम lowercase कि जगह camelCase में रक्खा जाता है ।
* JSX का उपयोग करते समय, आप एक function को इवेंट हैंडलर में पास करते हैं, न की एक string को ।

उधारण के तौर पर, यह HTML code:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React में थोडा अलग है:

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

इसमें एक फरक यह भी है कि आप React में default behavior से बचने के लिए `false` रिटर्न नही कर सकते । आपको `preventDefault` अलग से कॉल करना पड़ेगा । उदहारण के तौर पर, अगर आप किसी HTML डॉक्यूमेंट कि लिंक के दुसरे पन्ने को खोलने के डिफ़ॉल्ट बेहेवियर से बचना चाहते हैं तो आप यह लिख सकते हैं:

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  इसे दबाएँ
</a>
```

In React, this could instead be:

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

यहाँ पर `e` एक सिंथेटिक इवेंट है । React इन सिंथेटिक इवेंट्स को [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/) के हिसाब से परिभाषित करता है, ताकी आपको cross-browser compatibility कि चिंता नही करनी पड़े । और सीखने के लिए [`SyntheticEvent`](/docs/events.html) की रिफरेन्स गाइड को देखें ।

React  को इस्तेमाल करते वक्त आम तौर पर आपको `addEventListener` को एक  DOM एलिमेंट पर कॉल करने की ज़रूरत नहीं पड़ेगी । इसकी जगह पर आप listener उस एलिमेंट पर तब ऐड कर सकते हैं जब वो इनिश्यली रेंडरा हो रहा हो ।

जब आप [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) से एक कौम्पोनॅन्ट डिफाइन करते हैं, तो इसके लिए इवेंट हैंडलर को उस क्लास का मेथड होना एक आम पैटर्न है । उद्धरण के तौर पर `Toggle` कॉम्पोनेन्ट एक बटन को रेंडर करता है, ये बटन यूज़र को "ON" और "OFF" states को बदलने देता है:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[**इससे CodePen पर इस्तेमाल करें**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

JSX callbacks आपको `this` के मतलब के साथ ध्यानपूर्वक रहना चाहिए । जावास्क्रिप्ट में class मेथड्स पहले से [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) नहीं होते । अगर आप `this.handleClick` को bind करना भूल जाते हैं और उसे `onClick` पर पास कर देते हैं तो, `this` function के बुलाने पर `undefined` हो जाता है ।

यह बर्ताव React कि वजेह से नहीं होता बल्कि यह [जावास्क्रिप्ट के functions के काम करने के तरीके का एक भाग है ](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). आम तौर पर अगर आप किसी मेथड को बिना `()` को उसके बाद में लगाये refer करते है, जैसे, `onClick={this.handleClick}` तो आपको वो मेथड bind करना चाहिए ।

अगर `bind` का बार बार कॉल करना आपको परेशान करता है, तो इससे बचने के आपके पास दो तरीके हैं । अगर आप experimental [public class फ़ील्ड्स सिंटेक्स](https://babeljs.io/docs/plugins/transform-class-properties/) इस्तेमाल कर रहे हैं, तो आप class फ़ील्ड्स का इस्तेमाल करके callbacks को सही से bind कर सकते हैं:

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

यह सिंटैक्स [Create React App](https://github.com/facebookincubator/create-react-app) में डिफ़ॉल्ट रूप में पाया जाता है। 

अगर आप class फील्ड सिंटैक्स नहीं इस्तेमाल कर रहें हैं तो आप callback में [एरो फंक्शन](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) का इस्तेमाल कर सकते हैं। 

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

इस सिंटैक्स के साथ यह दिक्कत है की जितनी बार कोई अलग callback बनता है उतनी बार `LoggingButton` फिरसे रेंडर होता है। ज़्यादातर मामलो में इससे कोई समस्या नहीं होती है। लेकिन अगर इस callback को निचले कौम्पोनॅन्ट में पास किया जाता है तो हो सकता है की कौम्पोनॅन्ट को ज़्यादा री-रेंडरिंग करनी पड़े। हम आम तौर पर constructor को bind करने के लिए या class फील्ड सिंटैक्स के इस्तेमाल को बढ़ावा देते हैं ताकि इस तरह की परफॉरमेंस की दिक्कते ना आए। 

## इवेंट हैंडलर में आर्ग्यूमेंट्स देना {#passing-arguments-to-event-handlers}

एक loop के अंदर अक्सर लोग इवेंट हैंडलर में एक एक्स्ट्रा पैरामीटर देना चाहते हैं। उदहारण के तौर पर अगर `id` एक row की id है तो इनमे से कोई भी काम कर जाएगा:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

ऊपर की दोनों लाइने एक ही काम करती हैं और [एरो फंक्शन्स](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) और [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) का क्रमशः इस्तेमाल करती हैं।

इन दोनों ही मामलो में `e` आर्गुमेंट जो की React इवेंट को दिखाता है वो एक दूसरे आर्गुमेंट की तरह ID के बाद pass किया जाएगा। एरो फंक्शन्स के साथ हमे इसे स्पष्ठ रूप में पास करना होगा, लेकिन `bind` के साथ कोई भी अतिरिक्त आर्ग्यूमेंट्स खुद ब खुद आगे चले जाते हैं।

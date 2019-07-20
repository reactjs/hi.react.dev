---
id: shallow-renderer
title: Shallow Renderer
permalink: docs/shallow-renderer.html
layout: docs
category: Reference
---

**Importing**

```javascript
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 with npm
```

## ओवरव्यू {#overview}

React के लिए यूनिट टेस्ट लिखते समय शैलो रेंडरिंग काफ़ी उपयोगी हो सकती है। शैलो रेंडरिंग आपको एक कौम्पोनॅन्ट को "एक स्तर गहरा" रेंडर करने देता है और आपको दृढ़ता से ये जांच करने की क्षमता प्रदान करता है कि इस कौम्पोनॅन्ट का रेंडर मेथड क्या return करेगा, child कौम्पोनॅन्टस के व्यव्हार की चिंता किये बिना, जो की instantiate या रेंडर नहीं होते। इसमें DOM की आवश्यकता नहीं होती है।

उदहारण के लिए, अगर आपके पास निम्नलिखित कौम्पोनॅन्ट है:

```javascript
function MyComponent() {
  return (
    <div>
      <span className="heading">Title</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

तब आप जांच कर सकते हैं:

```javascript
import ShallowRenderer from 'react-test-renderer/shallow';

// in your test:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Title</span>,
  <Subcomponent foo="bar" />
]);
```

वर्तमान में शैलो टेस्टिंग की कुछ सीमाएँ हैं, नामतः ये refs के साथ काम नहीं करता।

> टिप्पणी:
>
> हम Enzyme के [शैलो रेंडरिंग API](https://airbnb.io/enzyme/docs/api/shallow.html) का भी परीक्षण करने की भी सलाह देते हैं। यह समान कार्यक्षमता पर एक अच्छा उच्च स्तरीय API प्रदान करता है।

## संदर्भ {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

आप जिस कौम्पोनॅन्ट का परीक्षण कर रहे हैं, shallowRenderer को आप उसे रेंडर करने के एक "स्थान" की तरह सोच सकते हैं, और जिससे आप कौम्पोनॅन्ट के आउटपुट को निकाल सकते हैं।

`shallowRenderer.render()` [`ReactDOM.render()`](/docs/react-dom.html#render) के समान ही है लेकिन इसे DOM की आवश्यकता नहीं है और यह केवल एक स्तर गहराई तक ही रेंडर करता है। इसका मतलब आप कौम्पोनॅन्टस का परिक्षण उनके children के लागू होने के तरीके से अलग रखकर कर सकते हैं।

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

`shallowRenderer.render()` के call हो जाने के बाद आप शैलो रेंडर हुए आउटपुट को पाने के लिए `shallowRenderer.getRenderOutput()` का इस्तेमाल कर सकते हैं।

तब आप आउटपुट के बारे में तथ्यों की जांच करना शुरू कर सकते हैं।
---
id: test-renderer
title: परीक्षण रेंडरर
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**इम्पॉर्टिंग**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 npm के द्वारा
```

## ओवरव्यू {#overview}

यह package एक React रेंडरर प्रदान करता है जिसका उपयोग DOM या देशी मोबाइल वातावरण पर निर्भर किये बिना, शुद्ध जावास्क्रिप्ट ऑब्जेक्ट्स के लिए React कौम्पोनॅन्ट को प्रस्तुत करने के लिए किया जा सकता है।

दर असल, यह package एक ब्राउज़र या [jsdom](https://github.com/tmpvar/jsdom) का उपयोग किए बिना React DOM या React Native कौम्पोनॅन्ट द्वारा रेंडर किए गए प्लेटफ़ॉर्म व्यू हायरार्की (एक DOM ट्री के समान) का स्नैपशॉट लेना आसान बनाता है।

उदाहरण:

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

JSON tree की एक कॉपी को फ़ाइल में स्वचालित रूप से सहेजने और अपने परीक्षणों में जांचने के लिए कि यह नहीं बदला है, आप Jest के स्नैपशॉट परीक्षण सुविधा का उपयोग कर सकते हैं: [इसके बारे में अधिक जानें](https://jestjs.io/docs/en/snapshot-testing)।

आप विशिष्ट नोड्स खोजने और उनके बारे में अभिकथन करने के लिए आउटपुट को ट्रावरस​ कर सकते हैं।

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### TestRenderer instance {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## संदर्भ {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

पास किये गए React एलिमेंट के साथ एक `TestRenderer` उदाहरण बनाएँ। यह वास्तविक DOM का उपयोग नहीं करता है, फिर भी पूरी तरह से कौम्पोनॅन्ट tree को रेंडर करता है ताकि आप इसके बारे में दावे कर सकें। एक [TestRenderer instance](#testrenderer-instance) लौटाता है।

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

[`react-dom/test-utils` के `act()` सहायक ](/docs/test-utils.html#act) के समान, `TestRenderer.act` पुष्टि के लिए एक कौम्पोनॅन्ट तैयार करता है। `TestRenderer.create` और `testRenderer.update` को `act()` कॉल के अंदर सम्मिलित करने के लिए इस संस्करण का उपयोग करें।

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // परीक्षण किया जा रहा कौम्पोनॅन्ट

// कौम्पोनॅन्ट रेंडर करें
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// रूट पर पुष्टि करें
expect(root.toJSON()).toMatchSnapshot();

// कुछ अलग props के साथ अपडेट करें
act(() => {
  root.update(<App value={2}/>);
})

// रूट पर पुष्टि करें
expect(root.toJSON()).toMatchSnapshot();
```

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

रेंडर किए गए tree का रिप्रजेंटेशन करने वाली एक ऑब्जेक्ट लौटाएं। इस tree में केवल प्लेटफ़ॉर्म-विशिष्ट नोड्स जैसे `<div>` या `<View>` और उनके props हैं, लेकिन इनमें कोई यूजर द्वारा लिखित कौम्पोनॅन्ट नहीं है। यह [snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) के लिए आसान रहता है।

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

रेंडर किए गए tree का रिप्रजेंटेशन करने वाली एक ऑब्जेक्ट लौटाएं। यह रिप्रजेंटेशन, `toJSON()` द्वारा प्रदान की तुलना में अधिक विस्तृत है और इसमें यूजर द्वारा लिखित कौम्पोनॅन्ट शामिल हैं। जब तक आप परीक्षण रेंडर के ऊपर पर अपनी खुद की लाइब्रेरी नहीं लिख रहे हैं, तब तक आपको इस तरीके की आवश्यकता नहीं है।

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

एक नए रूट एलिमेंट के साथ इन-मेमोरी tree को फिर से रेंडर करें। यह रूट पर एक React अपडेट का अनुकरण करता है। यदि नए एलिमेंट में पिछले एलिमेंट के समान प्रकार और key है, तो tree को अपडेट किया जाएगा; अन्यथा, यह एक नए tree को फिर से स्थापित कर देगा।

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```

इन-मेमोरी tree को अनमाउंट करें, जिससे उचित लाइफसाइकिल इवेंट्स को ट्रिगर किया जा सके।

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

यदि उपलब्ध हो, तो रूट एलिमेंट के अनुरूप उदाहरण लौटाता है। यदि रूट एलिमेंट एक फ़ंक्शन कौम्पोनॅन्ट है, तो यह काम नहीं करेगा क्योंकि उनके पास instances नहीं हैं।

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

रूट "परीक्षण उदाहरण" ऑब्जेक्ट लौटाता है जो tree में विशिष्ट नोड्स के बारे में पुष्टि करने के लिए उपयोगी है। आप इसका उपयोग अन्य गहराई में मौजूद "परीक्षण उदाहरण" को खोजने के लिए कर सकते हैं।

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

एक वंशज परीक्षण उदाहरण प्राप्त करता है जिसके लिए `test(testInstance)`, `true` लौटाता है। यदि `test(testInstance)` एक परीक्षण उदाहरण के लिए `true` वापस नहीं करता है, तो यह एक एरर थ्रो करता है।

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

प्रदान किए गए `type` के साथ एक वंशज परीक्षण उदाहरण ढूँढता है। यदि प्रदान किए गए `type` के साथ एक परीक्षण उदाहरण नहीं है, तो यह एक एरर थ्रो करता है।

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

प्रदान किए गए `props` के साथ एक वंशज परीक्षण उदाहरण ढूँढता है। यदि प्रदान किए गए `props` के साथ एक परीक्षण उदाहरण नहीं है, तो यह एक एरर थ्रो करता है।

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

सभी वंशज परीक्षण उदाहरणों को ढूँढता है जिसके लिए `test(testInstance)`, `true` देता है।

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

दिए गए `type` के साथ सभी वंशज परीक्षण उदाहरणों का पता लगाएं।

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

दिए गए `props` के साथ सभी वंशज परीक्षण उदाहरणों का पता लगाएं।

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

परीक्षण उदाहरण के अनुरूप कौम्पोनॅन्ट उदाहरण। यह केवल class कौम्पोनॅन्ट के लिए उपलब्ध है, क्योंकि फ़ंक्शन कौम्पोनॅन्ट में इंस्टेंस नहीं होते। यह दिए गए कौम्पोनॅन्ट के अंदर `this` मूल्य से मेल खाता है।

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

इस परीक्षण उदाहरण के अनुरूप कौम्पोनॅन्ट टाइप। उदाहरण के लिए, एक `<Button />` कौम्पोनॅन्ट में एक प्रकार का `Button` होता है।

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

इस परीक्षण उदाहरण के अनुरूप props। उदाहरण के लिए, एक `<Button size="small" />` कौम्पोनॅन्ट में `{size: 'small'}` props के रूप में है।

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

इस परीक्षण उदाहरण का पैरेंट परीक्षण उदाहरण।

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

इस परीक्षण उदाहरण का चिल्ड्रन परीक्षण उदाहरण।

## Ideas {#ideas}

आप ऑप्‍शन​ के रूप में `createNodeMock` फ़ंक्शन को `TestRenderer.create` को पास कर सकते हैं, जो कस्टम मॉक रेफस के लिए अनुमति देता है। `createNodeMock` वर्तमान एलिमेंट को स्वीकार करता है और उसे एक मॉक रेफ ऑब्जेक्ट वापस करना चाहिए। यह उस समय उपयोगी है जब आप एक कौम्पोनॅन्ट का परीक्षण करते हैं जो रेफ पर निर्भर करता है।

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // फोकस फ़ंक्शन की नकल करें
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```

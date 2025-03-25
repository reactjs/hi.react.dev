---
title: डेटा को कॉन्टेक्स्ट का उपयोग करके गहराई तक भेजना
---

<Intro>

आमतौर पर, आप जानकारी को एक पैरेंट कौम्पोनॅन्ट से एक चाइल्ड कौम्पोनॅन्ट तक प्रॉप्स के माध्यम से भेजते हैं। लेकिन प्रॉप्स को भेजना वाचाल और असुविधाजनक बन सकता है यदि आपको उन्हें बीच में कई कॉम्पोनेंट्स से भेजना पड़ता है, या यदि आपके ऐप में कई कॉम्पोनेंट्स को समान जानकारी की आवश्यकता है। *कॉन्टेक्स्ट* पैरेंट कौम्पोनॅन्ट को उसके नीचे के पेड़ में किसी भी कॉन्टेक्स्ट के लिए कुछ जानकारी उपलब्ध कराने देता है - चाहे वह कितना भी गहरा हो - बिना उसे प्रॉप्स के द्वारा स्पष्ट रूप से पास किये।

</Intro>

<YouWillLearn>

- "प्रोप ड्रिलिंग" क्या है
- कॉन्टेक्स्ट के द्वारा प्रोप का बार-बार करना कैसे बदलें
- कॉन्टेक्स्ट के लिए सामान्य उपयोग
- कॉन्टेक्स्ट के सामान्य विकल्प

</YouWillLearn>

## प्रॉप्स को पास करने में समस्या {/*the-problem-with-passing-props*/}

[प्रॉप्स को पास करना](/learn/passing-props-to-a-component) अपने UI ट्री के माध्यम से स्पष्ट रूप से डेटा को उन कॉम्पोनेंट्स को पाइप करने का एक शानदार तरीका है जो इसका उपयोग करते हैं।

लेकिन प्रॉप्स को पास करना वाचाल और असुविधाजनक बन सकता है जब आपको पेड़ के माध्यम से कुछ प्रोप को गहराई तक पास करने की आवश्यकता होती है, या यदि कई कॉम्पोनेंट्स को एक ही प्रोप की आवश्यकता होती है। निकटतम एंसेस्टर को उन कॉम्पोनेंट्स से दूर किया जा सकता है जिन्हें डेटा की आवश्यकता है, और उतनी ऊँची [स्टेट को उठाना](/learn/sharing-state-between-components) "प्रोप ड्रिलिंग" नामक स्थिति को जन्म दे सकता है।

<DiagramGroup>

<Diagram name="passing_data_lifting_state" height={160} width={608} captionPosition="top" alt="तीन कॉम्पोनेंट्स के एक पेड़ के साथ आरेख। पैरेंट में बैंगनी रंग में हाइलाइट किए गए मूल्य का प्रतिनिधित्व करने वाला एक बुलबुला है। वैल्यू दोनों में से प्रत्येक के लिए नीचे बह रहा है, दोनों बैंगनी रंग में हाइलाइट किए गए हैं।" >

स्टेट को ऊपर उठाना

</Diagram>
<Diagram name="passing_data_prop_drilling" height={430} width={608} captionPosition="top" alt="दस नोड्स के एक पेड़ के साथ आरेख, दो चिल्ड्रन या उससे कम के साथ प्रत्येक नोड। रूट नोड में बैंगनी रंग में हाइलाइट किए गए मान का प्रतिनिधित्व करने वाला एक बुलबुला है। मान दो चिल्ड्रन के माध्यम से बह रहा है, जिनमें से प्रत्येक मूल्य पास करता है लेकिन इसमें शामिल नहीं होता है। वामपंथी दो चिल्ड्रन को मूल्य से नीचे ले जाता है जो दोनों पर्पल पर प्रकाश डालते हैं।रूट का सही बच्चा अपने दो चिल्ड्रन में से एक के माध्यम से मूल्य को पारित करता है - दाईं ओर, जो बैंगनी को हाइलाइट किया जाता है।उस बच्चे ने अपने एकल बच्चे के माध्यम से मूल्य पारित किया, जो इसे अपने दोनों दो चिल्ड्रन के लिए नीचे ले जाता है, जो बैंगनी को हाइलाइट किया जाता है।">

प्रोप ड्रिलिंग

</Diagram>

</DiagramGroup>

क्या यह बहुत अच्छा नहीं होगा यदि पेड़ में कॉम्पोनेंट्स ko बिना प्रॉप्स के पास किये डेटा "टेलीपोर्ट" करने का एक तरीका होता जिनको उसकी जरुरत है? React के कॉन्टेक्स्ट फ़ीचर के साथ, यह संभव है!

## कॉन्टेक्स्ट: प्रॉप्स को भेजने का एक विकल्प {/*context-an-alternative-to-passing-props*/}

कॉन्टेक्स्ट एक पैरेंट कौम्पोनॅन्ट को उसके नीचे पूरे पेड़ को डेटा प्रदान करने देता है। कॉन्टेक्स्ट के कई उपयोग हैं। यहाँ एक उदाहरण है। इस `Heading` कौम्पोनॅन्ट पर विचार करें जो इसके आकार के लिए एक `level` स्वीकार करता है:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Heading level={2}>Heading</Heading>
      <Heading level={3}>Sub-heading</Heading>
      <Heading level={4}>Sub-sub-heading</Heading>
      <Heading level={5}>Sub-sub-sub-heading</Heading>
      <Heading level={6}>Sub-sub-sub-sub-heading</Heading>
    </Section>
  );
}
```

```js src/Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

```js src/Heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

मान लीजिए कि आप एक ही `Section` के भीतर कई शीर्षकों का हमेशा एक ही आकार चाहते हैं:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

```js src/Heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

वर्तमान में, आप `level` प्रोप को अलग से प्रत्येक `<Heading>` में पास करते हैं:

```js
<Section>
  <Heading level={3}>About</Heading>
  <Heading level={3}>Photos</Heading>
  <Heading level={3}>Videos</Heading>
</Section>
```

यह अच्छा होगा यदि आप `level` प्रोप को इसके बजाय `<Section>` कौम्पोनॅन्ट में पास कर सकते और इसे `<Heading>` से हटा सकते। इस प्रकार आप यह लागू कर सकते हैं कि एक ही सैक्शन में सभी शीर्षकों का आकार समान है:

```js
<Section level={3}>
  <Heading>About</Heading>
  <Heading>Photos</Heading>
  <Heading>Videos</Heading>
</Section>
```

लेकिन `<Heading>` कौम्पोनॅन्ट अपने निकटतम `<Section>` के स्तर को कैसे जान सकता है? **इसके लिए एक चाइल्ड के लिए पेड़ में कहीं ऊपर से डेटा के लिए "पूछने" के लिए किसी तरह की आवश्यकता होगी।**

आप इसे अकेले प्रॉप्स के साथ नहीं कर सकते। यह वह जगह है जहां कॉन्टेक्स्ट काम आता है। आप इसे तीन स्टेप में करेंगे:

1. कॉन्टेक्स्ट को **बनाएं।**. (आप इसे `LevelContext` बुला सकते हैं, चूंकि यह शीर्षक स्तर के लिए है।)
2. उस कौम्पोनॅन्ट से उस कॉन्टेक्स्ट का **उपयोग करें** जिसे डेटा की आवश्यकता है। (`Heading` `LevelContext` का प्रयोग करेगा।)
3. डेटा को निर्दिष्ट करने वाले कौम्पोनॅन्ट से उस कॉन्टेक्स्ट को **प्रदान करें**। (`Section` `LevelContext` को प्रदान करेगा।)

कॉन्टेक्स्ट एक पैरेंट--यहां तक ​​कि बहुत दूर वाला भी!--उसके अंदर पूरे पेड़ को कुछ डेटा प्रदान करने देता है।

<DiagramGroup>

<Diagram name="passing_data_context_close" height={160} width={608} captionPosition="top" alt="तीन कॉम्पोनेंट्स के एक पेड़ के साथ आरेख। पैरेंट में एक बुलबुला है जो नारंगी में हाइलाइट किए गए एक मूल्य का प्रतिनिधित्व करता है जो दो बच्चों के लिए नीचे प्रोजेक्ट करता है, प्रत्येक को नारंगी में हाइलाइट किया गया है।">

करीबी चिल्ड्रन में कॉन्टेक्स्ट का उपयोग करना

</Diagram>

<Diagram name="passing_data_context_far" height={430} width={608} captionPosition="top" alt="दस नोड्स के एक पेड़ के साथ आरेख, दो बच्चों या उससे कम के साथ प्रत्येक नोड। रूट पेरेंट नोड में एक बुलबुला होता है जो नारंगी में हाइलाइट किए गए मान का प्रतिनिधित्व करता है। मूल्य सीधे चार पत्तियों और पेड़ में एक मध्यवर्ती कौम्पोनॅन्ट पर प्रोजेक्ट करता है, जो सभी नारंगी में हाइलाइट किए गए हैं। अन्य मध्यवर्ती कॉम्पोनेंट्स में से कोई भी हाइलाइट नहीं किया गया है।">

दूर के चिल्ड्रन में कॉन्टेक्स्ट का उपयोग करना

</Diagram>

</DiagramGroup>

### स्टेप 1: कॉन्टेक्स्ट बनाएं {/*step-1-create-the-context*/}

सबसे पहले, आपको कॉन्टेक्स्ट बनाने की आवश्यकता है। आपको **इसे एक फ़ाइल से निर्यात** करने की आवश्यकता होगी ताकि आपके कॉम्पोनेंट्स इसका उपयोग कर सकें:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

```js src/Heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js active
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

`CreateContext` का एकमात्र आर्ग्युमेंट _डिफ़ॉल्ट_ वैल्यू है। यहाँ, `1` सबसे बड़े हेडिंग स्तर को संदर्भित करता है, लेकिन आप किसी भी तरह के मूल्य (यहां तक ​​कि एक ऑब्जेक्ट) को पास कर सकते हैं। आप अगले स्टेप में डिफ़ॉल्ट वैल्यू का महत्व देखेंगे।

### स्टेप 2: कॉन्टेक्स्ट का उपयोग करें {/*step-2-use-the-context*/}

React के `useContext` hook को और अपने कॉन्टेक्स्ट को आयात करें:

```js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';
```

वर्तमान में, `Heading` कौम्पोनॅन्ट प्रॉप्स से `level` प्राप्त करता है:

```js
export default function Heading({ level, children }) {
  // ...
}
```

इसके बजाय, `level` प्रोप को हटा दें और आपके द्वारा इम्पोर्ट किए गए कॉन्टेक्स्ट `LevelContext` से वैल्यू रीड करें:

```js {2}
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```

`useContext` एक Hook है। `useState` और` useReducer` की तरह ही, आप एक React कौम्पोनॅन्ट के अंदर एक Hook को तुरंत ही कॉल कर सकते हैं (loops या conditions के अंदर नहीं)। **`useContext` React को बताता है कि `Heading` कौम्पोनॅन्ट `LevelContext` को पढ़ना चाहता है।**

अब जब `Heading` कौम्पोनॅन्ट में `level` प्रोप नहीं है, तो आपको अपने JSX में `Heading` को level प्रोप को इस प्रकार से अब पास करने की आवश्यकता नहीं है:

```js
<Section>
  <Heading level={4}>Sub-sub-heading</Heading>
  <Heading level={4}>Sub-sub-heading</Heading>
  <Heading level={4}>Sub-sub-heading</Heading>
</Section>
```

JSX को अपडेट करें ताकि यह इसके बजाय अब `Section` हो जो इसे प्राप्त करे:

```jsx
<Section level={4}>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
</Section>
```

एक अनुस्मारक के रूप में, यह मार्कअप है जिसे आप सही काम करने की कोशिश करा रहे थे:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

ध्यान दें कि यह उदाहरण अब भी काफी काम नहीं करता है! सभी शीर्षकों का एक ही आकार है क्योंकि **भले ही आप *कॉन्टेक्स्ट* का उपयोग कर रहे हैं, आपने इसे अभी तक *प्रदान* नहीं किया है।** react को पता नहीं है कि इसे कहां से प्राप्त करना है!

यदि आप कॉन्टेक्स्ट प्रदान नहीं करते हैं, तो React पिछले स्टेप में आपके द्वारा निर्दिष्ट डिफ़ॉल्ट मान का उपयोग करेगा। इस उदाहरण में, आपने `1` को `createContext` के आर्ग्युमेंट के रूप में निर्दिष्ट किया था, इसलिए `useContext(LevelContext)` `1` रिटर्न करता है, जिससे वे सभी शीर्षक `<h1>` पर सेट हो गए हैं। आइए इस समस्या को प्रत्येक `Section` अपना कॉन्टेक्स्ट प्रदान कराने के द्वारा ठीक करें ।

### स्टेप 3: कॉन्टेक्स्ट प्रदान करें {/*step-3-provide-the-context*/}

अभी `Section` कौम्पोनॅन्ट अपने चिल्ड्रन को रेंडर करता है:

```js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

उन्हें `LevelContext` प्रदान करने के लिए **उन्हें एक कॉन्टेक्स्ट प्रदाता के साथ लपेटें**:

```js {1,6,8}
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```

यह React को बताता है: "यदि इस `<Section>` के अंदर कोई भी कौम्पोनॅन्ट `LevelContext` के लिए पूछता है, तो उन्हें यह `level` दें।" कौम्पोनॅन्ट इसके ऊपर UI पेड़ में निकटतम `<LevelContext>` के मान का उपयोग करेगा।

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

यह मूल कोड के समान परिणाम है, लेकिन आपको प्रत्येक `Heading` कौम्पोनॅन्ट को `level` प्रोप को पास करने की आवश्यकता नहीं पड़ी! इसके बजाय, यह अपने ऊपर निकटतम `Section` से पूछकर अपने शीर्षक स्तर का "पता कर लेता है":

1. आप `<Section>` में एक `level` प्रोप को पास करते हैं।
2. `Section` अपने चिल्ड्रन को `<LevelContext value={level}>` में लपेटता है।
3. `Heading` `LevelContext` के निकटतम मूल्य को `useContext(LevelContext)` का उपयोग करके ऊपर पूछता है।

## एक ही कौम्पोनॅन्ट से कॉन्टेक्स्ट का उपयोग करना और प्रदान करना {/*using-and-providing-context-from-the-same-component*/}

वर्तमान में, आपको अभी भी प्रत्येक सेक्शन का `level` खुद से निर्दिष्ट करना पड़ रहा है:

```js
export default function Page() {
  return (
    <Section level={1}>
      ...
      <Section level={2}>
        ...
        <Section level={3}>
          ...
```

चूंकि कॉन्टेक्स्ट आपको ऊपर एक कौम्पोनॅन्ट से जानकारी पढ़ने देता है, प्रत्येक `Section` ऊपर वाले `Section` से `level` पढ़ सकता है, और स्वचालित रूप से `level + 1` नीचे पास कर सकता है। यहां बताया गया है कि आप इसे कैसे कर सकते हैं:

```js src/Section.js {5,8}
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

इस परिवर्तन के साथ, आपको `level` प्रोप को न ही `<Section>` न ही `<Heading>` में पास करने की आवश्यकता है।

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

अब दोनों `Heading` और `Section` `LevelContext` को पढ़ते है यह पता लगाने के लिए कि वे कितने "गहरे" हैं। और `Section` अपने चिल्ड्रन को `LevelContext` में लपेटता है, यह निर्दिष्ट करने के लिए कि इसके अंदर कुछ भी "गहरे" स्तर पर है।

<Note>

यह उदाहरण हेडिंग स्तर का उपयोग करता है क्योंकि वे दिखाते हैं कि कैसे नेस्टेड कौम्पोनॅन्ट कॉन्टेक्स्ट को ओवरराइड कर सकते हैं। लेकिन कॉन्टेक्स्ट कई अन्य उपयोग के मामलों के लिए भी उपयोगी है। आप संपूर्ण उप-वृक्ष द्वारा आवश्यक किसी भी जानकारी को पास कर सकते हैं: वर्तमान कलर थीम, वर्तमान में लॉग इन उपयोगकर्ता, और इसी तरह।

</Note>

## कॉन्टेक्स्ट मध्यवर्ती कौम्पोनॅन्ट कॉम्पोनेंट्स से गुजरता है {/*context-passes-through-intermediate-components*/}

आप उन कॉम्पोनेंट्स के बीच में कई कॉम्पोनेंट्स को सम्मिलित कर सकते हैं जो कॉन्टेक्स्ट प्रदान करता है और जो इसका उपयोग करता है। इसमें `<div>` जैसे अंतर्निहित कॉम्पोनेंट्स और वे कॉम्पोनेंट्स जो आप स्वयं बना सकते हैं, दोनों शामिल हैं।

इस उदाहरण में, एक ही `Post` कौम्पोनॅन्ट (एक धराशायी सीमा के साथ) को दो अलग -अलग nesting स्तरों पर रेंडर किया गया है। ध्यान दें कि इसके अंदर `<Heading>` को इसका स्तर निकटतम `<Section>` से स्वचालित रूप से मिल जाता है:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post
        title="Hello traveller!"
        body="Read about my adventures."
      />
      <AllPosts />
    </Section>
  );
}

function AllPosts() {
  return (
    <Section>
      <Heading>Posts</Heading>
      <RecentPosts />
    </Section>
  );
}

function RecentPosts() {
  return (
    <Section>
      <Heading>Recent Posts</Heading>
      <Post
        title="Flavors of Lisbon"
        body="...those pastéis de nata!"
      />
      <Post
        title="Buenos Aires in the rhythm of tango"
        body="I loved it!"
      />
    </Section>
  );
}

function Post({ title, body }) {
  return (
    <Section isFancy={true}>
      <Heading>
        {title}
      </Heading>
      <p><i>{body}</i></p>
    </Section>
  );
}
```

```js src/Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children, isFancy }) {
  const level = useContext(LevelContext);
  return (
    <section className={
      'section ' +
      (isFancy ? 'fancy' : '')
    }>
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}

.fancy {
  border: 4px dashed pink;
}
```

</Sandpack>

आपने इसे काम करने के लिए कुछ खास नहीं किया। एक `Section` उसके अंदर के पेड़ के लिए कॉन्टेक्स्ट को निर्दिष्ट करता है, जिससे आप कहीं भी एक `<Heading>` डाल सकते हैं, और इसका सही आकार होगा। इसे ऊपर सैंडबॉक्स में आज़माएं!

**कॉन्टेक्स्ट आपको ऐसे कौम्पोनॅन्ट को लिखने देता है जो "अपने परिवेश के अनुकूल बन जाते हैं" और खुद को अलग -अलग तरीके से प्रदर्शित करते हैं जो इस बात पर निर्भर करता है की वे _कहाँ_ (या, दूसरे शब्दों में, _किस कॉन्टेक्स्ट में_) रेंडर हो रहे हैं।**

कैसे कॉन्टेक्स्ट काम करता है आपको [CSS property inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance) की याद दिला सकता है। CSS में आप एक `<div>` और उसके अंदर किसी भी DOM node के लिए `color: blue` को निर्दिष्ट कर सकते हैं। इसी तरह, React में, ऊपर से आने वाले कुछ कॉन्टेक्स्ट को ओवरराइड करने का एकमात्र तरीका चिल्ड्रन को एक अलग मूल्य के साथ एक कॉन्टेक्स्ट प्रदाता में लपेटना है।

CSS में, `color` और `background-color` जैसे विभिन्न प्रोपर्टीज़ एक दूसरे को ओवरराइड नहीं करती हैं। आप `background-color` को प्रभावित किए बिना सभी `<div>` के `color` को red सेट कर सकते हैं। इसी प्रकार, **अलग-अलग React कॉन्टेक्स्ट एक-दूसरे को ओवरराइड नहीं करते हैं।** प्रत्येक कॉन्टेक्स्ट जो आप `createContext()` का प्रयोग कर बनाते हैं, अन्य कॉन्टेक्स्ट से पूरी तरह से अलग होता है, और उन कॉम्पोनेंट्स को जो *उस विशिष्ट कॉन्टेक्स्ट* का उपयोग और प्रदान करते हैं, एक साथ बांधता है। एक कौम्पोनॅन्ट बिना किसी समस्या के कई अलग-अलग कॉन्टेक्स्ट का उपयोग या प्रदान कर सकता है।

## इससे पहले कि आप कॉन्टेक्स्ट का उपयोग करें {/*before-you-use-context*/}

कॉन्टेक्स्ट का उपयोग करना बहुत लुभावना है! हालांकि, इसका मतलब यह भी है कि इसे अति प्रयोग करना बहुत आसान है। **सिर्फ इसलिए कि आपको कई गहरे स्तरों तक कुछ प्रॉप्स पास करने की आवश्यकता का यह मतलब नहीं है कि आपको उस जानकारी को कॉन्टेक्स्ट में रखना चाहिए।**

कॉन्टेक्स्ट का उपयोग करने से पहले आपको इन कुछ विकल्पों पर विचार करना चाहिए:

1. **[प्रॉप्स को पास करने](/learn/passing-props-to-a-component) से शुरू करें।** यदि आपके कॉम्पोनेंट्स तुच्छ नहीं हैं, तो दर्जन भर कॉम्पोनेंट्स के माध्यम से दर्जन भर प्रॉप्स को पास करना असामान्य नहीं है। यह एक नारे की तरह लग सकता है, लेकिन यह बहुत स्पष्ट करता है कि कौन से कॉम्पोनेंट्स किस डेटा का उपयोग करते हैं! आपके कोड को मेन्टेन रखने वाले व्यक्ति को खुशी होगी कि आपने डेटा प्रवाह को प्रॉप्स के साथ स्पष्ट कर दिया है।
2. **कॉम्पोनेंट्स को एक्सट्रेक्ट करें और [JSX को `चिल्ड्रन` के रूप में](/learn/passing-props-to-a-component#passing-jsx-as-children) उनमे भेजें।** यदि आप मध्यवर्ती कॉम्पोनेंट्स की कई परतों के माध्यम से कुछ डेटा पास करते हैं जो उस डेटा का उपयोग नहीं करते हैं (और केवल इसे और नीचे पास करते हैं), तो इसका मतलब है कि आप कुछ कॉम्पोनेंट्स को एक्सट्रेक्ट करने के लिए भूल गए। उदाहरण के लिए, हो सकता है कि आप दृश्य कॉम्पोनेंट्स के लिए `posts` जैसे डेटा प्रॉप्स पास करते हैं जो उन्हें सीधे उपयोग नहीं करते हैं, जैसे कि `<Layout posts={posts} />`। इसके बजाय, `Layout` को `children` को एक प्रोप के रूप में लेने के लिए बनाएं, और `<Layout><Posts posts={posts} /></Layout>` को रेंडर करें। यह डेटा को निर्दिष्ट करने वाले कौम्पोनॅन्ट और डेटा की आवश्यकता वाले कौम्पोनॅन्ट के बीच परतों की संख्या को कम करता है।

यदि इनमें से कोई भी दृष्टिकोण आपके लिए अच्छा काम नहीं करता है, तो कॉन्टेक्स्ट पर विचार करें।

## कॉन्टेक्स्ट के लिए उपयोग के मामले {/*use-cases-for-context*/}

* **थीम:** यदि आपका ऐप उपयोगकर्ता को अपनी उपस्थिति (जैसे डार्क मोड) को बदलने देता है, तो आप अपने ऐप के शीर्ष पर एक कॉन्टेक्स्ट प्रदाता रख सकते हैं, और उस कॉन्टेक्स्ट का उपयोग उन कॉन्टेक्स्ट में कर सकते हैं जिन्हें अपने दृश्य लुक को समायोजित करने की आवश्यकता है।
* **चालू खाता:** कई कॉम्पोनेंट्स को वर्तमान में logged in उपयोगकर्ता का पता करने की आवश्यकता हो सकती है। इसे कॉन्टेक्स्ट में रखना पेड़ में कहीं भी इसे पढ़ने के लिए सुविधाजनक बनाता है। कुछ ऐप्स आपको एक ही समय में कई खाते संचालित करने देते हैं (उदाहरण के लिए एक अलग उपयोगकर्ता के रूप में एक टिप्पणी छोड़ने के लिए)। उन मामलों में, एक अलग चालू खाता मूल्य के साथ एक नेस्टेड कॉन्टेक्स्ट प्रदाता में UI के एक हिस्से को लपेटना सुविधाजनक हो सकता है।
* **राउटिंग:** अधिकांश राउटिंग समाधान वर्तमान मार्ग को रखने के लिए आंतरिक रूप से कॉन्टेक्स्ट का उपयोग करते हैं। इस प्रकार से हर लिंक "जानता है" कि यह सक्रिय है या नहीं। यदि आप अपना खुद का राउटर बनाते हैं, तो आप इसे भी करना चाह सकते हैं।
* **स्टेट को मैनेज करना:** जैसे-जैसे आपका ऐप बढ़ता है, आप अपने ऐप के शीर्ष के करीब बहुत सारे स्टेट के साथ समाप्त हो सकते हैं। नीचे कई दूर के कौम्पोनॅन्ट इसे बदलना चाह सकते हैं। जटिल स्टेट को मैनेज करने के लिए [कॉन्टेक्स्ट के साथ एक रेड्यूसर का उपयोग करना](/learn/scaling-up-with-reducer-and-context) और और इसे बहुत अधिक परेशानी के बिना दूर के कॉम्पोनेंट्स तक पास करना सामान्य है।

कॉन्टेक्स्ट स्थैतिक मूल्यों तक सीमित नहीं है। यदि आप अगले रेंडर पर एक अलग मूल्य पास करते हैं, तो React नीचे पढ़ते हुए सभी कॉम्पोनेंट्स को अपडेट करेगा! यही कारण है कि कॉन्टेक्स्ट का उपयोग अक्सर स्टेट के साथ संयोजन में किया जाता है।

सामान्य तौर पर, यदि पेड़ के विभिन्न हिस्सों में दूर के कॉम्पोनेंट्स द्वारा कुछ जानकारी की आवश्यकता होती है, तो यह एक अच्छा संकेत है कि कॉन्टेक्स्ट आपकी मदद करेगा।

<Recap>

* कॉन्टेक्स्ट एक कौम्पोनॅन्ट को इसके नीचे पूरे पेड़ को कुछ जानकारी प्रदान करता है।
* कॉन्टेक्स्ट को पास करने के लिए:
  1. इसे बनाएं और निर्यात करें `export const MyContext = createContext(defaultValue)`.
  2. इसे किसी भी चाइल्ड कौम्पोनॅन्ट में पढ़ने के लिए `useContext(MyContext)` हुक में पास करें, चाहे वह कितना भी गहरा क्यों न हो।
  3. चिल्ड्रन को पैरेंट से प्रदान करने के लिए `<MyContext value={...}>` में लपेटें।
* कॉन्टेक्स्ट बीच में किसी भी कॉम्पोनेंट्स से गुजरता है।
* कॉन्टेक्स्ट आपको उन कॉम्पोनेंट्स को लिखने देता है जो "अपने परिवेश के अनुकूल हो जाते" हैं।
* कॉन्टेक्स्ट का उपयोग करने से पहले, प्रॉप्स पास करने या JSX को `children` के रूप में पास करने का प्रयास करें।

</Recap>

<Challenges>

#### प्रॉप ड्रिलिंग को कॉन्टेक्स्ट से बदलें {/*replace-prop-drilling-with-context*/}

इस उदाहरण में, चेकबॉक्स को टॉगल करने से प्रत्येक `<PlaceImage>` के लिए पारित `imageSize` प्रोप बदल जाता है। चेकबॉक्स स्टेट शीर्ष-स्तरीय `App` कौम्पोनॅन्ट में रखा जाता है, लेकिन प्रत्येक `<PlaceImage>` को इसके बारे में पता होना चाहिए।

वर्तमान में, `App` `List` में `imageSize` को पास करता है, जो इसे प्रत्येक `Place` को पास करता है, जो इसे `PlaceImage` को पास करता है। `imageSize` प्रोप को हटा दें, और इसके बजाय इसे `App` कौम्पोनॅन्ट से सीधे `PlaceImage` तक पास करें।

आप `Context.js` में कॉन्टेक्स्ट घोषित कर सकते हैं।

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List imageSize={imageSize} />
    </>
  )
}

function List({ imageSize }) {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place
        place={place}
        imageSize={imageSize}
      />
    </li>
  );
  return <ul>{listItems}</ul>;
}

function Place({ place, imageSize }) {
  return (
    <>
      <PlaceImage
        place={place}
        imageSize={imageSize}
      />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place, imageSize }) {
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
```

```js src/Context.js

```

```js src/data.js
export const places = [{
  id: 0,
  name: 'Bo-Kaap in Cape Town, South Africa',
  description: 'The tradition of choosing bright colors for houses began in the late 20th century.',
  imageId: 'K9HVAGH'
}, {
  id: 1, 
  name: 'Rainbow Village in Taichung, Taiwan',
  description: 'To save the houses from demolition, Huang Yung-Fu, a local resident, painted all 1,200 of them in 1924.',
  imageId: '9EAYZrt'
}, {
  id: 2, 
  name: 'Macromural de Pachuca, Mexico',
  description: 'One of the largest murals in the world covering homes in a hillside neighborhood.',
  imageId: 'DgXHVwu'
}, {
  id: 3, 
  name: 'Selarón Staircase in Rio de Janeiro, Brazil',
  description: 'This landmark was created by Jorge Selarón, a Chilean-born artist, as a "tribute to the Brazilian people."',
  imageId: 'aeO3rpI'
}, {
  id: 4, 
  name: 'Burano, Italy',
  description: 'The houses are painted following a specific color system dating back to 16th century.',
  imageId: 'kxsph5C'
}, {
  id: 5, 
  name: 'Chefchaouen, Marocco',
  description: 'There are a few theories on why the houses are painted blue, including that the color repels mosquitos or that it symbolizes sky and heaven.',
  imageId: 'rTqKo46'
}, {
  id: 6,
  name: 'Gamcheon Culture Village in Busan, South Korea',
  description: 'In 2009, the village was converted into a cultural hub by painting the houses and featuring exhibitions and art installations.',
  imageId: 'ZfQOOzf'
}];
```

```js src/utils.js
export function getImageUrl(place) {
  return (
    'https://i.imgur.com/' +
    place.imageId +
    'l.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
```

</Sandpack>

<Solution>

सभी कॉम्पोनेंट्स से `imageSize` प्रोप निकालें।

`ImageSizeContext` बनाएं और `Context.js` से निर्यात करें। फिर मान को नीचे पास करने के लिए सूची को `<ImageSizeContext value={imageSize}>` में लपेटें, और इसे `PlaceImage` में पढ़ने के लिए `useContext(ImageSizeContext)` का उपयोग करें:

<Sandpack>

```js src/App.js
import { useState, useContext } from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';
import { ImageSizeContext } from './Context.js';

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <ImageSizeContext
      value={imageSize}
    >
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List />
    </ImageSizeContext>
  )
}

function List() {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place place={place} />
    </li>
  );
  return <ul>{listItems}</ul>;
}

function Place({ place }) {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place }) {
  const imageSize = useContext(ImageSizeContext);
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
```

```js src/Context.js
import { createContext } from 'react';

export const ImageSizeContext = createContext(500);
```

```js src/data.js
export const places = [{
  id: 0,
  name: 'Bo-Kaap in Cape Town, South Africa',
  description: 'The tradition of choosing bright colors for houses began in the late 20th century.',
  imageId: 'K9HVAGH'
}, {
  id: 1, 
  name: 'Rainbow Village in Taichung, Taiwan',
  description: 'To save the houses from demolition, Huang Yung-Fu, a local resident, painted all 1,200 of them in 1924.',
  imageId: '9EAYZrt'
}, {
  id: 2, 
  name: 'Macromural de Pachuca, Mexico',
  description: 'One of the largest murals in the world covering homes in a hillside neighborhood.',
  imageId: 'DgXHVwu'
}, {
  id: 3, 
  name: 'Selarón Staircase in Rio de Janeiro, Brazil',
  description: 'This landmark was created by Jorge Selarón, a Chilean-born artist, as a "tribute to the Brazilian people".',
  imageId: 'aeO3rpI'
}, {
  id: 4, 
  name: 'Burano, Italy',
  description: 'The houses are painted following a specific color system dating back to 16th century.',
  imageId: 'kxsph5C'
}, {
  id: 5, 
  name: 'Chefchaouen, Marocco',
  description: 'There are a few theories on why the houses are painted blue, including that the color repels mosquitos or that it symbolizes sky and heaven.',
  imageId: 'rTqKo46'
}, {
  id: 6,
  name: 'Gamcheon Culture Village in Busan, South Korea',
  description: 'In 2009, the village was converted into a cultural hub by painting the houses and featuring exhibitions and art installations.',
  imageId: 'ZfQOOzf'
}];
```

```js src/utils.js
export function getImageUrl(place) {
  return (
    'https://i.imgur.com/' +
    place.imageId +
    'l.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
```

</Sandpack>

ध्यान दें कि कैसे बीच में कॉम्पोनेंट्स को `imageSize` अब पास करने की आवश्यकता नहीं है।

</Solution>

</Challenges>

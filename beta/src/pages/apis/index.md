---
title: React APIs
---

<Intro>
React package मे सारे ज़रूरी API है जिससे आप [components](/learn/your-first-कौम्पोनॅन्ट) को परिभाषित और इस्तेमाल कर सकते हो|
</Intro>

## इंस्टालेशन {/*installation*/}

यह [`react`](https://www.npmjs.com/package/react) के रूप मे npm पर उपलब्ध है| आप [ React को `<script>` टैग द्वारा ओवरव्यू पे ऐड कर सकते है|](/learn/add-react-to-a-website)
<PackageImport>

<TerminalBlock>

npm install react

</TerminalBlock>

```js
// विशिष्ट API import करने के लिए :
import { useState } from 'react';

// सारे API को इंपोर्ट करने के लिए :
import * as React from 'react';
```

</PackageImport>
अगर आप React वेब पे इस्तेमाल करते है, आप को [ReactDOM](/api/reactdom) का वर्शन भी वही रखना होगा|

## एक्सपोर्ट्स {/*exports*/}

### State {/*state*/}

<YouWillLearnCard title="useState" path="/apis/usestate">

State वेरिएबल डिक्लेर करता है|

```js
function MyComponent() {
  const [age, setAge] = useState(42);
  // ...
```

</YouWillLearnCard>

<YouWillLearnCard title="useReducer" path="/apis/usereducer">

रेडूसर द्वारा प्रबंधित State वेरिएबल डिक्लेर करता है|

```js
function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

</YouWillLearnCard>

### Context {/*context*/}

<YouWillLearnCard title="useContext" path="/apis/usecontext">

किसी भी context को रीड और सब्सक्राइब करता है|

```js
function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```

</YouWillLearnCard>

<YouWillLearnCard title="createContext" path="/apis/createContext">

एक context बनाता है जो कौम्पोनॅन्ट पढ़ या दे सके|

```js
const ThemeContext = createContext('light');
```

</YouWillLearnCard>

### Refs {/*refs*/}

<YouWillLearnCard title="useRef" path="/apis/useref">

ref को declare करता है|

```js
function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

</YouWillLearnCard>

यह सेक्शन अधूरा है और लिखा जा रहा है!

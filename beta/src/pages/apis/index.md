---
title: React APIs
---

<Intro>

The React package contains all the APIs necessary to define and use [components](/learn/your-first-component).

React package मे सारे ज़रूरी API है जिससे आप [components](/learn/your-first-कौम्पोनॅन्ट) को परिभाषित और इस्तेमाल कर सकते हो.
</Intro>

## इंस्टालेशन {/*इंस्टालेशन*/}

It is available as [`react`](https://www.npmjs.com/package/react) on npm. You can also [add React to the page as a `<script>` tag](/learn/add-react-to-a-website).

यह [`react`](https://www.npmjs.com/package/react) के रूप मे npm पर उपलब्ध है. आप [ React को `<script>` टैग द्वारा ओवरव्यू पे ऐड कर सकते है.](/learn/add-react-to-a-website)
<PackageImport>

<TerminalBlock>

npm install react

</TerminalBlock>

```js
// Importing a specific API:
// विशिष्ट API import करने के लिए :
import { useState } from 'react';

// Importing all APIs together:
// सारे API को इंपोर्ट करने के लिए :
import * as React from 'react';
```

</PackageImport>

If you use React on the web, you'll also need the same version of [ReactDOM](/api/reactdom).

अगर आप React वेब पे इस्तेमाल करते है, आप को [ReactDOM](/api/reactdom) का वर्शन भी वही रखना होगा.

## एक्सपोर्ट्स {/*एक्सपोर्ट्स */}

### State {/*state*/}

<YouWillLearnCard title="useState" path="/apis/usestate">

Declares a state variable.

State वेरिएबल डिक्लेर करता है.

```js
function MyComponent() {
  const [age, setAge] = useState(42);
  // ...
```

</YouWillLearnCard>

<YouWillLearnCard title="useReducer" path="/apis/usereducer">

Declares a state variable managed with a reducer.

रेडूसर द्वारा प्रबंधित State वेरिएबल डिक्लेर करता है

```js
function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

</YouWillLearnCard>

### Context {/*context*/}

<YouWillLearnCard title="useContext" path="/apis/usecontext">

Reads and subscribes to a context.

किसी भी context को रीड और सब्सक्राइब करता है
```js
function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```

</YouWillLearnCard>

<YouWillLearnCard title="createContext" path="/apis/createContext">

Creates a context that components can provide or read.

एक context बनाता है जो कौम्पोनॅन्ट पढ़ या दे सके.

```js
const ThemeContext = createContext('light');
```

</YouWillLearnCard>

### Refs {/*refs*/}

<YouWillLearnCard title="useRef" path="/apis/useref">

Declares a ref.

ref को declare करता है.

```js
function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

</YouWillLearnCard>


This section is incomplete and is still being written!

यह सेक्शन अधूरा है और लिखा जा रहा है!

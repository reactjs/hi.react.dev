---
title: React APIs
---

<Intro>

The React package contains all the APIs necessary to define and use [components](/learn/your-first-component).

React package me saare zaroori API hai jisse aap [components](/learn/your-first-component) ko डिफाइन aur istemaal kar sakte ho.
</Intro>

## इंस्टालेशन {/*इंस्टालेशन*/}

It is available as [`react`](https://www.npmjs.com/package/react) on npm. You can also [add React to the page as a `<script>` tag](/learn/add-react-to-a-website).

yh [`react`](https://www.npmjs.com/package/react) ke roop me npm pr उपलब्ध hai. Aap [ React ko `<script>` teg dwara page pe add kar sakte hai.](/learn/add-react-to-a-website)
<PackageImport>

<TerminalBlock>

npm install react

</TerminalBlock>

```js
// Importing a specific API:
// विशिष्ट API import karne ke liye :
import { useState } from 'react';

// Importing all APIs together:
// Saare API ko import karne ke liye :
import * as React from 'react';
```

</PackageImport>

If you use React on the web, you'll also need the same version of [ReactDOM](/api/reactdom).

Agar aap React web pe istemaal karte hai, aap ko [ReactDOM](/api/reactdom) ka version bhi वही rakhna hoga.

## एक्सपोर्ट्स {/*एक्सपोर्ट्स */}

### State {/*state*/}

<YouWillLearnCard title="useState" path="/apis/usestate">

Declares a state variable.

State वेरिएबल declare karta hai.

```js
function MyComponent() {
  const [age, setAge] = useState(42);
  // ...
```

</YouWillLearnCard>

<YouWillLearnCard title="useReducer" path="/apis/usereducer">

Declares a state variable managed with a reducer.

_Reducer_ dwara प्रबंधित State वेरिएबल declare karta hai

```js
function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

</YouWillLearnCard>

### Context {/*context*/}

<YouWillLearnCard title="useContext" path="/apis/usecontext">

Reads and subscribes to a context.

kisi bhi context ko रीड और सब्सक्राइब करता है
```js
function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```

</YouWillLearnCard>

<YouWillLearnCard title="createContext" path="/apis/createContext">

Creates a context that components can provide or read.

Ek context banata hai jo कौम्पोनॅन्ट padh ya de sake.

```js
const ThemeContext = createContext('light');
```

</YouWillLearnCard>

### Refs {/*refs*/}

<YouWillLearnCard title="useRef" path="/apis/useref">

Declares a ref.

ref ko declare karta hai.

```js
function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

</YouWillLearnCard>


This section is incomplete and is still being written!

Yh _section_ अधूरा hai aur likha ja rha hai!

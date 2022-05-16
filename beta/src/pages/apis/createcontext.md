---
title: createContext
---

<Intro>

`createContext` lets you create a [context](/learn/passing-data-deeply-with-context) that components can provide or read.

`createContext` aapko ek [context](/learn/passing-data-deeply-with-context) banane deta hai jo कौम्पोनॅन्टs de ya padh sakte hai.
```js
const SomeContext = createContext(defaultValue);
```

</Intro>

- [Usage](#usage)
  - [context banana](#creating-context)
  - [Importing and exporting context from a file](#importing-and-exporting-context-from-a-file)
- [Reference](#reference)
  - [`createContext(defaultValue)`](#createcontext)
  - [`SomeContext.Provider`](#provider)
  - [`SomeContext.Consumer`](#consumer)
- [Troubleshooting](#troubleshooting)
  - [I can't find a way to change the context value](#troubleshooting)

---

## Usage {/*usage*/}

### context banana {/*creating-context*/}

Context lets components [pass information deep down](/learn/passing-data-deeply-with-context) without explicitly passing props.

Context कौम्पोनॅन्टs ko bina _props ko pass kar_ information ko gahrai tak _pass_ karti hai.

Call `createContext` outside any components to create one or more contexts.

एक या अधिक context banane ke liye, `createContext` ko kisi bhi कौम्पोनॅन्ट ke bahar _call_ kare.

```js [[1, 3, "ThemeContext"], [1, 4, "AuthContext"], [3, 3, "'light'"], [3, 4, "null"]]
import { createContext } from 'react';

const ThemeContext = createContext('light');
const AuthContext = createContext(null);
```

`createContext` returns a <CodeStep step={1}>context object</CodeStep>. Components can read context by passing it to [`useContext()`](/apis/usecontext):

`createContext` ek <CodeStep step={1}>context object</CodeStep> _return_ karta hai. कौम्पोनॅन्ट context ko  [`useContext()`](/apis/usecontext) me pass kar padh sakte hai:

```js [[1, 2, "ThemeContext"], [1, 7, "AuthContext"]]
function Button() {
  const theme = useContext(ThemeContext);
  // ...
}

function Profile() {
  const currentUser = useContext(AuthContext);
  // ...
}
```

By default, the values they receive will be the <CodeStep step={3}>the default values</CodeStep> you have specified when creating the contexts. However, by itself this isn't useful because the default values never change.

_default_ roop se jo वैल्यू milti hai wo <CodeStep step={3}>default वैल्यूs</CodeStep> hai jo aapne context banate samay _specify_ kiya tha. Lekin, khudse yh upyogi nahi haikyunki _default_ वैल्यू kabhi nahi badalte hai.

Context is useful because you can **provide other, dynamic values from your components:**

Context upyogi hai kyunki aap **कौम्पोनॅन्टs se usse baaki, _dynamic_ वैल्यू de sakte hai :**

```js {8-9,11-12}
function App() {
  const [theme, setTheme] = useState('dark');
  const [currentUser, setCurrentUser] = useState({ name: 'Taylor' });

  // ...

  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider value={currentUser}>
        <Page />
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
```

Now the `Page` component and any components inside it, no matter how deep, will "see" the passed context values. If the passed context values change, React will re-render the components reading the context as well.

Ab `Page` कौम्पोनॅन्ट aur uske andar jitne bhi कौम्पोनॅन्टs hai, chahe kitne bhi gahrai pe hai, _pass_ kiye gaye context _values_ ko "dekhega". Yadi _pass_ kiye gaye context values badle to React context padne waale saare कौम्पोनॅन्टs ko _re-render_ karega.

[Read more about reading and providing context and see examples.](/apis/usecontext)

[context dene aur padhne ke baare me adhik padhe aur udharan dekhiye](/apis/usecontext)

---

### _file_ se context import aur export karna {/*importing-and-exporting-context-from-a-file*/}

Often, components in different files will need access to the same context. This is why it's common to declare contexts in a separate file. Then you can use the [`export` statement](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) to make context available for other files:

Akhsar, alag-alag _files_ me rakhe gaye कौम्पोनॅन्टs ko ek hi context _access_ karne ki zaroorat hai. Isiliye saare context ko ek alag _file_ me _declare_ karna ek sadaran baat hai. Phir, [`export` statement](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) ka istemaal kar, context ko saare _files_ me _available_ kar sakte ho:

```js {4-5}
// Contexts.js
import { createContext } from 'react';

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);
````

Components declared in other files can then use the [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) statement to read or provide this context:

Baaki _files_ me declare kiya gaya कौम्पोनॅन्टs ab is context ko [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) statement ko istemaal kar padh ya de sakte hai
```js {2}
// Button.js
import { ThemeContext } from './Contexts.js';

function Button() {
  const theme = useContext(ThemeContext);
  // ...
}
```

```js {2}
// App.js
import { ThemeContext, AuthContext } from './Contexts.js';

function App() {
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider value={currentUser}>
        <Page />
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
```

This works similar to [importing and exporting components.](/learn/importing-and-exporting-components)

Yh [importing and exporting components](/learn/importing-and-exporting-components) jaise hi kaam karta hai.

---

## Reference {/*reference*/}

### `createContext(defaultValue)` {/*createcontext*/}

Call `createContext` outside of any components to create a context.

context banane ke liye `createContext` ko kisi bhi कौम्पोनॅन्ट ke bahar _call_ kare.

```js
import { createContext } from 'react';

const ThemeContext = createContext('light');
```

#### Parameters {/*parameters*/}

* `defaultValue`: The value that you want the context to have when there is no matching context provider in the tree above the component that reads context. If you don't have any meaningful default value, specify `null`. The default value is meant as a "last resort" fallback. It is static and never changes over time.

* `defaultValue`: Vo _value_ jo aap chahte hai ki context ke pass ho jab context padne waala _component_ ke upar tree me koi bhi _matching context provider_ nahi hai. Yadi aap ke pas koi sarthak _default value_ nahi hai, to `null` _specify_ ki jiye. _Default value_ ek _"last resort" fallback_ hai. Iska roop _static_ hai aur samay ke saath iska _value_ nahi badalta.

#### Returns {/*returns*/}

`createContext` returns a context object.

`createContext` ek _context object_ return karta hai.

**The context object itself does not hold any information.** It represents _which_ context other components can read or provide. Typically, you will use [`SomeContext.Provider`](#provider) in components above to specify the context value, and call [`useContext(SomeContext)`](/apis/usecontext) in components below to read it. The context object has a few properties:

**_context object_ apne aap me koi bhi information nahi rakta.**Yh _represent_ karta hai _kaunsa (italics)_ context baaki _components_ padh ya pradaan kr sakta hai. आम तौर पर aap _components_ me _context value_ specify karne ke liye, [`SomeContext.Provider`](#provider) ka istemaal karte hai aur usse padne ke liye uske niche ke components me [`useContext(SomeContext)`] ko bulaate hai.

* `SomeContext.Provider` lets you provide the context value to components.
* `SomeContext.Consumer` is an alternative and rarely used way to read the context value.

* `SomeContext.Provider` aapko components ko _context value_ pradhaan karne deta hai.
* `SomeContext.Consumer` se bhi aap _context value_ padh sakte hai leki yh ek vikalp hai aur kabhi-kabhar istemaal kiya ja tha hai.

---

### `SomeContext.Provider` {/*provider*/}

Wrap your components into a context provider to specify the value of this context for all components inside:

components ko ek _context provider_ me wrap kar, saare andar ke components ko context ka value _specify_ karta hai.

```js
function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

#### Props {/*provider-props*/}

* `value`: The value that you want to pass to all the components reading this context inside this provider, no matter how deep. The context value can be of any type. A component calling [`useContext(SomeContext)`](/apis/usecontext) inside of the provider receives the `value` of the innermost corresponding context provider above it.

* `value`: Wo value jo aap saare context padhne waale components me pass karna chahte ho chaahe wo component kitna bhi gahra ho. yh _context value_ kisi bhi _type_ ka ho sakta hai.
---

### `SomeContext.Consumer` {/*consumer*/}

Before `useContext` existed, there was an older way to read context:

`useContext` ke pehle, context padhne ka purana tarika:

```js
function Button() {
  // 🟡 Legacy way (not recommended)
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button className={theme} />
      )}
    </ThemeContext.Consumer>
  );
}
```

Although this older way still works, but **newly written code should read context with [`useContext()`](/apis/usecontext) instead:**

Halanki yh tareeka ab bhi kaam karta hai, lekin **haal me likhe gaye code ko [`useContext()`](/apis/usecontext)ki madad se context padna chahiye:**

```js
function Button() {
  // ✅ Recommended way
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```

#### Props {/*consumer-props*/}

* `children`: A function. React will call the function you pass with the current context value determined by the same algorithm as [`useContext()`](/apis/usecontext) does, and render the result you return from this function. React will also re-run this function and update the UI whenever the context passed from the parent components have changed.

* `children`: ek function hai. React us function ko bulaayga jo aapne pass kiya hai वर्तमान _context values_ ke saath. Yh context values us algorithm dwaara tay kiya jaa tha hai jo [`useContext()`](/apis/usecontext) istemaal karta hai. Function se return kiya gaya result React dwara render kiya jata hai. Jab bhi parent component se bheja gaya context badalta hai, React is function ko phir se bula kar UI update karta hai.

---

## Troubleshooting {/*troubleshooting*/}

### Mujhse context values nahi badal rahe {/*i-cant-find-a-way-to-change-the-context-value*/}
Code like this specifies the *default* context value:

*default* context value ko specify karne ke liye, aise code karo:
```js
const ThemeContext = createContext('light');
```

This value never changes. React only uses this value as a fallback if it can't find a matching provider above.

yh value kabhi badlega nahi. Jab koi matching provider nahi milega to React isse ek fallback value ki tarah istemaal karega.

To make context change over time, [add state and wrap components in a context provider](/apis/usecontext#updating-data-passed-via-context).

Context ko samay ke saath badalne ke liye, [state aur wrap components ko ek context provider me add kijiye](/apis/usecontext#updating-data-passed-via-context).


---
title: टाइपस्क्रिप्ट का उपयोग
re: https://github.com/reactjs/react.dev/issues/5960
---

<Intro>
टाइपस्क्रिप्ट एक पॉपुलर तरीका है जिससे जावास्क्रिप्ट कोडबेस में टाइप डेफिनीशन जोड़ी जा सकती है। टाइपस्क्रिप्ट [JSX](/learn/writing-markup-with-jsx) को समर्थन करता है, और आप अपनें परियोजना में [`@types/react`](https://www.npmjs.com/package/@types/react) and [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) जोड़कर पूर्ण रिएक्ट वेब समर्थन प्राप्त कर सकते हैं।
</Intro>

<YouWillLearn>

* [टाइपस्क्रिप्ट के साथ रिएक्ट कंपोनेंट्स:](/learn/typescript#typescript-with-react-components)
* [हुक्स के साथ टाइपिंग के उदाहरण](/learn/typescript#example-hooks)
* [सामान्य प्रकारें से `@types/react`](/learn/typescript/#useful-types)
* [और सीखने के स्थान](/learn/typescript/#further-learning)

</YouWillLearn>

## Installation {/*installation*/}

सभी [प्रोडक्शन-ग्रेड रिएक्ट फ्रेमवर्क्स](/learn/start-a-new-react-project#production-grade-react-frameworks) टाइपस्क्रिप्ट का समर्थन करते हैं। स्थापना के लिए फ्रेमवर्क विशिष्ट गाइड का पालन करें:


- [Next.js](https://nextjs.org/docs/pages/building-your-application/configuring/typescript)
- [Remix](https://remix.run/docs/en/1.19.2/guides/typescript)
- [Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/)
- [Expo](https://docs.expo.dev/guides/typescript/)

###  मौजूदा रिएक्ट परियोजना में टाइपस्क्रिप्ट जोड़ना {/*adding-typescript-to-an-existing-react-project*/}

लेटेस्ट वर्शन की रिएक्ट के टाइप डेफिनीशन्स को स्थापित करने के लिए:

<TerminalBlock>
npm install @types/react @types/react-dom
</TerminalBlock>

आपके `tsconfig.json` में निम्नलिखित कंपाइलर विकल्प सेट करने की आवश्यकता है:

1. `dom` को [`lib`](https://www.typescriptlang.org/tsconfig/#lib) में शामिल किया जाना चाहिए  (नोट: यदि कोई lib विकल्प निर्दिष्ट नहीं किया गया है, तो dom डिफ़ॉल्ट रूप से शामिल है).
1. [`jsx`](https://www.typescriptlang.org/tsconfig/#jsx) को मान्य विकल्पों में से एक पर सेट किया जाना चाहिए। अधिकांश अनुप्रयोगों के लिए, `preserve` काफी होगा।
  यदि आप एक पुस्तकालय प्रकाशित कर रहे हैं, तो [`jsx` दस्तावेज़](https://www.typescriptlang.org/tsconfig/#jsx) पर आपको कौनसी मान चुननी चाहिए, उस पर परामर्श लें।

## रिएक्ट कंपोनेंट्स के साथ टाइपस्क्रिप्ट {/*typescript-with-react-components*/}

<Note>

जिस भी फ़ाइल में JSX है, उसे `.tsx` फ़ाइल एक्सटेंशन का उपयोग करना चाहिए। यह एक टाइपस्क्रिप्ट-विशिष्ट एक्सटेंशन है जो टाइपस्क्रिप्ट को बताता है कि इस फ़ाइल में JSX है।

</Note>

रिएक्ट के साथ टाइपस्क्रिप्ट लिखना रिएक्ट के साथ जावास्क्रिप्ट लिखने के बहुत मिलता-जुलता है। कंपोनेंट के साथ काम करते समय मुख्य अंतर है कि आप अपने कंपोनेंट के प्रॉप्स के लिए टाइप्स प्रदान कर सकते हैं। इन टाइप्स का उपयोग सहीता जाँच और संपादकों में इनलाइन दस्तावेज़ प्रदान करने के लिए किया जा सकता है।

[Quick Start](/learn) गाइड से [`MyButton` कंपोनेंट](/learn#components) लेते हैं, हम बटन के लिए `title` का वर्णन करने के लिए एक टाइप जोड़ सकते हैं:

<Sandpack>

```tsx src/App.tsx active
function MyButton({ title }: { title: string }) {
  return (
    <button>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a button" />
    </div>
  );
}
```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```
</Sandpack>

 <Note>

 ये सैंडबॉक्स टाइपस्क्रिप्ट को हैंडल कर सकते हैं, लेकिन वे टाइप-चेकर को चलाते नहीं हैं। इसका मतलब है कि आप टाइपस्क्रिप्ट सैंडबॉक्स को सीखने के लिए संशोधित कर सकते हैं, लेकिन आपको कोई टाइप त्रुटियाँ या चेतावनियाँ नहीं मिलेंगी। टाइप-चेकिंग प्राप्त करने के लिए, आप [टाइपस्क्रिप्ट Playground](https://www.typescriptlang.org/play) का उपयोग कर सकते हैं या एक और पूरी तरह से विशेषज्ञ ऑनलाइन सैंडबॉक्स का उपयोग कर सकते हैं।

</Note>

इस इनलाइन सिंटैक्स से एक कंपोनेंट के लिए टाइप्स प्रदान करने का सबसे सरल तरीका है, हालांकि जब आपको इसे विवरण देने के लिए कुछ फ़ील्ड होने लगते हैं, तो यह अनवान्य हो सकता है। इसके बजाय, आप कंपोनेंट के प्रॉप्स को विवरण देने के लिए एक इंटरफेस या टाइप का उपयोग कर सकते हैं:

<Sandpack>

```tsx src/App.tsx active
interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a disabled button" disabled={true}/>
    </div>
  );
}
```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```

</Sandpack>

कंपोनेंट के प्रॉप्स का वर्णन करने वाला टाइप आपकी आवश्यकता के अनुसार इतना सरल या इतना कठिन हो सकता है, हालांकि इन्हें एक `type` या `interface` के साथ विवरणित एक ऑब्जेक्ट टाइप होना चाहिए। आप यहां [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) में टाइपस्क्रिप्ट द्वारा ऑब्जेक्ट का विवरण कैसे किया जाता है के बारे में सीख सकते हैं, लेकिन आप एक प्रॉप को कुछ विभिन्न प्रकारों में से एक का विवरण देने के लिए [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) का उपयोग करने और और अधिक उन्नत उपयोग के मामलों के लिए [Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) गाइड के लिए भी रुचि रख सकते हैं।


## Example Hooks {/*example-hooks*/}

The type definitions from `@types/react` include types for the built-in Hooks, so you can use them in your components without any additional setup. They are built to take into account the code you write in your component, so you will get [inferred types](https://www.typescriptlang.org/docs/handbook/type-inference.html) a lot of the time and ideally do not need to handle the minutiae of providing the types. 

However, we can look at a few examples of how to provide types for Hooks.

### `useState` {/*typing-usestate*/}

The [`useState` Hook](/reference/react/useState) will re-use the value passed in as the initial state to determine what the type of the value should be. For example:

```ts
// Infer the type as "boolean"
const [enabled, setEnabled] = useState(false);
```

Will assign the type of `boolean` to `enabled`, and `setEnabled` will be a function accepting either a `boolean` argument, or a function that returns a `boolean`. If you want to explicitly provide a type for the state, you can do so by providing a type argument to the `useState` call:

```ts 
// Explicitly set the type to "boolean"
const [enabled, setEnabled] = useState<boolean>(false);
```

This isn't very useful in this case, but a common case where you may want to provide a type is when you have a union type. For example, `status` here can be one of a few different strings:

```ts
type Status = "idle" | "loading" | "success" | "error";

const [status, setStatus] = useState<Status>("idle");
```

Or, as recommended in [Principles for structuring state](/learn/choosing-the-state-structure#principles-for-structuring-state), you can group related state as an object and describe the different possibilities via object types:

```ts
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };

const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
```

### `useReducer` {/*typing-usereducer*/}

The [`useReducer` Hook](/reference/react/useReducer) is a more complex Hook that takes a reducer function and an initial state. The types for the reducer function are inferred from the initial state. You can optionally provide a type argument to the `useReducer` call to provide a type for the state, but it is often better to set the type on the initial state instead:

<Sandpack>

```tsx src/App.tsx active
import {useReducer} from 'react';

interface State {
   count: number 
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>Welcome to my counter</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```

</Sandpack>


We are using TypeScript in a few key places:

 - `interface State` describes the shape of the reducer's state.
 - `type CounterAction` describes the different actions which can be dispatched to the reducer.
 - `const initialState: State` provides a type for the initial state, and also the type which is used by `useReducer` by default.
 - `stateReducer(state: State, action: CounterAction): State` sets the types for the reducer function's arguments and return value.

A more explicit alternative to setting the type on `initialState` is to provide a type argument to `useReducer`:

```ts
import { stateReducer, State } from './your-reducer-implementation';

const initialState = { count: 0 };

export default function App() {
  const [state, dispatch] = useReducer<State>(stateReducer, initialState);
}
```

### `useContext` {/*typing-usecontext*/}

The [`useContext` Hook](/reference/react/useContext) is a technique for passing data down the component tree without having to pass props through components. It is used by creating a provider component and often by creating a Hook to consume the value in a child component.

The type of the value provided by the context is inferred from the value passed to the `createContext` call:

<Sandpack>

```tsx src/App.tsx active
import { createContext, useContext, useState } from 'react';

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

export default function MyApp() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent />
    </ThemeContext.Provider>
  )
}

function MyComponent() {
  const theme = useGetTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
    </div>
  )
}
```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```

</Sandpack>

This technique works when you have a default value which makes sense - but there are occasionally cases when you do not, and in those cases `null` can feel reasonable as a default value. However, to allow the type-system to understand your code, you need to explicitly set `ContextShape | null` on the `createContext`. 

This causes the issue that you need to eliminate the `| null` in the type for context consumers. Our recommendation is to have the Hook do a runtime check for it's existence and throw an error when not present:

```js {5, 16-20}
import { createContext, useContext, useState, useMemo } from 'react';

// This is a simpler example, but you can imagine a more complex object here
type ComplexObject = {
  kind: string
};

// The context is created with `| null` in the type, to accurately reflect the default value.
const Context = createContext<ComplexObject | null>(null);

// The `| null` will be removed via the check in the Hook.
const useGetComplexObject = () => {
  const object = useContext(Context);
  if (!object) { throw new Error("useGetComplexObject must be used within a Provider") }
  return object;
}

export default function MyApp() {
  const object = useMemo(() => ({ kind: "complex" }), []);

  return (
    <Context.Provider value={object}>
      <MyComponent />
    </Context.Provider>
  )
}

function MyComponent() {
  const object = useGetComplexObject();

  return (
    <div>
      <p>Current object: {object.kind}</p>
    </div>
  )
}
```

### `useMemo` {/*typing-usememo*/}

The [`useMemo`](/reference/react/useMemo) Hooks will create/re-access a memorized value from a function call, re-running the function only when dependencies passed as the 2nd parameter are changed. The result of calling the Hook is inferred from the return value from the function in the first parameter. You can be more explicit by providing a type argument to the Hook.

```ts
// The type of visibleTodos is inferred from the return value of filterTodos
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
```


### `useCallback` {/*typing-usecallback*/}

The [`useCallback`](/reference/react/useCallback) provide a stable reference to a function as long as the dependencies passed into the second parameter are the same. Like `useMemo`, the function's type is inferred from the return value of the function in the first parameter, and you can be more explicit by providing a type argument to the Hook.


```ts
const handleClick = useCallback(() => {
  // ...
}, [todos]);
```

When working in TypeScript strict mode `useCallback` requires adding types for the parameters in your callback. This is because the type of the callback is inferred from the return value of the function, and without parameters the type cannot be fully understood.

Depending on your code-style preferences, you could use the `*EventHandler` functions from the React types to provide the type for the event handler at the same time as defining the callback: 

```ts
import { useState, useCallback } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.currentTarget.value);
  }, [setValue])
  
  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}
```

## Useful Types {/*useful-types*/}

There is quite an expansive set of types which come from the `@types/react` package, it is worth a read when you feel comfortable with how React and TypeScript interact. You can find them [in React's folder in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts). We will cover a few of the more common types here.

### DOM Events {/*typing-dom-events*/}

When working with DOM events in React, the type of the event can often be inferred from the event handler. However, when you want to extract a function to be passed to an event handler, you will need to explicitly set the type of the event.

<Sandpack>

```tsx src/App.tsx active
import { useState } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}
```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```

</Sandpack>

There are many types of events provided in the React types - the full list can be found [here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b580df54c0819ec9df62b0835a315dd48b8594a9/types/react/index.d.ts#L1247C1-L1373) which is based on the [most popular events from the DOM](https://developer.mozilla.org/en-US/docs/Web/Events).

When determining the type you are looking for you can first look at the hover information for the event handler you are using, which will show the type of the event.

If you need to use an event that is not included in this list, you can use the `React.SyntheticEvent` type, which is the base type for all events.

### Children {/*typing-children*/}

There are two common paths to describing the children of a component. The first is to use the `React.ReactNode` type, which is a union of all the possible types that can be passed as children in JSX:

```ts
interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}
```

This is a very broad definition of children. The second is to use the `React.ReactElement` type, which is only JSX elements and not JavaScript primitives like strings or numbers:

```ts
interface ModalRendererProps {
  title: string;
  children: React.ReactElement;
}
```

Note, that you cannot use TypeScript to describe that the children are a certain type of JSX elements, so you cannot use the type-system to describe a component which only accepts `<li>` children. 

You can see all an example of both `React.ReactNode` and `React.ReactElement` with the type-checker in [this TypeScript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wChSB6CxYmAOmXRgDkIATJOdNJMGAZzgwAFpxAR+8YADswAVwGkZMJFEzpOjDKw4AFHGEEBvUnDhphwADZsi0gFw0mDWjqQBuUgF9yaCNMlENzgAXjgACjADfkctFnYkfQhDAEpQgD44AB42YAA3dKMo5P46C2tbJGkvLIpcgt9-QLi3AEEwMFCItJDMrPTTbIQ3dKywdIB5aU4kKyQQKpha8drhhIGzLLWODbNs3b3s8YAxKBQAcwXpAThMaGWDvbH0gFloGbmrgQfBzYpd1YjQZbEYARkB6zMwO2SHSAAlZlYIBCdtCRkZpHIrFYahQYQD8UYYFA5EhcfjyGYqHAXnJAsIUHlOOUbHYhMIIHJzsI0Qk4P9SLUBuRqXEXEwAKKfRZcNA8PiCfxWACecAAUgBlAAacFm80W-CU11U6h4TgwUv11yShjgJjMLMqDnN9Dilq+nh8pD8AXgCHdMrCkWisVoAet0R6fXqhWKhjKllZVVxMcavpd4Zg7U6Qaj+2hmdG4zeRF10uu-Aeq0LBfLMEe-V+T2L7zLVu+FBWLdLeq+lc7DYFf39deFVOotMCACNOCh1dq219a+30uC8YWoZsRyuEdjkevR8uvoVMdjyTWt4WiSSydXD4NqZP4AymeZE072ZzuUeZQKheQgA).

### Style Props {/*typing-style-props*/}

When using inline styles in React, you can use `React.CSSProperties` to describe the object passed to the `style` prop. This type is a union of all the possible CSS properties, and is a good way to ensure you are passing valid CSS properties to the `style` prop, and to get auto-complete in your editor.

```ts
interface MyComponentProps {
  style: React.CSSProperties;
}
```

## Further learning {/*further-learning*/}

This guide has covered the basics of using TypeScript with React, but there is a lot more to learn.
Individual API pages on the docs may contain more in-depth documentation on how to use them with TypeScript.

We recommend the following resources:

 - [The TypeScript handbook](https://www.typescriptlang.org/docs/handbook/) is the official documentation for TypeScript, and covers most key language features.

 - [The TypeScript release notes](https://devblogs.microsoft.com/typescript/) covers a each new features in-depth.

 - [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) is a community-maintained cheatsheet for using TypeScript with React, covering a lot of useful edge cases and providing more breadth than this document.

 - [TypeScript Community Discord](https://discord.com/invite/typescript) is a great place to ask questions and get help with TypeScript and React issues.

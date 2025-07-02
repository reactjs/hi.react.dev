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


- [Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
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

कंपोनेंट के प्रॉप्स का वर्णन करने वाला टाइप आपकी आवश्यकता के अनुसार इतना सरल या इतना कठिन हो सकता है, हालांकि इन्हें एक `type` या `interface` के साथ विवरणित एक ऑब्जेक्ट टाइप होना चाहिए। आप यहां [ऑब्जेक्ट टाइप्स](https://www.typescriptlang.org/docs/handbook/2/objects.html) में टाइपस्क्रिप्ट द्वारा ऑब्जेक्ट का विवरण कैसे किया जाता है के बारे में सीख सकते हैं, लेकिन आप एक प्रॉप को कुछ विभिन्न प्रकारों में से एक का विवरण देने के लिए [यूनियन टाइप्स](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) का उपयोग करने और और अधिक उन्नत उपयोग के मामलों के लिए [टाइप्स से टाइप्स बनाना](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) गाइड के लिए भी रुचि रख सकते हैं।


## हुक्स का उदाहरण: {/*example-hooks*/}

`@types/react` से आने वाले टाइप डेफिनीशन्स में बिल्ट-इन हुक्स के लिए टाइप्स शामिल हैं, इसलिए आप उन्हें अपने कंपोनेंट्स में किसी भी अतिरिक्त सेटअप के बिना उपयोग कर सकते हैं। वे आपके कंपोनेंट में लिखे गए कोड को ध्यान में रखकर बनाए गए हैं, इसलिए आपको बहुत से समय [अनुमानित टाइप्स](https://www.typescriptlang.org/docs/handbook/type-inference.html) मिलेंगे और आपको आशा है कि आपको टाइप्स प्रदान करने के छोटे विवादों का सामना करने की आवश्यकता नहीं होगी। 

हालांकि, हम कुछ हुक्स के लिए टाइप्स प्रदान करने के कुछ उदाहरण देख सकते हैं।

### `useState` {/*typing-usestate*/}

[`useState` हुक](/reference/react/useState) आपको आपके पारिवारिक स्थिति के रूप में पारित मूल स्थिति का पुनर्बच्चन करेगा ताकि वह मूल्य का प्रकार क्या होना चाहिए यह निर्धारित कर सके। उदाहरण के लिए:

```ts
// Infer the type as "boolean"
const [enabled, setEnabled] = useState(false);
```

`enabled` को `boolean` का प्रकार सौंपेगा, और `setEnabled` एक फ़ंक्शन होगा जो या एक `boolean` तर्क स्वीकार करता है, या एक `boolean` वापस करने वाले फ़ंक्शन को। यदि आप रूपयांतरित रूप से राज्य के लिए एक प्रकार प्रदान करना चाहते हैं, तो आप `useState` कॉल को एक प्रकार के तर्क से सही करके ऐसा कर सकते हैं:

```ts 
// Explicitly set the type to "boolean"
const [enabled, setEnabled] = useState<boolean>(false);
```

इस मामले में यह बहुत उपयोगी नहीं है, लेकिन एक सामान्य केस जहां आप एक प्रकार प्रदान करना चाह सकते हैं, यह है जब आपके पास एक यूनियन टाइप है। उदाहरण के लिए, यहां `status` कुछ विभिन्न स्ट्रिंग्स में से एक हो सकता है:

```ts
type Status = "idle" | "loading" | "success" | "error";

const [status, setStatus] = useState<Status>("idle");
```

या, जैसा कि [राज्य को संरचित करने के लिए सिद्धांत](/learn/choosing-the-state-structure#principles-for-structuring-state) में सिफारिश की गई है, आप संबंधित स्थिति को एक ऑब्जेक्ट के रूप में ग्रुप कर सकते हैं और ऑब्जेक्ट टाइप्स के माध्यम से विभिन्न संभावनाओं का विवरण कर सकते हैं:

```ts
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };

const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
```

### `useReducer` {/*typing-usereducer*/}

[`useReducer` हुक](/reference/react/useReducer) एक और जटिल हुक है जो एक रीड्यूसर फ़ंक्शन और एक प्रारंभिक स्थिति लेता है। रीड्यूसर फ़ंक्शन के लिए टाइप्स मूल स्थिति से अनुमानित की जाती हैं। आप `useReducer` कॉल के लिए एक प्रकार तर्क प्रदान करने के लिए एक प्रकार तर्क प्रदान कर सकते हैं, लेकिन अक्सर बेहतर होता है कि आप प्रारंभिक स्थिति पर टाइप सेट करें:

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


हम टाइपस्क्रिप्ट का उपयोग कुछ कुंजीय स्थानों पर कर रहे हैं:

 - `interface State` रीड्यूसर की स्थिति का आकार वर्णन करता है।
 - `type CounterAction` विभिन्न क्रियाएँ वर्णन करता है जो रीड्यूसर को डिस्पैच की जा सकती हैं।
- `const initialState: State` प्रारंभिक स्थिति के लिए एक प्रकार प्रदान करता है, और यह उस प्रकार का उपयोग `useReducer` द्वारा डिफ़ॉल्ट रूप से किया जाता है।
- `stateReducer(state: State, action: CounterAction): State` रीड्यूसर फ़ंक्शन के तर्क और वापसी मूल्य के लिए टाइप्स सेट करता है।

`initialState` पर टाइप सेट करने का और एक स्पष्ट विकल्प `useReducer` को एक प्रकार तर्क प्रदान करना है:

```ts
import { stateReducer, State } from './your-reducer-implementation';

const initialState = { count: 0 };

export default function App() {
  const [state, dispatch] = useReducer<State>(stateReducer, initialState);
}
```

### `useContext` {/*typing-usecontext*/}

[`useContext` हुक](/reference/react/useContext) एक तकनीक है जिससे आप प्रोप्स को कंपोनेंट के माध्यम से पास करने के बिना डेटा को कंपोनेंट ट्री के नीचे पहुँचा सकते हैं। इसका उपयोग एक प्रोवाइडर कंपोनेंट बनाकर और सामान्यत: एक चाइल्ड कंपोनेंट में मूल्य को उपभोग करने के लिए एक हुक बनाकर किया जाता है।

कॉन्टेक्स्ट द्वारा प्रदान किए जाने वाले मूल्य का प्रकार `createContext` कॉल को पास किए गए मूल्य से अनुमानित होता है:

<Sandpack>

```tsx src/App.tsx active
import { createContext, useContext, useState } from 'react';

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

export default function MyApp() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext value={theme}>
      <MyComponent />
    </ThemeContext>
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

यह तकनीक तब कारगर है जब आपके पास एक ऐसा मूल्य है जिसका सांविदानिक रूप से कोई डिफ़ॉल्ट मूल्य है - लेकिन कभी-कभी ऐसे केसेस हो सकते हैं जब ऐसा नहीं है, और उन केसेस में `null` को एक डिफ़ॉल्ट मूल्य के रूप में सही महसूस हो सकता है। हालांकि, अपने कोड को समझने के लिए टाइप-सिस्टम को अनुमति देने के लिए, आपको `createContext` पर `ContextShape | null` को स्पष्ट रूप से सेट करना होगा। 

इससे एक समस्या उत्पन्न होती है कि आपको कॉन्टेक्स्ट कंस्यूमर्स के लिए टाइप में `| null` को हटाना होता है। हमारी सिफारिश है कि हुक इसके मौजूदगी के लिए एक रनटाइम चेक करें और उपस्थित नहीं होने पर एक त्रुटि फेंके:

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
    <Context value={object}>
      <MyComponent />
    </Context>
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

[`useMemo`](/reference/react/useMemo) हुक्स एक फ़ंक्शन कॉल से एक स्मृति मेमोराइज़्ड मूल्य बनाएगा/पुनर-पहुँचेगा, केवल जब दूसरे पैरामीटर के रूप में पास किए गए डिपेंडेंसीज़ बदले जाएँ। हुक को कॉल करने का परिणाम पहले पैरामीटर में दिए गए फ़ंक्शन से इन्फर किया जाता है। आप हुक को एक प्रकार तर्क प्रदान करके अधिक स्पष्ट हो सकते हैं।

```ts
// The type of visibleTodos is inferred from the return value of filterTodos
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
```


### `useCallback` {/*typing-usecallback*/}

[`useCallback`](/reference/react/useCallback) दूसरे पैरामीटर में पास किए गए डिपेंडेंसीज़ के समान होते हैं, एक फ़ंक्शन के लिए एक स्थिर संदर्भ प्रदान करता है। `useMemo` की तरह, पहले पैरामीटर में दिए गए फ़ंक्शन के वापसी मूल्य से फ़ंक्शन का प्रकार इन्फर किया जाता है, और आप हुक को एक प्रकार तर्क प्रदान करके अधिक स्पष्ट हो सकते हैं।


```ts
const handleClick = useCallback(() => {
  // ...
}, [todos]);
```

टाइपस्क्रिप्ट स्ट्रिक्ट मोड में काम करते समय, `useCallback` में आपको अपने कॉलबैक के पैरामीटर्स के लिए टाइप्स जोड़ना आवश्यक है। यह इसलिए है क्योंकि कॉलबैक के प्रकार को फ़ंक्शन की वापसी मूल्य से इन्फर किया जाता है, और पैरामीटर्स के बिना पूरी तरह से समझा नहीं जा सकता है।

आपके कोड-स्टाइल की पसंद के आधार पर, आप `*EventHandler` फ़ंक्शन्स का उपयोग कर सकते हैं जो इवेंट हैंडलर के लिए टाइप प्रदान करने के लिए रिएक्ट टाइप्स से साथ ही कॉलबैक को परिभाषित करते हैं: 

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

## उपयोगी टाइप्स {/*useful-types*/}

`@types/react` पैकेज से एक काफी विस्तारित सेट की गई है जिसमें से कई टाइप्स शामिल हैं, जब आप रिएक्ट और टाइपस्क्रिप्ट के इंटरएक्ट के साथ सहज महसूस करते हैं तो यह पठने लायक है। आप इन्हें [DefinitelyTyped में रिएक्ट के फ़ोल्डर](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts) में पा सकते हैं। यहां हम कुछ अधिक सामान्य टाइप्स कवर करेंगे।

### DOM इवेंट्स {/*typing-dom-events*/}

रिएक्ट में DOM इवेंट्स के साथ काम करते समय, इवेंट के प्रकार को अक्सर इवेंट हैंडलर से इन्फर किया जा सकता है। हालांकि, जब आप एक फ़ंक्शन को इवेंट हैंडलर को पास करने के लिए एक्सट्रैक्ट करना चाहते हैं, तो आपको इवेंट के प्रकार को स्पष्ट रूप से सेट करना होगा।

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

रिएक्ट टाइप्स में कई प्रकार के इवेंट्स हैं - पूरी सूची [यहां](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b580df54c0819ec9df62b0835a315dd48b8594a9/types/react/index.d.ts#L1247C1-L1373) मिल सकती है, जो [DOM से सबसे पॉपुलर इवेंट्स पर आधारित है](https://developer.mozilla.org/en-US/docs/Web/Events)।

आप जिस टाइप को ढूंढ रहे हैं, उसे तय करने के लिए पहले आप जिस इवेंट हैंडलर का उपयोग कर रहे हैं, उसके लिए होवर जानकारी देख सकते हैं, जिसमें इवेंट का प्रकार दिखाया जाएगा।

यदि आपको इस सूची में शामिल नहीं किया गया कोई इवेंट चाहिए हो, तो आप `React.SyntheticEvent` टाइप का उपयोग कर सकते हैं, जो सभी इवेंट्स के लिए बेस टाइप है।

### चिल्ड्रेन {/*typing-children*/}

किसी कॉम्पोनेंट के बच्चों को वर्णन करने के लिए दो सामान्य पथ हैं। पहला है `React.ReactNode` टाइप का उपयोग करना, जो JSX में बच्चों के रूप में पास किए जा सकने वाले सभी संभावित टाइप्स का यूनियन है:

```ts
interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}
```

यह बच्चों का एक बहुत व्यापक परिभाषा है। दूसरा है `React.ReactElement` टाइप का उपयोग करना, जो केवल JSX एलिमेंट्स हैं और स्ट्रिंग्स या नंबर्स जैसे जावास्क्रिप्ट प्राइमिटिव्स नहीं हैं:

```ts
interface ModalRendererProps {
  title: string;
  children: React.ReactElement;
}
```

ध्यान दें कि आप JSX एलिमेंट्स के किसी विशिष्ट प्रकार के होने को वर्णन करने के लिए टाइपस्क्रिप्ट का उपयोग नहीं कर सकते हैं, इसलिए आप टाइप-सिस्टम का उपयोग करके एक कॉम्पोनेंट को वर्णन करने के लिए नहीं कर सकते हैं जो केवल `<li>` बच्चों को स्वीकार करता है। 

आप [इस टाइपस्क्रिप्ट प्लेग्राउंड](https://www.typescriptlang.org/play?#code/https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wChSB6CxYmAOmXRgDkIATJOdNJMGAZzgwAFpxAR+8YADswAVwGkZMJFEzpOjDKw4AFHGEEBvUnDhphwADZsi0gFw0mDWjqQBuUgF9yaCNMlENzgAXjgACjADfkctFnYkfQhDAEpQgD44AB42YAA3dKMo5P46C2tbJGkvLIpcgt9-QLi3AEEwMFCItJDMrPTTbIQ3dKywdIB5aU4kKyQQKpha8drhhIGzLLWODbNs3b3s8YAxKBQAcwXpAThMaGWDvbH0gFloGbmrgQfBzYpd1YjQZbEYARkB6zMwO2SHSAAlZlYIBCdtCRkZpHIrFYahQYQD8UYYFA5EhcfjyGYqHAXnJAsIUHlOOUbHYhMIIHJzsI0Qk4P9SLUBuRqXEXEwAKKfRZcNA8PiCfxWACecAAUgBlAAacFm80W-CU11U6h4TgwUv11yShjgJjMLMqDnN9Dilq+nh8pD8AXgCHdMrCkWisVoAet0R6fXqhWKhjKllZVVxMcavpd4Zg7U6Qaj+2hmdG4zeRF10uu-Aeq0LBfLMEe-V+T2L7zLVu+FBWLdLeq+lc7DYFf39deFVOotMCACNOCh1dq219a+30uC8YWoZsRyuEdjkevR8uvoVMdjyTWt4WiSSydXD4NqZP4AymeZE072ZzuUeZQKheQgA) में दोनों `React.ReactNode` और `React.ReactElement` का एक उदाहरण देख सकते हैं।

### स्टाइल प्रॉप्स {/*typing-style-props*/}

रिएक्ट में इनलाइन स्टाइल का उपयोग करते समय, आप `React.CSSProperties` का उपयोग कर सकते हैं ताकि आप `style` प्रॉप को पास करने वाले ऑब्जेक्ट को वर्णन कर सकें। यह टाइप सभी संभावित CSS प्रॉपर्टीज़ का यूनियन है, और यह एक अच्छा तरीका है सुनिश्चित करने के लिए कि आप `style` प्रॉप को वैध CSS प्रॉपर्टीज़ पास कर रहे हैं, और अपने एडिटर में ऑटो-कम्प्लीट प्राप्त करने के लिए।

```ts
interface MyComponentProps {
  style: React.CSSProperties;
}
```

## आगे की सीखें {/*further-learning*/}

यह गाइड टाइपस्क्रिप्ट को रिएक्ट के साथ उपयोग करने के मूल तत्वों को कवर करती है, लेकिन सीखने के लिए और भी बहुत कुछ है। डॉक्स पर व्यक्तिगत API पृष्ठों पर और भी विस्तृत दस्तावेज़ हो सकती हैं कि आप उन्हें टाइपस्क्रिप्ट के साथ कैसे उपयोग कर सकते हैं।

हम निम्नलिखित संसाधनों की सिफारिश करते हैं:

- [टाइपस्क्रिप्ट हैंडबुक](https://www.typescriptlang.org/docs/handbook/): टाइपस्क्रिप्ट के लिए आधिकारिक दस्तावेज़ है और अधिकांश कुंजीय भाषा सुविधाओं को कवर करता है।

- [टाइपस्क्रिप्ट रिलीज़ नोट्स](https://devblogs.microsoft.com/typescript/) नई फीचर्स को गहराई से कवर करता है।

- [रिएक्ट टाइपस्क्रिप्ट Cheatsheet](https://react-typescript-cheatsheet.netlify.app/): यह एक समुदाय द्वारा बनाई गई एक cheatsheet है जो रिएक्ट के साथ टाइपस्क्रिप्ट का उपयोग करने के लिए है, जिसमें कई उपयोगी एज केस को कवर किया गया है और इस सापेक्षता को प्रदान करता है जो इस दस्तावेज़ से अधिक है।

- [टाइपस्क्रिप्ट समुदाय Discord](https://discord.com/invite/typescript): टाइपस्क्रिप्ट और रिएक्ट समस्याओं के साथ सवाल पूछने और मदद प्राप्त करने के लिए एक शानदार स्थान है।

---
title: createContext
---

<Intro>

`createContext` lets you create a [context](/learn/passing-data-deeply-with-context) that components can provide or read.

`createContext` आपको एक [context](/learn/passing-data-deeply-with-context) बनाने देता है जो कौम्पोनॅन्ट्स दे या पढ़ सकते है.
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

### context बनाना {/*creating-context*/}

Context lets components [pass information deep down](/learn/passing-data-deeply-with-context) without explicitly passing props.

Context कौम्पोनॅन्ट्स को बिना प्प्रॉप्स को पास कर इन्फ़र्मेशन को गहराई तक पास करती है.

Call `createContext` outside any components to create one or more contexts.

एक या अधिक context बनाने के लिए, `createContext` को किसी भी कौम्पोनॅन्ट के बाहर कॉल करे.

```js [[1, 3, "ThemeContext"], [1, 4, "AuthContext"], [3, 3, "'light'"], [3, 4, "null"]]
import { createContext } from 'react';

const ThemeContext = createContext('light');
const AuthContext = createContext(null);
```

`createContext` returns a <CodeStep step={1}>context object</CodeStep>. Components can read context by passing it to [`useContext()`](/apis/usecontext):

`createContext` एक <CodeStep step={1}>context object</CodeStep> रिटर्न करता है. कौम्पोनॅन्ट context को [`useContext()`](/apis/usecontext) मे पास कर पढ़ सकते है:

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

डिफ़ॉल्ट रूप से जो वैल्यू मिलती है वह <CodeStep step={3}>डिफ़ॉल्ट वैल्यूस </CodeStep> है जो आपने context बनाते समय स्पेसिफ़ाई किया था. लेकिन, खुद से यह उपयोगी नही है क्योंकि डिफ़ॉल्ट वैल्यू कभी नहीं बदलते है.

Context is useful because you can **provide other, dynamic values from your components:**

Context उपयोगी है क्युंकि आप **कौम्पोनॅन्ट्स से उसे बाकी, डायनामिक वैल्यू दे सकते है :**

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

Now the `Page` component and any components inside it, no matter how deep, will "see" the passed context values. If the passed context values change, React will री-render the components reading the context as well.

अब `Page` कौम्पोनॅन्ट और उसके अंदर जितने भी कौम्पोनॅन्ट्स है, चाहे कितने भी गहराई में है, पास किये गए context वैल्यूस को देखेगा. यदि पास किये गए context वैल्यूस बदले तो React context पढ़ने वाले सारे कौम्पोनॅन्ट्स को री-रेंडर करेगा.

[Read more about reading and providing context and see examples.](/apis/usecontext)

[context देने और पढ़ने के बारे मे adhik padhe और उदाहरण देखिए](/apis/usecontext)

---

### फ़ाइल से context इंपोर्ट और इक्स्पॉर्ट करना {/*importing-and-exporting-context-from-a-file*/}

Often, components in different files will need access to the same context. This is why it's common to declare contexts in a separate file. Then you can use the [`export` statement](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) to make context available for other files:

अक्सर, अलग-अलग फ़ाइल्ज़ मे रखे गए कौम्पोनॅन्ट्स को एक ही context ऐक्सेस करने की ज़रूरत है. इसीलिए सारे context को एक अलग फ़ाइल मे डिक्लेर करना एक साधारण बात है. फ़िर, [`export` statement](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) का इस्तेमाल कर, context को सारे फ़ाइल्ज़ मे अवेलबल कर सकते हो:

```js {4-5}
// Contexts.js
import { createContext } from 'react';

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);
````

Components declared in other files can then use the [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) statement to read or provide this context:

बाकी फ़ाइल्ज़ मे डिक्लेर किया गया कौम्पोनॅन्ट्स अब इस context को [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) स्टेट्मेंट को इस्तेमाल कर पढ़ या दे सकते है
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

यह [इम्पोर्टिंग और इक्स्पॉर्टिंग कौम्पोनॅन्ट्स](/learn/importing-and-exporting-components) जैसे ही काम करता है.

---

## रेफ़्रेन्स {/*reference*/}

### `createContext(defaultValue)` {/*createcontext*/}

Call `createContext` outside of any components to create a context.

context बनाने के लिए `createContext` को किसी भी कौम्पोनॅन्ट के बाहर कॉल करे.

```js
import { createContext } from 'react';

const ThemeContext = createContext('light');
```

#### पैरामीटर्ज़ {/*parameters*/}

* `defaultValue`: The value that you want the context to have when there is no matching context provider in the tree above the component that reads context. If you don't have any meaningful default value, specify `null`. The default value is meant as a "last resort" fallback. It is static and never changes over time.

* `defaultValue`: वो वैल्यू जो आप चाहते है कि context के पास हो जब context पढ़ने वाला कौम्पोनॅन्ट के उपर ट्री मे कोई भी matching context provider नही है. यदि आप के पास कोई सार्थक डिफ़ॉल्ट वैल्यू नही है, to `null` स्पेसिफ़ाई कीजिए. डिफ़ॉल्ट वैल्यू 'एक आख़िरी विकल्प' फ़ॉलबैक है. इसका रूप स्थिर है और समय के साथ इसका वैल्यू नही बदलता।

#### रीटर्न्स {/*returns*/}

`createContext` returns a context object.

`createContext` एक context ऑब्जेक्ट return करता है.

**The context object itself does not hold any information.** It represents _which_ context other components can read or provide. Typically, you will use [`SomeContext.Provider`](#provider) in components above to specify the context value, and call [`useContext(SomeContext)`](/apis/usecontext) in components below to read it. The context object has a few properties:

**context ऑब्जेक्ट अपने आप मे कोई भी इन्फ़र्मेशन नही rakta.** यह रेप्रेज़ेंट करता है _कौनसा_ context बाकी कौम्पोनॅन्ट्स पढ़ या प्रदान कर सकता है. आम तौर पर आप कौम्पोनॅन्ट्स मे context वैल्यू स्पेसिफ़ाई करने के लिए, [`SomeContext.Provider`](#provider) का इस्तेमाल करते है और उसे पढ़ने के लिए उसके नीचे के कौम्पोनॅन्ट्स मे [`useContext(SomeContext)`] को बुलाते है.

* `SomeContext.Provider` lets you provide the context value to components.
* `SomeContext.Consumer` is an alternative and rarely used way to read the context value.

* `SomeContext.Provider` आपको कौम्पोनॅन्ट्स को context वैल्यू प्रदान करने देता है.
* `SomeContext.Consumer` से भी आप context वैल्यू पढ सकते है लेकिन यह एक विकल्प है और कभी-कभार इस्तेमाल किया जाता है.

---

### `SomeContext.Provider` {/*provider*/}

Wrap your components into a context provider to specify the value of this context for all components inside:

कौम्पोनॅन्ट्स को एक _context provider_ मे रैप कर, सारे अंदर के कौम्पोनॅन्ट्स को context का वैल्यू स्पेसिफ़ाई करता है.

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

* `value`: वह वैल्यू जो आप सारे context पढ़ने वाले कौम्पोनॅन्ट्स मे पास करना चाहते हो चाहे वह कौम्पोनॅन्ट कितना भी गहरा हो. यह _context वैल्यू_ किसी भी टाइप का हो सकता है.
---

### `SomeContext.Consumer` {/*consumer*/}

Before `useContext` existed, there was an older way to read context:

`useContext` के पहले, context पढ़ने का पुराना तरीका:

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

हालाँकि यह तरीक़ा अब भी काम करता है, लेकिन **haal मे लिखे गए कोड को [`useContext()`](/apis/usecontext)की मदद से context पढ़ना चाहिए:**

```js
function Button() {
  // ✅ Recommended way
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```

#### Props {/*consumer-props*/}

* `children`: A function. React will call the function you pass with the current context value determined by the same algorithm as [`useContext()`](/apis/usecontext) does, and render the result you return from this function. React will also री-run this function and update the UI whenever the context passed from the parent components have changed.

* `children`: एक फ़ंक्शन है. React उस फ़ंक्शन को बुलाएगा जो आपने पास किया है वर्तमान _context वैल्यूस के साथ. यह context वैल्यूस उस अलगोरितम द्वारा तय किया जाता है जो [`useContext()`](/apis/usecontext) इस्तेमाल करता है. फ़ंक्शन से रिटर्न किया गया रिज़ल्ट React द्वारा रेंडर किया जाता है. जब भी पैरेंट कौम्पोनॅन्ट से भेजा गया context बदलता है, React इस फ़ंक्शन को फ़िर से बुला कर UI अप्डेट करता है.

---

## Troubleshooting {/*troubleshooting*/}
## ट्रबल्शूटिंग {/*troubleshooting*/}

### मुझसे context वैल्यूस नही बदल रहे {/*i-cant-find-a-way-to-change-the-context-value*/}
Code like this specifies the *default* context value:

*डिफ़ॉल्ट* context वैल्यू को स्पेसिफ़ाई करने के लिए, सिर्फ कोड करो:
```js
const ThemeContext = createContext('light');
```

This value never changes. React only uses this value as a fallback if it can't find a matching provider above.

यह वैल्यू कभी बदलेगा नही. जब कोई मैचिंग प्रोवाईडर नही मिलेगा to React इससे एक फ़ॉलबैक वैल्यू की तरह इस्तेमाल करेगा.

To make context change over time, [add state and wrap components in a context provider](/apis/usecontext#updating-data-passed-via-context).

Context को समय के साथ बदलने के लिए, [state और रैप कौम्पोनॅन्ट्स को एक context प्रोवाईडर मे जोड़ दीजिए](/apis/usecontext#updating-data-passed-via-context).

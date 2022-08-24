---
title: createContext
---

<Intro>

`createContext` आपको एक [context](/learn/passing-data-deeply-with-context) बनाने देता है जो कौम्पोनॅन्ट्स दे या पढ़ सकते है
```js
const SomeContext = createContext(defaultValue);
```

</Intro>

- [प्रयोग](#usage)
  - [context बनाना](#creating-context)
  - [फ़ाइल से context इंपोर्ट और इक्स्पॉर्ट करना](#importing-and-exporting-context-from-a-file)
- [रेफ़्रेन्स](#reference)
  - [`createContext(defaultValue)`](#createcontext)
  - [`SomeContext.Provider`](#provider)
  - [`SomeContext.Consumer`](#consumer)
- [ट्रबल्शूटिंग](#troubleshooting)
  - [मुझसे context वैल्यूस नही बदल रहे](#troubleshooting)

---

## प्रयोग {/*usage*/}

### context बनाना {/*creating-context*/}
Context कौम्पोनॅन्ट्स को बिना प्प्रॉप्स को पास कर इन्फ़र्मेशन को गहराई तक पास करती है|

एक या अधिक context बनाने के लिए, `createContext` को किसी भी कौम्पोनॅन्ट के बाहर कॉल करे|

```js [[1, 3, "ThemeContext"], [1, 4, "AuthContext"], [3, 3, "'light'"], [3, 4, "null"]]
import { createContext } from 'react';

const ThemeContext = createContext('light');
const AuthContext = createContext(null);
```

`createContext` एक <CodeStep step={1}>context object</CodeStep> रिटर्न करता है| कौम्पोनॅन्ट context को [`useContext()`](/apis/usecontext) मे पास कर पढ़ सकते है:

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

डिफ़ॉल्ट रूप से जो वैल्यू मिलती है वह <CodeStep step={3}>डिफ़ॉल्ट वैल्यूस </CodeStep> है जो आपने context बनाते समय स्पेसिफ़ाई किया था| लेकिन, खुद से यह उपयोगी नही है क्योंकि डिफ़ॉल्ट वैल्यू कभी नहीं बदलते है|

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

अब `Page` कौम्पोनॅन्ट और उसके अंदर जितने भी कौम्पोनॅन्ट्स है, चाहे कितने भी गहराई में है, पास किये गए context वैल्यूस को देखेगा| यदि पास किये गए context वैल्यूस बदले तो React context पढ़ने वाले सारे कौम्पोनॅन्ट्स को री-रेंडर करेगा|

[context देने और पढ़ने के बारे मे अधिक पढ़े और उदाहरण देखिए|](/apis/usecontext)

---

### फ़ाइल से context इंपोर्ट और इक्स्पॉर्ट करना {/*importing-and-exporting-context-from-a-file*/}

अक्सर, अलग-अलग फ़ाइल्ज़ मे रखे गए कौम्पोनॅन्ट्स को एक ही context ऐक्सेस करने की ज़रूरत है| इसीलिए सारे context को एक अलग फ़ाइल मे डिक्लेर करना एक साधारण बात है| फ़िर, [`export` statement](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) का इस्तेमाल कर, context को सारे फ़ाइल्ज़ मे अवेलबल कर सकते हो:

```js {4-5}
// Contexts.js
import { createContext } from 'react';

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);
```

बाकी फ़ाइल्ज़ मे डिक्लेर किया गया कौम्पोनॅन्ट्स अब इस context को [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) स्टेट्मेंट को इस्तेमाल कर पढ़ या दे सकते है:)

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

यह [इम्पोर्टिंग और इक्स्पॉर्टिंग कौम्पोनॅन्ट्स](/learn/importing-and-exporting-components) जैसे ही काम करता है|

---

## रेफ़्रेन्स {/*reference*/}

### `createContext(defaultValue)` {/*createcontext*/}

context बनाने के लिए `createContext` को किसी भी कौम्पोनॅन्ट के बाहर कॉल करे|

```js
import { createContext } from 'react';

const ThemeContext = createContext('light');
```

#### पैरामीटर्ज़ {/*parameters*/}

* `defaultValue`: वो वैल्यू जो आप चाहते है कि context के पास हो जब context पढ़ने वाला कौम्पोनॅन्ट के उपर ट्री मे कोई भी matching context provider नही है| यदि आप के पास कोई सार्थक डिफ़ॉल्ट वैल्यू नही है, तो `null` स्पेसिफ़ाई कीजिए. डिफ़ॉल्ट वैल्यू 'एक आख़िरी विकल्प' फ़ॉलबैक है. इसका रूप स्थिर है और समय के साथ इसका वैल्यू नही बदलता।

#### रीटर्न्स {/*returns*/}

`createContext` एक context ऑब्जेक्ट return करता है|

**context ऑब्जेक्ट अपने आप मे कोई भी इन्फ़र्मेशन नही रखता |** यह रेप्रेज़ेंट करता है _कौनसा_ context बाकी कौम्पोनॅन्ट्स पढ़ या प्रदान कर सकता है. आम तौर पर आप कौम्पोनॅन्ट्स मे context वैल्यू स्पेसिफ़ाई करने के लिए, [`SomeContext.Provider`](#provider) का इस्तेमाल करते है और उसे पढ़ने के लिए उसके नीचे के कौम्पोनॅन्ट्स मे [`useContext(SomeContext)`] को बुलाते है|

* `SomeContext.Provider` आपको कौम्पोनॅन्ट्स को context वैल्यू प्रदान करने देता है|
* `SomeContext.Consumer` से भी आप context वैल्यू पढ सकते है लेकिन यह एक विकल्प है और कभी-कभार इस्तेमाल किया जाता है|

---

### `SomeContext.Provider` {/*provider*/}

कौम्पोनॅन्ट्स को एक _context provider_ मे रैप कर, सारे अंदर के कौम्पोनॅन्ट्स को context का वैल्यू स्पेसिफ़ाई करता है|

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

* `value`: वह वैल्यू जो आप सारे context पढ़ने वाले कौम्पोनॅन्ट्स मे पास करना चाहते हो चाहे वह कौम्पोनॅन्ट कितना भी गहरा हो| यह context वैल्यू किसी भी टाइप का हो सकता है| प्रोवाइडर के अंदर [`useContext(SomeContext)`](/apis/usecontext) को बुलाने वाला कौम्पोनॅन्ट को सबसे अंदर तदनुसार context प्रोवाइडर के ऊपर का `value` मिलेगा|
---

### `SomeContext.Consumer` {/*consumer*/}

`useContext` के पहले, context पढ़ने का पुराना तरीका:

```js
function Button() {
  // 🟡 विरासत तरीका (यह अनुशंसित नहीं हैं)
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button className={theme} />
      )}
    </ThemeContext.Consumer>
  );
}
```

हालाँकि यह तरीक़ा अब भी काम करता है, लेकिन **हाली  मे लिखे गए कोड को [`useContext()`](/apis/usecontext)की मदद से context पढ़ना चाहिए:**

```js
function Button() {
  // ✅ अनुशंसित तरीका
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```

#### Props {/*consumer-props*/}

* `children`: एक फ़ंक्शन है| React उस फ़ंक्शन को बुलाएगा जो आपने पास किया है वर्तमान context वैल्यूस के साथ. यह context वैल्यूस उस अलगोरितम द्वारा तय किया जाता है जो [`useContext()`](/apis/usecontext) इस्तेमाल करता है| फ़ंक्शन से रिटर्न किया गया रिज़ल्ट React द्वारा रेंडर किया जाता है| जब भी पैरेंट कौम्पोनॅन्ट से भेजा गया context बदलता है, React इस फ़ंक्शन को फ़िर से बुला कर UI अप्डेट करता है|

---

## ट्रबल्शूटिंग {/*troubleshooting*/}

### मुझसे context वैल्यूस नही बदल रहे {/*i-cant-find-a-way-to-change-the-context-value*/}

*डिफ़ॉल्ट* context वैल्यू को स्पेसिफ़ाई करने के लिए, सिर्फ कोड करो:

```js
const ThemeContext = createContext('light');
```

यह वैल्यू कभी बदलेगा नही| जब कोई मैचिंग प्रोवाईडर नही मिलेगा तो React इससे एक फ़ॉलबैक वैल्यू की तरह इस्तेमाल करेगा|

Context को समय के साथ बदलने के लिए, [state और रैप कौम्पोनॅन्ट्स को एक context प्रोवाईडर मे जोड़ दीजिए](/apis/usecontext#updating-data-passed-via-context)|

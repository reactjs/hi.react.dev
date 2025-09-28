---
title: 'आपको Effect की ज़रूरत नहीं हो सकती'
---

<Intro>

Effects React पैराडाइम से एक एस्केप हैच हैं। वे आपको React से "बाहर कदम रखने" और आपके कौम्पोनॅन्ट्स को किसी बाहरी सिस्टम जैसे कि कोई नॉन-React विजेट, नेटवर्क, या ब्राउज़र DOM के साथ सिंक्रोनाइज़ करने देते हैं। अगर कोई बाहरी सिस्टम शामिल नहीं है (उदाहरण के लिए, अगर आप किसी कौम्पोनॅन्ट की state को तब अपडेट करना चाहते हैं जब कुछ props या state बदलें), तो आपको Effect की ज़रूरत नहीं होनी चाहिए। अनावश्यक Effects को हटाने से आपका कोड फॉलो करने में आसान, रन करने में तेज़, और कम एरर-प्रोन हो जाएगा।

</Intro>

<YouWillLearn>

* अपने कौम्पोनॅन्ट्स से फ़ालतू Effects क्यों और कैसे हटाएँ  
* बिना Effects के महंगे computation को cache कैसे करें  
* बिना Effects के कौम्पोनॅन्ट की state को reset और adjust कैसे करें  
* event handlers के बीच logic को कैसे साझा करें  
* कौन-सा logic event handlers में ले जाना चाहिए  
* पैरेंट कौम्पोनॅन्ट्स को बदलाव के बारे में कैसे सूचित करें

</YouWillLearn>


## फ़ालतू Effects कैसे हटाएँ {/*how-to-remove-unnecessary-effects*/}

दो आम स्थितियाँ हैं जिनमें आपको Effects की ज़रूरत नहीं होती:

* **Rendering के लिए डेटा बदलने के लिए Effects की ज़रूरत नहीं होती।** उदाहरण के लिए, मान लीजिए आप किसी लिस्ट को दिखाने से पहले फ़िल्टर करना चाहते हैं। आपको शायद एक Effect लिखने का मन हो जो लिस्ट बदलने पर किसी state वेरिएबल को अपडेट करे। लेकिन यह अक्षम है। जब आप state अपडेट करते हैं, React पहले आपके कौम्पोनॅन्ट फ़ंक्शन्स को कॉल करेगा ताकि पता चल सके कि स्क्रीन पर क्या दिखाना है। फिर React उन बदलावों को DOM में ["commit"](/learn/render-and-commit) करेगा और स्क्रीन अपडेट करेगा। इसके बाद React आपके Effects चलाएगा। अगर आपका Effect *फिर से* तुरंत state अपडेट करता है, तो पूरा प्रोसेस शुरू से फिर दोहराया जाएगा! इन बेकार की re-renders से बचने के लिए, अपने कौम्पोनॅन्ट्स के टॉप लेवल पर ही डेटा transform कर लें। यह कोड अपने-आप हर बार दोबारा चलेगा जब आपके props या state बदलेंगे।

* **User events को संभालने के लिए Effects की ज़रूरत नहीं होती।** उदाहरण के लिए, मान लीजिए आप चाहते हैं कि जब यूज़र कोई product खरीदे तो `/api/buy` POST request भेजी जाए और एक notification दिखाई जाए। Buy बटन के click event handler में, आपको ठीक-ठीक पता है कि क्या हुआ। लेकिन जब तक Effect चलता है, आपको यह नहीं पता कि यूज़र ने *क्या* किया (जैसे किस बटन पर क्लिक किया)। यही कारण है कि आम तौर पर आप user events को उनके event handlers में ही संभालेंगे।

आपको *वास्तव में* Effects की ज़रूरत तब होती है जब आपको किसी बाहरी सिस्टम के साथ [synchronize](/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events) करना हो। उदाहरण के लिए, आप ऐसा Effect लिख सकते हैं जो किसी jQuery विजेट को React state के साथ सिंक्रोनाइज़ रखे। आप डेटा भी Effects से fetch कर सकते हैं: उदाहरण के लिए, search results को current search query के साथ synchronize करना। ध्यान रखें कि आधुनिक [frameworks](/learn/start-a-new-react-project#production-grade-react-frameworks) डेटा fetching के लिए इन-बिल्ट और अधिक प्रभावी तरीक़े प्रदान करते हैं, बजाय इसके कि आप अपने कौम्पोनॅन्ट्स में सीधे Effects लिखें।  

सही समझ बनाने में मदद करने के लिए, आइए कुछ सामान्य ठोस उदाहरणों पर नज़र डालें!  



### props या state के आधार पर state अपडेट करना {/*updating-state-based-on-props-or-state*/}

मान लीजिए आपके पास एक कौम्पोनॅन्ट है जिसमें दो state वेरिएबल्स हैं: `firstName` और `lastName`। आप इन्हें जोड़कर एक `fullName` निकालना चाहते हैं। इसके अलावा, आप चाहते हैं कि जब भी `firstName` या `lastName` बदलें, `fullName` अपने-आप अपडेट हो जाए। आपका पहला विचार यह हो सकता है कि एक `fullName` state वेरिएबल जोड़ें और उसे किसी Effect में अपडेट करें:

```js {5-9}
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```

यह ज़रूरत से ज़्यादा जटिल है। यह अक्षम भी है: यह पहले `fullName` के पुराने मान के साथ पूरा render pass करता है, और फिर तुरंत अपडेटेड मान के साथ दोबारा render करता है। state वेरिएबल और Effect को हटा दें:

```js {4-5}
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

**जब कुछ मौजूदा props या state से कैलकुलेट किया जा सकता है, [तो उसे state में न रखें.](/learn/choosing-the-state-structure#avoid-redundant-state) इसके बजाय, उसे rendering के दौरान कैलकुलेट करें।** इससे आपका कोड तेज़ होता है (आप अतिरिक्त "cascading" अपडेट्स से बचते हैं), सरल होता है (आप कुछ कोड हटा देते हैं), और कम ग़लतियों वाला होता है (आप उन बग्स से बचते हैं जो अलग-अलग state वेरिएबल्स के एक-दूसरे के साथ sync से बाहर होने पर होते हैं)। अगर यह तरीका आपको नया लगता है, तो [Thinking in React](/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state) बताता है कि state में क्या होना चाहिए।

### महंगी गणनाओं को cache करना {/*caching-expensive-calculations*/}

यह कौम्पोनॅन्ट `visibleTodos` को compute करता है, जो उसे props से मिले `todos` को लेता है और उन्हें `filter` prop के अनुसार फ़िल्टर करता है। आपको यह परिणाम state में स्टोर करने और उसे किसी Effect से अपडेट करने का मन हो सकता है:


```js {4-8}
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```

जैसे पहले वाले उदाहरण में था, यह भी अनावश्यक और अक्षम है। सबसे पहले, state और Effect को हटा दें:

```js {3-4}
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ This is fine if getFilteredTodos() is not slow.
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```
आम तौर पर, यह कोड ठीक है! लेकिन हो सकता है कि `getFilteredTodos()` धीमा हो या आपके पास बहुत सारे `todos` हों। उस स्थिति में, आप `getFilteredTodos()` की गणना फिर से नहीं करना चाहेंगे यदि `newTodo` जैसे कोई असंबंधित state वेरिएबल बदल गया है।

आप इस महंगी गणना को कैश (या ["मेमोइज़"](https://en.wikipedia.org/wiki/Memoization)) कर सकते हैं इसे एक [`useMemo`](/reference/react/useMemo) हुक में रैप करके:

<Note>

[React Compiler](/learn/react-compiler) आपके लिए महंगी गणनाओं को अपने आप मेमोइज़ कर सकता है, जिससे ज़्यादातर मामलों में हाथ से `useMemo` करने की ज़रूरत ही नहीं रह जाती।

</Note>

```js {5-8}
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```

या, एकल पंक्ति के रूप में लिखा गया:

```js {5-6}
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ Does not re-run getFilteredTodos() unless todos or filter change
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```

**यह React को बताता है कि आप नहीं चाहते कि भीतरी फ़ंक्शन तब तक फिर से चले जब तक कि `todos` या `filter` में बदलाव न हुआ हो।** React शुरुआती रेंडर के दौरान `getFilteredTodos()` के रिटर्न वैल्यू को याद रखेगा। अगले रेंडर के दौरान, यह जाँचेगा कि क्या `todos` या `filter` अलग हैं। अगर वे पिछली बार जैसे ही हैं, तो `useMemo` आखिरी stored रिजल्ट वापस कर देगा। लेकिन अगर वे अलग हैं, तो React भीतरी फ़ंक्शन को फिर से कॉल करेगा (और उसके रिजल्ट को store करेगा)।

आप जिस फ़ंक्शन को [`useMemo`](/reference/react/useMemo) में लपेटते हैं वह रेंडरिंग के दौरान चलता है, इसलिए यह सिर्फ़ [शुद्ध गणनाओं](/learn/keeping-components-pure) के लिए काम करता है।

<DeepDive>

#### यह कैसे बताएँ कि कोई गणना महंगी है? {/*how-to-tell-if-a-calculation-is-expensive*/}

आम तौर पर, जब तक आप हज़ारों ऑब्जेक्ट्स नहीं बना रहे या उन पर लूप नहीं लगा रहे, तब तक यह शायद महंगी नहीं है। अगर आप और ज़्यादा विश्वास चाहते हैं, तो आप कोड के एक टुकड़े में बिताए गए समय को मापने के लिए एक कंसोल लॉग जोड़ सकते हैं:

```js {1,3}
console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');
```
जिस इंटरैक्शन को आप माप रहे हैं, उसे अंजाम दें (उदाहरण के लिए, इनपुट में टाइप करना)। फिर आपको अपने कंसोल में `filter array: 0.15ms` जैसे लॉग दिखाई देंगे। यदि कुल लॉग किया गया समय एक महत्वपूर्ण मात्रा में जुड़ता है (जैसे, `1ms` या अधिक), तो उस गणना को मेमोइज़ करना समझ में आ सकता है। एक प्रयोग के रूप में, आप फिर गणना को `useMemo` में लपेट सकते हैं ताकि यह सत्यापित कर सकें कि क्या उस इंटरैक्शन के लिए कुल लॉग किया गया समय कम हुआ है या नहीं:

```js
console.time('filter array');
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter); // Skipped if todos and filter haven't changed
}, [todos, filter]);
console.timeEnd('filter array');
```

`useMemo` *पहला* रेंडर तेज़ नहीं करेगा। यह सिर्फ़ अपडेट्स पर अनावश्यक काम को छोड़ने में आपकी मदद करता है।

ध्यान रखें कि आपकी मशीन शायद आपके यूज़र्स की मशीन से तेज़ है, इसलिए कृत्रिम स्लोडाउन के साथ परफॉर्मेंस का टेस्ट करना एक अच्छा विचार है। उदाहरण के लिए, Chrome इसके लिए [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) का विकल्प देता है।

यह भी ध्यान दें कि डेवलपमेंट में परफॉर्मेंस को मापने से आपको सबसे सटीक रिजल्ट्स नहीं मिलेंगे। (उदाहरण के लिए, जब [Strict Mode](/reference/react/StrictMode) चालू होता है, तो आप प्रत्येक कौम्पोनॅन्ट को एक बार के बजाय दो बार रेंडर होते देखेंगे।) सबसे सटीक समय प्राप्त करने के लिए, अपनी ऐप को प्रोडक्शन के लिए बिल्ड करें और इसे अपने यूज़र्स जैसे डिवाइस पर टेस्ट करें।

</DeepDive>

### जब कोई prop बदलता है तो सभी state रीसेट करना {/*resetting-all-state-when-a-prop-changes*/}

यह `ProfilePage` कौम्पोनॅन्ट एक `userId` prop प्राप्त करता है। पेज में एक कमेंट इनपुट है, और आप इसके वैल्यू को होल्ड करने के लिए एक `comment` state वेरिएबल का उपयोग करते हैं। एक दिन, आपको एक समस्या नज़र आती है: जब आप एक प्रोफाइल से दूसरी प्रोफाइल पर नेविगेट करते हैं, तो `comment` state रीसेट नहीं होती। नतीजतन, गलत यूज़र की प्रोफाइल पर गलती से कमेंट पोस्ट करना आसान हो जाता है। इस समस्या को ठीक करने के लिए, आप चाहते हैं कि जब भी `userId` बदले, `comment` state वेरिएबल को क्लियर कर दिया जाए:

```js {4-7}
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 Avoid: Resetting state on prop change in an Effect
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
```

यह अक्षम है क्योंकि `ProfilePage` और उसके चिल्ड्रन पहले पुराने वैल्यू के साथ रेंडर होंगे, और फिर दोबारा रेंडर होंगे। यह जटिल भी है क्योंकि आपको यह *हर* उस कौम्पोनॅन्ट में करना होगा जिसके अंदर `ProfilePage` में कोई state है। उदाहरण के लिए, अगर कमेंट UI नेस्टेड है, तो आप नेस्टेड कमेंट state को भी क्लियर करना चाहेंगे।

इसके बजाय, आप React को बता सकते हैं कि प्रत्येक यूज़र की प्रोफाइल conceptually एक _अलग_ प्रोफाइल है, उसे एक एक्सप्लिसिट key देकर। अपने कौम्पोनॅन्ट को दो भागों में बाँटें और बाहरी कौम्पोनॅन्ट से भीतरी कौम्पोनॅन्ट में एक `key` एट्रिब्यूट पास करें:

```js {5,11-12}
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ This and any other state below will reset on key change automatically
  const [comment, setComment] = useState('');
  // ...
}
```

आम तौर पर, React state को तब प्रिज़र्व करता है जब एक ही कौम्पोनॅन्ट एक ही स्थान पर रेंडर होता है। **`Profile` कौम्पोनॅन्ट को `userId` को `key` के रूप में पास करके, आप React से कह रहे हैं कि अलग-अलग `userId` वाले दो `Profile` कौम्पोनॅन्ट्स को दो अलग-अलग कौम्पोनॅन्ट्स के रूप में ट्रीट करे जिन्हें कोई भी state शेयर नहीं करनी चाहिए।** जब भी key (जिसे आपने `userId` पर सेट किया है) बदलती है, React `Profile` कौम्पोनॅन्ट और उसके सभी चिल्ड्रन की DOM को दोबारा बनाएगा और [state रीसेट करेगा](/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key)। अब प्रोफाइल्स के बीच नेविगेट करते समय `comment` फ़ील्ड अपने आप क्लियर हो जाएगी।

ध्यान दें कि इस उदाहरण में, केवल बाहरी `ProfilePage` कौम्पोनॅन्ट एक्सपोर्ट किया गया है और प्रोजेक्ट की अन्य फ़ाइलों के लिए दिखाई देता है। `ProfilePage` को रेंडर करने वाले कौम्पोनॅन्ट्स को इसे key पास करने की आवश्यकता नहीं है: वे `userId` को एक रेगुलर prop के रूप में पास करते हैं। यह तथ्य कि `ProfilePage` इसे भीतरी `Profile` कौम्पोनॅन्ट को `key` के रूप में पास करता है, एक इम्प्लीमेंटेशन डिटेल है।

### जब कोई prop बदलता है तो कुछ state एडजस्ट करना {/*adjusting-some-state-when-a-prop-changes*/}

कभी-कभी, आप चाह सकते हैं कि prop के बदलने पर state के एक हिस्से को रीसेट या एडजस्ट करें, लेकिन पूरी state को नहीं।

यह `List` कौम्पोनॅन्ट `items` की एक सूची prop के रूप में प्राप्त करता है, और selected आइटम को `selection` state वेरिएबल में मेंटेन करता है। आप चाहते हैं कि जब भी `items` prop एक अलग ऐरे प्राप्त करे, तो `selection` को `null` पर रीसेट कर दें:

```js {5-8}
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}
```

यह भी आदर्श नहीं है। हर बार जब `items` बदलते हैं, `List` और उसके चाइल्ड कौम्पोनॅन्ट्स पहले stale `selection` वैल्यू के साथ रेंडर होंगे। फिर React DOM को अपडेट करेगा और Effects को चलाएगा। आखिरकार, `setSelection(null)` कॉल `List` और उसके चाइल्ड कौम्पोनॅन्ट्स का एक और री-रेंडर करवाएगी, जिससे यह पूरी प्रक्रिया फिर से शुरू हो जाएगी।

सबसे पहले Effect को डिलीट करें। इसके बजाय, रेंडरिंग के दौरान सीधे state को एडजस्ट करें:

```js {5-11}
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // Better: Adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```

[पिछले renders से जानकारी स्टोर करना](/reference/react/useState#storing-information-from-previous-renders) इस तरह समझना मुश्किल हो सकता है, लेकिन यह उसी state को किसी Effect में अपडेट करने से बेहतर है। ऊपर के उदाहरण में, `setSelection` को सीधे render के दौरान कॉल किया जाता है। React तुरंत `return` स्टेटमेंट के साथ बाहर निकलने के बाद *तुरंत* `List` को दोबारा render करेगा। React ने अभी तक `List` के children को render नहीं किया है या DOM को अपडेट नहीं किया है, इसलिए यह `List` के children को पुराने `selection` मान के साथ render करने से बचने देता है।  

जब आप render के दौरान किसी कौम्पोनॅन्ट को अपडेट करते हैं, React लौटाए गए JSX को हटा देता है और तुरंत render को फिर से आज़माता है। बहुत धीमी cascading retries से बचने के लिए, React केवल *उसी* कौम्पोनॅन्ट की state को render के दौरान अपडेट करने देता है। अगर आप render के दौरान किसी दूसरे कौम्पोनॅन्ट की state को अपडेट करते हैं, तो आपको एक error दिखाई देगा। `items !== prevItems` जैसी condition लूप्स से बचने के लिए ज़रूरी है। आप इस तरह state को adjust कर सकते हैं, लेकिन कोई भी दूसरा side effect (जैसे DOM बदलना या timeouts सेट करना) event handlers या Effects में ही रहना चाहिए ताकि [कौम्पोनॅन्ट्स शुद्ध रहें।](/learn/keeping-components-pure)  

**हालाँकि यह pattern किसी Effect से ज़्यादा कुशल है, लेकिन ज़्यादातर कौम्पोनॅन्ट्स को इसकी भी ज़रूरत नहीं होती।** आप चाहे जैसे भी करें, props या दूसरी state के आधार पर state को adjust करने से आपका data flow समझने और debug करने में मुश्किल हो जाता है। हमेशा यह जाँचें कि क्या आप [सभी state को किसी key के साथ reset](/learn/keeping-components-pure) कर सकते हैं या [सब कुछ rendering के दौरान कैलकुलेट](/learn/updating-state-based-on-props-or-state) कर सकते हैं। उदाहरण के लिए, किसी चयनित *item* को स्टोर (और reset) करने की बजाय, आप चयनित *item ID* को स्टोर कर सकते हैं:


```js {3-5}
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ Best: Calculate everything during rendering
  const selection = items.find(item => item.id === selectedId) ?? null;
  // ...
}
```

अब state को "adjust" करने की बिल्कुल ज़रूरत नहीं है। अगर चयनित ID वाला item सूची में है, तो वह चयनित ही रहेगा। अगर नहीं है, तो rendering के दौरान कैलकुलेट किया गया `selection` `null` होगा क्योंकि कोई मेल खाता हुआ item नहीं मिला। यह व्यवहार अलग है, लेकिन शायद बेहतर है क्योंकि ज़्यादातर `items` में होने वाले बदलाव selection को बनाए रखते हैं।

### event handlers के बीच logic साझा करना {/*sharing-logic-between-event-handlers*/}

मान लीजिए आपके पास एक प्रोडक्ट पेज है जिसमें दो बटन हैं (Buy और Checkout) जो दोनों उस प्रोडक्ट को खरीदने देते हैं। आप चाहते हैं कि जब भी यूज़र प्रोडक्ट को cart में डाले तो एक नोटिफ़िकेशन दिखाया जाए। दोनों बटनों के click handlers में `showNotification()` कॉल करना दोहराव जैसा लगता है, इसलिए आपका मन हो सकता है कि इस logic को किसी Effect में डालें:

```js {2-7}
function ProductPage({ product, addToCart }) {
  // 🔴 Avoid: Event-specific logic inside an Effect
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}
```

यह Effect अनावश्यक है। यह ज़्यादातर मामलों में बग्स भी पैदा करेगा। उदाहरण के लिए, मान लीजिए आपकी एप्प पेज reloads के बीच shopping cart को "याद" रखती है। अगर आप एक बार cart में प्रोडक्ट डालते हैं और पेज को refresh करते हैं, तो नोटिफ़िकेशन फिर से दिखाई देगा। यह हर बार तब दिखाई देगा जब भी आप उस प्रोडक्ट का पेज refresh करेंगे। ऐसा इसलिए है क्योंकि पेज लोड पर `product.isInCart` पहले से ही `true` होगा, इसलिए ऊपर वाला Effect `showNotification()` को कॉल कर देगा।  

**जब आपको यक़ीन न हो कि कुछ कोड किसी Effect में होना चाहिए या किसी event handler में, तो अपने आप से पूछें कि यह कोड *क्यों* चलना चाहिए। Effects का इस्तेमाल केवल उसी कोड के लिए करें जो *क्योंकि* कौम्पोनॅन्ट यूज़र को दिखाया गया है, चलना चाहिए।** इस उदाहरण में, नोटिफ़िकेशन इसलिए दिखना चाहिए क्योंकि यूज़र ने *बटन दबाया*, न कि इसलिए कि पेज दिखाया गया! Effect को हटा दें और साझा logic को एक फ़ंक्शन में डालें जिसे दोनों event handlers से कॉल किया जाए:

```js {2-6,9,13}
function ProductPage({ product, addToCart }) {
  // ✅ Good: Event-specific logic is called from event handlers
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
  // ...
}
```

इससे फ़ालतू Effect हट भी जाता है और बग भी ठीक हो जाता है।  

### POST रिक्वेस्ट भेजना {/*sending-a-post-request*/}

यह `Form` कौम्पोनॅन्ट दो तरह की POST रिक्वेस्ट भेजता है। यह mount होने पर एक analytics event भेजता है। जब आप फ़ॉर्म भरते हैं और Submit बटन क्लिक करते हैं, तो यह `/api/register` endpoint पर एक POST रिक्वेस्ट भेजेगा:

```js {5-8,10-16}
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic should run because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 Avoid: Event-specific logic inside an Effect
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```

चलो वही मापदंड लागू करें जो पिछले उदाहरण में किया था।  

analytics POST रिक्वेस्ट Effect में ही रहनी चाहिए। ऐसा इसलिए है क्योंकि analytics event भेजने का _कारण_ यह है कि फ़ॉर्म दिखाया गया था। (यह development में दो बार चलेगा, लेकिन इससे निपटने के लिए [यहाँ देखें](/learn/synchronizing-with-effects#sending-analytics)।)  

लेकिन `/api/register` POST रिक्वेस्ट फ़ॉर्म के _दिखने_ की वजह से नहीं होती। आप यह रिक्वेस्ट केवल एक ख़ास समय पर भेजना चाहते हैं: जब यूज़र बटन दबाए। यह केवल _उस विशेष interaction_ पर होना चाहिए। दूसरे Effect को हटा दें और उस POST रिक्वेस्ट को event handler में ले जाएँ:

```js {12-13}
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic runs because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ Good: Event-specific logic is in the event handler
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```

जब आप यह तय करते हैं कि किसी logic को event handler में डालना है या किसी Effect में, तो मुख्य सवाल यह है कि यह यूज़र के नज़रिए से _किस तरह का logic_ है। अगर यह logic किसी विशेष interaction के कारण है, तो इसे event handler में रखें। अगर यह इसलिए है क्योंकि यूज़र ने स्क्रीन पर कौम्पोनॅन्ट _देखा_, तो इसे Effect में रखें।  

### computations की चेन {/*chains-of-computations*/}

कभी-कभी आपको यह करने का मन हो सकता है कि कई Effects को चेन करें, जिनमें से हर एक state को किसी दूसरी state के आधार पर adjust करता है:

```js {7-29}
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    alert('Good game!');
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    } else {
      setCard(nextCard);
    }
  }

  // ...
```

इस कोड में दो समस्याएँ हैं।  

पहली समस्या यह है कि यह बहुत अक्षम है: कौम्पोनॅन्ट (और उसके children) को चेन में हर `set` कॉल के बीच दोबारा render करना पड़ता है। ऊपर के उदाहरण में, सबसे बुरी स्थिति में (`setCard` → render → `setGoldCardCount` → render → `setRound` → render → `setIsGameOver` → render) पेड़ (tree) में नीचे तीन अनावश्यक re-render होते हैं।  

दूसरी समस्या यह है कि भले ही यह धीमा न हो, लेकिन जैसे-जैसे आपका कोड evolve होता है, आप ऐसे मामलों में फँसेंगे जहाँ आपकी लिखी हुई "चेन" नई ज़रूरतों को पूरा नहीं करेगी। कल्पना करें कि आप गेम मूव्स के इतिहास को step-through करने का तरीका जोड़ रहे हैं। आप ऐसा हर state वेरिएबल को अतीत के किसी मान से अपडेट करके करेंगे। हालाँकि, `card` state को अतीत के किसी मान पर सेट करने से Effect चेन फिर से trigger हो जाएगी और आप जो डेटा दिखा रहे हैं वह बदल जाएगा। ऐसा कोड अक्सर rigid और fragile होता है।  

इस स्थिति में, बेहतर है कि जो कुछ भी आप कर सकते हैं, उसे rendering के दौरान कैलकुलेट करें और state को event handler में adjust करें:

```js {6-7,14-26}
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ Calculate what you can during rendering
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ Calculate all the next state in the event handler
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good game!');
        }
      }
    }
  }

  // ...
```

यह काफ़ी अधिक कुशल है। साथ ही, अगर आप गेम का इतिहास देखने का तरीका लागू करते हैं, तो अब आप हर state वेरिएबल को अतीत के किसी move पर सेट कर पाएँगे बिना उस Effect चेन को trigger किए जो बाकी सभी मानों को adjust करती है। अगर आपको कई event handlers के बीच logic को दोबारा इस्तेमाल करना है, तो आप [एक फ़ंक्शन निकाल सकते हैं](#sharing-logic-between-event-handlers) और उसे उन handlers से कॉल कर सकते हैं।  

याद रखें कि event handlers के अंदर, [state एक snapshot की तरह व्यवहार करती है।](/learn/state-as-a-snapshot) उदाहरण के लिए, भले ही आप `setRound(round + 1)` कॉल कर लें, `round` वेरिएबल उस समय का मान दिखाएगा जब यूज़र ने बटन क्लिक किया था। अगर आपको गणनाओं के लिए अगला मान इस्तेमाल करना है, तो उसे manually परिभाषित करें जैसे `const nextRound = round + 1`।  

कुछ मामलों में, आप अगली state को सीधे event handler में *कैलकुलेट नहीं कर सकते*। उदाहरण के लिए, मान लीजिए आपके पास एक फ़ॉर्म है जिसमें कई dropdowns हैं, और अगले dropdown के options पिछले dropdown के चुने हुए मान पर निर्भर करते हैं। तब Effects की एक चेन उचित है क्योंकि आप नेटवर्क के साथ सिंक्रोनाइज़ कर रहे हैं।  

### एप्लिकेशन को initialize करना {/*initializing-the-application*/}

कुछ logic केवल एक बार चलना चाहिए जब एप्प लोड होती है।  

आपका मन हो सकता है कि इसे किसी Effect में सबसे ऊपर वाले कौम्पोनॅन्ट में डाल दें:

```js {2-6}
function App() {
  // 🔴 Avoid: Effects with logic that should only ever run once
  useEffect(() => {
    loadDataFromLocalStorage();
    checkAuthToken();
  }, []);
  // ...
}
```

हालाँकि, आप जल्द ही पाएंगे कि यह [डेवलपमेंट में दो बार चलता है।](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development) इससे समस्याएँ हो सकती हैं—उदाहरण के लिए, शायद यह ऑथेंटिकेशन टोकन को अमान्य कर देता है क्योंकि फ़ंक्शन को दो बार कॉल किए जाने के लिए डिज़ाइन नहीं किया गया था। आम तौर पर, आपके कौम्पोनॅन्ट्स को रीमाउंट होने के लिए रेजिलिएंट होना चाहिए। इसमें आपका टॉप-लेवल `App` कौम्पोनॅन्ट भी शामिल है।

हालाँकि प्रैक्टिस में प्रोडक्शन में यह कभी रीमाउंट नहीं हो सकता है, सभी कौम्पोनॅन्ट्स में एक ही कंस्ट्रेंट्स को फॉलो करने से कोड को मूव और रीयूज़ करना आसान हो जाता है। अगर कुछ लॉजिक को *कॉम्पोनॅन्ट माउंट पर एक बार* के बजाय *ऐप लोड पर एक बार* चलना ज़रूरी है, तो यह ट्रैक करने के लिए एक टॉप-लेवल वेरिएबल जोड़ें कि क्या यह पहले ही एक्सेक्यूट हो चुका है:

```js {1,5-6,10}
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ Only runs once per app load
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}
```

आप इसे मॉड्यूल इनिशियलाइज़ेशन के दौरान और ऐप के रेंडर होने से पहले भी चला सकते हैं:

```js {1,5}
if (typeof window !== 'undefined') { // Check if we're running in the browser.
   // ✅ Only runs once per app load
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```

टॉप लेवल का कोड एक बार चलता है जब आपका कौम्पोनॅन्ट इम्पोर्ट किया जाता है—भले ही वह रेंडर न हो पाए। मनमाने कौम्पोनॅन्ट्स को इम्पोर्ट करते समय स्लोडाउन या आश्चर्यजनक व्यवहार से बचने के लिए, इस पैटर्न का अत्यधिक उपयोग न करें। ऐप-वाइड इनिशियलाइज़ेशन लॉजिक को रूट कौम्पोनॅन्ट मॉड्यूल्स जैसे `App.js` में या अपनी एप्लिकेशन के एंट्री पॉइंट में रखें।

### पैरेंट कौम्पोनॅन्ट्स को state बदलावों के बारे में सूचित करना {/*notifying-parent-components-about-state-changes*/}

मान लीजिए आप एक `Toggle` कौम्पोनॅन्ट लिख रहे हैं जिसमें एक आंतरिक `isOn` state है जो `true` या `false` हो सकती है। इसे टॉगल करने के कुछ अलग-अलग तरीके हैं (क्लिक करके या ड्रैग करके)। आप चाहते हैं कि जब भी `Toggle` की आंतरिक state बदले, पैरेंट कौम्पोनॅन्ट को सूचित करें, इसलिए आप एक `onChange` इवेंट एक्सपोज़ करते हैं और इसे एक Effect से कॉल करते हैं:

```js {4-7}
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 Avoid: The onChange handler runs too late
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
}
```

पहले की तरह, यह आदर्श नहीं है। `Toggle` पहले अपनी state अपडेट करता है, और React स्क्रीन अपडेट करता है। फिर React Effect को चलाता है, जो पैरेंट कौम्पोनॅन्ट से पास की गई `onChange` फ़ंक्शन को कॉल करता है। अब पैरेंट कौम्पोनॅन्ट अपनी खुद की state अपडेट करेगा, जिससे एक और रेंडर पास शुरू होगा। एक ही पास में सब कुछ करना बेहतर होगा।

Effect को डिलीट करें और इसके बजाय *दोनों* कौम्पोनॅन्ट्स की state को एक ही इवेंट हैंडलर के भीतर अपडेट करें:

```js {5-7,11,16,18}
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ Good: Perform all updates during the event that caused them
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}
```

इस एप्रोच के साथ, `Toggle` कौम्पोनॅन्ट और उसका पैरेंट कौम्पोनॅन्ट दोनों इवेंट के दौरान अपनी state अपडेट करते हैं। React अलग-अलग कौम्पोनॅन्ट्स से अपडेट्स को [एक साथ बैच करता है](/learn/queueing-a-series-of-state-updates), इसलिए सिर्फ़ एक ही रेंडर पास होगा।

आप शायद state को पूरी तरह से हटा भी सकते हैं, और इसके बजाय `isOn` को पैरेंट कौम्पोनॅन्ट से प्राप्त कर सकते हैं:

```js {1,2}
// ✅ Also good: the component is fully controlled by its parent
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}
```

["स्टेट को ऊपर उठाना"](/learn/sharing-state-between-components) पैरेंट कौम्पोनॅन्ट को पैरेंट की अपनी state को टॉगल करके `Toggle` पर पूरा कंट्रोल देता है। इसका मतलब है कि पैरेंट कौम्पोनॅन्ट में अधिक लॉजिक होगी, लेकिन कुल मिलाकर कम state का ध्यान रखना होगा। जब भी आप दो अलग-अलग state वेरिएबल्स को सिंक्रोनाइज़ रखने की कोशिश करें, तो state को ऊपर उठाने का प्रयास करें!

### पैरेंट को डेटा पास करना {/*passing-data-to-the-parent*/}

यह `Child` कौम्पोनॅन्ट कुछ डेटा फ़ेच करता है और फिर इसे एक Effect में `Parent` कौम्पोनॅन्ट को पास करता है:

```js {9-14}
function Parent() {
  const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();
  // 🔴 Avoid: Passing data to the parent in an Effect
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  // ...
}
```
React में, डेटा पैरेंट कौम्पोनॅन्ट्स से उनके चिल्ड्रन की ओर फ्लो होता है। जब आप स्क्रीन पर कुछ गलत देखते हैं, तो आप कौम्पोनॅन्ट चेन में ऊपर जाकर यह पता लगा सकते हैं कि जानकारी कहाँ से आ रही है, जब तक आपको वह कौम्पोनॅन्ट नहीं मिल जाता जो गलत prop पास कर रहा है या जिसकी state गलत है। जब चाइल्ड कौम्पोनॅन्ट्स Effects में अपने पैरेंट कौम्पोनॅन्ट्स की state अपडेट करते हैं, तो डेटा फ्लो ट्रेस करना बहुत मुश्किल हो जाता है। चूँकि चाइल्ड और पैरेंट दोनों को एक ही डेटा चाहिए, पैरेंट कौम्पोनॅन्ट को वह डेटा फ़ेच करने दें, और उसे चाइल्ड को *नीचे पास करें*:

```js {4-5}
function Parent() {
  const data = useSomeAPI();
  // ...
  // ✅ Good: Passing data down to the child
  return <Child data={data} />;
}

function Child({ data }) {
  // ...
}
```

यह सरल है और डेटा फ्लो को प्रिडिक्टेबल बनाए रखता है: डेटा पैरेंट से चाइल्ड की ओर नीचे फ्लो होता है।

### एक एक्सटर्नल स्टोर को सब्सक्राइब करना {/*subscribing-to-an-external-store*/}

कभी-कभी, आपके कौम्पोनॅन्ट्स को React state के बाहर के कुछ डेटा को सब्सक्राइब करने की आवश्यकता हो सकती है। यह डेटा किसी थर्ड-पार्टी लाइब्रेरी या बिल्ट-इन ब्राउज़र API से हो सकता है। चूँकि यह डेटा React की जानकारी के बिना बदल सकता है, आपको मैन्युअल रूप से अपने कौम्पोनॅन्ट्स को इसे सब्सक्राइब करना होगा। यह अक्सर एक Effect के साथ किया जाता है, उदाहरण के लिए:

```js {2-17}
function useOnlineStatus() {
  // Not ideal: Manual store subscription in an Effect
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

यहाँ, कौम्पोनॅन्ट एक एक्सटर्नल डेटा स्टोर को सब्सक्राइब करता है (इस मामले में, ब्राउज़र `navigator.onLine` API)। चूँकि यह API सर्वर पर मौजूद नहीं है (इसलिए इसका उपयोग इनिशियल HTML के लिए नहीं किया जा सकता), शुरू में state को `true` पर सेट किया गया है। जब भी ब्राउज़र में उस डेटा स्टोर का वैल्यू बदलता है, कौम्पोनॅन्ट अपनी state अपडेट करता है।

हालाँकि इसके लिए Effects का उपयोग करना आम बात है, React के पास एक एक्सटर्नल स्टोर को सब्सक्राइब करने के लिए एक विशेष रूप से बनाया गया हुक है जिसे प्राथमिकता दी जाती है। Effect को डिलीट करें और इसे [`useSyncExternalStore`](/reference/react/useSyncExternalStore) के कॉल से बदलें:

```js {11-16}
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useOnlineStatus() {
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  );
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

यह तरीका एक Effect के साथ mutable डेटा को React state में मैन्युअल रूप से सिंक करने की तुलना में कम एरर-प्रोन है। आम तौर पर, आप ऊपर दिए गए `useOnlineStatus()` की तरह एक कस्टम हुक लिखेंगे ताकि आपको अलग-अलग कौम्पोनॅन्ट्स में इस कोड को दोहराने की ज़रूरत न पड़े। [React कौम्पोनॅन्ट्स से एक्सटर्नल स्टोर्स को सब्सक्राइब करने के बारे में और पढ़ें।](/reference/react/useSyncExternalStore)

### डेटा फ़ेच करना {/*fetching-data*/}

बहुत सारे ऐप्स डेटा फ़ेचिंग शुरू करने के लिए Effects का उपयोग करते हैं। इस तरह एक डेटा फ़ेचिंग Effect लिखना काफी आम है:

```js {5-10}
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 Avoid: Fetching without cleanup logic
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

आपको इस फ़ेच को एक इवेंट हैंडलर में ले जाने की *ज़रूरत नहीं* है।

यह पहले के उदाहरणों के विपरीत लग सकता है जहाँ आपको लॉजिक को इवेंट हैंडलर में डालना था! हालाँकि, विचार करें कि *टाइपिंग इवेंट* फ़ेच करने का मुख्य कारण नहीं है। सर्च इनपुट्स अक्सर URL से प्रीपॉप्युलेटेड होते हैं, और यूज़र बैक और फॉरवर्ड नेविगेट कर सकता है बिना इनपुट को छुए।

इससे कोई फर्क नहीं पड़ता कि `page` और `query` कहाँ से आते हैं। जब तक यह कौम्पोनॅन्ट विजिबल है, आप `results` को करंट `page` और `query` के लिए नेटवर्क से डेटा के साथ [सिंक्रोनाइज़्ड](/learn/synchronizing-with-effects) रखना चाहते हैं। इसीलिए यह एक Effect है।

हालाँकि, ऊपर दिए गए कोड में एक बग है। कल्पना करें कि आप तेजी से `"hello"` टाइप करते हैं। फिर `query` `"h"`, से `"he"`, `"hel"`, `"hell"`, और `"hello"` में बदल जाएगी। यह अलग-अलग फ़ेच शुरू करेगा, लेकिन कोई गारंटी नहीं है कि रिस्पॉन्स किस क्रम में आएंगे। उदाहरण के लिए, `"hell"` रिस्पॉन्स `"hello"` रिस्पॉन्स के *बाद* आ सकता है। चूंकि यह `setResults()` को आखिरी में कॉल करेगा, आप गलत सर्च रिजल्ट्स दिखा रहे होंगे। इसे ["रेस कंडीशन"](https://en.wikipedia.org/wiki/Race_condition) कहा जाता है: दो अलग-अलग रिक्वेस्ट्स ने एक-दूसरे के खिलाफ "रेस" की और आपके अपेक्षित क्रम से अलग क्रम में आईं।

**रेस कंडीशन को ठीक करने के लिए, आपको स्टेल रिस्पॉन्स को इग्नोर करने के लिए [एक क्लीनअप फ़ंक्शन जोड़ना](/learn/synchronizing-with-effects#fetching-data) होगा:**

```js {5,7,9,11-13}
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

यह सुनिश्चित करता है कि जब आपका Effect डेटा फ़ेच करता है, तो आखिरी रिक्वेस्ट वाले को छोड़कर बाकी सभी रिस्पॉन्स इग्नोर कर दिए जाएंगे।

रेस कंडीशन को हैंडल करना डेटा फ़ेचिंग इम्प्लीमेंट करने की एकमात्र कठिनाई नहीं है। आप कैश्ड रिस्पॉन्स के बारे में भी सोचना चाहेंगे (ताकि यूज़र बैक पर क्लिक करे और पिछली स्क्रीन तुरंत देख सके), सर्वर पर डेटा कैसे फ़ेच करें (ताकि इनिशियल सर्वर-रेंडर की गई HTML में फ़ेच किया गया कंटेंट हो स्पिनर के बजाय), और नेटवर्क वॉटरफॉल से कैसे बचें (ताकि एक चाइल्ड हर पैरेंट के इंतज़ार के बिना डेटा फ़ेच कर सके)।

**ये इश्यूज़ किसी भी UI लाइब्रेरी पर लागू होते हैं, सिर्फ़ React पर नहीं। इन्हें सॉल्व करना आसान नहीं है, इसीलिए मॉडर्न [फ़्रेमवर्क्स](/learn/start-a-new-react-project#production-grade-react-frameworks) Effects में डेटा फ़ेच करने की तुलना में अधिक एफिशिएंट बिल्ट-इन डेटा फ़ेचिंग मैकेनिज्म प्रदान करते हैं।**

अगर आप कोई फ़्रेमवर्क नहीं इस्तेमाल करते (और अपना खुद का बनाना नहीं चाहते) लेकिन Effects से डेटा फ़ेचिंग को अधिक एर्गोनॉमिक बनाना चाहते हैं, तो अपनी फ़ेचिंग लॉजिक को इस उदाहरण की तरह एक कस्टम हुक में एक्सट्रैक्ट करने पर विचार करें:

```js {4}
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
```

आप शायद एरर हैंडलिंग के लिए और यह ट्रैक करने के लिए कि कंटेंट लोड हो रहा है या नहीं, कुछ लॉजिक भी जोड़ना चाहेंगे। आप इस तरह का हुक खुद बना सकते हैं या React इकोसिस्टम में पहले से उपलब्ध कई सॉल्यूशन्स में से एक का उपयोग कर सकते हैं। **हालाँकि अकेले यह किसी फ़्रेमवर्क के बिल्ट-इन डेटा फ़ेचिंग मैकेनिज्म का उपयोग करने जितना एफिशिएंट नहीं होगा, लेकिन डेटा फ़ेचिंग लॉजिक को एक कस्टम हुक में ले जाना बाद में एक एफिशिएंट डेटा फ़ेचिंग स्ट्रैटेजी को अपनाना आसान बना देगा।**

आम तौर पर, जब भी आपको Effects लिखने का सहारा लेना पड़े, इस बात पर नज़र रखें कि कब आप किसी फंक्शनैलिटी के एक टुकड़े को ऊपर दिए गए `useData` जैसे अधिक डिक्लेरेटिव और पर्पस-बिल्ट API वाले कस्टम हुक में एक्सट्रैक्ट कर सकते हैं। आपके कौम्पोनॅन्ट्स में जितने कम रॉ `useEffect` कॉल होंगे, आपको अपनी एप्लिकेशन को मेंटेन करना उतना ही आसान लगेगा।

<Recap>

- अगर आप रेंडर के दौरान कुछ कैलकुलेट कर सकते हैं, तो आपको Effect की ज़रूरत नहीं है।
- महंगी गणनाओं को कैश करने के लिए, `useEffect` के बजाय `useMemo` जोड़ें।
- पूरे कौम्पोनॅन्ट ट्री की state रीसेट करने के लिए, उसे एक अलग `key` पास करें।
- किसी prop बदलाव के जवाब में किसी खास state को रीसेट करने के लिए, उसे रेंडरिंग के दौरान सेट करें।
- कोड जो कौम्पोनॅन्ट के *डिस्प्ले* होने के कारण चलता है, Effects में होना चाहिए, बाकी इवेंट्स में होना चाहिए।
- अगर आपको कई कौम्पोनॅन्ट्स की state अपडेट करनी है, तो इसे एक ही इवेंट के दौरान करना बेहतर है।
- जब भी आप अलग-अलग कौम्पोनॅन्ट्स में state वेरिएबल्स को सिंक्रोनाइज़ करने की कोशिश करें, state को ऊपर उठाने पर विचार करें।
- आप Effects के साथ डेटा फ़ेच कर सकते हैं, लेकिन रेस कंडीशन से बचने के लिए आपको क्लीनअप इम्प्लीमेंट करना होगा।

</Recap>

<Challenges>

#### बिना Effects के डेटा ट्रांसफ़ॉर्म करें {/*transform-data-without-effects*/}

नीचे दिया गया `TodoList` टोडो की एक सूची दिखाता है। जब "सिर्फ़ एक्टिव टोडो दिखाएँ" चेकबॉक्स टिक किया जाता है, तो कम्प्लीट किए गए टोडो सूची में नहीं दिखाए जाते। कोई फर्क नहीं पड़ता कि कौन से टोडो विजिबल हैं, फूटर उन टोडो की गिनती दिखाता है जो अभी तक कम्प्लीट नहीं हुए हैं।

सभी अनावश्यक state और Effects को हटाकर इस कौम्पोनॅन्ट को सरल बनाएँ।

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [activeTodos, setActiveTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    setActiveTodos(todos.filter(todo => !todo.completed));
  }, [todos]);

  useEffect(() => {
    setVisibleTodos(showActive ? activeTodos : todos);
  }, [showActive, todos, activeTodos]);

  useEffect(() => {
    setFooter(
      <footer>
        {activeTodos.length} todos left
      </footer>
    );
  }, [activeTodos]);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      {footer}
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

<Hint>

अगर आप रेंडरिंग के दौरान कुछ कैलकुलेट कर सकते हैं, तो आपको state या उसे अपडेट करने वाले Effect की ज़रूरत नहीं है।

</Hint>

<Solution>

इस उदाहरण में केवल दो आवश्यक state हैं: `todos` की सूची और `showActive` state वेरिएबल जो दर्शाता है कि चेकबॉक्स टिक किया गया है या नहीं। बाकी सभी state वेरिएबल [अनावश्यक](/learn/choosing-the-state-structure#avoid-redundant-state) हैं और उन्हें रेंडरिंग के दौरान कैलकुलेट किया जा सकता है। इसमें `footer` भी शामिल है जिसे आप सीधे आसपास के JSX में ले जा सकते हैं।

आपका परिणाम अंत में इस तरह दिखना चाहिए:

<Sandpack>

```js
import { useState } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      <footer>
        {activeTodos.length} todos left
      </footer>
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

</Solution>

#### बिना Effects के कैलकुलेशन कैश करें {/*cache-a-calculation-without-effects*/}

इस उदाहरण में, टोडो को फ़िल्टर करना एक अलग फ़ंक्शन `getVisibleTodos()` में निकाला गया है। इस फ़ंक्शन के अंदर एक `console.log()` कॉल है जो आपको यह नोटिस करने में मदद करती है कि यह कब कॉल हो रहा है। "सिर्फ़ एक्टिव टोडो दिखाएँ" को टॉगल करें और नोटिस करें कि इससे `getVisibleTodos()` दोबारा चलता है। यह अपेक्षित है क्योंकि जब आप डिस्प्ले करने के लिए टोडो को टॉगल करते हैं तो विजिबल टोडो बदल जाते हैं।

आपका कार्य `TodoList` कौम्पोनॅन्ट में `visibleTodos` सूची की पुनर्गणना करने वाले Effect को हटाना है। हालाँकि, आपको यह सुनिश्चित करना होगा कि जब आप इनपुट में टाइप करते हैं तो `getVisibleTodos()` *नहीं* दोबारा चले (और इसलिए कोई लॉग प्रिंट न करे)।

<Hint>

एक समाधान विजिबल टोडो को कैश करने के लिए एक `useMemo` कॉल जोड़ना है। एक और, कम स्पष्ट समाधान भी है।

</Hint>

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');
  const [visibleTodos, setVisibleTodos] = useState([]);

  useEffect(() => {
    setVisibleTodos(getVisibleTodos(todos, showActive));
  }, [todos, showActive]);

  function handleAddClick() {
    setText('');
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() was called ${++calls} times`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

<Solution>

state वेरिएबल और Effect को हटाएँ, और इसके बजाय `getVisibleTodos()` को कॉल करने के रिजल्ट को कैश करने के लिए एक `useMemo` कॉल जोड़ें:

<Sandpack>

```js
import { useState, useMemo } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');
  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, showActive),
    [todos, showActive]
  );

  function handleAddClick() {
    setText('');
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() was called ${++calls} times`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

इस बदलाव के साथ, `getVisibleTodos()` केवल तभी कॉल होगा जब `todos` या `showActive` बदलेंगे। इनपुट में टाइप करने से केवल `text` state वेरिएबल बदलता है, इसलिए यह `getVisibleTodos()` को कॉल ट्रिगर नहीं करता।

एक और समाधान भी है जिसे `useMemo` की आवश्यकता नहीं है। चूँकि `text` state वेरिएबल संभवतः टोडो की सूची को प्रभावित नहीं कर सकता, आप `NewTodo` फॉर्म को एक अलग कौम्पोनॅन्ट में निकाल सकते हैं, और `text` state वेरिएबल को उसके अंदर ले जा सकते हैं:

<Sandpack>

```js
import { useState, useMemo } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const visibleTodos = getVisibleTodos(todos, showActive);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() was called ${++calls} times`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

यह तरीका भी आवश्यकताओं को पूरा करता है। जब आप इनपुट में टाइप करते हैं, तो केवल `text` state वेरिएबल अपडेट होता है। चूँकि `text` state वेरिएबल चाइल्ड `NewTodo` कौम्पोनॅन्ट में है, पैरेंट `TodoList` कौम्पोनॅन्ट री-रेंडर नहीं होगा। इसीलिए जब आप टाइप करते हैं तो `getVisibleTodos()` कॉल नहीं होता। (यह अभी भी कॉल होगा अगर `TodoList` किसी अन्य कारण से री-रेंडर होता है।)

</Solution>

#### बिना Effects के state रीसेट करें {/*reset-state-without-effects*/}

यह `EditContact` कौम्पोनॅन्ट `{ id, name, email }` जैसे आकार की एक contact ऑब्जेक्ट को `savedContact` prop के रूप में प्राप्त करता है। नाम और ईमेल इनपुट फ़ील्ड्स को एडिट करने का प्रयास करें। जब आप सेव दबाते हैं, तो फॉर्म के ऊपर वाला contact का बटन एडिट किए गए नाम पर अपडेट हो जाता है। जब आप रीसेट दबाते हैं, तो फॉर्म में कोई भी पेंडिंग चेंज डिस्कार्ड हो जाती हैं। इस UI के साथ खेलें ताकि आपको इसका अंदाजा हो जाए।

जब आप ऊपर के बटन्स के साथ कोई contact सिलेक्ट करते हैं, तो फॉर्म उस contact के डिटेल्स को रिफ्लेक्ट करने के लिए रीसेट हो जाता है। यह `EditContact.js` के अंदर एक Effect के साथ किया जाता है। इस Effect को हटाएँ। जब `savedContact.id` बदलता है तो फॉर्म को रीसेट करने का कोई दूसरा तरीका ढूंढें।

<Sandpack>

```js src/App.js hidden
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        savedContact={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js hidden
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js active
import { useState, useEffect } from 'react';

export default function EditContact({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);

  useEffect(() => {
    setName(savedContact.name);
    setEmail(savedContact.email);
  }, [savedContact]);

  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: savedContact.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(savedContact.name);
        setEmail(savedContact.email);
      }}>
        Reset
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<Hint>

अच्छा होता अगर कोई तरीका होता React को बताने का कि जब `savedContact.id` अलग हो, तो `EditContact` फॉर्म conceptually _एक अलग contact का फॉर्म_ है और उसे state प्रिज़र्व नहीं करनी चाहिए। क्या आपको ऐसा कोई तरीका याद आता है?

</Hint>

<Solution>

`EditContact` कौम्पोनॅन्ट को दो भागों में बाँटें। सारी फॉर्म state को भीतरी `EditForm` कौम्पोनॅन्ट में ले जाएँ। बाहरी `EditContact` कौम्पोनॅन्ट को एक्सपोर्ट करें, और उसे भीतरी `EditForm` कौम्पोनॅन्ट को `savedContact.id` को `key` के रूप में पास करने दें। नतीजतन, जब भी आप कोई अलग contact सिलेक्ट करते हैं, तो भीतरी `EditForm` कौम्पोनॅन्ट सारी फॉर्म state रीसेट कर देता है और DOM को दोबारा बनाता है।

<Sandpack>

```js src/App.js hidden
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        savedContact={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js hidden
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js active
import { useState } from 'react';

export default function EditContact(props) {
  return (
    <EditForm
      {...props}
      key={props.savedContact.id}
    />
  );
}

function EditForm({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);

  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: savedContact.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(savedContact.name);
        setEmail(savedContact.email);
      }}>
        Reset
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

</Solution>

#### बिना Effects के फॉर्म सबमिट करें {/*submit-a-form-without-effects*/}

यह `Form` कौम्पोनॅन्ट आपको एक दोस्त को मैसेज भेजने देता है। जब आप फॉर्म सबमिट करते हैं, तो `showForm` state वेरिएबल `false` पर सेट हो जाता है। यह एक Effect को ट्रिगर करता है जो `sendMessage(message)` को कॉल करता है, जो मैसेज भेजता है (आप इसे कंसोल में देख सकते हैं)। मैसेज भेजने के बाद, आपको एक "थैंक यू" डायलॉग दिखता है जिसमें "ओपन चैट" बटन होता है जो आपको वापस फॉर्म पर ले जाता है।

आपके ऐप के यूज़र्स बहुत ज़्यादा मैसेज भेज रहे हैं। चैटिंग को थोड़ा और मुश्किल बनाने के लिए, आपने फॉर्म के बजाय *पहले* "थैंक यू" डायलॉग दिखाने का फैसला किया है। `showForm` state वेरिएबल को `true` के बजाय `false` पर इनिशियलाइज़ करने के लिए बदलें। जैसे ही आप यह बदलाव करते हैं, कंसोल दिखाएगा कि एक खाली मैसेज भेजा गया था। इस लॉजिक में कुछ गड़बड़ है!

इस समस्या का मूल कारण क्या है? और आप इसे कैसे ठीक कर सकते हैं?

<Hint>

क्या मैसेज इसलिए भेजा जाना चाहिए _क्योंकि_ यूज़र ने "थैंक यू" डायलॉग देखा? या फिर यह उल्टा है?

</Hint>

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Form() {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!showForm) {
      sendMessage(message);
    }
  }, [showForm, message]);

  function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
  }

  if (!showForm) {
    return (
      <>
        <h1>Thanks for using our services!</h1>
        <button onClick={() => {
          setMessage('');
          setShowForm(true);
        }}>
          Open chat
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" disabled={message === ''}>
        Send
      </button>
    </form>
  );
}

function sendMessage(message) {
  console.log('Sending message: ' + message);
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

<Solution>

`showForm` state वेरिएबल यह निर्धारित करता है कि फॉर्म दिखाना है या "थैंक यू" डायलॉग। हालाँकि, आप मैसेज इसलिए नहीं भेज रहे हैं क्योंकि "थैंक यू" डायलॉग _डिस्प्ले_ हुआ था। आप मैसेज इसलिए भेजना चाहते हैं क्योंकि यूज़र ने _फॉर्म सबमिट किया_ है। भ्रामक Effect को डिलीट करें और `sendMessage` कॉल को `handleSubmit` इवेंट हैंडलर के अंदर ले जाएँ:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Form() {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
    sendMessage(message);
  }

  if (!showForm) {
    return (
      <>
        <h1>Thanks for using our services!</h1>
        <button onClick={() => {
          setMessage('');
          setShowForm(true);
        }}>
          Open chat
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" disabled={message === ''}>
        Send
      </button>
    </form>
  );
}

function sendMessage(message) {
  console.log('Sending message: ' + message);
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

ध्यान दें कि इस वर्जन में, सिर्फ़ _फॉर्म सबमिट करना_ (जो एक इवेंट है) मैसेज को भेजने का कारण बनता है। यह बराबर रूप से काम करता है चाहे `showForm` शुरू में `true` पर सेट हो या `false` पर। (इसे `false` पर सेट करें और नोटिस करें कि कोई अतिरिक्त कंसोल मैसेज नहीं है।)

</Solution>

</Challenges>

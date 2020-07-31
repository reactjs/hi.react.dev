---
id: hooks-custom
title: अपने खुद के Hooks का निर्माण
permalink: docs/hooks-custom.html
next: hooks-reference.html
prev: hooks-rules.html
---

React 16.8 में *Hooks* नामक एक नया फीचर ऐड हुआ है। यह आपको class का इस्तेमाल किये बिना state और अन्य React विशेषताओं का उपयोग करने देता है।

अपने खुद के Hooks का निर्माण आपको कौम्पोनॅन्ट लॉजिक को पुन: उपयोग फंक्शन में निकालने की सुविधा देता है।

जब हम [इफेक्ट Hook का उपयोग](/docs/hooks-effect.html#example-using-hooks-1) करने के बारे में सीख रहे थे, तब हमने एक चैट एप्लिकेशन से इस कौम्पोनॅन्ट को देखा जो एक संदेश प्रदर्शित करता है जो बताता है कि कोई दोस्त ऑनलाइन या ऑफलाइन है:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

अब बताते हैं कि हमारे चैट एप्लिकेशन की एक संपर्क सूची भी है, और हम हरे रंग के साथ ऑनलाइन उपयोगकर्ताओं के नाम प्रस्तुत करना चाहते हैं। हम इसी तरह के लॉजिक को अपने `FriendListItem` में कॉपी और पेस्ट कर सकते हैं लेकिन यह सही नहीं होगा:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

इसके बजाय, हम इस लॉजिक को `FriendStatus` और `FriendListItem` के बीच शेयर करना चाहते हैं।

परंपरागत रूप से React में, हमारे पास कौम्पोनॅन्ट के बीच स्टेटफुल लॉजिक शेयर करने के दो लोकप्रिय तरीके हैं: [रेंडर प्रॉप्स](/docs/render-props.html) and [higher-order कौम्पोनॅन्टस](/docs/higher-order-components.html)। अब हम इस बात पर ध्यान देंगे कि Hooks आपको आपके tree में अधिक कौम्पोनॅन्टस को ऐड करने के लिए मजबूर किए बिना कैसे समस्याओं का समाधान करते हैं।

## कस्टम Hook निकालना {#extracting-a-custom-hook}

जब हम दो JavaScript फंक्शन के बीच लॉजिक शेयर करना चाहते हैं, तब हम इसे तीसरे फंक्शन में निकालते हैं। दोनों कौम्पोनॅन्टस और Hooks फंक्शन हैं, तो यह उनके लिए भी काम करता है!

**एक कस्टम Hook एक JavaScript फ़ंक्शन है जिसका नाम "`use`" से शुरू होता है और इसे अन्य Hook कॉल करते है।** उदाहरण के लिए, `useFriendStatus` नीचे हमारा पहला कस्टम Hook है:

```js{3}
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

इसके अंदर कुछ भी नया नहीं है -- लॉजिक ऊपर के कौम्पोनॅन्ट से कॉपी किया गया है। बस एक कौम्पोनॅन्ट की तरह, केवल अपने कस्टम Hook के ऊपरी स्तर पर बिना शर्त अन्य हुक को कॉल करना सुनिश्चित करें।

एक React कौम्पोनॅन्ट के विपरीत, एक कस्टम Hook के लिए एक विशिष्ट हस्ताक्षर की आवश्यकता नहीं होती है। हम यह तय कर सकते हैं कि क्या पैरामीटर होता है, और क्या, अगर कुछ भी इसे return करना चाहिए। दूसरे शब्दों में, यह एक सामान्य फंक्शन की तरह है। इसका नाम हमेशा `use` से शुरू होना चाहिए ताकि आप एक नज़र में बता सकें कि [Hooks के नियम](/docs/hooks-rules.html) उस पर लागू हैं।

हमारे `useFriendStatus` Hook का उद्देश्य हमें मित्र की ऑनलाइन स्टेटस को सब्सक्राइब करना है। इसलिए यह एक आर्गुमेंट के रूप में `friendID` लेता है, और रिटर्न करता है कि क्या हमारा दोस्त ऑनलाइन है:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

अब देखते हैं कि हम अपने कस्टम Hook का उपयोग कैसे कर सकते हैं।

## कस्टम Hook का उपयोग {#using-a-custom-hook}

शुरुआत में, हमारा कहा गया लक्ष्य `FriendStatus` और` FriendListItem` कौम्पोनॅन्ट से डुप्लिकेट लॉजिक को हटाना था। ये दोनों कौम्पोनॅन्ट जानना चाहते हैं कि कोई दोस्त ऑनलाइन है या नहीं।

अब हमने इस लॉजिक को एक `useFriendStatus` hook में निकाला है, हम इसका *उपयोग कर सकते हैं:*

```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

**क्या यह कोड मूल उदाहरणों के बराबर है?** हाँ, यह ठीक उसी तरह से काम करता है। यदि आप बारीकी से देखते हैं, आप ध्यान देंगे कि हमने बिहेवियर में कोई बदलाव नहीं किया। हमने केवल दो फ़ंक्शन के बीच कुछ सामान्य कोड को एक अलग फ़ंक्शन में निकाला था। **कस्टम Hook React फीचर के बजाय एक कन्वेंशन है जो स्वाभाविक रूप से Hook के डिजाइन से अनुसरण करता है।**

**क्या मुझे अपने कस्टम Hook का नाम “`use`” से शुरू करना है?** कृपया कीजिए। यह कन्वेंशन बहुत महत्वपूर्ण है। इसके बिना, [rules of Hooks](/docs/hooks-rules.html) के उल्लंघन के लिए हम स्वचालित रूप से जांच नहीं कर पाएंगे क्योंकि हम यह नहीं बता सकते हैं कि किसी निश्चित फ़ंक्शन में Hooks के कॉल हैं या नहीं।

**क्या दो कौम्पोनॅन्ट एक ही Hook से state शेयर कर सकते हैं?** नहीं। कस्टम Hook *स्टेटफुल लॉजिक* का पुन: उपयोग करने के लिए एक मेकनिज़्म है (जैसे कि सदस्यता स्थापित करना और वर्तमान वैल्यू को याद रखना), लेकिन हर बार जब आप एक कस्टम Hook का उपयोग करते हैं, तो इसके अंदर के सभी स्टेट और प्रभाव पूरी तरह से अलग हो जाते हैं।

**एक कस्टम Hook को अलग-थलग अवस्था कैसे मिलती है?** प्रत्येक Hook *call* में एक पूरी तरह से आइसोलेटेड state है। क्योंकि हम`useFriendStatus` सीधे कॉल करें, React के दृष्टिकोण से हमारे कौम्पोनॅन्ट सिर्फ `useState` and `useEffect` को कॉल करते हैं। और जैसे हमने[सीखा](/docs/hooks-state.html#tip-using-multiple-state-variables) [पहले](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns), हम एक कौम्पोनॅन्ट में कई बार `useState` and `useEffect` कॉल कर सकते हैं, और वे पूरी तरह से स्वतंत्र होंगे।

### टिप: Hook के बीच जानकारी पास करें {#tip-pass-information-between-hooks}

चूंकि Hook फंक्शन हैं, हम उनके बीच जानकारी दे सकते हैं।

इसे समझने के लिए, हम अपने काल्पनिक चैट उदाहरण से एक और कौम्पोनॅन्ट का उपयोग करेंगे। यह एक चैट संदेश प्राप्तकर्ता पिकर है जो प्रदर्शित करता है कि वर्तमान में चुना गया दोस्त ऑनलाइन है:

```js{8-9,13}
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```
हम चुने गए friend ID को `recipientID` state वेरिएबल में रखते हैं, और इसे अपडेट करेंगे यदि यूजर `<select>` पिकर में एक अलग दोस्त चुनता है।

क्योंकि `useState` Hook कॉल हमें` recipientID` state वेरिएबल का नवीनतम वैल्यू देता है, इसीलिए हम इसे अपने कस्टम `useFriendStatus` हुक में एक आर्गुमेंट के रूप में पास कर सकते हैं:

```js
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

इससे हमें पता चलता है कि *वर्तमान में चयनित* मित्र ऑनलाइन है या नहीं। अगर हम एक अलग दोस्त चुनें और `recipientID` state variable अद्यतन करें, तो हमारा `useFriendStatus` Hook पहले से चयनित दोस्त से सदस्यता समाप्त कर देगा, और नव चयनित एक की स्टेटस के लिए सदस्यता लें।

## `useYourImagination()` {#useyourimagination}

कस्टम Hook शेयर करने के लचीलेपन की पेशकश करते हैं जो पहले React कौम्पोनॅन्ट में संभव नहीं था| आप कस्टम Hook लिख सकते हैं जो फॉर्म हैंडलिंग, एनीमेशन, डिक्लेक्टिव सब्सक्रिप्शन, टाइमर्स जैसे कई उपयोग के मामलों को कवर करते हैं, और शायद कई और भी जिन्हें हमने नहीं माना है। क्या अधिक है, आप Hook का निर्माण कर सकते हैं जो कि React की अंतर्निहित सुविधाओं के रूप में उपयोग करना आसान है।

बहुत जल्दी abstraction जोड़ने का विरोध करने की कोशिश करें। अब वह कार्य कौम्पोनॅन्ट अधिक कर सकता है, यह संभावना है कि आपके कोडबेस में औसत फ़ंक्शन कौम्पोनॅन्ट लंबा हो जाएगा। वह सामान्य है -- ऐसा महसूस न करें कि आपको तुरंत इसे Hook में विभाजित *करना है*| लेकिन हम आपको उन मामलों को भी शुरू करने के लिए प्रोत्साहित करते हैं जहां एक कस्टम Hook एक सरल इंटरफ़ेस के पीछे जटिल लॉजिक को छिपा सकता है, या किसी गन्दे कौम्पोनॅन्ट की मदद न करें।

हो सकता है कि आपके पास एक जटिल कौम्पोनॅन्ट है जिसमें बहुत सारे लोकल state शामिल हैं जो एक अनौपचारिक तरीके से प्रबंधित होते हैं। `useState` अद्यतन लॉजिक को किसी भी आसान केंद्रीकृत नहीं करता है इसलिए आप इसे [Redux](https://redux.js.org/) reducer रूप में लिखना पसंद कर सकते हैं:

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```

Reducers विलगता में परीक्षण करने के लिए बहुत सुविधाजनक हैं, और जटिल अद्यतन लॉजिक व्यक्त करने के लिए स्केलेबल है। यदि आवश्यक हो तो आप उन्हें छोटे reducer में अलग कर सकते हैं। हालाँकि, आप React लोकल state का उपयोग करने के लाभों का आनंद ले सकते हैं, या किसी अन्य लाइब्रेरी को स्थापित नहीं करना चाह सकते हैं।

तो क्या हुआ अगर हम एक `useReducer` hook लिख सकते हैं, जो हमें एक reducer के साथ हमारे कौम्पोनॅन्ट के *लोकल* state का प्रबंधन करने देता है? इसका एक सरलीकृत उदाहरण इस तरह दिख सकता है:

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```
अब हम इसे अपने कौम्पोनॅन्ट में उपयोग कर सकते हैं, और reducer को अपने state प्रबंधन को चलाने दें:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

एक जटिल कौम्पोनॅन्ट में एक reducer के साथ लोकल state का प्रबंधन करने की आवश्यकता काफी सामान्य है जो कि हमने React में `useReducer` Hook का निर्माण किया है। आप इसे अन्य अंतर्निहित Hook के साथ इसमें मिलेंगे [Hooks API संदर्भ](/docs/hooks-reference.html)|

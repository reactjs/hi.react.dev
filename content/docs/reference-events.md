---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

यह निर्देशिका `SyntheticEvent` आवरण को निर्देशित करता है जो React इवेंट सिस्टम का एक हिस्सा है। अधिक जानने के लिए [Handling Events](/docs/handling-events.html) गाइड देखें।

## ओवरव्यू {#overview}

<<<<<<< HEAD
आपके ईवेंट हैंडलर को `SyntheticEvent` के उदाहरण के तौर पर, ब्राउज़र के नेटिव ईवेंट के चारों ओर एक क्रॉस-ब्राउज़र रैपर दिया जाएगा। यह ब्राउज़र के नेटिव ईवेंट के समान है, जिसमें `stopPropagation()` और `preventDefault()` शामिल हैं, पर यह इवेंट्स सभी ब्राउज़रों में समान रूप से काम करते हैं।

यदि किसी कारण से आप पाते हैं कि आपको अंतर्निहित ब्राउज़र इवेंट की आवश्यकता है, तो इसे प्राप्त करने के लिए `nativeEvent` एट्रिब्यूट का उपयोग करें। प्रत्येक `SyntheticEvent` ऑब्जेक्ट में निम्न विशेषताएँ होती हैं।
=======
Your event handlers will be passed instances of `SyntheticEvent`, a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. 

If you find that you need the underlying browser event for some reason, simply use the `nativeEvent` attribute to get it. The synthetic events are different from, and do not map directly to, the browser's native events. For example in `onMouseLeave` `event.nativeEvent` will point to a `mouseout` event. The specific mapping is not part of the public API and may change at any time. Every `SyntheticEvent` object has the following attributes:
>>>>>>> 657658aa1f19c65e35055ddca4452c98d569552f

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```

> ध्यान दें:
>
> v0.14 से, किसी इवेंट हैंडलर द्वारा `false` लौटाने पर event propagation नहीं रुकेगा। इसके बजाय, `e.stopPropagation()` या `e.preventDefault()` को ज़रूरत के अनुसार मैन्युअल रूप से इस्तेमाल करना चाहिए।

### इवेंट इकट्ठा करना {#event-pooling}

`SyntheticEvent` को इकट्ठा किया जाता है। इसका मतलब यह है कि `SyntheticEvent` ऑब्जेक्ट का पुन: उपयोग किया जाएगा और ईवेंट कॉलबैक लागू होने के बाद सभी प्रॉपर्टीज को nullify कर दिया जाता है।
यह परफॉरमेंस कारणों से है।
जैसे की, हम ईवेंट को asynchronous तरीके से एक्सेस नहीं कर सकते हैं।

```javascript
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> ध्यान दें:
>
> यदि आप asynchronous तरीके से इवेंट के प्रॉपर्टीज का उपयोग करना चाहते हैं, तो आपको इवेंट पर `event.persist()` को कॉल करना चाहिए, जो पूल से सिंथेटिक इवेंट को हटा देगा और यूजर कोड द्वारा इवेंट के रेफरेन्सेस को बनाये रखेगा।

## समर्थित इवेंट्स {#supported-events}

React नोर्मलिज़ेस इवेंट्स, ताकि उनके विभिन्न ब्राउज़रों में सुसंगत गुण हों।

नीचे दिए गए इवेंट हैंडलर्स को bubbling फेज में एक इवेंट द्वारा ट्रिगर किया गया है। कैप्चर फेज में कोई ईवेंट हैंडलर रजिस्टर करने के लिए, ईवेंट नाम में `Capture` जोड़ें, उदाहरण के लिए, `onClick` का उपयोग करने के बजाय, कैप्चर फेज में click इवेंट को संभालने के लिए `onClickCapture` का उपयोग होता है।

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Generic Events](#generic-events)
- [Mouse Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Selection Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [Image Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Other Events](#other-events)

* * *

## संदर्भ {#reference}

### क्लिपबोर्ड इवेंट्स {#clipboard-events}

इवेंट्स के नाम:

```
onCopy onCut onPaste
```

प्रॉपर्टीज:

```javascript
DOMDataTransfer clipboardData
```

* * *

### कम्पोजीशन इवेंट्स {#composition-events}

इवेंट्स के नाम:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

प्रॉपर्टीज:

```javascript
string data

```

* * *

### कीबोर्ड इवेंट्स {#keyboard-events}

इवेंट्स के नाम:

```
onKeyDown onKeyPress onKeyUp
```

प्रॉपर्टीज:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

`key` प्रॉपर्टी, [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) में प्रलेखित किसी भी वैल्यू को ले सकती है।

* * *

### फोकस इवेंट्स {#focus-events}

इवेंट्स के नाम:

```
onFocus onBlur
```

ये फ़ोकस इवेंट React DOM में सभी एलिमेंट्स पर काम करते हैं, न कि केवल फार्म एलिमेंट्स पर।

प्रॉपर्टीज:

```javascript
DOMEventTarget relatedTarget
```

* * *

### फार्म इवेंट्स {#form-events}

इवेंट्स के नाम:

```
onChange onInput onInvalid onReset onSubmit 
```

onChange ईवेंट के बारे में अधिक जानकारी के लिए [फॉर्म्स](/docs/forms.html) देखें।


### सामान्य इवेंट्स {#generic-events}

इवेंट्स के नाम:

```
onError onLoad
```

### माउस इवेंट्स {#mouse-events}

इवेंट्स के नाम:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

`onMouseEnter` और `onMouseLeave` इवेंट्स, साधारण बब्बलीन्ग के बजाय एलिमेंट के छोड़े जाने से दर्ज किये जाने पर प्रचारित होते हैं और इनमें कैप्चर फेज नहीं होता है।

प्रॉपर्टीज:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### पॉइंटर इवेंट्स {#pointer-events}

इवेंट्स के नाम:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

`onMouseEnter` और `onMouseLeave` इवेंट्स, साधारण बब्बलीन्ग के बजाय एलिमेंट के छोड़े जाने से दर्ज किये जाने पर प्रचारित होते हैं और इनमें कैप्चर फेज नहीं होता है।

प्रॉपर्टीज:

जैसा कि [W3 विनिर्देश](https://www.w3.org/TR/pointerevents/) में परिभाषित किया गया है, पॉइंटर इवेंट्स निम्नलिखित गुणों के साथ [माउस इवेंट्स](#mouse-events) का विस्तार करते हैं:

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

क्रॉस-ब्राउज़र समर्थन पर एक नोट:

पॉइंटर ईवेंट्स अभी तक हर ब्राउज़र में सपोर्टेड नहीं हैं (इस लेख को लिखने के समय, सपोर्टेड ब्राउज़र में Chrome, Firefox, Edge और Internet Explorer शामिल हैं। `react-dom` के बंडल आकार में काफी वृद्धि न हो इसलिए React जानबूझकर अन्य ब्राउज़रों के लिए पॉलीफिल समर्थन नहीं करता।

यदि आपके एप्लिकेशन को पॉइंटर इवेंट्स की आवश्यकता है, तो हम थर्ड पार्टी पॉइंटर इवेंट पॉलीफिल जोड़ने की सलाह देते हैं।

* * *

### चयन इवेंट्स {#selection-events}

इवेंट्स के नाम:

```
onSelect
```

* * *

### टच इवेंट्स {#touch-events}

इवेंट्स के नाम:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

प्रॉपर्टीज:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### UI इवेंट्स {#ui-events}

इवेंट्स के नाम:

```
onScroll
```

प्रॉपर्टीज:

```javascript
number detail
DOMAbstractView view
```

* * *

### व्हील इवेंट्स {#wheel-events}

इवेंट्स के नाम:

```
onWheel
```

प्रॉपर्टीज:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### मीडिया इवेंट्स {#media-events}

इवेंट्स के नाम:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### इमेज इवेंट्स {#image-events}

इवेंट्स के नाम:

```
onLoad onError
```

* * *

### एनीमेशन इवेंट्स {#animation-events}

इवेंट्स के नाम:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

प्रॉपर्टीज:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### ट्रांज़िशन इवेंट्स {#transition-events}

इवेंट्स के नाम:

```
onTransitionEnd
```

प्रॉपर्टीज:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### अन्य इवेंट्स {#other-events}

इवेंट्स के नाम:

```
onToggle
```

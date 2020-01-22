---
id: events
title: SyntheticEvent(कृत्रिम इवेंट)
permalink: docs/events.html
layout: docs
category: Reference
---

यह संदर्भ React इवेंट सिस्टम का हिस्सा बनने वाले `SyntheticEvent` आवरण को निर्देशित करता है. अधिक जानने के लिए मार्गदर्शिका देखें | [Handling Events](/docs/handling-events.html)

## अवलोकन {#overview}

आपके ईवेंट हैंडलर को `SyntheticEvent` के उदाहरण दिए जाएंगे, जो ब्राउज़र के मूल ईवेंट के आसपास एक क्रॉस-ब्राउज़र आवरण है। यह ब्राउज़र के मूल ईवेंट के समान है, जिसमें `stopPropagation()` और `stopDefault()` शामिल हैं, सिवाय उन घटनाओं के, जो सभी ब्राउज़रों में समान रूप से काम करते हैं।

यदि आप पाते हैं कि आपको किसी कारण से अंतर्निहित ब्राउज़र इवेंट की आवश्यकता है, तो इसे प्राप्त करने के लिए केवल `nativeEvent` विशेषता का उपयोग करें। प्रत्येक `SyntheticEvent` object में निम्न विशेषताएँ होती हैं।

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
DOMEventTarget target
number timeStamp
string type
```

> ध्यान दें:
>
> V0.14 के अनुसार, किसी इवेंट हैंडलर से `false` वापस करना अब event propagation को रोक नहीं पाएगा। इसके बजाय, `e.stopPropagation()` या `e.preventDefault()` को मैन्युअल रूप से, उपयुक्त के रूप में चालू/ट्रिगर किया जाना चाहिए।

### इवेंट इकट्ठा करना {#event-pooling}

`SyntheticEvent` को इकट्ठा किया जाता है। इसका मतलब यह है कि `SyntheticEvent` object का पुन: उपयोग किया जाएगा और ईवेंट कॉलबैक लागू होने के बाद सभी गुणों को null कर दिया जाएगा। यह निष्पादन कारणों से है। जैसे, आप ईवेंट को asynchronous तरीके से एक्सेस नहीं कर सकते.

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
> यदि आप एक asynchronous तरीके से इवेंट के गुणों का उपयोग करना चाहते हैं, तो आपको इवेंट पर `event.persist()` को कॉल करना चाहिए, जो पूल(इकट्ठा इवेंट) से `SyntheticEvent` को हटा देगा और उपयोगकर्ता कोड द्वारा इवेंट के संदर्भ को बनाए रखने की अनुमति देगा।

## समर्थित इवेंट्स {#supported-events}

React घटनाओं को सामान्य करता है ताकि उनके विभिन्न ब्राउज़रों में सुसंगत गुण हों।

नीचे दिए गए घटना संचालकों को bubbling चरण में एक इवेंट द्वारा ट्रिगर किया गया है। कैप्चर/पकड़ना चरण के लिए एक ईवेंट हैंडलर पंजीकृत करने के लिए, `Capture` को ईवेंट नाम में जोड़ें, उदाहरण के लिए, `onClick` का उपयोग करने के बजाय, आप कैप्चर/पकड़ना चरण में click इवेंट को संभालने के लिए `onClickCapture` का उपयोग करेंगे।

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
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

ईवेंट के नाम:

```
onCopy onCut onPaste
```

गुण:

```javascript
DOMDataTransfer clipboardData
```

* * *

### संयोजन इवेंट्स {#composition-events}

ईवेंट के नाम:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

गुण:

```javascript
string data

```

* * *

### कीबोर्ड इवेंट्स {#keyboard-events}

ईवेंट के नाम:

```
onKeyDown onKeyPress onKeyUp
```

गुण:

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

`key` संपत्ति, [DOM स्तर 3 इवेंट्स विनिर्देश](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) में प्रलेखित किसी भी मान को ले सकती है।

* * *

### फोकस इवेंट्स {#focus-events}

ईवेंट के नाम:

```
onFocus onBlur
```

ये फ़ोकस इवेंट React DOM में सभी elements पर काम करते हैं, न कि केवल फार्म elements।

गुण:

```javascript
DOMEventTarget relatedTarget
```

* * *

### फार्म इवेंट्स {#form-events}

ईवेंट के नाम:

```
onChange onInput onInvalid onSubmit
```

OnChange ईवेंट के बारे में अधिक जानकारी के लिए [फार्म](/docs/forms.html) देखें।

* * *

### माउस इवेंट्स {#mouse-events}

ईवेंट के नाम:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

`OnMouseEnter` और` onMouseLeave` ईवेंट उस element से प्रचारित होते हैं जिसे साधारण bubbling के बजाय किसी एक में छोड़ा जा रहा है और कैप्चर चरण/फेज नहीं है।

गुण:

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

### सूचक इवेंट्स {#pointer-events}

ईवेंट के नाम:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

`OnPointerEnter` और` onPointerLeave` ईवेंट उस element से प्रचारित होते हैं जिसे साधारण bubbling के बजाय एक में छोड़ा जा रहा है और कैप्चर चरण/फेज नहीं है।

गुण:

जैसा कि [W3 विनिर्देश](https://www.w3.org/TR/pointerevents/) में परिभाषित किया गया है, pointer events निम्नलिखित गुणों के साथ [माउस इवेंट्स](#mouse-events) का विस्तार करती हैं:

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

क्रॉस-ब्राउज़र समर्थन पर ध्यान दें:

पॉइंटर ईवेंट्स अभी तक हर ब्राउज़र में समर्थित नहीं हैं (इस लेख को लिखने के समय, समर्थित ब्राउज़र में शामिल हैं: क्रोम, फ़ायरफ़ॉक्स, एज और इंटरनेट एक्सप्लोरर)। React जानबूझकर अन्य ब्राउज़रों के लिए polyfill समर्थन नहीं करता है क्योंकि एक मानक-अनुरूप polyfill `react-dom` के बंडल आकार में काफी वृद्धि करेगा।

यदि आपके एप्लिकेशन को pointer events की आवश्यकता है, तो हम तीसरे पक्ष के pointer events polyfill को जोड़ने की सलाह देते हैं.

* * *

### चयन इवेंट्स {#selection-events}

ईवेंट के नाम:

```
onSelect
```

* * *

### टच इवेंट्स {#touch-events}

ईवेंट के नाम:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

गुण:

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

ईवेंट के नाम:

```
onScroll
```

गुण:

```javascript
number detail
DOMAbstractView view
```

* * *

### व्हील इवेंट्स {#wheel-events}

ईवेंट के नाम:

```
onWheel
```

गुण:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### मीडिया इवेंट्स {#media-events}

ईवेंट के नाम:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### इमेज इवेंट्स {#image-events}

ईवेंट के नाम:

```
onLoad onError
```

* * *

### एनीमेशन इवेंट्स {#animation-events}

ईवेंट के नाम:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

गुण:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### ट्रांज़िशन इवेंट्स {#transition-events}

ईवेंट के नाम:

```
onTransitionEnd
```

गुण:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### अन्य इवेंट्स {#other-events}

ईवेंट के नाम:

```
onToggle
```

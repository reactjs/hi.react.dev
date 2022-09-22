---
title: कौम्पोनॅन्ट्स के बीच state शेयरिंग
---

<Intro>

कभी-कभी आप चाहेंगे की दो कौम्पोनॅन्ट्स की state हमेशा एक साथ बदले। ऐसा करने के लिए पहले उन दोनों में से state को निकल दें, फिर उन्हें मूव कर के उनके निकटतम कॉमन पैरेंट के पास ले जाएँ, और फिर props के माध्यम से उनमें पास कर दें। इसे _"लिफ्टिंग state अप"_ कहा जाता है, और React कोड लिखे जाते समय, किया जाने वाला यह सबसे कॉमन तरीका है।

</Intro>

<YouWillLearn>

- लिफ्टिंग के द्वारा कौम्पोनॅन्ट्स के बीच state कैसे शेयर की जाये
- कंट्रोल्ड और अन-कंट्रोल्ड कौम्पोनॅन्ट्स क्या होते हैं

</YouWillLearn>

## लिफ्टिंग state अप, उदाहरण के माध्यम से {/*lifting-state-up-by-example*/}

इस उदाहरण में एक पैरेंट `Accordion` कौम्पोनॅन्ट दो विभिन्न `Panel`s को रेंडर करता है:

* `Accordion`
  - `Panel`
  - `Panel`

प्रत्येक `Panel` कौम्पोनॅन्ट में एक boolean `isActive` state है जो ये निर्धारित करती है कि कौन स कंटेंट दिखाई देगा।

दोनों panels के Show बटन को दबाएँ:

<Sandpack>

```js
import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        20 लाख की आबादी के साथ, अलमाती कज़ख़िस्तान का सबसे बड़ा शहर है। 1929 से 1997 तक, वह उसकी राजधानी थी।
      </Panel>
      <Panel title="Etymology">
       यह नाम <span lang="kk-KZ">алма</span> से आता है, जो "सेब" का कज़ाख शब्द है और अक्सर "सेब से भरपूर" में अनुवाद करता है। असल में, अलमाती के आस पास के क्षेत्र को सेब का पैतृक घर माना जाता है, और जंगली <i lang="la">Malus sieversii</i> को सेब के पूर्वज होने का संभावित उम्मीदवार माना जाता है।
      </Panel>
    </>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

गौर कीजिये किस तरह एक panel का बटन दबाना दूसरे panel को प्रभावित नहीं करता--दोनों स्वतंत्र हैं।

<DiagramGroup>

<Diagram name="sharing_state_child" height={367} width={477} alt="Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Both Panel components contain isActive with value false.">

शुरुआत में दोनों `Panel`s की `isActive` state `false` है, इसलिए दोनों कोलैप्स्ड दिख रहे हैं

</Diagram>

<Diagram name="sharing_state_child_clicked" height={367} width={480} alt="The same diagram as the previous, with the isActive of the first child Panel component highlighted indicating a click with the isActive value set to true. The second Panel component still contains value false." >

किसी भी `Panel` की `isActive` state तभी अपडेट होगी जब उस `Panel` का बटन दबाया जायेगा

</Diagram>

</DiagramGroup>

**मान लीजिये यदि आप बदलाव के तौर पर चाहते हैं कि एक समय में सिर्फ एक ही पैनल एक्सपैंड हो।** इस डिजाईन के मुताबिक़ एक पैनल के एक्सपैंड होने पर दूसरा कोलैप्स होना चाहिये। तो ये कैसे कर पाएंगे?

इन दोनों पेनल्स को संचालित करने के लिए, आपको तीन चरणों में इनके "state को लिफ्ट अप" करके इन्हें पैरेंट कौम्पोनॅन्ट में लाना होगा:

1. चाइल्ड कौम्पोनॅन्ट में से state को **हटाना**।
2. कॉमन पैरेंट में से हार्ड कोड किया हुआ डाटा **पास** करना।
3. कॉमन पैरेंट में state को फिर से **ऐड करके** उसे event-handler के साथ पास करना।

ऐसा करने से `Accordion` कौम्पोनॅन्ट दोनों `Panel`s को संचालित कर पायेगा और एक समय में उनमें से एक ही एक्सपैंड होगा।

### स्टेप 1: चाइल्ड कौम्पोनॅन्ट में से state निकालना {/*step-1-remove-state-from-the-child-components*/}

आप `Panel` के `isActive` का कण्ट्रोल उसके पैरेंट कौम्पोनॅन्ट को देंगे। इसका मतलब है कि पैरेंट कौम्पोनॅन्ट `isActive` को `Panel` तक एक prop की तरह पास करेगा। आप `Panel` कौम्पोनॅन्ट से **यह लाइन हटाने** से शुरुआत कर सकते हैं:

```js
const [isActive, setIsActive] = useState(false);
```

और इसके बजाये, `Panel` के props की लिस्ट में `isActive` को जोड़ दें:

```js
function Panel({ title, children, isActive }) {
```

अब `Panel` का पैरेंट कौम्पोनॅन्ट `isActive` को [prop की तरह पास कर](/learn/passing-props-to-a-component) के *नियंत्रित* कर पायेगा। ठीक इसके विपरीत, अब `Panel` कौम्पोनॅन्ट के `isActive` की वैल्यू पर कोई *नियंत्रित नहीं* रह जायेगा--ये अब पैरेंट कौम्पोनॅन्ट पर निर्भर है!

### स्टेप 2: कॉमन पैरेंट कौम्पोनॅन्ट से हार्ड कोडेड डाटा को पास करना {/*step-2-pass-hardcoded-data-from-the-common-parent*/}

अब state को लिफ्ट अप करने के लिए आपको उस निकटतम कॉमन पैरेंट कौम्पोनॅन्ट का पता लगाना है, जो उन *दोनों* चाइल्ड कौम्पोनॅन्ट का पैरेंट है जिन्हें आप संचालित करना चाहते हैं:

* `Accordion` *(निकटतम कॉमन पैरेंट)*
  - `Panel`
  - `Panel`

इस उदाहरण में, यह `Accordion` कौम्पोनॅन्ट है। चूँकि यह दोनों पेनल्स के उपर है और उनके props को कंट्रोल कर सकता है, इसलिए यह अब ये वर्तमान में एक्टिव पैनल के लिए एक "सोर्स ऑफ़ ट्रुथ" बन जायेगा। अब `Accordion` कौम्पोनॅन्ट से, दोनों पेनल्स की तरफ `isActive` की एक हार्ड कोडेड वैल्यू पास करवाएं (उदाहरण के लिए, `true`):

<Sandpack>

```js
import { useState } from 'react';

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={true}>
        20 लाख की आबादी के साथ, अलमाती कज़ख़िस्तान का सबसे बड़ा शहर है। 1929 से 1997 तक, वह उसकी राजधानी थी।
      </Panel>
      <Panel title="Etymology" isActive={true}>
        यह नाम <span lang="kk-KZ">алма</span> से आता है, जो "सेब" का कज़ाख शब्द है और अक्सर "सेब से भरपूर" में अनुवाद करता है। असल में, अलमाती के आस पास के क्षेत्र को सेब का पैतृक घर माना जाता है, और जंगली <i lang="la">Malus sieversii</i> को सेब के पूर्वज होने का संभावित उम्मीदवार माना जाता है।
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

अब `Accordion` कौम्पोनॅन्ट के हार्ड कोडेड `isActive` वैल्यूज को एडिट करें और स्क्रीन पर उसका रिजल्ट देखें।

### स्टेप 3 : कॉमन पैरेंट में state को ऐड करना {/*step-3-add-state-to-the-common-parent*/}

State को लिफ्ट अप करते समय, कई बार उस state में हम क्या स्टोर कर रहे हैं, उसका नेचर बदल सकता है।

ऐसे में एक समय पर सिर्फ एक ही पैनल एक्टिव रहना चाहिए। इसका मतलब है की `Accordion` कॉमन पैरेंट कौम्पोनॅन्ट को यह ट्रैक करते रहना होगा की *कौन सा* पैनल एक्टिव है। `boolean` वैल्यू के बजाये , वो state वेरिएबल के लिए, एक नंबर को एक्टिव `Panel` के इंडेक्स की तरह इस्तेमाल कर सकता है:

```js
const [activeIndex, setActiveIndex] = useState(0);
```

जब `activeIndex` `0` हो तो पहला पैनल एक्टिव है, और अगर ये `1` हो तो दूसरा।

किसी भी `Panel` में "Show" का बटन दबाने पर `Accordion` में active index बदल जाना चाहिए। एक `Panel` सीधे ही `activeIndex` state सेट नहीं कर सकता क्योंकि वह `Accordion` के अन्दर डिफाइन किया गया है। `Accordion` कौम्पोनॅन्ट को साफ तौर पर `Panel` कौम्पोनॅन्ट को अपनी state बदलने की *इजाज़त* देनी होगी, जिसके लिए उसे [event-handler को prop की तरह पास कराना होगा](/learn/responding-to-events#passing-event-handlers-as-props):

```js
<>
  <Panel
    isActive={activeIndex === 0}
    onShow={() => setActiveIndex(0)}
  >
    ...
  </Panel>
  <Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
  >
    ...
  </Panel>
</>
```

`Panel` के अंदर का `<button>` अब `onShow` prop को क्लिक event handler की तरह इस्तेमाल करेगा:

<Sandpack>

```js
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        २० लाख की आबादी के साथ, अलमाती कज़ख़िस्तान का सबसे बड़ा शहर है। 1929 से 1997 तक, वह उसकी राजधानी थी।
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        यह नाम <span lang="kk-KZ">алма</span> से आता है, जो "सेब" का कज़ाख शब्द है और अक्सर "सेब से भरपूर" में अनुवाद करता है। असल में, अलमाती के आस पास के क्षेत्र को सेब का पैतृक घर माना जाता है, और जंगली <i lang="la">Malus sieversii</i> को सेब के पूर्वज होने का संभावित उम्मीदवार माना जाता है।
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

इस तरह लिफ्टिंग states अप पूरा हुआ! State को कॉमन पैरेंट में मूव करने से दोनों panels के बीच संचालन संभव हो सका। दो "is shown" फ्लैग्स के बजाये, active index इस्तेमाल करने से, एक समय में एक ही panel एक्टिव रख पाना संभव हो सका। और event-handler को चाइल्ड तक पास-डाउन करने से चाइल्ड द्वारा पैरेंट state को बदलना संभव हो सका।

<DiagramGroup>

<Diagram name="sharing_state_parent" height={385} width={487} alt="Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Accordion contains an activeIndex value of zero which turns into isActive value of true passed to the first Panel, and isActive value of false passed to the second Panel." >

शुरुआत में `Accordion` का `activeIndex` `0` है , इसलिए पहले `Panel` को `isActive = true` मिलेगा.

</Diagram>

<Diagram name="sharing_state_parent_clicked" height={385} width={521} alt="The same diagram as the previous, with the activeIndex value of the parent Accordion component highlighted indicating a click with the value changed to one. The flow to both of the children Panel components is also highlighted, and the isActive value passed to each child is set to the opposite: false for the first Panel and true for the second one." >

जब `Accordion` के `activeIndex` की state बदल कर `1` होगी, तब दूसरे `Panel` को `isActive = true` मिलेगा

</Diagram>

</DiagramGroup>

<DeepDive title="नियंत्रित और अनियंत्रित कौम्पोनॅन्ट्स">

सामान्यतः लोकल state वाले कौम्पोनॅन्ट को "अनियंत्रित" कहा जाता है। उदाहरण के लिए, `isActive` state वेरिएबल के साथ वाले ओरिजिनल `Panel` कौम्पोनॅन्ट को इसीलिए अनियंत्रित कहा जायेगा क्युकी इसका पैरेंट उसके panel के एक्टिव होने या न होने को प्रभावित नहीं कर सकता।

इसके ठीक विपरीत, एक कौम्पोनॅन्ट को "नियंत्रित" कहा जायेगा यदि उसकी महत्वपूर्ण सूचना, उसके अपने लोकल state के बजाये props द्वारा चलायी जाएगी। इस कारण, पैरेंट कौम्पोनॅन्ट उसके स्वभाव को पूरी तरह से स्पष्ट करता है। `isActive` prop वाला अंतिम कौम्पोनॅन्ट, `Accordion` कौम्पोनॅन्ट से नियंत्रीत होगा।

अनियंत्रित कौम्पोनॅन्ट, अपनी कम कॉन्फ़िगरेशन ज़रूरतों के कारण अपने पेरेंट्स के अन्दर आसानी से इस्तेमाल किये जा सकते है। परन्तु उनको समन्वित करने के लिए ये कम लचीले है। नियंत्रित कौम्पोनॅन्ट अत्यधिक लचीले है परन्तु उसके लिए उनके पैरेंट कौम्पोनॅन्ट को props द्वारा पूरी तरह कॉन्फ़िगर करने की आवश्यकता है।

प्रमाणिक तौर पर नियंत्रित और अनियंत्रित पूरी तरह से तांत्रिक शब्द नहीं है--प्रत्येक कौम्पोनॅन्ट अधिकतर लोकल state और props का मिश्रण है। परन्तु ये कौम्पोनॅन्ट्स के प्रारूप और क्षमताओं के बारे में बताने का कारगर तरीका है।

कौम्पोनॅन्ट के बारे में लिखते समय इस बात का ख्याल रखे की कौनसी सूचना नियंत्रित (props द्वारा) और कौनसी अनियंत्रित (states द्वारा) है। पर यह आप बाद में बदलकर रीफैक्टर कर सकते है।

</DeepDive>

## हर state के लिए एक ही सोर्स ऑफ़ truth {/*a-single-source-of-truth-for-each-state*/}

React एप्लीकेशन में, कई कौम्पोनॅन्ट का अपना एक state होगा। Inputs की तरह के कुछ state अपने Leaf कौम्पोनॅन्ट के नजदीक "रह" सकते हैं (Tree के बॉटम में रहने वाले कौम्पोनॅन्ट्स)। कुछ state एप्प के टॉप पर "रह" सकते हैं। उदाहरण के लिए कुछ client-side routing लाइब्रेरीज implement करते समय उनके करंट state को React state में स्टोर किया जाता है और फिर props की मदद से पास किया जाता है!

**किसी भी state के प्रत्येक विशिष्ट टुकड़े के लिए, आप वह कौम्पोनॅन्ट चुनेंगे जिसका वे "हिस्सा" हैं**। इस सिद्धांत को "सच्चाई का एक ही स्त्रोत" या ["सिंगल सोर्स ऑफ़ truth"](https://en.wikipedia.org/wiki/Single_source_of_truth) कहा जाता है। इसका मतलब यह नहीं की सारे state एक ही जगह रहते हैं--बल्कि state के _हर_ हिस्से के लिए, एक _विशिष्ट_ कौम्पोनॅन्ट है जो इस सूचना को अपने पास रखता है। सो कौम्पोनॅन्ट के बीच साझा (shared) state की duplicating करने के बजाये, आप _उनको उठा (लिफ्ट) कर_, उनके कॉमन साझा (shared) पैरेंट तक ले जायेंगे और उन्हें उनके जरूरतमंद चिल्ड्रेन तक _पास_ कर देंगे।

आपका एप्प आपके काम करते करते बदलता जायेगा। State के हर हिस्से को उसकी "रहने" की सही जगह पहुंचाने तक, बार-बार state को अप या डाउन ले जाना सामान्य है। यह सब इस प्रक्रिया का हिस्सा है!

यदि आप कुछ और कौम्पोनॅन्ट के साथ प्रैक्टिस करने का अनुभव लेना चाहते हैं, तो इसके लिए [React में सोचना](/learn/thinking-in-react) लेख पढ़ें।

<Recap>

* यदि आप दो कंपोनेंट्स के बीच तालमेल करना चाहते हैं, तब उनकी state को उनके कॉमन पैरेंट पर मूव करें।
* फिर इनफार्मेशन को कॉमन पैरेंट में से props की मदद से पास करें।
* अंत में event-handler को पास-डाउन करें जिस से चिल्ड्रेन अपने पैरेंट state बदल सकें।
* Iबेहतर होगा यदि कंपोनेंट्स को "कंट्रोल्ड"(props द्वारा ड्रिवन) या "अन-कंट्रोल्ड" (state द्वारा ड्रिवन) मानें।

</Recap>

<Challenges>

### सिंक किये हुए इनपुट {/*synced-inputs*/}

ये दो इनपुट इंडिपेंडेंट हैं। इन्हें सिंक में रखने की कोशिश करें: एक इनपुट को एडिट करने पर दूसरा इनपुट उसकी टेक्स्ट से अपडेट होना चाहिए, और फिर vice versa।

<Hint>

आपको उनके स्टेट को लिफ्ट अप करके पैरेंट कौम्पोनॅन्ट में डालना होगा।

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function SyncedInputs() {
  return (
    <>
      <Input label="First input" />
      <Input label="Second input" />
    </>
  );
}

function Input({ label }) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <label>
      {label}
      {' '}
      <input
        value={text}
        onChange={handleChange}
      />
    </label>
  );
}
```

```css
input { margin: 5px; }
label { display: block; }
```

</Sandpack>

<Solution>

`text` state वेरिएबल को `handleChange` हैंडलरके साथ पैरेंट कौम्पोनॅन्ट में ले जाएँ। फिर उन्हें props की तरह दोनों इनपुट कौम्पोनॅन्ट में पास-डाउन करें। यह उन्हें सिंक में रखेगा।

<Sandpack>

```js
import { useState } from 'react';

export default function SyncedInputs() {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <Input
        label="First input"
        value={text}
        onChange={handleChange}
      />
      <Input
        label="Second input"
        value={text}
        onChange={handleChange}
      />
    </>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label>
      {label}
      {' '}
      <input
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
```

```css
input { margin: 5px; }
label { display: block; }
```

</Sandpack>

</Solution>

### लिस्ट फ़िल्टर करना {/*filtering-a-list*/}

इस उदाहरण में, `SearchBar` की अपनी एक `query` state है, जो टेक्स्ट इनपुट को नियंत्रित करती है। इसका पैरेंट `FilterableList` कौम्पोनॅन्ट `List` ऑफ़ आइटम डिस्प्ले करता है, पर सर्च query को अकाउंट में नहीं लेता है।

`filterItems(foods, query)` फंक्शन की सहायता से लिस्ट को सर्च query के अनुसार फ़िल्टर करें।अपने changes को जांचने के लिए, "s" टाइप करके देखें की इनपुट फ़िल्टर लिस्ट में "Sushi", "Shish-Kabab" और "Dim-Sum" प्राप्त होते हैं।

ध्यान दें कि `filterItems` पहले से ही इम्प्लेमेंट और इम्पोर्ट हो गया है, जिस से उसे आपको खुद लिखना न पड़े!

<Hint>

आप `query` state और `handleChange` हैंडलर को `SearchBar` से निकाल कर, उन्हें `FilterableList` की ओर ले जाना चाहेंगे। इसके लिए उन्हें `SearchBar` से `query` और `onChange` props की तरह पास-डाउन करें।

</Hint>

<Sandpack>

```js
import { useState } from 'react';
import { foods, filterItems } from './data.js';

export default function FilterableList() {
  return (
    <>
      <SearchBar />
      <hr />
      <List items={foods} />
    </>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={handleChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table> 
      {items.map(food => (
        <tr key={food.id}>
          <td>{food.name}</td>
          <td>{food.description}</td>
        </tr>
      ))}
    </table>
  );
}
```

```js data.js
export function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export const foods = [{
  id: 0,
  name: 'Sushi',
  description: 'Sushi is a traditional Japanese dish of prepared vinegared rice'
}, {
  id: 1,
  name: 'Dal',
  description: 'The most common way of preparing dal is in the form of a soup to which onions, tomatoes and various spices may be added'
}, {
  id: 2,
  name: 'Pierogi',
  description: 'Pierogi are filled dumplings made by wrapping unleavened dough around a savoury or sweet filling and cooking in boiling water'
}, {
  id: 3,
  name: 'Shish kebab',
  description: 'Shish kebab is a popular meal of skewered and grilled cubes of meat.'
}, {
  id: 4,
  name: 'Dim sum',
  description: 'Dim sum is a large range of small dishes that Cantonese people traditionally enjoy in restaurants for breakfast and lunch'
}];
```

</Sandpack>

<Solution>

`query` state को `FilterableList` कौम्पोनॅन्ट में लिफ्ट अप करें। फ़िल्टर की हुई लिस्ट पाने के लिए `filterItems(foods, query)` को कॉल करें और उसे `List` की ओर पास डाउन करें। अब लिस्ट में query इनपुट का बदलाव नज़र आयेगा:

<Sandpack>

```js
import { useState } from 'react';
import { foods, filterItems } from './data.js';

export default function FilterableList() {
  const [query, setQuery] = useState('');
  const results = filterItems(foods, query);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <SearchBar
        query={query}
        onChange={handleChange}
      />
      <hr />
      <List items={results} />
    </>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={onChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table> 
      {items.map(food => (
        <tr key={food.id}>
          <td>{food.name}</td>
          <td>{food.description}</td>
        </tr>
      ))}
    </table>
  );
}
```

```js data.js
export function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export const foods = [{
  id: 0,
  name: 'Sushi',
  description: 'Sushi is a traditional Japanese dish of prepared vinegared rice'
}, {
  id: 1,
  name: 'Dal',
  description: 'The most common way of preparing dal is in the form of a soup to which onions, tomatoes and various spices may be added'
}, {
  id: 2,
  name: 'Pierogi',
  description: 'Pierogi are filled dumplings made by wrapping unleavened dough around a savoury or sweet filling and cooking in boiling water'
}, {
  id: 3,
  name: 'Shish kebab',
  description: 'Shish kebab is a popular meal of skewered and grilled cubes of meat.'
}, {
  id: 4,
  name: 'Dim sum',
  description: 'Dim sum is a large range of small dishes that Cantonese people traditionally enjoy in restaurants for breakfast and lunch'
}];
```

</Sandpack>

</Solution>

</Challenges>
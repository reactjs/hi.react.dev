---
title: React में सोचना
---

<Intro>

React आपके डिज़ाइन और आपके बनाए गए ऐप्स के बारे में सोचने के तरीके को बदल सकता है। जब आप React के साथ एक यूजर इंटरफ़ेस बनाते हैं, तो सबसे पहले आप उसे छोटे टुकड़ों में टूटते हैं, जिन्हें **कौम्पोनॅन्टस** कहा जाता है। फिर, आप हर एक कौम्पोनॅन्ट के लिए विभिन्न विसुअल स्टेट्स का वर्णन करेंगे। अंत में, आप अपने कौम्पोनॅन्टस को एक साथ जोड़ेंगे ताकि उनमे से डाटा का प्रवाह सही तरीके से हो सके। इस ट्यूटोरियल में, हम आपको React के साथ एक खोजने योग्य प्रोडक्ट डेटा टेबल बनाने के पीछे की सोच प्रक्रिया के माध्यम से गाइड करेंगे।

</Intro>

## मॉकअप के साथ शुरू करें {/*start-with-the-mockup*/}


कल्पना करें कि आपके पास पहले से ही एक JSON API और डिज़ाइनर से एक मॉकअप है।

JSON API ने कुछ डेटा वापस किया है जो इस तरह दिखता है:

```json
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

मॉकअप कुछ इस तरह दिखता है:

<img src="/images/docs/s_thinking-in-react_ui.png" width="300" style={{margin: '0 auto'}} />

React में एक UI को लागू करने के लिए, आप आम तौर पर इन्हीं पाँच चरणों का पालन करेंगे।

## Step 1: UI को एक कौम्पोनॅन्ट विभाजित करें {/*step-1-break-the-ui-into-a-component-hierarchy*/}

सबसे पहले, मॉकअप में हर कौम्पोनॅन्ट और सब-कौम्पोनॅन्ट के चारों ओर बॉक्स बनाएँ और उन्हें नाम दें। यदि आप एक डिज़ाइनर के साथ काम कर रहे हैं, तो शायद उन्होंने अपने डिज़ाइन टूल में पहले से ही इन कौम्पोनॅन्टस को नाम दे दिया होगा। उनसे इस विषय मे वार्ता करें!

आपके बैकग्राउंड के अनुरूप, आप कौम्पोनॅन्टस को विभाजित करने के लिए विभिन्न तरीकों पर विचार कर सकते हैं:

* **प्रोग्रामिंग**--यदि आप नए फ़ंक्शन या ऑब्जेक्ट बनाने का फैसला कर रहे हैं तो एक ही तकनीक का उपयोग करें। एक ऐसी तकनीक है [एक जिम्मेवारी का सिद्धांत](https://en.wikipedia.org/wiki/Single_responsibility_principle), अर्थात्, एक कौम्पोनॅन्ट को आदर्शरूप से केवल एक काम करना चाहिए। यदि यह बढ़ जाता है, तो इसे छोटे से छोटे सब-कौम्पोनॅन्ट में विभाजित किया जाना चाहिए।

* **CSS**--विचार करें कि आप class selectors किसके लिए बनाएँगे। (हालांकि, कौम्पोनॅन्टस थोड़े कम सूक्ष्म होते हैं।)

* **डिज़ाइन** (Design)--विचार करें कि आप डिज़ाइन के स्तर (layers) को कैसे व्यवस्थित करेंगे।


यदि आपका JSON अच्छी तरह से संरचित है, तो आपको अक्सर मिलेगा कि यह आपके UI के कंपोनेंट संरचना से अपने आप ही मैप होता है। यह इसलिए क्योंकि UI और डेटा मॉडल आम तौर पर एक ही जानकारी वितरण की आर्किटेक्चर होती है--अर्थात्, एक ही आकृति। अपने UI को कंपोनेंट्स में विभाजित करें, जहां प्रत्येक कंपोनेंट आपके डेटा मॉडल के एक अंश के साथ मेल खाता है।

screen पर पाँच कम्पोनन्ट हैं:

<FullWidth>

<CodeDiagram flip>

<img src="/images/docs/s_thinking-in-react_ui_outline.png" width="500" style={{margin: '0 auto'}} />

1. `FilterableProductTable` (ग्रे) पूरे ऐप को एकत्रित करता है।
2. `SearchBar` (नीला) उपयोगकर्ता इनपुट (user input) प्राप्त करता है।
3. `ProductTable` (लैवेंडर) उपयोगकर्ता इनपुट (user input) के अनुसार सूची को प्रदर्शित करता है और फिल्टर करता है।
4. `ProductCategoryRow` (हरा) प्रत्येक श्रेणी के लिए एक हेडिंग प्रदर्शित करता है।
5. `ProductRow` (पीला) प्रत्येक उत्पाद के लिए एक पंक्ति प्रदर्शित करता है।

</CodeDiagram>

</FullWidth>

यदि  आप `ProductTable` (लैवेंडर) पर नज़र डालें, तो आप देखेंगे कि टेबल हैडर ("नाम" और "मूल्य" लेबल को सम्मिलित करने वाला भाग) अपने आप मे एक कंपोनेंट नहीं है। यह पूरी तरह से पसंद की बात है, और आप दोनों तरीके से जा सकते हैं। इस उदाहरण के लिए, यह `ProductTable` का एक हिस्सा है क्योंकि यह `ProductTable` की सूची के अंदर दिखता है। हालांकि, यदि यह हैडर जटिल हो जाता है (उदाहरण के लिए, यदि आप सॉर्टिंग (sorting) जोड़ते हैं), तो आप इसे अपने खुद के `ProductTableHeader` कंपोनेंट में भी स्थानांतरित कर सकते हैं।

अब जब आपने मॉकअप में कंपोनेंट्स की पहचान कर ली है, तो उन्हें एक पदानुक्रम (hierarchy) में व्यवस्थित करें। मॉकअप में जो भी कंपोनेंट दूसरे कंपोनेंट के अंदर प्रकट होता है, उन्हें पदानुक्रम में एक चाइल्ड (child) के रूप में प्रदर्शित करें:

* `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
        * `ProductCategoryRow`
        * `ProductRow`

## Step 2: React में एक स्थैतिक संस्करण (static version) बनाएँ {/*step-2-build-a-static-version-in-react*/}

अब जब आपके पास कंपोनेंट पदानुक्रम है, तो अब आपको अपना ऐप कार्यान्वित करने का समय है। सबसे सरल तरीका यह है कि एक ऐसा संस्करण बनाएं जो आपके डेटा मॉडल से यूआई को रेंडर करता है और अभी तक कोई इंटरैक्टिविटी नहीं जोड़ता। आम तौर पर स्थैतिक (static) संस्करण पहले बनाना आसान होता है और बाद में इंटरैक्टिविटी जोड़ना। स्थैतिक (static) संस्करण बनाने के लिए आपको बहुत टाइपिंग करने की आवश्यकता होती है और कोई सोचने की आवश्यकता नहीं होती है, लेकिन इंटरैक्टिविटी जोड़ने में बहुत सोचने की आवश्यकता होती है और थोड़ी सी टाइपिंग होती है।

अपने डेटा मॉडल से UI को रेंडर करने के लिए अपने कंपोनेंट्स को बनाएं, जो अन्य कंपोनेंट्स ([components](/learn/your-first-component)) को पुनर्बभाजन करते हैं और प्रॉप्स ([props](/learn/passing-props-to-a-component)) का उपयोग करके डेटा पास करते हैं। प्रॉप्स (props) एक तरीका हैं जिससे पैरेंट से चाइल्ड कोमपोनेन्ट तक डेटा पास करने का। (यदि आप  [state](/learn/state-a-components-memory) की अवधारणा से परिचित हैं, तो इस स्थायी संस्करण को बनाने के लिए state का उपयोग न करें। state को केवल इंटरैक्टिविटी के लिए रखा गया है, अर्थात्, जो डेटा समय समय पर बदलता है। क्योंकि यह एक स्थैतिक संस्करण है, इसकी आपको ज़रूरत नहीं है।)

आप या तो "टॉप-डाउन" (top-down) से शुरू करके हायरार्की में स्थित कंपोनेंट्स (जैसे `FilterableProductTable`) बना सकते हैं या "बॉटम-अप" (bottom-up) से निचले स्तर के कंपोनेंट्स (जैसे `ProductRow`) का काम कर सकते हैं। सरल उदाहरणों में, आम तौर पर टॉप-डाउन जाना आसान होता है, और बड़े परियोजनाओं में, बॉटम-अप जाना आसान होता है।

<Sandpack>

```jsx App.js
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 10px;
}
td {
  padding: 2px;
  padding-right: 40px;
}
```

</Sandpack>

(यदि यह कोड आपको ठीक से समझ नहीं आ रहा है, तो पहले [Quick Start](/learn/) पढ़ें।)

कंपोनेंट्स बनाने के बाद, आपके पास पुनर्योग्य कंपोनेंट्स की एक लाइब्रेरी होगी जो आपके डेटा मॉडल को रेंडर करती है। यह स्थैतिक (static) ऐप है, इसलिए कंपोनेंट्स केवल JSX वापस लौटाते हैं। पदानुक्रम के शीर्ष स्तर के कंपोनेंट (`FilterableProductTable`) में आपके डेटा मॉडल को प्रॉप्स के रूप में लिया जाएगा। इसे _एक-तरफ़ा डेटा प्रवाह_ (one-way data flow) कहा जाता है क्योंकि डेटा शीर्ष स्तरीय कंपोनेंट से नीचे स्तरीय कंपोनेंटों तक बहता है।

<Pitfall>

इस चरण पर, आपको किसी भी state मूल्य का उपयोग नहीं करना चाहिए। यह अगले चरण में है!

</Pitfall>

## Step 3: यूआई स्थिति (UI state) का न्यूनतम पूर्ण प्रतिनिधि खोजें {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

To make the UI interactive, you need to let users change your underlying data model. You will use *state* for this.

UI को इंटरैक्टिव बनाने के लिए, आपको उपयोगकर्ताओं को अपने अंतर्निहित डेटा मॉडल को बदलने देने की आवश्यकता होती है। इसके लिए आप *state* का उपयोग करेंगे।

State को एक ऐसे छोटे सेट के रूप में सोचें जो आपके ऐप को याद रखने की आवश्यकता है। state को संरचित करने के लिए सबसे महत्वपूर्ण सिद्धांत है उसे [DRY (Don't Repeat Yourself).](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (खुद न दोहराना) रखना। अपने ऐप्लिकेशन की आवश्यकता state के अव्यवस्था संबंधी न्यूनतम प्रतिनिधि खोजें और बाकी सब कुछ अनुरोधानुसार गणना करें। उदाहरण के लिए, यदि आप एक खरीदी की सूची बना रहे हैं, तो आप आइटम को एक अर्रे में स्थानांतरित करके state में संग्रहीत कर सकते हैं। यदि आप लिस्ट में आइटमों की संख्या भी प्रदर्शित करना चाहते हैं, तो आइटमों की संख्या को एक अलग state मान नहीं रखें--इसके बजाय, अपने array की लंबाई को पढ़ें।

अब इस उदाहरण ऐप्लिकेशन में सभी डेटा के बारे में सोचें:

1. प्रोडक्ट्स की मूल सूची
2. उपयोगकर्ता ने दर्ज किया हुआ खोज टेक्स्ट
3. चेकबॉक्स के मान
4. फ़िल्टर की गई प्रोडक्ट्स की सूची

इनमें से कौन सा state है? उन्हें खोजें जो state नहीं है:

* क्या यह समय समय पर **अपरिवर्तनशील** रहता है? यदि हां, तो यह state नहीं है।
* क्या यह **पैरेंट से प्राप्त किया जाता** है प्रॉप्स के रूप में? यदि हां, तो यह स्थिति नहीं है।
* क्या आप इसे **कंपोनेंट में मौजूदा state या props से गणना कर सकते** हैं? यदि हां, तो यह स्थिति निश्चित रूप से नहीं है!

What's left is probably state.
जो बचा हुआ है, संभवतः वो एक state है। 

उन्हें एक बार फिर से एक एक करके देखते हैं:

1. प्रोडक्ट्स की मूल सूची **props के रूप में पारित होती है, इसलिए यह state नहीं है।**
2. सर्च टेक्स्ट state के रूप में लगता है क्योंकि इसका समय के साथ बदलना चाहिए और इसे कुछ से भी गणना नहीं किया जा सकता है।
3. चेकबॉक्स के मान state के रूप में लगते हैं क्योंकि इसका समय के साथ बदलना चाहिए और इसे कुछ से भी गणना नहीं किया जा सकता है।
4. फ़िल्टर हुए प्रोडक्ट्स की सूची **state नहीं है क्योंकि इसे गणना किया जा सकता है**, मूल प्रोडक्ट्स की सूची लें और सर्च टेक्स्ट और चेकबॉक्स के मान के अनुसार फ़िल्टर करें।

इसका मतलब है कि केवल सर्च टेक्स्ट और चेकबॉक्स के मान ही state है!

<DeepDive>

#### Props vs State {/*props-vs-state*/}

React में दो प्रकार के "मॉडल" डेटा होते हैं: प्रोप्स (props) और स्थिति (state)। ये दोनों बहुत अलग होते हैं:

* [**Props** एक फ़ंक्शन को पारित करने वाले तर्क की तरह होते हैं।](/learn/passing-props-to-a-component) इसके द्वारा एक पैरेंट कंपोनेंट डेटा को एक चाइल्ड कंपोनेंट में पास करता है और उसकी दिखावट को अनुकूलित करता है। उदाहरण के लिए, एक फ़ॉर्म एक बटन को एक रंग प्रोप पास कर सकता है।
* [**State** एक कंपोनेंट की स्मृति (memory) की तरह होती है।](/learn/state-a-components-memory) इसके द्वारा कंपोनेंट इन्टरैक्शन के प्रतिक्रिया के अनुसार कुछ जानकारी रखता है और इसे बदल सकता है। उदाहरण के लिए, एक बटन (`Button`) `isHovered` state का पता रख सकता है।

प्रोप्स और state अलग होते हैं, लेकिन वे एक साथ काम करते हैं। एक पैरेंट कंपोनेंट अक्सर state में कुछ जानकारी रखेगा (ताकि वो इसे बदल सके) और इसे चाइल्ड कंपोनेंट्स को उनके **प्रोप्स के रूप में पास करेगा**। पहले पढ़ने पर यदि यह अंतर अभी भी अस्पष्ट लग रहा है, तो इसे समझने में कुछ समय लगेगा!

</DeepDive>

## Step 4: state का स्थान निर्धारित करें {/*step-4-identify-where-your-state-should-live*/}

अपने ऐप में सबसे कम डेटा वाले state की पहचान करने के बाद, आपको यह निर्धारित करना होगा कि कौन सा कंपोनेंट इस state को बदलने के लिए जिम्मेदार है, या इसे मालिकीकरण करता है। याद रखें: React एक-तरफा डेटा फ़्लो उपयोग करता है, जो मूल कंपोनेंट से नीचे से ऊपर के कंपोनेंट तक कंपोनेंट व्यावसायिकी से पारंपरिक डेटा को भेजता है। यदि आप इस अवधारणा से नए हैं, तो यह समझना मुश्किल हो सकता है, लेकिन आप इसे इन चरणों का पालन करके समझ सकते हैं!

अपने ऐप में प्रत्येक state के लिए:

1. उन *सभी* कंपोनेंट की पहचान करें जो उस state के आधार पर कुछ भी रेंडर करते हैं।
2. उनके सभी करीबी सामान्य मूल कंपोनेंट का पता लगाएं--जो वे सभी विषय के ऊपर पदानुक्रम में हैं।
3. state को कहाँ रखना तय करें:
    1. आम तौर पर, आप state को सीधे उनके सामान्य मूल कंपोनेंट में डाल सकते हैं।
    2. आप state को उनके सामान्य मूल कंपोनेंट से ऊपर के कंपोनेंट में भी रख सकते हैं।
    3. यदि आपको एक ऐसा कंपोनेंट नहीं मिलता है जहां state को मालिकीकरण करना संभव हो, तो state को धारित करने के लिए एक नया कंपोनेंट बना सकते हैं और उसे सामान्य मूल कंपोनेंट के ऊपरी पदानुक्रम में कहीं जोड़ सकते हैं।

पिछले चरण में, आपने इस ऐप्लिकेशन में दो state के टुकड़े खोजे: सर्च इनपुट टेक्स्ट और चेकबॉक्स के मान। इस उदाहरण में, वे हमेशा साथ में दिखते हैं, इसलिए उन्हें एक ही स्थान पर रखना सही होगा।

अब आगे चलकर हम उनके लिए अपनी रणनीति का अनुसरण करेंगे:

1. **स्थिति का उपयोग करने वाले कंपोनेंट की पहचान करें:**
    * `ProductTable` को उस state के आधार पर प्रोडक्ट सूची को फ़िल्टर करने की आवश्यकता है (सर्च टेक्स्ट और चेकबॉक्स के मान)।
    * `SearchBar` को उस state का विवरण दिखाने की आवश्यकता है (सर्च टेक्स्ट और चेकबॉक्स के मान)।
1. **उनके सामान्य पैरेंट कंपोनेंट का पता लगाएं:** जो पहले पैरेंट कंपोनेंट दोनों कंपोनेंट को साझा करते हैं, वह है `FilterableProductTable`। 
2. **state को रखने के लिए निर्णय लें:** हम filterText और inStockOnly state मूल्यों को `FilterableProductTable` में रखेंगे।

इसलिए स्थिति मूल्य `FilterableProductTable` में रहेंगे।

[`useState()` Hook](/reference/react/useState) के साथ कंपोनेंट को state जोड़ें। हुक्स विशेष फ़ंक्शन हैं जो रिएक्ट में "हुक इंटो" करने की अनुमति देते हैं। `FilterableProductTable` के शीर्ष पर दो state चर को जोड़ें और उनके प्रारंभिक state को निर्दिष्ट करें:



```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);  
```

फिर, `filterText` और `inStockOnly` को `ProductTable` और `SearchBar` को props के रूप में पास करें:

```js
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

आप शुरू में देख सकते हैं कि आपका ऐप्लिकेशन कैसे व्यवहार करेगा। सैंडबैक कोड में नीचे दिए गए सैंडबैक कोड में `filterText` की प्रारंभिक मूल्य को `useState('')` से `useState('fruit')` में बदलें। आप देखेंगे कि सर्च इनपुट टेक्स्ट और तालिका अपडेट होती हैं:

<Sandpack>

```jsx App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 5px;
}
td {
  padding: 2px;
}
```

</Sandpack>

ध्यान दें कि फॉर्म संपादित करना अभी तक काम नहीं कर रहा है। संदर्भ ऊपर दिए गए सैंडबैक में एक कंसोल त्रुटि (console error) है जो इसका विवरण देती है:

<ConsoleBlock level="error">

आपने एक फ़ॉर्म फ़ील्ड को \`onChange\` हैंडलर के बिना एक \`value\` प्रॉप प्रदान किया है। यह एक रीड-ओन्ली फ़ील्ड रेंडर करेगा।

</ConsoleBlock>

ऊपर दिए गए सैंडबैक कोड में `ProductTable` और `SearchBar` state
`filterText` और `inStockOnly` प्रोप्स को पढ़कर तालिका, इनपुट और चेकबॉक्स को रेंडर करते हैं। उदाहरण के लिए, यहां `SearchBar` इनपुट वैल्यू को कैसे पॉपुलेट करता है:

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
```

हालांकि, आपने अभी तक यूज़र की प्रकिरीय का जवाब देने के लिए कोई कोड नहीं जोड़ा है। यह आपका अंतिम चरण होगा।


## Step 5: inverse data flow (पालटती डेटा प्रवाह) जोड़ें {/*step-5-add-inverse-data-flow*/}

वर्तमान में आपका ऐप प्रोप्स और state के साथ अनुकूलित रूप से रेंडर होता है। लेकिन यूजर इनपुट के अनुसार state को बदलने के लिए, आपको पालटती डेटा प्रवाह को समर्थन करने की आवश्यकता होगी: पदानुक्रम में गहरे फ़ॉर्म कंपोनेंट्स को अपडेट करने के लिए `FilterableProductTable` में state को अपडेट करने की जरूरत है।

React इस डेटा प्रवाह को स्पष्ट बनाता है, लेकिन यह दो-तरफ़ा डेटा बाइंडिंग से थोड़ा ज्यादा टाइपिंग की आवश्यकता है। यदि आप ऊपर दिए गए उदाहरण में टाइप करने या चेकबॉक्स को चेक करने का प्रयास करें, तो आप देखेंगे कि React आपके इनपुट को नज़रअंदाज़ करता है। यह इच्छित है। `<input value={filterText} />` लिखकर, आपने `input` के `value` प्रॉप को हमेशा `FilterableProductTable` से आये `filterText` state से बराबर सेट कर दिया है। क्योंकि `filterText` state कभी नहीं सेट की जाती है, इनपुट कभी नहीं बदलता है।

आप चाहते हैं कि जब भी यूजर फ़ॉर्म इनपुट को बदलता है, state उसे प्रतिबिम्बित करने के लिए अपडेट हो। state `FilterableProductTable` के पास है, इसलिए केवल वही `setFilterText` और `setInStockOnly` को कॉल कर सकता है। `SearchBar` को `FilterableProductTable` की state को अपडेट करने की अनुमति देने के लिए, आपको इन फ़ंक्शन्स को `SearchBar` को पारित करने की आवश्यकता है:

```js {2,3,10,11}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

`SearchBar` में, आप `onChange` इवेंट हैंडलर्स को जोड़ेंगे और उन्हें वहाँ से पेरेंट state को सेट करेंगे:

```js {5}
<input 
  type="text" 
  value={filterText} 
  placeholder="Search..." 
  onChange={(e) => onFilterTextChange(e.target.value)} />
```

अब ऐप्लिकेशन पूरी तरह से कार्यरत है!

<Sandpack>

```jsx App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding: 4px;
}
td {
  padding: 2px;
}
```

</Sandpack>

आप [Adding Interactivity](/learn/adding-interactivity) सेक्शन मे इवेंट्स को हैंडल करना और state को अपडेट करने के बारे मे और सीख सकते हैं।

## यहाँ से आगे कहाँ जाएं? {/*where-to-go-from-here*/}

यह एक React कंपोनेंट और एप्लिकेशन को कैसे बनाने के बारे में एक बहुत संक्षेप्त परिचय था। आप एक [React प्रोजेक्ट शुरू कर सकते](/learn/installation) हैं अभी या इस ट्यूटोरियल में उपयोग किए गए [सभी सिंटैक्स](/learn/describing-the-u) पर अधिक गहराई से जानकारी प्राप्त करें।
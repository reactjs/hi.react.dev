---
title: React में सोचें
---

<Intro>

React आपके द्वारा देखे जाने वाले डिज़ाइन और आपके द्वारा बनाए गए ऍप्स के बारे में आपके सोचने के तरीके को बदल सकता है। जहां एक बार आपने जंगल को देखा है, React के साथ काम करने के बाद, आप अलग-अलग पेड़ों की सराहना करेंगे। React डिजाइन सिस्टम और UI states में सोचना आसान बनाता है। इस टुटोरिअल में, हम आपको सर्च होने वाले प्रोडक्ट डाटा टेबल को React के साथ बनाए के तरीके के बारे में गाइड करेंगे।

</Intro>

## मॉकअप के साथ शुरू करें {/*start-with-the-mockup*/}

कल्पना करें कि आपके पास पहले से ही एक JSON API और एक डिजाइनर से दिया गया मॉकअप है।

JSON API कुछ डेटा लौटाता है जो इस तरह दिखता है:

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

मॉकअप इस तरह दिखता है:

<img src="/images/docs/s_thinking-in-react_ui.png" width="300" style={{margin: '0 auto'}} />

React में UI को लागू करने के लिए, आप आमतौर पर इन्ही पांच स्टेप्स का पालन करेंगे।

## Step 1: UI को कौम्पोनॅन्ट हायरार्की में बांटें {/*step-1-break-the-ui-into-a-component-hierarchy*/}

मॉकअप में प्रत्येक कौम्पोनॅन्ट और सबकौम्पोनॅन्ट के चारों ओर बॉक्स बनाकर शुरू करें और उनका नामकरण करें। यदि आप किसी डिज़ाइनर के साथ काम करते हैं, तो हो सकता है कि उन्होंने अपने डिज़ाइन टूल में इन कौम्पोनॅन्टस का नाम पहले ही रख लिया हो। उनके साथ चेक करलें!

आपकी बैकग्राउंड के आधार पर, आप किसी डिज़ाइन को विभिन्न तरीकों से कौम्पोनॅन्टस में बांटने करने के बारे में सोच सकते हैं:

- **Programming**--आपको एक नया फंक्शन बनाना है या ऑब्जेक्ट ये डीडे करने के लिए एक ही तरकीब इस्तेमाल करें। [सिंगल रिस्पांसिबिलिटी प्रिंसिपल](https://en.wikipedia.org/wiki/Single_responsibility_principle) ऐसे ही एक तकनीक है, जिसमें, एक कौम्पोनॅन्ट को सिर्फ एक ही काम करना चाहिए। अगर वो कौम्पोनॅन्ट ज़्यादा बड़ा हो रहा है, तो उसे छोटे कौम्पोनॅन्टस में बाँट दें।
- **CSS**--विचार करें कि आप किसके लिए क्लास सेलेक्टर्स को बनाते हैं। (हालांकि, कौम्पोनॅन्ट थोड़ा काम डिटेल में होते है।)
- **Design**--विचार करें कि आप डिज़ाइन लेयर्स को कैसे व्यवस्थित करेंगे।

अगर आपका JSON अच्छी तरह से स्ट्रक्चर्ड है, तो आप अक्सर पाएंगे कि यह स्वाभाविक रूप से आपके UI के कौम्पोनॅन्ट स्ट्रक्चर से लिए मैप करता है। ऐसा इसलिए है क्योंकि UI और डेटा मॉडल में अक्सर एक ही सूचना आर्किटेक्चर होती है -- यानी, एक ही आकार है। अपने UI कौम्पोनॅन्टस को बांटें, जहां प्रत्येक कौम्पोनॅन्ट आपके डेटा मॉडल के एक भाग से मेल खाता हो।

इस स्क्रीन पर पांच कौम्पोनॅन्टस हैं:

<FullWidth>

<CodeDiagram flip>

<img src="/images/docs/s_thinking-in-react_ui_outline.png" width="500" style={{margin: '0 auto'}} />

1. `FilterableProductTable` (grey) पूरा ऐप शामिल है।
2. `SearchBar` (blue) यूजर इनपुट प्राप्त करता है।
3. `ProductTable` (lavender) यूजर इनपुट के अनुसार सूची को डिस्प्ले और फ़िल्टर करता है।
4. `ProductCategoryRow` (green) हर केटेगरी के लिए एक शीर्षक डिस्प्ले करता है।
5. `ProductRow` (yellow) हर प्रोडक्ट के लिए एक पंक्ति डिस्प्ले करता है।

</CodeDiagram>

</FullWidth>

यदि आप `ProductTable` (लैवेंडर) को देखते हैं, तो आप देखेंगे कि टेबल का हैडर (जिसमें "Name" और "Price" लेबल शामिल हैं) इसका अपना कौम्पोनॅन्ट नहीं है। यह अपनी पसंद का मामला है, और आप किसी भी तरह से कर सकते हैं। इस उदाहरण के लिए, यह `ProductTable` का एक हिस्सा है क्योंकि यह `ProductTable` सूची के अंदर दिखाई देता है। हालांकि, अगर यह हैडर काम्प्लेक्स हो जाता है (उदाहरण के लिए, यदि आप सॉर्टिंग ऐड करते हैं), तब ऐसे अपना खुद का `ProductTableHeader` कौम्पोनॅन्ट बनाना सही रहेगा।

अब जब आपने मॉकअप में कौम्पोनॅन्ट की पहचान की है, तो उन्हें हायरार्की में व्यवस्थित करें। कौम्पोनॅन्ट जो मॉकअप में एक और कौम्पोनॅन्ट के भीतर दिखाई देता है हायरार्की में एक चाइल्ड के रूप में दिखनाा चाहिए:

* `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
        * `ProductCategoryRow`
        * `ProductRow`

## Step 2: React में स्टैटिक वर्शन बनाएं {/*step-2-build-a-static-version-in-react*/}

अब जब आपके पास आपका कौम्पोनॅन्ट हायरार्की है, तो अब आपके एप्प को बनाने का समय है। सबसे सरल अप्प्रोअच एक वर्शन बनाना है जो किसी भी इंटरएक्टिविटी को ऐड करे बिना अपने डेटा मॉडल से UI रेंडर करता है... अभी तक! अक्सर स्टैटिक वर्शन को पहले बनाना और फिर अलग-अलग इंटरएक्टिविटी ऐड करना आसान होता है। एक स्टैटिक वर्शन बनाने के लिए बिना सोचे बहुत सारे टाइपिंग की आवश्यकता होती है, लेकिन इंटरएक्टिविटी को ऐड करने में बहुत कुछ सोचने और कम टाइपिंग की आवश्यकता होती है।

एप्प का स्टैटिक वर्शन बनाने के लिए जो आपके डाटा मॉडल को रेंडर करे, उसके लिए आप दूसरा कौम्पोनॅन्टस इस्तेमाल करकेक उसमें डेटा [props](/learn/passing-props-to-a-component) से भेजने के बजाये आप [कौम्पोनॅन्टस](/learn/your-first-component) बनाना चाहेंगे।  Props डेटा को पैरेंट से चाइल्ड तक पास करने का तरीका है।(अगर आप [state](/learn/state-a-components-memory) के कांसेप्ट के बारे में जानते है, तो स्टैटिक वर्शन बनाने के लिए state बिलकुल भी इस्तेमाल न करे।  State सिर्फ इंटरएक्टिविटी के लिए रखा गया है, जो की, ऐसा डेटा जो वक़्त के साथ बदलता है। आप को इसकी ज़रूरत नहीं है, क्यूंकि ये एप्प का स्टैटिक वर्शन है।)

आप हायरार्की में ऊपर के कौम्पोनॅन्टस के निर्माण के साथ शुरुआत करके या तो "टॉप डाउन" बना सकते हैं (`FilterableProductTable` की तरह) या नीचे के कौम्पोनॅन्टस से काम करके "बॉटम अप" (`ProductRow` की तरह)। सरल उदाहरणों में, आमतौर पर टॉप-डाउन जाना आसान होता है, और बड़े प्रोजेक्ट्स पर, बॉटम-अप जाना आसान होता है।

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
   padding: 5px;
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

**अगर यह कोड उदाहरण डरावना दिखता है तो झल्लाहट मत करो!** इस गाइड में, हम कोड की बजाय अवधारणाओं पर ध्यान केंद्रित कर रहे हैं। बुकमार्क करना सुनिश्चित करें [UI का वर्णन](/learn/describing-the-ui) जो आपको अंतराल में भरने और इस कोड को समझने में मदद करेगा।

अपने कौम्पोनॅन्ट के निर्माण के बाद, आपके पास पुन: प्रयोज्य कौम्पोनॅन्ट की एक पुस्तकालय होगी जो आपके डेटा मॉडल को प्रस्तुत करते हैं। चूंकि यह एक स्थिर ऐप है, कौम्पोनॅन्ट केवल जेएसएक्स वापस कर देंगे। पदानुक्रम के शीर्ष पर कौम्पोनॅन्ट (`FilterableProductTable`) इसे *ऑन-वे डेटा फ्लो* कहा जाता है क्योंकि डेटा पेड़ के निचले हिस्से में शीर्ष-स्तरीय कौम्पोनॅन्ट से नीचे बहती है।

<Gotcha>
  
इस बिंदु पर, आपको किसी भी राज्य मूल्यों का उपयोग नहीं करना चाहिए।यह अगले कदम के लिए है!

</Gotcha>

## Step 3: UI राज्य का न्यूनतम लेकिन पूर्ण प्रतिनिधित्व खोजें {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

UI को इंटरैक्टिव बनाने के लिए, आपको उपयोगकर्ताओं को अपने अंतर्निहित डेटा मॉडल को बदलने की आवश्यकता है। आप इसके लिए *राज्य* का उपयोग करेंगे।

राज्य के बारे में सोचें कि आपके ऐप को याद रखने वाले डेटा के न्यूनतम सेट के रूप में सोचें। राज्य की संरचना के लिए सबसे महत्वपूर्ण सिद्धांत इसे रखना है[DRY (Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)). अपने आवेदन की जरूरतों के पूर्ण न्यूनतम प्रतिनिधित्व को समझें और मांग पर बाकी सबकुछ की गणना करें। उदाहरण के लिए, यदि आप खरीदारी सूची बना रहे हैं, तो आप वस्तुओं को राज्य में एक सरणी के रूप में स्टोर कर सकते हैं। यदि आप सूची में वस्तुओं की संख्या भी प्रदर्शित करना चाहते हैं, तो वस्तुओं की संख्या को किसी अन्य राज्य मूल्य के रूप में संग्रहीत न करें - इसके बजाय, अपनी सरणी की लंबाई पढ़ें।

अब इस उदाहरण में डेटा के सभी टुकड़ों के बारे में सोचें आवेदन:

1. उत्पादों की मूल सूची
2. उपयोगकर्ता द्वारा दर्ज किया गया खोज पाठ
3. चेकबॉक्स का मान
4. उत्पादों की फ़िल्टर सूची

इनमें से कौन सा राज्य है?उन लोगों की पहचान करें जो नहीं हैं:


- क्या यह ** समय के साथ अपरिवर्तित ** रहता है?यदि हां, तो यह राज्य नहीं है।
- क्या यह ** एक माता-पिता से ** प्रोप के माध्यम से पारित किया गया है?यदि हां, तो यह राज्य नहीं है।
- ** क्या आप इसकी गणना कर सकते हैं ** मौजूदा राज्य या प्रोप के आधार पर आपके कपम्पोनेंट में?यदि हां, तो यह *निश्चित रूप से* राज्य नहीं है!

क्या बचा है शायद राज्य है।

आइए उनसे एक-एक करके फिर से जाएं:

1. उत्पादों की मूल सूची ** प्रोप के रूप में पारित है, इसलिए यह राज्य ** नहीं है।
2. खोज पाठ राज्य प्रतीत होता है क्योंकि यह समय के साथ बदलता है और किसी भी चीज़ से गणना नहीं की जा सकती है।
3. चेकबॉक्स का मान राज्य प्रतीत होता है क्योंकि यह समय के साथ बदलता है और किसी भी चीज़ से गणना नहीं की जा सकती है।
4. उत्पादों की फ़िल्टर सूची ** राज्य नहीं है क्योंकि इसे उत्पादों की मूल सूची लेकर और चेकबॉक्स के मूल्य के अनुसार इसे फ़िल्टर करके गणना की जा सकती है।

इसका मतलब केवल खोज पाठ और चेकबॉक्स का मान राज्य है!अच्छी तरह से किया!
<DeepDive title="Props vs State">

प्रतिक्रिया में दो प्रकार के "मॉडल" डेटा हैं: प्रोप और राज्य। दोनों बहुत अलग हैं:

- [** प्रोप ** आपके द्वारा पास किए गए तर्कों की तरह हैं](/learn/passing-props-to-a-component) एक समारोह के लिए.उन्होंने एक मूल घटक को एक बाल घटक को डेटा पास करने और इसकी उपस्थिति को अनुकूलित करने दिया। उदाहरण के लिए, एक 'फॉर्म' एक 'रंग' प्रोप को 'बटन' पास कर सकता है।
- [** राज्य ** एक कुम्पोनान्ट की स्मृति की तरह है।](/learn/state-a-components-memory) यह एक कुम्पोनानेंट को कुछ जानकारी का ट्रैक रखने देता है और इंटरैक्शन के जवाब में इसे बदल देता है। उदाहरण के लिए, एक 'बटन' `Ishovered` राज्य का ट्रैक रख सकता है।

प्रोप और राज्य अलग हैं, लेकिन वे एक साथ काम करते हैं।एक माता-पिता कुम्पोनानेंट अक्सर राज्य में कुछ जानकारी रखेगा (ताकि यह इसे बदल सके), और इसे अपने प्रोप के रूप में बाल घटकों के लिए नीचे_पास करें। यह ठीक है अगर अंतर अभी भी पहले पढ़ने पर अस्पष्ट महसूस करता है।वास्तव में छड़ी के लिए यह थोड़ा अभ्यास करता है!

</DeepDive>

## Step 4: पहचानें कि आपके राज्य को कहाँ रहना चाहिए {/*step-4-identify-where-your-state-should-live*/}

अपने ऐप के न्यूनतम राज्य डेटा की पहचान करने के बाद, आपको यह पहचानने की आवश्यकता है कि इस राज्य को बदलने के लिए कौन सा कुम्पोनान्ट जिम्मेदार है, या *OWNS* राज्य. Remember: प्रतिक्रिया एक-तरफा डेटा प्रवाह का उपयोग करती है, जो माता-पिता से बाल घटक तक घटक पदानुक्रम के नीचे डेटा पारित करती है। यह तुरंत स्पष्ट नहीं हो सकता है कि कौन सा कंड्पोनेंट का मालिक होना चाहिए। यदि आप इस अवधारणा के लिए नए हैं तो यह चुनौतीपूर्ण हो सकता है, लेकिन आप इन चरणों का पालन करके इसे समझ सकते हैं!

आपके आवेदन में राज्य के प्रत्येक टुकड़े के लिए:
1. *हर* घटक की पहचान करें जो उस राज्य के आधार पर कुछ प्रस्तुत करता है।
2. उनके निकटतम सामान्य मूल घटक को खोजें- पदानुक्रम में उन सभी के ऊपर एक घटक।
3. तय करें कि राज्य को कहाँ रहना चाहिए:

   1. अक्सर, आप राज्य को सीधे उनके सामान्य माता-पिता में डाल सकते हैं।
   2. आप राज्य को उनके सामान्य माता-पिता के ऊपर कुछ घटक में भी डाल सकते हैं।
   3. यदि आपको कोई ऐसा घटक नहीं मिल रहा है, जहां राज्य का स्वामित्व होना समझ में आता है, तो केवल राज्य को धारण करने के लिए एक नया घटक बनाएं और इसे सामान्य मूल घटक के ऊपर पदानुक्रम में कहीं जोड़ें।

पिछले चरण में, आपको इस एप्लिकेशन में दो राज्य मिले: खोज इनपुट टेक्स्ट, और चेकबॉक्स का मान। इस उदाहरण में, वे हमेशा एक साथ दिखाई देते हैं, इसलिए उन्हें राज्य के एक टुकड़े के रूप में सोचना आसान है।

आइए अब इस राज्य के लिए अपनी रणनीति पर चलते हैं:

1. राज्य का उपयोग करने वाले घटकों की पहचान करें:
   - `ProductTable` उस स्थिति (खोज टेक्स्ट और चेकबॉक्स मान) के आधार पर उत्पाद सूची को फ़िल्टर करने की आवश्यकता है।
   - `SearchBar` उस स्थिति को प्रदर्शित करने की आवश्यकता है (खोज पाठ और चेकबॉक्स मान)।
2. उनके सामान्य पैरेंट का पता लगाएं: पहला पैरेंट कंपोनेंट दोनों कंपोनेंट शेयर करते हैं `FilterableProductTable।`

3. तय करें कि राज्य कहाँ रहता है : हम फ़िल्टर टेक्स्ट और चेक किए गए राज्य मानों को में रखेंगे `FilterableProductTable।`

तो राज्य के मूल्यों में रहेंगे `FilterableProductTable।`

[`useState()` Hook](/reference/usestate) के साथ घटक में राज्य जोड़ें । हुक आपको एक घटक के [रेंडर चक्र](/learn/render-and-commit) में "हुक इन" करने देता है । के शीर्ष पर दो राज्य चर जोड़ें FilterableProductTableऔर अपने आवेदन की प्रारंभिक स्थिति निर्दिष्ट करें:
```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
```

फिर, पास `filterText` और `inStockOnly` को `ProductTable` और `SearchBar` प्रॉप्स के रूप में:

```js
<div>
  <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
  <ProductTable
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly}
  />
</div>
```

आप यह देखना शुरू कर सकते हैं कि आपका आवेदन कैसा व्यवहार करेगा। नीचे दिए गए सैंडबॉक्स कोड में `filterText` से आरंभिक मान संपादित करें । आपको खोज इनपुट टेक्स्ट और तालिका अपडेट दोनों दिखाई देंगे:`useState('')``useState('fruit')`

<Sandpack>

```jsx App.js
import {useState} from 'react';

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({product}) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{color: 'red'}}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({products, filterText, inStockOnly}) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
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

function SearchBar({filterText, inStockOnly}) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." />
      <label>
        <input type="checkbox" checked={inStockOnly} /> Only show products in
        stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: 'Fruits', price: '$1', stocked: true, name: 'Apple'},
  {category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit'},
  {category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit'},
  {category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach'},
  {category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin'},
  {category: 'Vegetables', price: '$1', stocked: true, name: 'Peas'},
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px;
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

उपरोक्त सैंडबॉक्स में, `ProductTable` और तालिका, इनपुट और चेकबॉक्स को रेंडर करने के लिए और प्रॉप्स `SearchBar` पढ़ें । उदाहरण के लिए, यहां बताया गया है कि इनपुट मान कैसे पॉप्युलेट करता है:`filterTextinStockOnlySearchBar`

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."/>
```


रिएक्ट राज्य का उपयोग कैसे करता है और आप इसके साथ अपने ऐप को कैसे व्यवस्थित कर सकते हैं, इस बारे में गहराई से जानने के लिए [प्रबंध राज्य](/learn/managing-state)का संदर्भ लें ।

## Step 5: उलटा डेटा प्रवाह जोड़ें {/*step-5-add-inverse-data-flow*/}

वर्तमान में आपका ऐप पदानुक्रम से नीचे की ओर बहने वाले प्रॉप्स और स्थिति के साथ सही ढंग से प्रस्तुत करता है। लेकिन उपयोगकर्ता इनपुट के अनुसार राज्य को बदलने के लिए, आपको दूसरे तरीके से बहने वाले डेटा का समर्थन करने की आवश्यकता होगी: पदानुक्रम में गहरे रूप के घटकों को राज्य में अद्यतन करने की आवश्यकता है `FilterableProductTable` ।

प्रतिक्रिया इस डेटा प्रवाह को स्पष्ट करती है, लेकिन इसे दो-तरफा डेटा बाध्यकारी की तुलना में थोड़ा और टाइपिंग की आवश्यकता होती है। यदि आप उपरोक्त उदाहरण में बॉक्स को टाइप या चेक करने का प्रयास करते हैं, तो आप देखेंगे कि प्रतिक्रिया आपके इनपुट को अनदेखा करती है। यह जानबूझकर है. `<input value={filterText} />` लिखकर, आप `input` के `value` प्रोप को हमेशा `FilterableProductTable ` से पारित `filterText` स्थिति के बराबर होने के लिए सेट करते हैं।चूंकि `filterText` राज्य कभी सेट नहीं होता है, इसलिए इनपुट कभी नहीं बदलता है।


आप इसे बनाना चाहते हैं ताकि जब भी उपयोगकर्ता फॉर्म इनपुट बदलता है, तो राज्य उन परिवर्तनों को प्रतिबिंबित करने के लिए अद्यतन करता है। राज्य के स्वामित्व में है `FilterableProductTable`, इसलिए केवल यह कॉल कर सकता है `setFilterText` और `setInStockOnly।` की स्थिति को `SearchBar` अपडेट करने देने के लिए `FilterableProductTable`, आपको इन कार्यों को नीचे पास करने की आवश्यकता है `SearchBar`:

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

`searchbar` के अंदर, आप `onchange` इवेंट हैंडलर जोड़ देंगे और उनसे मूल राज्य सेट करेंगे:
```js {5}
<input
  type="text"
  value={filterText}
  placeholder="Search..."
  onChange={(e) => onFilterTextChange(e.target.value)}
/>
```

अब आवेदन पूरी तरह से काम करता है!

<Sandpack>

```jsx App.js
import {useState} from 'react';

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({product}) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{color: 'red'}}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({products, filterText, inStockOnly}) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
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
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: 'Fruits', price: '$1', stocked: true, name: 'Apple'},
  {category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit'},
  {category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit'},
  {category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach'},
  {category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin'},
  {category: 'Vegetables', price: '$1', stocked: true, name: 'Peas'},
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px;
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

आप घटनाओं को संभालने और राज्य को अद्यतन करने के बारे में सब कुछ सीख सकते हैं [अंतःक्रियाशीलता जोड़ना](/learn/adding-interactivity) अनुभाग.

## यहाँ से कहाँ जाएं {/*where-to-go-from-here*/} {/*where-to-go-from-here-where-to-go-from-here*/}

रिएक्ट के साथ घटकों और अनुप्रयोगों के निर्माण के बारे में सोचने के लिए यह एक बहुत ही संक्षिप्त परिचय था। आप इस ट्यूटोरियल में [एक प्रतिक्रिया परियोजना शुरू करें](/learn/installation) या [सभी वाक्यविन्यास पर गहराई से गोता लगाएँ](/learn/describing-the-ui) इसमें उपयोग किया जाता है ट्यूटोरियल.

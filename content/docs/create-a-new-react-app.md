---
id: create-a-new-react-app
title: एक नया React एप्प बनाएं
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

सर्वश्रेष्ठ उपयोगकर्ता और डेवलपर अनुभव के लिए एक संघटित टूलचेन का उपयोग करें।

इस पृष्ठ में कुछ लोकप्रिय React टूलचेन का वर्णन किया गया है जो निम्न कार्यों में मदद करते हैं:

* कई फाइल्स और कौम्पोनॅन्टस के लिए स्केलिंग।
* Npm से थर्ड पार्टी लाइब्रेरीज का उपयोग करना।
* आम गलतियों का जल्द पता लगाना।
* डेवलपमेंट के दौरान CSS और JS का लाइव-संपादन।
* प्रोडक्शन के लिए ऑप्टिमाइज़ करना।

इस पेज पर सुझाए गए टूलचेनस को **आरंभ करने के लिए किसी प्रकार की कॉन्फ़िगरेशन की आवश्यकता नहीं है**।

## शायद आपको टूलचेन की आवश्यकता ना हो {#you-might-not-need-a-toolchain}

यदि आप ऊपर वर्णित समस्याओं का अनुभव नहीं करते हैं या अभी तक जावास्क्रिप्ट उपकरणों का उपयोग करने में सहज महसूस नहीं करते हैं, तो [एक HTML पृष्ठ पर एक सादे `<script>` टैग के रूप में React](/docs/add-react-to-a-website.html) को डाल कर देखें, वैकल्पिक रूप से [JSX के साथ](/docs/add-react-to-a-website.html#optional-try-react-with-jsx)।

किसी मौजूदा वेबसाइट में **React को एकीकृत करने का यह सबसे आसान तरीका भी है**। यदि आप इसे सहायक पाते हैं तो आप हमेशा एक बड़ा टूलचेन का उपयोग कर सकते हैं!

## अनुशंसित टूलचेनस {#recommended-toolchains}

React टीम मुख्य रूप से इन समाधानों को इस्तेमाल करने की सलाह देती है:

- यदि आप **React सीख** रहे हैं या **एक नए [एक पृष्ठ का](/docs/glossary.html#single-page-application) एप्प** बना रहे हैं, तो [Create React App](#create-react-app) का उपयोग करें।
- यदि आप **Node.js के साथ एक सर्वर द्वारा रेंडर की गयी वेबसाइट बना रहे हैं,** तो [Next.js](#nextjs) का उपयोग करें।
- यदि आप एक **स्टैटिक कंटेंट ओरिएंटेड वेबसाइट** का निर्माण कर रहे हैं, तो [Gatsby](#gatsby) का प्रयोग करें।
- यदि आप किसी **कौम्पोनॅन्ट लाइब्रेरी** का निर्माण कर रहे हैं या किसी **मौजूदा कोडबेस के साथ एकीकरण** कर रहे हैं, तो अधिक [लचीले टूलचेनस](#more-flexible-toolchains) का प्रयोग करें।

### Create React App {#create-react-app}

[Create React App](https://github.com/facebookincubator/create-react-app) **React सीखने** के लिए एक आरामदायक वातावरण है, और React में एक **नया [एक पृष्ठ का](/docs/glossary.html#single-page-application) एप्लिकेशन** बनाना शुरू करने का सबसे अच्छा तरीका है।

यह आपके डेवलपमेंट वातावरण को स्थापित करता है ताकि आप लेटेस्ट जावास्क्रिप्ट विशेषताएं का उपयोग कर सकें। यह आपको एक अच्छा डेवलपर अनुभव प्रदान करता है, और प्रोडक्शन के लिए आपके एप्प को ऑप्टिमाइज़ करता है। इसे उपयोग करने के लिए आपकी मशीन पर node >= 8.10 और npm >= 5.6 होना चाहिए। प्रोजेक्ट बनाने के लिए, रन करें:

```bash
npx create-react-app my-app
cd my-app
npm start
```

>Note
>
>`npx` पहली पंक्ति में एक टाइपो नहीं है -- यह एक [पैकेज रनर उपकरण है जो npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) के साथ आता है।

Create React App बैकएंड लॉजिक या डेटाबेस नहीं संभालता है; यह सिर्फ फ्रंटएंड बिल्ड पाइपलाइन बनाता है, इसलिए आप इसका उपयोग किसी भी बैकएंड के साथ कर सकते हैं। हुड के निचे, यह [Babel](https://babeljs.io/) और [webpack](https://webpack.js.org/) का उपयोग करता है, लेकिन आपको उनके बारे में कुछ भी जानने की आवश्यकता नहीं है।

जब आप प्रोडक्शन में डेप्लॉय करने के लिए तैयार होते हैं, तो `npm run build` चलाकर `build` फोल्डर में आपके एप्प का एक ऑप्टीमाइज़्ड बिल्ड होगा। आप Create React App के बारे में, [उसकी रीडमी से](https://github.com/facebookincubator/create-react-app#create-react-app--) और [यूजर गाइड से](https://facebook.github.io/create-react-app/) और जान सकते हैं।

### Next.js {#nextjs}

[Next.js](https://nextjs.org/), **स्टैटिक और सर्वर द्वारा रेंडर की गयी ऍप्लिकेशन्स** जो React में बनाई गयी है, उनके लिए एक लोकप्रिय और हल्का फ्रेमवर्क है। इसमें **स्टाइलिंग और राउटिंग समाधान** शामिल हैं, और यह मान लेता है कि आप सर्वर वातावरण के रूप में [Node.js](https://nodejs.org/) का उपयोग कर रहे हैं।

Next.js को इसकी [ऑफिसियल गाइड](https://nextjs.org/learn/) से सीखें।

### Gatsby {#gatsby}

React के साथ **स्टैटिक वेबसाइट** बनाने के लिए [Gatsby](https://www.gatsbyjs.org/) सबसे अच्छा तरीका है। यह आपको React कौम्पोनॅन्ट का उपयोग करने देता है, लेकिन सबसे तेज़ लोड समय की गारंटी के लिए HTML और CSS के पहले से रेंडर किए गए आउटपुट देता है।

Gatsby को इसकी[ऑफिसियल गाइड](https://www.gatsbyjs.org/docs/) और [स्टार्टर किटस की गैलरी](https://www.gatsbyjs.org/docs/gatsby-starters/) से सीखें।

### और लचीले टूलचेनस {#more-flexible-toolchains}

निम्नलिखित टूलचेनस अधिक लचीलापन और अधिक विकल्प प्रदान करते हैं। हम इन्हे अधिक अनुभवी उपयोगकर्ताओं के लिए सलाह देते हैं:

- **[Neutrino](https://neutrinojs.org/)** प्रीसेट की सादगी के साथ [webpack](https://webpack.js.org/) की शक्ति को जोड़ती है, और इसमें [React एप्पस](https://neutrinojs.org/packages/react/) and [React कौम्पोनॅन्टस](https://neutrinojs.org/packages/react-components/) के लिए प्रीसेट शामिल है।

- **[nwb](https://github.com/insin/nwb)** [React कौम्पोनॅन्टस को npm के लिए प्रकाशित ](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb) करने के लिए विशेष रूप से अच्छा है। React ऐप्स बनाने के लिए भी इसका [इस्तेमाल किया जा सकता है](https://github.com/insin/nwb/blob/master/docs/guides/ReactApps.md#developing-react-apps-with-nwb)।

- **[Parcel](https://parceljs.org/)** एक तेज़, बिना कॉन्फ़िगरेशन वाला वेब एप्लिकेशन बंडल है जो [React के साथ काम करता है](https://parceljs.org/recipes.html#react)।

- **[Razzle](https://github.com/jaredpalmer/razzle)** एक सर्वर-रेंडरिंग फ्रेमवर्क है जिसमें किसी भी कॉन्फ़िगरेशन की आवश्यकता नहीं होती है, लेकिन Next.js की तुलना में अधिक लचीलापन प्रदान करता है।

## स्क्रैच से एक टूलचेन बनाना {#creating-a-toolchain-from-scratch}

एक जावास्क्रिप्ट बिल्ड टूलचेन में आम तौर पर शामिल होते हैं:

* एक **package मैनेजर**, जैसे [Yarn](https://yarnpkg.com/) या [npm](https://www.npmjs.com/)। यह आपको थर्ड पार्टी पैकेज के विशाल इकोसिस्टम का लाभ उठाने देता है, और उन्हें आसानी से स्थापित या अपडेट करता है।

* एक **bundler**, जैसे [webpack](https://webpack.js.org/) या [Parcel](https://parceljs.org/)। यह आपको मॉड्यूलर कोड लिखने और लोड समय को ऑप्टिमाइज़ करने के लिए छोटे पैकेज में एक साथ बंडल करने देता है।

* एक **compiler**, जैसे [Babel](https://babeljs.io/)। यह आपको आधुनिक जावास्क्रिप्ट कोड लिखने देता है जो अभी भी पुराने ब्राउज़रों में काम करता है।

यदि आप स्क्रैच से अपना स्वयं का जावास्क्रिप्ट टूलचैन सेट करना पसंद करते हैं, [इस गाइड की जांच करें ](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) जो Create React App की कार्यक्षमता जैसे बनाता है।

यह सुनिश्चित करना न भूलें कि आपका कस्टम टूलचेन [प्रोडक्शन के लिए सही तरीके से सेट है](/docs/optimizing-performance.html#use-the-production-build)।

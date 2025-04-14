---
title: React ऐप बनाना
---

<Intro>

अगर आप React के साथ एक नया ऐप या वेबसाइट बनाना चाहते हैं, तो हम किसी फ्रेमवर्क से शुरू करने की सलाह देते हैं।

</Intro>

अगर आपके ऐप की ज़रूरतें किसी मौजूदा फ्रेमवर्क से अच्छी तरह पूरी नहीं हो पा रही हैं, आप अपना खुद का फ्रेमवर्क बनाना चाहते हैं, या आप सिर्फ React ऐप की बुनियादी चीज़ें सीखना चाहते हैं, तो आप [शुरू से एक React ऐप बनाना](/learn/build-a-react-app-from-scratch) सीख सकते हैं।

## फुल-स्टैक फ्रेमवर्क्स {/*full-stack-frameworks*/}

ये सुझाए गए फ्रेमवर्क्स वे सभी फ़ीचर्स सपोर्ट करते हैं जो आपकी ऐप को प्रोडक्शन में डिप्लॉय और स्केल करने के लिए ज़रूरी होते हैं। इनमें React के लेटेस्ट फ़ीचर्स इंटीग्रेट किए गए हैं और ये React की संरचना (architecture) का पूरा फ़ायदा उठाते हैं।

<Note>

#### फुल-स्टैक फ्रेमवर्क्स को सर्वर की ज़रूरत नहीं होती {/*react-frameworks-do-not-require-a-server*/}

इस पेज पर दिए गए सभी फ्रेमवर्क्स क्लाइंट-साइड रेंडरिंग ([CSR](https://developer.mozilla.org/en-US/docs/Glossary/CSR)),  सिंगल-पेज ऐप्स ([SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA)), और स्टैटिक-साइट जनरेशन ([SSG](https://developer.mozilla.org/en-US/docs/Glossary/SSG)) को सपोर्ट करते हैं। इन ऐप्स को बिना सर्वर के [CDN](https://developer.mozilla.org/en-US/docs/Glossary/CDN) या किसी स्टैटिक होस्टिंग सर्विस पर डिप्लॉय किया जा सकता है। इसके अलावा, ये फ्रेमवर्क्स आपको ज़रूरत पड़ने पर किसी भी रूट के लिए सर्वर-साइड रेंडरिंग जोड़ने की सुविधा भी देते हैं।

इससे आप शुरुआत में एक क्लाइंट-ओनली ऐप बना सकते हैं, और अगर आगे चलकर ज़रूरत बदले, तो आप बिना पूरी ऐप को दोबारा लिखे, किसी भी रूट पर सर्वर फ़ीचर्स जोड़ सकते हैं। रेंडरिंग स्ट्रैटेजी को कैसे कॉन्फ़िगर करें, इसके लिए अपने फ्रेमवर्क की डोक्यूमेंटेशन देखें।

</Note>

### Next.js का App Router {/*nextjs-app-router*/}

**[Next.js का App Router](https://nextjs.org/docs) एक React फ्रेमवर्क है जो React की आर्किटेक्चर का पूरा फ़ायदा उठाकर फुल-स्टैक React ऐप्स बनाने की सुविधा देता है।**

<TerminalBlock>
npx create-next-app@latest
</TerminalBlock>

Next.js को [Vercel](https://vercel.com/) द्वारा बनाए और मेंटेन किया जाता है। आप किसी भी Node.js या बिना सर्वर के (serverless) होस्टिंग पर, या अपने खुद के सर्वर पर [Next.js ऐप को डिप्लॉय](https://nextjs.org/docs/app/building-your-application/deploying) कर सकते हैं। Next.js [static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) को भी सपोर्ट करता है, जिसे सर्वर की ज़रूरत नहीं होती। Vercel अतिरिक्त रूप से चयन करने योग्य (ऑप्ट-इन) पेड क्लाउड सेवाएं भी प्रदान करता है।

### React Router (संस्करण 7) {/*react-router-v7*/}

**[React Router](https://reactrouter.com/start/framework/installation) के लिए सबसे लोकप्रिय राउटिंग लाइब्रेरी है और इसे Vite के साथ जोड़कर एक फुल-स्टैक React फ्रेमवर्क बनाया जा सकता है।** यह मानक Web API पर ज़ोर देता है और विभिन्न JavaScript रनटाइम और प्लेटफार्म्स के लिए [तैयार-डिप्लॉय टेम्प्लेट](https://github.com/remix-run/react-router-templates) प्रदान करता है।

नया React Router फ्रेमवर्क प्रोजेक्ट बनाने के लिए यह कमांड चलाएँ:

<TerminalBlock>
npx create-react-router@latest
</TerminalBlock>

React Router को [Shopify](https://www.shopify.com) द्वारा मेंटेन किया जाता है।

### Expo (नेटिव ऐप्स के लिए) {/*expo*/}

**[Expo](https://expo.dev/) एक React फ्रेमवर्क है जो आपको Android, iOS और Web के लिए यूनिवर्सल ऐप्स बनाने की सुविधा देता है, वो भी असली नेटिव UI के साथ।** यह [React Native](https://reactnative.dev/) के लिए एक SDK प्रदान करता है, जिससे नेटिव पार्ट्स का उपयोग करना आसान हो जाता है। नया Expo प्रोजेक्ट बनाने के लिए यह कमांड चलाएँ:

<TerminalBlock>
npx create-expo-app@latest
</TerminalBlock>

अगर आप Expo में नए हैं, तो [Expo ट्यूटोरियल](https://docs.expo.dev/tutorial/introduction/) जरूर देखें।

Expo को [Expo (कंपनी)](https://expo.dev/about) द्वारा मेंटेन किया जाता है। Expo के साथ ऐप बनाना फ्री है, और आप इन ऐप्स को बिना किसी रोक-टोक के Google और Apple के ऐप स्टोर में सबमिट कर सकते हैं। Expo कुछ ऑप्शनल पेड क्लाउड सेवाएं भी देता है, जिन्हें आप अपनी ज़रूरत के हिसाब से चुन सकते हैं।


## अन्य फ्रेमवर्क्स {/*other-frameworks*/}

कुछ और नए-नए फ्रेमवर्क्स हैं जो React टीम के फुल-स्टैक विज़न को पूरा करने की दिशा में काम कर रहे हैं:

- [TanStack Start (Beta)](https://tanstack.com/): TanStack Start एक फुल-स्टैक React फ्रेमवर्क है जो TanStack Router पर आधारित है। यह Nitro और Vite जैसे टूल्स का इस्तेमाल कर फुल-डॉक्यूमेंट SSR, स्ट्रीमिंग, सर्वर फंक्शन्स, और बंडलिंग जैसी सुविधाएं देता है।
- [RedwoodJS](https://redwoodjs.com/): RedwoodJS एक फुल-स्टैक React फ्रेमवर्क है जिसमें बहुत सारे पैकेज और सेटअप पहले से मौजूद होते हैं, जिससे फुल-स्टैक वेब ऐप बनाना आसान हो जाता है।

<DeepDive>

#### React टीम के फुल-स्टैक आर्किटेक्चर विज़न में कौन-कौन सी खूबियाँ शामिल हैं? {/*which-features-make-up-the-react-teams-full-stack-architecture-vision*/}

Next.js का App Router बंडलर पूरी तरह से आधिकारिक [React सर्वर कंपोनेंट स्पेसिफिकेशन](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) को लागू करता है। इसका मतलब है कि आप एक ही React ट्री में निर्माण का समय (build-time), सिर्फ सर्वर पर चलने वाले (server-only), और इंटरएक्टिव (संवादात्मक) कंपोनेंट को मिक्स कर सकते हैं।

उदाहरण के लिए, आप एक सिर्फ सर्वर (server-only) पर चलने वाले React कंपोनेंट को एक `async` फ़ंक्शन की तरह लिख सकते हैं जो डेटाबेस या किसी फाइल से डेटा पढ़ता है। फिर आप उस डेटा को नीचे इंटरएक्टिव कंपोनेंट तक पास कर सकते हैं:

```js
// This component runs *only* on the server (or during the build).
async function Talks({ confId }) {
  // 1. You're on the server, so you can talk to your data layer. API endpoint not required.
  const talks = await db.Talks.findAll({ confId });

  // 2. Add any amount of rendering logic. It won't make your JavaScript bundle larger.
  const videos = talks.map(talk => talk.video);

  // 3. Pass the data down to the components that will run in the browser.
  return <SearchableVideoList videos={videos} />;
}
```

Next.js का App Router [Suspense के साथ डेटा फेचिंग](/blog/2022/03/29/react-v18#suspense-in-data-frameworks) को भी इंटीग्रेट करता है। इससे आप अपने React ट्री में UI के अलग-अलग हिस्सों के लिए लोडिंग की state (जैसे कि अस्थायी ढांचा) को सीधे तय कर सकते हैं:

```js
<Suspense fallback={<TalksLoading />}>
  <Talks confId={conf.id} />
</Suspense>
```

Server Components (सर्वर कंपोनेंट) और Suspense दरअसल React की अपनी विशेषताएँ हैं, न कि केवल Next.js की। हालाँकि, इन्हें फ़्रेमवर्क स्तर पर अपनाने के लिए सहमति और जटिल इम्प्लीमेंटेशन कार्य की आवश्यकता होती है। फिलहाल, Next.js का App Router सबसे पूर्ण इम्प्लीमेंटेशन है। React टीम इस वक्त बंडलर डेवेलपर्स के साथ मिलकर काम कर रही है ताकि अगली जनरेशन के फ़्रेमवर्क में इन्हें इम्प्लीमेंट करना आसान हो सके।

</DeepDive>

## शुरुआत से शुरू करें (Start From Scratch) {/*start-from-scratch*/}

अगर आपकी ऐप की ज़रूरतें ऐसे फ्रेमवर्क्स से पूरी नहीं हो पा रही हैं जो पहले से मौजूद हैं, या आप अपना खुद का फ्रेमवर्क बनाना चाहते हैं, या बस React ऐप के बेसिक्स सीखना चाहते हैं — तो आपके पास शुरुआत से एक React प्रोजेक्ट बनाने के कुछ और विकल्प भी हैं।

शुरुआत से बनाना आपको ज़्यादा फ्लेक्सिबिलिटी देता है, लेकिन इसके साथ आपको यह भी तय करना पड़ता है कि राउटिंग, डेटा फेचिंग और बाकी कॉमन फीचर्स के लिए कौन-से टूल्स का इस्तेमाल करें। यह ठीक वैसा ही है जैसे आप खुद का फ्रेमवर्क बना रहे हों, बजाय इसके कि कोई पहले से बना हुआ फ्रेमवर्क लें। [हम जो फ्रेमवर्क्स सजेस्ट करते हैं](#full-stack-frameworks) उनमें ये समस्याओं के लिए पहले से ही (built-in) समाधान मौजूद होते हैं।

अगर आप अपने खुद के समाधान बनाना चाहते हैं, तो हमारा गाइड देखें: [React ऐप को शुरुआत से कैसे बनाएं](/learn/build-a-react-app-from-scratch) इसमें [Vite](https://vite.dev/), [Parcel](https://parceljs.org/), या [RSbuild](https://rsbuild.dev/) जैसे टूल्स से प्रोजेक्ट सेटअप करने की जानकारी दी गई है।

-----

_अगर आप कोई फ्रेमवर्क बना रहे हैं और इस पेज पर शामिल होना चाहते हैं, [तो कृपया हमें बताएं](https://github.com/reactjs/react.dev/issues/new?assignees=&labels=type%3A+framework&projects=&template=3-framework.yml&title=%5BFramework%5D%3A+)._।

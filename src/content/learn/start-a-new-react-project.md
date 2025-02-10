---
title: नया React प्रोजेक्ट शुरू करें
---

<Intro>

अगर आप पूरी तरह से React के साथ एक नया ऐप या वेबसाइट बनाना चाहते हैं, तो हम समुदाय में लोकप्रिय React-समर्थित फ्रेमवर्क में से एक चुनने की सलाह देते हैं। फ्रेमवर्क वे सुविधाएँ प्रदान करते हैं जिनकी ज्यादातर ऐप्स और साइट्स को अंततः आवश्यकता होती है, जैसे कि रूटिंग, डेटा फ़ेचिंग, और HTML जनरेशन।

</Intro>

<Note>

**स्थानीय विकास के लिए आपको [Node.js](https://nodejs.org/en/) इंस्टॉल करना होगा।** आप उत्पादन (production) में भी Node.js का उपयोग कर सकते हैं, लेकिन यह आवश्यक नहीं है। कई React फ्रेमवर्क एक स्टैटिक HTML/CSS/JS फ़ोल्डर में एक्सपोर्ट का समर्थन करते हैं।

</Note>

## प्रोडक्शन-ग्रेड React फ्रेमवर्क {/*production-grade-react-frameworks*/}

### Next.js {/*nextjs*/}

**[Next.js](https://nextjs.org/) एक फुल-स्टैक React फ्रेमवर्क है।** यह बहुपयोगी है और आपको किसी भी आकार के React ऐप्स बनाने की सुविधा देता है—एक ज्यादातर स्टैटिक ब्लॉग से लेकर एक जटिल डायनामिक एप्लिकेशन तक। एक नया Next.js प्रोजेक्ट बनाने के लिए, अपने टर्मिनल में चलाएँ:

<TerminalBlock>
npx create-next-app@latest
</TerminalBlock>

अगर आप Next.js में नए हैं, तो [Next.js कोर्स](https://nextjs.org/learn) देखें।

Next.js को [Vercel](https://vercel.com/) द्वारा मेंटेन किया जाता है। आप [Next.js ऐप को होस्ट कर सकते हैं](https://nextjs.org/docs/app/building-your-application/deploying) किसी भी Node.js या सर्वरलेस होस्टिंग पर, या अपने स्वयं के सर्वर पर। Next.js एक [स्टैटिक एक्सपोर्ट](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) भी सपोर्ट करता है, जो सर्वर की आवश्यकता नहीं रखता।

### Remix {/*remix*/}

**[Remix](https://remix.run/) एक फुल-स्टैक React फ्रेमवर्क है जिसमें नेस्टेड रूटिंग होती है।** यह आपको अपने ऐप को नेस्टेड हिस्सों में विभाजित करने की सुविधा देता है, जो डेटा को समानांतर में लोड कर सकते हैं और उपयोगकर्ता क्रियाओं के जवाब में रीफ्रेश हो सकते हैं। नया Remix प्रोजेक्ट बनाने के लिए चलाएँ:

<TerminalBlock>
npx create-remix
</TerminalBlock>

अगर आप Remix में नए हैं, तो [ब्लॉग ट्यूटोरियल](https://remix.run/docs/en/main/tutorials/blog) (छोटा) और [ऐप ट्यूटोरियल](https://remix.run/docs/en/main/tutorials/jokes) (लंबा) देखें।

Remix को [Shopify](https://www.shopify.com/) द्वारा मेंटेन किया जाता है। जब आप एक Remix प्रोजेक्ट बनाते हैं, तो आपको एक [डिप्लॉयमेंट टार्गेट चुनना होगा](https://remix.run/docs/en/main/guides/deployment)। आप एक [एडॉप्टर](https://remix.run/docs/en/main/other-api/adapter) का उपयोग करके इसे किसी भी Node.js या सर्वरलेस होस्टिंग पर होस्ट कर सकते हैं।

### Gatsby {/*gatsby*/}

**[Gatsby](https://www.gatsbyjs.com/) एक React फ्रेमवर्क है जो तेज़ CMS-बेस्ड वेबसाइट्स बनाने के लिए उपयुक्त है।** इसका समृद्ध प्लगइन इकोसिस्टम और GraphQL डेटा लेयर सामग्री, API और सेवाओं को एक वेबसाइट में जोड़ना आसान बनाता है। नया Gatsby प्रोजेक्ट बनाने के लिए चलाएँ:

<TerminalBlock>
npx create-gatsby
</TerminalBlock>

अगर आप Gatsby में नए हैं, तो [Gatsby ट्यूटोरियल](https://www.gatsbyjs.com/docs/tutorial/) देखें।

Gatsby को [Netlify](https://www.netlify.com/) द्वारा मेंटेन किया जाता है। आप [Gatsby साइट को पूरी तरह से स्टैटिक रूप में होस्ट कर सकते हैं](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting)। अगर आप सर्वर-साइड सुविधाओं का उपयोग करना चाहते हैं, तो सुनिश्चित करें कि आपका होस्टिंग प्रदाता उन्हें सपोर्ट करता है।

### Expo (नेटिव ऐप्स के लिए) {/*expo*/}

**[Expo](https://expo.dev/) एक React फ्रेमवर्क है जो आपको Android, iOS और वेब के लिए यूनिवर्सल ऐप्स बनाने की सुविधा देता है।** यह [React Native](https://reactnative.dev/) के लिए एक SDK प्रदान करता है जो नेटिव भागों को उपयोग में आसान बनाता है। नया Expo प्रोजेक्ट बनाने के लिए चलाएँ:

<TerminalBlock>
npx create-expo-app
</TerminalBlock>

अगर आप Expo में नए हैं, तो [Expo ट्यूटोरियल](https://docs.expo.dev/tutorial/introduction/) देखें।

Expo को [Expo (कंपनी)](https://expo.dev/about) द्वारा मेंटेन किया जाता है। Expo के साथ ऐप्स बनाना मुफ़्त है, और आप उन्हें Google और Apple ऐप स्टोर में जमा कर सकते हैं।

<DeepDive>

#### क्या मैं React बिना किसी फ्रेमवर्क के उपयोग कर सकता हूँ? {/*can-i-use-react-without-a-framework*/}

बिलकुल! आप React को किसी फ्रेमवर्क के बिना भी उपयोग कर सकते हैं। हालांकि, यदि आप पूरी तरह से React का उपयोग करके एक नई साइट या ऐप बना रहे हैं, तो हम एक फ्रेमवर्क का उपयोग करने की सलाह देते हैं।

React फ्रेमवर्क वे समस्याएँ हल करते हैं जो बड़े होते ऐप्स में आमतौर पर आती हैं, जैसे कि कोड-स्प्लिटिंग, सर्वर-साइड डेटा फ़ेचिंग, और SEO के लिए HTML जनरेशन।

</DeepDive>

## उभरते हुए React फ्रेमवर्क {/*bleeding-edge-react-frameworks*/}

React टीम ने यह महसूस किया कि फ्रेमवर्क्स के साथ React को अधिक गहराई से एकीकृत करना, विशेष रूप से रूटिंग, बंडलिंग और सर्वर टेक्नोलॉजीज़ के संदर्भ में, React उपयोगकर्ताओं के लिए बेहतरीन ऐप्स बनाना आसान बना सकता है।

### Next.js (App Router) {/*nextjs-app-router*/}

**[Next.js का App Router](https://nextjs.org/docs) Next.js API का एक नया डिज़ाइन है, जो React टीम के फुल-स्टैक आर्किटेक्चर दृष्टिकोण को पूरा करने के लिए बनाया गया है।** यह आपको असिंक्रोनस कंपोनेंट्स का उपयोग करके डेटा फ़ेच करने की अनुमति देता है, जो सर्वर पर या बिल्ड के दौरान चलते हैं।

Next.js को [Vercel](https://vercel.com/) द्वारा मेंटेन किया जाता है।

<DeepDive>

#### React टीम का फुल-स्टैक आर्किटेक्चर दृष्टिकोण क्या है? {/*which-features-make-up-the-react-teams-full-stack-architecture-vision*/}

Next.js का App Router आधिकारिक [React Server Components स्पेसिफिकेशन](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) को पूरी तरह से लागू करता है।

यह डेटा फ़ेचिंग और Suspense को एकीकृत करता है, जिससे UI के विभिन्न हिस्सों को लोडिंग स्टेट (जैसे कि स्केलेटन प्लेसहोल्डर) के साथ दिखाना आसान हो जाता है।

</DeepDive>

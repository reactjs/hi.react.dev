/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * @emails react-core
 * @flow
 */

import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import Layout from 'components/Layout';
import React from 'react';
import {sharedStyles} from 'theme';

type Props = {
  location: Location,
};

const PageNotFound = ({location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>पेज नहीं मिला</Header>
          <TitleAndMetaTags title="React &ndash; पेज नहीं मिला" />
          <div css={sharedStyles.markdown}>
            <p>हमें वह नहीं मिला, जिसकी आपको तलाश थी।</p>
            <p>
              कृपया यह साइट के मालिक से संपर्क करें जिसने आपको मूल URL से जोड़ा है 
              और उन्हें बताएं कि उनका लिंक काम नहीं कर रहा।
            </p>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default PageNotFound;

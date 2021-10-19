import { NextPage, GetStaticProps } from 'next';
import React from 'react';
import StemAndLeafPlot from 'components/_shared/StemAndLeafPlot/StemAndLeafPlot';
import Header from 'components/_shared/Header/Header';

import loadGoogleDoc from 'lib/loadGoogleDoc';
import { parseArchieML } from 'lib/parse';

interface Props {
  items: number[];
  header: {
    title: string;
    subtitle: string;
  };
}
const Graphic: NextPage<Props> = ({ items, header }) => {
  return (
    <>
      <Header>{header}</Header>
      <StemAndLeafPlot items={items} numberOfSteps={30} maxValue={30} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // get static props is called at build / export time,
  // so this could be a compute heavy function or a call to e.g. the google api

  // prettier-ignore
  const items = [
      0, 0, 0, 2, 2, 2, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9, 9, 10, 11, 12, 12, 12,
      13, 13, 13, 14, 14, 15, 16, 16, 16, 17, 18, 18, 19, 19, 19,
      20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 23, 24, 25, 25, 26, 26, 26,
      27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 30, 30, 30, 30, 30, 30
    ]

  // load configurations from Google Doc
  const GOOGLE_DOC_ID = '19hUOlQ0dzz__vWmf5QvMD4W-LWjal09kpSKILMoApOA';
  const doc = await loadGoogleDoc(GOOGLE_DOC_ID, true);
  const googleConfig = parseArchieML(doc);

  return {
    props: {
      items,
      header: googleConfig.header,
    },
  };
};

export default Graphic;

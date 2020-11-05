import { NextPage } from 'next'
import React from 'react'
import StemAndLeafPlot from 'components/_shared/StemAndLeafPlot/StemAndLeafPlot'
import Header from 'components/_shared/Header/Header'

const Index: NextPage = () => {
  // prettier-ignore
  const items = [
    0, 0, 0, 2, 2, 2, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9, 9, 10, 11, 12, 12, 12,
    13, 13, 13, 14, 14, 15, 16, 16, 16, 17, 18, 18, 19, 19, 19,
    20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 23, 24, 25, 25, 26, 26, 26,
    27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 30, 30, 30, 30, 30, 30
  ]
  return (
    <>
      <Header>
        {{
          title:
            'Ein Aussagesatz oder notfalls eine Kurzbeschreibung, wenn das eine Livegrafik ist',
          subtitle: 'Angabe der Metrik und erklärung der Grafik',
        }}
      </Header>
      <StemAndLeafPlot items={items} numberOfSteps={30} maxValue={30} />
    </>
  )
}

export default Index

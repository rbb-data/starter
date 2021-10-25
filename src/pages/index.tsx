import Link from 'next/link';
import React from 'react';

function Index() {
  const PAGES = [
    { url: '/graphic', title: 'Example of a complete graphic (Header+Chart)' },
    { url: '/chart', title: 'Minimal example of a responsive chart' },
    { url: '/map', title: 'Map example' },
  ];

  return (
    <>
      <b>Example pages:</b>
      <ul>
        {PAGES.map(({ url, title }) => (
          <li key={url}>
            <Link href={url}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Index;

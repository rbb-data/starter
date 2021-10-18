import { ReactNode } from 'react';

interface Props {
  children: () => ReactNode;
}
const MDXWrapper = (props: Props) => {
  return props.children();
};

export default MDXWrapper;

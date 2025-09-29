import type { Metadata } from "next";
import { type FC, type ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: "%s | E-Library",
    default: "Book Details | E-Library"
  },
  description: "Explore book details, read reviews, and discover your next favorite book.",
};

interface IProps {
  children: ReactNode;
}

const BookLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props;
  return children;
}

export default BookLayout;

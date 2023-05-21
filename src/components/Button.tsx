"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button(props: ButtonProps) {
  return (
    <button className="border-black border-2 rounded-lg p-1" {...props}>
      {props.children}
    </button>
  );
}

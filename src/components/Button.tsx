"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ disabled, className, ...props }: ButtonProps) {
  return (
    <button
      className={`border-black border-2 rounded-lg p-1 ${
        disabled && "bg-slate-300 cursor-not-allowed text-opacity-70"
      } ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

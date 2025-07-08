import { ReactElement } from "react";
import type { ReactNode } from "react";
export type TextBlock = {
  content: string;
  className?: string;
};
export type SERVICE_TYPE = {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  text?: TextBlock[];
}[];

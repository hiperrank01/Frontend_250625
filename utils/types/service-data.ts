import { ReactElement } from "react";

export type TextBlock = {
  content: string;
  className?: string;
};
export type SERVICE_TYPE = {
  id: string;
  title: string;
  icon: ReactElement;
  description: string;
  text?: TextBlock[];
}[];

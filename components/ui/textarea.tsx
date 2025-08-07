// components/ui/textarea.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleResize = () => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      }
    };

    React.useEffect(() => {
      handleResize();
    }, [props.value]);

    return (
      <textarea
        ref={(node) => {
          textareaRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (
              ref as React.MutableRefObject<HTMLTextAreaElement | null>
            ).current = node;
          }
        }}
        onInput={handleResize}
        className={cn(
          "w-full resize-none overflow-hidden border rounded-md h-10 px-3 py-[0.625rem] text-sm leading-[1.25rem] resize-none text-sm focus:ring-blue-300",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

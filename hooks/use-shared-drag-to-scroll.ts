import { useRef, useEffect, useState } from "react";

export const useSharedDragToScroll = <T extends HTMLElement, S extends HTMLElement>() => {
  const draggableRef = useRef<T>(null);
  const scrollableRef = useRef<S>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const draggableEl = draggableRef.current;
    const scrollableEl = scrollableRef.current;

    if (!draggableEl || !scrollableEl) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - draggableEl.offsetLeft);
      setScrollLeft(scrollableEl.scrollLeft);
      draggableEl.style.cursor = "grabbing";
      draggableEl.style.userSelect = "none";
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      draggableEl.style.cursor = "grab";
      draggableEl.style.userSelect = "auto";
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      draggableEl.style.cursor = "grab";
      draggableEl.style.userSelect = "auto";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - draggableEl.offsetLeft;
      const walk = (x - startX) * 2;
      scrollableEl.scrollLeft = scrollLeft - walk;
    };

    draggableEl.addEventListener("mousedown", handleMouseDown);
    draggableEl.addEventListener("mouseleave", handleMouseLeave);
    draggableEl.addEventListener("mouseup", handleMouseUp);
    draggableEl.addEventListener("mousemove", handleMouseMove);

    draggableEl.style.cursor = "grab";

    return () => {
      draggableEl.removeEventListener("mousedown", handleMouseDown);
      draggableEl.removeEventListener("mouseleave", handleMouseLeave);
      draggableEl.removeEventListener("mouseup", handleMouseUp);
      draggableEl.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft]);

  return { draggableRef, scrollableRef };
};

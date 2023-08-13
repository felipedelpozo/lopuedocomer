import { useEffect, useState } from 'react';

interface Position {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

function useAbsolutePosition(
  ref: React.RefObject<HTMLElement>
): Position | null {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [ref]);

  return position;
}

export default useAbsolutePosition;

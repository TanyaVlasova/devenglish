import { useEffect, useRef, useCallback } from "react";

import type { RefObject } from "react";

/**
 * Хук, который отслеживает нажатие за пределами возвращаемого HTML-элемента
 * @param onClickOutside - Функция, которая вызывается при нажатии за пределами
 * @param disabled - Если true, то функция не будет вызвана
 * @returns ref объект
 */
function useOnClickOutside<T extends HTMLElement>(
  onClickOutside: (event: MouseEvent) => void,
  disabled?: boolean
): RefObject<T> {
  const ref = useRef<T>(null);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;

      if (!ref.current || ref.current.contains(target)) return;
      onClickOutside(event);
    },
    [onClickOutside]
  );

  useEffect(() => {
    if (!disabled) addEventListener("mousedown", handleClick);

    return () => removeEventListener("mousedown", handleClick);
  }, [disabled, handleClick]);

  return ref;
}

export default useOnClickOutside;

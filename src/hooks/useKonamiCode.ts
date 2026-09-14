/**
 * useKonamiCode - Listens for the Konami Code sequence.
 * ↑ ↑ ↓ ↓ ← → ← → B A
 * Calls the callback when the full sequence is entered.
 */

import { useEffect, useRef, useCallback } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useKonamiCode(callback: () => void) {
  const indexRef = useRef(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const expected = KONAMI_SEQUENCE[indexRef.current];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        indexRef.current++;
        if (indexRef.current === KONAMI_SEQUENCE.length) {
          callback();
          indexRef.current = 0;
        }
      } else {
        indexRef.current = 0;
      }
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

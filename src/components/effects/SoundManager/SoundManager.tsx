import { useEffect } from 'react';
import { useSound } from '../../../hooks/useSound';

export function SoundManager({ activeIndex }: { activeIndex: number }) {
  const { soundEnabled, playSound } = useSound();

  // Play a tiny tick sound whenever the active section changes
  useEffect(() => {
    if (soundEnabled) {
      playSound('click');
    }
  }, [activeIndex, soundEnabled, playSound]);

  return null;
}

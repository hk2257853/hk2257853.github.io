/**
 * useSound - Native Web Audio API sound management with zero external dependencies.
 * Provides procedural UI sound synthesis (zero asset downloads) and opt-in sound state management.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

interface SoundOptions {
  volume?: number;
  loop?: boolean;
  rate?: number;
}

interface LoadedSound {
  play: () => void;
  stop: () => void;
}

// Global sound state - shared across all hook instances
let globalSoundEnabled = true;
const listeners = new Set<(enabled: boolean) => void>();

function setGlobalSoundEnabled(enabled: boolean) {
  globalSoundEnabled = enabled;
  listeners.forEach(fn => fn(enabled));
}

// Shared AudioContext (created lazily on demand)
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Procedurally synthesize a subtle, high-quality mechanical UI click/tick
 * Zero network request, zero bytes asset transfer, zero latency.
 */
function playSyntheticTick(ctx: AudioContext, type: 'click' | 'hover' = 'click') {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  if (type === 'click') {
    // Crisp subtle tick
    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.035);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.035);
  } else {
    // Subtle high-pitch hover tick
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.02);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.02);
  }
}

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(globalSoundEnabled);
  const soundsRef = useRef<Map<string, LoadedSound>>(new Map());

  // Subscribe to global sound state changes
  useEffect(() => {
    const handler = (enabled: boolean) => setSoundEnabled(enabled);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const toggleSound = useCallback(() => {
    setGlobalSoundEnabled(!globalSoundEnabled);
  }, []);

  const enableSound = useCallback(() => {
    setGlobalSoundEnabled(true);
  }, []);

  const disableSound = useCallback(() => {
    setGlobalSoundEnabled(false);
  }, []);

  /**
   * Load and cache a sound for custom assets (with fallback support).
   */
  const loadSound = useCallback((key: string, src?: string, options: SoundOptions = {}) => {
    if (!soundsRef.current.has(key)) {
      const soundHandle: LoadedSound = {
        play: () => {
          if (!globalSoundEnabled) return;
          const ctx = getAudioContext();
          if (!ctx) return;

          if (key === 'click' || key === 'hover' || !src) {
            playSyntheticTick(ctx, key === 'hover' ? 'hover' : 'click');
          } else {
            // Native HTML5 Audio fallback for external audio URLs
            const audio = new Audio(src);
            audio.volume = options.volume ?? 0.5;
            audio.loop = options.loop ?? false;
            audio.play().catch(() => {});
          }
        },
        stop: () => {},
      };
      soundsRef.current.set(key, soundHandle);
    }
    return soundsRef.current.get(key)!;
  }, []);

  /**
   * Play a sound (only if sound is enabled).
   */
  const playSound = useCallback((key: string) => {
    if (!globalSoundEnabled) return;
    const sound = soundsRef.current.get(key);
    if (sound) {
      sound.play();
    } else {
      const ctx = getAudioContext();
      if (ctx) {
        playSyntheticTick(ctx, key === 'hover' ? 'hover' : 'click');
      }
    }
  }, []);

  /**
   * Stop a sound.
   */
  const stopSound = useCallback((key: string) => {
    const sound = soundsRef.current.get(key);
    if (sound) sound.stop();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const sounds = soundsRef.current;
    return () => {
      sounds.clear();
    };
  }, []);

  return {
    soundEnabled,
    toggleSound,
    enableSound,
    disableSound,
    loadSound,
    playSound,
    stopSound,
  };
}

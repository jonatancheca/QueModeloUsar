import { onUnmounted, ref } from 'vue'

type Sound = 'select' | 'open' | 'copy' | 'close'

export function useSound() {
  const enabled = ref(false)
  const unavailable = ref(false)
  let context: AudioContext | null = null
  try { enabled.value = localStorage.getItem('qmu-sound') === 'on' } catch { /* Storage is optional. */ }

  async function play(kind: Sound = 'select') {
    if (!enabled.value) return
    try {
      const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) throw new Error('Web Audio unavailable')
      context ??= new AudioContextClass()
      if (context.state === 'suspended') await context.resume()
      const frequencies = { select: [440, 660], open: [330, 440, 660], copy: [523, 659, 784], close: [440, 330] }[kind]
      const start = context.currentTime
      frequencies.forEach((frequency, index) => {
        const oscillator = context!.createOscillator()
        const gain = context!.createGain()
        const time = start + index * 0.055
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(frequency, time)
        gain.gain.setValueAtTime(0, time)
        gain.gain.linearRampToValueAtTime(0.035, time + 0.012)
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.11)
        oscillator.connect(gain)
        gain.connect(context!.destination)
        oscillator.start(time)
        oscillator.stop(time + 0.12)
      })
    } catch {
      unavailable.value = true
      enabled.value = false
    }
  }

  function toggle() {
    if (unavailable.value) return
    enabled.value = !enabled.value
    try { localStorage.setItem('qmu-sound', enabled.value ? 'on' : 'off') } catch { /* Storage is optional. */ }
    if (enabled.value) void play('copy')
  }

  onUnmounted(() => { void context?.close() })
  return { enabled, unavailable, play, toggle }
}

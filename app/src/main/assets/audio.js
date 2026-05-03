// ══════════════════════════════════════
//  SISTEMA DE AUDIO
// ══════════════════════════════════════

class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.musicVol = 0.7;
    this.sfxVol = 0.8;
    this.loadConfig();
    this.initSounds();
  }

  loadConfig() {
    this.musicVol = (parseInt(localStorage.getItem('musicVol') || '70')) / 100;
    this.sfxVol = (parseInt(localStorage.getItem('sfxVol') || '80')) / 100;
  }

  initSounds() {
    // Crear sonidos sintéticos usando Web Audio API
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Definir sonidos
    this.soundDefs = {
      jump: { freq: 400, duration: 0.1, type: 'square' },
      coin: { freq: 800, duration: 0.15, type: 'sine' },
      die: { freq: 150, duration: 0.3, type: 'sawtooth' },
      slide: { freq: 200, duration: 0.2, type: 'triangle' },
      win: { freq: 600, duration: 0.5, type: 'sine' },
      step: { freq: 100, duration: 0.05, type: 'noise' }
    };
  }

  playSound(name) {
    if (!this.soundDefs[name] || this.sfxVol === 0) return;
    
    const def = this.soundDefs[name];
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    if (def.type === 'noise') {
      // Ruido blanco para pasos
      const bufferSize = ctx.sampleRate * def.duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(this.sfxVol * 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + def.duration);
      noise.start(now);
      noise.stop(now + def.duration);
    } else {
      osc.type = def.type;
      osc.frequency.setValueAtTime(def.freq, now);
      
      // Efectos especiales por tipo de sonido
      if (name === 'jump') {
        osc.frequency.exponentialRampToValueAtTime(def.freq * 1.5, now + def.duration);
      } else if (name === 'coin') {
        osc.frequency.setValueAtTime(def.freq, now);
        osc.frequency.setValueAtTime(def.freq * 1.2, now + 0.05);
        osc.frequency.setValueAtTime(def.freq * 1.5, now + 0.1);
      } else if (name === 'die') {
        osc.frequency.exponentialRampToValueAtTime(50, now + def.duration);
      } else if (name === 'win') {
        osc.frequency.setValueAtTime(def.freq, now);
        osc.frequency.setValueAtTime(def.freq * 1.25, now + 0.1);
        osc.frequency.setValueAtTime(def.freq * 1.5, now + 0.2);
        osc.frequency.setValueAtTime(def.freq * 2, now + 0.3);
      }
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(this.sfxVol * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + def.duration);
      
      osc.start(now);
      osc.stop(now + def.duration);
    }
  }

  playMusic(type = 'game') {
    if (this.musicVol === 0) return;
    
    // Detener música anterior
    this.stopMusic();
    
    const ctx = this.audioContext;
    this.musicGain = ctx.createGain();
    this.musicGain.gain.value = this.musicVol * 0.15;
    this.musicGain.connect(ctx.destination);
    
    // Crear música de fondo simple
    this.musicOscillators = [];
    
    if (type === 'game') {
      // Melodía simple y repetitiva
      const melody = [
        { freq: 262, time: 0 },    // C
        { freq: 294, time: 0.5 },  // D
        { freq: 330, time: 1 },    // E
        { freq: 294, time: 1.5 },  // D
        { freq: 262, time: 2 },    // C
        { freq: 220, time: 2.5 },  // A
        { freq: 247, time: 3 },    // B
        { freq: 262, time: 3.5 }   // C
      ];
      
      const playMelody = () => {
        const now = ctx.currentTime;
        melody.forEach(note => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = note.freq;
          
          const noteGain = ctx.createGain();
          noteGain.gain.setValueAtTime(0, now + note.time);
          noteGain.gain.linearRampToValueAtTime(0.3, now + note.time + 0.05);
          noteGain.gain.exponentialRampToValueAtTime(0.01, now + note.time + 0.4);
          
          osc.connect(noteGain);
          noteGain.connect(this.musicGain);
          
          osc.start(now + note.time);
          osc.stop(now + note.time + 0.5);
        });
        
        // Repetir cada 4 segundos
        this.musicTimeout = setTimeout(playMelody, 4000);
      };
      
      playMelody();
    }
  }

  stopMusic() {
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
    if (this.musicOscillators) {
      this.musicOscillators.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      this.musicOscillators = [];
    }
  }

  updateVolumes() {
    this.loadConfig();
    if (this.musicGain) {
      this.musicGain.gain.value = this.musicVol * 0.15;
    }
  }
}

// Instancia global
const AUDIO = new AudioManager();

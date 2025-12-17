import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge from '@/components/shared/Badge';

const RCPTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // en segundos
  const [cycles, setCycles] = useState(0);
  const [lastCycleTime, setLastCycleTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ciclo de RCP: 2 minutos = 120 segundos
  const CYCLE_DURATION = 120;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const newTime = prev + 1;
          const cycleTime = newTime - lastCycleTime;
          
          // Alerta cada 2 minutos (cambio de reanimador)
          if (cycleTime >= CYCLE_DURATION) {
            setCycles((prev) => prev + 1);
            setLastCycleTime(newTime);
            playAlert();
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, lastCycleTime]);

  const playAlert = () => {
    // Crear audio para alerta (usando Web Audio API)
    if (typeof Audio !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    if (elapsedTime === 0) {
      setLastCycleTime(0);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setCycles(0);
    setLastCycleTime(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const cycleTime = elapsedTime - lastCycleTime;
  const timeUntilNextCycle = CYCLE_DURATION - cycleTime;
  const progress = (cycleTime / CYCLE_DURATION) * 100;

  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-4">
        ⏱️ Temporizador de RCP
      </h3>

      <div className="space-y-4">
        {/* Información */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Ciclos de RCP:</p>
              <p>Cada 2 minutos (120 segundos) se debe cambiar de reanimador para mantener calidad de compresiones.</p>
            </div>
          </div>
        </div>

        {/* Tiempo principal */}
        <div className="p-6 bg-card border-2 border-primary rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-6 h-6 text-primary" />
            <p className="text-muted-foreground text-sm">Tiempo Total</p>
          </div>
          <p className="text-5xl font-bold text-foreground mb-2">
            {formatTime(elapsedTime)}
          </p>
          <Badge variant="info" className="text-sm px-3 py-1">
            Ciclos completados: {cycles}
          </Badge>
        </div>

        {/* Progreso del ciclo actual */}
        {isRunning && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tiempo hasta cambio de reanimador</span>
              <span className="font-bold text-foreground">
                {formatTime(timeUntilNextCycle)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            {timeUntilNextCycle <= 10 && timeUntilNextCycle > 0 && (
              <div className="p-3 bg-[hsl(var(--emergency-high))]/10 border border-[hsl(var(--emergency-high))]/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h5 text-[hsl(var(--emergency-high))]" />
                  <p className="text-sm text-[hsl(var(--emergency-high))] font-semibold">
                    ¡Cambio de reanimador en {timeUntilNextCycle} segundos!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Controles */}
        <div className="flex gap-2">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              className="flex-1 bg-primary text-primary-foreground"
            >
              <Play className="w-4 h-4 mr-2" />
              Iniciar
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              variant="outline"
              className="flex-1"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pausar
            </Button>
          )}
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar
          </Button>
        </div>

        {/* Instrucciones */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Uso:</strong> Iniciar cuando comience RCP. El temporizador alertará cada 2 minutos para cambio de reanimador.
            Pausar durante desfibrilación si es necesario.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RCPTimer;

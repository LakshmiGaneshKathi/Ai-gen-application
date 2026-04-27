import React, { useEffect, useRef, useState, useCallback } from "react";
import { Direction, Point } from "../types";
import { GRID_SIZE, INITIAL_SNAKE_SPEED } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, RefreshCw, Play } from "lucide-react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SNAKE_SPEED);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Ensure food doesn't spawn on snake
      if (!currentSnake.some(p => p.x === newFood.x && p.y === newFood.y)) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setSpeed(INITIAL_SNAKE_SPEED);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": if (direction !== "DOWN") setNextDirection("UP"); break;
        case "ArrowDown": if (direction !== "UP") setNextDirection("DOWN"); break;
        case "ArrowLeft": if (direction !== "RIGHT") setNextDirection("LEFT"); break;
        case "ArrowRight": if (direction !== "LEFT") setNextDirection("RIGHT"); break;
        case " ": setIsPaused(prev => !prev); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (isPaused || isGameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = { ...head };
        const currentDir = nextDirection;
        setDirection(currentDir);

        if (currentDir === "UP") newHead.y -= 1;
        if (currentDir === "DOWN") newHead.y += 1;
        if (currentDir === "LEFT") newHead.x -= 1;
        if (currentDir === "RIGHT") newHead.x += 1;

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(p => p.x === newHead.x && p.y === newHead.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
          setSpeed(prev => Math.max(80, prev - 2)); // Gradually increase speed
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [isPaused, isGameOver, food, nextDirection, speed, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const cellSize = canvas.width / GRID_SIZE;
      
      // Clear
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid (subtle)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
      }

      // Draw Food (Neon Magenta)
      ctx.fillStyle = "#ff00ff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#ff00ff";
      ctx.beginPath();
      ctx.arc(
        food.x * cellSize + cellSize / 2,
        food.y * cellSize + cellSize / 2,
        cellSize / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Snake (Neon Cyan)
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#00f3ff" : "rgba(0, 243, 255, 0.6)";
        ctx.shadowBlur = index === 0 ? 15 : 0;
        ctx.shadowColor = "#00f3ff";
        
        const padding = 1;
        ctx.fillRect(
          segment.x * cellSize + padding,
          segment.y * cellSize + padding,
          cellSize - padding * 2,
          cellSize - padding * 2
        );
      });
      ctx.shadowBlur = 0;
    };

    draw();
  }, [snake, food]);

  return (
    <div className="relative flex flex-col items-center w-full h-full p-2 md:p-6">
      <div className="relative group w-full max-w-[400px] aspect-square">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="bg-black/80"
          style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
        />

        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
            >
              {isGameOver ? (
                <>
                  <div className="text-[10px] text-glitch-red uppercase tracking-[0.5em] mb-2 glitch-text">SEGMENTATION_FAULT</div>
                  <h2 className="text-4xl font-black text-white mb-2 italic glitch-text">ERR:DEATH</h2>
                  <p className="text-neon-cyan font-mono text-xs mb-8 uppercase tracking-widest">DATA_CORRUPT: {score}</p>
                  <button
                    onClick={resetGame}
                    className="flex items-center space-x-3 px-8 py-3 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all font-black uppercase text-xs tracking-widest"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>REINIT_CORE</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] mb-4">FLOW_HALT</div>
                  <h2 className="text-4xl font-black text-white mb-8 italic glitch-text">STASIS_INTERRUPT</h2>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="flex items-center space-x-3 px-10 py-4 border-2 border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-black transition-all font-black uppercase text-xs tracking-widest group"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>RESTORE_LINK</span>
                  </button>
                  <p className="mt-8 text-[9px] text-white/20 font-mono uppercase tracking-[0.2em]">
                    KEY_SEQ: [SPACE]
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute bottom-2 right-2 text-[8px] text-neon-cyan/20 uppercase tracking-[0.2em] font-mono pointer-events-none">
          CORTEX_GRID_v4.2
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-[9px] text-white/30 font-mono uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="px-1.5 py-0.5 border border-white/20">KEYS</div>
          <span>Navigation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-1.5 py-0.5 border border-white/20">SPACE</div>
          <span>Interrupt</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neon-cyan font-bold">{score}</span>
          <span className="opacity-50">Score</span>
        </div>
      </div>
    </div>
  );
}

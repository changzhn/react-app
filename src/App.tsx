import React from 'react';
import { useMouse } from 'react-use';
import { runInThisContext } from 'vm';
import './App.css';

const { useRef, useEffect, useState } = React;
let ctx: CanvasRenderingContext2D | null = null;
let imgWidth = 0;
let imgHeight = 0;
let ended = false;

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Circle {
  x: number;
  y: number;
  radius: number = 10;
  color: string = 'deepskyblue';
  isSelected: boolean = false;

  constructor(x: number, y: number, color?: string) {
    this.x = x;
    this.y = y;
    if (typeof color === 'string') {
      this.color = color;
    }
  }

  facus() {
    this.isSelected = true;
    this.color = 'orange';
    this.radius = 12;
  }
}

function drawCircles(ctx: CanvasRenderingContext2D, circles: Circle[]) {
  ctx.globalAlpha = 0.85;
  if (circles.length) {
    for(const circle of circles) {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle.color;
      ctx.strokeStyle = 'black';
      ctx.fill();
      ctx.stroke();
    }
  }
}

function drawLines(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length > 1) {
    ctx.moveTo(points[0].x, points[0].y);

    for(let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.fillStyle = 'deeppink';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
}

function calcDistance(c1: Circle, c2: { x: number, y: number}) {
  return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2))
}

const App: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { elX, elY, elW, elH } = useMouse(canvasRef);
  const [points, setPoints] = useState<Point[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);

  const add2History = () => {
    if (ctx) {
      setHistory([...history, ctx.getImageData(0, 0, imgWidth, imgHeight)]);
    }
  }

  const move2LastHistoryData = () => {
    if (ctx && history.length > 0) {
      ctx.putImageData(history[history.length - 1], 0, 0);
    }
  }

  useEffect(() => {
    console.log(circles);
    if (ctx) {
      move2LastHistoryData();
      drawLines(ctx, points);
      drawCircles(ctx, circles);
    }
  }, [circles, points]);

  useEffect(() => {
    const url = 'http://ks3-cn-beijing.ksyun.com/kqoe/2000081926_kingsoft_stage_KIE_%E8%AF%84%E6%B5%8B/5%E4%B8%AA%E5%9B%BE%E7%89%87%E7%94%9F%E6%88%90%E7%89%88/7.jpg';
    const img = new Image();
    img.crossOrigin = '';
    img.src = url;
    img.onload = function (e) {
      if (canvasRef.current) {
        imgWidth = 800;
        const ratio = img.width / img.height;
        imgHeight = imgWidth / ratio;
        canvasRef.current.width = imgWidth;
        canvasRef.current.height = imgHeight;
        ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        add2History();
      }
    }
  }, []);

  const start = () => {
    if (elX > 0 && elY > 0 && elX < elW && elY < elH) {
      // 如果未结束就画线
      if (!ended) {
        // 1. 如果点击到起点，就闭合线
        if (circles.length) {
          const startCircle = circles[0];
          const distance = calcDistance(startCircle, { x: elX, y: elY });
          if (distance <= startCircle.radius) {
            // 只画线
            setCircles(s => {
              s[0].color = 'deepskyblue';
              return [...s];
            })
            setPoints(s => [...s, new Point(elX, elY)]);
            ended = true;
            return;
          }
        }
  
        // 2. 如果是点击到其他点，就忽略
        for(let i = 1; i < circles.length; i++) {
          const distance = calcDistance(circles[i], { x: elX, y: elY });
          if (distance <= circles[i].radius) {
            return;
          }
        }
  
        let circle = new Circle(elX, elY);
        if (!circles.length) {
          circle = new Circle(elX, elY, 'green');
        }
        // 3. 正常画一条线
        
        setCircles(s => [...s, circle]);
        setPoints(s => [...s, new Point(elX, elY)]);
      } else {
        // 如果结束就改circle 和 point
        for (let i = 0; i < circles.length; i++) {
          const distance = calcDistance(circles[i], { x: elX, y: elY});
          if (distance < circles[i].radius) {
            circles[i].facus();
            setCircles([...circles]);
            break;
          }
        }
      }
    }
  };

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        onMouseDown={start}
      />
    </div>
  );
}

export default App;

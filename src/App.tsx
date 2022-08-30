import React, { useState, useEffect } from 'react';
import './App.css';

type Players = "O" | "X";

const App: React.FC = () => {
  const [turn, setTurn] = useState<Players>("O");
  const [winner, setWinner] = useState<Players | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null);
  const [marks, setMarks] = useState<{ [key: string]: Players}>({})

  const gameOver = !!winner || !!draw;
  
  /* Função que cria os Arrays dos lugares */
  const getSquares = () => {
      return new Array(9).fill(true);
  }

  /* Função que faz o jogo rodar */
  const play = (index: number) => {
    
    if(marks[index] || gameOver){
      return;
    }

    setMarks(prev => ({...prev, [index]: turn})); /* Consumindo lugar no Array */
    setTurn(prev => prev === "O" ? "X" : "O"); /* Troca de Turno */
  }

 /* Função para mudar as cor do index */
  const getCellPlayer = (index: number) => {
    if(!marks[index]){
      return;
    }
    return marks[index];
  }
  
  const getWinner = () => {
    const victoryLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],

    ]
    for (const line of victoryLines){
      const [a, b, c] = line;
      if(marks[a] && marks[a] === marks[b] && marks[a] === marks[c]){

        return marks[a];
      }
    }
  }

  const reset = () => {
    setTurn(marks[0] === "O" ? "X" : "O");
    setMarks({});
    setWinner(null);
    setDraw(null);
  }

  useEffect(() =>{
    const winner = getWinner();
    
    if(winner){
      setWinner(winner);
    }else{
      if(Object.keys(marks).length === 9){
        setDraw(true)
      }
    }
  },[marks])
  

  return (
    <div className="App">

      {winner && <h1> Player {winner} ganhou!</h1>}
      
      {draw && <h1>Empate</h1>}
      
      <p>É a vez de <b>{turn}</b></p>
      
      <div className={`board ${gameOver ? "gameOver" : null}`}>
      {getSquares().map((_, i) =>(
        <div className={`cell ${getCellPlayer(i)}`} onClick={() => play(i)}>
          {marks[i]} 
        </div>
      ))}
      </div>
      {gameOver && <button onClick={reset}>Jogar Novamente</button>}
    </div>
  );
}

export default App;

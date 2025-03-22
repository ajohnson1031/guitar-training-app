import { useState } from "react";
import GuitarNeck from "./GuitarNeck";

const getRandomPosition = (chord) => {
  const nonCapoPositions = chord.positions.filter((pos) => !pos.capo);
  const positions = nonCapoPositions.length > 0 ? nonCapoPositions : chord.positions;
  return positions[Math.floor(Math.random() * positions.length)];
};
const ChordTrainer = ({ chordList, bpm }) => {
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentChordPosition, setCurrentChordPosition] = useState(getRandomPosition(chordList[0]));
  const [isWaiting, setIsWaiting] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const msPerChord = 60000 / bpm;
  const currentChord = chordList[currentChordIndex];

  const handleCorrect = () => {
    if (!isWaiting) {
      setIsWaiting(true);

      setTimeout(() => {
        setCorrectCount((prev) => prev + 1);

        setCurrentChordIndex((prevIndex) => {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * chordList.length);
          } while (randomIndex === prevIndex);

          setCurrentChordPosition(getRandomPosition(chordList[randomIndex]));
          return randomIndex;
        });

        setIsWaiting(false);
      }, msPerChord);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <GuitarNeck chord={currentChordPosition} />

      <p className="mt-2 text-gray-700 text-lg font-medium">
        Chord: {currentChord.key} {currentChord.suffix}
      </p>

      <div className="mt-4 flex gap-4">
        <button onClick={handleCorrect} className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded cursor-pointer">
          I played it right ✅
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-500">Chords played correctly: {correctCount}</p>
    </div>
  );
};

export default ChordTrainer;

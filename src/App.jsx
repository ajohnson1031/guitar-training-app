import { chords } from "@tombatossals/chords-db/lib/guitar.json";
import ChordTrainer from "./components/ChordTrainer";

function App() {
  return (
    <div className="w-full h-full flex items-center">
      <ChordTrainer chordList={chords.A} bpm={60} />
    </div>
  );
}

export default App;

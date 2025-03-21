import { chords } from "@tombatossals/chords-db/lib/guitar.json";
import GuitarNeck from "./components/GuitarNeck";

function App() {
  const firstChord = chords.A[0];

  return (
    <div className="w-full h-full flex items-center">
      <GuitarNeck chord={firstChord} />
    </div>
  );
}

export default App;

import { Fretboard } from "@moonwave99/fretboard.js";
import { useEffect, useRef } from "react";
import { getChordString, getNoteLabels, NOTE_COLORS } from "../utils";

const GuitarNeck = ({ chord, tuning = ["E", "A", "D", "G", "B", "E"], label }) => {
  const fretboardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!chord || !chord.frets) return;

    if (!fretboardRef.current && containerRef.current) {
      fretboardRef.current = new Fretboard({
        el: containerRef.current,
        tuning,
        dotSize: 24,
        baseFret: chord.baseFret || 1,
        fretCount: 5,
        showFretNumbers: true,
        crop: true,
        barresColor: "#ccc",
      });
    }

    const chordString = getChordString(chord.frets);
    const labels = getNoteLabels(chord.frets, tuning);

    const barres = (chord.barres || []).map((fret) => ({
      fret,
      fromString: 6,
      toString: 1,
    }));

    // Render the chord and immediately style the dots
    fretboardRef.current.renderChord(chordString, barres).style({
      text: (_, i) => labels[i] ?? "",
      fill: (_, i) => {
        const note = labels[i];
        return note ? NOTE_COLORS[note] : "#ccc";
      },
    });
  }, [chord]);

  return (
    <div className="flex flex-col w-full h-fit items-center">
      {label && (
        <div className="flex justify-center text-xl font-semibold gap-1">
          <p>{label}</p>
        </div>
      )}
      <figure ref={containerRef} className="guitar-neck w-3/4 h-fit" />
    </div>
  );
};

export default GuitarNeck;

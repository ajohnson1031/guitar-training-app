import { Fretboard } from "@moonwave99/fretboard.js";
import { useEffect, useRef } from "react";
import { getNoteName, NOTE_COLORS } from "../utils";

const GuitarNeck = ({ chord, tuning = ["E", "A", "D", "G", "B", "E"] }) => {
  const fretboardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!fretboardRef.current && containerRef.current) {
      fretboardRef.current = new Fretboard({
        el: ".guitar-neck",
        tuning,
        dotSize: 20,
      });
    }

    const chordFrets = chord.positions[0].frets
      .map((fret, index) => {
        if (fret === -1) return null;
        const openNote = tuning[index];
        const note = getNoteName(openNote, fret);
        return {
          string: index + 1,
          fret,
          note,
        };
      })
      .filter(Boolean);

    fretboardRef.current
      .setDots(chordFrets)
      .render()
      .style({ text: ({ note }) => note, fill: ({ note }) => NOTE_COLORS[note] });
  }, [chord]);

  return (
    <div className="flex flex-col w-full h-fit items-center">
      <div className="flex justify-center text-xl font-semibold gap-1">
        <p>{chord.key}</p>
        <p>{chord.suffix} Chord</p>
      </div>
      <figure ref={containerRef} className="guitar-neck w-3/4 h-fit" />
    </div>
  );
};

export default GuitarNeck;

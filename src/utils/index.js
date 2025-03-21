const CHROMATIC_SCALE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const getNoteName = (openNote, fret) => {
  if (fret < 0) return null;
  const startIndex = CHROMATIC_SCALE.indexOf(openNote);
  const noteIndex = (startIndex + fret) % CHROMATIC_SCALE.length;
  return CHROMATIC_SCALE[noteIndex];
};

const NOTE_COLORS = {
  C: "#ff6b6b",
  "C#": "#ffa94d",
  D: "#ffd43b",
  "D#": "#69db7c",
  E: "#38d9a9",
  F: "#4dabf7",
  "F#": "#845ef7",
  G: "#d0bfff",
  "G#": "#f783ac",
  A: "#fcc419",
  "A#": "#63e6be",
  B: "#74c0fc",
};

export { getNoteName, NOTE_COLORS };

import courseModel from "@/assets/mock/course.json";
const maxLength = courseModel.length;
export const courseItemLength = [
  { text: "5 sur " + maxLength, value: 5 },
  { text: "10 sur " + maxLength, value: 10 },
  { text: "25 sur " + maxLength, value: Math.ceil(maxLength * 0.25) },
  { text: "50 sur " + maxLength, value: Math.ceil(maxLength * 0.5) },
  { text: "75 sur " + maxLength, value: Math.ceil(maxLength * 0.75) },
  { text: "Tout afficher", value: maxLength },
];

// Option pour la longueur du tableau
// export const name_ItemLength = [
//   { text: "opt1", value: },
//   { text: "opt2", value:  },
//   { text: "Tout afficher", value:  },
// ];

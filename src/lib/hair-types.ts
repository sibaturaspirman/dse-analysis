export type HairType = {
  id: string;
  label: string;
  code: string;
  image: string;
};

export const HAIR_TYPES: HairType[] = [
  {
    id: "straight",
    label: "straight",
    code: "1B",
    image: "/images/hair-1.png",
  },
  {
    id: "wavy",
    label: "wavy",
    code: "2B",
    image: "/images/hair-2.png",
  },
  {
    id: "curly",
    label: "curly",
    code: "3B",
    image: "/images/hair-3.png",
  },
  {
    id: "coily",
    label: "coily",
    code: "4B",
    image: "/images/hair-4.png",
  },
];

import { random } from ".";

function randomCollegeName() {
  const names = [
    "Middle Park Institute",
    "East Holland University",
    "Westdyke College",
    "Alderney City School",
    "South Bohan Academy",
  ];
  return names[random({ start: 0, end: names.length })];
}

function randomAddress() {
  const addresses = [
    "South Bohan",
    "Middle Park",
    "East Holland",
    "Westdyke",
    "Alderney City",
  ];
  return addresses[random({ start: 0, end: addresses.length })];
}

// static data
export const dummyPreferenceList = [
  {
    id: 463,
    name: "South Bohan Academy",
    address: "Alderney City",
    website: "https://google.com",
  },
  {
    id: 52,
    name: "East Holland University",
    address: "South Bohan",
    website: "https://google.com",
  },
  {
    id: 404,
    name: "Westdyke College",
    address: "South Bohan",
    website: "https://google.com",
  },
  {
    id: 126,
    name: "Alderney City School",
    address: "Alderney City",
    website: "https://google.com",
  },
  {
    id: 737,
    name: "Middle Park Institute",
    address: "South Bohan",
    website: "https://google.com",
  },
  {
    id: 891,
    name: "Alderney City School",
    address: "Alderney City",
    website: "https://google.com",
  },
  {
    id: 532,
    name: "Middle Park Institute",
    address: "South Bohan",
    website: "https://google.com",
  },
  {
    id: 741,
    name: "East Holland University",
    address: "Westdyke",
    website: "https://google.com",
  },
  {
    id: 598,
    name: "Middle Park Institute",
    address: "Westdyke",
    website: "https://google.com",
  },
  {
    id: 224,
    name: "Middle Park Institute",
    address: "East Holland",
    website: "https://google.com",
  },
];

// generator
// export const dummyPreferenceList = Array.from({ length: 10 }, () => ({
//   id: random({ start: 100, end: 1000 }),
//   name: randomCollegeName(),
//   address: randomAddress(),
//   website: "https://google.com",
// }));

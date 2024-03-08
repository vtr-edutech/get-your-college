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

export const dummyPreferenceList = Array.from({ length: 10 }, () => ({
  id: random({ start: 100, end: 1000 }),
  name: randomCollegeName(),
  address: randomAddress(),
  website: "https://google.com",
}));

console.log(dummyPreferenceList);

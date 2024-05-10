import { LiaHardHatSolid } from "react-icons/lia";
import { CiMedicalCross } from "react-icons/ci";

/* 
  Once real data is given, replace the following data with the ones they give, and make sure whatever value is given in any of the following
  fields, the same is also followed when saving in MongoDB
*/
export const COLLEGE_CATEGORIES = [
  {
    name: "Engineering",
    value: "engineering",
    icon: <LiaHardHatSolid size={21} color='#228be6' />,
    disabled: false,
    subcategories: [
      {
        name: "TNEA Colleges",
        value: "tnea",
      },
    ],
  },
  {
    name: "Medical",
    value: "medical",
    icon: <CiMedicalCross size={20} color='red' />,
    disabled: false,
    subcategories: [
      {
        name: "Govt. College",
        value: "govt",
      },
      {
        name: "Self-Financing",
        value: "self",
      },
      {
        name: "Deemed University",
        value: "deemed",
      },
    ],
  },
];

export const ALL_VALID_CATEGORIES = COLLEGE_CATEGORIES.map(
  (cat) => cat.subcategories
).flat();

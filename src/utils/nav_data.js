import { FaBookMedical } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";

/* 
  Once real data is given, replace the following data with the ones they give, and make sure whatever value is given in any of the following
  fields, the same is also followed when saving in MongoDB
*/
export const COLLEGE_CATEGORIES = [
  {
    name: "Engineering",
    value: "engineering",
    icon: <MdEngineering size={18} />,
    disabled: false,
    subcategories: [
      {
        name: "TNEA Colleges",
        value: "tnea",
      },
    ],
  },
  {
    name: "Medical (Coming Soon)",
    value: "medical",
    icon: <FaBookMedical size={16} />,
    disabled: true,
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

export const ALL_VALID_CATEGORIES = COLLEGE_CATEGORIES.map(cat => cat.subcategories).flat();
import { usePagination } from "@mantine/hooks";
// import colleges from "../utils/collegeData";
import { useEffect, useMemo } from "react";
import { Pagination, Tooltip } from "@mantine/core";
import { districtData } from "@/utils/collegeDistrictData";
import { NBAdata } from "@/utils/collegeCourseNBAData";

const PAGE_SIZE = 25;
const allCasteCategories = ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"];

const communityColors = [
  "text-amber-500",
  "text-teal-500",
  "text-fuchsia-500",
  "text-cyan-500",
  "text-yellow-500",
  "text-emerald-500",
  "text-rose-500",
];

/* if sorting is needed, then create an object right here that says */

const collegesAfterFiltering = [{
  _id: {
    $oid: "6638e4a2a8844f799d64bf35",
  },
  collegeCode: "1",
  collegeName:
    "University Departments of Anna University  Chennai - CEG Campus  Sardar Patel Road  Guindy  Chennai 600 025",
  district: "Chennai",
  state: "TN",
  autonomous: true,
  minority: false,
  collegeCategory: "UNIVERSITY DEPARTMENTS",
  courses: [
    {
      courseCode: "BY",
      courseName: "BIO MEDICAL ENGINEERING  (SS)",
      NBA: false,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 195,
              BC: 191.5,
              BCM: 193.5,
              MBC: 188.845,
              SC: 184,
              SCA: 164,
            },
            SPF: {
              OC: 193.5,
              BC: 187.5,
              BCM: 164,
              MBC: 185.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 2794,
              BC: 5407,
              BCM: 3745,
              MBC: 8728,
              SC: 13686,
              SCA: 42751,
            },
            SPF: {
              OC: 99,
              BC: 294,
              BCM: 2900,
              MBC: 400,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 17,
                BC: 14,
                BCM: 1,
                MBC: 10,
                SC: 9,
                SCA: 2,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 2,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf37",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf36",
      },
    },
    {
      courseCode: "CE",
      courseName: "CIVIL  ENGINEERING",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 193,
              BC: 190,
              BCM: 192,
              MBC: 187,
              SC: 183,
              SCA: 173.5,
              ST: 177.5,
            },
            SPF: {
              OC: 190.5,
              BC: 180,
              BCM: 172,
              MBC: 188,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 4381,
              BC: 7534,
              BCM: 4847,
              MBC: 10276,
              SC: 15211,
              SCA: 27632,
              ST: 21614,
            },
            SPF: {
              OC: 175,
              BC: 0,
              BCM: 1622,
              MBC: 281,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 17,
                BC: 14,
                BCM: 1,
                MBC: 11,
                SC: 8,
                SCA: 2,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 1,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf39",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf38",
      },
    },
    {
      courseCode: "CM",
      courseName: "COMPUTER SCIENCE AND ENGINEERING (SS)",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 199.5,
              BC: 199,
              BCM: 198.5,
              MBC: 199,
              SC: 196,
              SCA: 178,
              ST: 192,
            },
            SPF: {
              OC: 197.5,
              BC: 195,
              MBC: 196.5,
              SC: 188.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 170,
              BC: 313,
              BCM: 536,
              MBC: 489,
              SC: 2255,
              SCA: 21395,
              ST: 4881,
            },
            SPF: {
              OC: 20,
              BC: 66,
              MBC: 46,
              SC: 256,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 33,
                BC: 28,
                BCM: 4,
                MBC: 21,
                SC: 15,
                SCA: 4,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf3b",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf3a",
      },
    },
    {
      courseCode: "CS",
      courseName: "COMPUTER SCIENCE AND ENGINEERING",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 200,
              BC: 200,
              BCM: 199.5,
              MBC: 199.5,
              SC: 198.5,
              SCA: 185.5,
            },
            SPF: {
              BC: 195,
              MBC: 198,
              SC: 196.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 32,
              BC: 80,
              BCM: 134,
              MBC: 138,
              SC: 668,
              SCA: 12008,
            },
            SPF: {
              BC: 61,
              MBC: 11,
              SC: 42,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 17,
                BC: 14,
                BCM: 2,
                MBC: 10,
                SC: 8,
                SCA: 2,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf3d",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf3c",
      },
    },
    {
      courseCode: "EC",
      courseName: "ELECTRONICS AND COMMUNICATION ENGINEERING",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 200,
              BC: 199.5,
              BCM: 198,
              MBC: 198.5,
              SC: 195,
              SCA: 186,
              ST: 180.5,
            },
            SPF: {
              OC: 198.5,
              BC: 198.5,
              MBC: 196.5,
              SC: 192.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 93,
              BC: 214,
              BCM: 988,
              MBC: 765,
              SC: 2859,
              SCA: 11536,
              ST: 18015,
            },
            SPF: {
              OC: 0,
              BC: 6,
              MBC: 41,
              SC: 118,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 16,
                BC: 14,
                BCM: 2,
                MBC: 11,
                SC: 8,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf3f",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf3e",
      },
    },
    {
      courseCode: "EE",
      courseName: "ELECTRICAL AND ELECTRONICS ENGINEERING",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 198,
              BC: 197.5,
              BCM: 195,
              MBC: 195.5,
              SC: 189,
              SCA: 176.5,
              ST: 171,
            },
            SPF: {
              OC: 194,
              BC: 193,
              MBC: 191,
              SC: 184.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 872,
              BC: 1271,
              BCM: 2732,
              MBC: 2275,
              SC: 8582,
              SCA: 23009,
              ST: 30910,
            },
            SPF: {
              OC: 87,
              BC: 107,
              MBC: 162,
              SC: 453,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 16,
                BC: 14,
                BCM: 2,
                MBC: 11,
                SC: 8,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf41",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf40",
      },
    },
    {
      courseCode: "EM",
      courseName: "ELECTRONICS AND COMMUNICATION ENGINEERING (SS)",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 199,
              BC: 198.5,
              BCM: 197.5,
              MBC: 197,
              SC: 191.5,
              SCA: 190,
              ST: 175.5,
            },
            SPF: {
              OC: 194,
              MBC: 192,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 432,
              BC: 583,
              BCM: 1310,
              MBC: 1377,
              SC: 5569,
              SCA: 7212,
              ST: 24413,
            },
            SPF: {
              OC: 88,
              MBC: 0,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 16,
                BC: 14,
                BCM: 2,
                MBC: 10,
                SC: 9,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf43",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf42",
      },
    },
    {
      courseCode: "GI",
      courseName: "GEO INFORMATICS",
      NBA: false,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 191,
              BC: 188.5,
              BCM: 188.5,
              MBC: 187.5,
              SC: 179.5,
              SCA: 159.5,
              ST: 155.5,
            },
            SPF: {
              OC: 190.5,
              BC: 184,
              MBC: 179,
              SC: 177.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 5965,
              BC: 8966,
              BCM: 8771,
              MBC: 9983,
              SC: 19048,
              SCA: 50451,
              ST: 57993,
            },
            SPF: {
              OC: 176,
              BC: 488,
              MBC: 828,
              SC: 978,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 17,
                BC: 14,
                BCM: 2,
                MBC: 11,
                SC: 8,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf45",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf44",
      },
    },
    {
      courseCode: "IE",
      courseName: "INDUSTRIAL ENGINEERING",
      NBA: false,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 189,
              BC: 184.5,
              BCM: 185.5,
              MBC: 179.5,
              SC: 169.5,
              SCA: 148,
            },
            SPF: {
              OC: 183,
              BC: 180,
              MBC: 182.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 8513,
              BC: 13048,
              BCM: 12042,
              MBC: 19299,
              SC: 33284,
              SCA: 73337,
            },
            SPF: {
              OC: 528,
              BC: 734,
              MBC: 576,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 16,
                BC: 14,
                BCM: 2,
                MBC: 10,
                SC: 9,
                SCA: 2,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 7,
                SCA: 2,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf47",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf46",
      },
    },
    {
      courseCode: "IM",
      courseName: "INFORMATION TECHNOLOGY (SS)",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 199,
              BC: 198.5,
              BCM: 198,
              MBC: 198,
              SC: 191.5,
              SCA: 176,
              ST: 182.5,
            },
            SPF: {
              OC: 197,
              BC: 193.5,
              MBC: 196,
              SC: 190,
              SCA: 178.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 505,
              BC: 678,
              BCM: 1017,
              MBC: 1011,
              SC: 5387,
              SCA: 24024,
              ST: 15638,
            },
            SPF: {
              OC: 32,
              BC: 91,
              MBC: 49,
              SC: 202,
              SCA: 905,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 33,
                BC: 29,
                BCM: 4,
                MBC: 21,
                SC: 16,
                SCA: 3,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 3,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf49",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf48",
      },
    },
    {
      courseCode: "MA",
      courseName: "MATERIAL SCIENCE AND ENGINEERING (SS)",
      NBA: false,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 187.5,
              BC: 182,
              BCM: 184,
              MBC: 176.5,
              SC: 171.5,
              SCA: 173,
            },
            SPF: {
              BC: 174.5,
              SC: 162,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 9851,
              BC: 16212,
              BCM: 13680,
              MBC: 23328,
              SC: 30547,
              SCA: 27969,
            },
            SPF: {
              BC: 1287,
              SC: 3194,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 8,
                BC: 7,
                BCM: 1,
                MBC: 6,
                SC: 3,
                SCA: 1,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 1,
                SC: 3,
                SCA: 1,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf4b",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf4a",
      },
    },
    {
      courseCode: "ME",
      courseName: "MECHANICAL ENGINEERING",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 195.5,
              BC: 193.5,
              BCM: 191,
              MBC: 191.5,
              SC: 182.5,
              SCA: 168,
            },
            SPF: {
              OC: 191,
              BC: 181,
              MBC: 182,
              SC: 181.5,
              ST: 170.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 2279,
              BC: 3885,
              BCM: 6054,
              MBC: 5386,
              SC: 15385,
              SCA: 35544,
            },
            SPF: {
              OC: 167,
              BC: 195,
              MBC: 619,
              SC: 642,
              ST: 1839,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 33,
                BC: 29,
                BCM: 4,
                MBC: 21,
                SC: 16,
                SCA: 4,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 4,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf4d",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf4c",
      },
    },
    {
      courseCode: "MI",
      courseName: "MINING ENGINEERING",
      NBA: false,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 187,
              BC: 181.5,
              BCM: 174,
              MBC: 175,
              SC: 170.5,
              SCA: 163,
            },
            SPF: {
              BC: 184.5,
              SC: 176,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 10258,
              BC: 16834,
              BCM: 26855,
              MBC: 25388,
              SC: 31995,
              SCA: 44098,
            },
            SPF: {
              BC: 0,
              SC: 1176,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 8,
                BC: 7,
                BCM: 1,
                MBC: 6,
                SC: 3,
                SCA: 1,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 1,
                MBC: 2,
                SC: 1,
                SCA: 1,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf4f",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf4e",
      },
    },
    {
      courseCode: "MN",
      courseName: "MANUFACTURING ENGINEERING",
      NBA: false,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 186,
              BC: 179,
              BCM: 182,
              MBC: 179.89,
              SC: 165,
              SCA: 136.5,
              ST: 135,
            },
            SPF: {
              OC: 180,
              BC: 175.5,
              MBC: 173,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 11859,
              BC: 19987,
              BCM: 16413,
              MBC: 18831,
              SC: 40702,
              SCA: 99127,
              ST: 101973,
            },
            SPF: {
              OC: 733,
              BC: 1227,
              MBC: 1482,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 16,
                BC: 14,
                BCM: 2,
                MBC: 11,
                SC: 9,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 8,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 1,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf51",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf50",
      },
    },
    {
      courseCode: "PT",
      courseName: "PRINTING AND PACKING TECHNOLOGY",
      NBA: false,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 181.955,
              BC: 170.5,
              BCM: 173,
              MBC: 171.5,
              SC: 162,
              SCA: 131,
            },
            SPF: {
              OC: 185.5,
              BC: 163.5,
              MBC: 177,
              SC: 166.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 16436,
              BC: 31958,
              BCM: 27787,
              MBC: 30484,
              SC: 45771,
              SCA: 110885,
            },
            SPF: {
              OC: 394,
              BC: 2947,
              MBC: 1056,
              SC: 0,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 17,
                BC: 15,
                BCM: 2,
                MBC: 10,
                SC: 8,
                SCA: 2,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 11,
                BCM: 1,
                MBC: 7,
                SC: 8,
                SCA: 2,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 2,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf53",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf52",
      },
    },
    {
      courseCode: "XC",
      courseName: "CIVIL ENGINEERING (TAMIL MEDIUM)",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 180.5,
              BC: 174,
              BCM: 161,
              MBC: 165.5,
              SC: 166,
              SCA: 157.5,
            },
            SPF: {
              BC: 175.5,
              SC: 175,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 17936,
              BC: 26694,
              BCM: 47395,
              MBC: 39836,
              SC: 38859,
              SCA: 54069,
            },
            SPF: {
              BC: 0,
              SC: 0,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 9,
                BC: 7,
                BCM: 1,
                MBC: 6,
                SC: 3,
                SCA: 1,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 5,
                BCM: 1,
                MBC: 6,
                SC: 3,
                SCA: 1,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf55",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf54",
      },
    },
    {
      courseCode: "XM",
      courseName: "MECHANICAL ENGINEERING (TAMIL MEDIUM)",
      NBA: true,
      data: [
        {
          year: 2023,
          cutoff: {
            GC: {
              OC: 180,
              BC: 175.5,
              BCM: 175.5,
              MBC: 168,
              SC: 166,
              ST: 134.5,
            },
            SPF: {
              BC: 179,
              SCA: 178.5,
            },
            VOC: 0,
          },
          rank: {
            GC: {
              OC: 18326,
              BC: 24333,
              BCM: 24693,
              MBC: 35639,
              SC: 38724,
              ST: 102865,
            },
            SPF: {
              BC: 855,
              SCA: 894,
            },
            VOC: 0,
          },
          vacancy: {
            round_1: {
              GC: {
                OC: 9,
                BC: 6,
                BCM: 1,
                MBC: 6,
                SC: 4,
                SCA: 0,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_2: {
              GC: {
                OC: 0,
                BC: 2,
                BCM: 1,
                MBC: 4,
                SC: 3,
                SCA: 0,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
            round_3: {
              GC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 1,
              },
              SPF: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
              VOC: {
                OC: 0,
                BC: 0,
                BCM: 0,
                MBC: 0,
                SC: 0,
                SCA: 0,
                ST: 0,
              },
            },
          },
          _id: {
            $oid: "6638e4a2a8844f799d64bf57",
          },
        },
      ],
      _id: {
        $oid: "6638e4a2a8844f799d64bf56",
      },
    },
  ],
  __v: 0,
}];

const CollegeInfoTable = ({ searchCriteria }) => {
//   const collegesAfterFiltering = useMemo(() => {
//     var collegeData = [];
//     if (!searchCriteria || !searchCriteria?.cutoffCategory) return collegeData;
//     if (!searchCriteria || searchCriteria?.searchKey == "")
//       collegeData = colleges[searchCriteria.cutoffCategory];
//     collegeData = colleges[searchCriteria.cutoffCategory].filter((college) =>
//       (
//         college["College Name"] +
//         college["Branch Name"] +
//         college["College Code"]
//       )
//         .toLowerCase()
//         .replace(/\s+/g, "")
//         .includes(searchCriteria.searchKey.toLowerCase().replace(/\s+/g, ""))
//     );
//     return collegeData.map((college) => {
//       const collegeMiscDetails = districtData.find(
//         (collegeMisc) => collegeMisc["COLLEGE CODE"] == college["College Code"]
//       );
//       const courseNBADetails = NBAdata.find(
//         (course) =>
//           course["COLLEGE CODE"] == college["College Code"] &&
//           course["BRANCH"] == college["Branch Code"]
//       );
//       // console.log(college["Branch Code"], college['College Code'], courseNBADetails);
//       return {
//         ...college,
//         "COLLEGE STATUS": collegeMiscDetails
//           ? collegeMiscDetails["College Status"]
//           : "N/A",
//         "MINORITY STATUS":
//           collegeMiscDetails && collegeMiscDetails["Minority Status"]
//             ? collegeMiscDetails["Minority Status"]
//             : "N/A",
//         NBA:
//           courseNBADetails && courseNBADetails["NBA Accredited"]
//             ? typeof courseNBADetails["NBA Accredited"] == "number"
//               ? "yes"
//               : courseNBADetails["NBA Accredited"].toString().toLowerCase() ==
//                 "yes"
//               ? "yes"
//               : "no"
//             : "no",
//       };
//     });
//   }, [searchCriteria]);

//   const pagination = usePagination({
//     total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
//     initialPage: 1,
//     siblings: 1,
//   });

  // console.log(collegesAfterFiltering.slice(0, 10));

//   useEffect(() => pagination.setPage(1), [searchCriteria.searchKey]);

  return (
    <>
      <div className='w-full self-end flex'>
        {/* <Pagination
          total={parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='ml-auto'
        ></Pagination> */}
      </div>

      {/* Table Header */}
      <div className='overflow-x-scroll md:overflow-x-hidden flex flex-col mt-6 w-full transition-all'>
        <div className='flex justify-around min-w-fit md:min-w-[unset] items-center mt-1 mx-1 p-1.5 md:p-3 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 shadow sticky top-0 bg-white'>
          <h2 className='flex-1 font-medium max-w-16 min-w-14'>S.No.</h2>
          <h2 className='flex-1 font-medium max-w-24 min-w-16 md:mx-2'>
            College Code
          </h2>
          <h2 className='min-w-52 max-w-96 flex-1 font-medium mx-2'>
            College Name
          </h2>
          <h2 className='max-w-40 flex-1 font-medium min-w-36 mx-2'>
            Branch Name
          </h2>
          <h2 className='max-w-28 flex-1 font-medium min-w-16 mx-2'>
            Branch Code
          </h2>
          {/* <h2 className='max-w-36 flex-1 font-medium min-w-24'>
            Cutoff
          </h2> */}
          {allCasteCategories.map((cat, i) => (
            <h2
              key={i}
              className={`flex-1 text-sm md:min-w-12 md:max-w-16 ${
                communityColors[i]
              } ${
                searchCriteria.filterBy == "Rank"
                  ? "min-w-16 max-w-20"
                  : "min-w-12 max-w-16"
              }`}
            >
              {cat}
            </h2>
          ))}
        </div>

        {/* Table body */}
        {collegesAfterFiltering
          //   .slice(
          //     PAGE_SIZE * pagination.active - PAGE_SIZE,
          //     PAGE_SIZE * pagination.active
          //   )
          .map((college) =>
            college.courses.map((course, i) => (
              <div
                key={i}
                className={`flex transition-all min-w-fit mx-1 md:min-w-[unset] justify-around items-center outline p-1.5 md:p-1 min-h-32 last-of-type:mb-1 animate-fade-in overflow-hidden ${
                  i % 2 != 0 ? "bg-white" : "bg-blue-50/70"
                } outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md`}
              >
                <h2 className='flex-1 text-sm max-w-16 min-w-14'>
                  <p className='ml-2'>{i + 1}</p>
                </h2>
                <h2 className='flex-1 text-sm max-w-24 min-w-16 md:mx-2'>
                  {college.collegeCode}
                </h2>
                <h2 className='min-w-52 max-w-96 flex-1 mx-2 text-sm'>
                  {college.collegeName}
                  <br />
                  <div className='flex h-fit gap-1 mt-1 flex-wrap'>
                    {
                      <p className='px-1.5 py-3/4 rounded-full text-xs text-cyan-600 bg-cyan-50 w-fit h-fit cursor-default'>
                        {college.autonomous ? "Autonomous" : "Non-Autonomous"}
                      </p>
                    }
                    {
                      <p className='px-1.5 cursor-default py-3/4 rounded-full text-xs text-amber-500 bg-amber-50 w-fit h-fit'>
                        {college.minority ? "Minority" : "Non-Minority"}
                      </p>
                    }
                  </div>
                </h2>
                <h2 className='max-w-40 flex-1 text-sm min-w-36 break-words mx-2'>
                  {course.courseName}
                  {course.NBA ? (
                    <Tooltip
                      label='NBA Accredited'
                      withArrow
                      styles={{
                        tooltip: {
                          fontSize: "12px",
                        },
                      }}
                    >
                      <p className='px-1.5 py-3/4 rounded-full text-xs text-violet-500 bg-violet-50 w-fit h-fit cursor-default'>
                        NBA
                      </p>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </h2>
                <h2 className='max-w-28 flex-1 flex gap-1 items-center text-sm min-w-16 mx-2'>
                  {course.courseCode}
                </h2>
                {allCasteCategories.map((key, i) => (
                  <h2
                    key={i}
                    className={`flex-1 text-sm md:min-w-12 md:max-w-16 ${
                      communityColors[i]
                    } ${
                      searchCriteria.filterBy == "Rank"
                        ? "min-w-16 max-w-20"
                        : "min-w-12 max-w-16"
                    }`}
                  >
                    {course.data[0][searchCriteria.filterBy.toLowerCase()][
                      "GC"
                    ][key]
                      ? course.data[0][searchCriteria.filterBy.toLowerCase()][
                          "GC"
                        ][key]
                          .toString()
                          .includes(".")
                        ? course.data[0][searchCriteria.filterBy.toLowerCase()][
                            "GC"
                          ][key].toFixed(1)
                        : course.data[0][searchCriteria.filterBy.toLowerCase()][
                            "GC"
                          ][key]
                      : "-"}
                  </h2>
                ))}
              </div>
            ))
          )}
      </div>
      <div className='w-full md:self-end self-start md:flex-row flex-col flex'>
        {searchCriteria.searchKey.trim() !== "" && (
          <p className='ml-2'>
            <span className='font-medium'>{collegesAfterFiltering.length}</span>{" "}
            college(s) found
          </p>
        )}
        {/* <Pagination
          total={parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='ml-auto'
        /> */}
      </div>
    </>
  );
};

export default CollegeInfoTable;

import { Schema, models, model } from "mongoose"

const CollegeSchema = new Schema({
  collegeCode: String,
  collegeName: String,
  district: String,
  state: {
    type: String,
    enum: ["TN"],
    default: "TN"
  },
  autonomous: Boolean,
  minority: Boolean,
  collegeCategory: {
    type: String,
    enum: [
      "UNIVERSITY DEPARTMENTS",
      "GOVERNMENT COLLEGES",
      "GOVERNMENT AIDED COLLEGES",
      "CECRI AND CIPET",
      "CONSTITUENT COLLEGES",
      "SELF FINANCING ENGINEERING COLLEGES",
    ],
  },
  courses: [
    {
      courseCode: String,
      courseName: String,
      NBA: Boolean,
      data: [
        {
          year: Number,
          cutoff: {
            GC: {
              OC: Number,
              BC: Number,
              BCM: Number,
              MBC: Number,
              SC: Number,
              SCA: Number,
              ST: Number,
            },
            SPF: {
              OC: Number,
              BC: Number,
              BCM: Number,
              MBC: Number,
              SC: Number,
              SCA: Number,
              ST: Number,
            },
            VOC: {
              OC: Number,
              BC: Number,
              BCM: Number,
              MBC: Number,
              SC: Number,
              SCA: Number,
              ST: Number,
            },
          },
          rank: {
            GC: {
              OC: Number,
              BC: Number,
              BCM: Number,
              MBC: Number,
              SC: Number,
              SCA: Number,
              ST: Number,
            },
            SPF: {
              OC: Number,
              BC: Number,
              BCM: Number,
              MBC: Number,
              SC: Number,
              SCA: Number,
              ST: Number,
            },
            VOC: {
              OC: Number,
              BC: Number,
              BCM: Number,
              MBC: Number,
              SC: Number,
              SCA: Number,
              ST: Number,
            },
          },
          vacancy: {
            round_1: {
              GC: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
              SPF: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
              VOC: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
            },
            round_2: {
              GC: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
              SPF: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
              VOC: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
            },
            round_3: {
              GC: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
              SPF: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
              VOC: {
                OC: Number,
                BC: Number,
                BCM: Number,
                MBC: Number,
                SC: Number,
                SCA: Number,
                ST: Number,
              },
            },
          },
        },
      ],
    },
  ],
});

const CollegesModel = models["colleges"] || model("colleges", CollegeSchema);

export default CollegesModel;
import { Schema, model, models } from "mongoose";

const ChoiceList = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    list: [
      {
        collegeCode: String,
        branchCode: String,
      },
    ],
  },
  { timestamps: true }
);

const ChoiceListModel = models["choicelist"] || model("choicelist", ChoiceList);

export default ChoiceListModel;

"use client";

import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import ContentCardLoader from "@/components/ContentCardLoader";

const EngineeringChoiceList = lazy(() => import("./engg"));
const MedicalChoiceList = lazy(() => import("./med"));

export default function Page() {
  const currentCollegeType = useSelector((state) => state.collegeCategory);
  if (!currentCollegeType) {
    throw new Error("College Type Should be: Engineering or Medical");
  }
  return currentCollegeType === "engineering" ? (
    <Suspense fallback={<ContentCardLoader />}>
      <EngineeringChoiceList />
    </Suspense>
  ) : (
    <Suspense fallback={<ContentCardLoader />}>
      <MedicalChoiceList />
    </Suspense>
  );
}

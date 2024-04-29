"use client";

import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

const EngineeringCutoffPage = lazy(() => import("./engg"));
const MedicalCutoffPage = lazy(() => import("./med"));

export default function Page() {
  const currentCollegeType = useSelector((state) => state.collegeCategory);
  if (!currentCollegeType) {
    throw new Error("College Type Should be: Engineering or Medical");
  }
  return currentCollegeType === "engineering" ? (
    <Suspense fallback={"Loading Engineering Cutoff page..."}>
      <EngineeringCutoffPage />
    </Suspense>
  ) : (
    <Suspense fallback={"Loading medical Cutoff page..."}>
      <MedicalCutoffPage />
    </Suspense>
  );
}

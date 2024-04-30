"use client";

import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import ContentCardLoader from "@/components/ContentCardLoader";

const EngineeringCutoffPage = lazy(() => import("./engg"));
const MedicalCutoffPage = lazy(() => import("./med"));

export default function Page() {
  const currentCollegeType = useSelector((state) => state.collegeCategory);
  if (!currentCollegeType) {
    throw new Error("College Type Should be: Engineering or Medical");
  }
  return currentCollegeType === "engineering" ? (
    <Suspense fallback={<ContentCardLoader />}>
      <EngineeringCutoffPage />
    </Suspense>
  ) : (
    <Suspense fallback={<ContentCardLoader />}>
      <MedicalCutoffPage />
    </Suspense>
  );
}

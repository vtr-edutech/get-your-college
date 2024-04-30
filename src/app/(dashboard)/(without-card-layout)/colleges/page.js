"use client";

import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import ContentCardLoader from "@/components/ContentCardLoader";

const EngineeringCollegesPage = lazy(() => import("./engg"));
const MedicalCollegesPage = lazy(() => import("./med"));

export default function Page() {
  const currentCollegeType = useSelector((state) => state.collegeCategory);
  if (!currentCollegeType) {
    throw new Error("College Type Should be: Engineering or Medical");
  }
  return currentCollegeType === "engineering" ? (
    <Suspense fallback={<ContentCardLoader withContainerCard />}>
      <EngineeringCollegesPage />
    </Suspense>
  ) : (
    <Suspense fallback={<ContentCardLoader withContainerCard />}>
      <MedicalCollegesPage />
    </Suspense>
  );
}

"use client";
import { useLocalStorage } from "@mantine/hooks";
import { TourProvider as Tour } from "@reactour/tour";

export default function TourProvider({ children }) {
  const [hasMedicalTourPlayed, setHasMedicalTourPlayed] = useLocalStorage({
      key: "hasMedicalPlayed",
      defaultValue: false,
  });
  
  const [hasHomeTourBeenPlayed, setHasTourBeenPlayed] = useLocalStorage({
    key: "hasHomeFilterPlayed",
    defaultValue: false,
  });

  const [hasNavTourBeenPlayed, setHasNavTourBeenPlayed] = useLocalStorage({
    key: "hasNavTourPlayed",
    defaultValue: "false",
  });

  return (
    <Tour
      steps={[
        {
          selector: "body",
          content: ({ setIsOpen, currentStep, setCurrentStep }) => (
            <div className='flex flex-col'>
              <p>Let&apos;s start a quick tour to guide you through!</p>
              <div className='flex justify-between items-center'>
                <button
                  className={`ml-auto`}
                  onClick={() => {
                    setCurrentStep(currentStep + 1);
                  }}
                >
                  Next ›
                </button>
              </div>
            </div>
          ),
          position: "center",
        },
        {
          selector: ".collge-type-selector",
          position: "right",
          content: ({ setIsOpen, setCurrentStep }) => (
            <div className='flex flex-col'>
              <p>Select the type of college you are searching for...</p>
              <div className='flex justify-between items-center'>
                <button
                  onClick={() => {
                    setCurrentStep((prev) => prev - 1);
                  }}
                >
                  ‹ Prev
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setHasNavTourBeenPlayed(true);
                  }}
                >
                  Next ›
                </button>
              </div>
            </div>
          ),
        },
        {
          selector: ".initial-filters",
          content: ({ setIsOpen, setCurrentStep }) => (
            <div className='flex flex-col'>
              <p>Use these filters to choose your engineering college</p>
              <div className='flex justify-between items-center'>
                <button
                  onClick={() => {
                    setCurrentStep((prev) => prev - 1);
                  }}
                >
                  ‹ Prev
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    localStorage.setItem("hasHomeFilterPlayed", "true");
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ),
          position: "bottom",
        },
        {
          selector: ".medical-intial-filters",
          content: "Use these filters to select your colleges",
          content: ({ setIsOpen, setCurrentStep }) => (
            <div className='flex flex-col'>
              <p>Use these filters to choose your medical college</p>
              <div className='flex justify-between items-center'>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                >
                  ‹ Prev
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setHasMedicalTourPlayed(true);
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ),
          position: "bottom",
        },
      ]}
      disableDotsNavigation
      onClickClose={false}
      nextButton={() => {}}
      showNavigation={false}
      showDots={false}
      components={{ Badge: () => {} }}
    >
      {children}
    </Tour>
  );
}

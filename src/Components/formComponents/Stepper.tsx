import React from 'react';
import { CiUser, CiMail, CiPhone } from 'react-icons/ci';

const IconArray = [CiUser, CiMail, CiPhone];

type SideComponentProps = {
  currentStep: number;
  index: number;
};

const IconComponent = ({ currentStep, index }: SideComponentProps) => {
  const Icon = IconArray[index];

  return (
    <div className="flex flex-col items-center">
      <div
        className={`rounded-full p-4 w-12 flex justify-center items-center ${
          currentStep === index + 1 ? 'bg-[#97EFB0]' : 'bg-gray-200'
        }`}
      >
        <Icon className="text-black" size={20} />
      </div>
    </div>
  );
};

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex justify-center items-center my-8 relative">
      {IconArray.map((_, index) => (
        <React.Fragment key={index}>
          <IconComponent currentStep={currentStep} index={index} />
          {index < IconArray.length - 1 && (
            <div className="h-1 w-16 bg-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;

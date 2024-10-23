import React from 'react';
import { CiUser, CiMail, CiPhone } from 'react-icons/ci';

type SideComponentProps = {
  currentStep: number;
  index: number;
};

const SideComponents = ({ currentStep, index }: SideComponentProps) => {
  return (
    <div className="flex justify-center items-center relative my-8 w-full">
      {/* Horizontal Line */}
      <div className="absolute inset-x-0 top-1/2 h-1 bg-gray-300" />

      <div className="flex text-center justify-between items-center gap-2 z-10">
        <div
          className={`rounded-full p-4 flex justify-center items-center ${
            currentStep === index + 1 ? 'bg-[#97EFB0]' : 'bg-[#494A7D]'
          }`}
        >
          {index === 0 && <CiUser className="text-white" size={24} />}
          {index === 1 && <CiMail className="text-white" size={24} />}
          {index === 2 && <CiPhone className="text-white" size={24} />}
        </div>
      </div>
    </div>
  );
};

export default SideComponents;

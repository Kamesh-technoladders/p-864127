
import React, { useState } from "react";
import { AddExperienceModal, ExperienceData } from "./AddExperienceModal";
import { toast } from "sonner";

interface Experience extends ExperienceData {
  id: string;
}

export const ExperienceForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      jobTitle: "Software Developer",
      company: "Wipro Limited",
      location: "Bengaluru, India",
      employmentType: "Full Time",
      startDate: "2018-07-01",
      endDate: "2020-11-30",
      payslips: [],
    },
  ]);

  const handleAddExperience = (data: ExperienceData) => {
    try {
      const newExperience: Experience = {
        ...data,
        id: Date.now().toString(),
      };
      setExperiences((prev) => [...prev, newExperience]);
    } catch (error) {
      console.error("Error adding experience:", error);
      toast.error("Failed to add experience");
    }
  };

  return (
    <div className="flex w-full flex-col mt-[30px] px-4">
      <div className="text-[rgba(48,64,159,1)] text-sm font-bold">
        Experience
      </div>
      <div className="text-[rgba(80,80,80,1)] text-xs font-medium mt-1">
        Add your previous working experience and internship details.
      </div>

      {experiences.map((experience) => (
        <div
          key={experience.id}
          className="bg-[rgba(242,242,245,1)] border self-stretch w-full mt-6 px-[15px] py-3 rounded-lg border-[rgba(238,238,238,1)] border-solid"
        >
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[33%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col text-sm text-black font-normal">
                <div className="text-base font-semibold">
                  {experience.jobTitle} - {experience.employmentType}
                </div>
                <div className="text-[rgba(48,48,48,1)] font-semibold mt-2">
                  {experience.company} - {experience.location}
                </div>
                <div className="text-[rgba(80,80,80,1)] mt-1.5">
                  {new Date(experience.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(experience.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                {!experience.offerLetter && (
                  <div className="mt-5">
                    *Payslip not available reason goes here.
                  </div>
                )}
                {!experience.separationLetter && (
                  <div className="self-stretch mt-1">
                    *Separation letter not available reason goes here.
                  </div>
                )}
              </div>
            </div>

            <div className="w-[67%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex items-stretch gap-[40px_58px] self-stretch flex-wrap my-auto">
                <div className="flex flex-col items-stretch">
                  <div className="flex items-stretch gap-5 text-xs text-[rgba(48,48,48,1)] font-semibold justify-between">
                    <div>Offer Letter</div>
                    <div>Separation Letter</div>
                  </div>
                  <div className="flex items-stretch gap-[40px_45px] text-sm text-black font-normal whitespace-nowrap mt-2">
                    {experience.offerLetter ? (
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/67621ce3f4058a33953fd3e1890863f67564d77b3fa7afeac1f9a73e808404c8?placeholderIfAbsent=true&width=100 100w"
                        className="aspect-[1] object-contain w-[50px] shrink-0"
                        alt="Document"
                      />
                    ) : (
                      <div className="my-auto">-</div>
                    )}
                    {experience.separationLetter ? (
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/67621ce3f4058a33953fd3e1890863f67564d77b3fa7afeac1f9a73e808404c8?placeholderIfAbsent=true&width=100 100w"
                        className="aspect-[1] object-contain w-[50px] shrink-0"
                        alt="Document"
                      />
                    ) : (
                      <div className="my-auto">-</div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
                  <div className="flex items-stretch gap-[30px] text-xs text-[rgba(48,48,48,1)] font-semibold">
                    <div>Payslip 1</div>
                    <div>Payslip 2</div>
                    <div>Payslip 3</div>
                  </div>
                  <div className="flex w-full items-stretch gap-5 text-sm text-black font-normal whitespace-nowrap justify-between mt-2">
                    <div className="flex items-stretch gap-[31px]">
                      {experience.payslips.slice(0, 3).map((_, index) => (
                        <img
                          key={index}
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/67621ce3f4058a33953fd3e1890863f67564d77b3fa7afeac1f9a73e808404c8?placeholderIfAbsent=true&width=100 100w"
                          className="aspect-[1] object-contain w-[50px] shrink-0"
                          alt="Document"
                        />
                      ))}
                      {Array.from({ length: 3 - experience.payslips.length }).map((_, index) => (
                        <div key={`empty-${index}`} className="my-auto">-</div>
                      ))}
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/5f840485d2774e38314ae735d0eb7199567aa5ff6cdef2d04a2bc563cee46918?placeholderIfAbsent=true"
                      className="aspect-[3] object-contain w-12 shrink-0 mt-[5px]"
                      alt="More options"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-stretch gap-2 text-sm text-[rgba(221,1,1,1)] font-medium mt-3.5"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/94ba00a354d444e81c8d49b7bd51add7537c14e2c575d31fbdfae2aad48e7d91?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-4 shrink-0"
          alt="Add icon"
        />
        Add Experience
      </button>

      <AddExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExperience}
      />
    </div>
  );
};

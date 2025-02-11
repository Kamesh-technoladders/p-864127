
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import { Experience } from "../types";

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (experience: Experience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-[rgba(242,242,245,1)] border self-stretch w-full mt-6 px-[15px] py-3 rounded-lg border-[rgba(238,238,238,1)] border-solid">
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
              <div className="mt-5">*Payslip not available reason goes here.</div>
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
            <DocumentDisplay experience={experience} />
            <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
              <PayslipsDisplay payslips={experience.payslips} />
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none ml-auto">
                  <MoreVertical className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => onEdit(experience)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(experience)}
                    className="flex items-center gap-2 cursor-pointer text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentDisplay: React.FC<{ experience: Experience }> = ({ experience }) => {
  return (
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
  );
};

const PayslipsDisplay: React.FC<{ payslips: File[] }> = ({ payslips }) => {
  return (
    <>
      <div className="flex items-stretch gap-[30px] text-xs text-[rgba(48,48,48,1)] font-semibold">
        <div>Payslip 1</div>
        <div>Payslip 2</div>
        <div>Payslip 3</div>
      </div>
      <div className="flex w-full items-stretch gap-5 text-sm text-black font-normal whitespace-nowrap justify-between mt-2">
        <div className="flex items-stretch gap-[31px]">
          {payslips.slice(0, 3).map((_, index) => (
            <img
              key={index}
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/67621ce3f4058a33953fd3e1890863f67564d77b3fa7afeac1f9a73e808404c8?placeholderIfAbsent=true&width=100 100w"
              className="aspect-[1] object-contain w-[50px] shrink-0"
              alt="Document"
            />
          ))}
          {Array.from({
            length: 3 - (payslips?.length || 0),
          }).map((_, index) => (
            <div key={`empty-${index}`} className="my-auto">
              -
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

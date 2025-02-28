"use client";

import { ImageType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import SelectedImage from "./SelectedImage";
import Button from "./Button";

interface SelectColorProps {
  item: ImageType;
  addImageToFormState: (value: ImageType) => void;
  removeImageFromFormState: (value: ImageType) => void;
  isProductCreated: boolean;
}

export default function SelectColor({
  item,
  isProductCreated,
  addImageToFormState,
  removeImageFromFormState,
}: SelectColorProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToFormState({ ...item, image: value });
  }, []);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      setFile(null);
      removeImageFromFormState(item);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer "
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectedImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
            <p>{file?.name}</p>
            <div className="w-[70px]">
              <Button
                label="Cancel"
                small
                outline
                onClick={() => {
                  setFile(null);
                  removeImageFromFormState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
}

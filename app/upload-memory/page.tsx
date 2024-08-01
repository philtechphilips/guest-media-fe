"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, DragEvent, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const router = useRouter();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length < 1) {
      toast.error("Select at least one file!");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Files uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error uploading files!");
    }
  };

  return (
    <div className="w-full pb-20 p-5 bg-gray-50 animate-slideInFromRight">
      <div className="flex items-center gap-2" onClick={() => router.push("/")}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-lg"
        ></FontAwesomeIcon>
        <p className="text-lg font-semibold">Back</p>
      </div>

      <div>
        <section className="mt-12">
          <h2 className="font-bold text-[#1D1D1D]">
            Upload your captured memory of the event.
          </h2>
          <p className="text-base font-normal text-[#ACACAC] mt-2">
            We would love to see your photos and videos from our special day!
          </p>
        </section>

        <form className="rounded-lg w-full py-5" onSubmit={handleSubmit}>
          <label htmlFor="doc-upload" className="cursor-pointer">
            <input
              type="file"
              name="file"
              id="doc-upload"
              hidden
              multiple
              onChange={handleFileChange}
            />
            <div
              id="drop-area"
              className={`border-2 border-[#E4E5E7] w-full bg-[#F9F9F9] border-dashed rounded-lg gap-6 my-8 flex flex-col items-center justify-center py-28 ${
                isDragging ? "bg-gray-200" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <h1 className="text-[#121212]">Upload your media</h1>
              <img src="/images/upload-icon.svg" className="w-10" alt="" />
              <div className="flex flex-col gap-3 items-center justify-center">
                <h1 className="text-[#121212]">
                  Drag and drop your media here
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-[#E4E5E7] h-[1px]"></div>
                  <h1 className="text-[#121212]">OR</h1>
                  <div className="w-32 bg-[#E4E5E7] h-[1px]"></div>
                </div>
                <h1 className="text-[#938373]">choose a file</h1>
              </div>
            </div>
          </label>

          <div className="flex flex-col gap-3 mb-2">
            {files.length > 0 && (
              <h6 className="font-semibold text-gray-800">Files Selected</h6>
            )}
            <div className="flex flex-col gap-2 items-start">
              <div id="fileNamesContainer">
                {files.map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="buttons text-white text-lg mt-2 bg-transparent border-2 border-[#938373] rounded-full z-[100] flex items-center gap-2 py-[6px] px-4 pr-10 w-fit"
          >
            <p className="text-[#938373] font-semibold">Upload memories</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;

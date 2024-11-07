"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/imageupload";
import { Paperclip } from "lucide-react";

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">JMX or XML only</p>
    </>
  );
};

const DropZone = ({
  file,
  setFile,
  handleUpload,
}: {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleUpload: () => void;
}) => {
  const { theme } = useTheme();

  const dropZoneConfig = {
    accept: {
      "application/xml": [".xml"], // Accept XML files
      "application/vnd.jmeter": [".jmx"], // Accept JMX files
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4, // 4MB max file size
    multiple: false, // Allow only single file upload
  };

  return (
    <FileUploader
      value={file}
      onValueChange={setFile}
      dropzoneOptions={dropZoneConfig}
      className={`relative rounded-lg p-2 bg-field`}
    >
      <div className="grid gap-[16px]">
        <FileInput
          className={`outline-dashed outline-1 ${
            theme === "dark" ? "outline-gray-600" : "outline-gray-200"
          }`}
        >
          <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
            <FileSvgDraw />
          </div>
        </FileInput>
        <FileUploaderContent>
          <div className="grid gap-[16px]">
            {file && (
              <FileUploaderItem>
                <div className="mb-2"></div>
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            )}

            <Button
              variant="default"
              onClick={() => {
                handleUpload();
              }}
              disabled={!file}
            >
              Upload Test
            </Button>
          </div>
        </FileUploaderContent>
      </div>
    </FileUploader>
  );
};

export default DropZone;

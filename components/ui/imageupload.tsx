"use client";

import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import {
  Dispatch,
  SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useDropzone,
  DropzoneState,
  FileRejection,
  DropzoneOptions,
} from "react-dropzone";
import { toast } from "sonner";
import { Trash2 as RemoveIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type DirectionOptions = "rtl" | "ltr" | undefined;

type FileUploaderContextType = {
  dropzoneState: DropzoneState;
  isLOF: boolean;
  isFileTooBig: boolean;
  removeFile: () => void;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  orientation: "horizontal" | "vertical";
  direction: DirectionOptions;
};

const FileUploaderContext = createContext<FileUploaderContextType | null>(null);

export const useFileUpload = () => {
  const context = useContext(FileUploaderContext);
  if (!context) {
    throw new Error("useFileUpload must be used within a FileUploaderProvider");
  }
  return context;
};

type FileUploaderProps = {
  value: File | null;
  reSelect?: boolean;
  onValueChange: (value: File | null) => void;
  dropzoneOptions: DropzoneOptions;
  orientation?: "horizontal" | "vertical";
};

export const FileUploader = forwardRef<
  HTMLDivElement,
  FileUploaderProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      dropzoneOptions,
      value,
      onValueChange,
      reSelect,
      orientation = "vertical",
      children,
      dir,
      ...props
    },
    ref
  ) => {
    const [isFileTooBig, setIsFileTooBig] = useState(false);
    const [isLOF, setIsLOF] = useState(false);
    const [active, setActive] = useState(false);
    const {
      accept = {
        "image/*": [".jpg", ".jpeg", ".png", ".gif"],
      },
      maxFiles = 1,
      maxSize = 4 * 1024 * 1024,
      multiple = false,
    } = dropzoneOptions;

    const direction: DirectionOptions = dir === "rtl" ? "rtl" : "ltr";

    const removeFile = useCallback(() => {
      onValueChange(null);
    }, [onValueChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!value) return;

        if (e.key === "Delete" || e.key === "Backspace") {
          removeFile();
        } else if (e.key === "Escape") {
          setActive(false);
        }
      },
      [value, removeFile]
    );

    const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const file = acceptedFiles[0];

        if (!file) {
          toast.error("file error , probably too big");
          return;
        }

        onValueChange(file);

        if (rejectedFiles.length > 0) {
          for (let i = 0; i < rejectedFiles.length; i++) {
            if (rejectedFiles[i].errors[0]?.code === "file-too-large") {
              toast.error(
                `File is too large. Max size is ${maxSize / 1024 / 1024}MB`
              );
              break;
            }
            if (rejectedFiles[i].errors[0]?.message) {
              toast.error(rejectedFiles[i].errors[0].message);
              break;
            }
          }
        }
      },
      []
    );

    useEffect(() => {
      if (!value) return;
      setIsLOF(true);
    }, [value]);

    const opts = dropzoneOptions
      ? dropzoneOptions
      : { accept, maxFiles, maxSize, multiple };

    const dropzoneState = useDropzone({
      ...opts,
      onDrop,
      onDropRejected: () => setIsFileTooBig(true),
      onDropAccepted: () => setIsFileTooBig(false),
    });

    return (
      <FileUploaderContext.Provider
        value={{
          dropzoneState,
          isLOF,
          isFileTooBig,
          removeFile,
          active,
          setActive,
          orientation,
          direction,
        }}
      >
        <div
          ref={ref}
          tabIndex={0}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            "grid w-full focus:outline-none overflow-hidden ",
            className,
            {
              "gap-2": value,
            }
          )}
          dir={dir}
          {...props}
        >
          {children}
        </div>
      </FileUploaderContext.Provider>
    );
  }
);

FileUploader.displayName = "FileUploader";

export const FileUploaderContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { orientation } = useFileUpload();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn("w-full px-1")}
      ref={containerRef}
      aria-description="content file holder"
    >
      <div
        {...props}
        ref={ref}
        className={cn(
          "flex rounded-xl gap-1",
          orientation === "horizontal" ? "flex-raw flex-wrap" : "flex-col",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
});

FileUploaderContent.displayName = "FileUploaderContent";

export const FileUploaderItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { removeFile, active, direction } = useFileUpload();
  return (
    <div
      ref={ref}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "h-6 p-1 justify-between cursor-pointer relative",
        className,
        active ? "bg-muted" : ""
      )}
      {...props}
    >
      <div className="font-medium leading-none tracking-tight flex items-center gap-1.5 h-full w-full">
        {children}
      </div>
      <button
        type="button"
        className={cn(
          "absolute",
          direction === "rtl" ? "top-1 left-1" : "top-1 right-1"
        )}
        onClick={removeFile}
      >
        <span className="sr-only">remove item</span>
        <RemoveIcon className="w-4 h-4 hover:stroke-destructive duration-200 ease-in-out" />
      </button>
    </div>
  );
});

FileUploaderItem.displayName = "FileUploaderItem";

export const FileInput = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { dropzoneState, isFileTooBig, isLOF } = useFileUpload();
  const rootProps = isLOF ? {} : dropzoneState.getRootProps();
  return (
    <div
      ref={ref}
      {...props}
      className={`relative w-full ${
        isLOF ? "opacity-50 cursor-not-allowed " : "cursor-pointer "
      }`}
    >
      <div
        className={cn(
          `w-full rounded-lg duration-300 ease-in-out
         ${
           dropzoneState.isDragAccept
             ? "border-green-500"
             : dropzoneState.isDragReject || isFileTooBig
             ? "border-red-500"
             : "border-gray-300"
         }`,
          className
        )}
        {...rootProps}
      >
        {children}
      </div>
      <Input
        ref={dropzoneState.inputRef}
        disabled={isLOF}
        {...dropzoneState.getInputProps()}
        className={`${isLOF ? "cursor-not-allowed" : ""}`}
      />
    </div>
  );
});

FileInput.displayName = "FileInput";

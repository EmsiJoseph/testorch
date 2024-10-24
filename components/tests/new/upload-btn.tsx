"use client";

import React, {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import DropZone from "./dropzone";
import {toast} from "sonner"
import {Spinner} from "@/components/ui/spinner";
import {Plus} from "lucide-react";


const UploadTestPlanBtn = () => {
    const [files, setFiles] = useState<File[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const previousStage = useRef("");

    const handleUpload = async () => {
        if (!files || files.length === 0) return;

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        try {
            setLoading(true);

            const response = await fetch("http://192.168.1.10:5000/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast("Upload Success!", {
                    description: "Image/s uploaded successfully. Analyzing...",
                    action: {
                        label: "Undo",
                        onClick: () => {
                            console.log("Undo clicked");
                            // Add any undo logic if necessary
                        },
                    },
                });
                setFiles(null);
                setDialogOpen(false);
                startPolling();
            } else {
                toast("Error", {
                    description: "Failed to upload files",
                    action: {
                        label: "Retry",
                        onClick: () => {
                            console.log("Retry clicked");
                            // Add retry logic if necessary
                        },
                    },
                });
            }
        } catch (error) {
            toast("Error", {
                description: "Failed to upload files",
                action: {
                    label: "Retry",
                    onClick: () => {
                        console.log("Retry clicked");
                        // Add retry logic if necessary
                    },
                },
            });
        } finally {
            setLoading(false);
        }
    };

    const startPolling = () => {
        const intervalId = setInterval(async () => {
            try {
                const response = await fetch("https://reimagined-fishstick-wrrqrr67x6625g6q-5000.app.github.dev/status");
                const status = await response.json();

                if (status.stage !== previousStage.current && status.stage !== "Idle") {
                    toast(status.stage, {
                        description: status.message,
                    });
                    previousStage.current = status.stage;
                }

                if (status.stage === "Success!") {
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        }, 3000);
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default"> <Plus className="mr-2 h-4 w-4"/> New Test</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="">New Test</DialogTitle>
                    <DialogDescription>
                        Make sure the scanned form is in JMX or XML.
                    </DialogDescription>
                </DialogHeader>
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Spinner size="large">Uploading...</Spinner>
                    </div>
                ) : (
                    <DropZone
                        files={files}
                        setFiles={setFiles}
                        handleUpload={handleUpload}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UploadTestPlanBtn;

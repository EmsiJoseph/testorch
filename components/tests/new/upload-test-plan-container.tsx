"use client";

import React, {useRef, useState} from "react";
import {toast} from "sonner";
import {Spinner} from "@/components/ui/spinner";
import DropZone from "@/components/tests/new/dropzone";
import {Code} from "@/components/common/code";

const UploadTestPlanContainer = () => {
    const [files, setFiles] = useState<File[] | null>(null);
    const [loading, setLoading] = useState(false);
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
        <div className="container mx-auto p-6">
            {/* Header Section */}
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">Let's test something new.</h1>
                <p className="text-gray-500">
                    To execute a new Test, upload a working Test Plan in <Code>JMX</Code> or <Code>XML</Code> format.
                </p>
            </div>

            {/* Drop Zone Section */}
            <div className="mt-8 flex justify-center">
                <div className="w-full max-w-lg p-6 ">
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
                </div>
            </div>
        </div>
    );
};

export default UploadTestPlanContainer;

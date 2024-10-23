import {MoreHorizontal, Clock, FlaskConical} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from "react";

export type ProjectCardProps = {
    name: string;
    url: string;
    lastTestName: string;
    lastTestTime: string;
    status: 'Passed' | 'Failed' | 'In Progress';
};

const ProjectCardGrid: React.FC<ProjectCardProps> = ({ name, url, lastTestName, lastTestTime, status }) => (
    <Card className="bg-field dark:bg-neutral-950">
        <CardContent className="p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground">{url}</p>
                </div>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>
            <div className="mt-4 flex flex-col flex-start items-start text-sm text-muted-foreground">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <FlaskConical className="h-3 w-3"/>
                    <p>{lastTestName}</p>
                </div>
                <span>{lastTestTime}</span>
            </div>
        </CardContent>
    </Card>
);

export default ProjectCardGrid;

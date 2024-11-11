import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FallbackProps {
    onClick: () => void;
    entity: string;
}

export const NoDataFallback: FC<FallbackProps> = ({
    onClick,
    entity,
}) => {
    return (
        <Card className="flex min-h-[calc(100svh-193px)] w-full items-center justify-center rounded-lg border bg-background dark:bg-field p-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-xl font-semibold" aria-live="polite">
                    You don&#39;t have any {entity}s yet
                </h2>
                <p className="text-muted-foreground">
                    It looks like you haven&#39;t created any {entity}s yet. Click the button below to get started.
                </p>
                <Button onClick={onClick} variant="link" className="text-primary" aria-label={`Create new ${entity}`}>
                    New {entity} →
                </Button>
            </div>
        </Card>
    );
};

import {GitBranch} from 'lucide-react';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

type RecentTestProps = {
    name: string;
    testId: string;
    status: 'Passed' | 'Failed' | 'In Progress';
};

const RecentTests: React.FC<RecentTestProps> = ({name, testId, status}) => (
    <div className="flex items-center space-x-2 py-2 border-b last:border-b-0">
        <Avatar className="h-8 w-8">
            <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <p className="text-sm font-medium">{name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
                <GitBranch className="mr-1 h-3 w-3"/>
                <span>Test #{testId}</span>
            </div>
        </div>
        <span
            className={`px-2 py-1 rounded-full text-xs ${
                status === 'Passed'
                    ? 'bg-green-200 text-green-800'
                    : status === 'Failed'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
            }`}
        >
      {status}
    </span>
    </div>
);

export default RecentTests;

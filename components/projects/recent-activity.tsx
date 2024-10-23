import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type RecentActivityProps = {
    name: string;
    action: string;
    team: string;
    timeAgo: string;
};

const RecentActivity: React.FC<RecentActivityProps> = ({ name, action, team, timeAgo }) => (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
        {/* Left side: Avatar, Name, Action, Team */}
        <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
                <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">
                    {action} for {team}
                </p>
            </div>
        </div>

        {/* Right side: Time ago */}
        <div className="text-xs text-muted-foreground">
            {timeAgo}
        </div>
    </div>
);

export default RecentActivity;

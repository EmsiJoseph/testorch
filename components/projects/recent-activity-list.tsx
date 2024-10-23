import RecentActivity from "@/components/projects/recent-activity";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";

const recentActivities = [
    {name: 'Menu Doe', action: 'Completed a test', team: 'Test Team 1', timeAgo: '30m'},
    {name: 'Jack Empoy', action: 'Created a project', team: 'Test Team 2', timeAgo: '1h'},
    {name: 'Mack Koleth', action: 'Completed a test', team: 'Test Team 1', timeAgo: '2h'},
    {name: 'Mark Key', action: 'Completed a test', team: 'Test Team 2', timeAgo: '3h'},
    {name: 'Ben Tennyson', action: 'Created a test', team: 'Test Team 3', timeAgo: '1w'}, {
        name: 'Ben Tennyson',
        action: 'Created a test',
        team: 'Test Team 3',
        timeAgo: '1w'
    }, {name: 'Ben Tennyson', action: 'Created a test', team: 'Test Team 3', timeAgo: '1w'}, {
        name: 'Ben Tennyson',
        action: 'Created a test',
        team: 'Test Team 3',
        timeAgo: '1w'
    }, {name: 'Ben Tennyson', action: 'Created a test', team: 'Test Team 3', timeAgo: '1w'}, {
        name: 'Ben Tennyson',
        action: 'Created a test',
        team: 'Test Team 3',
        timeAgo: '1w'
    },
];

export default function RecentActivitiesList() {
    return (
        <Card className="w-80 h-[calc(100vh-8rem)]">
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <ScrollArea className="px-4 h-[calc(100%-5rem)]">
                <div className="space-y-2 pr-4">
                    {recentActivities.map((activity, index) => (
                        <RecentActivity
                            key={index}
                            name={activity.name}
                            action={activity.action}
                            team={activity.team}
                            timeAgo={activity.timeAgo}
                        />
                    ))}
                </div>
            </ScrollArea>
        </Card>
    );
}

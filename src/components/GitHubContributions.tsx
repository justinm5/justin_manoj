import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export const GitHubContributions = ({ username }: { username: string }) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock contribution data for the last 365 days
    const generateMockData = () => {
      const data: ContributionDay[] = [];
      const today = new Date();
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate random contribution count (0-10)
        const count = Math.floor(Math.random() * 11);
        const level = count === 0 ? 0 : Math.ceil(count / 3);
        
        data.push({
          date: date.toISOString().split('T')[0],
          count,
          level: Math.min(level, 4),
        });
      }
      
      return data;
    };

    // Simulate API call
    setTimeout(() => {
      setContributions(generateMockData());
      setLoading(false);
    }, 500);
  }, [username]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          Loading contributions...
        </div>
      </Card>
    );
  }

  // Group contributions by week
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  
  contributions.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();
    
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    
    currentWeek.push(day);
    
    if (index === contributions.length - 1) {
      weeks.push(currentWeek);
    }
  });

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-muted";
      case 1:
        return "bg-primary/20";
      case 2:
        return "bg-primary/40";
      case 3:
        return "bg-primary/60";
      case 4:
        return "bg-primary/80";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="p-6 overflow-x-auto">
      <h3 className="text-sm font-semibold text-foreground mb-4">GitHub Contributions</h3>
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                className={`w-3 h-3 rounded-sm ${getColor(day.level)} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </Card>
  );
};

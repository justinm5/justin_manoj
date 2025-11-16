interface GitHubContributionsProps {
  username: string;
}

export const GitHubContributions = ({ username }: GitHubContributionsProps) => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-6 text-foreground tracking-tight">GitHub Contributions</h2>
      <div className="rounded-xl border border-border/40 p-6 bg-card/30 backdrop-blur-sm overflow-x-auto">
        <img
          src={`https://ghchart.rshah.org/39d353/${username}`}
          alt="GitHub Contribution Chart"
          className="w-full"
          style={{ minWidth: '600px' }}
        />
      </div>
    </div>
  );
};

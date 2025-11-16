interface GitHubContributionsProps {
  username: string;
}

export const GitHubContributions = ({ username }: GitHubContributionsProps) => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-6 text-foreground tracking-tight">GitHub Contributions</h2>
      <div className="rounded-xl border border-border/40 p-6 bg-card/20 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-x-auto">
        <img
          src={`https://ghchart.rshah.org/39d353/romanobro56`}
          alt="GitHub Contribution Chart"
          className="w-full"
          style={{ minWidth: '600px' }}
        />
      </div>
    </div>
  );
};

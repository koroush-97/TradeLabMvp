interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
    </div>
  );
};

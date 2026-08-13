type WalletInfoProps = {
  label: string;
  value: string | number;
};

export function WalletInfo({ label, value }: WalletInfoProps) {
  return (
    <div className="rounded-2xl bg-surface p-4">
      <p className="text-sm text-muted">{label}</p>

      <p className="mt-2 font-bold" dir="ltr">
        {value}
      </p>
    </div>
  );
}

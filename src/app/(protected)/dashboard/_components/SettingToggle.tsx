type SettingToggleProps = {
  title: string;
  description: string;
  defaultChecked?: boolean;
};

export default function SettingToggle({
  title,
  description,
  defaultChecked = false,
}: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
          {description}
        </p>
      </div>

      <label className="relative shrink-0 cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />

        <span className="block h-7 w-12 rounded-full bg-border transition-colors peer-checked:bg-primary" />

        <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white transition-all peer-checked:-translate-x-5" />
      </label>
    </div>
  );
}

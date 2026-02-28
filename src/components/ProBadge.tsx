export default function ProBadge({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30 rounded-full ${
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      STARTER
    </span>
  );
}

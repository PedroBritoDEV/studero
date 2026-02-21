export default function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center w-full max-w-3xl">
        <hr className="flex-1 border-t border-title/30" />
        <span className="px-4 text-center text-title font-bold">
            {title}
        </span>
        <hr className="flex-1 border-t border-title/30" />
      </div>
  );
}
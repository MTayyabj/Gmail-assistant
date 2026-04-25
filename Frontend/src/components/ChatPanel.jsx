export default function ChatPanel() {
  return (
    <div className="w-[360px] h-[75vh] max-h-[650px] 
                    bg-[var(--color-bg)] 
                    rounded-3xl shadow-2xl 
                    border border-[var(--ui-border-subtle)]
                    flex flex-col justify-between p-6">
      
      <div className="flex justify-center">
        <div className="h-20 w-20 rounded-full 
                        bg-[var(--text-secondary)] opacity-40" />
      </div>

      <div className="h-14 w-full rounded-xl 
                      bg-[var(--text-secondary)] opacity-40" />
    </div>
  );
}
export default function Loader({
  mode = "light",
  title = "Loading",
  subtitle = "Please wait while we fetch the data.",
  overlay = false,
}) {
  const shellClass = overlay
    ? mode === "dark"
      ? "absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md"
      : "absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md"
    : mode === "dark"
      ? "flex min-h-[60vh] items-center justify-center bg-slate-950 px-4"
      : "flex min-h-[60vh] items-center justify-center bg-slate-50 px-4";

  const cardClass =
    mode === "dark"
      ? "flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/5 px-10 py-8 shadow-[0_20px_80px_rgba(0,255,255,0.15)]"
      : "flex flex-col items-center gap-5 rounded-3xl border border-slate-200 bg-white px-10 py-8 shadow-2xl";

  const titleClass =
    mode === "dark"
      ? "text-xl font-bold text-white"
      : "text-xl font-bold text-slate-900";

  const subtitleClass =
    mode === "dark" ? "text-sm text-slate-400" : "text-sm text-slate-500";

  return (
    <div className={shellClass}>
      <div className={cardClass}>
        {/* Spinner */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-cyan-400/20 blur-xl" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className={titleClass}>{title}</h1>
          <p className={subtitleClass}>{subtitle}</p>
        </div>

        {/* Animated Dots */}
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-bounce" />
          <span
            className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );
}

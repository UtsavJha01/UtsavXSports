import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import crowd from "@/assets/crowd.jpg";
import { Instagram, ArrowLeft, ArrowUpRight, ExternalLink, Search, Tv, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UtsavXSports | Live Sports Channels" },
      { name: "description", content: "Watch Star Sports and Sony Sports channels in one place." },
      { property: "og:title", content: "UtsavXSports | Live Sports Channels" },
      { property: "og:description", content: "Watch Star Sports and Sony Sports channels in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Group = "star" | "sony";
type Channel = { group: Group; name: string; id: string; tag: string };

const channels: Channel[] = [
  { group: "star", name: "Star Sports 1 Hindi HD", id: "H1HD", tag: "Hindi · HD" },
  { group: "star", name: "Star Sports 1 HD", id: "E1HD", tag: "English · HD" },
  { group: "star", name: "Star Sports 1 SD", id: "E1SD", tag: "English · SD" },
  { group: "star", name: "Star Sports 1 Hindi SD", id: "H1SD", tag: "Hindi · SD" },
  { group: "star", name: "Star Sports 2 HD Hindi", id: "H2HD", tag: "Hindi · HD" },
  { group: "star", name: "Star Sports 2 HD English", id: "E2HD", tag: "English · HD" },
  { group: "star", name: "Star Sports 2 SD", id: "E2SD", tag: "English · SD" },
  { group: "star", name: "Star Sports 2 Hindi SD", id: "H2SD", tag: "Hindi · SD" },
  { group: "star", name: "Star Sports 3 SD", id: "SS3", tag: "SD" },
  { group: "star", name: "Star Sports Select 1 SD", id: "SE1", tag: "SD" },
  { group: "star", name: "Star Sports Select 1 HD", id: "SE1HD", tag: "HD" },
  { group: "star", name: "Star Sports Khel", id: "SSK", tag: "Sports" },
  { group: "sony", name: "Sony Sports 1 SD", id: "STEN1", tag: "SD" },
  { group: "sony", name: "Sony Sports 2 SD", id: "STEN2", tag: "SD" },
  { group: "sony", name: "Sony LIV", id: "STEN3", tag: "SD" },
  { group: "sony", name: "Sony Sports 5 SD", id: "STEN5", tag: "SD" },
  { group: "sony", name: "Sony SET", id: "SETHD", tag: "Entertainment" },
];

const networks = {
  star: { title: "Star Sports", desc: "Cricket, football & regional coverage", grad: "bg-gradient-star", text: "text-star" },
  sony: { title: "Sony Sports", desc: "Sony Sports network & Sony SET", grad: "bg-gradient-sony", text: "text-sony" },
} as const;

const streamUrl = (id: string) => "https://sonucdn-v2.pages.dev/star?id=" + encodeURIComponent(id);

function Index() {
  const [group, setGroup] = useState<Group | null>(null);
  return (
    <div className="relative min-h-screen flex flex-col">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <img src={crowd} alt="" className="size-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>
      <Header onHome={() => setGroup(null)} />
      <Ticker />
      <main className="flex-1 w-[min(1280px,92%)] mx-auto py-12 md:py-16">
        {group ? <ChannelView group={group} onBack={() => setGroup(null)} /> : <Networks onPick={setGroup} />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ onHome }: { onHome: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-xl">
      <div className="w-[min(1280px,92%)] mx-auto h-16 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-3">
          <img src={logo} alt="UtsavXSports logo" width={36} height={36} className="size-9 object-contain" />
          <span className="font-display text-2xl tracking-wide">
            Utsav<span className="text-primary">X</span>Sports
          </span>
        </button>
        <span className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span className="size-2 rounded-full bg-live animate-pulse" /> On air now
        </span>
      </div>
    </header>
  );
}

function Ticker() {
  const items = ["Cricket", "Football", "Kabaddi", "Tennis", "Hockey", "Badminton", "F1", "WWE"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b bg-primary text-primary-foreground">
      <div className="flex w-max animate-ticker py-1.5">
        {row.map((t, i) => (
          <span key={i} className="font-display text-lg tracking-widest px-6">
            {t} <span className="opacity-40 ml-6">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Networks({ onPick }: { onPick: (g: Group) => void }) {
  return (
    <section>
      <div className="max-w-3xl animate-rise">
        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-live" /> Live sports & entertainment
        </span>
        <h1 className="font-display text-7xl md:text-9xl leading-[0.85] mt-6">
          Your channels.
          <br />
          <span className="text-primary">One place.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Pick a network, find your channel, and settle in for the action.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-14">
        {(Object.keys(networks) as Group[]).map((g, i) => {
          const n = networks[g];
          const count = channels.filter((c) => c.group === g).length;
          return (
            <button
              key={g}
              onClick={() => onPick(g)}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              className="group relative overflow-hidden text-left rounded-xl border bg-card p-8 shadow-card animate-rise transition hover:-translate-y-1 hover:border-foreground/25 focus-visible:outline-2 focus-visible:outline-ring"
            >
              <div className={`absolute -right-16 -bottom-20 size-64 rounded-full ${n.grad} opacity-25 blur-2xl transition group-hover:opacity-50`} />
              <div className="relative flex items-start justify-between">
                <span className={`grid place-items-center size-14 rounded-lg ${n.grad} font-display text-xl text-foreground`}>
                  {g.toUpperCase()}
                </span>
                <ArrowUpRight className="size-7 text-muted-foreground transition group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <h2 className="relative font-display text-5xl mt-12">{n.title}</h2>
              <p className="relative text-muted-foreground">{n.desc}</p>
              <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold">
                <Tv className={`size-4 ${n.text}`} /> {count} channels
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ChannelView({ group, onBack }: { group: Group; onBack: () => void }) {
  const n = networks[group];
  const all = useMemo(() => channels.filter((c) => c.group === group), [group]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "HD" | "SD">("all");
  const [current, setCurrent] = useState<Channel>(all[0]!);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = all.filter(
    (c) =>
      (c.name + " " + c.tag).toLowerCase().includes(query.trim().toLowerCase()) &&
      (filter === "all" || c.tag.toUpperCase().includes(filter)),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pick = (c: Channel) => {
    if (c.id === current.id) return;
    setLoading(true);
    setCurrent(c);
  };

  return (
    <section className="animate-rise">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <span className={`text-xs font-bold uppercase tracking-[0.25em] ${n.text}`}>Channel guide</span>
          <h1 className="font-display text-6xl md:text-7xl leading-none mt-2">{n.title}</h1>
          <p className="text-muted-foreground mt-1">{all.length} channels available</p>
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold hover:bg-accent transition"
        >
          <ArrowLeft className="size-4" /> All networks
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        <div className="rounded-xl border bg-card overflow-hidden shadow-card">
          <div className="relative aspect-video bg-background">
            <iframe
              key={current.id}
              title="Sports channel player"
              src={streamUrl(current.id)}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              onLoad={() => setLoading(false)}
              className="absolute inset-0 size-full border-0"
            />
            {loading && (
              <div className="absolute inset-0 grid place-items-center bg-background/90">
                <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
                  <div className="size-10 rounded-full border-2 border-muted border-t-primary animate-spin" />
                  Connecting to stream…
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-4 p-5 border-t">
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Now playing</span>
              <p className="font-display text-3xl truncate">{current.name}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={streamUrl(current.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold hover:bg-accent transition"
              >
                <ExternalLink className="size-3.5" /> Open
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-live px-3 py-2 text-xs font-bold tracking-widest text-destructive-foreground">
                <span className="size-1.5 rounded-full bg-destructive-foreground animate-pulse" /> LIVE
              </span>
            </div>
          </div>
        </div>

        <aside className="rounded-xl border bg-card flex flex-col max-h-[640px]">
          <div className="p-5 border-b space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">Channels</h3>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold">{filtered.length}</span>
            </div>
            <label className="flex items-center gap-2 rounded-md border bg-background px-3 py-2.5 focus-within:border-ring">
              <Search className="size-4 text-muted-foreground" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search channels"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border px-1.5 text-[10px] text-muted-foreground">/</kbd>
            </label>
            <div className="flex gap-2">
              {(["all", "HD", "SD"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                    filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">No channels match. Try another name or filter.</p>
            ) : (
              filtered.map((c) => {
                const active = c.id === current.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => pick(c)}
                    className={`w-full flex items-center gap-3 rounded-lg p-3 text-left transition ${
                      active ? "bg-accent ring-1 ring-primary/50" : "hover:bg-muted"
                    }`}
                  >
                    <span className={`grid place-items-center size-10 shrink-0 rounded-md ${n.grad} font-display text-sm`}>
                      {group.toUpperCase()}
                    </span>
                    <span className="flex-1 min-w-0">
                      <strong className="block text-sm font-semibold truncate">{c.name}</strong>
                      <small className="text-xs text-muted-foreground">{c.tag}</small>
                    </span>
                    {active && <Check className="size-4 text-primary" />}
                  </button>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background/70 backdrop-blur">
      <div className="w-[min(1280px,92%)] mx-auto py-10 grid md:grid-cols-[1fr_auto] gap-8">
        <div className="max-w-lg">
          <h3 className="font-display text-3xl">About Me</h3>
          <p className="mt-2 text-muted-foreground">
            Hi, I'm <strong className="text-foreground">Utsav Kumar Jha</strong>, a Computer Science & Engineering (AI)
            student at Government Engineering College, Munger.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-6 text-sm text-muted-foreground">
          <a className="hover:text-primary" href="https://github.com/UtsavJha01" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="hover:text-primary" href="https://www.linkedin.com/in/utsavjha01/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="inline-flex items-center gap-1.5 hover:text-primary" href="https://www.instagram.com/utsavjha18/" target="_blank" rel="noopener noreferrer">
            <Instagram className="size-4" /> Instagram
          </a>
          <a className="hover:text-primary" href="mailto:utsavkumarjha6@gmail.com">Contact</a>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © 2026 <strong className="text-foreground">UtsavXSports</strong>
      </div>
    </footer>
  );
}

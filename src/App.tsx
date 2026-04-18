import { Show, type Component, createMemo, createSignal } from "solid-js";
import { useStore } from "./calculator/calculator.store";
import { CalcError, CalcSuccess } from "./calculator/calculator";

const App: Component = () => {
  const store = useStore();

  return (
    <main class="min-h-screen bg-base-100 font-sans">
      <NavBar />

      <div class="container mx-auto px-4 py-8 max-w-2xl">
        <div class="flex flex-col gap-8 items-center">
          {/* Input Section */}
          <section class="w-full">
            <InputSection store={store} />
          </section>

          {/* Results Section */}
          <section class="w-full">
            <AttemptsSection store={store} />
          </section>
        </div>
      </div>
    </main>
  );
};

function NavBar() {
  return (
    <nav class="navbar bg-base-300 shadow-sm sticky top-0 z-50 justify-center">
      <h1 class="text-lg font-bold">🎲 Odds Finder</h1>
    </nav>
  );
}

function InputSection(props: { store: ReturnType<typeof useStore> }) {
  // Local signal for visual feedback without triggering expensive derivations
  const [displayRate, setDisplayRate] = createSignal(props.store.winRate());

  const handleInput = (e: InputEvent & { target: HTMLInputElement }) => {
    const val = e.target.valueAsNumber || 0;
    setDisplayRate(val);
  };

  const handleChange = (e: Event & { target: HTMLInputElement }) => {
    const val = e.target.valueAsNumber || 0;
    props.store.updateWinRate(val);
  };

  return (
    <div class="card bg-base-200 shadow-sm border border-base-content/10">
      <div class="card-body p-6 gap-6">
        <h2 class="card-title text-sm uppercase tracking-widest font-bold justify-center text-base-content/70">
          Win Rate (1 - 99%)
        </h2>

        <div class="relative max-w-xs mx-auto w-full">
          <input
            type="number"
            placeholder="50"
            class="input input-bordered w-full text-4xl font-black italic focus:input-primary transition-all pr-12 text-center h-20"
            min={1}
            max={99}
            onInput={handleInput}
            onChange={handleChange}
            value={displayRate()}
          />
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold opacity-30">
            %
          </span>
        </div>

        <div class="flex flex-col gap-3 w-full">
          <input
            type="range"
            min="1"
            max="99"
            value={displayRate()}
            class="range range-primary range-sm w-full"
            onInput={handleInput}
            onChange={handleChange}
          />
          <div class="flex justify-between w-full px-1 text-xs font-mono font-bold text-base-content/60">
            <span class="flex flex-col items-center">
              |<span>1</span>
            </span>
            <span class="flex flex-col items-center">
              |<span>25</span>
            </span>
            <span class="flex flex-col items-center">
              |<span>50</span>
            </span>
            <span class="flex flex-col items-center">
              |<span>75</span>
            </span>
            <span class="flex flex-col items-center">
              |<span>99</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttemptsSection(props: { store: ReturnType<typeof useStore> }) {
  const a30 = createMemo(() => props.store.attemptsFor30());
  const a50 = createMemo(() => props.store.attemptsFor50());
  const a90 = createMemo(() => props.store.attemptsFor90());
  const a99 = createMemo(() => props.store.attemptsFor99());

  return (
    <div class="flex flex-col gap-4">
      <Show
        when={a30().success}
        fallback={
          <div class="alert alert-error shadow-sm">
            <span class="text-xl">⚠️</span>
            <div class="flex flex-col">
              <span class="text-md uppercase font-black tracking-widest">
                Calculation Error
              </span>
              <span class="text-sm font-bold font-mono">
                {(a30() as CalcError).message}
              </span>
            </div>
          </div>
        }
      >
        <div class="stats stats-vertical lg:stats-horizontal shadow-sm bg-base-200 border border-base-content/10 overflow-hidden w-full">
          <StatItem title="30% Chance" result={a30()} color="text-info" />
          <StatItem title="50% Chance" result={a50()} color="text-primary" />
          <StatItem title="90% Chance" result={a90()} color="text-secondary" />
          <StatItem title="99% Chance" result={a99()} color="text-accent" />
        </div>
      </Show>
    </div>
  );
}

function StatItem(props: { title: string; result: any; color: string }) {
  return (
    <div class="stat place-items-center py-6 gap-1 min-w-36">
      <div class="stat-title uppercase text-xs font-black tracking-widest text-base-content/80">
        {props.title}
      </div>
      <div
        class={[
          "stat-value font-black text-4xl tracking-tighter",
          props.color,
        ].join(" ")}
      >
        {(props.result as CalcSuccess).attempts}
      </div>
      <div class="stat-desc font-bold text-xs uppercase opacity-60">
        ATTEMPTS
      </div>
    </div>
  );
}

export default App;

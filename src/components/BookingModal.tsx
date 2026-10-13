import { useEffect, useRef, useState } from "react";
import { X, Check, ChevronLeft, MessageCircle, Info } from "lucide-react";
import { SALON, SERVICES, PERIODS, NO_PREF, fmtDate, todayLocal, buildWhatsAppUrl } from "@/lib/salon";

type Step = "servico" | "profissional" | "preferencias" | "resumo";
const LABEL: Record<Step, string> = { servico: "Serviço", profissional: "Profissional", preferencias: "Preferências", resumo: "Resumo" };

export function BookingModal({ open, initialService, onClose }: { open: boolean; initialService: string | null; onClose: () => void }) {
  const [step, setStep] = useState<Step>("servico");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [pro, setPro] = useState(NO_PREF);
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState("");
  const panel = useRef<HTMLDivElement>(null);

  const service = SERVICES.find((s) => s.id === serviceId);
  const hasPros = (service?.pros.length ?? 0) > 0;
  const steps: Step[] = ["servico", ...(hasPros ? (["profissional"] as Step[]) : []), "preferencias", "resumo"];
  const idx = steps.indexOf(step);

  useEffect(() => {
    if (!open) return;
    const s = SERVICES.find((x) => x.id === initialService);
    setServiceId(s ? s.id : null);
    setStep(s ? (s.pros.length ? "profissional" : "preferencias") : "servico");
    setPro(NO_PREF); setDate(""); setPeriod(""); setNotes("");
    document.body.style.overflow = "hidden";
    const prev = document.activeElement as HTMLElement | null;
    setTimeout(() => panel.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); prev?.focus?.(); };
  }, [open, initialService, onClose]);

  if (!open) return null;

  const pickService = (id: string) => {
    const s = SERVICES.find((x) => x.id === id);
    if (!s) return;
    if (id !== serviceId && !s.pros.includes(pro)) setPro(NO_PREF);
    setServiceId(id);
    setStep(s.pros.length ? "profissional" : "preferencias");
  };
  const next = () => setStep(steps[idx + 1] ?? step);
  const back = () => setStep(steps[idx - 1] ?? step);
  const waUrl = service ? buildWhatsAppUrl({ service: service.title, pro, date, period, notes }) : "";
  const btn = "h-12 w-full rounded-full bg-primary font-medium text-primary-foreground transition hover:opacity-90";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-cocoa/60 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Solicitar horário" className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-card shadow-soft outline-none sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            {idx > 0 && <button onClick={back} aria-label="Voltar" className="rounded-full p-1.5 hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Solicitação de horário · {idx + 1}/{steps.length}</p>
              <h3 className="font-display text-2xl">{LABEL[step]}</h3>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="rounded-full p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex gap-1.5 px-5 pt-4" aria-hidden="true">
          {steps.map((s, i) => <div key={s} className={`h-1 flex-1 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}`} />)}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "servico" && (
            <div className="grid gap-2">
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => pickService(s.id)} className={`flex items-center gap-3 rounded-2xl border p-2 text-left transition hover:border-primary ${serviceId === s.id ? "border-primary bg-secondary" : ""}`}>
                  <img src={s.img} alt="" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.category} · Valor sob consulta</p>
                  </div>
                  {serviceId === s.id && <Check className="mr-2 h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          )}

          {step === "profissional" && service && (
            <div className="grid gap-2">
              <p className="mb-2 text-sm text-muted-foreground">Para <strong className="text-foreground">{service.title}</strong>.</p>
              {[NO_PREF, ...service.pros].map((p) => (
                <button key={p} onClick={() => setPro(p)} className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition hover:border-primary ${pro === p ? "border-primary bg-secondary" : ""}`}>
                  <span className="font-medium">{p}</span>
                  {pro === p && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          )}

          {step === "preferencias" && (
            <div className="grid gap-5">
              <p className="text-sm text-muted-foreground">Tudo opcional. As preferências serão confirmadas pelo salão no WhatsApp.</p>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Data preferida <span className="text-muted-foreground">(opcional)</span></span>
                <div className="flex gap-2">
                  <input type="date" min={todayLocal()} value={date} onChange={(e) => setDate(e.target.value && e.target.value < todayLocal() ? "" : e.target.value)} className="h-11 min-w-0 flex-1 rounded-xl border bg-background px-3" />
                  {date && <button onClick={() => setDate("")} className="rounded-xl border px-3 text-sm hover:bg-muted">Limpar</button>}
                </div>
              </label>
              <div className="grid gap-1.5" role="group" aria-label="Período">
                <span className="text-sm font-medium">Período <span className="text-muted-foreground">(opcional)</span></span>
                <div className="grid gap-2">
                  {PERIODS.map((p) => (
                    <button key={p} aria-pressed={period === p} onClick={() => setPeriod(period === p ? "" : p)} className={`rounded-xl border px-4 py-3 text-left text-sm transition hover:border-primary ${period === p ? "border-primary bg-secondary font-medium" : ""}`}>{p}</button>
                  ))}
                </div>
              </div>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Observação <span className="text-muted-foreground">(opcional)</span></span>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex.: quero clarear um pouco mais o meu loiro." className="rounded-xl border bg-background p-3 text-sm" />
              </label>
            </div>
          )}

          {step === "resumo" && service && (
            <div className="grid gap-4">
              <dl className="divide-y rounded-2xl border">
                {[["Serviço", service.title], ["Profissional", pro], ["Data preferida", fmtDate(date)], ["Período preferido", period || "A combinar"], ["Valor", "Sob consulta"], ...(notes.trim() ? [["Observação", notes.trim()]] : [])].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium break-words">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex gap-3 rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p>Isto é uma <strong>solicitação</strong>, não um agendamento confirmado. O salão vai confirmar a disponibilidade com você pelo WhatsApp.</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t px-5 py-4">
          {step === "servico" && (serviceId
            ? <button onClick={() => pickService(serviceId)} className={btn}>Continuar</button>
            : <p className="text-center text-xs text-muted-foreground">Escolha um serviço para continuar</p>)}
          {step === "profissional" && <button onClick={next} className={btn}>Continuar</button>}
          {step === "preferencias" && <button onClick={next} className={btn}>Ver resumo</button>}
          {step === "resumo" && (
            <>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" data-testid="wa-link" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand font-medium text-primary-foreground hover:opacity-90">
                <MessageCircle className="h-5 w-5" /> Enviar solicitação pelo WhatsApp
              </a>
              <p className="mt-2 text-center text-xs text-muted-foreground">O WhatsApp será aberto com a mensagem pronta. Você revisa e envia por lá.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


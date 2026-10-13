import { useState } from "react";
import { ArrowRight, ExternalLink, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, SALON, SERVICES } from "@/lib/salon";

export function ServicesSection({ onBook }: { onBook: (id: string) => void }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Todos");
  const services = category === "Todos" ? SERVICES : SERVICES.filter((service) => service.category === category);

  return (
    <section id="servicos" className="services-section scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="services-heading">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">Nossos serviços</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">Seu próximo cuidado,<br /><em className="text-brand">do seu jeito.</em></h2>
          </div>
          <div className="services-intro">
            <p className="text-muted-foreground">Loiros, mechas, coloração, cortes, penteados e maquiagem. Trabalhos reais publicados pela Angélica no Instagram.</p>
            <a href={SALON.instagram} target="_blank" rel="noopener noreferrer" className="services-profile"><Instagram className="h-4 w-4" />{SALON.instagramHandle}<ExternalLink className="h-3 w-3" /></a>
          </div>
        </div>

        <div className="services-toolbar">
          <div className="services-filters" aria-label="Filtrar serviços">
            {CATEGORIES.map((item) => {
              const count = item === "Todos" ? SERVICES.length : SERVICES.filter((service) => service.category === item).length;
              return <Button key={item} variant="serviceFilter" size="service" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span className="service-filter-count">{count}</span></Button>;
            })}
          </div>
          <p className="services-count" role="status" aria-live="polite">{services.length} {services.length === 1 ? "serviço" : "serviços"}</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card group">
              <div className="service-photo-link">
                <img src={service.img} alt={service.alt} loading="lazy" decoding="async" data-category={service.category} className="service-photo" />
                <span className="service-category">{service.category}</span>
              </div>
              <div className="service-card-body">
                <h3 className="font-display text-2xl leading-tight">{service.title}</h3>
                <p className="service-description">{service.copy}</p>
                <div className="service-card-footer">
                  <p className="text-xs text-muted-foreground">Valor <span className="font-medium text-primary">sob consulta</span></p>
                  <Button variant="service" size="service" onClick={() => onBook(service.id)} className="w-full justify-between">{service.cta}<ArrowRight /></Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="services-assistance">
          <MessageCircle className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">Em dúvida sobre qual cuidado escolher?</p>
          <Button variant="link" asChild><a href={`https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent("Olá, Angélica! Vi os serviços no site e gostaria de ajuda para escolher o melhor cuidado para mim.")}`} target="_blank" rel="noopener noreferrer">Fale com a Angélica<ArrowRight /></a></Button>
        </div>
      </div>
    </section>
  );
}

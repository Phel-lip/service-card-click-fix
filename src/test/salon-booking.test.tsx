import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { BookingModal } from '@/components/BookingModal';
import { CATEGORIES, SALON, SERVICES } from '@/lib/salon';

afterEach(cleanup);

describe('Service selection', () => {
  it('shows exactly 8 services', () => {
    expect(SERVICES).toHaveLength(8);
  });
  it('uses a different photo for each service', () => {
    expect(new Set(SERVICES.map((s) => s.img)).size).toBe(SERVICES.length);
  });
  it('sends requests to the verified WhatsApp number', () => {
    expect(SALON.whatsapp).toBe('5582996009639');
  });
  for (const service of SERVICES) {
    it(`keeps ${service.id} selected in the WhatsApp request`, () => {
      render(<BookingModal open initialService={service.id} onClose={() => {}} />);
      fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
      fireEvent.click(screen.getByRole('button', { name: 'Ver resumo' }));
      const link = screen.getByTestId('wa-link');
      const url = new URL(link.getAttribute('href') ?? '');
      expect(url.pathname).toBe('/5582996009639');
      const message = url.searchParams.get('text');
      expect(message).toContain(`• Serviço: ${service.title}`);
      expect(message).toContain('• Data preferida: A combinar');
      expect(CATEGORIES).toContain(service.category);
    });
  }
});

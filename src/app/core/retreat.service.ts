import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { RETREATS } from './content';
import { RetreatEdition } from './models';
import { SITE } from './site.config';

/** Solo lo que no terminó todavía, ordenado por fecha (hoy según la hora de Panamá). */
export function upcoming(list: RetreatEdition[]): RetreatEdition[] {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Panama', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return list.filter((e) => e.endDate >= today).sort((a, b) => a.startDate.localeCompare(b.startDate));
}

@Injectable({ providedIn: 'root' })
export class RetreatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${SITE.booking.apiUrl}/public/retreats`;

  /** Fechas que todavía no pasaron, de la más cercana a la más lejana. */
  async getUpcoming(): Promise<RetreatEdition[]> {
    try {
      const data = await firstValueFrom(this.http.get<any[]>(this.apiUrl).pipe(timeout(4000)));
      if (Array.isArray(data) && data.length > 0) {
        const fromServer: RetreatEdition[] = data.map((r) => ({
          id: r.slug || r.id,
          name: r.name,
          setting: r.setting,
          place: r.place,
          icon: r.icon || 'sparkles',
          startDate: typeof r.startDate === 'string' ? r.startDate.split('T')[0] : r.startDate,
          endDate: typeof r.endDate === 'string' ? r.endDate.split('T')[0] : r.endDate,
          spotsLeft: r.spotsLeft ?? 0,
          featured: Boolean(r.featured),
          price: r.price ? Number(r.price) : undefined,
          deposit: r.deposit ? Number(r.deposit) : undefined,
          tone: (r.tone || 'leaf') as any,
          highlights: r.highlights || [],
        }));
        return upcoming(fromServer);
      }
    } catch {
      // Si el servidor no responde, se muestran las fechas guardadas en el sitio.
    }
    return upcoming(RETREATS);
  }
}

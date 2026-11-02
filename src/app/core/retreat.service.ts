import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { RETREATS } from './content';
import { RetreatEdition } from './models';
import { SITE } from './site.config';

@Injectable({ providedIn: 'root' })
export class RetreatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${SITE.booking.apiUrl}/public/retreats`;

  async get2027Retreats(): Promise<RetreatEdition[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<any[]>(`${this.apiUrl}?year=2027`).pipe(timeout(4000)),
      );
      if (Array.isArray(data) && data.length > 0) {
        return data.map((r) => ({
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
      }
    } catch {
      // Fallback a los datos locales
    }
    return RETREATS.filter((e) => e.startDate.startsWith('2027'));
  }
}

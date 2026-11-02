import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { SITE } from './site.config';

export interface BookingAgenda {
  psychologist: {
    fullName: string;
    specialties: string[];
    photoUrl: string | null;
    sessionMinutes: number;
    sessionPriceCents: number;
    currency: string;
    timezone: string;
  };
  /** Horario semanal (0 = domingo … 6 = sábado) con sus franjas «HH:mm». */
  weekly: { weekday: number; ranges: { start: string; end: string }[] }[];
  /** Horas libres por día; las ocupadas ya vienen descontadas. */
  days: { date: string; slots: { startsAt: string; endsAt: string; label: string }[] }[];
}

export interface BookingRequest {
  startsAt: string;
  fullName: string;
  email: string;
  phone: string;
  idNumber?: string;
  birthDate?: string;
  reason: string;
  consent: true;
  /** Campo trampa contra robots: siempre vacío. */
  website: string;
  recurrence?: { rule: 'weekly' | 'biweekly'; count: number };
}

export interface BookingResult {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  timezone: string;
  recurring?: boolean;
  count?: number;
  appointments?: Array<{ id: string; startsAt: string; endsAt: string; recurrenceIndex: number }>;
}

// Agenda pública de la psicóloga en el backend de Florece (sin cuenta).
@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);
  private readonly base = `${SITE.booking.apiUrl}/public/booking/${SITE.booking.slug}`;

  agenda(days = 21): Promise<BookingAgenda> {
    return firstValueFrom(this.http.get<BookingAgenda>(`${this.base}?days=${days}`).pipe(timeout(20_000)));
  }

  book(request: BookingRequest): Promise<BookingResult> {
    return firstValueFrom(this.http.post<BookingResult>(`${this.base}/appointments`, request).pipe(timeout(20_000)));
  }
}

/** Mensaje legible de un error del backend. */
export function bookingError(err: unknown, fallback: string): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) return 'No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.';
    if (err.status === 429) return 'Hiciste muchos intentos seguidos. Espera un minuto e inténtalo de nuevo.';
    const message = err.error?.message;
    if (Array.isArray(message)) return String(message[0]);
    if (typeof message === 'string') return message;
  }
  return fallback;
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { ContactRequest } from './models';
import { SITE, whatsappLink } from './site.config';

const INTEREST_LABEL: Record<ContactRequest['interest'], string> = {
  terapia: 'terapia individual',
  retiro: 'el Retiro Metamorfosis',
  kids: 'terapia o talleres para niños',
  otro: 'otra consulta',
};

/**
 * Envía el formulario de contacto.
 * - Con SITE.apiUrl configurado: POST {apiUrl}/contact con el cuerpo ContactRequest (lo recibe tu backend).
 * - Sin backend todavía: devuelve el enlace de WhatsApp con el mensaje armado.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  get hasBackend() {
    return SITE.apiUrl.length > 0;
  }

  async send(request: ContactRequest): Promise<void> {
    await firstValueFrom(this.http.post(`${SITE.apiUrl}/contact`, request).pipe(timeout(20_000)));
  }

  whatsappFor(request: ContactRequest): string {
    return whatsappLink(
      `Hola ${SITE.therapistShort}, soy ${request.name}. Me interesa ${INTEREST_LABEL[request.interest]}.` +
        (request.message ? `\n\n${request.message}` : ''),
    );
  }
}

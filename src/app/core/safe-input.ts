import { Validators } from '@angular/forms';

// Reglas comunes para todo lo que la gente escribe en la web.
// La página nunca arma consultas a una base de datos ni inserta HTML: Angular escapa todo lo que muestra.
// Aun así, limpiamos y validamos aquí para que al backend solo llegue texto razonable.
// La protección definitiva (consultas parametrizadas, límites de intentos) vive en el backend.

/** Nombres: letras (con tildes y ñ), espacios, punto, apóstrofo y guion. */
export const NAME_PATTERN = /^[\p{L}][\p{L} .'’-]*$/u;
/** Teléfono: + opcional, dígitos, espacios, paréntesis y guiones. */
export const PHONE_PATTERN = /^\+?[0-9 ()-]{7,20}$/;
/** Correo con dominio y extensión (Validators.email acepta «a@b»). */
export const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

export const nameValidators = [Validators.required, Validators.minLength(2), Validators.maxLength(120), Validators.pattern(NAME_PATTERN)];
export const emailValidators = [Validators.required, Validators.maxLength(254), Validators.pattern(EMAIL_PATTERN)];

/**
 * Texto libre limpio: quita caracteres de control e invisibles, los signos < y >,
 * espacios repetidos y lo recorta al largo máximo.
 */
export function cleanText(value: string, max: number, multiline = false): string {
  let text = value
    .normalize('NFC')
    // eslint-disable-next-line no-control-regex
    .replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[​-‏‪-‮⁠-⁤﻿]/g, '')
    .replace(/[<>]/g, '');
  text = multiline ? text.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n') : text.replace(/\s{2,}/g, ' ');
  return text.trim().slice(0, max);
}

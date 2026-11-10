export type Email = { to: string; subject: string; text: string; html: string };

export type Transport = { send(email: Email): Promise<{ id: string }> };

/** Order emails come from one sender, with a plain-text part for every HTML part. */
export function buildEmail(to: string, subject: string, html: string): Email {
  const text = html.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").trim();
  return { to, subject, text, html };
}

export function senderAddress(env: Record<string, string | undefined> = process.env): string {
  return env.EMAIL_FROM ?? "Larkspur Retail <orders@larkspur.example>";
}

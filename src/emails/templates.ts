/** The shared layout of every order email: logo line, content, the store's footer. */
export function layout(content: string): string {
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
  <p style="font-weight:bold;color:#2f5d50">Larkspur Retail</p>
  ${content}
  <p style="color:#777;font-size:12px">Larkspur Retail, 14 Harbor Street, Portland, OR 97204</p>
</div>`;
}

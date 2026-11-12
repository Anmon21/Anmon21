// Generates the animated SVGs used by README.md. Run: node scripts/build-assets.mjs
// GitHub strips <script>, so animation is CSS/SMIL with anime.js-style stagger delays.
import { writeFileSync } from 'node:fs';

const stagger = (step, start = 0) => (i) => (start + i * step).toFixed(2);
const rand = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const FONT = "'SF Mono','Fira Code',Menlo,Consolas,monospace";
const out = (name, svg) => writeFileSync(new URL(`../assets/${name}`, import.meta.url), svg);

// ---------- HERO ----------
{
  const W = 900, H = 280, r = rand(7);
  const d = stagger(0.14, 0.3);
  const letters = [...'ANMON'].map((c, i) =>
    `<text x="${178 + i * 112}" y="150" class="L" style="animation-delay:${d(i)}s">${c}</text>`).join('');
  const dust = Array.from({ length: 40 }, () => {
    const x = (r() * W).toFixed(0), y = (r() * H).toFixed(0), s = (0.6 + r() * 1.4).toFixed(1);
    const dur = (3 + r() * 5).toFixed(1), del = (r() * 6).toFixed(1);
    return `<circle cx="${x}" cy="${y}" r="${s}" fill="#fff" opacity="0"><animate attributeName="opacity" values="0;.9;0" dur="${dur}s" begin="${del}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 0;${((r() - .5) * 24).toFixed(0)} -18" dur="${dur}s" begin="${del}s" repeatCount="indefinite"/></circle>`;
  }).join('');
  const ticks = Array.from({ length: 61 }, (_, i) =>
    `<line x1="${60 + i * 13}" y1="${H - 34}" x2="${60 + i * 13}" y2="${H - (i % 5 ? 30 : 24)}" stroke="#fff" stroke-opacity="${i % 5 ? .25 : .6}"/>`).join('');
  const roles = ['FULL-STACK DEVELOPER', 'HEALTHCARE TECHNOLOGY', 'AI BUILDER'];
  const roleEls = roles.map((t, i) =>
    `<text x="450" y="205" text-anchor="middle" class="R" style="animation-delay:${i * 3}s">${t}</text>`).join('');
  const corner = (x, y, sx, sy) => `<path d="M${x} ${y + sy * 22}V${y}H${x + sx * 22}" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="60" stroke-dashoffset="60"><animate attributeName="stroke-dashoffset" to="0" dur="1s" begin=".2s" fill="freeze"/></path>`;
  out('hero.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="ANMON - Full-stack developer, healthcare technology, AI builder">
<defs>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#fff" fill-opacity=".14"/></pattern>
  <radialGradient id="vig" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".95"/></radialGradient>
  <radialGradient id="halo"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <linearGradient id="beam" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stop-color="#6b6b6b"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#6b6b6b"/>
    <animate attributeName="x1" values="-1;1" dur="5s" repeatCount="indefinite"/><animate attributeName="x2" values="0;2" dur="5s" repeatCount="indefinite"/></linearGradient>
  <clipPath id="c"><rect width="${W}" height="${H}" rx="6"/></clipPath>
</defs>
<style>
  .L{font:200 104px 'Helvetica Neue',Helvetica,Arial,sans-serif;fill:url(#shine);text-anchor:middle;opacity:0;animation:in 1.1s cubic-bezier(.2,.8,.2,1) forwards}
  @keyframes in{from{opacity:0;transform:translateY(24px);filter:blur(14px)}to{opacity:1;transform:none;filter:blur(0)}}
  .R{font:400 12px ${FONT};letter-spacing:9px;fill:#a3a3a3;opacity:0;animation:role 9s infinite}
  @keyframes role{0%{opacity:0;letter-spacing:16px}5%,28%{opacity:1;letter-spacing:9px}33%,100%{opacity:0}}
  .S{font:10px ${FONT};letter-spacing:3px;fill:#737373}
</style>
<g clip-path="url(#c)">
  <rect width="${W}" height="${H}" fill="#000"/><rect width="${W}" height="${H}" fill="url(#dots)"/>
  <circle cx="450" cy="130" r="200" fill="url(#halo)"><animate attributeName="r" values="170;230;170" dur="6s" repeatCount="indefinite"/></circle>
  <g transform="translate(450 130)" fill="none" stroke="#fff">
    <circle r="118" stroke-opacity=".18" stroke-dasharray="2 8"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite"/></circle>
    <circle r="168" stroke-opacity=".12"><animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="90s" repeatCount="indefinite"/></circle>
    <circle r="168" stroke-opacity="0"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite"/></circle>
    <g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite"/><circle cx="168" r="3.5" fill="#fff" stroke="none"/><circle cx="168" r="9" stroke-opacity=".4"><animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;0;.6" dur="2s" repeatCount="indefinite"/></circle></g>
    <g><animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="22s" repeatCount="indefinite"/><circle cx="118" r="2.5" fill="#fff" stroke="none"/></g>
  </g>
  ${dust}
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  <rect x="-300" y="0" width="300" height="${H}" fill="url(#beam)" transform="skewX(-20)"><animate attributeName="x" values="-300;1200" dur="6s" repeatCount="indefinite"/></rect>
  ${letters}
  <line x1="450" y1="170" x2="450" y2="170" stroke="#fff" stroke-opacity=".6"><animate attributeName="x1" to="330" dur="1.2s" begin="1.2s" fill="freeze"/><animate attributeName="x2" to="570" dur="1.2s" begin="1.2s" fill="freeze"/></line>
  ${roleEls}
  <g>${ticks}<animate attributeName="opacity" values="0;1" dur="1.5s" begin="1s" fill="freeze"/></g>
  <text x="34" y="42" class="S">ANMON21 / PORTFOLIO</text>
  <text x="${W - 34}" y="42" text-anchor="end" class="S">47.9186° N, 106.9177° E</text>
  <text x="34" y="${H - 44}" class="S">NOW BUILDING — NODUS<tspan><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/> _</tspan></text>
  <text x="${W - 34}" y="${H - 44}" text-anchor="end" class="S">ULAANBAATAR, MN</text>
  ${corner(14, 14, 1, 1)}${corner(W - 14, 14, -1, 1)}${corner(14, H - 14, 1, -1)}${corner(W - 14, H - 14, -1, -1)}
</g>
</svg>`);
}

// ---------- NOW (terminal) ----------
{
  const lines = [
    ['$ whoami', '#ffffff'], ['anmon — full-stack dev @ Ulaanbaatar', '#f5f5f5'],
    ['$ now --working-on', '#ffffff'], ['  ▸ Nodus    clinic management SaaS      [LIVE]', '#d4d4d4'],
    ['  ▸ Govi AI  Messenger chatbot (Groq)    [IN DEV]', '#d4d4d4'], ['  ▸ NatCX    contact-center CRM          [DEPLOYED]', '#d4d4d4'],
    ['$ stack --current', '#ffffff'], ['  React · Next.js · Node · MongoDB · Groq', '#f5f5f5'],
  ];
  const d = stagger(0.7, 0.4);
  const body = lines.map(([t, c], i) => {
    const w = t.length * 8.4;
    return `<g style="animation-delay:${d(i)}s" class="ln"><clipPath id="k${i}"><rect x="28" y="${58 + i * 24 - 14}" width="0" height="20"><animate attributeName="width" from="0" to="${w}" dur="${Math.max(.4, t.length * .02)}s" begin="${d(i)}s" fill="freeze"/></rect></clipPath>
    <text x="28" y="${58 + i * 24}" fill="${c}" clip-path="url(#k${i})">${t.replace(/&/g, '&amp;')}</text></g>`;
  }).join('');
  const H = 58 + lines.length * 24 + 16;
  out('now.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 ${H}" width="100%" role="img" aria-label="Currently working on Nodus, Govi AI and NatCX">
<style>text{font:14px ${FONT}}.ln{opacity:0;animation:f .01s forwards}@keyframes f{to{opacity:1}}</style>
<rect width="900" height="${H}" rx="12" fill="#0a0a0a" stroke="#525252" stroke-opacity=".6"/>
<rect width="900" height="34" rx="12" fill="#171717"/><rect y="20" width="900" height="14" fill="#171717"/>
<circle cx="22" cy="17" r="6" fill="#525252"/><circle cx="42" cy="17" r="6" fill="#737373"/><circle cx="62" cy="17" r="6" fill="#a3a3a3"/>
<text x="450" y="22" text-anchor="middle" fill="#525252" font-size="12">anmon@nodus ~ </text>
${body}
<rect x="28" y="${H - 28}" width="9" height="16" fill="#ffffff"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/></rect>
</svg>`);
}

// ---------- PROJECTS ----------
{
  const cards = [
    { n: 'Nodus', e: '◆', desc: ['Clinic management &amp; scheduling', 'SaaS for Mongolian healthcare'], tags: ['React', 'MUI', 'Node', 'MongoDB'], s: 'LIVE', c: '#ffffff', p: 92 },
    { n: 'Govi AI', e: '▲', desc: ['Multi-tenant AI chatbot for local', 'businesses via FB Messenger'], tags: ['Node', 'Express', 'Groq'], s: 'IN DEV', c: '#a3a3a3', p: 68 },
    { n: 'NatCX', e: '■', desc: ['Contact center CRM &amp;', 'consulting platform'], tags: ['Next.js', 'TypeScript'], s: 'DEPLOYED', c: '#737373', p: 100 },
  ];
  const d = stagger(0.25, 0.1);
  const g = cards.map((k, i) => {
    const x = 10 + i * 296;
    let tx = 20;
    const tags = k.tags.map((t) => { const w = t.length * 7.4 + 16; const s = `<g transform="translate(${tx} 150)"><rect width="${w}" height="22" rx="11" fill="#171717" stroke="#525252" stroke-opacity=".6"/><text x="${w / 2}" y="15" text-anchor="middle" fill="#a3a3a3" font-size="11">${t}</text></g>`; tx += w + 6; return s; }).join('');
    return `<g transform="translate(${x} 10)"><g class="card" style="animation-delay:${d(i)}s">
  <rect class="box" width="280" height="210" rx="14" fill="#0a0a0a" stroke="${k.c}" stroke-opacity=".7"/>
  <text x="20" y="44" font-size="22" font-weight="700" fill="#f5f5f5">${k.e} ${k.n}</text>
  <text x="20" y="78" font-size="12" fill="#a3a3a3">${k.desc[0]}</text><text x="20" y="96" font-size="12" fill="#a3a3a3">${k.desc[1]}</text>
  <text x="20" y="128" font-size="10" fill="#525252">PROGRESS</text><text x="260" y="128" text-anchor="end" font-size="10" fill="#d4d4d4">${k.p}%</text>
  <rect x="20" y="134" width="240" height="4" rx="2" fill="#171717"/>
  <rect x="20" y="134" width="0" height="4" rx="2" fill="${k.c}"><animate attributeName="width" to="${2.4 * k.p}" dur="1.4s" begin="${(+d(i) + .5).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines=".2 .8 .2 1" keyTimes="0;1"/></rect>
  ${tags}
  <circle cx="26" cy="192" r="4" fill="${k.c}"><animate attributeName="r" values="3;6;3" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <text x="38" y="196" font-size="11" font-weight="700" fill="${k.c}">${k.s}</text></g></g>`;
  }).join('');
  out('projects.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 230" width="100%" role="img" aria-label="Projects: Nodus, Govi AI, NatCX">
<style>text{font-family:${FONT}}.card{opacity:0;animation:up .8s cubic-bezier(.2,.9,.3,1.2) forwards}
@keyframes up{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}</style>${g}</svg>`);
}

// ---------- MARQUEE ----------
{
  const items = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind', 'MUI', 'Groq API', 'Lua', 'Figma', 'Git'];
  let x = 0;
  const pills = items.map((t) => { const w = t.length * 9 + 36; const s = `<g transform="translate(${x} 8)"><rect width="${w}" height="34" rx="17" fill="#171717" stroke="#525252"/><text x="${w / 2}" y="22" text-anchor="middle" fill="#f5f5f5" font-size="13">${t}</text></g>`; x += w + 14; return s; }).join('');
  out('marquee.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 50" width="100%" role="img" aria-label="Tech stack">
<defs><linearGradient id="f"><stop offset="0" stop-color="#000"/><stop offset=".08" stop-color="#fff"/><stop offset=".92" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="m"><rect width="900" height="50" fill="url(#f)"/></mask></defs>
<style>text{font-family:${FONT}}</style>
<g mask="url(#m)"><g><animateTransform attributeName="transform" type="translate" from="0 0" to="-${x} 0" dur="28s" repeatCount="indefinite"/>${pills}<g transform="translate(${x} 0)">${pills}</g></g></g></svg>`);
}
console.log('assets built');

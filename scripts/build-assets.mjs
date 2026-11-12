// Generates the animated SVGs used by README.md. Run: node scripts/build-assets.mjs
// GitHub strips <script>, so animation is CSS/SMIL with anime.js-style stagger delays.
import { writeFileSync } from 'node:fs';

const stagger = (step, start = 0) => (i) => (start + i * step).toFixed(2);
const rand = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const FONT = "'SF Mono','Fira Code',Menlo,Consolas,monospace";
const out = (name, svg) => writeFileSync(new URL(`../assets/${name}`, import.meta.url), svg);

// ---------- HERO ----------
{
  const W = 900, H = 240, r = rand(42);
  const d = stagger(0.12, 0.2);
  const letters = [...'ANMON'].map((c, i) =>
    `<text x="${290 + i * 66}" y="128" class="L" style="animation-delay:${d(i)}s">${c}</text>`).join('');
  const dots = Array.from({ length: 36 }, (_, i) => {
    const x = (r() * W).toFixed(0), y = (H + 10).toFixed(0), s = (1 + r() * 2.2).toFixed(1);
    const dur = (6 + r() * 7).toFixed(1), del = (r() * 8).toFixed(1), dx = ((r() - .5) * 60).toFixed(0);
    return `<circle cx="${x}" cy="${y}" r="${s}" fill="#c084fc" opacity="0">
      <animateTransform attributeName="transform" type="translate" values="0 0;${dx} -${H + 30}" dur="${dur}s" begin="${del}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;.9;0" dur="${dur}s" begin="${del}s" repeatCount="indefinite"/></circle>`;
  }).join('');
  const roles = ['FULL-STACK DEV', 'HEALTHCARE TECH', 'AI BUILDER'];
  const roleEls = roles.map((t, i) =>
    `<text x="450" y="176" text-anchor="middle" class="R" style="animation-delay:${i * 3}s">${t}</text>`).join('');
  out('hero.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="ANMON - Full-stack dev, healthcare tech, AI builder">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#07000f"/><stop offset=".5" stop-color="#1a003a"/><stop offset="1" stop-color="#3b0764"/></linearGradient>
  <linearGradient id="tx" x1="0" x2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset=".5" stop-color="#e9d5ff"/><stop offset="1" stop-color="#a855f7"/>
    <animate attributeName="x1" values="-1;1" dur="4s" repeatCount="indefinite"/><animate attributeName="x2" values="0;2" dur="4s" repeatCount="indefinite"/></linearGradient>
  <pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#7c3aed" stroke-opacity=".12"/></pattern>
  <radialGradient id="glow"><stop offset="0" stop-color="#a855f7" stop-opacity=".35"/><stop offset="1" stop-color="#a855f7" stop-opacity="0"/></radialGradient>
  <clipPath id="c"><rect width="${W}" height="${H}" rx="14"/></clipPath>
</defs>
<style>
  .L{font:900 84px ${FONT};fill:url(#tx);opacity:0;transform-box:fill-box;transform-origin:center;animation:in .7s cubic-bezier(.2,.9,.3,1.3) forwards}
  @keyframes in{from{opacity:0;transform:translateY(40px) scale(.6) rotate(-8deg)}to{opacity:1;transform:none}}
  .R{font:600 15px ${FONT};letter-spacing:6px;fill:#c4b5fd;opacity:0;animation:role 9s infinite}
  @keyframes role{0%{opacity:0;transform:translateY(8px)}4%,28%{opacity:1;transform:none}33%,100%{opacity:0}}
  .S{font:12px ${FONT};fill:#7c3aed;opacity:.8}
</style>
<g clip-path="url(#c)">
  <rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="450" cy="110" r="220" fill="url(#glow)"><animate attributeName="r" values="180;240;180" dur="5s" repeatCount="indefinite"/></circle>
  ${dots}
  <rect width="${W}" height="2" fill="#a855f7" opacity=".5"><animate attributeName="y" values="-4;${H}" dur="5s" repeatCount="indefinite"/></rect>
  ${letters}${roleEls}
  <text x="24" y="30" class="S">// anmon21.dev</text><text x="${W - 24}" y="30" text-anchor="end" class="S">ULAANBAATAR, MN</text>
  <text x="${W / 2}" y="${H - 22}" text-anchor="middle" class="S">&gt; now building Nodus<tspan opacity="1"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>_</tspan></text>
</g>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="1800" stroke-dashoffset="1800"><animate attributeName="stroke-dashoffset" to="0" dur="2.4s" fill="freeze"/></rect>
</svg>`);
}

// ---------- NOW (terminal) ----------
{
  const lines = [
    ['$ whoami', '#a855f7'], ['anmon — full-stack dev @ Ulaanbaatar', '#e9d5ff'],
    ['$ now --working-on', '#a855f7'], ['  ▸ Nodus    clinic management SaaS      [LIVE]', '#c084fc'],
    ['  ▸ Govi AI  Messenger chatbot (Groq)    [IN DEV]', '#c084fc'], ['  ▸ NatCX    contact-center CRM          [DEPLOYED]', '#c084fc'],
    ['$ stack --current', '#a855f7'], ['  React · Next.js · Node · MongoDB · Groq', '#e9d5ff'],
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
<rect width="900" height="${H}" rx="12" fill="#0d0019" stroke="#7c3aed" stroke-opacity=".6"/>
<rect width="900" height="34" rx="12" fill="#1a003a"/><rect y="20" width="900" height="14" fill="#1a003a"/>
<circle cx="22" cy="17" r="6" fill="#ef4444"/><circle cx="42" cy="17" r="6" fill="#eab308"/><circle cx="62" cy="17" r="6" fill="#22c55e"/>
<text x="450" y="22" text-anchor="middle" fill="#7c3aed" font-size="12">anmon@nodus ~ </text>
${body}
<rect x="28" y="${H - 28}" width="9" height="16" fill="#a855f7"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/></rect>
</svg>`);
}

// ---------- PROJECTS ----------
{
  const cards = [
    { n: 'Nodus', e: '🟣', desc: ['Clinic management &amp; scheduling', 'SaaS for Mongolian healthcare'], tags: ['React', 'MUI', 'Node', 'MongoDB'], s: 'LIVE', c: '#a855f7', p: 92 },
    { n: 'Govi AI', e: '⚡', desc: ['Multi-tenant AI chatbot for local', 'businesses via FB Messenger'], tags: ['Node', 'Express', 'Groq'], s: 'IN DEV', c: '#8b5cf6', p: 68 },
    { n: 'NatCX', e: '🏢', desc: ['Contact center CRM &amp;', 'consulting platform'], tags: ['Next.js', 'TypeScript'], s: 'DEPLOYED', c: '#6d28d9', p: 100 },
  ];
  const d = stagger(0.25, 0.1);
  const g = cards.map((k, i) => {
    const x = 10 + i * 296;
    let tx = 20;
    const tags = k.tags.map((t) => { const w = t.length * 7.4 + 16; const s = `<g transform="translate(${tx} 150)"><rect width="${w}" height="22" rx="11" fill="#1a003a" stroke="#7c3aed" stroke-opacity=".6"/><text x="${w / 2}" y="15" text-anchor="middle" fill="#c4b5fd" font-size="11">${t}</text></g>`; tx += w + 6; return s; }).join('');
    return `<g transform="translate(${x} 10)"><g class="card" style="animation-delay:${d(i)}s">
  <rect class="box" width="280" height="210" rx="14" fill="#0d0019" stroke="${k.c}" stroke-opacity=".7"/>
  <text x="20" y="44" font-size="22" font-weight="700" fill="#e9d5ff">${k.e} ${k.n}</text>
  <text x="20" y="78" font-size="12" fill="#c4b5fd">${k.desc[0]}</text><text x="20" y="96" font-size="12" fill="#c4b5fd">${k.desc[1]}</text>
  <text x="20" y="128" font-size="10" fill="#7c3aed">PROGRESS</text><text x="260" y="128" text-anchor="end" font-size="10" fill="#c084fc">${k.p}%</text>
  <rect x="20" y="134" width="240" height="4" rx="2" fill="#1a003a"/>
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
  const pills = items.map((t) => { const w = t.length * 9 + 36; const s = `<g transform="translate(${x} 8)"><rect width="${w}" height="34" rx="17" fill="#1a003a" stroke="#7c3aed"/><text x="${w / 2}" y="22" text-anchor="middle" fill="#e9d5ff" font-size="13">${t}</text></g>`; x += w + 14; return s; }).join('');
  out('marquee.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 50" width="100%" role="img" aria-label="Tech stack">
<defs><linearGradient id="f"><stop offset="0" stop-color="#000"/><stop offset=".08" stop-color="#fff"/><stop offset=".92" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="m"><rect width="900" height="50" fill="url(#f)"/></mask></defs>
<style>text{font-family:${FONT}}</style>
<g mask="url(#m)"><g><animateTransform attributeName="transform" type="translate" from="0 0" to="-${x} 0" dur="28s" repeatCount="indefinite"/>${pills}<g transform="translate(${x} 0)">${pills}</g></g></g></svg>`);
}
console.log('assets built');

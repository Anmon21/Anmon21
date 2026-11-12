// Generates the animated SVGs used by README.md. Run: node scripts/build-assets.mjs
// GitHub strips <script>, so animation is CSS/SMIL with anime.js-style stagger delays.
import { writeFileSync } from 'node:fs';

const stagger = (step, start = 0) => (i) => (start + i * step).toFixed(2);
const rand = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const FONT = "'SF Mono','Fira Code',Menlo,Consolas,monospace";
const out = (name, svg) => writeFileSync(new URL(`../assets/${name}`, import.meta.url), svg);

// ---------- HERO ----------
{
  const W = 900, H = 260;
  const SERIF = "Georgia,'Times New Roman',Times,serif";
  // letter centres for "Anmon" at 120px, centred on x=450
  const xs = [292.5, 370.5, 459.5, 547, 615.5];
  const d = stagger(0.13, 0.4);
  const letters = [...'Anmon'].map((c, i) =>
    `<text x="${xs[i]}" y="152" class="L" style="animation-delay:${d(i)}s">${c}</text>`).join('');
  out('hero.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Anmon - developer from Ulaanbaatar, building Nodus">
<defs>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"><animate attributeName="seed" values="3;7;11;5;9" dur=".6s" calcMode="discrete" repeatCount="indefinite"/></feTurbulence><feColorMatrix type="saturate" values="0"/></filter>
  <clipPath id="band"><rect x="0" y="40" width="${W}" height="140"/></clipPath>
</defs>
<style>
  .L{font:400 124px ${SERIF};fill:#f5f5f5;text-anchor:middle;transform-box:fill-box;transform-origin:center;transform:translateY(150px);animation:rise 1.1s cubic-bezier(.16,.8,.2,1) forwards}
  @keyframes rise{to{transform:translateY(0)}}
  .T{font:400 11px ${FONT};letter-spacing:5px;fill:#a3a3a3;text-anchor:middle;opacity:0;animation:fade 1.2s ease 1.5s forwards}
  .N{font:italic 15px ${SERIF};fill:#d4d4d4;text-anchor:middle;opacity:0;animation:fade 1.2s ease 2s forwards}
  @keyframes fade{to{opacity:1}}
  .ink{fill:none;stroke:#f5f5f5;stroke-linecap:round;stroke-dasharray:700;stroke-dashoffset:700;animation:draw 1.4s cubic-bezier(.4,0,.2,1) 1.1s forwards}
  @keyframes draw{to{stroke-dashoffset:0}}
</style>
<rect width="${W}" height="${H}" fill="#050505"/>
<g clip-path="url(#band)">${letters}</g>
<path class="ink" stroke-width="2.2" d="M262 184 C 340 176, 470 190, 640 180"/>
<path class="ink" stroke-width="1" style="animation-delay:1.5s" d="M300 191 C 400 187, 520 194, 600 189"/>
<g class="T"><text x="450" y="30" class="T">FULL-STACK · HEALTHCARE · BUILDER</text></g>
<text x="450" y="228" class="N">currently building Nodus</text>
<circle cx="${450 - 99}" cy="223" r="3" fill="#fff" opacity="0"><animate attributeName="opacity" values="0;1;.25;1" dur="2s" begin="2.2s" repeatCount="indefinite"/></circle>
<rect width="${W}" height="${H}" filter="url(#grain)" opacity=".09"/>
<rect x="10.5" y="10.5" width="${W - 21}" height="${H - 21}" fill="none" stroke="#fff" stroke-opacity=".18"/>
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
// ---------- PULSE (ECG) ----------
{
  const W = 900, H = 170, mid = 100;
  // one heartbeat cycle, 180px wide, repeated across the width
  const beat = (x) => `L${x + 40} ${mid} L${x + 55} ${mid - 8} L${x + 70} ${mid} L${x + 82} ${mid} L${x + 90} ${mid + 14} L${x + 100} ${mid - 58} L${x + 111} ${mid + 30} L${x + 120} ${mid} L${x + 140} ${mid} L${x + 156} ${mid - 14} L${x + 172} ${mid} L${x + 180} ${mid}`;
  let dpath = `M0 ${mid}`;
  for (let x = 0; x < W; x += 180) dpath += beat(x);
  out('pulse.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Heartbeat line - healthcare tech">
<defs>
  <pattern id="gr" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#fff" stroke-opacity=".06"/></pattern>
  <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".1" stop-color="#fff"/><stop offset=".9" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
  <mask id="mk"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
</defs>
<style>
  text{font-family:${FONT};letter-spacing:3px;font-size:10px;fill:#737373}
  .tr{fill:none;stroke:#fff;stroke-width:1.8;stroke-linejoin:round;stroke-dasharray:1100 1100;stroke-dashoffset:1100;animation:sweep 4.5s linear infinite}
  .gh{fill:none;stroke:#fff;stroke-opacity:.12;stroke-width:1.8}
  @keyframes sweep{0%{stroke-dashoffset:1100}60%{stroke-dashoffset:0}100%{stroke-dashoffset:-1100}}
</style>
<rect width="${W}" height="${H}" fill="#050505"/><rect width="${W}" height="${H}" fill="url(#gr)"/>
<g mask="url(#mk)">
  <path class="gh" d="${dpath}"/>
  <path class="tr" pathLength="2200" d="${dpath}" style="stroke-dasharray:2200 2200;stroke-dashoffset:2200;animation-name:sweep2"/>
</g>
<style>@keyframes sweep2{0%{stroke-dashoffset:2200}55%{stroke-dashoffset:0}100%{stroke-dashoffset:-2200}}</style>
<text x="24" y="24">LIVE · CLINIC SYSTEMS</text>
<text x="${W - 24}" y="24" text-anchor="end">NODUS</text>
<text x="24" y="${H - 18}">BPM <tspan fill="#f5f5f5" style="fill:#f5f5f5">72</tspan></text>
<text x="${W - 24}" y="${H - 18}" text-anchor="end">ULAANBAATAR → ALL OF MONGOLIA</text>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#fff" stroke-opacity=".15"/>
</svg>`);
}

console.log('assets built');

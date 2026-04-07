const OC   = 'kangaco';
const BASE = 'https://www.law.go.kr/DRF';

export async function onRequest(context) {
  const url    = new URL(context.request.url);
  const q      = url.searchParams.get('q') || '';
  const target = url.searchParams.get('target') || 'law';

  if (!q) return json({ error: '검색어가 필요합니다.' }, 400);

  try {
    const apiUrl = `${BASE}/lawSearch.do?OC=${OC}&target=${target}&type=JSON&query=${encodeURIComponent(q)}&display=20&page=1`;
    const res    = await fetch(apiUrl);
    const text   = await res.text();

    // Try JSON parse; if fails (XML response), return raw text for debugging
    try {
      const data = JSON.parse(text);
      return json({ _ok: true, _status: res.status, ...data });
    } catch {
      return json({ _ok: false, _status: res.status, _raw: text.slice(0, 2000) });
    }
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

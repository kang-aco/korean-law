const OC   = 'kangaco';
const BASE = 'https://www.law.go.kr/DRF';

export async function onRequest(context) {
  const url    = new URL(context.request.url);
  const q      = url.searchParams.get('q') || '';
  const target = url.searchParams.get('target') || 'law'; // 'law' | 'prec'

  if (!q) {
    return json({ error: '검색어가 필요합니다.' }, 400);
  }

  try {
    const apiUrl = `${BASE}/lawSearch.do?OC=${OC}&target=${target}&type=JSON&query=${encodeURIComponent(q)}&display=20&page=1`;
    const res  = await fetch(apiUrl);
    const data = await res.json();
    return json(data);
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

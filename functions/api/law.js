const OC   = 'kangaco';
const BASE = 'https://www.law.go.kr/DRF';

export async function onRequest(context) {
  const url    = new URL(context.request.url);
  const id     = url.searchParams.get('id') || '';
  const target = url.searchParams.get('target') || 'law';

  if (!id) {
    return json({ error: 'ID가 필요합니다.' }, 400);
  }

  try {
    const apiUrl = `${BASE}/lawService.do?OC=${OC}&target=${target}&ID=${id}&type=JSON`;
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

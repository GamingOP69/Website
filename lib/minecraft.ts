export async function fetchServerStatus(server: string) {
  const url = `https://api.mcsrvstat.us/2/${encodeURIComponent(server)}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('Minecraft API failed')
  return r.json()
}

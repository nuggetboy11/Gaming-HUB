
const ALLOWED_HOSTS = new Set([
  "example.com"
]);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "GET only" });
  }

  let url;

  try {
    url = new URL(req.query.url || "");
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  if (
    url.protocol !== "https:" ||
    !ALLOWED_HOSTS.has(url.hostname) ||
    url.username ||
    url.password
  ) {
    return res.status(403).json({
      error: "This destination is not enabled for proxy access."
    });
  }

  try {
    const upstream = await fetch(url.href, {
      redirect: "error",
      signal: AbortSignal.timeout(8000),
      headers: {
        "Accept": "text/html"
      }
    });

    const contentType = upstream.headers.get("content-type") || "";

    if (!upstream.ok || !contentType.includes("text/html")) {
      return res.status(502).json({
        error: "The destination did not return an HTML page."
      });
    }

    const html = await upstream.text();

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(html);
  } catch {
    return res.status(502).json({
      error: "Could not fetch the approved destination."
    });
  }
}

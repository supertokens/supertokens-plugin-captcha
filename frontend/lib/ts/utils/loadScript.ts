const loadedScripts = new Set<string>();
export const loadScript = (
  url: string,
  { once = true }: { once?: boolean } = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (once && loadedScripts.has(url)) {
      return resolve();
    }

    const script = document.createElement("script");
    script.type = "application/javascript";
    script.src = url;
    script.onload = () => {
      loadedScripts.add(url);
      resolve();
    };
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};

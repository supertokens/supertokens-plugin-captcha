const loadedScripts: Record<string, boolean> = {};
export const loadScript = (
  url: string,
  {
    async = false,
    defer = false,
  }: {
    async?: boolean;
    defer?: boolean;
  } = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (loadedScripts[url]) return resolve();

    const script = document.createElement("script");
    script.type = "application/javascript";
    script.async = async;
    script.defer = defer;
    script.src = url;

    script.onload = () => {
      loadedScripts[url] = true;
      resolve();
    };
    script.onerror = (e) => {
      delete loadedScripts[url];
      reject(e);
    };

    document.head.appendChild(script);
  });
};

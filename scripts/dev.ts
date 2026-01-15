import { spawn, type Subprocess } from "bun";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const COMPOSE = resolve(ROOT, "backend/docker-compose.yaml");

const c = {
  reset: "\x1b[0m",
  g: "\x1b[32m",
  y: "\x1b[33m",
  m: "\x1b[35m",
  cy: "\x1b[36m",
  b: "\x1b[1m",
};
const strip = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

const procs: Subprocess[] = [];
let stopping = false;

const docker = (...args: string[]) =>
  Bun.spawn(["docker", "compose", "-f", COMPOSE, ...args], {
    stdout: "inherit",
    stderr: "inherit",
  }).exited;

async function main() {
  await docker("up", "-d");

  let beUrl = "",
    feUrl = "";

  const ready = () => {
    if (beUrl && feUrl) {
      const beLabel = "Backend:  ";
      const feLabel = "Frontend: ";
      const swaggerLabel = "Swagger:  ";
      const swaggerUrl = `${beUrl}/docs`;

      const beContentLen = beLabel.length + beUrl.length;
      const feContentLen = feLabel.length + feUrl.length;
      const swaggerContentLen = swaggerLabel.length + swaggerUrl.length;
      const maxContentLen = Math.max(beContentLen, feContentLen, swaggerContentLen);

      const innerWidth = maxContentLen + 4;

      const topLine = "┏" + "━".repeat(innerWidth) + "┓";
      const bottomLine = "┗" + "━".repeat(innerWidth) + "┛";

      const bePadding = " ".repeat(innerWidth - beContentLen - 2);
      const fePadding = " ".repeat(innerWidth - feContentLen - 2);
      const swaggerPadding = " ".repeat(innerWidth - swaggerContentLen - 2);

      const beLine = `${c.g}┃${c.reset}  ${c.m}${c.b}${beLabel}${c.reset}${c.b}${beUrl}${c.reset}${bePadding}${c.g}┃${c.reset}`;
      const feLine = `${c.g}┃${c.reset}  ${c.cy}${c.b}${feLabel}${c.reset}${c.b}${feUrl}${c.reset}${fePadding}${c.g}┃${c.reset}`;
      const swaggerLine = `${c.g}┃${c.reset}  ${c.y}${c.b}${swaggerLabel}${c.reset}${c.b}${swaggerUrl}${c.reset}${swaggerPadding}${c.g}┃${c.reset}`;

      console.log(`
${c.g}${topLine}${c.reset}
${beLine}
${swaggerLine}
${feLine}
${c.g}${bottomLine}${c.reset}
`);
    }
  };

  const be = spawn({
    cmd: ["bun", "run", "dev"],
    cwd: resolve(ROOT, "backend"),
    stdout: "pipe",
    stderr: "pipe",
  });
  const fe = spawn({
    cmd: ["bun", "run", "dev"],
    cwd: resolve(ROOT, "frontend"),
    stdout: "pipe",
    stderr: "pipe",
  });
  procs.push(be, fe);

  const prefixLines = (text: string, prefix: string): string => {
    return text
      .split("\n")
      .map((line, i, arr) => {
        if (i === arr.length - 1 && line === "") return "";
        return `${prefix} ${line}`;
      })
      .join("\n");
  };

  (async () => {
    for await (const chunk of be.stdout as AsyncIterable<Uint8Array>) {
      const t = new TextDecoder().decode(chunk);
      process.stdout.write(prefixLines(t, `${c.m}[BACKEND]${c.reset}`));

      if (!beUrl) {
        const portMatch = strip(t).match(/listening on .*:(\d+)/i);
        if (portMatch) {
          beUrl = `http://localhost:${portMatch[1]}`;
          ready();
        } else if (strip(t).includes("Nest application successfully started")) {
          try {
            const envFile = await Bun.file(
              resolve(ROOT, "backend/.env"),
            ).text();
            const portMatch = envFile.match(/PORT\s*=\s*(\d+)/);
            const port = portMatch ? portMatch[1] : "3000";
            beUrl = `http://localhost:${port}`;
            ready();
          } catch {
            beUrl = "http://localhost:3000";
            ready();
          }
        }
      }
    }
  })();
  (async () => {
    for await (const ch of be.stderr as AsyncIterable<Uint8Array>) {
      const t = new TextDecoder().decode(ch);
      process.stderr.write(prefixLines(t, `${c.m}[BACKEND]${c.reset}`));
    }
  })();

  (async () => {
    for await (const chunk of fe.stdout as AsyncIterable<Uint8Array>) {
      const t = new TextDecoder().decode(chunk);
      process.stdout.write(prefixLines(t, `${c.cy}[FRONTEND]${c.reset}`));

      const m = strip(t).match(/Local:\s+http:\/\/localhost:(\d+)/);
      if (!feUrl && m) {
        feUrl = `http://localhost:${m[1]}`;
        ready();
      }
    }
  })();
  (async () => {
    for await (const ch of fe.stderr as AsyncIterable<Uint8Array>) {
      const t = new TextDecoder().decode(ch);
      process.stderr.write(prefixLines(t, `${c.cy}[FRONTEND]${c.reset}`));
    }
  })();
}

async function shutdown() {
  if (stopping) return;
  stopping = true;
  console.log(`\n${c.y}Stopping...${c.reset}`);
  procs.forEach((p) => p.kill());
  await docker("down");
  console.log(`${c.g}Done${c.reset}`);
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

await main();
await new Promise(() => {});

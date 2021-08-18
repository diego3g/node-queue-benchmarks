const osu = require('node-os-utils')

export async function logHeapMemoryUsage() {
  const memUsage = await osu.mem.used()
  const cpuUsage = await osu.cpu.usage()

  console.log(`Memory: ${memUsage.usedMemMb}MB, CPU ${cpuUsage}%`);
}

import {networkInterfaces} from 'os';

export default {
  platform: {
    isWindows: process.platform === 'win32',
    isMacintosh: process.platform === 'darwin',
    isLinux: process.platform === 'linux'
  }
}

/**
 * Get ip address
 * @return {string[]}
 */
export function getIpAddress() {
  return Object.values(networkInterfaces())
    .flat()
    .filter(ip => !ip.internal && ip.family === 'IPv4')
    .map(ip => ip.address);
}

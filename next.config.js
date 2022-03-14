/** @type {import('next').NextConfig} */

module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/posts': { page: '/posts' },
      '/': { page: '/posts' },
    }
  },
}

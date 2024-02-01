const contractAbis = {
  totalSupply: "uint256:totalSupply",
};

const addressesByNetworks = {
  xdai: [
    "0x1c46486727fc8419b4cbdac7862d38d9e2a510a3",
    "0xb72f246bb229f67ecbbb1c4bd1b61f6faa0ac40b",
  ],
  polygon: [
    "0x9C14F9137Fc7327F336cC73D4218d310F3Faba11",
    "0x11c8f790d252f4a49cfbff5766310873898bf5d3",
  ],
  base: ["0x2aeB4A62f40257bfC96D5be55519f70DB871c744"],
  moonbeam: ["0x11C8f790d252F4A49cFBFf5766310873898BF5D3"],
};

async function getTvl(api, chain) {

}

Object.keys(addressesByNetworks).forEach((chain) => {
  module.exports[chain] = {
    tvl: async (_, _1, _2, { api }) => {
      const balances = await api.multiCall({
        abi: contractAbis.totalSupply,
        calls: addressesByNetworks[chain].map((address) => ({
          target: address,
          params: [],
        })),
      });
      api.add(addressesByNetworks[chain], balances);
    },
  };
});
// node test.js projects/astrolab/index.js

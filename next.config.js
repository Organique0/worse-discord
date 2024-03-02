/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push({
			"utf-8-validate": "commonjs utf-8-validate",
			befferutil: "commonjs befferutil",
		});
		return config;
	},
	images: {
		domains: ["utfs.io", "dummyimage.com"],
	},
};

module.exports = nextConfig;

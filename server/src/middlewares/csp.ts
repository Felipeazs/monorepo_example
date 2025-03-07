export const CSP_RULES = {
	strictTransportSecurity: "max-age=31536000; includeSubDomains; preload",
	contentSecurityPolicy: {
		scriptSrc: ["'self'"],
		scriptSrcElem: [
			"'self'",
			"'sha256-8eohedfRaQoWnH7igD20HvjedM7lPcYbqukJ7DEpMOk='",
			"https://us-assets.i.posthog.com",
			"https://us.i.posthog.com",
		],
		styleSrc: ["'self'", "https:"],
		styleSrcElem: [
			"'self'",
			"https:",
			"'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
			"'sha256-knPAv6T1m9aFSc0s3vSMuh3Kdxy//BumDVqYOSPzYqE='",
		],
	},
	permissionsPolicy: {
		browsingTopics: ["'self'", "'*'"],
	},
}

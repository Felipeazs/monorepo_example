export const CSP_RULES = {
	strictTransportSecurity: "max-age=31536000; includeSubDomains; preload",
	contentSecurityPolicy: {
		scriptSrc: ["'self'"],
		scriptSrcElem: [
			"'self'",
			"'sha256-8eohedfRaQoWnH7igD20HvjedM7lPcYbqukJ7DEpMOk='",
			"https://*.posthog.com",
			"https://*.up.railway.app",
		],
		styleSrc: ["'self'", "https:"],
		styleSrcElem: [
			"'self'",
			"https:",
			"'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
			"'sha256-knPAv6T1m9aFSc0s3vSMuh3Kdxy//BumDVqYOSPzYqE='",
			"'sha256-nzTgYzXYDNe6BAHiiI7NNlfK8n/auuOAhh2t92YvuXo='",
		],
	},
	permissionsPolicy: {
		browsingTopics: ["'self'", "'*'"],
	},
}

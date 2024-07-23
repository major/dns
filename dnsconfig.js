DEFAULTS(
    DefaultTTL("3600")
);

var REG_NONE = NewRegistrar("none");
var DSP_PORKBUN = NewDnsProvider("porkbun");

D("major.io", REG_NONE, DnsProvider(DSP_PORKBUN),
	DefaultTTL(600),

	// Redirects
	ALIAS("www", "uixie.porkbun.com."),

	ALIAS("@", "dppzfofnt5y9n.cloudfront.net."),
	ALIAS("stats", "major.github.io."),
	ALIAS("txlf24-tech-career", "major.github.io."),
	ALIAS("txlf24-containers", "major.github.io."),

	// Mail
	CNAME("status", "page.updown.io."),
	CNAME("fm1._domainkey", "fm1.major.io.dkim.fmhosted.com."),
	CNAME("fm2._domainkey", "fm2.major.io.dkim.fmhosted.com."),
	CNAME("fm3._domainkey", "fm3.major.io.dkim.fmhosted.com."),
	MX("@", 10, "in1-smtp.messagingengine.com."),
	MX("@", 20, "in2-smtp.messagingengine.com."),
	MX("*", 10, "in1-smtp.messagingengine.com."),
	MX("*", 20, "in2-smtp.messagingengine.com."),
	TXT("@", "v=spf1 include:spf.messagingengine.com ?all"),

	TXT("@", "google-site-verification=tCM6cfzWPV6wZ2RZ9aFzZe1dl2TBGjYXjdTz1K8WUNU"),
	TXT("_updown.status", "updown-page=uy5w"),
	TXT("_github-pages-challenge-major", "5ac40cc1b766ec2929e0de23035406"),
END);

D("mhtx.net", REG_NONE, DnsProvider(DSP_PORKBUN),
	DefaultTTL(600),
	A("hv", "162.213.193.18"),

	// Redirects
	ALIAS("@", "uixie.porkbun.com."),
	CNAME("*", "uixie.porkbun.com."),

	// Mail
	CNAME("firewall", "he708y0f0sr.sn.mynetname.net."),
	CNAME("fm1._domainkey", "fm1.mhtx.net.dkim.fmhosted.com."),
	CNAME("fm2._domainkey", "fm2.mhtx.net.dkim.fmhosted.com."),
	CNAME("fm3._domainkey", "fm3.mhtx.net.dkim.fmhosted.com."),
	CNAME("mesmtp._domainkey", "mesmtp.mhtx.net.dkim.fmhosted.com."),
	MX("@", 120, "mailsec.protonmail.ch."),
	MX("@", 10, "in1-smtp.messagingengine.com."),
	MX("@", 20, "in2-smtp.messagingengine.com."),
	MX("@", 110, "mail.protonmail.ch."),
	TXT("@", "v=spf1 include:spf.messagingengine.com -all"),
	TXT("_dmarc", "v=DMARC1; p=quarantine"),
END);

D("w5wut.com", REG_NONE, DnsProvider(DSP_PORKBUN),
	DefaultTTL(600),
	ALIAS("@", "uixie.porkbun.com."),
	CNAME("*", "uixie.porkbun.com."),
	ALIAS("qrz", "uixie.porkbun.com."),
	ALIAS("fcc", "uixie.porkbun.com."),
END);
var REG_NONE = NewRegistrar("none");
var DSP_CLOUDFLARE = NewDnsProvider("cloudflare", { "manage_redirects": true });

// SPF records for domains without email.
var SPF_NO_MX = [
    TXT("@", "v=spf1 -all")
]

// Fastmail config.
var FASTMAIL_RECORDS = [
    MX('@', 10, 'in1-smtp.messagingengine.com.'),
    MX('@', 20, 'in2-smtp.messagingengine.com.'),
    MX('*', 10, 'in1-smtp.messagingengine.com.'),
    MX('*', 20, 'in2-smtp.messagingengine.com.'),
    TXT("@", "v=spf1 include:spf.messagingengine.com -all")
]
var FASTMAIL_DKIM = function (the_domain) {
    return [
        CNAME('fm1._domainkey', 'fm1.' + the_domain + '.dkim.fmhosted.com.'),
        CNAME('fm2._domainkey', 'fm2.' + the_domain + '.dkim.fmhosted.com.'),
        CNAME('fm3._domainkey', 'fm3.' + the_domain + '.dkim.fmhosted.com.')
    ]
}

D("major.io", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    ALIAS("@", "major-io.pages.dev."),
    TXT('_e6e00522b262580d125eda419b2bf2a3', '_6241c4cde2128f9cc4cf436bc4d69f12.kdbplsmznr.acm-validations.aws'),
    TXT('_github-pages-challenge-major', '5ac40cc1b766ec2929e0de23035406'),
    TXT('_dmarc', 'v=DMARC1; p=none; rua=mailto:d978cefa8ddd442a83ed8515c20646db@dmarc-reports.cloudflare.net;'),
    FASTMAIL_RECORDS,
    FASTMAIL_DKIM("major.io")
);

D("w5wut.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    A("@", "1.2.3.4", CF_PROXY_ON),
    A("*", "1.2.3.4", CF_PROXY_ON),
    CF_REDIRECT("*w5wut.com/*", "https://major.io/w5wut/"),
    SPF_NO_MX
);
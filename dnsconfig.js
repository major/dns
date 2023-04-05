var REG_NONE = NewRegistrar("none");
var DSP_CLOUDFLARE = NewDnsProvider("cloudflare");

// Fastmail config.
var FASTMAIL_RECORDS = [
    MX('@', 10, 'in1-smtp.messagingengine.com.'),
    MX('@', 20, 'in2-smtp.messagingengine.com.'),
    MX('*', 10, 'in1-smtp.messagingengine.com.'),
    MX('*', 20, 'in2-smtp.messagingengine.com.'),
    TXT("@", "v=spf1 include:spf.messagingengine.com ?all")
]
var FASTMAIL_DKIM = function (the_domain) {
    return [
        CNAME('fm1._domainkey', 'fm1.' + the_domain + '.dkim.fmhosted.com.'),
        CNAME('fm2._domainkey', 'fm2.' + the_domain + '.dkim.fmhosted.com.'),
        CNAME('fm3._domainkey', 'fm3.' + the_domain + '.dkim.fmhosted.com.')
    ]
}

// Example domain where the CF proxy abides by the default (off).
D("major.io", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    ALIAS("@", "dppzfofnt5y9n.cloudfront.net.", CF_PROXY_OFF),
    TXT('_e6e00522b262580d125eda419b2bf2a3', '_6241c4cde2128f9cc4cf436bc4d69f12.kdbplsmznr.acm-validations.aws'),
    TXT('_github-pages-challenge-major', '5ac40cc1b766ec2929e0de23035406'),
    FASTMAIL_RECORDS,
    FASTMAIL_DKIM("major.io")
);
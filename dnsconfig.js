DEFAULTS(
    DefaultTTL("86400")
);

var REG_NONE = NewRegistrar("none");
var DSP_R53 = NewDnsProvider("r53_main");

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
]
var FASTMAIL_DKIM = function (the_domain) {
    return [
        CNAME('fm1._domainkey', 'fm1.' + the_domain + '.dkim.fmhosted.com.'),
        CNAME('fm2._domainkey', 'fm2.' + the_domain + '.dkim.fmhosted.com.'),
        CNAME('fm3._domainkey', 'fm3.' + the_domain + '.dkim.fmhosted.com.')
    ]
}

D("major.io", REG_NONE, DnsProvider(DSP_R53),
    NAMESERVER_TTL("2d"),
    R53_ALIAS("@", "A", "dppzfofnt5y9n.cloudfront.net.", R53_ZONE("Z2FDTNDATAQYW2")),
    CNAME("origin", "major.github.io."),
    CNAME("stats", "major.github.io."),
    TXT('_github-pages-challenge-major', '5ac40cc1b766ec2929e0de23035406'),
    TXT("@", "v=spf1 include:spf.messagingengine.com ~all"),
    TXT("@", "google-site-verification=tCM6cfzWPV6wZ2RZ9aFzZe1dl2TBGjYXjdTz1K8WUNU"),
    FASTMAIL_RECORDS,
    FASTMAIL_DKIM("major.io")
);
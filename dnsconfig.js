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
    ALIAS("@", "major-io.pages.dev.", CF_PROXY_ON),
    TXT('_e6e00522b262580d125eda419b2bf2a3', '_6241c4cde2128f9cc4cf436bc4d69f12.kdbplsmznr.acm-validations.aws'),
    TXT('_github-pages-challenge-major', '5ac40cc1b766ec2929e0de23035406'),
    TXT('_github-pages-challenge-major.t4r', '54cd4b87c8c881dd40743807d4745e'),
    CNAME('t4r', 'toyota-inventory.pages.dev.', CF_PROXY_ON),
    TXT('_dmarc', 'v=DMARC1; p=reject; rua=mailto:d978cefa8ddd442a83ed8515c20646db@dmarc-reports.cloudflare.net;'),
    FASTMAIL_RECORDS,
    FASTMAIL_DKIM("major.io")
);

D("mhtx.net", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    A("@", "103.168.172.37", CF_PROXY_ON),
    A("@", "103.168.172.52", CF_PROXY_ON),
    A("*", "103.168.172.37", CF_PROXY_ON),
    A("*", "103.168.172.52", CF_PROXY_ON),
    A("coreos", "5.161.211.180"),
    A("hetzner", "5.161.210.54"),
    CNAME("firewall", "he708y0f0sr.sn.mynetname.net."),
    TXT("default._bimi", "v=BIMI1;l=https://mhtx.net/cowboy-hat-face.svg;a="),
    TXT('_dmarc', 'v=DMARC1;  p=none; rua=mailto:5de49ed820ef403faf1ca9b3593f6e9e@dmarc-reports.cloudflare.net'),
    // SPF records to include Fedora mailing lists
    TXT('@', 'v=spf1 include:_spfcf1.mhtx.net include:spf.messagingengine.com -all'),
    TXT('_spfcf1', 'v=spf1 ip4:38.145.60.11 ip4:38.145.60.12  -all'),
    // postmaster.google.com verification
    TXT("@", "google-site-verification=q1rSmvpqOMTZ2dczLgHVb5qqWtgOFYIFcwMgPHEQaps"),
    FASTMAIL_RECORDS,
    FASTMAIL_DKIM("mhtx.net")
);

D("tootchute.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    A("@", "5.161.181.52"),
    // A("*", "5.161.181.52"),
    CNAME("tootfiles", "f001.backblazeb2.com.", CF_PROXY_ON),
    SPF_NO_MX
);

D("w5wut.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    A("@", "1.2.3.4", CF_PROXY_ON),
    A("*", "1.2.3.4", CF_PROXY_ON),
    CF_REDIRECT("*w5wut.com/*", "https://major.io/w5wut/"),
    SPF_NO_MX
);

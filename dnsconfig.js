var REG_NONE = NewRegistrar("none");
var DSP_CLOUDFLARE = NewDnsProvider("cloudflare");

// Example domain where the CF proxy abides by the default (off).
D("major.io", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    A("proxied", "1.2.3.4", CF_PROXY_ON),
    A("notproxied", "1.2.3.5"),
    A("another", "1.2.3.6", CF_PROXY_ON),
    ALIAS("@", "www.example.tld.", CF_PROXY_ON),
    CNAME("myalias", "www.example.tld.", CF_PROXY_ON)
);
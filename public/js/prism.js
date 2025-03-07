/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+apacheconf+bash+c+cpp+css-extras+fortran+java+perl+php+powershell+python+r+rest+ruby+sql+yaml&plugins=line-numbers */
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var Prism = function() {
    var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i
      , t = self.Prism = {
        util: {
            encode: function(e) {
                return e instanceof n ? new n(e.type,t.util.encode(e.content),e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            },
            type: function(e) {
                return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
            },
            clone: function(e) {
                var n = t.util.type(e);
                switch (n) {
                case "Object":
                    var a = {};
                    for (var r in e)
                        e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
                    return a;
                case "Array":
                    return e.map(function(e) {
                        return t.util.clone(e)
                    })
                }
                return e
            }
        },
        languages: {
            extend: function(e, n) {
                var a = t.util.clone(t.languages[e]);
                for (var r in n)
                    a[r] = n[r];
                return a
            },
            insertBefore: function(e, n, a, r) {
                r = r || t.languages;
                var i = r[e];
                if (2 == arguments.length) {
                    a = arguments[1];
                    for (var l in a)
                        a.hasOwnProperty(l) && (i[l] = a[l]);
                    return i
                }
                var s = {};
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        if (o == n)
                            for (var l in a)
                                a.hasOwnProperty(l) && (s[l] = a[l]);
                        s[o] = i[o]
                    }
                return t.languages.DFS(t.languages, function(t, n) {
                    n === r[e] && t != e && (this[t] = s)
                }),
                r[e] = s
            },
            DFS: function(e, n, a) {
                for (var r in e)
                    e.hasOwnProperty(r) && (n.call(e, r, e[r], a || r),
                    "Object" === t.util.type(e[r]) ? t.languages.DFS(e[r], n) : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r))
            }
        },
        highlightAll: function(e, n) {
            for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++]; )
                t.highlightElement(a, e === !0, n)
        },
        highlightElement: function(a, r, i) {
            for (var l, s, o = a; o && !e.test(o.className); )
                o = o.parentNode;
            if (o && (l = (o.className.match(e) || [, ""])[1],
            s = t.languages[l]),
            a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l,
            o = a.parentNode,
            /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l),
            s) {
                var u = a.textContent;
                if (u) {
                    u = u.replace(/^(?:\r?\n|\r)/, "");
                    var g = {
                        element: a,
                        language: l,
                        grammar: s,
                        code: u
                    };
                    if (t.hooks.run("before-highlight", g),
                    r && self.Worker) {
                        var c = new Worker(t.filename);
                        c.onmessage = function(e) {
                            g.highlightedCode = n.stringify(JSON.parse(e.data), l),
                            t.hooks.run("before-insert", g),
                            g.element.innerHTML = g.highlightedCode,
                            i && i.call(g.element),
                            t.hooks.run("after-highlight", g)
                        }
                        ,
                        c.postMessage(JSON.stringify({
                            language: g.language,
                            code: g.code
                        }))
                    } else
                        g.highlightedCode = t.highlight(g.code, g.grammar, g.language),
                        t.hooks.run("before-insert", g),
                        g.element.innerHTML = g.highlightedCode,
                        i && i.call(a),
                        t.hooks.run("after-highlight", g)
                }
            }
        },
        highlight: function(e, a, r) {
            var i = t.tokenize(e, a);
            return n.stringify(t.util.encode(i), r)
        },
        tokenize: function(e, n) {
            var a = t.Token
              , r = [e]
              , i = n.rest;
            if (i) {
                for (var l in i)
                    n[l] = i[l];
                delete n.rest
            }
            e: for (var l in n)
                if (n.hasOwnProperty(l) && n[l]) {
                    var s = n[l];
                    s = "Array" === t.util.type(s) ? s : [s];
                    for (var o = 0; o < s.length; ++o) {
                        var u = s[o]
                          , g = u.inside
                          , c = !!u.lookbehind
                          , f = 0
                          , h = u.alias;
                        u = u.pattern || u;
                        for (var p = 0; p < r.length; p++) {
                            var d = r[p];
                            if (r.length > e.length)
                                break e;
                            if (!(d instanceof a)) {
                                u.lastIndex = 0;
                                var m = u.exec(d);
                                if (m) {
                                    c && (f = m[1].length);
                                    var y = m.index - 1 + f
                                      , m = m[0].slice(f)
                                      , v = m.length
                                      , k = y + v
                                      , b = d.slice(0, y + 1)
                                      , w = d.slice(k + 1)
                                      , N = [p, 1];
                                    b && N.push(b);
                                    var O = new a(l,g ? t.tokenize(m, g) : m,h);
                                    N.push(O),
                                    w && N.push(w),
                                    Array.prototype.splice.apply(r, N)
                                }
                            }
                        }
                    }
                }
            return r
        },
        hooks: {
            all: {},
            add: function(e, n) {
                var a = t.hooks.all;
                a[e] = a[e] || [],
                a[e].push(n)
            },
            run: function(e, n) {
                var a = t.hooks.all[e];
                if (a && a.length)
                    for (var r, i = 0; r = a[i++]; )
                        r(n)
            }
        }
    }
      , n = t.Token = function(e, t, n) {
        this.type = e,
        this.content = t,
        this.alias = n
    }
    ;
    if (n.stringify = function(e, a, r) {
        if ("string" == typeof e)
            return e;
        if ("Array" === t.util.type(e))
            return e.map(function(t) {
                return n.stringify(t, a, e)
            }).join("");
        var i = {
            type: e.type,
            content: n.stringify(e.content, a, r),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: a,
            parent: r
        };
        if ("comment" == i.type && (i.attributes.spellcheck = "true"),
        e.alias) {
            var l = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
            Array.prototype.push.apply(i.classes, l)
        }
        t.hooks.run("wrap", i);
        var s = "";
        for (var o in i.attributes)
            s += o + '="' + (i.attributes[o] || "") + '"';
        return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + s + ">" + i.content + "</" + i.tag + ">"
    }
    ,
    !self.document)
        return self.addEventListener ? (self.addEventListener("message", function(e) {
            var n = JSON.parse(e.data)
              , a = n.language
              , r = n.code;
            self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r, t.languages[a])))),
            self.close()
        }, !1),
        self.Prism) : self.Prism;
    var a = document.getElementsByTagName("script");
    return a = a[a.length - 1],
    a && (t.filename = a.src,
    document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)),
    self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism);
;Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/,
    prolog: /<\?.+?\?>/,
    doctype: /<!DOCTYPE.+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
                inside: {
                    punctuation: /=|>|"/
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
},
Prism.hooks.add("wrap", function(t) {
    "entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"))
});
;Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
        inside: {
            punctuation: /[;:]/
        }
    },
    url: /url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/,
    string: /("|')(\\\n|\\?.)*?\1/,
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    punctuation: /[\{\};:]/,
    "function": /[-a-z0-9]+(?=\()/i
},
Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/i,
        inside: {
            tag: {
                pattern: /<style[\w\W]*?>|<\/style>/i,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        },
        alias: "language-css"
    }
}),
Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|').*?\1/i,
        inside: {
            "attr-name": {
                pattern: /^\s*style/i,
                inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/i,
                inside: Prism.languages.css
            }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
;Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0
    }],
    string: /("|')(\\[\s\S]|(?!\1)[^\\\r\n])*\1/,
    "class-name": {
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(true|false)\b/,
    "function": {
        pattern: /[a-z0-9_]+\(/i,
        inside: {
            punctuation: /\(/
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
    operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,
    ignore: /&(lt|gt|amp);/i,
    punctuation: /[{}[\];(),.:]/
};
;Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(as|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    "function": /(?!\d)[a-z0-9_$]+(?=\()/i
}),
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0
    }
}),
Prism.languages.insertBefore("javascript", "class-name", {
    "template-string": {
        pattern: /`(?:\\`|\\?[^`])*`/,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}),
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
        inside: {
            tag: {
                pattern: /<script[\w\W]*?>|<\/script>/i,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        },
        alias: "language-javascript"
    }
});
;Prism.languages.apacheconf = {
    comment: /#.*/,
    "directive-inline": {
        pattern: /^\s*\b(AcceptFilter|AcceptPathInfo|AccessFileName|Action|AddAlt|AddAltByEncoding|AddAltByType|AddCharset|AddDefaultCharset|AddDescription|AddEncoding|AddHandler|AddIcon|AddIconByEncoding|AddIconByType|AddInputFilter|AddLanguage|AddModuleInfo|AddOutputFilter|AddOutputFilterByType|AddType|Alias|AliasMatch|Allow|AllowCONNECT|AllowEncodedSlashes|AllowMethods|AllowOverride|AllowOverrideList|Anonymous|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail|AsyncRequestWorkerFactor|AuthBasicAuthoritative|AuthBasicFake|AuthBasicProvider|AuthBasicUseDigestAlgorithm|AuthDBDUserPWQuery|AuthDBDUserRealmQuery|AuthDBMGroupFile|AuthDBMType|AuthDBMUserFile|AuthDigestAlgorithm|AuthDigestDomain|AuthDigestNonceLifetime|AuthDigestProvider|AuthDigestQop|AuthDigestShmemSize|AuthFormAuthoritative|AuthFormBody|AuthFormDisableNoStore|AuthFormFakeBasicAuth|AuthFormLocation|AuthFormLoginRequiredLocation|AuthFormLoginSuccessLocation|AuthFormLogoutLocation|AuthFormMethod|AuthFormMimetype|AuthFormPassword|AuthFormProvider|AuthFormSitePassphrase|AuthFormSize|AuthFormUsername|AuthGroupFile|AuthLDAPAuthorizePrefix|AuthLDAPBindAuthoritative|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPCompareAsUser|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPGroupAttribute|AuthLDAPGroupAttributeIsDN|AuthLDAPInitialBindAsUser|AuthLDAPInitialBindPattern|AuthLDAPMaxSubGroupDepth|AuthLDAPRemoteUserAttribute|AuthLDAPRemoteUserIsDN|AuthLDAPSearchAsUser|AuthLDAPSubGroupAttribute|AuthLDAPSubGroupClass|AuthLDAPUrl|AuthMerging|AuthName|AuthnCacheContext|AuthnCacheEnable|AuthnCacheProvideFor|AuthnCacheSOCache|AuthnCacheTimeout|AuthnzFcgiCheckAuthnProvider|AuthnzFcgiDefineProvider|AuthType|AuthUserFile|AuthzDBDLoginToReferer|AuthzDBDQuery|AuthzDBDRedirectQuery|AuthzDBMType|AuthzSendForbiddenOnFailure|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferedLogs|BufferSize|CacheDefaultExpire|CacheDetailHeader|CacheDirLength|CacheDirLevels|CacheDisable|CacheEnable|CacheFile|CacheHeader|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheIgnoreQueryString|CacheIgnoreURLSessionIdentifiers|CacheKeyBaseURL|CacheLastModifiedFactor|CacheLock|CacheLockMaxAge|CacheLockPath|CacheMaxExpire|CacheMaxFileSize|CacheMinExpire|CacheMinFileSize|CacheNegotiatedDocs|CacheQuickHandler|CacheReadSize|CacheReadTime|CacheRoot|CacheSocache|CacheSocacheMaxSize|CacheSocacheMaxTime|CacheSocacheMinTime|CacheSocacheReadSize|CacheSocacheReadTime|CacheStaleOnError|CacheStoreExpired|CacheStoreNoStore|CacheStorePrivate|CGIDScriptTimeout|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|DeflateBufferSize|DeflateCompressionLevel|DeflateFilterNote|DeflateInflateLimitRequestBody|DeflateInflateRatioBurst|DeflateInflateRatioLimit|DeflateMemLevel|DeflateWindowSize|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DTracePrivileges|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtendedStatus|ExtFilterDefine|ExtFilterOptions|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|HeartbeatAddress|HeartbeatListen|HeartbeatMaxServers|HeartbeatStorage|HeartbeatStorage|HostnameLookups|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|IndexHeadInsert|IndexIgnore|IndexIgnoreReset|IndexOptions|IndexOrderDefault|IndexStyleSheet|InputSed|ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPICacheFile|ISAPIFakeAsync|ISAPILogNotSupported|ISAPIReadAheadBuffer|KeepAlive|KeepAliveTimeout|KeptBodySize|LanguagePriority|LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionPoolTTL|LDAPConnectionTimeout|LDAPLibraryDebug|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPReferralHopLimit|LDAPReferrals|LDAPRetries|LDAPRetryDelay|LDAPSharedCacheFile|LDAPSharedCacheSize|LDAPTimeout|LDAPTrustedClientCert|LDAPTrustedGlobalCert|LDAPTrustedMode|LDAPVerifyServerCert|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldSize|LimitRequestLine|LimitXMLRequestBody|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|LuaHookAccessChecker|LuaHookAuthChecker|LuaHookCheckUserID|LuaHookFixups|LuaHookInsertFilter|LuaHookLog|LuaHookMapToStorage|LuaHookTranslateName|LuaHookTypeChecker|LuaInherit|LuaInputFilter|LuaMapHandler|LuaOutputFilter|LuaPackageCPath|LuaPackagePath|LuaQuickHandler|LuaRoot|LuaScope|MaxConnectionsPerChild|MaxKeepAliveRequests|MaxMemFree|MaxRangeOverlaps|MaxRangeReversals|MaxRanges|MaxRequestWorkers|MaxSpareServers|MaxSpareThreads|MaxThreads|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|MMapFile|ModemStandard|ModMimeUsePathInfo|MultiviewsMatch|Mutex|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|ProxyAddHeaders|ProxyBadHeader|ProxyBlock|ProxyDomain|ProxyErrorOverride|ProxyExpressDBMFile|ProxyExpressDBMType|ProxyExpressEnable|ProxyFtpDirCharset|ProxyFtpEscapeWildcards|ProxyFtpListOnWildcard|ProxyHTMLBufSize|ProxyHTMLCharsetOut|ProxyHTMLDocType|ProxyHTMLEnable|ProxyHTMLEvents|ProxyHTMLExtended|ProxyHTMLFixups|ProxyHTMLInterp|ProxyHTMLLinks|ProxyHTMLMeta|ProxyHTMLStripComments|ProxyHTMLURLMap|ProxyIOBufferSize|ProxyMaxForwards|ProxyPass|ProxyPassInherit|ProxyPassInterpolateEnv|ProxyPassMatch|ProxyPassReverse|ProxyPassReverseCookieDomain|ProxyPassReverseCookiePath|ProxyPreserveHost|ProxyReceiveBufferSize|ProxyRemote|ProxyRemoteMatch|ProxyRequests|ProxySCGIInternalRedirect|ProxySCGISendfile|ProxySet|ProxySourceAddress|ProxyStatus|ProxyTimeout|ProxyVia|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIPHeader|RemoteIPInternalProxy|RemoteIPInternalProxyList|RemoteIPProxiesHeader|RemoteIPTrustedProxy|RemoteIPTrustedProxyList|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|RewriteBase|RewriteCond|RewriteEngine|RewriteMap|RewriteOptions|RewriteRule|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScoreBoardFile|Script|ScriptAlias|ScriptAliasMatch|ScriptInterpreterSource|ScriptLog|ScriptLogBuffer|ScriptLogLength|ScriptSock|SecureListen|SeeRequestTail|SendBufferSize|ServerAdmin|ServerAlias|ServerLimit|ServerName|ServerPath|ServerRoot|ServerSignature|ServerTokens|Session|SessionCookieName|SessionCookieName2|SessionCookieRemove|SessionCryptoCipher|SessionCryptoDriver|SessionCryptoPassphrase|SessionCryptoPassphraseFile|SessionDBDCookieName|SessionDBDCookieName2|SessionDBDCookieRemove|SessionDBDDeleteLabel|SessionDBDInsertLabel|SessionDBDPerUser|SessionDBDSelectLabel|SessionDBDUpdateLabel|SessionEnv|SessionExclude|SessionHeader|SessionInclude|SessionMaxAge|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIETag|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSLCACertificateFile|SSLCACertificatePath|SSLCADNRequestFile|SSLCADNRequestPath|SSLCARevocationCheck|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLCompression|SSLCryptoDevice|SSLEngine|SSLFIPS|SSLHonorCipherOrder|SSLInsecureRenegotiation|SSLOCSPDefaultResponder|SSLOCSPEnable|SSLOCSPOverrideResponder|SSLOCSPResponderTimeout|SSLOCSPResponseMaxAge|SSLOCSPResponseTimeSkew|SSLOCSPUseRequestNonce|SSLOpenSSLConfCmd|SSLOptions|SSLPassPhraseDialog|SSLProtocol|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationCheck|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCheckPeerCN|SSLProxyCheckPeerExpire|SSLProxyCheckPeerName|SSLProxyCipherSuite|SSLProxyEngine|SSLProxyMachineCertificateChainFile|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLProxyVerify|SSLProxyVerifyDepth|SSLRandomSeed|SSLRenegBufferSize|SSLRequire|SSLRequireSSL|SSLSessionCache|SSLSessionCacheTimeout|SSLSessionTicketKeyFile|SSLSRPUnknownUserSeed|SSLSRPVerifierFile|SSLStaplingCache|SSLStaplingErrorCacheTimeout|SSLStaplingFakeTryLater|SSLStaplingForceURL|SSLStaplingResponderTimeout|SSLStaplingResponseMaxAge|SSLStaplingResponseTimeSkew|SSLStaplingReturnResponderErrors|SSLStaplingStandardCacheTimeout|SSLStrictSNIVHostCheck|SSLUserName|SSLUseStapling|SSLVerifyClient|SSLVerifyDepth|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
        alias: "property"
    },
    "directive-block": {
        pattern: /<\/?\b(AuthnProviderAlias|AuthzProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|RequireAll|RequireAny|RequireNone|VirtualHost)\b *.*>/i,
        inside: {
            "directive-block": {
                pattern: /^<\/?\w+/,
                inside: {
                    punctuation: /^<\/?/
                },
                alias: "tag"
            },
            "directive-block-parameter": {
                pattern: /.*[^>]/,
                inside: {
                    punctuation: /:/,
                    string: {
                        pattern: /("|').*\1/,
                        inside: {
                            variable: /(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/
                        }
                    }
                },
                alias: "attr-value"
            },
            punctuation: />/
        },
        alias: "tag"
    },
    "directive-flags": {
        pattern: /\[(\w,?)+\]/,
        alias: "keyword"
    },
    string: {
        pattern: /("|').*\1/,
        inside: {
            variable: /(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/
        }
    },
    variable: /(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/,
    regex: /\^?.*\$|\^.*\$?/
};
;Prism.languages.bash = Prism.languages.extend("clike", {
    comment: {
        pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/,
        lookbehind: !0
    },
    string: {
        pattern: /("|')(\\?[\s\S])*?\1/,
        inside: {
            property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/
        }
    },
    number: {
        pattern: /([^\w\.])-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
        lookbehind: !0
    },
    "function": /\b(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|declare|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|echo|egrep|eject|enable|env|ethtool|eval|exec|exit|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|select|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|until|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)\b/,
    keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/
}),
Prism.languages.insertBefore("bash", "keyword", {
    property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/
}),
Prism.languages.insertBefore("bash", "comment", {
    important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/
});
;Prism.languages.c = Prism.languages.extend("clike", {
    string: /("|')([^\n\\\1]|\\.|\\\r*\n)*?\1/,
    keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\//
}),
Prism.languages.insertBefore("c", "string", {
    property: {
        pattern: /((^|\n)\s*)#\s*[a-z]+([^\n\\]|\\.|\\\r*\n)*/i,
        lookbehind: !0,
        inside: {
            string: {
                pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/,
                lookbehind: !0
            }
        }
    }
}),
delete Prism.languages.c["class-name"],
delete Prism.languages.c["boolean"];
;Prism.languages.cpp = Prism.languages.extend("c", {
    keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    "boolean": /\b(true|false)\b/,
    operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
}),
Prism.languages.insertBefore("cpp", "keyword", {
    "class-name": {
        pattern: /(class\s+)[a-z0-9_]+/i,
        lookbehind: !0
    }
});
;Prism.languages.css.selector = {
    pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
    inside: {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+(?:\(.*\))?/,
        "class": /\.[-:\.\w]+/,
        id: /#[-:\.\w]+/
    }
},
Prism.languages.insertBefore("css", "function", {
    hexcode: /#[\da-f]{3,6}/i,
    entity: /\\[\da-f]{1,8}/i,
    number: /[\d%\.]+/
});
;Prism.languages.fortran = {
    "quoted-number": {
        pattern: /[BOZ](['"])[A-F0-9]+\1/i,
        alias: "number"
    },
    string: {
        pattern: /(?:\w+_)?(['"])(?:\1\1|&\n(?:\s*!.+\n)?|(?!\1).)*(?:\1|&)/,
        inside: {
            comment: /!.*/
        }
    },
    comment: /!.*/,
    "boolean": /\.(?:TRUE|FALSE)\.(?:_\w+)?/i,
    number: /(?:\b|[+-])(?:\d+(?:\.\d*)?|\.\d+)(?:[ED][+-]?\d+)?(?:_\w+)?/i,
    keyword: [/\b(?:INTEGER|REAL|DOUBLE ?PRECISION|COMPLEX|CHARACTER|LOGICAL)\b/i, /\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\b/i, /\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\b/i, /\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEWHERE|ELSEIF|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\b/i],
    operator: [/\*\*|\/\/|=>|[=\/]=|[<>]=?|::|[+\-*=%]|\.(?:EQ|NE|LT|LE|GT|GE|NOT|AND|OR|EQV|NEQV)\.|\.[A-Z]+\./i, {
        pattern: /(^|(?!\().)\/(?!\))/,
        lookbehind: !0
    }],
    punctuation: /\(\/|\/\)|[(),;:&]/
};
;Prism.languages.java = Prism.languages.extend("clike", {
    keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\b\d*\.?\d+\b/i,
    operator: {
        pattern: /(^|[^\.])(?:\+=|\+\+?|-=|--?|!=?|<{1,2}=?|>{1,3}=?|==?|&=|&&?|\|=|\|\|?|\?|\*=?|\/=?|%=?|\^=?|:|~)/m,
        lookbehind: !0
    }
});
;Prism.languages.perl = {
    comment: [{
        pattern: /((?:^|\n)\s*)=\w+[\s\S]*?=cut.*/,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\$])#.*?(\r?\n|$)/,
        lookbehind: !0
    }],
    string: [/\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1/, /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(\\?.)*?\s*\1/, /\b(?:q|qq|qx|qw)\s*\(([^()]|\\.)*\s*\)/, /\b(?:q|qq|qx|qw)\s*\{([^{}]|\\.)*\s*\}/, /\b(?:q|qq|qx|qw)\s*\[([^[\]]|\\.)*\s*\]/, /\b(?:q|qq|qx|qw)\s*<([^<>]|\\.)*\s*>/, /("|'|`)(\\?.)*?\1/],
    regex: [/\b(?:m|qr)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1[msixpodualgc]*/, /\b(?:m|qr)\s+([a-zA-Z0-9])(\\?.)*?\s*\1[msixpodualgc]*/, /\b(?:m|qr)\s*\(([^()]|\\.)*\s*\)[msixpodualgc]*/, /\b(?:m|qr)\s*\{([^{}]|\\.)*\s*\}[msixpodualgc]*/, /\b(?:m|qr)\s*\[([^[\]]|\\.)*\s*\][msixpodualgc]*/, /\b(?:m|qr)\s*<([^<>]|\\.)*\s*>[msixpodualgc]*/, /\b(?:s|tr|y)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1\s*((?!\1).|\\.)*\s*\1[msixpodualgcer]*/, /\b(?:s|tr|y)\s+([a-zA-Z0-9])(\\?.)*?\s*\1\s*((?!\1).|\\.)*\s*\1[msixpodualgcer]*/, /\b(?:s|tr|y)\s*\(([^()]|\\.)*\s*\)\s*\(\s*([^()]|\\.)*\s*\)[msixpodualgcer]*/, /\b(?:s|tr|y)\s*\{([^{}]|\\.)*\s*\}\s*\{\s*([^{}]|\\.)*\s*\}[msixpodualgcer]*/, /\b(?:s|tr|y)\s*\[([^[\]]|\\.)*\s*\]\s*\[\s*([^[\]]|\\.)*\s*\][msixpodualgcer]*/, /\b(?:s|tr|y)\s*<([^<>]|\\.)*\s*>\s*<\s*([^<>]|\\.)*\s*>[msixpodualgcer]*/, /\/(\[.+?]|\\.|[^\/\r\n])*\/[msixpodualgc]*(?=\s*($|[\r\n,.;})&|\-+*=~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/],
    variable: [/[&*\$@%]\{\^[A-Z]+\}/, /[&*\$@%]\^[A-Z_]/, /[&*\$@%]#?(?=\{)/, /[&*\$@%]#?((::)*'?(?!\d)[\w$]+)+(::)*/i, /[&*\$@%]\d+/, /[\$@%][!"#\$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],
    filehandle: {
        pattern: /<(?!=).*>|\b_\b/,
        alias: "symbol"
    },
    vstring: {
        pattern: /v\d+(\.\d+)*|\d+(\.\d+){2,}/,
        alias: "string"
    },
    "function": {
        pattern: /sub [a-z0-9_]+/i,
        inside: {
            keyword: /sub/
        }
    },
    keyword: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    number: /(\n|\b)-?(0x[\dA-Fa-f](_?[\dA-Fa-f])*|0b[01](_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee]-?\d+)?)\b/,
    operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|[-+*=~\/|&]{1,2}|<=?|>=?|\.{1,3}|[!?\\^]|\b(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b/,
    punctuation: /[{}[\];(),:]/
};
;Prism.languages.php = Prism.languages.extend("clike", {
    keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
    constant: /\b[A-Z0-9_]{2,}\b/,
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/).*?(\r?\n|$))/,
        lookbehind: !0
    }
}),
Prism.languages.insertBefore("php", "class-name", {
    "shell-comment": {
        pattern: /(^|[^\\])#.*?(\r?\n|$)/,
        lookbehind: !0,
        alias: "comment"
    }
}),
Prism.languages.insertBefore("php", "keyword", {
    delimiter: /(\?>|<\?php|<\?)/i,
    variable: /(\$\w+)\b/i,
    "package": {
        pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
        lookbehind: !0,
        inside: {
            punctuation: /\\/
        }
    }
}),
Prism.languages.insertBefore("php", "operator", {
    property: {
        pattern: /(->)[\w]+/,
        lookbehind: !0
    }
}),
Prism.languages.markup && (Prism.hooks.add("before-highlight", function(e) {
    "php" === e.language && (e.tokenStack = [],
    e.backupCode = e.code,
    e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(n) {
        return e.tokenStack.push(n),
        "{{{PHP" + e.tokenStack.length + "}}}"
    }))
}),
Prism.hooks.add("before-insert", function(e) {
    "php" === e.language && (e.code = e.backupCode,
    delete e.backupCode)
}),
Prism.hooks.add("after-highlight", function(e) {
    if ("php" === e.language) {
        for (var n, a = 0; n = e.tokenStack[a]; a++)
            e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (a + 1) + "}}}", Prism.highlight(n, e.grammar, "php"));
        e.element.innerHTML = e.highlightedCode
    }
}),
Prism.hooks.add("wrap", function(e) {
    "php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'))
}),
Prism.languages.insertBefore("php", "comment", {
    markup: {
        pattern: /<[^?]\/?(.*?)>/,
        inside: Prism.languages.markup
    },
    php: /\{\{\{PHP[0-9]+\}\}\}/
}));
;Prism.languages.powershell = {
    comment: [{
        pattern: /(^|[^`])<#[\w\W]*?#>/,
        lookbehind: !0
    }, {
        pattern: /(^|[^`])#.*?(\r?\n|$)/,
        lookbehind: !0
    }],
    string: {
        pattern: /("|')(`?[\w\W])*?\1/m,
        inside: {}
    },
    namespace: /\[[a-z][\w\W]*?\]/i,
    "boolean": /\$(true|false)\b/i,
    variable: /\$\w+\b/i,
    keyword: /\b(Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|In|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
    "function": /\b(Add-(Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-(Computer|Content|EventLog|History|Item|ItemProperty|Variable)|Compare-(Object)|Complete-(Transaction)|Connect-(PSSession)|ConvertFrom-(Csv|Json|StringData)|Convert-(Path)|ConvertTo-(Csv|Html|Json|Xml)|Copy-(Item|ItemProperty)|Debug-(Process)|Disable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-(PSSession)|Enable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-(PSSession)|Exit-(PSSession)|Export-(Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-(Object)|Format-(Custom|List|Table|Wide)|Get-(Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-(Object)|Import-(Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-(Path)|Limit-(EventLog)|Measure-(Command)|Measure-(Object)|Move-(Item|ItemProperty)|New-(Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(Default|File|GridView|Host|Null|Printer|String)|Pop-(Location)|Push-(Location)|Read-(Host)|Receive-(Job)|Receive-(PSSession)|Register-(EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(Computer|Item|ItemProperty)|Reset-(ComputerMachinePassword)|Resolve-(Path)|Restart-(Computer|Service)|Restore-(Computer)|Resume-(Job|Service)|Save-(Help)|Select-(Object|String|Xml)|Send-(MailMessage)|Set-(Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(Command|ControlPanelItem|EventLog)|Sort-(Object)|Split-(Path)|Start-(Job|Process|Service|Sleep|Transaction)|Stop-(Computer|Job|Process|Service)|Suspend-(Job|Service)|Tee-(Object)|Test-(ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-(Command)|Unblock-(File)|Undo-(Transaction)|Unregister-(Event|PSSessionConfiguration)|Update-(FormatData)|Update-(Help|List|TypeData)|Use-(Transaction)|Wait-(Event|Job|Process)|Where-(Object)|Write-(Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning)|ac|cat|cd|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
    operator: {
        pattern: /(\W)-(and|x?or|not|eq|ne|gt|ge|lt|le|Like|(Not)?(Like|Match|Contains|In)|Replace)\b/i,
        lookbehind: !0
    },
    punctuation: /[|{}[\];(),.]/
},
Prism.languages.powershell.string.inside.boolean = Prism.languages.powershell.boolean,
Prism.languages.powershell.string.inside.variable = Prism.languages.powershell.variable;
;Prism.languages.python = {
    comment: {
        pattern: /(^|[^\\])#.*?(\r?\n|$)/,
        lookbehind: !0
    },
    string: /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/,
    "function": {
        pattern: /((^|\s)def[ \t]+)([a-zA-Z_][a-zA-Z0-9_]*(?=\())/g,
        lookbehind: !0
    },
    keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
    "boolean": /\b(True|False)\b/,
    number: /\b-?(0[bo])?(?:(\d|0x[a-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+]|<=?|>=?|!|={1,2}|&{1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/,
    punctuation: /[{}[\];(),.:]/
};
;Prism.languages.r = {
    comment: /#.+/,
    string: /(['"])(?:\\?.)*?\1/,
    "percent-operator": {
        pattern: /%[^%]*?%/,
        alias: "operator"
    },
    "boolean": /\b(?:TRUE|FALSE)\b/,
    ellipsis: /\.\.(?:\.|\d+)/,
    number: [/\b(?:NaN|Inf)\b/, /\b(?:0x[\dA-Fa-f]+(?:\.\d*)?|\d*\.?\d+)(?:[EePp][+-]??\d+)?[iL]?\b/],
    keyword: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
    operator: /->>?|<?<-|[<>!=]=?|::?|&&?|\|\|?|[+\-*\/^$@~]/,
    punctuation: /[(){}\[\],;]/
};
;Prism.languages.rest = {
    table: [{
        pattern: /(\s*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1(?:[+|].+)+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+\+/,
        lookbehind: !0,
        inside: {
            punctuation: /\||(?:\+[=-]+)+\+/
        }
    }, {
        pattern: /(\s*)(?:=+ +)+=+((?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1(?:=+ +)+=+(?=(?:\r?\n|\r){2}|\s*$)/,
        lookbehind: !0,
        inside: {
            punctuation: /[=-]+/
        }
    }],
    "substitution-def": {
        pattern: /(^\s*\.\. )\|(?:[^|\s]|[^|\s][^|]*[^|\s])\| [^:]+::/m,
        lookbehind: !0,
        inside: {
            substitution: {
                pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
                alias: "attr-value",
                inside: {
                    punctuation: /^\||\|$/
                }
            },
            directive: {
                pattern: /( )[^:]+::/,
                lookbehind: !0,
                alias: "function",
                inside: {
                    punctuation: /::$/
                }
            }
        }
    },
    "link-target": [{
        pattern: /(^\s*\.\. )\[[^\]]+\]/m,
        lookbehind: !0,
        alias: "string",
        inside: {
            punctuation: /^\[|\]$/
        }
    }, {
        pattern: /(^\s*\.\. )_(?:`[^`]+`|(?:\\:|[^:])+):/m,
        lookbehind: !0,
        alias: "string",
        inside: {
            punctuation: /^_|:$/
        }
    }],
    directive: {
        pattern: /(^\s*\.\. )[^:]+::/m,
        lookbehind: !0,
        alias: "function",
        inside: {
            punctuation: /::$/
        }
    },
    comment: {
        pattern: /(^\s*\.\.\s).*(?:(?:\r?\n|\r).*)*?(?=(?:\r?\n|\r){2}|$)/m,
        lookbehind: !0
    },
    title: [{
        pattern: /^([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]{2,})(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m,
        inside: {
            punctuation: /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
            important: /.+/
        }
    }, {
        pattern: /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]{2,}(?=\r?\n|\r|$)/,
        lookbehind: !0,
        inside: {
            punctuation: /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
            important: /.+/
        }
    }],
    hr: {
        pattern: /((?:\r?\n|\r){2})[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]{4,}(?=(?:\r?\n|\r){2})/,
        lookbehind: !0,
        alias: "punctuation"
    },
    "list-bullet": {
        pattern: /(^\s*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
        lookbehind: !0,
        alias: "punctuation"
    },
    field: {
        pattern: /(^\s*):[^:]+:(?= )/m,
        lookbehind: !0,
        alias: "attr-name"
    },
    "command-line-option": {
        pattern: /(^\s*)(?:[+-][a-z\d]|(?:\-\-|\/)[a-z\d-]+)(?:[ =](?:[a-z][a-z\d_-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:\-\-|\/)[a-z\d-]+)(?:[ =](?:[a-z][a-z\d_-]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}[\S])/im,
        lookbehind: !0,
        alias: "symbol"
    },
    "literal-block": {
        pattern: /::(?:\r?\n|\r){2}([ \t]+).+(?:(?:\r?\n|\r)\1.+)*/,
        inside: {
            "literal-block-punctuation": {
                pattern: /^::/,
                alias: "punctuation"
            }
        }
    },
    "quoted-literal-block": {
        pattern: /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).*(?:(?:\r?\n|\r)\1.*)*/,
        inside: {
            "literal-block-punctuation": {
                pattern: /^(?:::|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])/m,
                alias: "punctuation"
            }
        }
    },
    "doctest-block": {
        pattern: /(^\s*)>>> .+(?:(?:\r?\n|\r).+)*/m,
        lookbehind: !0,
        inside: {
            punctuation: /^>>>/
        }
    },
    inline: [{
        pattern: /(^|[\s\-:\/'"<(\[{])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s).*?[^\s]\2(?=[\s\-.,:;!?\\\/'")\]}]|$))/m,
        lookbehind: !0,
        inside: {
            bold: {
                pattern: /(^\*\*).+(?=\*\*$)/,
                lookbehind: !0
            },
            italic: {
                pattern: /(^\*).+(?=\*$)/,
                lookbehind: !0
            },
            "inline-literal": {
                pattern: /(^``).+(?=``$)/,
                lookbehind: !0,
                alias: "symbol"
            },
            role: {
                pattern: /^:[^:]+:|:[^:]+:$/,
                alias: "function",
                inside: {
                    punctuation: /^:|:$/
                }
            },
            "interpreted-text": {
                pattern: /(^`).+(?=`$)/,
                lookbehind: !0,
                alias: "attr-value"
            },
            substitution: {
                pattern: /(^\|).+(?=\|$)/,
                lookbehind: !0,
                alias: "attr-value"
            },
            punctuation: /\*\*?|``?|\|/
        }
    }],
    link: [{
        pattern: /\[[^\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/,
        alias: "string",
        inside: {
            punctuation: /^\[|\]_$/
        }
    }, {
        pattern: /(?:\b[a-z\d](?:[_.:+]?[a-z\d]+)?_?_|`[^`]+`_?_|_`[^`]+`)(?=[\s\-.,:;!?\\\/'")\]}]|$)/i,
        alias: "string",
        inside: {
            punctuation: /^_?`|`?_?_$/
        }
    }],
    punctuation: {
        pattern: /(^\s*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m,
        lookbehind: !0
    }
};
;Prism.languages.ruby = Prism.languages.extend("clike", {
    comment: /#[^\r\n]*(\r?\n|$)/,
    keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,
    builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/
}),
Prism.languages.insertBefore("ruby", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0
    },
    variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/,
    symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/
});
;Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/,
        lookbehind: !0
    },
    string: {
        pattern: /(^|[^@])("|')(\\?[\s\S])*?\2/,
        lookbehind: !0
    },
    variable: /@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/,
    "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/i,
    "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b-?(0x)?\d*\.?[\da-f]+\b/,
    operator: /\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//i,
    punctuation: /[;[\]()`,.]/
};
;Prism.languages.yaml = {
    scalar: {
        pattern: /([\-:]\s*(![^\s]+)?[ \t]*[|>])[ \t]*(?:(\n[ \t]+)[^\r\n]+(?:\3[^\r\n]+)*)/,
        lookbehind: !0,
        alias: "string"
    },
    comment: /#[^\n]+/,
    key: {
        pattern: /(\s*[:\-,[{\n?][ \t]*(![^\s]+)?[ \t]*)[^\n{[\]},#]+?(?=\s*:\s)/,
        lookbehind: !0,
        alias: "atrule"
    },
    directive: {
        pattern: /((^|\n)[ \t]*)%[^\n]+/,
        lookbehind: !0,
        alias: "important"
    },
    datetime: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(\d{4}-\d\d?-\d\d?([tT]|[ \t]+)\d\d?:\d{2}:\d{2}(\.\d*)?[ \t]*(Z|[-+]\d\d?(:\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(:\d{2}(\.\d*)?)?)(?=[ \t]*(\n|$|,|]|}))/,
        lookbehind: !0,
        alias: "number"
    },
    "boolean": {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(true|false)[ \t]*(?=\n|$|,|]|})/i,
        lookbehind: !0,
        alias: "important"
    },
    "null": {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(null|~)[ \t]*(?=\n|$|,|]|})/i,
        lookbehind: !0,
        alias: "important"
    },
    string: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')(?=[ \t]*(\n|$|,|]|}))/,
        lookbehind: !0
    },
    number: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)[+\-]?(0x[\dA-Fa-f]+|0o[0-7]+|(\d+\.?\d*|\.?\d+)(e[\+\-]?\d+)?|\.inf|\.nan)[ \t]*(?=\n|$|,|]|})/i,
        lookbehind: !0
    },
    tag: /![^\s]+/,
    important: /[&*][\w]+/,
    punctuation: /([:[\]{}\-,|>?]|---|\.\.\.)/
};
;Prism.hooks.add("after-highlight", function(e) {
    var t = e.element.parentNode
      , s = /\s*\bline-numbers\b\s*/;
    if (t && /pre/i.test(t.nodeName) && (s.test(t.className) || s.test(e.element.className))) {
        s.test(e.element.className) && (e.element.className = e.element.className.replace(s, "")),
        s.test(t.className) || (t.className += " line-numbers");
        var a, n = 1 + e.code.split("\n").length, l = new Array(n);
        l = l.join("<span></span>"),
        a = document.createElement("span"),
        a.className = "line-numbers-rows",
        a.innerHTML = l,
        t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)),
        e.element.appendChild(a)
    }
});
;
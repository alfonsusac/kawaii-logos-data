import type { AuthorDefinition } from "../resolve-author"

export const sawaratsuki: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/SAWARATSUKI/KawaiiLogos",
    transform: [
      { type: "replace", from: "/png", to: "" },
      { type: "replace", from: "/jpg", to: "" },
      { type: "replace", from: "/webp", to: "" },
      { type: "replace", from: "ResponseCode/", to: "" },
      { type: "replace", from: "IamSeries/", to: "" },
      { type: "replace", from: "type1/技術者倫理", to: "技術者倫理-type1" },
      { type: "replace", from: "type2/技術者倫理", to: "技術者倫理-type2" },
    ],
    licenseFallback: {
      type: "custom",
      href: "https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/README_EN.md#license",
    },
    postProcess: [
      
      // https://x.com/sawaratsuki1004/status/1782831616794227005/photo/1 (posted much later after more items are added. so this list will be overridden with correct date from individual posts.)
      { type: "add entry createdAt", entryKey: "archlinux", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "clang", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "c#", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "c", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "c++", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "figma", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "github", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "gitlab", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "go-lang", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "haskell", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "hono", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "html", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "iamaprogrammer!", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "iamaprogrammerenglish", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "photoshop", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "python", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "qwik.js", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "raspberrypi", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "ruby", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "streamloots", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "swift", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "teamspeak", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "voicemod", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "wallhack", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "x", createdAt: "Apr 24, 2024" },
    
      // laravel
      { type: "add entry reference", entryKey: "laravel", reference: "https://x.com/sawaratsuki1004/status/1782058728684138549/photo/1" },
      { type: "add entry reference", entryKey: "laravel", reference: "https://x.com/sawaratsuki1004/status/1781819385973494137/photo/1" },
      { type: "add entry reference", entryKey: "laravel", reference: "https://x.com/sawaratsuki1004/status/1781881508133052846/photo/1" },
      { type: "add entry reference", entryKey: "laravel", reference: "https://x.com/sawaratsuki1004/status/1790008769155383780/photo/1" },

      // go-lang
      { type: "add entry createdAt", entryKey: "go-lang", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "go-lang", reference: "https://x.com/sawaratsuki1004/status/1782059480332832852/photo/1" },
      { type: "add entry reference", entryKey: "go-lang", reference: "https://x.com/sawaratsuki1004/status/1782021905933009004/photo/1" },
      { type: "add entry reference", entryKey: "go-lang", reference: "https://x.com/sawaratsuki1004/status/1797997140456923318/photo/1" },

      { type: "add entry createdAt", entryKey: "next.js", createdAt: "Apr 20, 2024" },
      { type: "add entry reference", entryKey: "next.js", reference: "https://x.com/sawaratsuki1004/status/1781693841768427658/photo/1" },
      { type: "add entry reference", entryKey: "next.js", reference: "https://x.com/sawaratsuki1004/status/1837718508396019962/photo/1" },
      
      { type: "add entry createdAt", entryKey: "cloudflare", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "cloudflare", reference: "https://x.com/sawaratsuki1004/status/1781891030058672321/photo/1" },
      { type: "add entry reference", entryKey: "cloudflare", reference: "https://x.com/sawaratsuki1004/status/1805206075920289973/photo/1" },

      // github (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "github", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "github", reference: "https://x.com/sawaratsuki1004/status/1782069963895038298/photo/1" },
      { type: "add entry reference", entryKey: "github", reference: "https://x.com/sawaratsuki1004/status/1783514454950617255/photo/1" },
      
      // gitlab (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "gitlab", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "gitlab", reference: "https://x.com/sawaratsuki1004/status/1782074596713447587/photo/1" },
      
      // Java (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "java", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "java", reference: "https://x.com/sawaratsuki1004/status/1782074596713447587/photo/1" },

      // C C# C++ (missing src) (c,c#,c++) (found in archive)
      { type: "add entry createdAt", entryKey: "c,c#,c++", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "c,c#,c++", reference: "https://x.com/sawaratsuki1004/status/1782055072282906626/photo/1" },

      // Python (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "python", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "python", reference: "https://x.com/sawaratsuki1004/status/1782099482093764910/photo/1" },

      // Teamspeak (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "teamspeak", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "teamspeak", reference: "https://x.com/sawaratsuki1004/status/1782106483787993497/photo/1" },

      // Voicemod (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "voicemod", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "voicemod", reference: "https://x.com/sawaratsuki1004/status/1782118029431894252/photo/1" },
      { type: "add entry reference", entryKey: "voicemod", reference: "https://x.com/sawaratsuki1004/status/1788210818255102449/photo/1" },
      { type: "add entry reference", entryKey: "voicemod", reference: "https://x.com/sawaratsuki1004/status/1863950676818383026/photo/1" },

      // Swift (missing src) (found in archive)
      { type: "add entry reference", entryKey: "swift", reference: "https://x.com/sawaratsuki1004/status/1782120134569759198/photo/1" },

      // hono
      { type: "add entry createdAt", entryKey: "hono", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "hono", reference: "https://x.com/sawaratsuki1004/status/1782126454941356282/photo/1" },
      { type: "add entry reference", entryKey: "hono", reference: "https://x.com/sawaratsuki1004/status/1782126520540299470/photo/1" },
      { type: "add entry reference", entryKey: "hono", reference: "https://x.com/sawaratsuki1004/status/1783523761167413644/photo/1" },
      { type: "add entry reference", entryKey: "hono", reference: "https://x.com/sawaratsuki1004/status/1790008948893892712/photo/1" },

      // angular
      { type: "add entry createdAt", entryKey: "angular", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "angular", reference: "https://x.com/sawaratsuki1004/status/1782016858646024562/photo/1" },
      { type: "add entry reference", entryKey: "angular", reference: "https://x.com/sawaratsuki1004/status/1782131597007073501/photo/1" },
      { type: "add entry reference", entryKey: "angular", reference: "https://x.com/sawaratsuki1004/status/1782132328820781475/photo/1" },
      { type: "add entry reference", entryKey: "angular", reference: "https://x.com/sawaratsuki1004/status/1782133005450109023/photo/1" },
      { type: "add entry reference", entryKey: "angular", reference: "https://x.com/sawaratsuki1004/status/1862024819245735937/photo/1" },

      // kotlin
      { type: "add entry reference", entryKey: "kotlin", reference: "https://x.com/sawaratsuki1004/status/1781978688155951144/photo/1" },
      { type: "add entry reference", entryKey: "kotlin", reference: "https://x.com/sawaratsuki1004/status/1782257675054809197/photo/1" },
      { type: "add entry reference", entryKey: "kotlin", reference: "https://x.com/sawaratsuki1004/status/1783063043884401091/photo/1" },
      { type: "add entry reference", entryKey: "kotlin", reference: "https://x.com/sawaratsuki1004/status/1789582888272531665/photo/1" },

      // ruby (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "ruby", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "ruby", reference: "https://x.com/sawaratsuki1004/status/1782322111044043069/photo/1" },

      // computer-architecture-design (missing src)
      { type: "add entry createdAt", entryKey: "computer-architecture-design", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "computer-architecture-design", reference: "https://x.com/sawaratsuki1004/status/1782335982504923242/photo/1" },

      // wallhack (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "wallhack", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "wallhack", reference: "https://x.com/sawaratsuki1004/status/1782341113480909072/photo/1" },

      // figma
      { type: "add entry createdAt", entryKey: "figma", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "figma", reference: "https://x.com/sawaratsuki1004/status/1782343622207393898/photo/1" },
      { type: "add entry reference", entryKey: "figma", reference: "https://x.com/sawaratsuki1004/status/1805917924080615810/photo/1" },

      // html (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "html", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "html", reference: "https://x.com/sawaratsuki1004/status/1782363387562959057/photo/1" },

      // archlinux (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "archlinux", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "archlinux", reference: "https://x.com/sawaratsuki1004/status/1782373444233118036/photo/1" },

      // photoshop (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "photoshop", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "photoshop", reference: "https://x.com/sawaratsuki1004/status/1782389745647263810/photo/1" },

      // x (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "x", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "x", reference: "https://x.com/sawaratsuki1004/status/1782404460716900527/photo/1" },

      // raspberry pi (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "raspberrypi", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "raspberrypi", reference: "https://x.com/sawaratsuki1004/status/1782421099797680548/photo/1" },

      // qwik.js (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "qwik.js", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "qwik.js", reference: "https://x.com/sawaratsuki1004/status/1782429660145746024/photo/1" },
      { type: "add entry reference", entryKey: "qwik.js", reference: "https://x.com/sawaratsuki1004/status/1787985882437566504/photo/1" },

      // htmx (missing src) (found in archive)
      { type: "add entry reference", entryKey: "htmx", reference: "https://x.com/sawaratsuki1004/status/1781862842041602499/photo/1" },
      { type: "add entry reference", entryKey: "htmx", reference: "https://x.com/htmx_org/status/1782449324112105883/photo/1" },
      { type: "add entry reference", entryKey: "htmx", reference: "https://x.com/sawaratsuki1004/status/1782449755957887235/photo/1" },

      // haskell
      { type: "add entry createdAt", entryKey: "haskell", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "haskell", reference: "https://x.com/sawaratsuki1004/status/1782465758112702857/photo/1" },
      { type: "add entry reference", entryKey: "haskell", reference: "https://x.com/sawaratsuki1004/status/1782812792950800384/photo/1" },
      { type: "add entry reference", entryKey: "haskell", reference: "https://x.com/sawaratsuki1004/status/1798356090238972415/photo/1" },

      // streamloots (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "streamloots", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "streamloots", reference: "https://x.com/sawaratsuki1004/status/1782471337736536070/photo/1" },

      // iamprogrammer!
      { type: "add entry createdAt", entryKey: "iamprogrammer!", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "iamprogrammer!", reference: "https://x.com/sawaratsuki1004/status/1782729209066230115/photo/1" },

      // iamprogrammerenglish
      { type: "add entry createdAt", entryKey: "iamprogrammerenglish", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "iamprogrammerenglish", reference: "https://x.com/sawaratsuki1004/status/1782734392693277027/photo/1" },
      { type: "add entry reference", entryKey: "iamprogrammerenglish", reference: "https://x.com/sawaratsuki1004/status/1782735265381159148/photo/1" },

      // C# (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "c#", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "c#", reference: "https://x.com/sawaratsuki1004/status/1782802041435509088/photo/1" },
      { type: "add entry reference", entryKey: "c#", reference: "https://x.com/sawaratsuki1004/status/1782834027030036948/photo/1" },
      
      // C (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "c", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "c", reference: "https://x.com/sawaratsuki1004/status/1782806908417757221/photo/1" },

      // C++ (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "c++", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "c++", reference: "https://x.com/sawaratsuki1004/status/1782811399414231147/photo/1" },

      // fortran (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "fortran", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "fortran", reference: "https://x.com/sawaratsuki1004/status/1783072775164584140/photo/1" },

      // flipper zero (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "flipperzero", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "flipperzero", reference: "https://x.com/sawaratsuki1004/status/1783080853993931187/photo/1" },

      // ubuntu (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "ubuntu", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "ubuntu", reference: "https://x.com/sawaratsuki1004/status/1783093985181040703/photo/1" },

      // iamdesigner!
      { type: "add entry createdAt", entryKey: "iamdesigner!", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "iamdesigner!", reference: "https://x.com/sawaratsuki1004/status/1783161741658185814/photo/1" },
      { type: "add entry reference", entryKey: "iamdesigner!", reference: "https://x.com/sawaratsuki1004/status/1793650309212082675/photo/1" },

      // iamdesigner!english
      { type: "add entry createdAt", entryKey: "iamdesigner!english", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "iamdesigner!english", reference: "https://x.com/sawaratsuki1004/status/1783168365546307742/photo/1" },
      { type: "add entry reference", entryKey: "iamdesigner!english", reference: "https://x.com/sawaratsuki1004/status/1793650309212082675/photo/1" },

      // sifonchan (missing src) (vtuber logo)
      { type: "add entry createdAt", entryKey: "sifonchan", createdAt: "Apr 25, 2024" },
      { type: "add entry reference", entryKey: "sifonchan", reference: "https://x.com/sawaratsuki1004/status/1783179535955210275/photo/1" },

      // twitter (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "twitter", createdAt: "Apr 25, 2024" },
      { type: "add entry reference", entryKey: "twitter", reference: "https://x.com/sawaratsuki1004/status/1783188299114504431/photo/1" },

      // typescript
      { type: "add entry createdAt", entryKey: "typescript", createdAt: "Apr 25, 2024" },
      { type: "add entry reference", entryKey: "typescript", reference: "https://x.com/sawaratsuki1004/status/1783205765920219203/photo/1" },
      { type: "add entry reference", entryKey: "typescript", reference: "https://x.com/sawaratsuki1004/status/1789179857441796116/photo/1" },
      { type: "add entry reference", entryKey: "typescript", reference: "https://x.com/sawaratsuki1004/status/1797489619845730345/photo/1" },

      // issues-has-exceeded-300
      { type: "add entry createdAt", entryKey: "issues-has-exceeded-300", createdAt: "Apr 25, 2024" },
      { type: "add entry reference", entryKey: "issues-has-exceeded-300", reference: "https://x.com/sawaratsuki1004/status/1783519169042149585/photo/1" },

      // 404-notfound
      { type: "add entry createdAt", entryKey: "404-notfound", createdAt: "Apr 26, 2024" },
      { type: "add entry reference", entryKey: "404-notfound", reference: "https://x.com/sawaratsuki1004/status/1783559394485235982/photo/1" },
      { type: "add entry reference", entryKey: "404-notfound", reference: "https://kiritanpo-kaede.booth.pm/items/5683557" },
      { type: "add entry reference", entryKey: "404-notfound", reference: "https://x.com/sawaratsuki1004/status/1783563923301757326/photo/1" },
      { type: "add entry reference", entryKey: "404-notfound", reference: "https://x.com/sawaratsuki1004/status/1788545426452623822/photo/1" },

      // ms-dos (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "ms-dos", createdAt: "Apr 26, 2024" },
      { type: "add entry reference", entryKey: "ms-dos", reference: "https://x.com/sawaratsuki1004/status/1783876990640259250/photo/1" },
      { type: "add entry reference", entryKey: "ms-dos", reference: "https://x.com/sawaratsuki1004/status/1783904995567669262/photo/1" },

      // discord (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "discord", createdAt: "Apr 27, 2024" },
      { type: "add entry reference", entryKey: "discord", reference: "https://x.com/sawaratsuki1004/status/1783977314356961281/photo/1" },

      // vscode (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "visualstudiocode", createdAt: "Apr 27, 2024" },
      { type: "add entry reference", entryKey: "visualstudiocode", reference: "https://x.com/sawaratsuki1004/status/1784219617839456403/photo/1" },
      { type: "add entry reference", entryKey: "visualstudiocode", reference: "https://x.com/sawaratsuki1004/status/1784219840682807546/photo/1" },

      // kernel-panic (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "kernel-panic", createdAt: "Apr 28, 2024" },
      { type: "add entry reference", entryKey: "kernel-panic", reference: "https://x.com/sawaratsuki1004/status/1784320582433288427/photo/1" },
      { type: "add entry reference", entryKey: "kernel-panic", reference: "https://x.com/sawaratsuki1004/status/1787470644667723869/photo/1" },

      // 403-forbidden
      { type: "add entry createdAt", entryKey: "403-forbidden", createdAt: "Apr 28, 2024" },
      { type: "add entry reference", entryKey: "403-forbidden", reference: "https://x.com/sawaratsuki1004/status/1784347386388828480/photo/1" },
      { type: "add entry reference", entryKey: "403-forbidden", reference: "https://x.com/sawaratsuki1004/status/1788545426452623822/photo/1" },

      // 503-serviceunavailable
      { type: "add entry createdAt", entryKey: "503-serviceunavailable", createdAt: "Apr 28, 2024" },
      { type: "add entry reference", entryKey: "503-serviceunavailable", reference: "https://x.com/sawaratsuki1004/status/1784531398046712275/photo/1" },
      { type: "add entry reference", entryKey: "503-serviceunavailable", reference: "https://x.com/sawaratsuki1004/status/1788545426452623822/photo/1" },

      // julia (missing src)
      { type: "add entry createdAt", entryKey: "julia", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "julia", reference: "https://x.com/sawaratsuki1004/status/1784733145893585142/photo/1" },

      // 418-i-m-a-teapot
      { type: "add entry createdAt", entryKey: "418-i-m-a-teapot", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "418-i-m-a-teapot", reference: "https://x.com/sawaratsuki1004/status/1784749289937482140/photo/1" },
      { type: "add entry reference", entryKey: "418-i-m-a-teapot", reference: "https://x.com/sawaratsuki1004/status/1788545426452623822/photo/1" },

      // css (missing src) (css完全に理解した) (found in archive)
      { type: "add entry createdAt", entryKey: "css完全に理解した", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "css完全に理解した", reference: "https://x.com/sawaratsuki1004/status/1784907689681994149/photo/1" },

      // visual studio (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "visualstudio", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "visualstudio", reference: "https://x.com/sawaratsuki1004/status/1784918522315063559/photo/1" },

      // lisp (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "lisp", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "lisp", reference: "https://x.com/sawaratsuki1004/status/1784931651757428956/photo/1" },

      // vercel ai sdk (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "vercelaisdk", createdAt: "Apr 30, 2024" },
      { type: "add entry reference", entryKey: "vercelaisdk", reference: "https://x.com/sawaratsuki1004/status/1784997006471258269/photo/1" },

      // hack club (missing src)
      { type: "add entry createdAt", entryKey: "hackclub", createdAt: "Apr 30, 2024" },
      { type: "add entry reference", entryKey: "hackclub", reference: "https://x.com/sawaratsuki1004/status/1785037731019829704/photo/1" },

      // bluesky
      { type: "add entry createdAt", entryKey: "bluesky", createdAt: "Apr 30, 2024" },
      { type: "add entry reference", entryKey: "bluesky", reference: "https://x.com/sawaratsuki1004/status/1785051291330424995/photo/1" },
      { type: "add entry reference", entryKey: "bluesky", reference: "https://x.com/sawaratsuki1004/status/1785381352373973325/photo/1" },
      { type: "add entry reference", entryKey: "bluesky", reference: "https://x.com/sawaratsuki1004/status/1791012826745856030/photo/1" },
      { type: "add entry reference", entryKey: "bluesky", reference: "https://x.com/sawaratsuki1004/status/1793662443262242864/photo/1" },
      { type: "add entry reference", entryKey: "bluesky", reference: "https://x.com/sawaratsuki1004/status/1847056527481516540/photo/1" },

      // java.lang.NullPointerException (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "nullpointerexception", createdAt: "Apr 30, 2024" },
      { type: "add entry reference", entryKey: "nullpointerexception", reference: "https://x.com/sawaratsuki1004/status/1785092272885059887/photo/1" },
      { type: "add entry reference", entryKey: "nullpointerexception", reference: "https://x.com/sawaratsuki1004/status/1797487989427511335/photo/1" },

      // rhinelab (missing src) (found in archive)
      { type: "add entry createdAt", entryKey: "rhinelab", createdAt: "Apr 30, 2024" },
      { type: "add entry reference", entryKey: "rhinelab", reference: "https://x.com/sawaratsuki1004/status/1785094827480350767/photo/1" },

      // from "https://x.com/sawaratsuki1004/status/1782831616794227005" (earlier post with many logos, so override individual post above)
      { type: "add entry createdAt", entryKey: "angular", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "astro", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "clion", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "cloudflare", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "cobol", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "crowdstrike", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "flutter", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "htmx", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "java", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "juniper", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "kotlin", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "laravel", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "mui", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "nodejs", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "react", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "rhinelab", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "rider", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "rstudio", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "rust", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "swift", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "tailwind-css", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "gnuemacs", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "unityblender", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "vim", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "vite", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "vrchat", createdAt: "Apr 21, 2024" },
      { type: "add entry createdAt", entryKey: "vue", createdAt: "Apr 21, 2024" },

      // usages
      { type: "add entry reference", entryKey: "react", reference: "https://react.dev/?uwu=true" },
      { type: "add entry reference", entryKey: "bsky", reference: "https://bsky.app/?kawaii=true" },

      
      // scratch (missing src)
      { type: "add entry createdAt", entryKey: "scratch", createdAt: "May 1, 2024" },
      { type: "add entry reference", entryKey: "scratch", reference: "https://x.com/sawaratsuki1004/status/1785367442904240627/photo/1" },


      // react
      { type: "add entry reference", entryKey: "react", reference: "https://x.com/sawaratsuki1004/status/1785303283709751766/photo/1" },
      { type: "add entry reference", entryKey: "react", reference: "https://x.com/sawaratsuki1004/status/1786076762713276454/photo/1" },
      { type: "add entry reference", entryKey: "react", reference: "https://x.com/sawaratsuki1004/status/1788871451489206318/photo/1" },

      // php (missing src)
      { type: "add entry createdAt", entryKey: "php", createdAt: "May 1, 2024" },
      { type: "add entry reference", entryKey: "php", reference: "https://x.com/sawaratsuki1004/status/1785704012597059871/photo/1" },

      // asahi linux (missing src)
      { type: "add entry createdAt", entryKey: "asahi-linux", createdAt: "May 2, 2024" },
      { type: "add entry reference", entryKey: "asahi-linux", reference: "https://x.com/sawaratsuki1004/status/1786042061046849939/photo/1" },
      { type: "add entry reference", entryKey: "asahi-linux", reference: "https://x.com/sawaratsuki1004/status/1786053856989942135/photo/1" },

      // kawaii=true (missing src)
      { type: "add entry createdAt", entryKey: "kawaii-true", createdAt: "May 3, 2024" },
      { type: "add entry reference", entryKey: "kawaii-true", reference: "https://x.com/sawaratsuki1004/status/1786191353732538605/photo/1" },

      // uwu=true (missing src)
      { type: "add entry createdAt", entryKey: "uwu-true", createdAt: "May 3, 2024" },
      { type: "add entry reference", entryKey: "uwu-true", reference: "https://x.com/sawaratsuki1004/status/1786200580312170541/photo/1" },

      // misskey
      { type: "add entry createdAt", entryKey: "misskey", createdAt: "May 4, 2024" },
      { type: "add entry reference", entryKey: "misskey", reference: "https://x.com/sawaratsuki1004/status/1786565459099390107/photo/1" },
      { type: "add entry reference", entryKey: "misskey", reference: "https://x.com/sawaratsuki1004/status/1786567776955715838/photo/1" },
      { type: "add entry reference", entryKey: "misskey", reference: "https://x.com/sawaratsuki1004/status/1786648263971746044/photo/1" },
      { type: "add entry reference", entryKey: "misskey", reference: "https://x.com/sawaratsuki1004/status/1787493867346145424/photo/1" },
      { type: "add entry reference", entryKey: "misskey", reference: "https://x.com/sawaratsuki1004/status/1793663642807980534/photo/1" },

      // async await very difficult (missing src)
      { type: "add entry createdAt", entryKey: "async-await-very-difficult", createdAt: "May 5, 2024" },
      { type: "add entry reference", entryKey: "async-await-very-difficult", reference: "https://x.com/sawaratsuki1004/status/1787002633737347108/photo/1" },
      { type: "add entry reference", entryKey: "async-await-very-difficult", reference: "https://x.com/sawaratsuki1004/status/1841410753385181255/photo/1" },

      // starship (missing src)
      { type: "add entry createdAt", entryKey: "starship", createdAt: "May 6, 2024" },
      { type: "add entry reference", entryKey: "starship", reference: "https://x.com/sawaratsuki1004/status/1787449292250341857/photo/1" },

      // webstorm (missing src)
      { type: "add entry createdAt", entryKey: "webstorm", createdAt: "May 8, 2024" },
      { type: "add entry reference", entryKey: "webstorm", reference: "https://x.com/sawaratsuki1004/status/1788156742511317259/photo/1" },

      // Laravel Herd (missing src)
      { type: "add entry createdAt", entryKey: "laravel-herd", createdAt: "May 9, 2024" },
      { type: "add entry reference", entryKey: "laravel-herd", reference: "https://x.com/sawaratsuki1004/status/1788522748886827465/photo/1" },

      // Novel AI (missing src)
      { type: "add entry createdAt", entryKey: "novel-ai", createdAt: "May 10, 2024" },
      { type: "add entry reference", entryKey: "novel-ai", reference: "https://x.com/sawaratsuki1004/status/1788857837424447709/photo/1" },

      // 500-internalservererror
      { type: "add entry createdAt", entryKey: "500-internalservererror", createdAt: "May 10, 2024" },
      { type: "add entry reference", entryKey: "500-internalservererror", reference: "https://x.com/sawaratsuki1004/status/1788870375025336350/photo/1" },

      // can you make a cute soue, kaku pop-up logo? (missing src)
      { type: "add entry createdAt", entryKey: "can-you-make-a-cute-soue-kaku-pop-up-logo", createdAt: "May 11, 2024" },
      { type: "add entry reference", entryKey: "can-you-make-a-cute-soue-kaku-pop-up-logo", reference: "https://x.com/sawaratsuki1004/status/1789301035636506849/photo/1" },

      // iamprogrammer!
      { type: "add entry reference", entryKey: "iamaprogrammer!", reference: "https://x.com/sawaratsuki1004/status/1790009120554135859/photo/1" },

      // iamprogrammerenglish
      { type: "add entry reference", entryKey: "iamaprogrammerenglish", reference: "https://x.com/sawaratsuki1004/status/1790009120554135859/photo/1" },

      // atprotocol
      { type: "add entry createdAt", entryKey: "atprotocol", createdAt: "May 14, 2024" },
      { type: "add entry reference", entryKey: "atprotocol", reference: "https://x.com/sawaratsuki1004/status/1790320231640080702/photo/1" },

      // node.js
      { type: "add entry createdAt", entryKey: "node.js", createdAt: "May 14, 2024" },
      { type: "add entry reference", entryKey: "node.js", reference: "https://x.com/sawaratsuki1004/status/1790322668895641975/photo/1" },

      // react-compiler (missing src)
      { type: "add entry createdAt", entryKey: "react-compiler", createdAt: "May 16, 2024" },
      { type: "add entry reference", entryKey: "react-compiler", reference: "https://x.com/sawaratsuki1004/status/1791012826745856030/photo/1" },

      // ゆっくりmoviemaker4
      { type: "add entry createdAt", entryKey: "ゆっくりmoviemaker4", createdAt: "May 16, 2024" },
      { type: "add entry reference", entryKey: "ゆっくりmoviemaker4", reference: "https://x.com/sawaratsuki1004/status/1791032733181034697/photo/1" },
      { type: "add entry reference", entryKey: "ゆっくりmoviemaker4", reference: "https://x.com/sawaratsuki1004/status/1791034985874333932/photo/1" },
      { type: "add entry reference", entryKey: "ゆっくりmoviemaker4", reference: "https://x.com/sawaratsuki1004/status/1791468815550914836/photo/1" },
      { type: "add entry reference", entryKey: "ゆっくりmoviemaker4", reference: "https://x.com/sawaratsuki1004/status/1820896731149824504/photo/1" },
      { type: "add entry reference", entryKey: "ゆっくりmoviemaker4", reference: "https://x.com/sawaratsuki1004/status/1845811834840121440/photo/1" },

      // intellij-idea
      { type: "add entry createdAt", entryKey: "intellij-idea", createdAt: "May 18, 2024" },
      { type: "add entry reference", entryKey: "intellij-idea", reference: "https://x.com/sawaratsuki1004/status/1791763851828146629/photo/1" },

      // tailwind-css
      { type: "add entry reference", entryKey: "tailwind-css", reference: "https://x.com/sawaratsuki1004/status/1792148262574776564/photo/1" },

      // replit
      { type: "add entry createdAt", entryKey: "replit", createdAt: "May 24, 2024" },
      { type: "add entry reference", entryKey: "replit", reference: "https://x.com/sawaratsuki1004/status/1794013497673842762/photo/1" },

      // misskey.io
      { type: "add entry createdAt", entryKey: "misskey.io", createdAt: "May 26, 2024" },
      { type: "add entry reference", entryKey: "misskey.io", reference: "https://x.com/sawaratsuki1004/status/1794510447254609934/photo/1" },
      { type: "add entry reference", entryKey: "misskey.io", reference: "https://x.com/sawaratsuki1004/status/1794512798333948334/photo/1" },

      // unchi (missing src)
      { type: "add entry createdAt", entryKey: "unchi", createdAt: "May 31, 2024" },
      { type: "add entry reference", entryKey: "unchi", reference: "https://x.com/sawaratsuki1004/status/1796497425504575786/photo/1" },

      // winrar (missing src)
      { type: "add entry createdAt", entryKey: "winrar", createdAt: "Jun 2, 2024" },
      { type: "add entry reference", entryKey: "winrar", reference: "https://x.com/sawaratsuki1004/status/1797150726441009396/photo/1" },

      // ippon sakura (missing src)
      { type: "add entry createdAt", entryKey: "ippon-sakura", createdAt: "Jun 21, 2024" },
      { type: "add entry reference", entryKey: "ippon-sakura", reference: "https://x.com/sawaratsuki1004/status/1804165481215201286/photo/1" },
      { type: "add entry reference", entryKey: "ippon-sakura", reference: "https://x.com/sawaratsuki1004/status/1804168246368833774/photo/1" },

      // meilisearch (missing src)
      { type: "add entry createdAt", entryKey: "meilisearch", createdAt: "Jul 8, 2024" },
      { type: "add entry reference", entryKey: "meilisearch", reference: "https://x.com/sawaratsuki1004/status/1810156342600245371/photo/1" },

      // charcoal
      { type: "add entry createdAt", entryKey: "charcoal", createdAt: "Nov 8, 2024" },
      { type: "add entry reference", entryKey: "charcoal", reference: "https://x.com/sawaratsuki1004/status/1854833835458150815/photo/1" },


      // rust
      { type: "add entry reference", entryKey: "rust", reference: "https://x.com/sawaratsuki1004/status/1862452944471543884/photo/1" },

      // tax return have been filed (missing src)
      { type: "add entry createdAt", entryKey: "tax-return-have-been-filed", createdAt: "Mar 15, 2025" },
      { type: "add entry reference", entryKey: "tax-return-have-been-filed", reference: "https://x.com/sawaratsuki1004/status/1900764944716755221/photo/1" },

      // express
      { type: "add entry createdAt", entryKey: "express", createdAt: "Apr 16, 2025" },
      { type: "add entry reference", entryKey: "express", reference: "https://x.com/sawaratsuki1004/status/1912361284324012397/photo/1" },

      // mutsura horun (missing src)
      { type: "add entry createdAt", entryKey: "mutsura-horun", createdAt: "Sep 17, 2025" },
      { type: "add entry reference", entryKey: "mutsura-horun", reference: "https://x.com/sawaratsuki1004/status/1968326684199047479/photo/1" },

      // tax return have been filed 2026 (missing src)
      { type: "add entry createdAt", entryKey: "確定申告", createdAt: "Mar 11, 2026" },
      { type: "add entry reference", entryKey: "確定申告", reference: "https://x.com/sawaratsuki1004/status/2031754694801097213/photo/1" },

      // kawaii logos
      { type: "add entry createdAt", entryKey: "kawaii-logos", createdAt: "May 3, 2026" },
      { type: "add entry reference", entryKey: "kawaii-logos", reference: "https://x.com/sawaratsuki1004/status/2050783363380953558/photo/1" },

      // engineering ethics
      { type: "add entry createdAt", entryKey: "技術者倫理", createdAt: "May 6, 2026" },
      { type: "add entry reference", entryKey: "技術者倫理", reference: "https://x.com/sawaratsuki1004/status/2052031919177769212/photo/1" },

    ]
  },
  references: [
    "https://x.com/sawaratsuki1004/status/1781866355295387846/photo/1", // Apr 21, 2024
    "https://x.com/sawaratsuki1004/status/1781940357892333725/photo/1", // Apr 21, 2024
    "https://x.com/sawaratsuki1004/status/1781983910710423992/photo/1", // Apr 21, 2024
    "https://x.com/sawaratsuki1004/status/1782049593385206156/photo/1", // Apr 21, 2024
    "https://x.com/sawaratsuki1004/status/1782831616794227005/photo/1", // Apr 24, 2024
    "https://x.com/sawaratsuki1004/status/1788545426452623822/photo/1", // May 9, 2024
    "https://x.com/sawaratsuki1004/status/1837721059266908392/photo/1", // Sep 22, 2024
  ],
  fundings: [
    { type: "skeb", url: "https://skeb.jp/@sawaratsuki" }
  ],
  entries: {
    "akari-bot": {
      label: "Akari Bot",
      license: {
        type: "All Rights Reserved",
        // reference: "https://github.com/Teahouse-Studios/akari-bot/blob/master/assets/LICENSE"
        reference: "https://lp.skeb.jp/creator?locale=en#:~:text=Creators%20have%20the%20right%20to%20freely%20post,work%20of%20each%20creation"
      },
      images: [
        { src: "https://github.com/Teahouse-Studios/akari-bot/blob/master/assets/akaribot_logo.png" }
      ],
      references: [
        "https://github.com/Teahouse-Studios/akari-bot/blob/master/assets/akaribot_logo.png",
        "https://skeb.jp/@sawaratsuki/works/27",
      ]
    },
    "astral": {
      label: "Astral",
      license: {
        type: "All Rights Reserved",
        reference: "https://lp.skeb.jp/creator?locale=en#:~:text=Creators%20have%20the%20right%20to%20freely%20post,work%20of%20each%20creation"
        // reference: "https://github.com/lino-levan/astral/blob/main/LICENSE"
      },
      images: [
        { src: "https://github.com/lino-levan/astral/blob/main/docs/static/astral.png" }
      ],
      references: [
        "https://github.com/lino-levan/astral/blob/main/docs/static/astral.png",
        "https://skeb.jp/@sawaratsuki/works/21",
      ]
    },
    "hinoshiba": {
      label: "Hinoshiba",
      license: {
        type: "All Rights Reserved",
        reference: "https://lp.skeb.jp/creator?locale=en#:~:text=Creators%20have%20the%20right%20to%20freely%20post,work%20of%20each%20creation"
      },
      images: [
        { src: "https://github.com/hinoshiba/hinoshiba.github.io/blob/master/img/hinoshiba_kawaii.png" }
      ],
      references: [
        "https://github.com/hinoshiba/hinoshiba.github.io/blob/master/img/hinoshiba_kawaii.png",
        "https://skeb.jp/@sawaratsuki/works/10",
      ]
    }

  },
  // logVerbose: true
}

// No source file: (from skeb) 
// https://skeb.jp/@sawaratsuki/works/26
// https://skeb.jp/@sawaratsuki/works/25
// https://skeb.jp/@sawaratsuki/works/24
// https://skeb.jp/@sawaratsuki/works/20
// https://skeb.jp/@sawaratsuki/works/18
// https://skeb.jp/@sawaratsuki/works/16
// https://skeb.jp/@sawaratsuki/works/13
// https://skeb.jp/@sawaratsuki/works/12
// https://skeb.jp/@sawaratsuki/works/9
// https://skeb.jp/@sawaratsuki/works/8
// https://skeb.jp/@sawaratsuki/works/5
// https://skeb.jp/@sawaratsuki/works/4
// https://skeb.jp/@sawaratsuki/works/3
// https://skeb.jp/@sawaratsuki/works/2
// https://skeb.jp/@sawaratsuki/works/1

// HackMD from sawaratsuki's thread
// https://x.com/hackmdio/status/1782423518388408411/photo/1

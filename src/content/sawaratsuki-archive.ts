import type { AuthorDefinition } from "../resolve-author"

export const sawaratsuki_archived: AuthorDefinition = {
  source: {
    omitSocials: true,
    from: "github",
    repo: "https://github.com/theinsidersandrush/ServiceLogos",
    transform: [
      { type: "filter", include: "Forbidden" },
      { type: "filter", include: "NotFound" },
      { type: "filter", include: "418I'mateapot" },
      { type: "filter", include: "ServiceUnavailable" },
      { type: "filter", include: "Angular" },
      { type: "filter", include: "Bluesky" },
      { type: "filter", include: "Cloudflare" },
      { type: "filter", include: "Figma" },
      { type: "filter", include: "Github" },
      { type: "filter", include: "Golang" },
      { type: "filter", include: "Haskell" },
      { type: "filter", include: "Hono" },
      { type: "filter", include: "IamDesigner!" },
      { type: "filter", include: "IamDesigner!English" },
      { type: "filter", include: "IamProgrammer!" },
      { type: "filter", include: "IamProgrammerEnglish" },
      { type: "filter", include: "Kotlin" },
      { type: "filter", include: "Next.js" },
      { type: "filter", include: "Node.js" },
      { type: "filter", include: "Laravel" },
      { type: "filter", include: "React" },
      { type: "filter", include: "Rust" },
      { type: "filter", include: "Tailwindcss" },
      { type: "filter", include: "TypeScript" },
    ],

    postProcess: [
      // TODO:
      // - add references

      // archlinux
      { type: "add entry createdAt", entryKey: "archlinux", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "archlinux", reference: "https://x.com/sawaratsuki1004/status/1782373444233118036/photo/1" },

      // c
      { type: "add entry createdAt", entryKey: "c", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "c", reference: "https://x.com/sawaratsuki1004/status/1782806908417757221/photo/1" },

      // c,c#,c++
      { type: "add entry createdAt", entryKey: "c,csharp,c++", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "c,csharp,c++", reference: "https://x.com/sawaratsuki1004/status/1782055072282906626/photo/1" },

      // c#
      { type: "add entry createdAt", entryKey: "csharp", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "csharp", reference: "https://x.com/sawaratsuki1004/status/1782802041435509088/photo/1" },
      { type: "add entry reference", entryKey: "csharp", reference: "https://x.com/sawaratsuki1004/status/1782834027030036948/photo/1" },

      // c++
      { type: "add entry createdAt", entryKey: "c++", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "c++", reference: "https://x.com/sawaratsuki1004/status/1782811399414231147/photo/1" },

      // clion
      { type: "add entry createdAt", entryKey: "clion", createdAt: "Apr 21, 2024" },

      // cobol
      { type: "add entry createdAt", entryKey: "cobol", createdAt: "Apr 21, 2024" },

      // crowdstrike
      { type: "add entry createdAt", entryKey: "crowdstrike", createdAt: "Apr 21, 2024" },

      // css完全に理解した
      { type: "add entry createdAt", entryKey: "css完全に理解した", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "css完全に理解した", reference: "https://x.com/sawaratsuki1004/status/1784907689681994149/photo/1" },

      // discord
      { type: "add entry createdAt", entryKey: "discord", createdAt: "Apr 27, 2024" },
      { type: "add entry reference", entryKey: "discord", reference: "https://x.com/sawaratsuki1004/status/1783977314356961281/photo/1" },

      // flipperzero
      { type: "add entry createdAt", entryKey: "flipperzero", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "flipperzero", reference: "https://x.com/sawaratsuki1004/status/1783080853993931187/photo/1" },

      // flutter
      { type: "add entry createdAt", entryKey: "flutter", createdAt: "Apr 21, 2024" },

      // fortran 
      { type: "add entry createdAt", entryKey: "fortran", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "fortran", reference: "https://x.com/sawaratsuki1004/status/1783072775164584140/photo/1" },

      // github
      { type: "add entry createdAt", entryKey: "github", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "github", reference: "https://x.com/sawaratsuki1004/status/1782069963895038298/photo/1" },
      { type: "add entry reference", entryKey: "github", reference: "https://x.com/sawaratsuki1004/status/1783514454950617255/photo/1" },

      // gitlab
      { type: "add entry createdAt", entryKey: "gitlab", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "gitlab", reference: "https://x.com/sawaratsuki1004/status/1782074596713447587/photo/1" },

      // gnuemacs
      { type: "add entry createdAt", entryKey: "gnuemacs", createdAt: "Apr 21, 2024" },

      // hackclub
      { type: "add entry createdAt", entryKey: "hackclub", createdAt: "Apr 30, 2024" },
      { type: "add entry reference", entryKey: "hackclub", reference: "https://x.com/sawaratsuki1004/status/1785037731019829704/photo/1" },

      // html
      { type: "add entry createdAt", entryKey: "html", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "html", reference: "https://x.com/sawaratsuki1004/status/1782363387562959057/photo/1" },

      // htmx
      { type: "add entry createdAt", entryKey: "htmx", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "htmx", reference: "https://x.com/sawaratsuki1004/status/1781862842041602499/photo/1" },
      { type: "add entry reference", entryKey: "htmx", reference: "https://x.com/htmx_org/status/1782449324112105883/photo/1" },
      { type: "add entry reference", entryKey: "htmx", reference: "https://x.com/sawaratsuki1004/status/1782449755957887235/photo/1" },

      // java
      { type: "add entry createdAt", entryKey: "java", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "java", reference: "https://x.com/sawaratsuki1004/status/1782074596713447587/photo/1" },

      // julia
      { type: "add entry createdAt", entryKey: "julia", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "julia", reference: "https://x.com/sawaratsuki1004/status/1784733145893585142/photo/1" },

      // juniper
      { type: "add entry createdAt", entryKey: "juniper", createdAt: "Apr 21, 2024" },

      // kernel-panic
      { type: "add entry createdAt", entryKey: "kernel-panic", createdAt: "Apr 28, 2024" },
      { type: "add entry reference", entryKey: "kernel-panic", reference: "https://x.com/sawaratsuki1004/status/1784320582433288427/photo/1" },
      { type: "add entry reference", entryKey: "kernel-panic", reference: "https://x.com/sawaratsuki1004/status/1787470644667723869/photo/1" },

      // lisp
      { type: "add entry createdAt", entryKey: "lisp", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "lisp", reference: "https://x.com/sawaratsuki1004/status/1784931651757428956/photo/1" },

      // ms-dos
      { type: "add entry createdAt", entryKey: "ms-dos", createdAt: "Apr 26, 2024" },
      { type: "add entry reference", entryKey: "ms-dos", reference: "https://x.com/sawaratsuki1004/status/1783876990640259250/photo/1" },
      { type: "add entry reference", entryKey: "ms-dos", reference: "https://x.com/sawaratsuki1004/status/1783904995567669262/photo/1" },

      // mui
      { type: "add entry createdAt", entryKey: "mui", createdAt: "Apr 21, 2024" },

      // nullpointerexception
      { type: "add entry createdAt", entryKey: "nullpointerexception", createdAt: "Apr 30, 2024" },
      { type: "add entry reference", entryKey: "nullpointerexception", reference: "https://x.com/sawaratsuki1004/status/1785092272885059887/photo/1" },
      { type: "add entry reference", entryKey: "nullpointerexception", reference: "https://x.com/sawaratsuki1004/status/1797487989427511335/photo/1" },

      // photoshop
      { type: "add entry createdAt", entryKey: "photoshop", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "photoshop", reference: "https://x.com/sawaratsuki1004/status/1782389745647263810/photo/1" },

      // python
      { type: "add entry createdAt", entryKey: "python", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "python", reference: "https://x.com/sawaratsuki1004/status/1782099482093764910/photo/1" },

      // qwik.js
      { type: "add entry createdAt", entryKey: "qwik.js", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "qwik.js", reference: "https://x.com/sawaratsuki1004/status/1782429660145746024/photo/1" },
      { type: "add entry reference", entryKey: "qwik.js", reference: "https://x.com/sawaratsuki1004/status/1787985882437566504/photo/1" },

      // raspberrypi
      { type: "add entry createdAt", entryKey: "raspberrypi", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "raspberrypi", reference: "https://x.com/sawaratsuki1004/status/1782421099797680548/photo/1" },

      // rhinelab
      { type: "add entry createdAt", entryKey: "rhinelab", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "rhinelab", reference: "https://x.com/sawaratsuki1004/status/1785094827480350767/photo/1" },

      // rider
      { type: "add entry createdAt", entryKey: "rider", createdAt: "Apr 21, 2024" },

      // rstudio
      { type: "add entry createdAt", entryKey: "rstudio", createdAt: "Apr 21, 2024" },

      // ruby
      { type: "add entry createdAt", entryKey: "ruby", createdAt: "Apr 24, 2024" },

      // streamloots
      { type: "add entry createdAt", entryKey: "streamloots", createdAt: "Apr 23, 2024" },
      { type: "add entry reference", entryKey: "streamloots", reference: "https://x.com/sawaratsuki1004/status/1782471337736536070/photo/1" },

      // swift
      { type: "add entry createdAt", entryKey: "swift", createdAt: "Apr 21, 2024" },
      { type: "add entry reference", entryKey: "swift", reference: "https://x.com/sawaratsuki1004/status/1782120134569759198/photo/1" },

      // teamspeak
      { type: "add entry createdAt", entryKey: "teamspeak", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "teamspeak", reference: "https://x.com/sawaratsuki1004/status/1782106483787993497/photo/1" },

      // twitter
      { type: "add entry createdAt", entryKey: "twitter", createdAt: "Apr 25, 2024" },
      { type: "add entry reference", entryKey: "twitter", reference: "https://x.com/sawaratsuki1004/status/1783188299114504431/photo/1" },

      // ubuntu
      { type: "add entry createdAt", entryKey: "ubuntu", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "ubuntu", reference: "https://x.com/sawaratsuki1004/status/1783093985181040703/photo/1" },

      // unityblender
      { type: "add entry createdAt", entryKey: "unityblender", createdAt: "Apr 21, 2024" },

      // vercelaisdk
      { type: "add entry createdAt", entryKey: "vercelaisdk", createdAt: "Apr 30, 2024" },
      { type: "add entry reference", entryKey: "vercelaisdk", reference: "https://x.com/sawaratsuki1004/status/1784997006471258269/photo/1" },

      // vim
      { type: "add entry createdAt", entryKey: "vim", createdAt: "Apr 21, 2024" },

      // visualstudio
      { type: "add entry createdAt", entryKey: "visualstudio", createdAt: "Apr 29, 2024" },
      { type: "add entry reference", entryKey: "visualstudio", reference: "https://x.com/sawaratsuki1004/status/1784918522315063559/photo/1" },

      // visualstudiocode
      { type: "add entry createdAt", entryKey: "visualstudiocode", createdAt: "Apr 27, 2024" },
      { type: "add entry reference", entryKey: "visualstudiocode", reference: "https://x.com/sawaratsuki1004/status/1784219617839456403/photo/1" },
      { type: "add entry reference", entryKey: "visualstudiocode", reference: "https://x.com/sawaratsuki1004/status/1784219840682807546/photo/1" },

      // vite
      { type: "add entry createdAt", entryKey: "vite", createdAt: "Apr 21, 2024" },

      // voicemod
      { type: "add entry createdAt", entryKey: "voicemod", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "voicemod", reference: "https://x.com/sawaratsuki1004/status/1782118029431894252/photo/1" },
      { type: "add entry reference", entryKey: "voicemod", reference: "https://x.com/sawaratsuki1004/status/1788210818255102449/photo/1" },
      { type: "add entry reference", entryKey: "voicemod", reference: "https://x.com/sawaratsuki1004/status/1863950676818383026/photo/1" },

      // vrchat
      { type: "add entry createdAt", entryKey: "vrchat", createdAt: "Apr 21, 2024" },

      // vue
      { type: "add entry createdAt", entryKey: "vue", createdAt: "Apr 21, 2024" },

      // wallhack
      { type: "add entry createdAt", entryKey: "wallhack", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "wallhack", reference: "https://x.com/sawaratsuki1004/status/1782341113480909072/photo/1" },

      // x
      { type: "add entry createdAt", entryKey: "x", createdAt: "Apr 24, 2024" },
      { type: "add entry createdAt", entryKey: "x", createdAt: "Apr 22, 2024" },
      { type: "add entry reference", entryKey: "x", reference: "https://x.com/sawaratsuki1004/status/1782404460716900527/photo/1" },



    ],
    licenseFallback: {
      type: "All Rights Reserved",
    },

    // logTransformPaths: true
  },
  // logVerbose: true,
}

// TODO:
// - check createdAt date from commit history
//    - nvm the history are all erased.
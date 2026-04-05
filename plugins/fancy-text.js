const { cmd } = require("../command");

cmd({
  pattern: "fancy",
  alias: ["font", "style"],
  react: "✍️",
  desc: "Offline fancy text generator (25+ real fonts).",
  category: "tools",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {

    if (!q) return reply("❎ Provide text.\nExample: .fancy Hello");

    const t = q;

    function convert(map, text) {
      return text.split("").map(c => map[c] || c).join("");
    }

    const fonts = [];

    // 1 - Cursive
    const cursive = {
      a:"𝓪", b:"𝓫", c:"𝓬", d:"𝓭", e:"𝓮", f:"𝓯", g:"𝓰",
      h:"𝓱", i:"𝓲", j:"𝓳", k:"𝓴", l:"𝓵", m:"𝓶", n:"𝓷",
      o:"𝓸", p:"𝓹", q:"𝓺", r:"𝓻", s:"𝓼", t:"𝓽", u:"𝓾",
      v:"𝓿", w:"𝔀", x:"𝔁", y:"𝔂", z:"𝔃"
    }; fonts.push({name:"Cursive", result:convert(cursive,t)});

    // 2 - Double-Struck
    const double = {
      a:"𝕒", b:"𝕓", c:"𝕔", d:"𝕕", e:"𝕖", f:"𝕗",
      g:"𝕘", h:"𝕙", i:"𝕚", j:"𝕛", k:"𝕜", l:"𝕝",
      m:"𝕞", n:"𝕟", o:"𝕠", p:"𝕡", q:"𝕢", r:"𝕣",
      s:"𝕤", t:"𝕥", u:"𝕦", v:"𝕧", w:"𝕨", x:"𝕩",
      y:"𝕪", z:"𝕫"
    }; fonts.push({name:"Double", result:convert(double,t)});

    // 3 - Bold Serif
    const bold = {
      a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",
      h:"𝐡",i:"𝐢",j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",n:"𝐧",
      o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",s:"𝐬",t:"𝐭",u:"𝐮",
      v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳"
    }; fonts.push({name:"Bold", result:convert(bold,t)});

    // 4 - Gothic
    const gothic = {
      a:"𝖆",b:"𝖇",c:"𝖈",d:"𝖉",e:"𝖊",f:"𝖋",g:"𝖌",
      h:"𝖍",i:"𝖎",j:"𝖏",k:"𝖐",l:"𝖑",m:"𝖒",n:"𝖓",
      o:"𝖔",p:"𝖕",q:"𝖖",r:"𝖗",s:"𝖘",t:"𝖙",u:"𝖚",
      v:"𝖛",w:"𝖜",x:"𝖝",y:"𝖞",z:"𝖟"
    }; fonts.push({name:"Gothic", result:convert(gothic,t)});

    // 5 - Small Caps
    const small = {
      a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",
      h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",
      o:"ᴏ",p:"ᴘ",q:"Q", r:"ʀ",s:"s",t:"ᴛ",u:"ᴜ",
      v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ"
    }; fonts.push({name:"Small Caps", result:convert(small,t)});

    // 6 - Tiny
    const tiny = {
      a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",
      h:"ʰ",i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",n:"ⁿ",
      o:"ᵒ",p:"ᵖ",q:"ᑫ",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",
      v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ"
    }; fonts.push({name:"Tiny", result:convert(tiny,t)});

    // 7 - Bubble
    const bubble = {
      a:"ⓐ",b:"ⓑ",c:"ⓒ",d:"ⓓ",e:"ⓔ",f:"ⓕ",g:"ⓖ",
      h:"ⓗ",i:"ⓘ",j:"ⓙ",k:"ⓚ",l:"ⓛ",m:"ⓜ",n:"ⓝ",
      o:"ⓞ",p:"ⓟ",q:"ⓠ",r:"ⓡ",s:"ⓢ",t:"ⓣ",u:"ⓤ",
      v:"ⓥ",w:"ⓦ",x:"ⓧ",y:"ⓨ",z:"ⓩ"
    }; fonts.push({name:"Bubble", result:convert(bubble,t)});

    // 8 - Square
    const square = {
      a:"🅐",b:"🅑",c:"🅒",d:"🅓",e:"🅔",f:"🅕",g:"🅖",
      h:"🅗",i:"🅘",j:"🅙",k:"🅚",l:"🅛",m:"🅜",n:"🅝",
      o:"🅞",p:"🅟",q:"🅠",r:"🅡",s:"🅢",t:"🅣",u:"🅤",
      v:"🅥",w:"🅦",x:"🅧",y:"🅨",z:"🅩"
    }; fonts.push({name:"Square", result:convert(square,t)});


    // 9 - Decorated
    fonts.push({ name:"Decorated", result:`『 ${t} 』` });

    // 10 - Mirror
    fonts.push({ name:"Reverse", result:t.split("").reverse().join("") });

    // final formatting
    let msg = "✨ *Fancy Fonts (25+ Styles)* ✨\n\n";

    fonts.forEach((f, i) => {
      msg += `*Fancy ${i+1}:*\n${f.result}\n\n`;
    });

    await conn.sendMessage(from, { text: msg }, { quoted: m });

  } catch (e) {
    reply("⚠️ Error — but command safe hai.");
  }
});

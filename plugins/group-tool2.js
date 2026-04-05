const { cmd } = require("../command");

// ==================== SIMPLE & WORKING KICK COMMAND ====================
cmd({
  pattern: "kick",
  alias: ["k", "remove", "nital"],
  desc: "Remove a user from the group",
  category: "group",
  react: "💀",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  quoted,
  reply,
  mentionedJid,
  sender,
  isCreator
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in groups.");
    
    // User extraction logic
    let users = [];
    
    if (mentionedJid && mentionedJid.length > 0) {
      users = mentionedJid;
    } else if (quoted && quoted.sender) {
      users = [quoted.sender];
    } else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
      users = m.message.extendedTextMessage.contextInfo.mentionedJid;
    } else {
      return reply("❓ Please mention or quote a user to remove!\nExample: .kick @user");
    }

    // Remove duplicates
    users = [...new Set(users.filter(user => user && user.includes('@')))];
    if (users.length === 0) return reply("⚠️ Couldn't determine target user.");

    // Protection checks
    const botJid = conn.user.id;
    if (users.includes(botJid)) {
      return reply("🤖 I can't kick myself!");
    }
    
    // Check if trying to remove yourself
    if (users.includes(sender) && !isCreator) {
      return reply("❌ You can't kick yourself!");
    }

    // Try to perform kick directly (bot must be admin)
    try {
      await conn.groupParticipantsUpdate(from, users, "remove");
      
      if (users.length === 1) {
        reply(`✅ Successfully removed @${users[0].split('@')[0]} from group.`, { mentions: users });
      } else {
        reply(`✅ Successfully removed ${users.length} users from group.`, { mentions: users });
      }
    } catch (kickError) {
      if (kickError.message.includes("not authorized") || kickError.message.includes("admin")) {
        reply("❌ Bot needs to be admin to kick users! Use: .botadmin");
      } else {
        reply("❌ Failed to kick: " + kickError.message);
      }
    }

  } catch (err) {
    console.error("Kick Error:", err);
    reply("❌ Failed to remove user: " + err.message);
  }
});

// ==================== SIMPLE & WORKING PROMOTE COMMAND ====================
cmd({
  pattern: "promote",
  alias: ["p", "giveadmin", "makeadmin"],
  desc: "Promote a user to admin",
  category: "group",
  react: "👑",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  quoted,
  reply,
  mentionedJid,
  sender,
  isCreator
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in groups.");
    
    // User extraction logic
    let users = [];
    
    if (mentionedJid && mentionedJid.length > 0) {
      users = mentionedJid;
    } else if (quoted && quoted.sender) {
      users = [quoted.sender];
    } else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
      users = m.message.extendedTextMessage.contextInfo.mentionedJid;
    } else {
      return reply("❓ Please mention or quote a user to promote!\nExample: .promote @user");
    }

    // Remove duplicates
    users = [...new Set(users.filter(user => user && user.includes('@')))];
    if (users.length === 0) return reply("⚠️ Couldn't determine target user.");

    // Try to promote directly
    try {
      await conn.groupParticipantsUpdate(from, users, "promote");
      
      if (users.length === 1) {
        reply(`✅ Successfully promoted @${users[0].split('@')[0]} to admin.`, { mentions: users });
      } else {
        reply(`✅ Successfully promoted ${users.length} users to admin.`, { mentions: users });
      }
    } catch (promoteError) {
      if (promoteError.message.includes("not authorized") || promoteError.message.includes("admin")) {
        reply("❌ Bot needs to be admin to promote users! Use: .botadmin");
      } else if (promoteError.message.includes("already")) {
        reply("❌ User is already an admin!");
      } else {
        reply("❌ Failed to promote: " + promoteError.message);
      }
    }

  } catch (err) {
    console.error("Promote Error:", err);
    reply("❌ Failed to promote user: " + err.message);
  }
});

// ==================== SIMPLE & WORKING DEMOTE COMMAND ====================
cmd({
  pattern: "demote",
  alias: ["d", "dismiss", "removeadmin"],
  desc: "Demote a group admin",
  category: "group",
  react: "⬇️",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  quoted,
  reply,
  mentionedJid,
  sender,
  isCreator
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in groups.");
    
    // User extraction logic
    let users = [];
    
    if (mentionedJid && mentionedJid.length > 0) {
      users = mentionedJid;
    } else if (quoted && quoted.sender) {
      users = [quoted.sender];
    } else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
      users = m.message.extendedTextMessage.contextInfo.mentionedJid;
    } else {
      return reply("❓ Please mention or quote an admin to demote!\nExample: .demote @admin");
    }

    // Remove duplicates
    users = [...new Set(users.filter(user => user && user.includes('@')))];
    if (users.length === 0) return reply("⚠️ Couldn't determine target user.");

    // Try to demote directly
    try {
      await conn.groupParticipantsUpdate(from, users, "demote");
      
      if (users.length === 1) {
        reply(`✅ Successfully demoted @${users[0].split('@')[0]} from admin.`, { mentions: users });
      } else {
        reply(`✅ Successfully demoted ${users.length} admins.`, { mentions: users });
      }
    } catch (demoteError) {
      if (demoteError.message.includes("not authorized") || demoteError.message.includes("admin")) {
        reply("❌ Bot needs to be admin to demote users! Use: .botadmin");
      } else if (demoteError.message.includes("not admin")) {
        reply("❌ User is not an admin!");
      } else {
        reply("❌ Failed to demote: " + demoteError.message);
      }
    }

  } catch (err) {
    console.error("Demote Error:", err);
    reply("❌ Failed to demote user: " + err.message);
  }
});

// ==================== WORKING BOT ADMIN COMMAND ====================
cmd({
  pattern: "botadmin",
  alias: ["makebotadmin", "giveadminbot", "adminbot"],
  desc: "Make bot admin in group",
  category: "group",
  react: "🤖",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  reply,
  isCreator
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in groups.");
    
    // Check if bot is already admin
    try {
      const groupMetadata = await conn.groupMetadata(from);
      const botParticipant = groupMetadata.participants.find(p => p.id === conn.user.id);
      if (botParticipant && botParticipant.admin) {
        return reply("✅ Bot is already admin in this group!");
      }
    } catch (e) {
      // If we can't fetch metadata, bot is probably not admin
      console.log("Could not fetch group metadata, trying to promote bot...");
    }
    
    // Try to promote bot
    try {
      await conn.groupParticipantsUpdate(from, [conn.user.id], "promote");
      reply("✅ *Bot ko admin banaya gaya!*\n\nAb aap use kar sakte hain:\n• .promote @user\n• .demote @admin\n• .kick @user");
    } catch (err) {
      if (err.message.includes("not authorized")) {
        reply(`❌ Bot ko admin nahi bana paaye.\n\n✳️ *Karan:* Aapke paas permission nahi hai bot ko admin banane ka.\n\n✳️ *Manual tarika:*\n1. Group settings mein jao\n2. "Group permissions" par click karo\n3. "Add members" mein jao\n4. Bot ko dhundo aur manually admin banao`);
      } else {
        reply("❌ Failed to make bot admin: " + err.message);
      }
    }
    
  } catch (err) {
    console.error("Bot Admin Error:", err);
    reply("❌ Error in botadmin: " + err.message);
  }
});

// ==================== FIXED ADD USER COMMAND ====================
cmd({
  pattern: "add",
  alias: ["adduser", "addmember"],
  desc: "Add user to group",
  category: "group",
  react: "➕",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  reply,
  isCreator,
  args = [], // args is array, not string
  mentionedJid,
  text, // This is the full text after command
  body
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in groups.");
    
    let users = [];
    
    // Mentioned users se (priority)
    if (mentionedJid && mentionedJid.length > 0) {
      users = mentionedJid;
    }
    
    // Agar koi number diya ho (extract from text)
    if (users.length === 0 && text) {
      // Text ko string mein convert karo
      const textString = String(text || "").trim();
      
      // Pattern 1: Direct numbers like 923001234567
      const directNumbers = textString.match(/\d{10,15}/g);
      if (directNumbers) {
        users = directNumbers.map(num => {
          // Pakistan numbers ke liye +92 ya 92 add karo
          let cleanNum = num.replace(/\D/g, '');
          if (cleanNum.startsWith('3')) {
            cleanNum = '92' + cleanNum; // 3000000000 -> 923000000000
          }
          if (cleanNum.length >= 10) {
            return cleanNum + '@s.whatsapp.net';
          }
          return null;
        }).filter(Boolean);
      }
      
      // Pattern 2: @ mentions se extract
      if (users.length === 0) {
        const mentionPattern = /@(\d{5,16})/g;
        const mentions = [...textString.matchAll(mentionPattern)];
        if (mentions.length > 0) {
          users = mentions.map(match => match[1] + '@s.whatsapp.net');
        }
      }
    }
    
    // Agar message body se extract karna ho
    if (users.length === 0 && body) {
      const bodyString = String(body);
      const numbers = bodyString.match(/\d{10,15}/g);
      if (numbers) {
        users = numbers.map(num => {
          let cleanNum = num.replace(/\D/g, '');
          if (cleanNum.startsWith('3')) {
            cleanNum = '92' + cleanNum;
          }
          return cleanNum + '@s.whatsapp.net';
        }).filter(num => num.length >= 10);
      }
    }
    
    // Agar phir bhi users nahi mile
    if (users.length === 0) {
      return reply(`❌ Please mention users or provide phone numbers!\n\nExamples:\n• .add @user (mention someone)\n• .add 923493114170\n• .add 934555555\n• .add @user1 @user2`);
    }
    
    // Duplicates remove karo
    users = [...new Set(users)];
    
    // Validate users
    const validUsers = users.filter(user => {
      const num = user.split('@')[0];
      return num.length >= 10 && num.length <= 16;
    });
    
    if (validUsers.length === 0) {
      return reply("❌ Invalid phone numbers! Please provide valid 10-16 digit numbers.");
    }
    
    // Try to add users
    try {
      await conn.groupParticipantsUpdate(from, validUsers, "add");
      reply(`✅ ${validUsers.length} user(s) added to the group.\n\nAdded: ${validUsers.map(u => u.split('@')[0]).join(', ')}`);
    } catch (addError) {
      if (addError.message.includes("not authorized") || addError.message.includes("admin")) {
        reply("❌ Bot needs to be admin to add users! Use: .botadmin");
      } else if (addError.message.includes("not in contacts")) {
        reply("❌ Some users are not in your contacts. Please add them to your WhatsApp contacts first.");
      } else if (addError.message.includes("invite")) {
        reply("❌ Cannot add users. Group may have restrictions or users have privacy settings.");
      } else {
        reply("❌ Failed to add user: " + addError.message);
      }
    }
    
  } catch (err) {
    console.error("Add Error:", err);
    reply("❌ Failed to add user: " + (err.message || "Check the numbers and try again"));
  }
});

// ==================== SIMPLE ADD COMMAND (ALTERNATIVE VERSION) ====================
cmd({
  pattern: "addmember",
  alias: ["invite", "invitemember"],
  desc: "Add user to group (simple version)",
  category: "group",
  react: "👥",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  reply,
  args,
  mentionedJid
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in groups.");
    
    let users = [];
    
    // Mentioned users
    if (mentionedJid && mentionedJid.length > 0) {
      users = mentionedJid;
      console.log("Mentioned users:", users);
    }
    
    // If no mentions, check args
    if (users.length === 0 && args) {
      // Convert args to string if it's array
      const argsString = Array.isArray(args) ? args.join(' ') : String(args || '');
      console.log("Args string:", argsString);
      
      // Extract numbers from args
      const numberRegex = /(\+\d{1,3})?(\d{10,15})/g;
      const matches = argsString.match(numberRegex);
      
      if (matches) {
        users = matches.map(num => {
          // Clean the number
          let cleanNum = num.replace(/\D/g, '');
          
          // For Pakistan numbers starting with 3
          if (cleanNum.startsWith('3') && cleanNum.length === 10) {
            cleanNum = '92' + cleanNum;
          }
          
          // Remove leading zeros
          cleanNum = cleanNum.replace(/^0+/, '');
          
          if (cleanNum.length >= 10 && cleanNum.length <= 16) {
            return cleanNum + '@s.whatsapp.net';
          }
          return null;
        }).filter(Boolean);
      }
    }
    
    // If still no users
    if (users.length === 0) {
      return reply(`📋 *Add User Help*\n\nUsage:\n• .add @user (mention someone)\n• .add 923493114170\n• .add 923000000\n\nNote: Users must be in your WhatsApp contacts.`);
    }
    
    // Remove duplicates
    users = [...new Set(users)];
    
    // Limit to 10 users at a time
    if (users.length > 10) {
      reply(`⚠️ Adding first 10 users (limit)...`);
      users = users.slice(0, 10);
    }
    
    console.log("Final users to add:", users);
    
    // Try to add
    try {
      await conn.groupParticipantsUpdate(from, users, "add");
      reply(`✅ Successfully added ${users.length} user(s) to the group!`);
    } catch (error) {
      console.error("Add error:", error.message);
      
      if (error.message.includes("not authorized")) {
        reply("❌ Bot is not admin! Please make bot admin first.");
      } else if (error.message.includes("invite")) {
        reply("❌ Cannot add these users. They may have privacy settings enabled.");
      } else {
        reply(`❌ Failed to add: ${error.message}`);
      }
    }
    
  } catch (err) {
    console.error("AddMember Error:", err);
    reply("❌ Error: " + (err.message || "Unknown error"));
  }
});

// ==================== SIMPLE TAGALL COMMAND ====================
cmd({
  pattern: "tagall",
  alias: ["gc_tagall", "mentionall"],
  desc: "Tag all members",
  category: "group",
  react: "🔊",
  filename: __filename
}, async (conn, mek, m, {
  from,
  participants,
  reply,
  isGroup,
  body,
  command
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in groups.");
    
    let message = body.slice(body.indexOf(command) + command.length).trim();
    if (!message) message = "Attention Everyone!";
    
    let text = `📢 *TAG ALL*\n\n📝 Message: ${message}\n\n`;
    
    participants.forEach((member, i) => {
      text += `${i+1}. @${member.id.split('@')[0]}\n`;
    });
    
    text += `\n✅ Total: ${participants.length} members`;
    
    await conn.sendMessage(from, {
      text: text,
      mentions: participants.map(p => p.id)
    }, { quoted: mek });
    
  } catch (err) {
    console.error("TagAll Error:", err);
    reply("❌ Error in tagall: " + err.message);
  }
});

// ==================== SIMPLE ADMIN CHECK COMMAND ====================
cmd({
  pattern: "admincheck",
  alias: ["checkadmin", "admintest"],
  desc: "Check admin status",
  category: "group",
  react: "🔍",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  reply,
  sender,
  isCreator,
  participants
}) => {
  try {
    if (!isGroup) return reply("⚠️ _This command only works in groups_.");
    
    let message = `👑 *Admin Status Check*\n\n`;
    message += `👤 You: @${sender.split('@')[0]}\n`;
    message += `🤖 Bot Owner: ${isCreator ? '✅ YES' : '❌ NO'}\n\n`;
    
    // Try to check bot admin status
    try {
      const groupMetadata = await conn.groupMetadata(from);
      const botParticipant = groupMetadata.participants.find(p => p.id === conn.user.id);
      const isBotAdmin = botParticipant ? botParticipant.admin : false;
      
      message += `🤖 Bot Admin: ${isBotAdmin ? '✅ YES' : '❌ NO'}\n`;
      message += `👥 Total Members: ${groupMetadata.participants.length}\n\n`;
      
      if (!isBotAdmin) {
        message += `⚠️ _Bot is not admin!_\nUse: .botadmin\nOr manually promote bot to admin.`;
      } else {
        message += `✅ _Bot is admin!_\nYou can use:\n• .promote @user\n• .demote @admin\n• .kick @user\n• .add @user`;
      }
    } catch (metadataError) {
      message += `❌ Cannot fetch group details.\n`;
      message += `Bot needs admin rights to check status.\n`;
      message += `Please make bot admin first using: .botadmin`;
    }
    
    await conn.sendMessage(from, {
      text: message,
      mentions: [sender]
    }, { quoted: mek });
    
  } catch (err) {
    console.error("Admin Check Error:", err);
    reply("❌ _Error in admin check_: " + err.message);
  }
});

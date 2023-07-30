function handleLogin(username, password) {
  return { ok: true, username: "testuser@test.com", token: "testToken" };
}

function handleRegister(username, password) {
  return { ok: true, username: "testuser@test.com", token: "testToken" };
}

export { handleLogin, handleRegister };

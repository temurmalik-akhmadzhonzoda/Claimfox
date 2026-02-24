const { requireAuth, auth0ManagementRequest, sanitizeRoles, json, error, getAuth0Config } = require('./_utils')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return error(405, 'method_not_allowed', 'Only POST allowed')

  const auth = await requireAuth(event)
  if (!auth.ok) return auth.response

  const currentRoles = sanitizeRoles(auth.roles)
  if (currentRoles.length > 0) return json(200, { ok: true, roles: currentRoles })

  const userId = auth.user?.id
  if (!userId) return error(400, 'bad_request', 'User id missing')

  try {
    await auth0ManagementRequest({
      method: 'PATCH',
      path: `/users/${encodeURIComponent(userId)}`,
      body: { app_metadata: { roles: ['mitarbeiter'] } }
    })
    return json(200, { ok: true, roles: ['mitarbeiter'] })
  } catch (e) {
    return error(409, 'role_init_failed', 'Default role could not be assigned', {
      message: e.message,
      rolesClaim: getAuth0Config().rolesClaim
    })
  }
}

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  
  // Extract parameters from the request
  const { provider, site_id, scope } = queryStringParameters || {};
  
  if (provider === 'github') {
    // Redirect to GitHub OAuth
    const clientId = process.env.GITHUB_CLIENT_ID || 'Ov23liO3UDaEIBmLhm4p';
    const redirectUri = `https://scottshapiro.com/admin/`;
    const state = Math.random().toString(36).substring(7);
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope || 'repo'}&state=${state}`;
    
    return {
      statusCode: 302,
      headers: {
        Location: githubAuthUrl
      }
    };
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Provider not supported' })
  };
};


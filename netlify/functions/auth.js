exports.handler = async (event, context) => {
  const { queryStringParameters, path } = event;
  
  // If this is a callback (has 'code' parameter), let it pass through to /admin/
  if (queryStringParameters && queryStringParameters.code) {
    return {
      statusCode: 302,
      headers: {
        Location: `https://scottshapiro.com/admin/?${new URLSearchParams(queryStringParameters).toString()}`
      }
    };
  }
  
  // Otherwise, redirect to GitHub OAuth
  const params = new URLSearchParams(queryStringParameters || {});
  const clientId = 'Ov23liO3UDaEIBmLhm4p';
  const redirectUri = 'https://scottshapiro.com/admin/';
  
  // Build GitHub OAuth URL with PKCE parameters
  const githubParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: params.get('scope') || 'repo',
    state: params.get('state') || Math.random().toString(36).substring(7)
  });
  
  // Add PKCE parameters if present
  if (params.get('code_verifier')) {
    githubParams.append('code_verifier', params.get('code_verifier'));
  }
  if (params.get('code_challenge')) {
    githubParams.append('code_challenge', params.get('code_challenge'));
    githubParams.append('code_challenge_method', 'S256');
  }
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${githubParams.toString()}`;
  
  return {
    statusCode: 302,
    headers: {
      Location: githubAuthUrl
    }
  };
};

